import { SoilTypeInfo, RockWeatheringInfo, GeotechEngineer, CaseStudy, QuizQuestion, SoilFormula, SoilLayerModel } from "../types";

export const SOIL_TYPES: SoilTypeInfo[] = [
  {
    id: "gravel",
    name: "Gravel (Coarse Soil)",
    scientificName: "Coarse aggregate (> 4.75mm)",
    particleSize: "4.75 mm - 80 mm",
    texture: "Granular, angular, sub-rounded or flaky pebbles",
    waterRetention: "Very Low",
    permeability: "Very High (> 1.0 cm/s)",
    strength: "Very High shear strength, low compressibility",
    constructionUses: [
      "Excellent subgrade under road pavements",
      "High strength backfill for retaining walls",
      "Foundation base material for structures",
      "Primary filter media in subsurface drainage"
    ],
    description: "Gravels are coarse cohesionless materials consisting of rounded or angular fragments of rock. They provide excellent drainage and massive load bearing capabilities without risk of plastic deformation.",
    compactability: "Excellent compaction density achieved with vibratory rollers.",
    colorName: "Pebble Grey / Quartz",
    colorHex: "#7a7775",
    voidRatioRange: "0.3 - 0.5"
  },
  {
    id: "sand",
    name: "Sand (Medium Soil)",
    scientificName: "Cohesionless granular soil (0.075mm - 4.75mm)",
    particleSize: "0.075 mm - 4.75 mm",
    texture: "Sharp, gritty, fine to medium crystalline particulates",
    waterRetention: "Low",
    permeability: "High (1.0e-3 to 1.0e-1 cm/s)",
    strength: "Moderate to high shear resistance based on density index",
    constructionUses: [
      "Fine aggregate in concrete & mortar mixing",
      "Drainage blanket layer in earthen dams",
      "Backfill material under pipe beds",
      "Sand drainage columns to accelerate consolidation"
    ],
    description: "Sands are medium-textured cohesionless granular materials. They are stable when damp and confined, but dry loose sands are highly vulnerable to water erosion and structural liquefaction under seismic shaking keys.",
    compactability: "Highly compatible via pneumatically-tired compactors and watering.",
    colorName: "Sand Ochre / Light Tan",
    colorHex: "#d2b48c",
    voidRatioRange: "0.4 - 0.8"
  },
  {
    id: "silt",
    name: "Silt (Fine Passive Soil)",
    scientificName: "Inorganic fine cohesionless soil (0.002mm - 0.075mm)",
    particleSize: "0.002 mm - 0.075 mm",
    texture: "Floury, velvety powder when dry, slippery fluid when wet",
    waterRetention: "Medium",
    permeability: "Low to Moderate (1.0e-5 to 1.0e-3 cm/s)",
    strength: "Poor to moderate cohesion, prone to high liquefaction",
    constructionUses: [
      "Secondary fill in landscaping embankments",
      "Agricultural sub-bases with loam composites",
      "Raw brick-making material with high temperature firing"
    ],
    description: "Silts are fine-grained non-plastic soils that show rapid moisture reactivity. Their high capillary pull makes them extremely prone to frost heave (expanding upwards when ground freezes) and water erosion/piping.",
    compactability: "Difficult to compact. Reacts poorly to heavy vibratory rollers if wet.",
    colorName: "Silt Umber / Dusty Chalk",
    colorHex: "#a08260",
    voidRatioRange: "0.5 - 0.9"
  },
  {
    id: "clay",
    name: "Clay (Cohesive active Soil)",
    scientificName: "Active platelike hydrated aluminosilicates (< 0.002mm)",
    particleSize: "< 0.002 mm",
    texture: "Sticky and highly plastic when moist, rock-hard when dry",
    waterRetention: "Very High",
    permeability: "Very Low (< 1.0e-7 cm/s - Impervious)",
    strength: "High cohesion, extremely vulnerable to consolidation settlement",
    constructionUses: [
      "Impervious core wall barrier in earthen dams",
      "Bentonite slurry for trench wall drilling stabilizers",
      "Clay liners for garbage landfills to seal toxic leachate",
      "Pottery, ceramic construction bricks and tiles"
    ],
    description: "Clay contains flattened mineral particles that bind tightly with water molecules due to electro-chemical surface charges. Clay exhibits high cohesion, plasticity, swelling (when wet), and drastic shrinkage cracking (when dry).",
    compactability: "Best compacted at O.M.C (Optimal Moisture Content) with sheepfoot rollers.",
    colorName: "Clay Orange / Terracotta",
    colorHex: "#c86446",
    voidRatioRange: "0.6 - 1.2 (can be highly variable)"
  },
  {
    id: "organic",
    name: "Organic Soil (Peat / Muck)",
    scientificName: "Fibrous decomposed plant matter",
    particleSize: "Varies (mixed fibers & colloidal dust)",
    texture: "Fibrous, spongy, damp and compressible structure",
    waterRetention: "Very High",
    permeability: "Variable",
    strength: "Extremely Low shear strength, highly compressible",
    constructionUses: [
      "Not recommended for structural engineering uses",
      "Must be fully excavated or bypassed using pile foundations",
      "Highly useful in environmental remediation & plant growth"
    ],
    description: "Organic soils originate from highly compressed, decomposing plant foliage and swamp muck. They undergo continuous biochemical gas decay and exhibit immense, unpredictable settlement if loaded.",
    compactability: "Virtually uncompactable due to elastic rebound of fiber materials.",
    colorName: "Organic Forest Black",
    colorHex: "#272522",
    voidRatioRange: "1.5 - 3.0"
  }
];

