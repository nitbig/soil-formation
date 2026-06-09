import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON payload parsing with larger limit for base64 images
app.use(express.json({ limit: "15mb" }));

// Initialize GoogleGenAI with safe lazy-init parameters
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in environment variables.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// ----------------------------------------------------
// API ENDPOINTS
// ----------------------------------------------------

// 1. Chat assistant endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        text: "Geotechnical Chatbot Offline: Please config the GEMINI_API_KEY in Secrets."
      });
    }

    // Format chat contents
    // Convert incoming simple message-history format into structure expected by gemini
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.content || "" }]
        });
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: `You are Dr. Earth, an expert Geotechnical and Civil Engineering professor and AI companion. 
Your goal is to answer queries related to Soil Formation, Geology, Weathering, Soil Mechanics (Coulomb, Terzaghi, Casagrande, Peck), 
soil properties (clay, silt, sand, gravel, organic), water content, limits, compaction, direct shear, Atterberg, and case studies.
Give educational, detailed, and highly encouraging engineering feedback. Use markdown headers for key sections. Include civil engineering references where applicable.`
      }
    });

    res.json({ text: response.text || "No response received." });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// 2. Classify soil visual representation endpoint
app.post("/api/classify", async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: "imageBase64 is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        text: "Visual Soil Analyzer Offline: Please config the GEMINI_API_KEY in Secrets."
      });
    }

    // Prepare image payload
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const imagePart = {
      inlineData: {
        mimeType: mimeType || "image/jpeg",
        data: base64Data,
      },
    };

    const textPart = {
      text: `Analyze this uploaded sample image representing soil particles, rock core or a geotechnical setting. 
Identify likely soil classification (Clay, Silt, Sand, Gravel, Organic, or mixture of these).
Assess typical visual characteristics shown (e.g. coloration indicates iron oxides, organic clay, dry sand).
Provide:
1. Soil Classification Estimate
2. Visual Assessment (Color, particle shape, likely composition)
3. Constructability Index (Strength, bearing capacity range, drainage capability)
4. Recommended Testing (Sieve test, Atterberg, Compaction, Direct Shear, etc.)
Format professionally as Markdown with headings.`
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts: [imagePart, textPart] },
    });

    res.json({ text: response.text || "No categorization was possible." });
  } catch (error: any) {
    console.error("Error in /api/classify:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// 3. Recommended soil selection endpoint based on parameters
app.post("/api/recommend", (req, res) => {
  const { clay, silt, sand, gravel, placement } = req.body;
  // Standard geotechnical subgrade evaluation rule of thumb
  const c = Number(clay) || 0;
  const si = Number(silt) || 0;
  const sa = Number(sand) || 0;
  const g = Number(gravel) || 0;

  let soilType = "Coarse-grained Soil Mix";
  let bearingCapacity = "Medium (150-250 kPa)";
  let permeability = "Medium";
  let suitability = "";
  let warning = "";

  if (c > 40) {
    soilType = "High-Plasticity Clay";
    bearingCapacity = "Low (75-150 kPa), susceptible to shrinkage & swelling";
    permeability = "Very Low (Impervious)";
    suitability = "Good for core of earth dams or impervious clay liners. Poor for structural foundations without stabilizer piles.";
    warning = "Extreme risk of active swelling and settlement under load. Soil stabilization (lime/cement) or raft foundation suggested.";
  } else if (g > 50) {
    soilType = "Well-Graded Gravel";
    bearingCapacity = "Excellent (300-500 kPa)";
    permeability = "High (Excellent Drainage)";
    suitability = "Excellent subgrade material for highways, runways, and direct footing foundation support.";
    warning = "Highly permeable. Risk of high seepage; not suitable for holding water without an impervious barrier.";
  } else if (sa > 50) {
    soilType = "Medium-Dense Clean Sand";
    bearingCapacity = "High (200-350 kPa)";
    permeability = "High";
    suitability = "Great for subgrade support, shallow footings, concrete aggregate mixes.";
    warning = "Unconfined sand is subject to water erosion, and loose sand has a direct risk of dynamic soil liquefaction during seismic events.";
  } else if (si > 40) {
    soilType = "Inorganic Silt";
    bearingCapacity = "Low to Medium (100-180 kPa)";
    permeability = "Low to Medium (Capillary action risk)";
    suitability = "Poor-to-Fair subgrade. Easy compaction is possible but susceptible to moisture shifts.";
    warning = "Highly susceptible to frost heave and water piping degradation. Poor drain performance.";
  } else {
    // Mixed
    soilType = "Sandy Clay / Silty Sand Blend";
    bearingCapacity = "Fair to Good (150-220 kPa)";
    permeability = "Low";
    suitability = "Good for general embankments, subgrade foundations, and moderate landscape works.";
    warning = "Requires controlled moisture content compaction (Proctor optimal moisture point) to ensure maximum dry density.";
  }

  res.json({
    soilType,
    bearingCapacity,
    permeability,
    suitability,
    warning,
    distribution: { clay: c, silt: si, sand: sa, gravel: g }
  });
});

// ----------------------------------------------------
// VITE OR STATIC SERVING MIDDLEWARE
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Geotechnical Engineering app running on http://localhost:${PORT}`);
  });
}

startServer();
