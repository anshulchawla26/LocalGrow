interface VercelRequest {
  method?: string;
  body?: any;
}

interface VercelResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: any) => void;
  setHeader: (name: string, value: string) => VercelResponse;
}

import { GoogleGenAI, Type } from "@google/genai";

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const getFallbackReviewMessages = (businessName: string, category: string, situation: string) => {
  const bName = businessName || "our business";
  return {
    whatsappMessage: `Hi there! 👋 Thank you so much for your recent purchase at ${bName}. We're a local business and your support means the world to our team. If you have 30 seconds, could you please share a quick review? It really helps neighbors find us! [Your Review Link Here] Thank you! ✨`,
    shortMessage: `Thanks for choosing ${bName}! If you enjoyed your experience, we'd love a quick review to help our local business grow: [Your Review Link Here]`
  };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { businessName, category, situation } = req.body || {};
  const bName = businessName || "our business";
  const bCat = category || "local business";
  const bSit = situation || "visited recently";

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({
      ...getFallbackReviewMessages(bName, bCat, bSit),
      source: "fallback"
    });
  }

  try {
    const prompt = `Write two friendly, highly effective review request messages for a small local business.
Business Name: "${bName}"
Category / Type: "${bCat}"
Customer Situation: "${bSit}"

Generate 2 versions:
1. "whatsappMessage": Warm, friendly with 1-2 tasteful emojis, expressing genuine gratitude and asking for an honest 30-second review. Include "[Insert Google Review Link]".
2. "shortMessage": A concise SMS / text message under 150 characters with placeholder "[Link]".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            whatsappMessage: { type: Type.STRING },
            shortMessage: { type: Type.STRING },
          },
          required: ["whatsappMessage", "shortMessage"],
        },
      },
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      return res.json({
        whatsappMessage: parsed.whatsappMessage,
        shortMessage: parsed.shortMessage,
        source: "gemini"
      });
    }

    return res.json({
      ...getFallbackReviewMessages(bName, bCat, bSit),
      source: "fallback"
    });
  } catch (error: any) {
    return res.json({
      ...getFallbackReviewMessages(bName, bCat, bSit),
      source: "fallback"
    });
  }
}
