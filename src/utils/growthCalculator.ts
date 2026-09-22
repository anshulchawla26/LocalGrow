import { BusinessInfo, GrowthScoreResult, RecommendationItem } from "../types";

export function calculateGrowthScore(info: BusinessInfo): GrowthScoreResult {
  // Base score 40
  let score = 40;

  if (info.hasInstagram) score += 15;
  if (info.hasWebsite) score += 15;
  if (info.hasGoogleProfile) score += 20;

  // Personalization adjustments based on business challenge and profile completeness
  let challengeBonus = 0;
  if (info.challenge === "Online visibility" && info.hasGoogleProfile) {
    challengeBonus += 5; // Has GBP but wants visibility -> good foundation
  } else if (info.challenge === "Customer retention" && info.hasInstagram) {
    challengeBonus += 5; // Has social reach to re-engage
  } else if (info.challenge === "Reviews / reputation" && info.hasGoogleProfile) {
    challengeBonus += 4;
  } else if (info.challenge === "Getting new customers" && (info.hasWebsite || info.hasInstagram)) {
    challengeBonus += 5;
  }

  // Small bonus if they provided detailed offerings
  if (info.offerings && info.offerings.trim().length > 10) {
    challengeBonus += 3;
  }

  const overallScore = Math.min(100, Math.max(30, score + challengeBonus));

  // Category percentage calculations
  // 1. Online Presence: based heavily on website + GBP + Instagram
  let onlinePresence = 25;
  if (info.hasWebsite) onlinePresence += 30;
  if (info.hasGoogleProfile) onlinePresence += 25;
  if (info.hasInstagram) onlinePresence += 15;
  if (info.offerings) onlinePresence += 5;

  // 2. Customer Engagement: based on Instagram + offerings communication
  let customerEngagement = 30;
  if (info.hasInstagram) customerEngagement += 35;
  if (info.challenge === "Customer retention" || info.challenge === "Reviews / reputation") {
    customerEngagement += 15;
  } else {
    customerEngagement += 10;
  }
  if (info.hasGoogleProfile) customerEngagement += 15;

  // 3. Digital Visibility: based on Google Profile + Website + Location targeting
  let digitalVisibility = 20;
  if (info.hasGoogleProfile) digitalVisibility += 45;
  if (info.hasWebsite) digitalVisibility += 20;
  if (info.hasInstagram) digitalVisibility += 10;
  if (info.location) digitalVisibility += 5;

  // 4. Customer Retention:
  let customerRetention = 35;
  if (info.hasInstagram) customerRetention += 25;
  if (info.hasGoogleProfile) customerRetention += 20;
  if (info.challenge === "Customer retention") {
    customerRetention = Math.max(customerRetention - 10, 45); // Highlights room for improvement
  } else {
    customerRetention += 10;
  }

  // Clamp percentages to 100%
  onlinePresence = Math.min(95, Math.max(30, onlinePresence));
  customerEngagement = Math.min(95, Math.max(35, customerEngagement));
  digitalVisibility = Math.min(95, Math.max(25, digitalVisibility));
  customerRetention = Math.min(95, Math.max(35, customerRetention));

  // Determine status summary text
  let statusSummary = "Good foundation — there are a few opportunities to improve.";
  if (overallScore >= 85) {
    statusSummary = "Strong digital foundation — ready to scale customer reach.";
  } else if (overallScore >= 70) {
    statusSummary = "Good foundation — there are a few opportunities to improve.";
  } else if (overallScore >= 55) {
    statusSummary = "Emerging digital profile — key high-impact steps ahead.";
  } else {
    statusSummary = "Early stage presence — high potential for rapid local gains.";
  }

  // Generate 3 personalised recommendations
  const candidates: RecommendationItem[] = [];

  // Priority 1: Google Business Profile missing
  if (!info.hasGoogleProfile) {
    candidates.push({
      id: "google-profile",
      title: "Improve your Google presence",
      description: "Create and complete a Google Business Profile so local customers can discover your business more easily on Maps and Search.",
      tag: "High Impact",
      actionText: "Set up Google Profile",
      actionTarget: "guide",
    });
  }

  // Priority 2: Instagram missing
  if (!info.hasInstagram) {
    candidates.push({
      id: "instagram-presence",
      title: "Build a social presence",
      description: "Consider creating a simple Instagram presence to showcase your products, services, and customer experiences.",
      tag: "Visibility",
      actionText: "Plan Social Launch",
      actionTarget: "tools",
    });
  }

  // Priority 3: Website missing
  if (!info.hasWebsite) {
    candidates.push({
      id: "website-home",
      title: "Create a simple online home",
      description: "A basic landing page can help customers quickly understand what you offer and how to contact you.",
      tag: "Credibility",
      actionText: "Draft Content",
      actionTarget: "tools",
    });
  }

  // Challenge-specific recommendations
  if (info.challenge === "Customer retention") {
    candidates.push({
      id: "retention-focus",
      title: "Focus on returning customers",
      description: "Create a simple follow-up or loyalty approach to encourage customers to come back regularly.",
      tag: "Retention",
      actionText: "Explore Growth Ideas",
      actionTarget: "tools",
    });
  }

  if (info.challenge === "Reviews / reputation") {
    candidates.push({
      id: "review-booster",
      title: "Accelerate customer reviews",
      description: "Send friendly, timely review requests after a pleasant visit or purchase using the Review Assistant.",
      tag: "Reputation",
      actionText: "Use Review Assistant",
      actionTarget: "tools",
    });
  }

  if (info.challenge === "Online visibility" && info.hasGoogleProfile) {
    candidates.push({
      id: "local-seo",
      title: "Keep your local listing active",
      description: "Upload fresh photos weekly and post operating updates to stay on top of nearby neighborhood searches.",
      tag: "Visibility",
      actionText: "Action Checklist",
      actionTarget: "tools",
    });
  }

  if (info.challenge === "Getting new customers") {
    candidates.push({
      id: "word-of-mouth",
      title: "Spark neighborhood word of mouth",
      description: "Run a simple 'Bring a Neighbor' weekend special or collaborate with a nearby complementary business.",
      tag: "Acquisition",
      actionText: "View Ideas",
      actionTarget: "tools",
    });
  }

  // Fallback items to ensure at least 3
  if (candidates.length < 3) {
    candidates.push({
      id: "community-engagement",
      title: "Engage your local neighborhood",
      description: "Tag local landmarks, highlight happy regulars, and participate in community events to increase organic visibility.",
      tag: "Community",
      actionText: "Generate Ideas",
      actionTarget: "tools",
    });
  }

  if (candidates.length < 3) {
    candidates.push({
      id: "customer-feedback-loop",
      title: "Establish a direct feedback habit",
      description: "Ask your top 10 repeat customers for their genuine thoughts on what they love most about your offerings.",
      tag: "Insights",
      actionText: "Review Feedback",
      actionTarget: "tools",
    });
  }

  return {
    overallScore,
    statusSummary,
    categories: {
      onlinePresence,
      customerEngagement,
      digitalVisibility,
      customerRetention,
    },
    recommendations: candidates.slice(0, 3),
  };
}
