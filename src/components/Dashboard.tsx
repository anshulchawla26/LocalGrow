import React from "react";
import {
  Sparkles,
  ArrowRight,
  Globe,
  Users,
  Eye,
  Repeat,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Share2,
} from "lucide-react";
import { BusinessInfo, GrowthScoreResult, ActiveView } from "../types";

interface DashboardProps {
  businessInfo: BusinessInfo;
  scoreResult: GrowthScoreResult;
  setActiveView: (view: ActiveView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  businessInfo,
  scoreResult,
  setActiveView,
}) => {
  const { overallScore, statusSummary, categories, recommendations } = scoreResult;

  // Circular progress math
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Good morning, {businessInfo.name}</span>
            <span className="text-xl sm:text-2xl">👋</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Here's your current digital growth snapshot.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-dash-open-tools"
            onClick={() => setActiveView("tools")}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Open Growth Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Score Card + Growth Snapshot Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* SCORE CARD (Large card) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle gradient corner */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-indigo-50/70 to-transparent rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  LocalGrow Digital Growth Score
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  Your Digital Growth Score
                </h2>
              </div>

              {/* Tag indicator */}
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {businessInfo.category}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 my-4">
              {/* Circular progress meter */}
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 90 90">
                  {/* Background Track */}
                  <circle
                    cx="45"
                    cy="45"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="7"
                    className="text-slate-100"
                    fill="transparent"
                  />
                  {/* Active Progress */}
                  <circle
                    cx="45"
                    cy="45"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="text-indigo-600 transition-all duration-1000 ease-out"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-slate-900 leading-none">
                    {overallScore}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 uppercase">
                    / 100
                  </span>
                </div>
              </div>

              {/* Score text details */}
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Calculated from your digital profile</span>
                </div>
                <p className="text-base font-semibold text-slate-800 leading-snug">
                  {statusSummary}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Focusing on your high-opportunity areas like customer review
                  collection and local profile discovery will boost your overall
                  reach.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              An indicative score based on the information you provided.
            </span>
            <button
              id="btn-edit-business-profile-score"
              onClick={() => setActiveView("profile")}
              className="font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Update Profile →
            </button>
          </div>
        </div>

        {/* SIMPLE GROWTH CHART (Growth Snapshot) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Growth Snapshot
                </h3>
                <p className="text-xs text-slate-500">
                  Estimated engagement progression over 4 weeks
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                Sample progress data
              </span>
            </div>

            {/* Clean SVG Trend Visualization */}
            <div className="pt-3 pb-2">
              <div className="h-32 w-full flex items-end justify-between gap-3 px-2 py-1 bg-slate-50/70 rounded-xl border border-slate-100">
                {/* Week 1 */}
                <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-semibold text-slate-500">
                    42%
                  </span>
                  <div className="w-full max-w-[42px] bg-indigo-200 hover:bg-indigo-300 rounded-t-md h-[42%] transition-all"></div>
                  <span className="text-[11px] font-medium text-slate-600">
                    Week 1
                  </span>
                </div>

                {/* Week 2 */}
                <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-semibold text-slate-500">
                    55%
                  </span>
                  <div className="w-full max-w-[42px] bg-indigo-300 hover:bg-indigo-400 rounded-t-md h-[55%] transition-all"></div>
                  <span className="text-[11px] font-medium text-slate-600">
                    Week 2
                  </span>
                </div>

                {/* Week 3 */}
                <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-semibold text-slate-500">
                    68%
                  </span>
                  <div className="w-full max-w-[42px] bg-indigo-400 hover:bg-indigo-500 rounded-t-md h-[68%] transition-all"></div>
                  <span className="text-[11px] font-medium text-slate-600">
                    Week 3
                  </span>
                </div>

                {/* Week 4 */}
                <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-bold text-indigo-700">
                    82%
                  </span>
                  <div className="w-full max-w-[42px] bg-indigo-600 rounded-t-md h-[82%] shadow-xs transition-all"></div>
                  <span className="text-[11px] font-bold text-indigo-700">
                    Week 4
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-600 mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span>Illustrative projection following recommendations</span>
            <span className="font-semibold text-emerald-600">+40% Potential</span>
          </p>
        </div>
      </div>

      {/* DASHBOARD CATEGORIES (4 cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Category Breakdown
          </h2>
          <span className="text-xs text-slate-500">
            Based on your setup inputs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Online Presence */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-slate-900">
                {categories.onlinePresence}%
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">
              Online Presence
            </h3>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${categories.onlinePresence}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              {businessInfo.hasWebsite && businessInfo.hasGoogleProfile
                ? "Active profile & website connected"
                : "Missing 1 or more core channels"}
            </p>
          </div>

          {/* Card 2: Customer Engagement */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-slate-900">
                {categories.customerEngagement}%
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">
              Customer Engagement
            </h3>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-pink-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${categories.customerEngagement}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              {businessInfo.hasInstagram
                ? "Social reach active for local patrons"
                : "Social channels not yet established"}
            </p>
          </div>

          {/* Card 3: Digital Visibility */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-slate-900">
                {categories.digitalVisibility}%
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">
              Digital Visibility
            </h3>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${categories.digitalVisibility}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              {businessInfo.hasGoogleProfile
                ? "Search & Maps profile claimed"
                : "Potential visitors cannot locate easily"}
            </p>
          </div>

          {/* Card 4: Customer Retention */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Repeat className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-slate-900">
                {categories.customerRetention}%
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">
              Customer Retention
            </h3>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${categories.customerRetention}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Repeat visit systems & loyalty touchpoints
            </p>
          </div>
        </div>
      </div>

      {/* RECOMMENDATIONS (3 personalised cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Your top growth opportunities
            </h2>
            <p className="text-xs text-slate-500">
              Tailored specifically to your business type ({businessInfo.category}) and current challenge
            </p>
          </div>
          <button
            id="btn-rec-explore-tools"
            onClick={() => setActiveView("tools")}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>Growth Tools</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendations.map((rec, idx) => (
            <div
              key={rec.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {rec.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {rec.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {rec.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  id={`btn-rec-action-${rec.id}`}
                  onClick={() => {
                    if (rec.actionTarget === "profile") {
                      setActiveView("profile");
                    } else {
                      setActiveView("tools");
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>{rec.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Launch Banner to Tools */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for action?</span>
          </div>
          <h3 className="text-lg font-bold">
            Generate customized growth ideas & review requests
          </h3>
          <p className="text-xs text-indigo-200">
            Use LocalGrow's two lightweight tools powered by Gemini AI.
          </p>
        </div>

        <button
          id="btn-banner-go-tools"
          onClick={() => setActiveView("tools")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 active:bg-slate-200 transition-transform hover:scale-102 shrink-0 shadow-sm"
        >
          <span>Explore Tools</span>
          <ArrowRight className="w-4 h-4 text-indigo-600" />
        </button>
      </div>
    </div>
  );
};
