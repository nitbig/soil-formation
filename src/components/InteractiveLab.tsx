import { useState } from "react";
import { motion } from "motion/react";
import { Beaker, Sliders, Play, RotateCcw, LineChart as LucideChart, AlertCircle, FileText, Check } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, Line, Cell } from "recharts";

export default function InteractiveLab() {
  const [activeTab, setActiveTab] = useState<"atterberg" | "sieve" | "compaction" | "shear">("atterberg");

  // 1. Atterberg state variables
  const [liquidLimit, setLiquidLimit] = useState<number>(45);
  const [plasticLimit, setPlasticLimit] = useState<number>(20);

  // 2. Sieve state variables
  const [retainedOn475, setRetainedOn475] = useState<number>(50); // grams
  const [retainedOn200, setRetainedOn200] = useState<number>(120);
  const [retainedOn0425, setRetainedOn0425] = useState<number>(180);
  const [retainedOn0075, setRetainedOn0075] = useState<number>(90);
  const [retainedOnPan, setRetainedOnPan] = useState<number>(60);

  // 3. Proctor compaction state variables
  const [moisture1, setMoisture1] = useState<number>(8);
  const [wetDensity1, setWetDensity1] = useState<number>(1.85); // g/cm³
  const [moisture2, setMoisture2] = useState<number>(11);
  const [wetDensity2, setWetDensity2] = useState<number>(2.02);
  const [moisture3, setMoisture3] = useState<number>(14);
  const [wetDensity3, setWetDensity3] = useState<number>(2.10);
  const [moisture4, setMoisture4] = useState<number>(17);
  const [wetDensity4, setWetDensity4] = useState<number>(1.98);

  // 4. Shear strength records
  const [normal1, setNormal1] = useState<number>(50); // kPa
  const [shear1, setShear1] = useState<number>(52); // kPa
  const [normal2, setNormal2] = useState<number>(100);
  const [shear2, setShear2] = useState<number>(78);
  const [normal3, setNormal3] = useState<number>(150);
  const [shear3, setShear3] = useState<number>(104);

  // Atterberg Mathematical calculations
  const calculateAtterberg = () => {
    const pi = liquidLimit - plasticLimit;
    const aLinePI = 0.73 * (liquidLimit - 20);

    let classification = "Sandy Clay Class (CL)";
    let engineeringStatus = "Medium plasticity. Suited for compaction.";

    if (pi > 7 && pi >= aLinePI) {
      if (liquidLimit < 50) {
        classification = "Low-Plasticity Clay (CL)";
        engineeringStatus = "Suited for highway subgrades. Stable compaction potential.";
      } else {
        classification = "High-Plasticity active Clay (CH)";
        engineeringStatus = "Highly dangerous shrinkage/swell potential if hydration shifts.";
      }
    } else if (pi < 4 || pi < aLinePI) {
      if (liquidLimit < 50) {
        classification = "Inorganic Silt (ML) / Silty Sand";
        engineeringStatus = "High frost-heave and water seepage piping risk. Poor construction subbase.";
      } else {
        classification = "High-Elasticity Silt (MH)";
        engineeringStatus = "Extremely highly compressible under vertical foundations.";
      }
    } else {
      classification = "Dual Silty Clay (CL-ML)";
      engineeringStatus = "Moderate swelling parameters, requires solid moisture control.";
    }

    return { pi, aLinePI, classification, engineeringStatus };
  };

  // Sieve calculations
  const calculateSieve = () => {
    const totalMass = retainedOn475 + retainedOn200 + retainedOn0425 + retainedOn0075 + retainedOnPan;
    if (totalMass === 0) return { data: [], totalMass: 0 };

    const sieveDetails = [
      { size: "4.75mm (#4)", opening: 4.75, retainedMass: retainedOn475 },
      { size: "2.00mm (#10)", opening: 2.0, retainedMass: retainedOn200 },
      { size: "0.425mm (#40)", opening: 0.425, retainedMass: retainedOn0425 },
      { size: "0.075mm (#200)", opening: 0.075, retainedMass: retainedOn0075 },
      { size: "Pan (<0.075)", opening: 0.001, retainedMass: retainedOnPan }
    ];

    let runningCumulativeRetained = 0;
    const data = sieveDetails.map((s) => {
      runningCumulativeRetained += s.retainedMass;
      const cumRetainedPct = (runningCumulativeRetained / totalMass) * 100;
      const passingPct = 100 - cumRetainedPct;
      return {
        name: s.size,
        aperture: s.opening,
        passing: parseFloat(passingPct.toFixed(1)),
        retained: s.retainedMass
      };
    });

    return { data, totalMass };
  };

  // Proctor Calculations
  const calculateProctor = () => {
    const dry1 = parseFloat((wetDensity1 / (1 + moisture1 / 100)).toFixed(2));
    const dry2 = parseFloat((wetDensity2 / (1 + moisture2 / 100)).toFixed(2));
    const dry3 = parseFloat((wetDensity3 / (1 + moisture3 / 100)).toFixed(2));
    const dry4 = parseFloat((wetDensity4 / (1 + moisture4 / 100)).toFixed(2));

    const densities = [
      { mc: moisture1, dry: dry1 },
      { mc: moisture2, dry: dry2 },
      { mc: moisture3, dry: dry3 },
      { mc: moisture4, dry: dry4 }
    ];

    // Simple parabola peak estimator for Maximum Dry Density
    let mdd = dry1;
    let omc = moisture1;

    densities.forEach((d) => {
      if (d.dry > mdd) {
        mdd = d.dry;
        omc = d.mc;
      }
    });

    return { densities, mdd, omc };
  };

  // Shear Linear Fitting
  const calculateShearFitting = () => {
    // Fits linear y = m*x + c
    const x1 = normal1, y1 = shear1;
    const x2 = normal2, y2 = shear2;
    const x3 = normal3, y3 = shear3;

    // Standard linear fitting parameters
    const n = 3;
    const sumX = x1 + x2 + x3;
    const sumY = y1 + y2 + y3;
    const sumXY = (x1 * y1) + (x2 * y2) + (x3 * y3);
    const sumX2 = (x1 * x1) + (x2 * x2) + (x3 * x3);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const cVal = (sumY - slope * sumX) / n;

    // Slope is tan(phi), hence phi is arctan(slope)
    const phiRad = Math.atan(slope);
    const phiDeg = parseFloat(((phiRad * 180) / Math.PI).toFixed(1));
    const cohesion = parseFloat(cVal.toFixed(1));

    // Formulate a failure envelope line
    const envelopePoints = [
      { normal: 0, shear: parseFloat(cohesion.toFixed(1)) },
      { normal: 50, shear: parseFloat((cVal + slope * 50).toFixed(1)) },
      { normal: 100, shear: parseFloat((cVal + slope * 100).toFixed(1)) },
      { normal: 150, shear: parseFloat((cVal + slope * 150).toFixed(1)) },
      { normal: 200, shear: parseFloat((cVal + slope * 200).toFixed(1)) }
    ];

    return { cohesion, phiDeg, envelopePoints };
  };

  const attResult = calculateAtterberg();
  const sieveResult = calculateSieve();
  const proctorResult = calculateProctor();
  const shearResult = calculateShearFitting();

  return (
    <div id="geotechnical-virtual-lab" className="space-y-12">
      {/* 1. Header Row */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-[#1B120E] p-6 rounded-2xl border border-amber-900/30">
        <div>
          <span className="text-xs font-mono px-3 py-1 bg-amber-900/40 text-amber-500 rounded-full uppercase border border-amber-800/40 tracking-wider">
            Section 6: Interactive Soil Mechanics Lab
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-stone-100 mt-2">
            The Virtual Geotechnical Lab Indexer
          </h2>
          <p className="text-stone-300 text-sm mt-1 max-w-xl">
            Input field samples results to trigger calculations, plotted graphics, envelope fittings, and grading classifications instantly.
          </p>
        </div>
        <div className="flex gap-2">
          {["atterberg", "sieve", "compaction", "shear"].map((tab) => (
            <button
              key={tab}
              id={`btn-lab-tab-${tab}`}
              onClick={() => setActiveTab(tab as any)}
              className={`py-2 px-3.5 rounded-lg text-xs font-semibold font-sans transition-all border ${
                activeTab === tab
                  ? "bg-[#c86446] border-[#ea580c]/50 text-stone-100 shadow"
                  : "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200"
              }`}
            >
              {tab === "atterberg" && "Atterberg Limits"}
              {tab === "sieve" && "Sieve Analysis"}
              {tab === "compaction" && "Proctor Compaction"}
              {tab === "shear" && "Direct Shear test"}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive calculations workspace */}
      <section className="bg-[#120E0C] p-6 rounded-2xl border border-[#c86446]/20">
        {activeTab === "atterberg" && (
          <div id="atterberg-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Dial Panels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-sans font-bold text-stone-200">
                  Atterberg Moisture Parameters
                </h3>
                <p className="text-xs text-stone-400">
                  Adjust the moist content thresholds (Liquid Limit vs Plastic Limit) to map plastic indexes on the Casagrande Classification Graph.
                </p>
              </div>

              {/* Liquid Limit Slider */}
              <div className="space-y-2 bg-[#1A1310] p-4 rounded-xl border border-stone-800">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-stone-300">Liquid Limit (LL)</span>
                  <span className="text-amber-500 font-bold">{liquidLimit}% Moisture</span>
                </div>
                <input
                  id="atterberg-liquid-slider"
                  type="range"
                  min="21"
                  max="80"
                  value={liquidLimit}
                  onChange={(e) => setLiquidLimit(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-[#251B13] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-stone-500 block">The point where clay behaves as a viscous liquid.</span>
              </div>

              {/* Plastic Limit Slider */}
              <div className="space-y-2 bg-[#1A1310] p-4 rounded-xl border border-stone-800">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-stone-300">Plastic Limit (PL)</span>
                  <span className="text-[#c86446] font-bold">{plasticLimit}% Moisture</span>
                </div>
                <input
                  id="atterberg-plastic-slider"
                  type="range"
                  min="10"
                  max="40"
                  value={plasticLimit}
                  onChange={(e) => setPlasticLimit(Math.min(liquidLimit - 4, Number(e.target.value)))}
                  className="w-full accent-emerald-500 h-1.5 bg-[#251B13] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-stone-500 block">The minimum moisture where clay rolls into 3mm threads without breaking.</span>
              </div>
            </div>

            {/* Graphic Output Panel */}
            <div className="lg:col-span-7 bg-[#0D0A08] p-5 rounded-xl border border-stone-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase bg-amber-900/40 text-amber-500 px-2 py-0.5 rounded w-fit block">
                  Atterberg Limit calculations:
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1A120E] p-3.5 rounded-lg text-center">
                    <span className="text-[9px] text-stone-500 font-mono uppercase block">Plasticity Index (PI)</span>
                    <span className="text-stone-200 font-bold text-2xl block mt-1">
                      {attResult.pi}%
                    </span>
                    <span className="text-[8px] text-stone-400 block font-serif">LL - PL calculation</span>
                  </div>

                  <div className="bg-[#161413] p-3.5 rounded-lg text-center">
                    <span className="text-[9px] text-stone-500 font-mono uppercase block">Casagrande A-Line Threshold</span>
                    <span className="text-stone-200 font-bold text-xl block mt-1">
                      {attResult.aLinePI.toFixed(1)}%
                    </span>
                    <span className="text-[8px] text-stone-400 block font-serif">0.73 * (LL - 20)</span>
                  </div>
                </div>

                <div className="space-y-1 bg-[#20150F] p-4.5 rounded-lg border border-[#c86446]/20">
                  <span className="text-xs font-mono uppercase text-amber-400 block">Estimated ASTM Solid Classification:</span>
                  <span className="text-sm font-bold block text-stone-100">{attResult.classification}</span>
                  <p className="text-xs text-stone-300 leading-normal">{attResult.engineeringStatus}</p>
                </div>
              </div>

              {/* Mini visual state representation bar */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-stone-500 block uppercase">Consistency State Slider</span>
                <div className="w-full h-8 bg-stone-900 rounded overflow-hidden flex text-[10px] text-center font-bold text-stone-300 border border-stone-800 relative">
                  <div className="h-full bg-stone-800 flex items-center justify-center relative" style={{ width: `${plasticLimit}%` }}>
                    <span>Solid / Hard</span>
                    <span className="absolute right-0 top-0 bottom-0 w-0.5 bg-red-800" />
                  </div>
                  <div className="h-full bg-[#c86446]/40 text-[#ffb099] flex items-center justify-center relative" style={{ width: `${liquidLimit - plasticLimit}%` }}>
                    <span>Plastic State</span>
                    <span className="absolute right-0 top-0 bottom-0 w-0.5 bg-blue-800" />
                  </div>
                  <div className="h-full bg-cyan-950/40 text-cyan-400 flex items-center justify-center" style={{ width: `${100 - liquidLimit}%` }}>
                    <span>Viscous Liquid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* B) SIEVE WORKSPACE */}
        {activeTab === "sieve" && (
          <div id="sieve-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Direct mass inputs */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-sans font-bold text-stone-200">
                  Sieve Particle Retention Logs
                </h3>
                <p className="text-xs text-stone-400">
                  Enter weight retained (grams) in each standard mesh compartment. Sum equates dry bulk test weight.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 bg-[#1A1412] p-2.5 rounded border border-stone-800">
                  <label className="text-[10px] font-mono text-stone-400">Sieve #4 (&gt;4.75mm)</label>
                  <input
                    id="sieve-input-4"
                    type="number"
                    value={retainedOn475}
                    onChange={(e) => setRetainedOn475(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-black text-stone-100 text-xs py-1 px-2 border rounded border-stone-800"
                  />
                </div>
                <div className="space-y-1 bg-[#1A1412] p-2.5 rounded border border-stone-800">
                  <label className="text-[10px] font-mono text-stone-400">Sieve #10 (&gt;2.00mm)</label>
                  <input
                    id="sieve-input-10"
                    type="number"
                    value={retainedOn200}
                    onChange={(e) => setRetainedOn200(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-black text-stone-100 text-xs py-1 px-2 border rounded border-stone-800"
                  />
                </div>
                <div className="space-y-1 bg-[#1A1412] p-2.5 rounded border border-stone-800">
                  <label className="text-[10px] font-mono text-stone-400">Sieve #40 (&gt;0.425mm)</label>
                  <input
                    id="sieve-input-40"
                    type="number"
                    value={retainedOn0425}
                    onChange={(e) => setRetainedOn0425(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-black text-stone-100 text-xs py-1 px-2 border rounded border-stone-800"
                  />
                </div>
                <div className="space-y-1 bg-[#1A1412] p-2.5 rounded border border-stone-800">
                  <label className="text-[10px] font-mono text-stone-400">Sieve #200 (&gt;0.075mm)</label>
                  <input
                    id="sieve-input-200"
                    type="number"
                    value={retainedOn0075}
                    onChange={(e) => setRetainedOn0075(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-black text-stone-100 text-xs py-1 px-2 border rounded border-stone-800"
                  />
                </div>
                <div className="space-y-1 bg-[#1A1412] p-2.5 rounded border border-stone-800 col-span-2">
                  <label className="text-[10px] font-mono text-stone-400">Pan Dust (&lt;0.075mm)</label>
                  <input
                    id="sieve-input-pan"
                    type="number"
                    value={retainedOnPan}
                    onChange={(e) => setRetainedOnPan(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-black text-stone-100 text-xs py-1 px-2 border rounded border-stone-800"
                  />
                </div>
              </div>

              <div className="text-[10px] font-mono text-stone-500">
                Sum of Retained Solids: <span className="text-amber-500 font-bold">{sieveResult.totalMass} grams</span>
              </div>
            </div>

            {/* Sieve Graph passing curve */}
            <div className="lg:col-span-7 bg-[#0E0C0A] border border-stone-800 rounded-xl p-4 space-y-4">
              <span className="text-xs font-mono text-stone-400 font-bold">Gradation Distribution Wave (SND)</span>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sieveResult.data}>
                    <defs>
                      <linearGradient id="colorPassing" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c86446" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#c86446" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#251E1A" />
                    <XAxis dataKey="name" stroke="#5E4E45" style={{ fontSize: "10px" }} />
                    <YAxis label={{ value: "% Passing", angle: -90, position: "insideLeft", fill: "#5E4E45" }} stroke="#5E4E45" domain={[0, 100]} style={{ fontSize: "10px" }} />
                    <Tooltip cursor={{ fill: "#211A16" }} />
                    <Area type="monotone" dataKey="passing" stroke="#c86446" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPassing)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="text-[11px] text-stone-300">
                Passing Sieve #200 is <span className="font-bold text-yellow-500">{((retainedOnPan / (sieveResult.totalMass || 1)) * 100).toFixed(1)}%</span>. Values &gt; 50% designate silt-clay dominant bases.
              </div>
            </div>
          </div>
        )}

        {/* C) COMPACTION WORKSPACE */}
        {activeTab === "compaction" && (
          <div id="compaction-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-sans font-bold text-stone-200">
                  Standard Proctor Compaction Test
                </h3>
                <p className="text-xs text-stone-400">
                  Enter wet densities (g/cm³) for 4 soil cores compressed under rising water margins to compile the Proctor Bell Curve.
                </p>
              </div>

              {/* Data logs */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#191411] p-3 rounded border border-stone-800">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Test 1 (Moisture 8%)</span>
                    <input
                      id="compaction-wet-1"
                      type="number"
                      step="0.01"
                      value={wetDensity1}
                      onChange={(e) => setWetDensity1(Number(e.target.value))}
                      className="w-full bg-black border border-stone-800 rounded py-1 px-2 mt-1 text-stone-100"
                    />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Calculated Dry:</span>
                    <span className="text-emerald-400 font-bold font-mono text-sm block mt-2">
                      {proctorResult.densities[0].dry} g/cc
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-[#191411] p-3 rounded border border-stone-800">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Test 2 (Moisture 11%)</span>
                    <input
                      id="compaction-wet-2"
                      type="number"
                      step="0.01"
                      value={wetDensity2}
                      onChange={(e) => setWetDensity2(Number(e.target.value))}
                      className="w-full bg-black border border-stone-800 rounded py-1 px-2 mt-1 text-stone-100"
                    />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Calculated Dry:</span>
                    <span className="text-emerald-400 font-bold font-mono text-sm block mt-2">
                      {proctorResult.densities[1].dry} g/cc
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-[#191411] p-3 rounded border border-stone-800">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Test 3 (Moisture 14%)</span>
                    <input
                      id="compaction-wet-3"
                      type="number"
                      step="0.01"
                      value={wetDensity3}
                      onChange={(e) => setWetDensity3(Number(e.target.value))}
                      className="w-full bg-black border border-stone-800 rounded py-1 px-2 mt-1 text-stone-100"
                    />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Calculated Dry:</span>
                    <span className="text-emerald-400 font-bold font-mono text-sm block mt-2">
                      {proctorResult.densities[2].dry} g/cc
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-[#191411] p-3 rounded border border-stone-800">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Test 4 (Moisture 17%)</span>
                    <input
                      id="compaction-wet-4"
                      type="number"
                      step="0.01"
                      value={wetDensity4}
                      onChange={(e) => setWetDensity4(Number(e.target.value))}
                      className="w-full bg-black border border-stone-800 rounded py-1 px-2 mt-1 text-stone-100"
                    />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Calculated Dry:</span>
                    <span className="text-emerald-400 font-bold font-mono text-sm block mt-2">
                      {proctorResult.densities[3].dry} g/cc
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compaction curve display */}
            <div className="lg:col-span-7 bg-[#0E0C0A] border border-stone-800 rounded-xl p-5 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono text-stone-400 font-bold uppercase block">Proctor dry density curves</span>
                <span className="text-[10px] text-stone-500">Normal formula: Dry Density = WetDensity / (1 + Moisture/100)</span>
              </div>

              {/* Proctor Bell Curve */}
              <div className="h-56 w-full my-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={proctorResult.densities}>
                    <defs>
                      <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#251E1A" />
                    <XAxis dataKey="mc" label={{ value: "Moisture Content (%)", position: "insideBottom", offset: -2, fill: "#5E4E45" }} stroke="#5E4E45" style={{ fontSize: "10px" }} />
                    <YAxis label={{ value: "Dry Density (g/cc)", angle: -90, position: "insideLeft", fill: "#5E4E45" }} stroke="#5E4E45" domain={[1.5, 2.2]} style={{ fontSize: "10px" }} />
                    <Tooltip cursor={{ fill: "#211A16" }} />
                    <Area type="monotone" dataKey="dry" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorComp)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-[#241c18] p-4.5 rounded border border-amber-950 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-stone-500 font-mono block uppercase">Maximum Dry Density (MDD)</span>
                  <span className="text-emerald-400 font-bold text-lg">{proctorResult.mdd} g/cm³</span>
                </div>
                <div>
                  <span className="text-[9px] text-stone-500 font-mono block uppercase">Optimum Moisture Content (OMC)</span>
                  <span className="text-yellow-400 font-bold text-lg">{proctorResult.omc}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* D) DIRECT SHEAR TEST WORKSPACE */}
        {activeTab === "shear" && (
          <div id="shear-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-sans font-bold text-stone-200">
                  Direct Shear failure Mohr-Coulomb Fitting
                </h3>
                <p className="text-xs text-stone-400">
                  Input perpendicular normal stress applied during three discrete sweeps along with maximum lateral failure resistance shear stresses.
                </p>
              </div>

              {/* Data points */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#191411] p-2.5 rounded border border-stone-800">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-stone-400">Point 1 Normal Stress (kPa)</label>
                    <input
                      id="shear-normal-1"
                      type="number"
                      value={normal1}
                      onChange={(e) => setNormal1(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-black border border-stone-800 rounded py-1 px-1.5 text-stone-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-[#c86446]">Point 1 Shear Yield (kPa)</label>
                    <input
                      id="shear-yield-1"
                      type="number"
                      value={shear1}
                      onChange={(e) => setShear1(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-black border border-stone-800 rounded py-1 px-1.5 text-stone-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-[#191411] p-2.5 rounded border border-stone-800">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-stone-400">Point 2 Normal Stress (kPa)</label>
                    <input
                      id="shear-normal-2"
                      type="number"
                      value={normal2}
                      onChange={(e) => setNormal2(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-black border border-stone-800 rounded py-1 px-1.5 text-stone-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-[#c86446]">Point 2 Shear Yield (kPa)</label>
                    <input
                      id="shear-yield-2"
                      type="number"
                      value={shear2}
                      onChange={(e) => setShear2(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-black border border-stone-800 rounded py-1 px-1.5 text-stone-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-[#191411] p-2.5 rounded border border-stone-800">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-stone-400">Point 3 Normal stress (kPa)</label>
                    <input
                      id="shear-normal-3"
                      type="number"
                      value={normal3}
                      onChange={(e) => setNormal3(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-black border border-stone-800 rounded py-1 px-1.5 text-stone-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-[#c86446]">Point 3 Shear Yield (kPa)</label>
                    <input
                      id="shear-yield-3"
                      type="number"
                      value={shear3}
                      onChange={(e) => setShear3(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-black border border-stone-800 rounded py-1 px-1.5 text-stone-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fitted Shear Plot */}
            <div className="lg:col-span-7 bg-[#0E0C0A] border border-stone-800 rounded-xl p-5 flex flex-col justify-between">
              <div className="space-y-1 border-b border-stone-900 pb-2">
                <span className="text-xs font-mono text-stone-400 font-bold uppercase block">Mohr-Coulomb Shear Strength Envelope Fit</span>
                <span className="text-[10px] text-stone-500">Equation plane envelope calculation: τ = c + σ * tan(φ)</span>
              </div>

              {/* Envelope Line Charts */}
              <div className="h-52 w-full my-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#251E1A" />
                    <XAxis type="number" dataKey="normal" name="Normal stress" unit=" kPa" stroke="#5E4E45" domain={[0, 200]} />
                    <YAxis type="number" dataKey="shear" name="Shear stress" unit=" kPa" stroke="#5E4E45" domain={[0, 150]} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter name="Test points" data={[
                      { normal: normal1, shear: shear1 },
                      { normal: normal2, shear: shear2 },
                      { normal: normal3, shear: shear3 }
                    ]} fill="#ea580c" />
                    <Line type="monotone" data={shearResult.envelopePoints} dataKey="shear" stroke="#10b981" strokeWidth={3} dot={false} />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-[#1b2520]/60 p-4 rounded border border-emerald-950 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-[#22c55e] font-mono block uppercase">cohesion (c)</span>
                  <span className="text-stone-100 font-bold text-lg">{shearResult.cohesion} kPa</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#22c55e] font-mono block uppercase">internal friction angle (φ)</span>
                  <span className="text-emerald-400 font-bold text-lg">{shearResult.phiDeg}° deg</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
