import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, ShieldAlert, Ruler, Eye, Quote, HelpCircle, ArrowUpRight } from "lucide-react";
import { GEOTECH_ENGINEERS } from "../data/soilData";

export default function EngineeringTimeline() {
  const [selectedIndex, setSelectedIndex] = useState<number>(1); // Default to Karl Terzaghi

  const selectedEngineer = GEOTECH_ENGINEERS[selectedIndex];

  const getEngineerIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass": return <Compass className="w-6 h-6 text-amber-500 animate-spin-slow" />;
      case "ShieldAlert": return <ShieldAlert className="w-6 h-6 text-[#c86446]" />;
      case "Ruler": return <Ruler className="w-6 h-6 text-emerald-400" />;
      case "Eye": return <Eye className="w-6 h-6 text-cyan-400" />;
      default: return <Compass className="w-6 h-6 text-amber-500" />;
    }
  };

  const MILESTONES = [
    { year: "1773", event: "Coulomb wedge theory of soils lateral thrust", author: "C. Coulomb" },
    { year: "1856", event: "Darcy's Law of fluid flow through sands", author: "H. Darcy" },
    { year: "1885", event: "Boussinesq elasticity formulation of deep point loads", author: "J. Boussinesq" },
    { year: "1925", event: "Publication of Erdbaumechanik (Effective stress)", author: "K. Terzaghi" },
    { year: "1948", event: "USCS soil cataloging system formulated", author: "A. Casagrande" },
    { year: "1960s", event: "Site telemetry & observational method integration", author: "R. Peck" }
  ];

  return (
    <div id="geotech-timeline-section" className="space-y-12">
      {/* 1. Introductory Quote & Title block */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-[#171412] p-8 rounded-2xl border border-amber-900/10">
        <div className="space-y-1.5 md:max-w-xl">
          <span className="text-xs font-mono px-3 py-1 bg-amber-900/20 text-amber-500 rounded-full uppercase border border-amber-800/30 tracking-wider">
            Section 4: Evolution &amp; Historical Giants
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-stone-100">
            Pioneers of Soil Mechanics
          </h2>
          <p className="text-stone-300 text-sm">
            Before mathematical geotechnical models, structures sank blindly. Explore the scientific revolution that replaced guesswork with cohesive soil mechanics equations.
          </p>
        </div>
        <div className="border-l-2 border-[#c86446]/40 pl-4 py-1.5 max-w-sm italic text-stone-400 text-xs font-serif bg-[#1F1713]/40 pr-3 rounded">
          <Quote className="w-4 h-4 text-amber-500 mb-1 opacity-55" />
          &ldquo;If a man builds a house and does not secure its foundations, and it collapses, that man is fully responsible.&rdquo;
          <span className="block mt-1.5 text-[9px] font-mono text-stone-500">— Codex Hammurabi (c. 1750 BC)</span>
        </div>
      </div>

      {/* 2. Interactive Milestones Timeline */}
      <section className="bg-[#100D0B] p-6 rounded-2xl border border-stone-800/80 space-y-6">
        <span className="text-xs uppercase tracking-widest font-mono text-stone-500 block">
          Key Milestones in Soil Engineering
        </span>

        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-900 -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 relative z-10">
            {MILESTONES.map((m, idx) => (
              <div
                key={idx}
                className="bg-[#171310] border border-stone-800 p-4 rounded-xl space-y-2 relative transition-all hover:border-[#c86446]/45"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-amber-500 font-mono">
                    {m.year}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-amber-500 ring-4 ring-amber-950/60 hidden md:block" />
                </div>
                <h4 className="text-stone-200 font-semibold text-xs leading-snug">
                  {m.event}
                </h4>
                <span className="text-[10px] font-mono text-stone-500 block">
                  Contrib: {m.author}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Detailed Engineer Showcase */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Engineers vertical lists */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-mono uppercase text-stone-500 block">
            Select a Geotechnical Pioneer
          </span>

          <div className="space-y-2.5">
            {GEOTECH_ENGINEERS.map((eng, idx) => (
              <button
                key={idx}
                id={`btn-engineer-${idx}`}
                onClick={() => setSelectedIndex(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                  selectedIndex === idx
                    ? "bg-[#291A14] border-[#c86446] text-stone-100 shadow-md transform translate-x-1"
                    : "bg-[#14110E] border-stone-900 text-stone-400 hover:bg-[#1C1511]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedIndex === idx ? "bg-amber-900/40 text-amber-400" : "bg-stone-900/80"}`}>
                    {getEngineerIcon(eng.iconName)}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm block text-stone-200">
                      {eng.name}
                    </h4>
                    <span className="text-[10px] text-stone-500 font-mono block">
                      Active: {eng.lifespan}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className={`w-4 h-4 transition-transform ${selectedIndex === idx ? "rotate-45 text-amber-500" : "text-stone-600"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Selected Engineer Detailed Board Card */}
        <div className="lg:col-span-7 bg-[#15110E] border border-[#c86446]/20 rounded-2xl p-6 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedEngineer.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="border-b border-amber-950 pb-4">
                <span className="text-xs font-mono text-amber-500 tracking-wider block">
                  {selectedEngineer.title}
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-sans text-stone-100 mt-1">
                  {selectedEngineer.name}
                </h3>
              </div>

              {/* Bio history text */}
              <p className="text-stone-300 text-sm leading-relaxed">
                {selectedEngineer.historyText}
              </p>

              {/* Achievements cards */}
              <div className="space-y-2 bg-[#1B1411] p-4 rounded-xl border border-amber-900/10">
                <span className="text-xs font-mono text-stone-400 uppercase tracking-wide block font-bold">
                  Major Scientific Contributions:
                </span>
                <ul className="space-y-2 text-xs">
                  {selectedEngineer.contributions.map((con, idx) => (
                    <li key={idx} className="text-stone-300 flex gap-2 items-start">
                      <span className="text-[#c86446] font-bold font-mono mt-0.5">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inspiring quote block */}
              <div className="bg-[#2D1B13]/30 p-4 rounded-xl border-l-4 border-[#c86446]">
                <p className="text-stone-200 text-xs italic font-serif leading-relaxed">
                  &ldquo;{selectedEngineer.quote}&rdquo;
                </p>
                <span className="text-[9px] font-mono text-[#DCA287] block mt-1.5 uppercase">
                  — Direct Quote / Professional philosophy
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="text-[10px] font-mono text-stone-500 text-right mt-6">
            Geotechnical Engineering timeline records • Updated 2026
          </div>
        </div>
      </section>
    </div>
  );
}
