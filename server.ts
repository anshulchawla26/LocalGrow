import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
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

// Fallback ideas generator when API key is missing or fails
const getFallbackIdeas = (category: string, goal: string, businessName: string) => {
  const bName = businessName || "your business";
  const cat = category || "local business";
  
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

// Fallback review requests
const getFallbackReviewMessages = (businessName: string, category: string, situation: string) => {
  const name = businessName || "our business";
  
  let situationText = "visiting us";
  if (situation === "Completed a purchase") situationText = "your recent purchase";
  else if (situation === "Used a service") situationText = "choosing our service";
  else if (situation === "Had a positive experience") situationText = "spending time with us";

  return {
    whatsappMessage: `Hi there! 👋 Thank you so much for ${situationText} at ${name}. We're a local business and your support means the world to our team. If you have 30 seconds, could you please share a quick review? It really helps neighbors find us! [Your Review Link Here] Thank you! ✨`,
    shortMessage: `Thanks for choosing ${name}! If you enjoyed your experience, we'd love a quick review to help our local business grow: [Your Review Link Here]`
  };
};

// Resilient helper to call Gemini with model fallback and error protection
async function callGeminiWithFallback(
  ai: GoogleGenAI,
  generateParams: {
    contents: string;
    config: any;
  }
): Promise<string | null> {
  // Try primary gemini-3.8-flash first; if experiencing temporary high demand (503), fall back to gemini-3.1-flash-lite
  const models = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    try {
      const response = await ai.models.generateContent({
        model,
        contents: generateParams.contents,
        config: generateParams.config,
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      const isTransientCapacity =
        err?.status === 503 ||
        err?.code === 503 ||
        err?.message?.includes("503") ||
        err?.message?.includes("high demand") ||
        err?.message?.includes("UNAVAILABLE") ||
        err?.status === 429 ||
        err?.message?.includes("RESOURCE_EXHAUSTED");

      if (isTransientCapacity) {
        console.warn(
          `[Gemini] Model ${model} is currently experiencing high demand. ${
            i < models.length - 1 ? "Retrying with fallback model..." : "Using curated fallback."
          }`
        );
      } else {
        console.warn(
          `[Gemini] Model ${model} returned non-fatal error: ${err?.message || "Unknown error"}. Using fallback.`
        );
      }
    }
  }

  return null;
}

// API: Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "LocalGrow", timestamp: new Date().toISOString() });
});

// API: Growth Ideas Generator
app.post("/api/growth-ideas", async (req, res) => {
  const { businessName, category, location, offerings, challenge, goal } = req.body;
  const bName = businessName || "Small Local Business";
  const bCat = category || "Local Retail / Service";
  const bGoal = goal || challenge || "Get more customers";

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        ideas: getFallbackIdeas(bCat, bGoal, bName),
        source: "curated_fallback"
      });
    }

    const prompt = `You are a practical, encouraging digital growth advisor for small neighborhood businesses.
Business Name: "${bName}"
Category: "${bCat}"
Location: "${location || 'Local community'}"
Main Offerings: "${offerings || 'Products / services'}"
Current Goal: "${bGoal}"

Generate exactly 5 realistic, high-impact, practical growth ideas tailored to this specific local business.
Keep language friendly, zero corporate jargon, realistic for a solo owner or small team.
Each idea must have:
- title: concise punchy name
- explanation: 1-2 practical sentences
- whyItHelps: 1 sentence on the business benefit
- howToStart: a simple actionable first step they can do in under 30 minutes.`;

    const text = await callGeminiWithFallback(ai, {
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
                  howToStart: { type: Type.STRING }
                },
                required: ["title", "explanation", "whyItHelps", "howToStart"]
              }
            }
          },
          required: ["ideas"]
        }
      }
    });

    if (text) {
      try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed.ideas) && parsed.ideas.length > 0) {
          return res.json({ ideas: parsed.ideas.slice(0, 5), source: "gemini" });
        }
      } catch (jsonErr) {
        console.warn("[Gemini] Failed to parse generated ideas JSON, falling back cleanly.");
      }
    }

    res.json({ ideas: getFallbackIdeas(bCat, bGoal, bName), source: "fallback" });
  } catch (error: any) {
    console.warn("[Gemini] Handled request exception gracefully:", error?.message || error);
    res.json({ ideas: getFallbackIdeas(bCat, bGoal, bName), source: "fallback" });
  }
});

// API: Review Assistant Generator
app.post("/api/review-assistant", async (req, res) => {
  const { businessName, category, situation } = req.body;
  const bName = businessName || "our business";
  const bCat = category || "local business";
  const bSit = situation || "Completed a purchase";

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        ...getFallbackReviewMessages(bName, bCat, bSit),
        source: "curated_fallback"
      });
    }

    const prompt = `Write two friendly, polite, non-pushy review request templates for a customer of "${bName}" (${bCat}) who recently "${bSit}".
1. "whatsappMessage": Warm, friendly with 1-2 tasteful emojis, expressing genuine gratitude and asking for an honest 30-second review. Include "[Insert Google Review Link]".
2. "shortMessage": A concise SMS / text message under 150 characters with placeholder "[Link]".`;

    const text = await callGeminiWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            whatsappMessage: { type: Type.STRING },
            shortMessage: { type: Type.STRING }
          },
          required: ["whatsappMessage", "shortMessage"]
        }
      }
    });

    if (text) {
      try {
        const parsed = JSON.parse(text);
        return res.json({
          whatsappMessage: parsed.whatsappMessage,
          shortMessage: parsed.shortMessage,
          source: "gemini"
        });
      } catch (jsonErr) {
        console.warn("[Gemini] Failed to parse generated review JSON, falling back cleanly.");
      }
    }

    res.json({
      ...getFallbackReviewMessages(bName, bCat, bSit),
      source: "fallback"
    });
  } catch (error: any) {
    console.warn("[Gemini] Handled review assistant exception gracefully:", error?.message || error);
    res.json({
      ...getFallbackReviewMessages(bName, bCat, bSit),
      source: "fallback"
    });
  }
});

// Vite middleware in dev or static serving in prod
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
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LocalGrow server running at http://localhost:${PORT}`);
  });
}

startServer();