export const ROCK_WEATHERINGS: RockWeatheringInfo[] = [
  {
    id: "physical",
    title: "Physical Weathering",
    type: "Physical",
    mechanisms: [
      "Thermal stress expansion & contraction",
      "Frost wedging (water freezes and cracks rock)",
      "Exfoliation unloading (outer crust flakes off)",
      "Abrasion by wind, water currents, and sandblasts"
    ],
    description: "Mechanical actions break up massive rocks into progressively smaller particles of identical chemical formulation. This drastically increases the overall exposed surface area available for chemical reactions.",
    iconName: "Hammer",
    example: "Granite boulders breaking into sand particles in high diurnal thermal deserts."
  },
  {
    id: "chemical",
    title: "Chemical Weathering",
    type: "Chemical",
    mechanisms: [
      "Hydration (absorbing water into molecular structure)",
      "Oxidation (rock iron reactions mimicking rust)",
      "Carbonation (dissolution in weak rainfall carbonic acid)",
      "Hydrolysis (direct chemical breakdown by hydrogen ions)"
    ],
    description: "Chemical weathering chemically alters minerals inside the parent rock, transforming highly structured silicate minerals into active cohesive soil components like clay, introducing chemical structural changes.",
    iconName: "Beaker",
    example: "Feldspar minerals reacting with acidic water molecules to transform into Kaolin clay."
  },
  {
    id: "biological",
    title: "Biological Weathering",
    type: "Biological",
    mechanisms: [
      "Root wedging (growing plant roots split cracks)",
      "Humic acid secretion from decomposing moss and lichens",
      "Soil burrowing organisms (earthworms, gophers ventilating ground)",
      "Biochemical rock digestion by micro-bacteria"
    ],
    description: "Biological activities by living flora and fauna leverage both mechanical forces (root cracking) and chemical compounds (secreting biological acids) to dismantle consolidated rocky surfaces.",
    iconName: "Leaf",
    example: "Tree roots fracturing a bedrock slab on high-altitude mountains."
  }
];

