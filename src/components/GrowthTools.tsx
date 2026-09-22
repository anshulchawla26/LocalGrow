import React, { useState } from "react";
import {
  Sparkles,
  Lightbulb,
  MessageSquare,
  Copy,
  Check,
  ArrowRight,
  RefreshCw,
  Share2,
  ExternalLink,
  Target,
  Building,
  HelpCircle,
} from "lucide-react";
import { BusinessInfo, GrowthIdea, ReviewResponse } from "../types";

interface GrowthToolsProps {
  businessInfo: BusinessInfo;
}

const GOALS = [
  "Get more customers",
  "Improve visibility",
  "Increase repeat customers",
  "Improve customer experience",
  "Get more reviews",
];

const SITUATIONS = [
  "Completed a purchase",
  "Visited the business",
  "Used a service",
  "Had a positive experience",
];

export const GrowthTools: React.FC<GrowthToolsProps> = ({ businessInfo }) => {
  // Active tool tab
  const [activeTab, setActiveTab] = useState<"ideas" | "reviews">("ideas");

  // Tool 1: Growth Ideas state
  const [selectedGoal, setSelectedGoal] = useState<string>(
    businessInfo.challenge === "Getting new customers"
      ? "Get more customers"
      : businessInfo.challenge === "Online visibility"
      ? "Improve visibility"
      : businessInfo.challenge === "Customer retention"
      ? "Increase repeat customers"
      : businessInfo.challenge === "Reviews / reputation"
      ? "Get more reviews"
      : "Get more customers"
  );
  const [ideas, setIdeas] = useState<GrowthIdea[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState<boolean>(false);
  const [copiedIdeaIdx, setCopiedIdeaIdx] = useState<number | null>(null);

  // Tool 2: Review Assistant state
  const [reviewBizName, setReviewBizName] = useState<string>(businessInfo.name);
  const [reviewBizCategory, setReviewBizCategory] = useState<string>(
    businessInfo.category
  );
  const [selectedSituation, setSelectedSituation] = useState<string>(
    "Completed a purchase"
  );
  const [reviewResult, setReviewResult] = useState<ReviewResponse | null>(null);
  const [loadingReview, setLoadingReview] = useState<boolean>(false);
  const [copiedReviewType, setCopiedReviewType] = useState<string | null>(null);

  // Generate Growth Ideas
  const handleGenerateIdeas = async () => {
    setLoadingIdeas(true);
    try {
      const response = await fetch("/api/growth-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: businessInfo.name,
          category: businessInfo.category,
          location: businessInfo.location,
          offerings: businessInfo.offerings,
          challenge: businessInfo.challenge,
          goal: selectedGoal,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.ideas) && data.ideas.length > 0) {
          setIdeas(data.ideas);
        }
      }
    } catch (err: any) {
      console.warn("Could not retrieve growth ideas from network:", err?.message || err);
    } finally {
      setLoadingIdeas(false);
    }
  };

  // Generate Review Request
  const handleGenerateReview = async () => {
    setLoadingReview(true);
    try {
      const response = await fetch("/api/review-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: reviewBizName,
          category: reviewBizCategory,
          situation: selectedSituation,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.whatsappMessage && data.shortMessage) {
          setReviewResult(data);
        }
      }
    } catch (err: any) {
      console.warn("Could not generate review request from network:", err?.message || err);
    } finally {
      setLoadingReview(false);
    }
  };

  // Copy helper
  const copyToClipboard = (text: string, identifier: string | number) => {
    navigator.clipboard.writeText(text);
    if (typeof identifier === "number") {
      setCopiedIdeaIdx(identifier);
      setTimeout(() => setCopiedIdeaIdx(null), 2500);
    } else {
      setCopiedReviewType(identifier);
      setTimeout(() => setCopiedReviewType(null), 2500);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>LocalGrow AI Utilities</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Growth Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Simple tools to help you take your next step.
        </p>

        {/* Tab Switcher between the ONLY TWO tools */}
        <div className="flex items-center gap-2 mt-6 p-1 bg-slate-100/90 rounded-xl max-w-md border border-slate-200/70">
          <button
            id="tab-tool-ideas"
            onClick={() => setActiveTab("ideas")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === "ideas"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Growth Ideas</span>
          </button>
          <button
            id="tab-tool-reviews"
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === "reviews"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <span>Review Assistant</span>
          </button>
        </div>
      </div>

      {/* TOOL 1 — GROWTH IDEAS */}
      {activeTab === "ideas" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Growth Ideas
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Get practical ideas based on your business and your current challenge.
                </p>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-auto border border-slate-200">
                5 Practical Ideas
              </span>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              {/* Business Type (automatically used) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Business type
                </label>
                <div className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 flex items-center justify-between">
                  <span>{businessInfo.category}</span>
                  <span className="text-xs text-slate-600 font-normal">
                    {businessInfo.name}
                  </span>
                </div>
              </div>

              {/* Goal Dropdown */}
              <div>
                <label
                  htmlFor="select-growth-goal"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5"
                >
                  Goal
                </label>
                <select
                  id="select-growth-goal"
                  value={selectedGoal}
                  onChange={(e) => setSelectedGoal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-medium"
                >
                  {GOALS.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500">
                Tailored for small local businesses • Zero jargon
              </span>
              <button
                id="btn-generate-growth-ideas"
                onClick={handleGenerateIdeas}
                disabled={loadingIdeas}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs transition-colors disabled:opacity-60"
              >
                {loadingIdeas ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating Ideas...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Ideas</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Ideas Results */}
          {ideas.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-base font-bold text-slate-900">
                  Recommended Ideas for {businessInfo.name}
                </h3>
                <span className="text-xs text-slate-500">
                  Goal: {selectedGoal}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {ideas.map((idea, index) => {
                  const isCopied = copiedIdeaIdx === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-indigo-200 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 text-xs font-mono font-bold flex items-center justify-center border border-indigo-100">
                            0{index + 1}
                          </span>
                          <h4 className="text-base font-bold text-slate-900">
                            {idea.title}
                          </h4>
                        </div>

                        <button
                          id={`btn-copy-idea-${index}`}
                          onClick={() =>
                            copyToClipboard(
                              `${idea.title}\n\n${idea.explanation}\n\nWhy it helps: ${idea.whyItHelps}\nHow to start: ${idea.howToStart}`,
                              index
                            )
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                            isCopied
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                        {idea.explanation}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="font-bold text-indigo-700 block mb-0.5">
                            Why it helps:
                          </span>
                          <span className="text-slate-600 leading-snug">
                            {idea.whyItHelps}
                          </span>
                        </div>

                        <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/60">
                          <span className="font-bold text-emerald-800 block mb-0.5">
                            How to start:
                          </span>
                          <span className="text-slate-700 leading-snug">
                            {idea.howToStart}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty state prompt if not generated yet */}
          {ideas.length === 0 && !loadingIdeas && (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center max-w-md mx-auto">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Ready to generate growth ideas?
              </h4>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Click "Generate Ideas" above to get 5 practical, small-business
                friendly suggestions.
              </p>
              <button
                type="button"
                onClick={handleGenerateIdeas}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
              >
                <span>Generate 5 Ideas Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* TOOL 2 — REVIEW ASSISTANT */}
      {activeTab === "reviews" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Review Assistant
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Make it easier for happy customers to share their experience.
                </p>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-auto border border-slate-200">
                Google & WhatsApp Friendly
              </span>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              {/* Business Name */}
              <div>
                <label
                  htmlFor="input-review-name"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5"
                >
                  Business name
                </label>
                <input
                  id="input-review-name"
                  type="text"
                  value={reviewBizName}
                  onChange={(e) => setReviewBizName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Business Type */}
              <div>
                <label
                  htmlFor="input-review-category"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5"
                >
                  Business type
                </label>
                <input
                  id="input-review-category"
                  type="text"
                  value={reviewBizCategory}
                  onChange={(e) => setReviewBizCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Customer situation */}
              <div>
                <label
                  htmlFor="select-situation"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5"
                >
                  Customer situation
                </label>
                <select
                  id="select-situation"
                  value={selectedSituation}
                  onChange={(e) => setSelectedSituation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-medium"
                >
                  {SITUATIONS.map((sit) => (
                    <option key={sit} value={sit}>
                      {sit}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500">
                Polite, friendly, and non-pushy language
              </span>
              <button
                id="btn-create-review-request"
                onClick={handleGenerateReview}
                disabled={loadingReview}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs transition-colors disabled:opacity-60"
              >
                {loadingReview ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Writing Message...</span>
                  </>
                ) : (
                  <>
                    <span>Create Review Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results: Two Versions (WhatsApp Message + Short Message) */}
          {reviewResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* WhatsApp Message */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        WA
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        WhatsApp Message
                      </h4>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      Warm & Friendly
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-line">
                    {reviewResult.whatsappMessage}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Perfect for WhatsApp chat follow-ups
                  </span>
                  <button
                    id="btn-copy-wa-message"
                    onClick={() =>
                      copyToClipboard(reviewResult.whatsappMessage, "whatsapp")
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      copiedReviewType === "whatsapp"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {copiedReviewType === "whatsapp" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Short Message */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        SMS
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Short Message
                      </h4>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      SMS / Receipt
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-line">
                    {reviewResult.shortMessage}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Concise for SMS or printed receipts
                  </span>
                  <button
                    id="btn-copy-short-message"
                    onClick={() =>
                      copyToClipboard(reviewResult.shortMessage, "short")
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      copiedReviewType === "short"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {copiedReviewType === "short" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Simple visual card explaining Next Step */}
          <div className="bg-indigo-50/70 rounded-2xl border border-indigo-100 p-5 sm:p-6 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Share2 className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">Next step</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Add your Google review link here when you have one.
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Tip: You can get your direct review link from your Google
                Business Profile manager by clicking "Ask for reviews".
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
