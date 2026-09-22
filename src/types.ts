export interface BusinessInfo {
  name: string;
  category: string;
  location: string;
  offerings: string;
  challenge: string;
  hasInstagram: boolean;
  hasWebsite: boolean;
  hasGoogleProfile: boolean;
}

export interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  actionText: string;
  actionTarget?: "tools" | "profile" | "guide";
}

export interface GrowthScoreResult {
  overallScore: number;
  statusSummary: string;
  categories: {
    onlinePresence: number;
    customerEngagement: number;
    digitalVisibility: number;
    customerRetention: number;
  };
  recommendations: RecommendationItem[];
}

export interface GrowthIdea {
  title: string;
  explanation: string;
  whyItHelps: string;
  howToStart: string;
}

export interface ReviewResponse {
  whatsappMessage: string;
  shortMessage: string;
  source?: string;
}

export type ActiveView = "landing" | "setup" | "dashboard" | "tools" | "profile";