export const GEOTECH_ENGINEERS: GeotechEngineer[] = [
  {
    name: "Charles-Augustin de Coulomb",
    title: "Pioneer of Cohesion & Shear Strength",
    lifespan: "1736 - 1806",
    contributions: [
      "Developed the Coulomb Shear Strength criterion: τ = c + σ·tan(φ)",
      "Created the Wedge Theory of active and passive earth lateral pressure",
      "Pioneered critical static mechanics applied to masonry retaining walls"
    ],
    quote: "The frictional resistance of soils is directly proportional to normal compressive stress, while cohesion provides a persistent static binding force.",
    iconName: "Compass",
    historyText: "A French physical officer who applied rigorous static force equilibrium models to retaining earth block walls. His seminal Coulomb's Equation remains the cornerstone of modern soil strength assessments globally."
  },
  {
    name: "Karl von Terzaghi",
    title: "The Father of Modern Soil Mechanics",
    lifespan: "1883 - 1963",
    contributions: [
      "Formulated the Principle of Effective Stress: σ' = σ - u",
      "Established the Mathematical Model of 1D Soil Consolidation",
      "Authored 'Erdbaumechanik' (1925), which birthed Geotechnical Engineering as a dedicated academic discipline"
    ],
    quote: "True geotechnical genius lies in recognizing the wide gap between simplified theory and the intricate reality of real soil layouts.",
    iconName: "ShieldAlert",
    historyText: "An Austrian structural engineer and geologist who successfully solved the complex hydraulic dynamics of underground water pore-pressure. He introduced structured scientific tests to soil behavior, replacing dangerous guesswork."
  },
  {
    name: "Arthur Casagrande",
    title: "Pioneer of Soil Classification & Testing",
    lifespan: "1902 - 1981",
    contributions: [
      "Designed the liquid limit apparatus (Casagrande cup) for Atterberg Limits",
      "Created the Unified Soil Classification System (USCS) used globally",
      "Conducted extensive testing showing critical void ratios in dynamic liquefaction"
    ],
    quote: "Proper categorization is the first major step of precise geotechnical diagnostics; we must understand liquid limits to predict foundation settlement.",
    iconName: "Ruler",
    historyText: "A prominent Harvard professor who worked closely with Terzaghi. He transformed geotechnical clay assessments by standardizing indices of plasticity, liquid limits, and plastic states."
  },
  {
    name: "Ralph Brazelton Peck",
    title: "Pioneer of Observational Geotechnics",
    lifespan: "1912 - 2008",
    contributions: [
      "Co-authored 'Soil Mechanics in Engineering Practice' with Karl Terzaghi",
      "Pioneered the 'Observational Method' for real-time excavation adjustments",
      "Supervised major deep excavations, subways, and structural support systems"
    ],
    quote: "You have to match engineering calculations with empirical physical monitoring; soil will teach you how a structure behaves in real-time.",
    iconName: "Eye",
    historyText: "A critical American educator who bridged theoretical formulas with practical site instrumentation. He advocated that real soil behavior can only be understood through active monitoring of physical strain during digging operations."
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "leaning-tower-pisa",
    title: "Leaning Tower of Pisa (Differential Settlement Case)",
    location: "Pisa, Italy",
    problem: "The multi-story campanile tower began tilting southward shortly after structural construction began, threatening catastrophic collapse under compressive deadweight loads.",
    cause: "The foundation was set on structural layers of variable thickness consisting of soft marine clay and highly alluvial silt layers. The subsurface compression strength was highly unequal across the tower footprint.",
    soilBehavior: "Unequal differential consolidation settlement occurred. The soft marine clay consolidated rapidly on the southern boundary due to a deep clay lens under elevated pressure, while the northern end compacted less.",
    solution: "Civil engineers extracted tiny dirt cores from underneath the northern foundation (controlled soil extraction). This safely induced localized northern settlement, tilting the structure back to safety and stabilizing the base.",
    lesson: "Comprehensive soil profiling is crucial down to depths matching at least twice the foundation loading width. Clay consolidation behavior must be pre-modeled.",
    accent: "clay",
    illustrationType: "foundation"
  },
  {
    id: "transcona-grain",
    title: "Transcona Grain Elevator (Bearing Capacity Failure)",
    location: "Manitoba, Canada (1913)",
    problem: "A massive concrete grain elevator tilted violently to an angle of 27 degrees within 24 hours of being loaded with heavy grain crops, without structural fracturing of the concrete itself.",
    cause: "The footing foundation load exceeded the ultimate shear resistance capacity of the underlying stiff, saturated lacustrine clay layer.",
    soilBehavior: "Sudden plastic shear failure in soil (general shear failure). The soil under the footing slipped along cylindrical failure planes, causing the massive rigid structure to sink and rotate as a single solid mass.",
    solution: "The building was underpinned using deep concrete cylinder piles sunk down to strong limestone bedrock layers, and jacked back to its horizontal position.",
    lesson: "High strength index on dry clays decreases drastically when saturated; ultimate bearing capacity safety margins must be strictly designed to resist sliding shear failures.",
    accent: "clay",
    illustrationType: "foundation"
  },
  {
    id: "st-francis-dam",
    title: "St. Francis Dam (Hydraulic Piping Collapse)",
    location: "Los Angeles, California (1928)",
    problem: "A massive concrete gravity dam collapsed catastrophically just hours after a reservoir reached capacity, leading to rapid water release and massive downstream loss of life.",
    cause: "The eastern abutment of the concrete dam was founded on unstable, highly faulted conglomerate rock held together by gypsum veins susceptible to rapid water dissolution.",
    soilBehavior: "Severe hydraulic piping and internal water erosion. Swelling seepage water dissolved the holding minerals, flushing fine sediment and silt out of the hillside under intense pressure and creating huge hollow tunnels behind the concrete.",
    solution: "Modern concrete dams require exhaustive grout curtain injection to seal rock faults, upstream impermeable blankets, and extensive weep-hole drain systems to monitor piping.",
    lesson: "Geotechnical investigation must analyze rock mineral solubility. High water-seepage path gradients will flush soil particles if left unconfined.",
    accent: "silt",
    illustrationType: "embankment"
  },
  {
    id: "senise-landslide",
    title: "Senise Landslide (Slope Shear Failure)",
    location: "Basilicata, Italy (1986)",
    problem: "An entire housing block on an active hillside sheared off, sliding down and destroying buildings within minutes after heavy precipitation events.",
    cause: "Unregulated earth removal at the foot of the hill (soil unconfined exposure) combined with torrential rains filling pre-existing soil pore cracks.",
    soilBehavior: "Steep shear strength reduction due to pore water pressure. Raising water levels inside the slope decreased the effective normal stress (Effective Stress σ' = σ - u), reducing friction resistance along the sliding arc downward.",
    solution: "Engineers used heavy deep soil retaining nails, concrete piles, continuous drainage horizontal boreholes, and physical slope re-grading to reduce steep incline loads.",
    lesson: "Rainfall infiltration drastically lowers the static slope stability safety factor. Slope excavation must always be accompanied by a robust retaining wall or drainage design.",
    accent: "gravel",
    illustrationType: "slope"
  }
];

