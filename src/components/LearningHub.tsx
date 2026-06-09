import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Search, Bookmark, HelpCircle, Download, BookText, AlertCircle, CheckCircle2, ChevronRight, Calculator, RotateCcw } from "lucide-react";
import { GEOTECH_QUIZ, SOIL_FORMULAS, GLOSSARY } from "../data/soilData";

export default function LearningHub() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState<string>("all");

  // Quiz states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<string[]>([]);

  // Formula Calculator state
  const [calcC, setCalcC] = useState<number>(15); // kPa cohesion
  const [calcNormal, setCalcNormal] = useState<number>(100); // kPa normal stress
  const [calcPhi, setCalcPhi] = useState<number>(30); // degrees friction angle

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const activeQuestion = GEOTECH_QUIZ[currentQuestionIndex];

  // Search filter
  const filteredGlossary = GLOSSARY.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedGlossaryCategory === "all" || item.category === selectedGlossaryCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(GLOSSARY.map((item) => item.category))];

  // Bookmarking
  const toggleBookmark = (qId: string) => {
    if (bookmarkedQuestions.includes(qId)) {
      setBookmarkedQuestions(bookmarkedQuestions.filter((id) => id !== qId));
    } else {
      setBookmarkedQuestions([...bookmarkedQuestions, qId]);
    }
  };

  // Submit Answer
  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    setIsAnswered(true);
    if (selectedOption === activeQuestion.answerIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuestionIndex < GEOTECH_QUIZ.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Dynamic formula calculation
  const calculatedShearStrength = calcC + calcNormal * Math.tan((calcPhi * Math.PI) / 180);

  // Trigger download of Geotechnical study note txt file
  const handleDownloadStudyNotes = () => {
    const formulasText = SOIL_FORMULAS.map((f) => {
      return `### ${f.name}\nEquation: ${f.displayEq}\nDescription: ${f.description}\nVariables:\n${f.variables.map((v) => ` - ${v.symbol}: ${v.meaning} (Unit: ${v.unit})`).join("\n")}\n\n`;
    }).join("");

    const quizText = GEOTECH_QUIZ.map((q, idx) => {
      return `Q${idx+1}: ${q.question}\nOptions: ${q.options.map((o, oidx) => `\n ${oidx === q.answerIndex ? "[X]" : "[ ]"} ${o}`).join("")}\nExplanation: ${q.explanation}\n\n`;
    }).join("");

    const glossaryText = GLOSSARY.map((g) => ` * ${g.term}: ${g.definition} [Category: ${g.category}]`).join("\n");

    const fullBlobText = `====================================================
GEOTECHNICAL CIVIL ENGINEERING - COMPACT STUDY MANUAL
Created: ${new Date().toISOString().split("T")[0]}
====================================================

Soil mechanics studies physical structural properties and load-deformation profiles of porous earth aggregates.

1. CRITICAL ENGINEERING FORMULAS:
----------------------------------------------------
${formulasText}

2. GLOSSARY OF TERMS & TERMINOLOGIES:
----------------------------------------------------
${glossaryText}

3. GATE PREPARATION MCQS EXPLAINED:
----------------------------------------------------
${quizText}

====================================================
End of Geotechnical Quick Reference Portal.
====================================================`;

    const blob = new Blob([fullBlobText], { type: "text/markdown;charset=utf-8" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = "Geotechnical_Soil_Study_Notes.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="learning-hub-layout" className="space-y-12">
      {/* 1. Introductory Title */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-[#171310] p-6 rounded-2xl border border-stone-800">
        <div>
          <span className="text-xs font-mono px-3 py-1 bg-[#c86446]/20 text-[#c86446] rounded-full uppercase border border-[#c86446]/40 tracking-wider">
            Section 8: Competitive Study Desk
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-stone-100 mt-2">
            The Interactive Learning Portal
          </h2>
          <p className="text-stone-300 text-sm mt-1 max-w-xl">
            Prepare for exams with active calculators, competitive GATE-level MCQs, interactive terminology indexes, and immediate study manual exports.
          </p>
        </div>
        <button
          id="btn-download-study-notes"
          onClick={handleDownloadStudyNotes}
          className="py-3 px-5 bg-gradient-to-r from-amber-700 to-[#c86446] hover:from-amber-600 hover:to-[#b05337] text-stone-100 text-xs font-sans font-bold rounded-xl shadow-lg border border-amber-500/20 flex items-center gap-2 transition-all hover:-translate-y-0.5"
        >
          <Download className="w-4 h-4 text-amber-200" />
          Download Study Manual (.MD)
        </button>
      </div>

      {/* 2. Interactive GATE Quiz System and Formula Calculator */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* GATE MCQ ENGINE */}
        <div className="lg:col-span-7 bg-[#120D0A] p-6 rounded-2xl border border-[#c86446]/10 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-center border-b border-stone-800 pb-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-amber-500 uppercase font-bold tracking-wider">
                Interactive GATE Preparation Dashboard
              </span>
              <h3 className="text-base font-sans font-bold text-stone-200">
                Civil Engineering MCQ Trainer
              </h3>
            </div>
            <div className="text-[11px] font-mono text-stone-400">
              Score: <span className="text-emerald-400 font-bold">{score}</span> / {GEOTECH_QUIZ.length}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={activeQuestion.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-start gap-4">
                  <span className="text-xs bg-[#1F1713] text-[#c86446] px-2.5 py-1 rounded font-medium border border-amber-900/30">
                    Category: {activeQuestion.category}
                  </span>
                  <button
                    id={`btn-bookmark-${activeQuestion.id}`}
                    onClick={() => toggleBookmark(activeQuestion.id)}
                    className="text-stone-400 hover:text-amber-500 transition-colors p-1"
                    title="Bookmark Question"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedQuestions.includes(activeQuestion.id) ? "fill-amber-500 text-amber-500" : "text-stone-500"}`} />
                  </button>
                </div>

                <h4 className="text-sm font-sans font-bold text-stone-100 leading-relaxed leading-6">
                  Q{currentQuestionIndex + 1}. {activeQuestion.question}
                </h4>

                {/* Answer Options list */}
                <div className="space-y-2 pt-2">
                  {activeQuestion.options.map((opt, oIdx) => {
                    let btnClass = "border-stone-800/80 bg-stone-900/60 text-stone-300 hover:bg-[#1E1714]";
                    if (selectedOption === oIdx) btnClass = "border-amber-700 bg-amber-950/30 text-stone-100";
                    if (isAnswered) {
                      if (oIdx === activeQuestion.answerIndex) {
                        btnClass = "border-green-600 bg-green-950/20 text-green-300";
                      } else if (selectedOption === oIdx) {
                        btnClass = "border-red-600 bg-red-950/20 text-red-300";
                      } else {
                        btnClass = "opacity-45 border-stone-800/40 bg-stone-950 text-stone-400";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        id={`btn-option-${currentQuestionIndex}-${oIdx}`}
                        onClick={() => handleSelectOption(oIdx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex justify-between items-center ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && oIdx === activeQuestion.answerIndex && (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation block */}
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-[#1C1D1A] p-4 rounded-xl border border-dashed border-stone-800 text-xs text-stone-300"
                  >
                    <span className="font-bold text-emerald-400 flex items-center gap-1 mb-1 font-mono">
                      <BookText className="w-4 h-4" />
                      Detailed Explanatory notes:
                    </span>
                    <p>{activeQuestion.explanation}</p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-stone-100">Competitive Quiz Completed!</h4>
                <p className="text-xs text-stone-400 font-serif">
                  You scored <span className="text-emerald-400 font-bold">{score}</span> points out of {GEOTECH_QUIZ.length}. Excellent effort preparing for geotechnical examinations!
                </p>
                <button
                  id="btn-restart-quiz"
                  onClick={restartQuiz}
                  className="py-2 px-4 bg-stone-900 border border-stone-800 text-stone-300 hover:text-stone-100 rounded-lg text-xs"
                >
                  Return to Start
                </button>
              </div>
            )}
          </AnimatePresence>

          {/* Action Footer */}
          {!quizFinished && (
            <div className="flex gap-2 justify-end pt-4 border-t border-stone-900 text-xs">
              {!isAnswered ? (
                <button
                  id="btn-confirm-answer"
                  onClick={handleConfirmAnswer}
                  disabled={selectedOption === null}
                  className="py-2 px-4 bg-amber-800 hover:bg-amber-700 disabled:bg-stone-900 disabled:text-stone-700 text-stone-200 rounded font-bold"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  id="btn-next-question"
                  onClick={handleNextQuestion}
                  className="py-2 px-4 bg-[#c86446] hover:bg-[#b05337] text-stone-100 rounded flex items-center gap-1 font-bold"
                >
                  <span>{currentQuestionIndex === GEOTECH_QUIZ.length - 1 ? "Finish and Score" : "Next Question"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* ACTIVE FORMULA CALCULATOR CARD */}
        <div className="lg:col-span-5 bg-[#14100D] p-6 rounded-2xl border border-stone-900 flex flex-col justify-between space-y-6">
          <div className="space-y-1.5 border-b border-stone-800 pb-3">
            <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold">
              Engineering Equation Playground
            </span>
            <h3 className="text-sm font-sans font-bold text-stone-200 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-emerald-500" />
              Mohr-Coulomb shear resistance evaluator
            </h3>
          </div>

          <div className="space-y-4">
            {/* 1. Cohesion input */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-stone-400">Cohesion force value (c)</span>
                <span className="text-emerald-400 font-bold">{calcC} kPa</span>
              </div>
              <input
                id="calc-cohesion-range"
                type="range"
                min="0"
                max="100"
                value={calcC}
                onChange={(e) => setCalcC(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1 bg-stone-800 rounded"
              />
            </div>

            {/* 2. Normal stress input */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-stone-400">Normal stress acting (σ)</span>
                <span className="text-emerald-400 font-bold">{calcNormal} kPa</span>
              </div>
              <input
                id="calc-normal-range"
                type="range"
                min="10"
                max="300"
                value={calcNormal}
                onChange={(e) => setCalcNormal(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1 bg-stone-800 rounded"
              />
            </div>

            {/* 3. Friction Angle input */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-stone-400">Friction Angle angle (φ)</span>
                <span className="text-emerald-400 font-bold">{calcPhi}°</span>
              </div>
              <input
                id="calc-phi-range"
                type="range"
                min="0"
                max="50"
                value={calcPhi}
                onChange={(e) => setCalcPhi(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1 bg-stone-800 rounded"
              />
            </div>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
            <span className="text-[10px] font-mono uppercase text-stone-500 block">Solution Formula &amp; Output</span>
            <div className="text-center py-2 border-y border-stone-900">
              <span className="font-serif font-bold text-[#EADED2] text-sm block">τ = c + σ · tan(φ)</span>
              <span className="text-[11px] text-stone-400 font-mono">
                {calcC} + {calcNormal} · tan({calcPhi}°)
              </span>
            </div>
            <div className="flex justify-between items-center pt-1.5">
              <span className="text-xs text-stone-400">Ultimate Shear Strength (τ)</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">{calculatedShearStrength.toFixed(1)} kPa</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Searchable glossary index */}
      <section className="bg-[#110D0B] p-6 rounded-2xl border border-stone-850 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-900 pb-4">
          <div className="space-y-1">
            <h3 className="text-base font-sans font-bold text-stone-100">
              Geotechnical Reference Dictionary
            </h3>
            <p className="text-stone-400 text-xs">
              Search and filter key civil engineering terminologies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="dictionary-search-input"
                type="text"
                placeholder="Search definitions (e.g. consolidation)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 pl-9 pr-3 py-1.5 rounded-lg text-xs outline-none text-stone-200 focus:border-[#c86446]/60 transition-colors"
              />
            </div>

            {/* Category tabs */}
            <select
              id="dictionary-filter-select"
              value={selectedGlossaryCategory}
              onChange={(e) => setSelectedGlossaryCategory(e.target.value)}
              className="bg-stone-950 text-stone-200 text-xs rounded border border-stone-800 outline-none px-2 py-1.5 uppercase font-mono"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dictionary cards list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredGlossary.map((g, idx) => (
            <div
              key={idx}
              className="bg-[#171310] p-4 rounded-xl border border-stone-850 hover:border-amber-900/40 transition-colors space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-[8px] tracking-widest font-mono text-[#c86446] uppercase font-bold bg-[#2C1811] px-2 py-0.5 rounded border border-[#c86446]/20 w-fit block">
                  {g.category}
                </span>
                <h4 className="text-stone-200 font-bold font-sans text-xs">
                  {g.term}
                </h4>
                <p className="text-[11px] text-stone-400 leading-relaxed font-serif">
                  {g.definition}
                </p>
              </div>
            </div>
          ))}

          {filteredGlossary.length === 0 && (
            <div className="col-span-full text-center py-6 text-xs text-stone-500">
              No terminologies matched your query. Try searching for &ldquo;stress&rdquo; or &ldquo;moisture&rdquo;.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
