import React, { useState } from "react";
import {
  Building2,
  MapPin,
  ShoppingBag,
  Target,
  Instagram,
  Globe,
  Map,
  Edit3,
  Check,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { BusinessInfo, GrowthScoreResult, ActiveView } from "../types";

interface BusinessProfileProps {
  businessInfo: BusinessInfo;
  scoreResult: GrowthScoreResult;
  onUpdateInfo: (info: BusinessInfo) => void;
  setActiveView: (view: ActiveView) => void;
}

const CATEGORIES = [
  "Café / Restaurant",
  "Retail",
  "Boutique",
  "Salon / Beauty",
  "Coaching / Education",
  "Home Business",
  "Art / Craft",
  "Other",
];

const CHALLENGES = [
  "Getting new customers",
  "Online visibility",
  "Marketing",
  "Customer retention",
  "Reviews / reputation",
  "Understanding customers",
];

export const BusinessProfile: React.FC<BusinessProfileProps> = ({
  businessInfo,
  scoreResult,
  onUpdateInfo,
  setActiveView,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BusinessInfo>({ ...businessInfo });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateInfo(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Business Profile
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            View and manage your registered business profile and digital presence.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!isEditing ? (
            <button
              id="btn-edit-business-profile"
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-colors min-h-[44px]"
            >
              <Edit3 className="w-4 h-4 text-indigo-600" />
              <span>Edit Business Information</span>
            </button>
          ) : (
            <button
              id="btn-cancel-edit-profile"
              onClick={() => {
                setFormData({ ...businessInfo });
                setIsEditing(false);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors min-h-[44px]"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Business Details Card */}
          <div className="md:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                Registered Profile
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">
                {businessInfo.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {businessInfo.category} • {businessInfo.location}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  Business Category
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {businessInfo.category}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  Location / City
                </span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {businessInfo.location}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 sm:col-span-2">
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  What you mainly sell
                </span>
                <span className="text-sm font-medium text-slate-800">
                  {businessInfo.offerings}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 sm:col-span-2">
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  Main Priority Challenge
                </span>
                <span className="text-sm font-bold text-indigo-700 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-indigo-600" />
                  {businessInfo.challenge}
                </span>
              </div>
            </div>

            {/* Digital Presence Checklist */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                Digital Presence Channels
              </h3>
              <div className="space-y-2.5">
                {/* Instagram */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2.5">
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span className="text-xs font-semibold text-slate-800">
                      Instagram Profile
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      businessInfo.hasInstagram
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {businessInfo.hasInstagram ? "Yes" : "No"}
                  </span>
                </div>

                {/* Website */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-slate-800">
                      Website
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      businessInfo.hasWebsite
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {businessInfo.hasWebsite ? "Yes" : "No"}
                  </span>
                </div>

                {/* Google Business Profile */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2.5">
                    <Map className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-semibold text-slate-800">
                      Google Business Profile
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      businessInfo.hasGoogleProfile
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {businessInfo.hasGoogleProfile ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats sidebar card */}
          <div className="md:col-span-4 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Digital Readiness
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">
                  {scoreResult.overallScore}
                </span>
                <span className="text-xs text-slate-400 font-bold">/ 100</span>
              </div>
              <p className="text-xs text-slate-600">
                {scoreResult.statusSummary}
              </p>

              <button
                id="btn-profile-to-dashboard"
                onClick={() => setActiveView("dashboard")}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
              >
                <span>View Full Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode Form */
        <form
          onSubmit={handleSave}
          className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="edit-biz-name"
                className="block text-sm font-semibold text-slate-800 mb-1"
              >
                Business Name
              </label>
              <input
                id="edit-biz-name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 min-h-[44px]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="edit-biz-category"
                className="block text-sm font-semibold text-slate-800 mb-1"
              >
                Business Category
              </label>
              <select
                id="edit-biz-category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 min-h-[44px]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="edit-biz-location"
                className="block text-sm font-semibold text-slate-800 mb-1"
              >
                Location / City
              </label>
              <input
                id="edit-biz-location"
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 min-h-[44px]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="edit-biz-offerings"
                className="block text-sm font-semibold text-slate-800 mb-1"
              >
                What do you mainly sell?
              </label>
              <input
                id="edit-biz-offerings"
                type="text"
                value={formData.offerings}
                onChange={(e) =>
                  setFormData({ ...formData, offerings: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 min-h-[44px]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="edit-biz-challenge"
                className="block text-sm font-semibold text-slate-800 mb-1"
              >
                Main Challenge
              </label>
              <select
                id="edit-biz-challenge"
                value={formData.challenge}
                onChange={(e) =>
                  setFormData({ ...formData, challenge: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 min-h-[44px]"
              >
                {CHALLENGES.map((ch) => (
                  <option key={ch} value={ch}>
                    {ch}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggle Channels */}
            <div className="pt-2 space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Digital Presence
              </span>

              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 min-h-[48px]">
                <input
                  type="checkbox"
                  checked={formData.hasInstagram}
                  onChange={(e) =>
                    setFormData({ ...formData, hasInstagram: e.target.checked })
                  }
                  className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-slate-800">
                  Instagram Profile (Yes / No)
                </span>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 min-h-[48px]">
                <input
                  type="checkbox"
                  checked={formData.hasWebsite}
                  onChange={(e) =>
                    setFormData({ ...formData, hasWebsite: e.target.checked })
                  }
                  className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-slate-800">
                  Website (Yes / No)
                </span>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 min-h-[48px]">
                <input
                  type="checkbox"
                  checked={formData.hasGoogleProfile}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hasGoogleProfile: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-slate-800">
                  Google Business Profile (Yes / No)
                </span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full sm:w-auto px-5 py-3 text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 min-h-[48px] inline-flex items-center justify-center order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="btn-save-profile-changes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs transition-colors min-h-[48px] order-1 sm:order-2"
            >
              <Check className="w-4 h-4" />
              <span>Save & Update Growth Score</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
