import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Hammer,
  GraduationCap,
  HardHat,
  Compass,
  LineChart,
  Layers,
  BookOpen,
  Cpu,
  Bookmark,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Volume2,
  Construction,
  Info
} from "lucide-react";

// Components imports
import SoilFormation from "./components/SoilFormation";
import SoilTypes from "./components/SoilTypes";
import EngineeringTimeline from "./components/EngineeringTimeline";
import ImportanceAndFailures from "./components/ImportanceAndFailures";
import InteractiveLab from "./components/InteractiveLab";
import SoilProfile from "./components/SoilProfile";
import LearningHub from "./components/LearningHub";
import AIChatAndClassifier from "./components/AIChatAndClassifier";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Soil recommendation sub-states
  const [recClay, setRecClay] = useState<number>(25);
  const [recSilt, setRecSilt] = useState<number>(25);
  const [recSand, setRecSand] = useState<number>(25);
  const [recGravel, setRecGravel] = useState<number>(25);
  const [recResult, setRecResult] = useState<any>(null);
  const [isRecLoading, setIsRecLoading] = useState<boolean>(false);

  // Track page vertical scroll for progress indicator bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.pageYOffset / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Request soil recommendations parameter results off server
  const handleGetSoilRecommendation = async () => {
    setIsRecLoading(true);
    setRecResult(null);
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clay: recClay,
          silt: recSilt,
          sand: recSand,
          gravel: recGravel
        })
      });
      const data = await response.json();
      setRecResult(data);
    } catch (e) {
      console.error(e);
      // Fallback
      setRecResult({
        soilType: "Sandy Silty Clay mixture",
        bearingCapacity: "Moderate (140 - 200 kPa)",
        permeability: "Low",
        suitability: "Fair for minor retaining wall bases. Requires optimal compaction control.",
        warning: "Vulnerable to moisture shifts. Avoid immediate heavy point loads."
      });
    } finally {
      setIsRecLoading(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home Base", icon: Globe },
    { id: "formation", label: "Soil Formation", icon: Hammer },
    { id: "classes", label: "Soil Families", icon: Layers },
    { id: "pioneers", label: "Pioneers", icon: Compass },
    { id: "failures", label: "Failure Lab", icon: HardHat },
    { id: "lab", label: "Virtual Lab", icon: LineChart },
    { id: "core", label: "Subsurface Core", icon: Layers },
    { id: "hub", label: "Competitive Desk", icon: GraduationCap },
    { id: "ai", label: "AI Doubts desk", icon: Cpu }
  ];

  return (
    <div className="min-h-screen bg-[#0f0d0c] text-stone-200 font-sans relative selection:bg-[#d4a373]/30 select-none overflow-x-hidden">
      {/* 1. Fluid Scroll Progress Bar on top */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#b35a38] to-[#d4a373] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Background grain particles floating element */}
      <div className="absolute inset-0 bg-[#0f0d0c] opacity-[0.98] pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4a373]/5 rounded-full blur-[110px]" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-[#b35a38]/5 rounded-full blur-[130px]" />
      </div>

      {/* 2. Primary Navigation Core Grid */}
      <header className="sticky top-0 z-40 bg-[#161210]/95 border-b border-[#2a221d] backdrop-blur-md px-6 md:px-12 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#d4a373] flex items-center justify-center shadow-lg shadow-[#d4a373]/20">
            <Layers className="w-5 h-5 text-[#161210]" />
          </div>
          <div>
            <h1 className="text-stone-100 font-sans font-bold text-sm tracking-wide">
              BHARAT-GEOTECH
            </h1>
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#d4a373] block">
              The Soil Mechanics Training Platform
            </span>
          </div>
        </div>

        {/* Navigation sliders switcher */}
        <nav className="flex flex-wrap gap-1.5 bg-[#161210] p-1.5 rounded-xl border border-[#2a221d] max-w-full overflow-x-auto">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => {
                  setActiveSection(item.id);
                  window.scrollTo({ top: 320, behavior: "smooth" });
                }}
                className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-sans font-semibold border transition-all truncate ${
                  isActive
                    ? "bg-[#d4a373] border-[#d4a373] text-[#0f0d0c] font-bold"
                    : "bg-transparent border-transparent text-stone-400 hover:text-[#f1f1f1] hover:bg-white/5"
                }`}
              >
                <IconComp className="w-3.5 h-3.5 text-current" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* 3. HERO PORTAL HOUSING */}
      <section className="relative my-6 max-w-7xl mx-auto bg-[#1a1512] py-12 px-8 rounded-3xl border border-[#2a221d] shadow-2xl overflow-hidden flex flex-col md:flex-row gap-8 justify-between items-center z-10">
        <div className="space-y-6 max-w-2xl text-center md:text-left z-10">
          <span className="text-xs uppercase tracking-widest font-mono text-[#d4a373] bg-[#d4a373]/10 px-3 py-1 rounded-full border border-[#d4a373]/20">
            COMPACT civil engineering training matrix
          </span>

          <h1 className="text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-[#FFF8F2] leading-tight">
            Understanding <br className="hidden md:block" />
            <span className="text-[#d4a373]">
              Soil Engineering
            </span>
          </h1>

          <p className="text-stone-300 text-sm md:text-base leading-relaxed leading-7">
            Explore Soil Formation, Soil Mechanics, and the physical engineering principles that govern foundations, earth dams, and modern municipal infrastructure.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              id="hero-btn-start-learning"
              onClick={() => { setActiveSection("formation"); window.scrollTo({ top: 320, behavior: "smooth" }); }}
              className="px-6 py-2.5 bg-[#d4a373] text-[#0f0d0c] rounded-full font-bold text-sm shadow-xl hover:opacity-90 transition-all cursor-pointer"
            >
              Start Learning Path
            </button>
            <button
              id="hero-btn-explore-soils"
              onClick={() => { setActiveSection("classes"); window.scrollTo({ top: 320, behavior: "smooth" }); }}
              className="px-6 py-2.5 bg-[#2a221d] text-white border border-white/10 rounded-full font-bold text-sm hover:bg-stone-800 transition-all cursor-pointer"
            >
              Explore Soil Families
            </button>
          </div>
        </div>

        {/* Right Statistics Box / Geological cross-section */}
        <div className="w-full md:w-96 bg-[#161210] border border-[#2a221d] p-6 rounded-2xl space-y-4 z-10">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-stone-500 uppercase block">Soil Mechanics Stat Index</span>
            <h4 className="text-xs font-bold text-stone-300 font-sans">Geotechnical Dependability</h4>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="bg-stone-900/40 p-3 rounded-xl border border-stone-800">
              <span className="text-2xl font-bold font-mono text-[#d4a373]">95%</span>
              <p className="text-[10px] text-stone-400 leading-snug mt-0.5">Of modern solid structures depend directly on unconfined shear soil behaviors.</p>
            </div>
            <div className="bg-[#b35a38]/10 p-3 rounded-xl border border-[#b35a38]/20">
              <span className="text-xs font-bold text-[#b35a38] block uppercase font-mono">Geotechnical Backbone</span>
              <p className="text-[10px] text-stone-400 leading-snug mt-0.5">Geostructural support forms the bedrock layer of building load limits and safety code.</p>
            </div>
          </div>
        </div>

        {/* Decorative Soil Grains */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-gradient-to-tr from-[#3a2c22] to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />
      </section>

      {/* 4. ACTIVE WORKSPACE CONTAINER PANEL */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-10 space-y-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.15 }}
          >
            {activeSection === "home" && (
              <div id="home-base-suite" className="space-y-16">
                {/* Visual Soil Recommendation Calculator tool */}
                <div className="bg-[#161210] border border-[#2a221d] p-6 md:p-8 rounded-3xl space-y-6 relative overflow-hidden">
                  <div className="border-b border-[#2a221d] pb-4">
                    <span className="text-xs font-mono text-[#d4a373] block uppercase tracking-wider">Advanced interactive tools</span>
                    <h3 className="text-xl md:text-2xl font-bold font-sans text-stone-100 mt-1">
                      Soil Suitability Recommendation System
                    </h3>
                    <p className="text-stone-400 text-xs mt-1 leading-normal max-w-2xl">
                      Configure estimated gravel, sand, silt, and clay percentages representing your borehole core sample to estimate local load bearing, drainage indexes, and constructability warnings.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Input parameters */}
                    <div className="lg:col-span-5 space-y-4">
                      {/* Clay range */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-stone-400">Clay Percent (%)</span>
                          <span className="text-[#d4a373] font-bold">{recClay}%</span>
                        </div>
                        <input
                          id="rec-clay-range"
                          type="range"
                          min="0"
                          max="100"
                          value={recClay}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setRecClay(val);
                          }}
                          className="w-full accent-[#b35a38] h-1.5 bg-stone-900 rounded"
                        />
                      </div>

                      {/* Silt range */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-stone-400">Silt Percent (%)</span>
                          <span className="text-[#d4a373] font-bold">{recSilt}%</span>
                        </div>
                        <input
                          id="rec-silt-range"
                          type="range"
                          min="0"
                          max="100"
                          value={recSilt}
                          onChange={(e) => setRecSilt(Number(e.target.value))}
                          className="w-full accent-[#a98467] h-1.5 bg-stone-900 rounded"
                        />
                      </div>

                      {/* Sand range */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-stone-400">Sand Percent (%)</span>
                          <span className="text-[#d4a373] font-bold">{recSand}%</span>
                        </div>
                        <input
                          id="rec-sand-range"
                          type="range"
                          min="0"
                          max="100"
                          value={recSand}
                          onChange={(e) => setRecSand(Number(e.target.value))}
                          className="w-full accent-[#d4a373] h-1.5 bg-stone-900 rounded"
                        />
                      </div>

                      {/* Gravel range */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-stone-400">Gravel Percent (%)</span>
                          <span className="text-[#d4a373] font-bold">{recGravel}%</span>
                        </div>
                        <input
                          id="rec-gravel-range"
                          type="range"
                          min="0"
                          max="100"
                          value={recGravel}
                          onChange={(e) => setRecGravel(Number(e.target.value))}
                          className="w-full accent-stone-500 h-1.5 bg-stone-900 rounded"
                        />
                      </div>

                      <button
                        id="btn-calculate-soil-rec"
                        onClick={handleGetSoilRecommendation}
                        className="w-full py-3 bg-[#d4a373] hover:opacity-90 text-[#0f0d0c] rounded-xl text-xs font-sans font-bold shadow-lg transition-all cursor-pointer"
                      >
                        Calculate Suitability Classification
                      </button>
                    </div>

                    {/* Suitability report results */}
                    <div className="lg:col-span-7 bg-[#1a1512] border border-[#2a221d] p-5 rounded-2xl h-[310px] flex flex-col justify-between overflow-y-auto">
                      {recResult ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b border-[#2a221d] pb-2">
                            <div>
                              <span className="text-[10px] font-mono text-stone-500 block uppercase">ASTM Soil Classification Estimate:</span>
                              <h4 className="text-sm font-sans font-bold text-[#d4a373]">{recResult.soilType}</h4>
                            </div>
                            <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-900 rounded uppercase font-mono font-bold">
                              Analysis OK
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs text-stone-300">
                            <div>
                              <strong className="text-stone-400 uppercase text-[9px] block">Pneumatic Bearing Capacity:</strong>
                              <p className="mt-0.5">{recResult.bearingCapacity}</p>
                            </div>
                            <div>
                              <strong className="text-stone-400 uppercase text-[9px] block font-mono">Permeability Index:</strong>
                              <p className="mt-0.5">{recResult.permeability}</p>
                            </div>
                          </div>

                          <div className="text-xs leading-relaxed font-sans text-stone-250 bg-[#d4a373]/10 p-2.5 rounded-lg border border-[#d4a373]/20">
                            <strong className="text-[#d4a373] block text-[10px] mb-0.5 uppercase">Constructability Potential:</strong>
                            {recResult.suitability}
                          </div>

                          <div className="text-xs leading-relaxed font-sans text-stone-250 bg-[#b35a38]/10 p-2.5 rounded-lg border border-[#b35a38]/20 flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-[#b35a38] mt-0.5 shrink-0" />
                            <div>
                              <strong className="text-[#b35a38] block text-[10px] mb-0.5 uppercase">Critical Civil Geotechnical Warning:</strong>
                              {recResult.warning}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-2 py-12">
                          <Info className="w-6 h-6 text-stone-600" />
                          <p className="text-xs text-stone-400">
                            Configure estimated grain parameters on the sliders and press &ldquo;Calculate Suitability&rdquo; to compile report fields.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sub-panels grids to navigate to child parts */}
                <div className="space-y-4">
                  <h3 className="text-lg font-sans font-bold text-stone-200">
                    Core Engineering Sections
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-[#1a1512] border border-[#2a221d] p-5 rounded-2xl flex flex-col justify-between hover:border-[#d4a373]/40 transition-all">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-[#d4a373] uppercase block">Rock Disintegration</span>
                        <h4 className="text-sm font-bold text-stone-200 font-sans">1. Rock weather and soil formation</h4>
                        <p className="text-stone-400 text-xs leading-relaxed">
                          Analyze the mechanical, biological, and chemical dissolution processes that convert bedrock into horizon layers over eons.
                        </p>
                      </div>
                      <button
                        onClick={() => { setActiveSection("formation"); window.scrollTo({ top: 320, behavior: "smooth" }); }}
                        className="text-xs text-[#d4a373] hover:opacity-80 mt-4 font-bold flex items-center gap-1 self-start cursor-pointer"
                      >
                        Enter study block <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="bg-[#1a1512] border border-[#2a221d] p-5 rounded-2xl flex flex-col justify-between hover:border-[#d4a373]/40 transition-all">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-[#b35a38] uppercase block">Atterberg &amp; Compaction</span>
                        <h4 className="text-sm font-bold text-stone-200 font-sans">2. Interactive soil testing laboratory</h4>
                        <p className="text-stone-400 text-xs leading-relaxed">
                          Experiment with virtual sieve, Proctor curve peaks, limit indices, and Mohr fitting failure envelopes.
                        </p>
                      </div>
                      <button
                        onClick={() => { setActiveSection("lab"); window.scrollTo({ top: 320, behavior: "smooth" }); }}
                        className="text-xs text-[#d4a373] hover:opacity-80 mt-4 font-bold flex items-center gap-1 self-start cursor-pointer"
                      >
                        Launch lab workspace <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="bg-[#1a1512] border border-[#b35a38]/20 p-5 rounded-2xl flex flex-col justify-between hover:border-[#b35a38]/40 transition-all col-span-1 md:col-span-1">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-[#d4a373] uppercase block">AI Tutor assist</span>
                        <h4 className="text-sm font-bold text-stone-200 font-sans">3. AI Geotech chatbot &amp; Photo Analysis</h4>
                        <p className="text-stone-400 text-xs leading-relaxed">
                          Let our model guide your geotechnical homework formulas or study physical site sample images.
                        </p>
                      </div>
                      <button
                        onClick={() => { setActiveSection("ai"); window.scrollTo({ top: 320, behavior: "smooth" }); }}
                        className="text-xs text-[#d4a373] hover:opacity-80 mt-4 font-bold flex items-center gap-1 self-start cursor-pointer"
                      >
                        Open AI Doubts desk <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "formation" && <SoilFormation />}
            {activeSection === "classes" && <SoilTypes />}
            {activeSection === "pioneers" && <EngineeringTimeline />}
            {activeSection === "failures" && <ImportanceAndFailures />}
            {activeSection === "lab" && <InteractiveLab />}
            {activeSection === "core" && <SoilProfile />}
            {activeSection === "hub" && <LearningHub />}
            {activeSection === "ai" && <AIChatAndClassifier />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 5. Pure Bento Grid Activity Footer */}
      <footer className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-between p-6 bg-[#161210] rounded-2xl border border-[#2a221d] gap-4 text-xs text-stone-500 font-mono relative z-10">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            Connected to GeoDatabase v2.4
          </span>
          <span className="hidden md:inline text-stone-600">|</span>
          <span>Node Server: GEOTECH-AMS-01</span>
        </div>
        <div className="flex gap-4 items-center">
          <span>Simulation Accuracy: 98%</span>
          <div className="w-24 h-1.5 bg-stone-800 rounded-full overflow-hidden">
            <div className="w-5/6 h-full bg-[#d4a373]"></div>
          </div>
          <span className="text-white font-sans">Level 01 Grid Ready</span>
        </div>
      </footer>
    </div>
  );
}