export const SOIL_FORMULAS: SoilFormula[] = [
  {
    name: "Coulomb Shear Strength Equation",
    latex: "\\tau = c + \\sigma \\tan(\\phi)",
    displayEq: "τ = c + σ · tan(φ)",
    description: "Defines the ultimate shear resistance a soil block can muster along a shearing plane under a given normal loading stress.",
    variables: [
      { symbol: "τ", meaning: "Shear strength of the soil", unit: "kPa or kN/m²" },
      { symbol: "c", meaning: "Soil cohesion (inherent static binding chemical charge)", unit: "kPa" },
      { symbol: "σ", meaning: "Normal compressive stress acting perpendicularly on the shear plane", unit: "kPa" },
      { symbol: "φ", meaning: "Internal angle of friction (interlocking resistance of sand/gravel grains)", unit: "degrees (°)" }
    ]
  },
  {
    name: "Terzaghi Effective Stress Principle",
    latex: "\\sigma' = \\sigma - u",
    displayEq: "σ' = σ - u",
    description: "The most important concept in soil mechanics. Explains that soil deformation and friction strength are governed by bone-dry grain contact pressure (effective stress), not total stress.",
    variables: [
      { symbol: "σ'", meaning: "Effective normal stress governing soil friction strength", unit: "kPa" },
      { symbol: "σ", meaning: "Total overburden stress (weight of solid grains + water column above)", unit: "kPa" },
      { symbol: "u", meaning: "Pore water pressure (buoyancy force exerted by water in soil gaps)", unit: "kPa" }
    ]
  },
  {
    name: "Void Ratio Definition",
    latex: "e = \\frac{V_v}{V_s}",
    displayEq: "e = V_v / V_s",
    description: "Relates the volume of micro-gaps (voids) to the volume of dry mineral soil solids. Directly dictates compressibility.",
    variables: [
      { symbol: "e", meaning: "Void ratio (expressed as decimal or percentage)", unit: "dimensionless" },
      { symbol: "V_v", meaning: "Total volume of internal voids (pores filled with air and water)", unit: "m³ or cm³" },
      { symbol: "V_s", meaning: "Net volume of hard solid mineral grains", unit: "m³ or cm³" }
    ]
  }
];

