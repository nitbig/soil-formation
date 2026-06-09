import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, Check, HelpCircle, Flame, Droplets, ArrowRight, Table } from "lucide-react";
import { SOIL_PROFILE_LAYERS } from "../data/soilData";

export default function SoilProfile() {
  const [waterTableDepth, setWaterTableDepth] = useState<number>(3.5); // Meters down
  const [excavationDepth, setExcavationDepth] = useState<number>(0); // Meters excavated down
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const calculateSaturatedState = (startMeters: number, endMeters: number) => {
    // If ground water depth intersects this horizon range
    if (waterTableDepth <= startMeters) {
      return "Fully Saturated (100% Saturated). High Pore Pressure 'u'";
    } else if (waterTableDepth > startMeters && waterTableDepth < endMeters) {
      return "Partially Saturated (Moist). Capillary capillary suction.";
    } else {
      return "Dry / Un-saturated. Active friction contact stresses.";
    }
  };

  return (
    <div id="soil-profile-visualizer-section" className="space-y-12">
      {/* 1. Introductory Title */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-[#1a1512] p-6 rounded-2xl border border-[#2a221d]">
        <div>
          <span className="text-xs font-mono px-3 py-1 bg-[#d4a373]/10 text-[#d4a373] rounded-full uppercase border border-[#d4a373]/20 tracking-wider">
            Section 7: Borehole Log Profile Visualizer
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-stone-100 mt-2">
            The Geological Core Profile
          </h2>
          <p className="text-stone-300 text-sm mt-1 max-w-xl">
            Sinking solid sample tubes deep produces geological cores. Change the groundwater table or dig an excavation trench below to inspect stability indices.
          </p>
        </div>
        <div className="bg-[#161210] py-2.5 px-4 rounded-xl border border-[#2a221d] text-[11px] text-stone-300 space-y-1 max-w-xs font-mono">
          <span className="text-[#d4a373] font-bold block text-xs">Pore Water Equation</span>
          <p>Effective Normal Stress: <span className="text-yellow-400">σ&apos; = σ - u</span></p>
          <p className="text-stone-400">Raising the water table raises pore pressure &ldquo;u&rdquo;, triggering immediate sliding shear failures.</p>
        </div>
      </div>

      {/* 2. Interactive Control Console and Borehole Stack */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Control Knobs Column */}
        <div className="lg:col-span-4 bg-[#161210] border border-[#2a221d] rounded-2xl p-6 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-widest font-mono text-stone-400 font-bold border-b border-[#2a221d] pb-2">
              Horizon Controls
            </h3>

            {/* A) Ground Water Knob */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-cyan-400 flex items-center gap-1.5 font-bold">
                  <Droplets className="w-4 h-4 text-cyan-400 animate-pulse" />
                  Water Table Depth
                </span>
                <span className="text-stone-200">-{waterTableDepth.toFixed(1)} m</span>
              </div>
              <input
                id="soil-profile-water-depth-slider"
                type="range"
                min="0.5"
                max="9.5"
                step="0.5"
                value={waterTableDepth}
                onChange={(e) => setWaterTableDepth(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1.5 bg-stone-904 bg-stone-900 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-stone-500 font-serif leading-normal block">
                Adjust lines to watch capillary hydration and saturation boundaries shift on layers.
              </span>
            </div>

            {/* B) Excavation Depth Knob */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#b35a38] font-semibold">Trench Excavation Depth</span>
                <span className="text-stone-200">-{excavationDepth.toFixed(1)} m</span>
              </div>
              <input
                id="soil-profile-excavation-depth-slider"
                type="range"
                min="0"
                max="5.0"
                step="0.5"
                value={excavationDepth}
                onChange={(e) => setExcavationDepth(Number(e.target.value))}
                className="w-full accent-[#b35a38] h-1.5 bg-stone-900 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-stone-500 font-serif leading-normal block text-red-400">
                Warning: Excavating past water depth requires sheet-pile pumps to prevent slope boiling failures!
              </span>
            </div>
          </div>

          {/* Deep inspection card details on hover */}
          <div className="bg-[#1a1512] p-4 rounded-xl border border-[#2a221d] min-h-[140px] flex flex-col justify-center">
            {hoveredIndex !== null ? (
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase bg-[#d4a373]/10 text-[#d4a373] px-2 py-0.5 rounded border border-[#d4a373]/20">
                  {SOIL_PROFILE_LAYERS[hoveredIndex].horizon} Logged Info:
                </span>
                <h4 className="text-sm font-bold text-stone-100 font-sans">
                  {SOIL_PROFILE_LAYERS[hoveredIndex].name}
                </h4>
                <p className="text-[11px] text-stone-300 leading-normal">
                  {SOIL_PROFILE_LAYERS[hoveredIndex].composition}
                </p>
                <div className="text-[10px] font-mono text-emerald-400 mt-1">
                  Stiffness: {SOIL_PROFILE_LAYERS[hoveredIndex].stiffness.split(",")[0]}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-1">
                <HelpCircle className="w-5 h-5 text-[#d4a373]/40 mx-auto" />
                <p className="text-xs text-stone-400 font-serif">
                  Hover your cursor directly over any vertical soil profile segment to download borehole log specs.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* The Borehole Vertical Log column */}
        <div className="lg:col-span-8 bg-[#161210] p-6 rounded-2xl border border-[#2a221d] flex flex-col md:flex-row gap-6 relative">
          {/* Depth meter ruler on left */}
          <div className="w-12 h-[380px] bg-stone-950/80 rounded border border-[#2a221d] flex flex-col justify-between items-center py-2 relative text-[9px] font-mono text-stone-500">
            <span>0.0 m</span>
            <span>1.0 m</span>
            <span>2.5 m</span>
            <span>4.5 m</span>
            <span>6.0 m</span>
            <span>8.0 m</span>
            <span>10.0 m</span>
            {/* Red excavation line */}
            {excavationDepth > 0 && (
              <div
                className="absolute left-0 right-0 border-t-2 border-red-500 border-dashed"
                style={{ top: `${(excavationDepth / 10.0) * 100}%` }}
              >
                <span className="bg-red-955 bg-stone-950 border border-red-800 text-[6px] text-red-300 px-1 rounded absolute -top-2.5 left-2">
                  DIG LEVEL
                </span>
              </div>
            )}
            {/* Water table blue gradient line */}
            <div
              className="absolute left-0 right-0 border-t border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
              style={{ top: `${(waterTableDepth / 10.0) * 100}%` }}
            >
              <span className="bg-[#0c4a6e] text-cyan-200 border border-cyan-700 text-[6px] px-1 rounded absolute -top-2.5 right-1 uppercase z-10 w-fit block font-bold font-mono">
                🌊 WATER TABLE (-{waterTableDepth.toFixed(1)}m)
              </span>
            </div>
          </div>

          {/* Core profile horizons stack */}
          <div className="flex-1 h-[380px] bg-stone-950/40 rounded-xl border border-[#2a221d] relative flex flex-col overflow-hidden">
            {/* Simulated excavator mask */}
            {excavationDepth > 0 && (
              <div
                className="absolute top-0 inset-x-0 bg-transparent transition-all z-10"
                style={{ height: `${(excavationDepth / 10.0) * 100}%` }}
              >
                <div className="w-full h-full bg-[#1c1613]/30 flex items-center justify-center relative overflow-hidden">
                  {/* Excavation patterns overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.6)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.6)_75%,transparent_75%)] bg-[size:24px_24px] pointer-events-none" />
                  <span className="text-[10px] font-mono text-[#d4a373] font-bold bg-[#0f0d0c] py-1.5 px-3 rounded-full border border-[#2a221d] uppercase tracking-widest relative z-10 animate-pulse">
                    🚜 Active dig zone depth: -{excavationDepth.toFixed(1)}m
                  </span>
                </div>
              </div>
            )}

            {/* Real horizons sections */}
            <div className="flex-1 flex flex-col h-full">
              {SOIL_PROFILE_LAYERS.map((layer, idx) => {
                const isHovered = hoveredIndex === idx;

                // Simple height ratio based on index horizons
                const blockHeights = ["8%", "12%", "30%", "30%", "20%"];

                // Check depth limits
                const limits = [
                  { start: 0, end: 0.3 },
                  { start: 0.3, end: 1.2 },
                  { start: 1.2, end: 4.5 },
                  { start: 4.5, end: 10.0 },
                  { start: 10.0, end: 15.0 }
                ];
                const myLimits = limits[idx];
                const satNote = calculateSaturatedState(myLimits.start, myLimits.end);

                return (
                  <div
                    key={idx}
                    id={`layer-horizon-${idx}`}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      height: blockHeights[idx],
                      backgroundColor: layer.colorHex,
                    }}
                    className={`relative border-b border-black/30 transition-all cursor-pointer flex items-center justify-between px-4 overflow-hidden group ${
                      isHovered ? "brightness-125 saturate-120 z-10" : "brightness-95 hover:brightness-105"
                    }`}
                  >
                    {/* Horizon labels */}
                    <div className="text-left select-none relative z-10">
                      <span
                        className="text-xs font-bold font-sans block"
                        style={{ color: layer.textColor }}
                      >
                        {layer.name}
                      </span>
                      <span className="text-[9px] opacity-75 font-mono block" style={{ color: layer.textColor }}>
                        {layer.horizon} ({layer.depthRange})
                      </span>
                    </div>

                    {/* Saturated indicators */}
                    <div className="text-right select-none relative z-10 text-[9px] font-mono text-stone-400 group-hover:text-stone-200">
                      <div>Status: <span className={satNote.includes("Saturated") ? "text-cyan-400 font-bold" : "text-stone-300"}>{satNote.split(" ")[0]}</span></div>
                      <div className="hidden md:block">Geotech: <span className="text-[#b35a38] font-bold">{layer.geotechnicalStatus}</span></div>
                    </div>

                    {/* Overlay shading representing groundwater opacity */}
                    {waterTableDepth <= myLimits.start && (
                      <div className="absolute inset-0 bg-[#0c4a6e]/45 pointer-events-none z-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep borehole log reference table */}
      <section className="bg-[#161210] p-6 rounded-2xl border border-[#2a221d] space-y-4">
        <h3 className="text-base font-sans font-bold text-stone-200 flex items-center gap-1.5">
          <Table className="w-5 h-5 text-[#d4a373]" />
          Typical Boring Log Reference Matrix
        </h3>
        <p className="text-stone-400 text-xs">
          Geotechnical site assessments output this standardized dataset to civil foundation engineers to design shear resistance calculations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          {SOIL_PROFILE_LAYERS.map((layer, idx) => (
            <div key={idx} className="bg-[#1a1512] p-4 rounded-xl border border-[#2a221d] hover:border-[#d4a373]/40 transition-colors space-y-1.5">
              <span className="text-[9px] font-mono text-[#d4a373] uppercase block">{layer.horizon}</span>
              <h5 className="font-bold text-stone-200 font-sans">{layer.name.split(" ")[0]}</h5>
              <div className="text-[10px] text-stone-400 font-mono">
                <div>Depth: {layer.depthRange}</div>
                <div className="text-[#b35a38] font-bold mt-1">{layer.geotechnicalStatus}</div>
                <div className="text-emerald-400 font-sans mt-0.5">Stiff: {layer.stiffness.split(" ")[0]}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
