import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Volume2, Upload, FileImage, ClipboardCheck, MessageSquare, CornerDownLeft, AlertCircle, RefreshCw } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatAndClassifier() {
  const [activeSubTab, setActiveSubTab] = useState<"chat" | "classifier">("chat");

  // Chat states
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I am Dr. Earth, your AI Geotechnical Engineering tutor. Ask me any question related to Soil Formation, Atterberg Limits, Karl Terzaghi, or direct shear tests, and I'll explain down to civil engineering principles!"
    }
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Soil Classifier states
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>("image/jpeg");
  const [classificationResult, setClassificationResult] = useState<string | null>(null);
  const [isClassifying, setIsClassifying] = useState<boolean>(false);

  // Speech Narration states
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const synthRef = useRef<SpeechSynthesis | null>(
    typeof window !== "undefined" ? window.speechSynthesis : null
  );

  const SUGGESTED_QUERIES = [
    "What is Terzaghi's Effective Stress Principle?",
    "Explain hydraulic piping under dams",
    "How does a direct shear test find cohesion?",
  ];

  // Browser TTS Narration
  const speakText = (text: string) => {
    if (!synthRef.current) return;

    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    // Strip markdown formatting simple regex
    const cleanText = text.replace(/[#*`_]/g, "").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 450)); // limit length safely
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    synthRef.current.speak(utterance);
  };

  // Chat request
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim() || isTyping) return;

    setInputValue("");
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-8) // send last 8 messages for context
        })
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text || "I was unable to formulate a geotechnical response." }
      ]);
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Connection Offline: The soil assistant cannot reach the server. Please verify your internet connection or check if the GEMINI_API_KEY is properly initialized in Secrets."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Local file base64 parser
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageMimeType(file.type);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setClassificationResult(null);
    };
    reader.readAsDataURL(file);
  };

  // Image Soil Classify request
  const handleClassifyImage = async () => {
    if (!selectedImage || isClassifying) return;

    setIsClassifying(true);
    setClassificationResult(null);

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: imageMimeType
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setClassificationResult(data.text || "Unable to determine soil parameters.");
    } catch (error) {
      console.error(error);
      setClassificationResult("⚠️ Image Analysis Offline: Visual classification requires an active backend connected to Gemini. Please ensure your GEMINI_API_KEY is configured in Secrets.");
    } finally {
      setIsClassifying(false);
    }
  };

  return (
    <div id="ai-doubts-classifier-hub" className="space-y-12">
      {/* 1. Introductory Title */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-[#1B120E] p-6 rounded-2xl border border-stone-850">
        <div>
          <span className="text-xs font-mono px-3 py-1 bg-amber-900/40 text-amber-500 rounded-full uppercase border border-amber-800/40 tracking-wider">
            Section 11: AI Copilot Modules
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-stone-100 mt-2">
            AI Geotechnical Assistants
          </h2>
          <p className="text-stone-300 text-sm mt-1 max-w-xl">
            Leverage models to troubleshoot civil doubts, outline slope sliding calculations or upload images of site aggregates to estimate classifications.
          </p>
        </div>

        <div className="flex gap-2 bg-[#251B13] p-1.5 rounded-lg border border-amber-950">
          <button
            id="btn-subtab-chat"
            onClick={() => setActiveSubTab("chat")}
            className={`py-1.5 px-3 rounded text-xs px-4 font-sans font-semibold transition-all ${
              activeSubTab === "chat"
                ? "bg-amber-800 text-stone-150"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 inline mr-1.5" />
            Tutor Chat
          </button>
          <button
            id="btn-subtab-classify"
            onClick={() => setActiveSubTab("classifier")}
            className={`py-1.5 px-3 rounded text-xs px-4 font-sans font-semibold transition-all ${
              activeSubTab === "classifier"
                ? "bg-[#c86446] text-stone-150"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <FileImage className="w-3.5 h-3.5 inline mr-1.5" />
            Visual Classifier
          </button>
        </div>
      </div>

      {/* 2. CHAT TAB VIEW */}
      {activeSubTab === "chat" && (
        <div id="panel-doubt-chat" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quick recommendations / prompt panel */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-stone-500 block">
              Suggested Geotechnical doubts
            </span>
            <div className="space-y-2">
              {SUGGESTED_QUERIES.map((q, idx) => (
                <button
                  key={idx}
                  id={`btn-suggest-query-${idx}`}
                  onClick={() => handleSendMessage(q)}
                  className="w-full text-left p-3 rounded-xl bg-stone-900/60 border border-stone-850 hover:bg-[#1E1612] text-xs text-stone-300 transition-all flex justify-between items-center group"
                >
                  <span>{q}</span>
                  <CornerDownLeft className="w-3.5 h-3.5 text-stone-600 transition-colors group-hover:text-[#c86446]" />
                </button>
              ))}
            </div>

            <div className="bg-[#1C1714] p-4 rounded-xl border border-amber-900/10 text-xs text-stone-400 leading-normal">
              <span className="font-bold text-amber-500 block font-mono mb-1">DR. EARTH COPILOT:</span>
              Our tutor leverages the latest model parameters to address questions concerning USCS classifying, 3-phase ratios, consolidation times, or historical figures.
            </div>
          </div>

          {/* Chat main logs */}
          <div className="lg:col-span-8 bg-[#100D0B] rounded-2xl border border-stone-850 p-5 h-[480px] flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    m.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-[9px] font-mono text-stone-500 mb-0.5 uppercase">
                    {m.role === "user" ? "Student" : "Dr. Earth Tutor"}
                  </span>
                  <div
                    className={`p-3.5 rounded-2xl text-xs max-w-lg leading-relaxed relative ${
                      m.role === "user"
                        ? "bg-[#3D2C22] text-stone-200 rounded-tr-none border border-amber-900/20"
                        : "bg-[#181512] text-stone-200 rounded-tl-none border border-stone-800"
                    }`}
                  >
                    {/* Render text with basic markdown code formats */}
                    <p className="whitespace-pre-scroll leading-relaxed">{m.content}</p>

                    {/* Audio read-back handle on Tutor outputs */}
                    {m.role === "assistant" && idx > 0 && (
                      <button
                        id={`btn-speak-chat-${idx}`}
                        onClick={() => speakText(m.content)}
                        className={`absolute -right-7 top-2 text-stone-500 hover:text-cyan-400 p-1 rounded-full transition-colors ${isSpeaking ? "text-cyan-400 animate-pulse" : ""}`}
                        title="Voice Audio Narration"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start">
                  <span className="text-[9px] font-mono text-stone-500 mb-0.5 uppercase">Dr. Earth Tutor</span>
                  <div className="bg-[#1A1613] p-3 rounded-xl border border-stone-850 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-amber-500 animate-spin" />
                    <span className="text-xs text-stone-400 font-mono">Digging deep into technical textbooks...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input textbox */}
            <div className="flex gap-2 pt-4 border-t border-stone-850 mt-4">
              <input
                id="doubt-chatbot-text-input"
                type="text"
                placeholder="Ask Karl Terzaghi's formula or clay classifications..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
                className="flex-1 bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-stone-100 outline-none focus:border-[#c86446]/60 transition-colors"
              />
              <button
                id="doubt-chatbot-send-button"
                onClick={() => handleSendMessage()}
                className="p-3 bg-[#c86446] hover:bg-[#b05337] rounded-lg text-stone-200 font-bold transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. VISUAL SOIL CLASSIFIER VIEW */}
      {activeSubTab === "classifier" && (
        <div id="panel-soil-classifier" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Upload console */}
          <div className="lg:col-span-5 bg-[#120D0A] p-6 rounded-2xl border border-stone-850 flex flex-col justify-between h-[420px]">
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <div className="text-center space-y-1">
                <FileImage className="w-10 h-10 text-stone-600 mx-auto" />
                <h4 className="text-sm font-sans font-bold text-stone-200">Soil Specimen Upload</h4>
                <p className="text-[11px] text-stone-500 font-serif">Supports JPG, PNG visual core samples</p>
              </div>

              {/* Upload Drop Zone Box */}
              <div className="border border-dashed border-stone-800 rounded-xl p-4 text-center cursor-pointer bg-stone-950/60 hover:bg-stone-900/60 transition-all flex flex-col items-center justify-center relative min-h-[140px]">
                {selectedImage ? (
                  <div className="space-y-2 w-full flex flex-col items-center">
                    <img src={selectedImage} alt="soil sample" className="h-28 w-28 rounded object-cover border border-stone-800" />
                    <span className="text-[9px] font-mono text-stone-400">Sample ready for parsing</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <ClipboardCheck className="w-5 h-5 text-stone-500 mx-auto" strokeWidth={1.5} />
                    <span className="text-xs text-stone-300 block">Select image off disk</span>
                  </div>
                )}
                <input
                  id="classifier-file-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <button
              id="btn-trigger-classify-image"
              onClick={handleClassifyImage}
              disabled={!selectedImage || isClassifying}
              className="w-full py-3 bg-[#c86446] hover:bg-[#b05337] disabled:bg-stone-950 disabled:text-stone-700 text-stone-100 rounded-lg text-xs font-sans font-bold shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isClassifying && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              {isClassifying ? "Performing Chemical Diagnostic..." : "Analyze Specimen Core"}
            </button>
          </div>

          {/* Response board */}
          <div className="lg:col-span-7 bg-[#0E0C0A] border border-stone-850 rounded-2xl p-5 flex flex-col justify-between h-[420px]">
            <div className="space-y-3 flex-1 overflow-y-auto">
              <span className="text-[10px] font-mono uppercase bg-amber-900/40 text-[#ffae80] px-2 py-0.5 rounded w-fit block border border-amber-900/50">
                Dr. Earth Visual Estimation report:
              </span>

              {classificationResult ? (
                <div className="bg-[#1C1714] p-4.5 rounded-lg border border-stone-850 text-xs text-stone-200 font-serif leading-relaxed h-full pr-1 overflow-y-auto">
                  <p className="whitespace-pre-scroll leading-relaxed">{classificationResult}</p>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-xs text-stone-500 py-12 space-y-1">
                  <AlertCircle className="w-5 h-5 text-stone-700 mx-auto" />
                  <p>Awaiting sample core specimen...</p>
                  <p className="font-serif text-[11px]">Upload an image and run analysis to compile ASTM gradings estimate reports.</p>
                </div>
              )}
            </div>

            <div className="text-[9px] font-code text-stone-500 pt-3 border-t border-stone-900">
              Disclaimer: Visual metrics compiled dynamically for educational purposes. Site engineers must execute physical hydrometer sifting before structural works.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