export const SOIL_PROFILE_LAYERS: SoilLayerModel[] = [
  {
    name: "O Horizon (Organic Layer)",
    horizon: "O-Horizon",
    depthRange: "0m to 0.3m",
    colorHex: "#1F1610",
    textColor: "#F1E4C3",
    composition: "Organic forest humus, decaying leaves, loose topsoil, vegetation roots.",
    geotechnicalStatus: "Geotechnically Unstable",
    stiffness: "Spongy, highly compressible, must be stripped and excavated before building structural footings."
  },
  {
    name: "A Horizon (Topsoil)",
    horizon: "A-Horizon",
    depthRange: "0.3m to 1.2m",
    colorHex: "#3B2E24",
    textColor: "#ECE0D1",
    composition: "Dark brown mix of sand, silt, and decomposed biological nutrients. High bioactivity.",
    geotechnicalStatus: "Poor Subgrade material",
    stiffness: "Low stiffness, susceptible to frost heave, highly unstable water content fluctuations."
  },
  {
    name: "B Horizon (Subsoil - Clay Rich)",
    horizon: "B-Horizon",
    depthRange: "1.2m to 4.5m",
    colorHex: "#8D4E2D",
    textColor: "#FDF5E6",
    composition: "Denser reddish clay accumulation washed from above, complex silts, some angular gravel grains.",
    geotechnicalStatus: "Cohesive Clay Layer",
    stiffness: "Medium stiffness, high plasticity. Requires deep soil testing (shrink-swell index) to prevent house cracking."
  },
  {
    name: "C Horizon (Parent Material / Saprolite)",
    horizon: "C-Horizon",
    depthRange: "4.5m to 10.0m",
    colorHex: "#A98E6E",
    textColor: "#211E1D",
    composition: "Decomposed weathered bedrock, dense gravel pockets, loose rock core fragments. Little organic matters.",
    geotechnicalStatus: "Excellent Bearing Capacity",
    stiffness: "Very high stiffness and density. Suitable support for pile tip bearing or deep trench basement footings."
  },
  {
    name: "R Horizon (Bedrock Basal Lithology)",
    horizon: "R-Horizon",
    depthRange: "Below 10.0m",
    colorHex: "#5E5F61",
    textColor: "#FFFFFF",
    composition: "Continuous hard granite, shale, sandstone or limestone bedrock structure.",
    geotechnicalStatus: "Ultimate Structural Foundation Bed",
    stiffness: "Extremely rigid rock. Excellent base for skyscrapers, deep tension anchors, bridge pier footings."
  }
];

