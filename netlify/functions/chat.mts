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

  const { message, history } = await req.json();
  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const contents: any[] = [];
  if (history && Array.isArray(history)) {
    history.forEach((h: any) => {
      contents.push({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content || "" }],
      });
    });
  }
  contents.push({ role: "user", parts: [{ text: message }] });

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents,
    config: {
      systemInstruction: `You are Dr. Earth, an expert Geotechnical and Civil Engineering professor and AI companion.
Your goal is to answer queries related to Soil Formation, Geology, Weathering, Soil Mechanics (Coulomb, Terzaghi, Casagrande, Peck),
soil properties (clay, silt, sand, gravel, organic), water content, limits, compaction, direct shear, Atterberg, and case studies.
Give educational, detailed, and highly encouraging engineering feedback. Use markdown headers for key sections. Include civil engineering references where applicable.`,
    },
  });

  return Response.json({ text: response.text || "No response received." });
};

export const config = {
  path: "/api/chat",
};
