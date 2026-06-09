import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, ShieldAlert, Sparkles, Droplets, Landmark, HelpCircle, HardHat, Construction } from "lucide-react";

export default function ImportanceAndFailures() {
  const [activeFailure, setActiveFailure] = useState<"settlement" | "slope" | "seepage">("settlement");
  const [isReinforced, setIsReinforced] = useState<boolean>(false);
  const [isSimulated, setIsSimulated] = useState<boolean>(false);

  const FAILURES = {
    settlement: {
      title: "Differential Clay Settlement Failure",
      structuralContext: "Placing a rigid building directly on soft consolidated clay with localized water table drainage.",
      mechanism: "As structural deadweight presses downward, water gets slowly squeezed out of pore channels in the clay layer. Differential rates of water consolidation lead to tilting tilt moments, causing drywall fracturing or sudden building rotation.",
      consequence: "Sudden structural tilts, sheared subterranean sewage lines, wall buckling.",
      reinforcement: "Steel Underpinning Piles driven deep to sound basal Bedrock.",
      visualBefore: "Building level on soft clay sediment layers.",
      visualAfter: "Building severely tilted southward, clay compressed unevenly."
    },
    slope: {
      title: "Hillside Slump & Landslide Shear Failure",
      structuralContext: "Constructing highways or homes on steep saturated silt inclines without lateral support.",
      mechanism: "High rain water refills porous cracks behind slopes. Saturated grain buoyancy raises pore pressures (u), which reduces normal effective stress. Frictional clamping resistance drops to zero along the slip circular shear arc.",
      consequence: "Rapid gravity slip slides, burying valleys and fracturing structural columns.",
      reinforcement: "Driven Soil Nails + Tensioned Anchor Tie-backs + French weep drains.",
      visualBefore: "Stable steep hillside with a highway on horizontal bedding.",
      visualAfter: "Hillside sheared along a circular arc, wiping out the road alignment."
    },
    seepage: {
      title: "Seepage Piping & Reservoir Cavitation Failure",
      structuralContext: "Storing large heads of water behind earthern levees or concrete gravity dams.",
      mechanism: "Water seeps below concrete gravity dams, following structural gradients. If outflow velocity exceeds the critical limit, water flushes loose silt particles out, drilling subterranean tunnels (piping channels) beneath the base.",
      consequence: "Sudden reservoir sinkhole bypass flow, washing foundations and triggering instant dam breach collapses.",
      reinforcement: "Concrete Grout Curtain wall + Upstream impervious clay liner blankets.",
      visualBefore: "Reservoir filled with stable downstream water filtration lines.",
      visualAfter: "Under-seepage tunnels drilled wide, collapsing the concrete dam blocks."
    }
  };

  const currentFailure = FAILURES[activeFailure];

  const handleTestSimulation = () => {
    setIsSimulated(true);
  };

  const handleResetSimulation = () => {
    setIsSimulated(false);
    setIsReinforced(false);
  };

  return (
    <div id="importance-failures-container" className="space-y-12">
      {/* 1. Introductory Row */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-[#1D1612] p-6 rounded-2xl border border-stone-800">
        <div>
          <span className="text-xs font-mono px-3 py-1 bg-[#c86446]/20 text-[#c86446] rounded-full uppercase border border-[#c86446]/40 tracking-wider">
            Section 5: Practical Structural Failure Labs
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-stone-100 mt-2">
            Why Geotechnical Analysis is Critical
          </h2>
          <p className="text-stone-300 text-sm mt-1 max-w-xl">
            95% of major civil structures rely directly on the earth support. Saturated or weak soils will shear, compress, or wash away if unengineered. Explore failure mechanics here.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="bg-[#1C1E1D] p-3 rounded-lg border border-stone-800 text-xs">
            <span className="font-bold text-emerald-400 block">✔ Safely Engineered</span>
            <span className="text-stone-400">Zero settlement risk</span>
          </div>
          <div className="bg-[#1E1C1D] p-3 rounded-lg border border-stone-800 text-xs">
            <span className="font-bold text-[#c86446] block">✘ Fails blindly</span>
            <span className="text-stone-400">Without proper soil modeling</span>
          </div>
        </div>
      </div>

      {/* 2. Applications of Soil Engineering Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#15110E] p-5 rounded-2xl border border-amber-900/10 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-amber-950/50 flex items-center justify-center text-amber-500 font-bold">
            01
          </div>
          <h4 className="text-stone-200 font-sans font-bold text-sm">Building Foundations</h4>
          <p className="text-stone-400 text-xs leading-relaxed">
            Distributes immense skyscraper weight to layers capable of resisting plastic consolidation. Shallow strip foundations or deep friction piles are selected based on clay index profiles.
          </p>
        </div>

        <div className="bg-[#15110E] p-5 rounded-2xl border border-amber-900/10 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/50 flex items-center justify-center text-emerald-400 font-bold">
            02
          </div>
          <h4 className="text-stone-200 font-sans font-bold text-sm">Dams &amp; Levees</h4>
          <p className="text-stone-400 text-xs leading-relaxed">
            Earth fill dams utilize Impermeable high-potency clay core barriers to slow water seepage, while utilizing coarse heavy gravel shell slopes to ensure structural slope sliding weight.
          </p>
        </div>

        <div className="bg-[#15110E] p-5 rounded-2xl border border-amber-900/10 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-cyan-950/50 flex items-center justify-center text-cyan-400 font-bold">
            03
          </div>
          <h4 className="text-stone-200 font-sans font-bold text-sm">Highways &amp; Runways</h4>
          <p className="text-stone-400 text-xs leading-relaxed">
            Pavements distribute loads downward. Heavy clay subgrade absorbs moisture, causing frost swelling heave and road cracking. Geotech adds sub-base soil stabilizing aggregate layers.
          </p>
        </div>
      </section>

      {/* 3. Interactive Geotechnical Failure Lab Sandbox */}
      <section className="bg-[#110D0B] p-6 rounded-2xl border border-[#c86446]/10 space-y-8">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center border-b border-amber-990 pb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-sans font-bold text-stone-100 flex items-center gap-2">
              <HardHat className="w-5 h-5 text-amber-500" />
              Dynamic Failure Mode Simulator
            </h3>
            <p className="text-stone-300 text-xs">
              Select a geotechnical failure risk, toggle modern reinforcements, and press Simulate to see the structural outcome!
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-[#1F1713] p-1.5 rounded-lg border border-amber-950">
            <button
              id="btn-select-settlement-sim"
              onClick={() => { setActiveFailure("settlement"); handleResetSimulation(); }}
              className={`px-3 py-1.5 rounded text-xs px-4 font-sans transition-all ${
                activeFailure === "settlement"
                  ? "bg-amber-800 text-stone-100 font-bold"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Differential Settlement
            </button>
            <button
              id="btn-select-slope-sim"
              onClick={() => { setActiveFailure("slope"); handleResetSimulation(); }}
              className={`px-3 py-1.5 rounded text-xs px-4 font-sans transition-all ${
                activeFailure === "slope"
                  ? "bg-[#c86446] text-stone-100 font-bold"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Slope Shear Slide
            </button>
            <button
              id="btn-select-seepage-sim"
              onClick={() => { setActiveFailure("seepage"); handleResetSimulation(); }}
              className={`px-3 py-1.5 rounded text-xs px-4 font-sans transition-all ${
                activeFailure === "seepage"
                  ? "bg-emerald-800 text-stone-100 font-bold"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Dam Piping Washout
            </button>
          </div>
        </div>

        {/* Simulator Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0C0A09] p-6 rounded-xl border border-stone-900">
          {/* Visual stage vector */}
          <div className="lg:col-span-7 h-80 bg-[#161210] rounded-xl border-2 border-stone-800 flex flex-col justify-between p-5 relative overflow-hidden">
            <span className="text-[9px] font-mono text-stone-500 ml-auto uppercase block">Simulation sandbox</span>

            {/* Core visual representations */}
            <div className="flex-1 w-full flex items-center justify-center relative mt-4">
              {activeFailure === "settlement" ? (
                <div className="w-full h-full flex flex-col justify-end items-center relative gap-0.5">
                  {/* Building model */}
                  <motion.div
                    animate={
                      isSimulated
                        ? isReinforced
                          ? { y: 0, rotate: 0 }
                          : { y: 15, rotate: -8 }
                        : { y: 0, rotate: 0 }
                    }
                    transition={{ type: "spring", stiffness: 60 }}
                    className="w-40 h-28 bg-[#2A2928] rounded border-2 border-stone-600 flex flex-col justify-between p-2 relative z-20 shadow-lg"
                  >
                    <div className="grid grid-cols-4 gap-1.5 flex-1">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-amber-500/10 border border-amber-900/30 rounded" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-stone-400 text-center uppercase block font-semibold border-t border-stone-700 pt-1">
                      Rigid Masonry structure
                    </span>

                    {/* Show deep reinforced pile legs */}
                    {isReinforced && (
                      <div className="absolute inset-x-0 top-full h-32 flex justify-around pointer-events-none">
                        <div className="w-2.5 bg-cyan-500 border border-cyan-300 relative">
                          <span className="absolute -left-10 text-[6px] text-cyan-400 font-mono top-10 uppercase">Deep Piles</span>
                        </div>
                        <div className="w-2.5 bg-cyan-500 border border-cyan-300" />
                      </div>
                    )}
                  </motion.div>

                  {/* Saturated clay bed below building */}
                  <div className="w-full h-24 bg-[#7A5A43] border-t border-stone-900 rounded-lg flex flex-col justify-between p-2 relative overflow-hidden">
                    {/* Clay lenses */}
                    <div className="absolute left-0 right-1/2 bottom-0 h-10 bg-[#543A29] rounded-r-full border-t border-amber-900/40" />

                    {/* Sinking representation indicators */}
                    {!isReinforced && isSimulated && (
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="absolute bottom-1 right-8 text-[10px] text-[#c86446] font-bold font-mono">
                        CONSOLIDATING CLAY LENS!
                      </motion.div>
                    )}

                    <div className="flex justify-between items-center text-[9px] font-mono text-[#F1E4C3] z-10">
                      <span>Soft marine Silt</span>
                      <span>Compressible Clay Lens (South-side)</span>
                    </div>
                  </div>
                </div>
              ) : activeFailure === "slope" ? (
                <div className="w-full h-full flex flex-col justify-end relative">
                  {/* Diagonal inclined slope */}
                  <div className="absolute inset-0 flex items-end">
                    <svg viewBox="0 0 500 220" className="w-full h-56 overflow-visible">
                      {/* Hill body */}
                      <path d="M 0 50 L 250 80 L 450 200 L 500 220 L 0 220 Z" fill="#937C6D" stroke="#5D4B40" strokeWidth="2" />

                      {/* Sliding section path which rotates down on slide simulation */}
                      <motion.path
                        d="M 230 78 C 300 100, 380 150, 440 198 L 410 220 L 250 220 Z"
                        fill={isSimulated && !isReinforced ? "#c86446" : "#A58C7C"}
                        animate={
                          isSimulated && !isReinforced
                            ? { x: 30, y: 35, rotate: 12, opacity: 0.8 }
                            : { x: 0, y: 0, rotate: 0 }
                        }
                        transition={{ type: "spring", damping: 12 }}
                      />

                      {/* Small highway symbol */}
                      <motion.rect
                        x="230"
                        y="66"
                        width="35"
                        height="10"
                        fill="#333"
                        stroke="#fff"
                        strokeWidth="0.5"
                        animate={
                          isSimulated && !isReinforced
                            ? { x: 38, y: 45, rotate: 20 }
                            : { x: 0, y: 0, rotate: 0 }
                        }
                      />

                      {/* Reinforcing soil nails */}
                      {isReinforced && (
                        <g>
                          <line x1="220" y1="75" x2="160" y2="180" stroke="#00ffff" strokeWidth="3" />
                          <line x1="280" y1="100" x2="190" y2="190" stroke="#00ffff" strokeWidth="3" />
                          <text x="140" y="210" fill="#22d3ee" fontSize="10" fontFamily="monospace">Active Soil Nails</text>
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="absolute top-2 left-3 text-[10px] font-mono text-stone-200 bg-black/60 px-2 rounded">
                    Inclined Silt bed. Tension crack failure planes.
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col justify-end relative">
                  {/* Dam piping structural cross-section */}
                  <svg viewBox="0 0 500 220" className="w-full h-56 overflow-visible">
                    {/* Downstream ground */}
                    <rect x="0" y="160" width="500" height="60" fill="#756254" />

                    {/* Concrete gravity block */}
                    <motion.polygon
                      points="180,60 260,160 140,160"
                      fill="#4A4947"
                      stroke="#8C8A87"
                      strokeWidth="2"
                      animate={
                        isSimulated && !isReinforced
                          ? { rotate: 5, y: 8, x: 5 }
                          : { rotate: 0, y: 0, x: 0 }
                      }
                    />

                    {/* Water reservoir */}
                    <rect x="0" y="70" width="160" height="90" fill="rgba(6, 182, 212, 0.3)" />
                    <text x="20" y="100" fill="#22d3ee" fontSize="12" fontWeight="bold">Reservoir Head</text>

                    {/* Piping tunnels rendering */}
                    {isSimulated && !isReinforced && (
                      <g>
                        {/* Wavy seepage tunnels flashing */}
                        <path d="M 120 165 Q 160 175 220 162" fill="none" stroke="#22d3ee" strokeWidth="6" strokeDasharray="5,2" />
                        <path d="M 100 178 Q 170 188 240 175" fill="none" stroke="#c86446" strokeWidth="4" />
                        <text x="260" y="150" fill="#f87171" fontSize="10" fontFamily="sans" fontWeight="bold">HYDRAULIC PIPING!</text>
                      </g>
                    )}

                    {/* Grout curtain wall */}
                    {isReinforced && (
                      <g>
                        <line x1="150" y1="160" x2="150" y2="218" stroke="#22d3ee" strokeWidth="4.5" />
                        <text x="90" y="210" fill="#22d3ee" fontSize="9" fontFamily="monospace">Grout Curtain cut-off</text>
                      </g>
                    )}
                  </svg>
                </div>
              )}
            </div>

            {/* Reset / Reinforce controls */}
            <div className="flex justify-between items-center bg-[#1F1713] p-3 rounded-lg border border-amber-950 mt-4 text-xs">
              <span className="text-stone-300 font-mono">
                Status: {isSimulated ? (isReinforced ? "🛡️ Reinforcement Successful (Strict Stability)" : "💥 FAILED: Shear rupture limit breached") : "⏱️ Awaiting exposure load..."}
              </span>

              <button
                id="btn-toggle-reinforce-sim"
                onClick={() => { setIsReinforced(!isReinforced); setIsSimulated(false); }}
                className={`px-3 py-1 text-[11px] rounded transition-all font-sans font-semibold flex items-center gap-1.5 ${
                  isReinforced
                    ? "bg-emerald-700 text-stone-100 border border-emerald-500"
                    : "bg-stone-800 text-stone-300 border border-stone-700 hover:text-stone-100"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {isReinforced ? "Soil reinforced" : "Apply Geotech solution"}
              </button>
            </div>
          </div>

          {/* Theoretical explanation Column */}
          <div className="lg:col-span-5 h-full flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 block">
                Technical Failure Mechanics
              </span>
              <h4 className="text-xl font-bold font-sans text-stone-200">
                {currentFailure.title}
              </h4>

              <div className="space-y-2 text-xs">
                <p className="text-stone-300">
                  <strong className="text-stone-200 block">Typical Context:</strong>
                  {currentFailure.structuralContext}
                </p>
                <p className="text-stone-400 leading-relaxed">
                  <strong className="text-stone-200 block">Erosion Mechanism:</strong>
                  {currentFailure.mechanism}
                </p>
                <p className="text-[#f87171] bg-red-950/20 p-2.5 rounded border border-red-950/30">
                  <strong className="text-red-300 block mb-0.5">Civil Consequence:</strong>
                  {currentFailure.consequence}
                </p>
                <p className="text-emerald-400 bg-emerald-950/20 p-2.5 rounded border border-emerald-950/30">
                  <strong className="text-emerald-300 block mb-0.5">Recommended Geotechnical Remedy:</strong>
                  {currentFailure.reinforcement}
                </p>
              </div>
            </div>

            <div className="flex gap-2 w-full pt-4 border-t border-amber-950/30 text-xs">
              <button
                id="btn-trigger-simulation-active"
                onClick={handleTestSimulation}
                disabled={isSimulated}
                className="flex-1 py-2.5 bg-amber-800 hover:bg-amber-700 disabled:bg-stone-900 disabled:text-stone-700 text-stone-100 rounded-lg hover:text-white transition-all font-bold"
              >
                Simulate Loading Exposure
              </button>
              <button
                id="btn-reset-simulation"
                onClick={handleResetSimulation}
                className="py-2.5 px-4 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 rounded-lg transition-all"
              >
                Reset Lab
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mini Before vs After comparative table or quick tips */}
      <section className="bg-[#120F0D] p-5 rounded-2xl border border-amber-900/10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 text-xs leading-normal">
          <span className="font-bold text-amber-500 font-mono block">SOIL COMPACTION BENEFITS:</span>
          <p className="text-stone-400">
            Applying active mechanical weight knocks air out of soil matrix, forcing solids closer. This raises the dry density, which drastically scales up Coulomb shear resistance (<span className="font-mono text-amber-400">τ</span>), reduces subsequent rain water permeability index, and offsets settlement risk.
          </p>
        </div>
        <div className="space-y-2 text-xs leading-normal">
          <span className="font-bold text-cyan-400 font-mono block">DRAINAGE CONTROL IMPORTANCE:</span>
          <p className="text-stone-400">
            Excess groundwater is soil mechanics primary enemy. Under-drainage tubes, gravel blankets, and slope weep lines ensure water pressure stays zero, preserving physical soil frictional clamping forces.
          </p>
        </div>
      </section>
    </div>
  );
}
