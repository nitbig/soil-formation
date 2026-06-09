import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, Check, HelpCircle, Flame, Droplet, ArrowRight, ArrowLeft } from "lucide-react";
import { SOIL_TYPES } from "../data/soilData";

export default function SoilTypes() {
  const [activeSoilId, setActiveSoilId] = useState<string>("clay");
  const [percolationSelected, setPercolationSelected] = useState<string>("sand");
  const [percolationState, setPercolationState] = useState<"idle" | "pouring" | "finished">("idle");
  const [filterQuery, setFilterQuery] = useState<string>("all");

  const [compareA, setCompareA] = useState<string>("sand");
  const [compareB, setCompareB] = useState<string>("clay");

  // Percolation flow descriptors
  const PERCOLATION_SPEEDS: Record<string, { duration: number; text: string; retained: string }> = {
    gravel: { duration: 1.0, text: "Instant flow. Gravity clears water immediately.", retained: "Retains virtually 0% moisture" },
    sand: { duration: 1.8, text: "Rapid infiltration. Medium pore spaces drain fast.", retained: "Retains 5% - 15% moisture" },
    silt: { duration: 5.5, text: "Slow capillary flow. Micro-channels slow down drainage.", retained: "Retains 30% - 50% moisture" },
    clay: { duration: 12.0, text: "Impermeable barrier. Water molecules trap on clay charges.", retained: "Retains 80%+ moisture (highly swelleble)" },
    organic: { duration: 8.0, text: "Highly absorbent sponge-like retention.", retained: "Retains 200%+ of its own dry weight" }
  };

  const handlePourWater = () => {
    setPercolationState("pouring");
    const speed = PERCOLATION_SPEEDS[percolationSelected].duration;
    setTimeout(() => {
      setPercolationState("finished");
    }, speed * 1000);
  };

  const activeSoil = SOIL_TYPES.find((s) => s.id === activeSoilId) || SOIL_TYPES[3];
  const compASoil = SOIL_TYPES.find((s) => s.id === compareA) || SOIL_TYPES[1];
  const compBSoil = SOIL_TYPES.find((s) => s.id === compareB) || SOIL_TYPES[3];

  const filteredSoils = filterQuery === "all"
    ? SOIL_TYPES
    : SOIL_TYPES.filter((s) => s.id === filterQuery);

  return (
    <div id="soil-types-wrapper" className="space-y-12">
      {/* 1. Header Row */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-[#1D1612] p-6 rounded-2xl border border-[#c86446]/20">
        <div>
          <span className="text-xs font-mono px-3 py-1 bg-[#c86446]/20 text-[#c86446] rounded-full uppercase border border-[#c86446]/30 tracking-wider">
            Section 3: Geotechnical Classification Matrix
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-stone-100 mt-2">
            Soil Families &amp; Engineering Indexing
          </h2>
          <p className="text-stone-300 text-sm mt-1 max-w-xl">
            Click on soil profiles to load sizing metrics, cohesion parameters, mechanical density limits, and optimal civil construction applications.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-[#251B13] p-1.5 rounded-lg border border-amber-900/30">
          <label className="text-xs font-mono text-stone-400 px-2">Filter:</label>
          <select
            id="select-soil-filter"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="bg-stone-900 text-stone-100 text-xs py-1.5 px-3 rounded border border-amber-900/40 outline-none"
          >
            <option value="all">Display All Families</option>
            <option value="gravel">Gravels only</option>
            <option value="sand">Sands only</option>
            <option value="silt">Silts only</option>
            <option value="clay">Clays only</option>
            <option value="organic">Organic soil only</option>
          </select>
        </div>
      </div>

      {/* 2. Main Soil Property Sheet Slider Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-sm uppercase tracking-widest font-mono text-stone-500">
            Soil Selection Board
          </h3>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {filteredSoils.map((s) => (
              <button
                key={s.id}
                id={`btn-soil-card-${s.id}`}
                onClick={() => setActiveSoilId(s.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeSoilId === s.id
                    ? "bg-[#291710] border-[#c86446]/80 text-stone-100 shadow-md transform translate-x-1"
                    : "bg-[#14100D] border-stone-800/80 text-stone-400 hover:bg-[#1E1713]"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-sans font-semibold text-sm block text-stone-200">
                    {s.name}
                  </span>
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-stone-900"
                    style={{ backgroundColor: s.colorHex }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] font-mono text-stone-500">
                    Size: {s.particleSize}
                  </span>
                  <span className="text-[10px] bg-stone-900/60 px-2 py-0.5 rounded text-stone-400">
                    k: {s.permeability.split(" ")[0]}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-[#120F0D] p-4 rounded-xl border border-amber-950/40 text-[11px] text-stone-400 space-y-1">
            <span className="font-semibold text-stone-300 block">Sieving Boundary (USCS Sieve No. 200):</span>
            <p>
              Particles passing Sieve No. 200 (diameter &lt; 0.075 mm) are designated fine-grained soils (Silts and Clays). Ground with dominant aggregates above are coarse-grained (Sands and Gravels).
            </p>
          </div>
        </div>

        {/* Dynamic soil property card */}
        <div className="lg:col-span-8 bg-[#16120F] border border-[#c86446]/10 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-amber-900/20 pb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500">
                  {activeSoil.scientificName}
                </span>
                <h4 className="text-2xl font-bold font-sans text-stone-100 mt-1">
                  {activeSoil.name}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 font-mono">Micro-Vis:</span>
                <span className="text-xs text-stone-100 font-semibold px-3 py-1 bg-stone-950 rounded-full border border-stone-800">
                  {activeSoil.colorName}
                </span>
              </div>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed font-sans">
              {activeSoil.description}
            </p>

            {/* Structured Property Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#201814] p-3.5 rounded-xl border border-amber-900/10">
                <span className="text-[9px] font-mono text-stone-500 uppercase block">Water Retention</span>
                <span className="text-[#c86446] font-sans font-bold text-base block mt-1">
                  {activeSoil.waterRetention}
                </span>
                <p className="text-[10px] text-stone-400 mt-1">Capillary absorption capacity.</p>
              </div>

              <div className="bg-[#1A1613] p-3.5 rounded-xl border border-amber-900/10">
                <span className="text-[9px] font-mono text-stone-500 uppercase block">Hydraulic Permeability k</span>
                <span className="text-stone-200 font-sans font-bold text-xs block mt-1 leading-normal">
                  {activeSoil.permeability}
                </span>
                <p className="text-[10px] text-stone-400 mt-1">Fluid velocity parameter.</p>
              </div>

              <div className="bg-[#1C1714] p-3.5 rounded-xl border border-amber-900/10">
                <span className="text-[9px] font-mono text-stone-500 uppercase block">Engineering Strength</span>
                <span className="text-stone-200 font-sans font-bold text-xs block mt-1 leading-normal">
                  {activeSoil.strength}
                </span>
                <p className="text-[10px] text-stone-400 mt-1">Frictional or cohesive limits.</p>
              </div>
            </div>

            {/* Field uses tags */}
            <div className="space-y-2 bg-[#1B120E] p-4 rounded-xl border border-[#c86446]/20">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block font-bold">
                Practical Civil Construction Applications:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-stone-300">
                {activeSoil.constructionUses.map((use, idx) => (
                  <li key={idx} className="flex gap-2 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c86446]" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-4 border-t border-amber-900/20 gap-4">
            <div className="text-[11px] font-mono text-stone-500">
              Typical dry void ratio index: <span className="text-stone-300 font-bold">{activeSoil.voidRatioRange}</span>
            </div>
            <div className="text-[11px] font-mono text-stone-500">
              Compaction standard: <span className="text-emerald-500">{activeSoil.compactability}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Hydraulic Percolation Simulation Lab */}
      <section className="bg-[#120D0A] rounded-2xl border border-[#c86446]/20 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-sans font-bold text-stone-100 flex items-center gap-2">
            <Droplet className="w-5 h-5 text-cyan-400 animate-pulse" />
            Hydraulic Percolation &amp; Retention Tube Simulation
          </h3>
          <p className="text-stone-300 text-xs">
            Test the percolation velocity (flow coefficient k) of different soils by filling the visual test tubes and pouring water.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Selectors column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-stone-400 block">Select Soil sample core:</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
                {SOIL_TYPES.map((s) => (
                  <button
                    key={s.id}
                    id={`btn-percolate-${s.id}`}
                    onClick={() => {
                      setPercolationSelected(s.id);
                      setPercolationState("idle");
                    }}
                    className={`py-2 px-3 text-xs text-left rounded-lg border transition-all ${
                      percolationSelected === s.id
                        ? "bg-[#291A14] border-[#c86446] text-stone-200"
                        : "bg-[#181310] border-stone-800 text-stone-400 hover:bg-[#201814]"
                    }`}
                  >
                    {s.name.split(" ")[0]} core
                  </button>
                ))}
              </div>
            </div>

            <button
              id="btn-pour-percolate-test"
              onClick={handlePourWater}
              disabled={percolationState === "pouring"}
              className="w-full py-3 bg-[#c86446] hover:bg-[#b05337] disabled:bg-stone-800 disabled:text-stone-600 text-stone-100 rounded-lg text-sm font-sans font-bold transition-all shadow px-4 flex items-center justify-center gap-2"
            >
              <Droplet className="w-4 h-4 text-cyan-200" />
              {percolationState === "pouring" ? "Percolating..." : "Pour 100ml Water"}
            </button>

            <div className="bg-[#1C1613] p-4 rounded-lg border border-amber-900/20 text-xs text-stone-300 space-y-1.5">
              <span className="font-bold text-amber-500 font-mono">FLOW COEFFICIENT (k):</span>
              <p className="text-stone-400">
                {PERCOLATION_SPEEDS[percolationSelected].text}
              </p>
              <p className="text-cyan-400 font-bold font-mono">
                {PERCOLATION_SPEEDS[percolationSelected].retained}
              </p>
            </div>
          </div>

          {/* Saturated animation tube display */}
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Tube visual model */}
            <div className="w-36 h-64 bg-[#0A0706] rounded-b-full border-2 border-stone-700 relative overflow-hidden flex flex-col justify-between">
              {/* Water reservoir on top */}
              <div className="absolute top-0 inset-x-0 h-16 bg-cyan-950/20 border-b border-stone-800 flex items-center justify-center">
                <AnimatePresence>
                  {percolationState === "idle" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-x-0 bottom-0 h-12 bg-cyan-500/40 border-t border-cyan-300"
                    />
                  )}
                  {percolationState === "pouring" && (
                    <motion.div
                      animate={{ height: ["100%", "0%"] }}
                      transition={{ duration: PERCOLATION_SPEEDS[percolationSelected].duration }}
                      className="absolute inset-x-0 bottom-0 bg-cyan-500/40 border-t border-cyan-300"
                    />
                  )}
                </AnimatePresence>
                <span className="text-[10px] font-mono text-cyan-300 z-10">Static Head</span>
              </div>

              {/* Central soil plug in middle */}
              <div
                className="absolute inset-x-1 top-16 h-32 flex items-center justify-center relative overflow-hidden transition-colors border-y border-stone-900"
                style={{ backgroundColor: SOIL_TYPES.find((s) => s.id === percolationSelected)?.colorHex }}
              >
                {/* Granular particles indicator */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#111_15%,transparent_20%)] bg-[size:8px_8px]" />

                {/* Vertical water seepage path rays */}
                {percolationState === "pouring" && (
                  <motion.div
                    animate={{ y: [-100, 100] }}
                    transition={{ repeat: Infinity, duration: 1.2 / PERCOLATION_SPEEDS[percolationSelected].duration, ease: "linear" }}
                    className="absolute inset-x-0 h-2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-90"
                  />
                )}

                <span className="text-xs font-mono font-bold bg-black/70 px-2 py-0.5 rounded text-stone-200 z-10 border border-stone-800">
                  {percolationSelected.toUpperCase()} PLUG
                </span>
              </div>

              {/* Lower catchment box or dripping representation */}
              <div className="absolute bottom-0 inset-x-0 h-16 bg-[#16120F] flex flex-col justify-end items-center pb-2">
                <div className="flex gap-1 justify-center absolute -top-4">
                  {percolationState === "pouring" && (
                    <span className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce" />
                  )}
                </div>

                {percolationState === "finished" && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: percolationSelected === "clay" ? 10 : percolationSelected === "silt" ? 22 : 44 }}
                    className="absolute inset-x-0 bottom-0 bg-cyan-600/30 border-t border-cyan-400/50"
                  />
                )}
                <span className="text-[9px] font-mono text-stone-500 z-10">Catch Basin</span>
              </div>
            </div>

            {/* Microscopic visual explainers */}
            <div className="flex-1 space-y-4">
              <span className="text-xs font-mono text-stone-500 uppercase block">Mechanical grain interaction</span>
              <div className="bg-[#1C1613] p-4 rounded-xl border border-amber-900/10 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-stone-200 block">Silt/Clay Pores:</span>
                  <span className="text-[11px] text-stone-400 block leading-relaxed">
                    Extremely fine plates build an electro-chemical bond, creating tiny tortuous paths that trap moisture molecules tightly.
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-stone-200 block">Sand/Gravel Pores:</span>
                  <span className="text-[11px] text-stone-400 block leading-relaxed">
                    Large angular structural grains align loosely, leaving macro void channels where gravity moves moisture quickly.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Comparative Matrix table */}
      <section className="bg-[#110D0A] p-6 rounded-2xl border border-stone-800/80 space-y-6">
        <div className="space-y-1">
          <h3 className="text-base font-sans font-bold text-[#EADED2]">
            Detailed Comparative Matrix
          </h3>
          <p className="text-stone-400 text-xs">
            Review side-by-side engineering benchmarks under the Unified Soil Classification System.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 font-mono">
                <th className="py-2.5 px-3">Soil Family</th>
                <th className="py-2.5 px-3">Particle Diameter</th>
                <th className="py-2.5 px-3">Cohesion Value (c)</th>
                <th className="py-2.5 px-3">Friction Angle (φ)</th>
                <th className="py-2.5 px-3">Effective Permeability</th>
                <th className="py-2.5 px-3">Compaction Tool Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-900 text-stone-200">
              {SOIL_TYPES.map((soil) => (
                <tr key={soil.id} className="hover:bg-[#1A1411]/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-amber-500">{soil.name.split(" ")[0]}</td>
                  <td className="py-3 px-3 font-mono text-stone-400">{soil.particleSize}</td>
                  <td className="py-3 px-3 font-mono">{soil.id === "clay" ? "Medium to High (25-100+ kPa)" : "Nil (0 kPa)"}</td>
                  <td className="py-3 px-3 font-mono">{soil.id === "sand" ? "30° - 40°" : soil.id === "gravel" ? "35° - 45°" : "Nil to 20°"}</td>
                  <td className="py-3 px-3">{soil.permeability}</td>
                  <td className="py-3 px-3 text-emerald-400 font-sans">{soil.compactability.split(" ")[0]} rollers</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
