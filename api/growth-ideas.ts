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

const getFallbackIdeas = (category: string, goal: string, businessName: string) => {
  const bName = businessName || "your business";
  return [
    {
      title: "Launch a 'Neighborhood First' Google & Map Update",
      explanation: `Refresh ${bName}'s business profile with 5 high-resolution photos of your signature offerings, operating hours, and a direct WhatsApp or contact link.`,
      whyItHelps: "Local searchers prioritize businesses with recent photos and active profiles, generating immediate walk-ins.",
      howToStart: "Snap 3 quick photos today during peak daylight and upload them directly to your profile."
    },
    {
      title: "The 'Bring a Colleague / Friend' Perk Card",
      explanation: `Introduce a simple physical or digital card offering a 10-15% treat or companion perk for customers visiting ${bName} together.`,
      whyItHelps: "Word of mouth lowers acquisition cost and brings pre-qualified customers straight through your door.",
      howToStart: "Print 20 simple stamp cards or post a 24-hour companion story perk on your Instagram page."
    },
    {
      title: "Behind-the-Scenes Story Feature",
      explanation: `Record a 30-second weekly micro-video highlighting how your team prepares your most popular item or service at ${bName}.`,
      whyItHelps: "Customers form emotional connections with authentic local makers and founders rather than faceless chains.",
      howToStart: "Use your phone to film a brief 20-second clip of your morning prep and post it as a Reel or Story."
    },
    {
      title: "Local Community Collaboration",
      explanation: `Partner with a complementary non-competing business in your neighborhood (e.g., gym with juice bar, salon with boutique) for cross-shoutouts.`,
      whyItHelps: "Tap into an already engaged local audience with zero advertising spend.",
      howToStart: "Visit one friendly neighboring shop owner this week and propose sharing each other's flyers or social tags."
    },
    {
      title: "VIP Feedback & Early Tasting / Preview List",
      explanation: `Invite your top 15 regular customers to test or preview new seasonal items or offers before official release.`,
      whyItHelps: "Turns casual customers into passionate vocal advocates who generate authentic positive reviews.",
      howToStart: "Ask 3 friendly customers today for their feedback and invite them to your informal VIP broadcast list."
    }
  ];
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { businessName, category, location, offerings, challenge, goal } = req.body || {};
  const bName = businessName || "Local Business";
  const bCat = category || "Small Business";
  const bGoal = goal || "Increase customers";

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({ ideas: getFallbackIdeas(bCat, bGoal, bName), source: "fallback" });
  }

  try {
    const prompt = `You are a practical, encouraging digital growth advisor for small neighborhood businesses.
Business name: "${bName}"
Category: "${bCat}"
Location: "${location || "Local community"}"
Offerings: "${offerings || "General products / services"}"
Current challenge: "${challenge || "Visibility"}"
Target growth goal: "${bGoal}"

Provide exactly 5 highly specific, practical, budget-friendly growth ideas.
Do NOT use corporate jargon.
Each idea must have:
- title: concise title
- explanation: 2-3 sentences explaining what to do
- whyItHelps: 1 sentence on the business benefit
- howToStart: a simple actionable first step they can do in under 30 minutes.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ideas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  whyItHelps: { type: Type.STRING },
                  howToStart: { type: Type.STRING },
                },
                required: ["title", "explanation", "whyItHelps", "howToStart"],
              },
            },
          },
          required: ["ideas"],
        },
      },
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed.ideas) && parsed.ideas.length > 0) {
        return res.json({ ideas: parsed.ideas.slice(0, 5), source: "gemini" });
      }
    }

    return res.json({ ideas: getFallbackIdeas(bCat, bGoal, bName), source: "fallback" });
  } catch (error: any) {
    return res.json({ ideas: getFallbackIdeas(bCat, bGoal, bName), source: "fallback" });
  }
}