export const GEOTECH_QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "Soil mechanics is founded on the concept of 'Effective Stress'. What governs effective stress under Terzaghi's Principle?",
    options: [
      "Effective Stress equals total stress multiplied by pore pressure",
      "Effective Stress equals total pressure minus hydrostatic pore-water pressure",
      "Effective Stress is purely the water pressure inside clay particles",
      "Effective Stress is independent of water table depth"
    ],
    answerIndex: 1,
    explanation: "Terzaghi's effective stress principle states that σ' = σ - u. The strength and volume change of soil are solely governed by grain-to-grain contact pressure, which is total stress minus water buffer pressure.",
    category: "Geotechnical Fundamentals"
  },
  {
    id: "q2",
    question: "Which of the following field rollers is most suited for compacting highly cohesive plastic clay soils?",
    options: [
      "Vibratory smooth-wheeled roller",
      "Pneumatically-tired roller",
      "Sheepfoot roller (kneading rollers)",
      "Vibratory plate compactor"
    ],
    answerIndex: 2,
    explanation: "Clay compaction requires high localized kneading and shearing pressure to break up consolidated mud clods. A sheepfoot roller has projecting 'feet' which kneads soil efficiently from bottom to top.",
    category: "Soil Compaction"
  },
  {
    id: "q3",
    question: "Atterberg Limits dictate states of consistency for fine-grained soils. What state lies between the Liquid Limit and the Plastic Limit?",
    options: [
      "Solid State",
      "Semi-Solid State",
      "Plastic State",
      "Super-saturated Fluid State"
    ],
    answerIndex: 2,
    explanation: "Atterberg Limits state that when moisture decreases: Liquid State -> (Liquid Limit LL) -> Plastic State -> (Plastic Limit PL) -> Semi-Solid State -> (Shrinkage Limit SL) -> Solid State. Thus, between LL and PL is the active Plastic State.",
    category: "Atterberg Limits"
  },
  {
    id: "q4",
    question: "What is the primary physical danger of placing a foundation on dense unconfined sand during an earthquake?",
    options: [
      "Frost Wedging expansion",
      "Dynamic Soil Liquefaction leading to rapid foundation loss of support",
      "Graded capillary rock disintegration",
      "Biomonumental humic dissolution"
    ],
    answerIndex: 1,
    explanation: "Loose, saturated cohensionless fine sands subjected to severe cyclic shaking build extreme internal pore water pressure, cancelling mineral contact forces. The sand temporarily mimics a thick liquid, causing massive structures to tilt or sink instantaneously (soil liquefaction).",
    category: "Dynamic Hazards"
  },
  {
    id: "q5",
    question: "What does the Unified Soil Classification System (USCS) symbol 'GW' standardly designate?",
    options: [
      "Gravelly Water table",
      "Well-graded Gravel",
      "Wet Clayey Gravel",
      "Weakly-graded Glacial Outwash"
    ],
    answerIndex: 1,
    explanation: "In USCS: G stands for Gravel, and W stands for Well-graded (having a wide distribution of all particle sizes without gaps). Hence, GW denotes Wellgraded Gravel with high strength indexes.",
    category: "Soil Classification"
  }
];

export const GLOSSARY: { term: string; definition: string; category: string }[] = [
  { term: "Consolidation", definition: "A slow and continuous process of volume reduction in clay soils under constant static loads, caused by the gradual squeezing out of high-pressure pore water from the micropores.", category: "Settlement" },
  { term: "Cohesion", definition: "The electrostatic or chemical binding force that holds soil particles (like active clay minerals) together, independently of surrounding compressive forces.", category: "Shear Strength" },
  { term: "Void Ratio (e)", definition: "The math ratio of empty void volume to dry soil solid grains volume in a soil sample matrix.", category: "Phase Relations" },
  { term: "Porosity (n)", definition: "The ratio of void volume to total overall soil volume, usually expressed as a percentage.", category: "Phase Relations" },
  { term: "Specific Gravity (Gs)", definition: "The ratio of the physical weight of a given volume of rock/soil minerals to the weight of an identical volume of pure water at 4°C.", category: "Phase Relations" },
  { term: "Optimum Moisture Content (OMC)", definition: "The specific water percentage inside a soil matrix at which a specified compacting effort results in the Absolute Maximum Dry Unit Weight.", category: "Compaction" },
  { term: "Active Earth Pressure", definition: "The minimum lateral pressure from soil against a retaining structure when the wall is pushed or moves slightly away from the backed-up soil block.", category: "Structural Engineering" },
  { term: "Piping Resistance", definition: "A soil's capacity to withstand horizontal washing and channelization by water seeping beneath retaining walls, cofferdams, or earth embankments.", category: "Hydraulics" }
];
