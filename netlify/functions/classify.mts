import type { Context } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { imageBase64, mimeType } = await req.json();
  if (!imageBase64) {
    return new Response(JSON.stringify({ error: "imageBase64 is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

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
Format professionally as Markdown with headings.`,
  };

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: { parts: [imagePart, textPart] },
  });

  return Response.json({ text: response.text || "No categorization was possible." });
};

export const config = {
  path: "/api/classify",
};
