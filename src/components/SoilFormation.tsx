import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Hammer, Beaker, Leaf, RotateCcw, ArrowRight, Sun, Droplets, Clock, Globe } from "lucide-react";
import { ROCK_WEATHERINGS } from "../data/soilData";

export default function SoilFormation() {
  const [activeWeathering, setActiveWeathering] = useState<string>("physical");
  const [formationStage, setFormationStage] = useState<number>(0);
  const [activeFactor, setActiveFactor] = useState<string>("climate");

  const STAGES = [
    {
      title: "Stage 1: Solid Bedrock",
      time: "Initial Era",
      visual: "bedrock",
      description: "Massive solid parent rock (Igneous, Metamorphic, or Sedimentary) lies exposed to environmental conditions. Zero soil layers exist at this point. High tectonic fracture lines are ready to receive surface water.",
      composition: "100% Consolidated Mineral Rock Base",
      density: "High density (2200 - 3000 kg/m³)",
    },
    {
      title: "Stage 2: Disintegration",
      time: "1,000+ Years",
      visual: "fracturing",
      description: "Severe diurnal heat shifts and frost wedging shatter structural physical bonds. Rain water infiltrates microscopic fissures, dissolving soluble minerals and reacting with chemical elements. Microscopic fissures expand.",
      composition: "70% Coarse Rock Blocks, 30% Unconsolidated Scree",
      density: "Bulk density decreases, high porosity starts.",
    },
    {
      title: "Stage 3: Primitive Bioreactivity",
      time: "10,000+ Years",
      visual: "primitive",
      description: "Moss, lichens, and microscopic bacteria colonize fine gravel clefts. Decomposing organic acid digests solid silica bases. Fine soil particles start accumulating, capturing dust particles carried by wind currents.",
      composition: "50% Rock Debris, 40% Fine Silt/Sand, 10% Early Humus",
      density: "Loose, weak shear resistance, initial vegetation takes root.",
    },
    {
      title: "Stage 4: Fully Developed Soil Profile",
      time: "100,000+ Years",
      visual: "developed",
      description: "Continuous mechanical, biochemical leaching, and vertical clay washing organize the earth into horizontal horizons (O, A, B, C, R). Deep biological roots thrive. Clay accumulation layers are now capable of plastic water storage.",
      composition: "45% Minerals, 5% Organic Humus, 25% Water Voids, 25% Air voids",
      density: "Balanced soil matrix with stable geotechnical stiffness levels.",
    }
  ];

  const FACTORS = [
    {
      id: "parent-rock",
      title: "Parent Rock Base",
      icon: Hammer,
      text: "Dictates the initial mineral chemical structure, physical crystal size, grain cohesion, and potential rate of weathering. Dark basaltic rock weather much faster than crystalline quartz-rich granite, giving rise to distinct clay minerals.",
      badge: "Chemical Origin"
    },
    {
      id: "climate",
      title: "Climate & Moisture",
      icon: Sun,
      text: "The chief driver of weathering. Heavy precipitation triggers intense chemical hydrolysis, carbonation, and washes fine clay downwards. High temperatures accelerate biochemical weathering reactions double fold for every 10°C rise.",
      badge: "Weathering Speed"
    },
    {
      id: "organisms",
      title: "Biological Organisms",
      icon: Leaf,
      text: "Plants wedge rock crevices via root expansion pressures up to 15 MPa. Organic debris decomposition releases humic acids which dissolve mineral blocks. Earthworms and micro-organisms continuously churn soil, mixing horizons.",
      badge: "Organic Binding"
    },
    {
      id: "topography",
      title: "Relief / Topography",
      icon: Globe,
      text: "Steep slopes experience high water runoff speeds and rapid gravitational erosion, leading to thin soil layers (unstable transported colluvium). Flatter valley basins gather rich deposits and build deep, uniform soil horizons.",
      badge: "Layer Thickness"
    },
    {
      id: "time",
      title: "Geological Time Scale",
      icon: Clock,
      text: "Mature clay formation and distinct horizon layering require vast uninterrupted eras. Soil is classified as a non-renewable natural asset since producing just 1 cm of clean, stable topsoil requires upwards of 200 to 400 human years.",
      badge: "Eon Scale"
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Hammer": return <Hammer className="w-5 h-5 text-amber-500" />;
      case "Beaker": return <Beaker className="w-5 h-5 text-cyan-400" />;
      case "Leaf": return <Leaf className="w-5 h-5 text-emerald-500" />;
      default: return <Hammer className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div id="soil-formation-container" className="space-y-12">
      {/* 1. Header Overview */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-[#1F1712] p-6 rounded-2xl border border-amber-900/30">
        <div>
          <span className="text-xs font-mono px-3 py-1 bg-amber-900/40 text-amber-400 rounded-full uppercase border border-amber-800/40 tracking-wider">
            Section 2: Soil Formation Dynamics
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-stone-100 mt-2">
            The Rock-To-Soil Metamorphosis
          </h2>
          <p className="text-stone-300 text-sm mt-1 max-w-xl">
            Soil is not stationary dirt; it is a dynamic multi-phase biochemical matrix born from the relentless weathering forces of nature. Explore how rocks turn to soil.
          </p>
        </div>
        <div className="bg-[#2D221A] py-3 px-5 rounded-lg border border-amber-800/30 text-stone-200 text-xs font-mono">
          <span className="text-amber-500 font-bold font-sans text-sm block">residual vs transported</span>
          <div className="mt-1">
            <span className="text-stone-300 font-semibold text-emerald-400">Residual:</span> Stays above parent rock.<br />
            <span className="text-stone-300 font-semibold text-amber-400">Transported:</span> Moved by wind, rivers, or glaciers.
          </div>
        </div>
      </div>

      {/* 2. Three Weathering Forces */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-lg font-sans font-semibold text-stone-200">
            Agents of Weathering
          </h3>
          <p className="text-stone-400 text-xs">
            Nature uses mechanical breakdown, chemical reactions, and biological pressures to break solid rocks. Click each process to see mechanisms:
          </p>

          <div className="space-y-2 mt-4">
            {ROCK_WEATHERINGS.map((w) => (
              <button
                key={w.id}
                id={`btn-weathering-${w.id}`}
                onClick={() => setActiveWeathering(w.id)}
                className={`w-full text-left p-4 rounded-xl flex items-center justify-between border transition-all ${
                  activeWeathering === w.id
                    ? "bg-[#3D2D23] border-[#92553B] text-stone-100 shadow-lg"
                    : "bg-[#18120D] border-[#2E2018] text-stone-400 hover:bg-[#201813]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    activeWeathering === w.id ? "bg-[#543E30]" : "bg-[#251B14]"
                  }`}>
                    {getIcon(w.iconName)}
                  </div>
                  <div>
                    <span className="font-sans font-medium text-sm block">{w.title}</span>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-stone-500">
                      {w.type} weather agent
                    </span>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform ${activeWeathering === w.id ? "translate-x-1 text-amber-500" : "text-stone-600"}`} />
              </button>
            ))}
          </div>

          <div className="bg-[#2a170f]/40 p-4 rounded-xl border border-[#c86446]/20 mt-4 text-[11px] text-stone-300 space-y-1">
            <span className="font-semibold block text-amber-400">🚨 GATE Engineering Tip:</span>
            <span>Residual soils generally present higher angularity and shear strength. Transported alluvial soils have rounded particles with layering structures that can compress under load.</span>
          </div>
        </div>

        {/* Weathering details & Interactive Illustration */}
        <div className="lg:col-span-2 bg-[#15100C] rounded-2xl border border-amber-900/20 p-6 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {ROCK_WEATHERINGS.map((w) => {
              if (w.id !== activeWeathering) return null;
              return (
                <motion.div
                  key={w.id}
                  id={`panel-weathering-${w.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 h-full flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xl font-bold font-sans text-amber-400 flex items-center gap-2">
                        {w.title} Mechanisms
                      </h4>
                      <span className="text-xs bg-amber-950 px-2 py-1 border border-amber-950 rounded font-code text-stone-300">
                        {w.type} Mode
                      </span>
                    </div>

                    <p className="text-stone-300 text-sm leading-relaxed">
                      {w.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      {w.mechanisms.map((mech, idx) => (
                        <div key={idx} className="flex gap-2 items-start bg-[#1F1713] p-3 rounded-lg border border-amber-900/10">
                          <span className="text-amber-500 font-bold font-mono text-xs mt-0.5">0{idx + 1}.</span>
                          <span className="text-stone-200 text-xs leading-normal">{mech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactively Illustrated weathering simulator */}
                  <div className="mt-6 bg-[#211915] p-4 rounded-xl border border-amber-900/30 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="space-y-1 text-center md:text-left">
                      <span className="text-[10px] text-stone-500 font-mono uppercase block">Real world field observation</span>
                      <p className="text-stone-200 text-xs italic font-sans">
                        &ldquo;{w.example}&rdquo;
                      </p>
                    </div>

                    {/* Simple mechanical vector simulation of weathering rock */}
                    <div className="w-full md:w-44 h-24 bg-[#110D0A] rounded-lg border border-amber-950 flex items-center justify-center relative overflow-hidden">
                      {w.id === "physical" ? (
                        <div className="w-full h-full flex items-center justify-center relative">
                          <div className="absolute w-12 h-12 bg-stone-700 rounded rotate-45 border border-stone-500 flex items-center justify-center">
                            <span className="text-stone-500 font-bold text-[10px]">ROCK</span>
                          </div>
                          {/* Freeze Arrows expanding */}
                          <motion.div animate={{ scale: [0.9, 1.2, 0.9] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute text-cyan-400 font-bold text-[8px] flex justify-between w-20">
                            <span>❄️ FREEZE</span>
                            <span>EXPAND ❄️</span>
                          </motion.div>
                          <span className="absolute bottom-1 text-[8px] text-stone-500 font-mono">Micro-Crack Wedging</span>
                        </div>
                      ) : w.id === "chemical" ? (
                        <div className="w-full h-full flex items-center justify-center relative">
                          {/* Acid dissolving bubble vectors */}
                          <div className="w-10 h-10 bg-amber-800/40 rounded-full border border-amber-600 flex items-center justify-center blur-[1px]">
                            <span className="text-amber-300 font-bold text-[8px]">ACID H₂O</span>
                          </div>
                          <motion.div animate={{ y: [-15, 10], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 bg-yellow-500 rounded-full absolute left-14" />
                          <motion.div animate={{ y: [-10, 15], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.5 }} className="w-1.5 h-1.5 bg-[#c86446] rounded-full absolute right-12" />
                          <span className="absolute bottom-1 text-[8px] text-stone-400 font-mono">Hydrolysis Dissolution</span>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center relative">
                          {/* Roots wedging */}
                          <div className="w-12 h-5 bg-emerald-950/60 rounded border border-emerald-800 flex items-center justify-center">
                            <span className="text-emerald-400 text-[8px] font-bold font-sans">ROOTS</span>
                          </div>
                          <motion.div animate={{ scaleX: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="h-1 bg-emerald-600 w-16 absolute" />
                          <span className="absolute bottom-1 text-[8px] text-stone-500 font-mono">Tree Root Pressure</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Soil Formation Timeline Slider Section */}
      <section className="bg-[#15100B] p-6 rounded-2xl border border-amber-900/10 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b border-amber-900/20 pb-4">
          <div>
            <h3 className="text-lg font-sans font-bold text-stone-100 flex items-center gap-2">
              Soil Evolution Timeline
            </h3>
            <p className="text-stone-300 text-xs">
              Drag or click the slider stages below to watch parent bedrock weather into organized horizons.
            </p>
          </div>
          <div className="flex gap-1.5 items-center bg-[#251B13] p-1.5 rounded-lg border border-amber-900/30">
            {STAGES.map((_, idx) => (
              <button
                key={idx}
                id={`btn-stage-selector-${idx}`}
                onClick={() => setFormationStage(idx)}
                className={`px-3 py-1 text-xs rounded font-sans transition-all ${
                  formationStage === idx
                    ? "bg-amber-700 text-stone-100 font-semibold"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                Stage {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline details container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="text-xs text-amber-500 font-mono tracking-widest uppercase font-bold">
                {STAGES[formationStage].time}
              </span>
              <h4 className="text-xl font-bold font-sans text-stone-100">
                {STAGES[formationStage].title}
              </h4>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed">
              {STAGES[formationStage].description}
            </p>

            <div className="bg-[#221A14] p-4 rounded-xl border border-amber-900/20 space-y-2">
              <div className="flex justify-between items-center text-xs text-stone-300 font-mono">
                <span>Composition:</span>
                <span className="text-amber-400">{STAGES[formationStage].composition}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-stone-300 font-mono">
                <span>Geotech Density note:</span>
                <span className="text-emerald-400">{STAGES[formationStage].density}</span>
              </div>
            </div>
          </div>

          {/* Interactive Geological Vector Diagram */}
          <div className="lg:col-span-7 bg-[#0E0B08] border border-amber-900/30 rounded-xl p-5 h-72 flex flex-col justify-between relative overflow-hidden">
            <span className="text-[9px] font-mono text-stone-500 absolute top-2 right-3 uppercase">Geotechnical soil horizon visualizer</span>

            {/* Stages vector stack */}
            <div className="flex-1 w-full flex flex-col justify-end gap-1.5 pb-2">
              {formationStage >= 0 && (
                <div className="h-10 bg-stone-700 rounded-lg border border-stone-600 flex items-center justify-center text-xs text-stone-300 font-bold relative">
                  <span>Bedrock Base (R Horizon)</span>
                  <div className="absolute inset-0 bg-stone-800/20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.05)_75%)] bg-[size:10px_10px]" />
                </div>
              )}

              {formationStage >= 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 44 }}
                  className="bg-[#6E5743] rounded-lg border border-[#836C58] flex items-center justify-center text-xs text-[#EADED2] font-semibold relative overflow-hidden"
                >
                  <span>C Horizon (Weathered Saprolite)</span>
                  <div className="absolute top-1 left-2 text-[8px] font-mono text-[#D8B48F]">Coarse chunks</div>
                </motion.div>
              )}

              {formationStage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 44 }}
                  className="bg-[#A0704E]/90 rounded-lg border border-[#B98E6E] flex items-center justify-center text-xs text-[#FFF3E8] font-semibold relative overflow-hidden"
                >
                  <span>B Horizon (Fine Clay Subsoil accumulate)</span>
                  <div className="absolute top-1 left-2 text-[8px] font-mono text-[#E9C3A6]">Plastic shear zone</div>
                </motion.div>
              )}

              {formationStage >= 3 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 44 }}
                  className="bg-[#423126] rounded-lg border border-[#524135] flex items-center justify-center text-xs text-[#EDE2D9] font-semibold relative overflow-hidden"
                >
                  <span>A &amp; O Horizons (Top Organic Layer)</span>
                  <div className="absolute inset-x-0 top-0 h-1 bg-green-950 flex items-center justify-center">
                    <span className="text-[6px] text-green-400 font-bold uppercase tracking-wider">Humus Vegetation Ground</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Slider Control Handle */}
            <div className="space-y-2 pt-3 border-t border-amber-900/20">
              <div className="flex justify-between items-center text-xs text-stone-400 font-mono">
                <span>Timeline Progress</span>
                <span>{Math.round(((formationStage + 1) / 4) * 100)}% Soil Maturity</span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                value={formationStage}
                onChange={(e) => setFormationStage(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-[#251A13] rounded-lg cursor-pointer"
                id="soil-formation-timeline-slider"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Five Core Factors of Soil Formation (Soil Genesa) */}
      <section className="space-y-4">
        <h3 className="text-lg font-sans font-bold text-stone-200">
          The Five Fundamental Factors of Soil Genesa
        </h3>
        <p className="text-stone-400 text-xs">
          Dokuchaev &amp; Hans Jenny defined these five variables as absolute determinants of the soil layout. Select each to read:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {FACTORS.map((f) => {
            const IconComp = f.icon;
            return (
              <button
                key={f.id}
                id={`btn-factor-${f.id}`}
                onClick={() => setActiveFactor(f.id)}
                className={`p-4 rounded-xl text-center border transition-all flex flex-col items-center gap-2 ${
                  activeFactor === f.id
                    ? "bg-[#3D2114] border-[#92553B] text-stone-100 shadow-md transform -translate-y-0.5"
                    : "bg-[#18110D] border-[#2E1F18]/50 text-stone-400 hover:bg-[#201712]"
                }`}
              >
                <div className={`p-2.5 rounded-full ${activeFactor === f.id ? "bg-amber-700/30 text-amber-400" : "bg-stone-900/60 text-stone-500"}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="font-sans font-semibold text-xs">{f.title}</span>
                <span className="text-[8px] bg-stone-900 px-1.5 py-0.5 rounded text-stone-500 uppercase font-mono">
                  {f.badge}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {FACTORS.map((f) => {
            if (f.id !== activeFactor) return null;
            return (
              <motion.div
                key={f.id}
                id={`desc-factor-${f.id}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-5 rounded-xl bg-[#281A12] border border-amber-900/40 text-stone-200 text-xs leading-relaxed space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-400">Jenny&apos;s Engineering Equation:</span>
                  <span className="font-code bg-stone-950 px-2 py-0.5 rounded text-stone-300">Soil = f( Cl, O, R, P, T )</span>
                </div>
                <p className="text-stone-200 font-sans text-sm">{f.text}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>
    </div>
  );
}
