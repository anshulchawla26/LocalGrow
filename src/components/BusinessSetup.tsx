import React, { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Building2,
  MapPin,
  ShoppingBag,
  Target,
  Globe,
  Instagram,
  Map,
  Check,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { BusinessInfo } from "../types";

interface BusinessSetupProps {
  initialInfo?: BusinessInfo | null;
  onSave: (info: BusinessInfo) => void;
  onCancel?: () => void;
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
  { label: "Getting new customers", desc: "Attracting first-time local visitors" },
  { label: "Online visibility", desc: "Being found easily on Google & social media" },
  { label: "Marketing", desc: "Creating effective local promotions & posts" },
  { label: "Customer retention", desc: "Turning one-off shoppers into repeat regulars" },
  { label: "Reviews / reputation", desc: "Gathering positive customer testimonials" },
  { label: "Understanding customers", desc: "Learning what neighborhood buyers prefer" },
];

export const BusinessSetup: React.FC<BusinessSetupProps> = ({
  initialInfo,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(initialInfo?.name || "");
  const [category, setCategory] = useState(initialInfo?.category || "Café / Restaurant");
  const [location, setLocation] = useState(initialInfo?.location || "");
  const [offerings, setOfferings] = useState(initialInfo?.offerings || "");
  const [challenge, setChallenge] = useState(initialInfo?.challenge || "Online visibility");
  const [hasInstagram, setHasInstagram] = useState<boolean>(initialInfo?.hasInstagram ?? true);
  const [hasWebsite, setHasWebsite] = useState<boolean>(initialInfo?.hasWebsite ?? false);
  const [hasGoogleProfile, setHasGoogleProfile] = useState<boolean>(
    initialInfo?.hasGoogleProfile ?? true
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleApplyDemo = () => {
    setName("Sunrise Café");
    setCategory("Café / Restaurant");
    setLocation("Gurugram");
    setOfferings("Coffee, snacks and casual meals");
    setChallenge("Online visibility");
    setHasInstagram(true);
    setHasWebsite(false);
    setHasGoogleProfile(true);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "Please enter your business name.";
    if (!location.trim()) newErrors.location = "Please enter your city or neighborhood.";
    if (!offerings.trim()) newErrors.offerings = "Please tell us what you mainly sell or offer.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to the first error
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementById(`field-${firstErrorKey}`);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    onSave({
      name: name.trim(),
      category,
      location: location.trim(),
      offerings: offerings.trim(),
      challenge,
      hasInstagram,
      hasWebsite,
      hasGoogleProfile,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast 2-Minute Setup • No Password Required</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Let's understand your business
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Answer a few quick questions so we can create a personalised growth plan.
          </p>

          {/* Convenient Demo option button */}
          <div className="mt-4">
            <button
              type="button"
              id="btn-try-demo-business"
              onClick={handleApplyDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-indigo-700 border border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/50 shadow-xs transition-colors min-h-[40px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Try Demo Business (Sunrise Café)</span>
            </button>
          </div>
        </div>

        {/* Setup Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-8 space-y-8"
        >
          {/* SECTION 1: Business Information */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Business Information
              </h2>
            </div>

            {/* Business Name */}
            <div id="field-name">
              <label
                htmlFor="input-business-name"
                className="block text-sm font-semibold text-slate-800 mb-1"
              >
                Business Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="input-business-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="e.g. Sunrise Café or Bloom Flower Studio"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all min-h-[44px] ${
                  errors.name
                    ? "border-rose-300 focus:ring-rose-200 bg-rose-50/20"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Business Category */}
            <div>
              <label
                htmlFor="select-category"
                className="block text-sm font-semibold text-slate-800 mb-1"
              >
                Business Category
              </label>
              <select
                id="select-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 min-h-[44px]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location / City */}
            <div id="field-location">
              <label
                htmlFor="input-location"
                className="block text-sm font-semibold text-slate-800 mb-1"
              >
                Location / City <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  id="input-location"
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (errors.location)
                      setErrors((prev) => ({ ...prev, location: "" }));
                  }}
                  placeholder="e.g. Gurugram, Bristol, Austin"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all min-h-[44px] ${
                    errors.location
                      ? "border-rose-300 focus:ring-rose-200 bg-rose-50/20"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />
              </div>
              {errors.location && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.location}
                </p>
              )}
            </div>

            {/* What do you mainly sell? */}
            <div id="field-offerings">
              <label
                htmlFor="input-offerings"
                className="block text-sm font-semibold text-slate-800 mb-1"
              >
                What do you mainly sell? <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <input
                  id="input-offerings"
                  type="text"
                  value={offerings}
                  onChange={(e) => {
                    setOfferings(e.target.value);
                    if (errors.offerings)
                      setErrors((prev) => ({ ...prev, offerings: "" }));
                  }}
                  placeholder="e.g. Coffee, snacks and casual meals, or handmade pottery"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all min-h-[44px] ${
                    errors.offerings
                      ? "border-rose-300 focus:ring-rose-200 bg-rose-50/20"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />
              </div>
              {errors.offerings && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.offerings}
                </p>
              )}
            </div>
          </div>

          {/* SECTION 2: Your Main Challenge */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Target className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Your Main Challenge
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Choose ONE priority area you would like LocalGrow to focus on first:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CHALLENGES.map((item) => {
                const isSelected = challenge === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    id={`challenge-option-${item.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    onClick={() => setChallenge(item.label)}
                    className={`p-3.5 rounded-xl text-left border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60"
                    }`}
                  >
                    <div>
                      <p
                        className={`text-sm font-semibold leading-tight ${
                          isSelected ? "text-indigo-900" : "text-slate-900"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: Digital Presence */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Globe className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Digital Presence
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Select what your business currently uses. Be honest — this helps us
              spot immediate opportunities!
            </p>

            <div className="space-y-3">
              {/* Instagram */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block">
                      Do you have Instagram?
                    </span>
                    <span className="text-xs text-slate-500">
                      Active account for posts or reels
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    id="btn-ig-yes"
                    onClick={() => setHasInstagram(true)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      hasInstagram
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="btn-ig-no"
                    onClick={() => setHasInstagram(false)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      !hasInstagram
                        ? "bg-slate-800 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Website */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block">
                      Do you have a website?
                    </span>
                    <span className="text-xs text-slate-500">
                      Any active landing page or shop
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    id="btn-web-yes"
                    onClick={() => setHasWebsite(true)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      hasWebsite
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="btn-web-no"
                    onClick={() => setHasWebsite(false)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      !hasWebsite
                        ? "bg-slate-800 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Google Business Profile */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Map className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block">
                      Do you have a Google Business Profile?
                    </span>
                    <span className="text-xs text-slate-500">
                      Listed on Google Maps with reviews
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    id="btn-gbp-yes"
                    onClick={() => setHasGoogleProfile(true)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      hasGoogleProfile
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="btn-gbp-no"
                    onClick={() => setHasGoogleProfile(false)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      !hasGoogleProfile
                        ? "bg-slate-800 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {onCancel ? (
              <button
                type="button"
                id="btn-cancel-setup"
                onClick={onCancel}
                className="w-full sm:w-auto px-5 py-3 text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors min-h-[48px] inline-flex items-center justify-center order-2 sm:order-1"
              >
                Cancel
              </button>
            ) : (
              <div className="text-xs text-slate-600 flex items-center gap-1.5 order-2 sm:order-1">
                <HelpCircle className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span>Instant calculations saved locally in your browser.</span>
              </div>
            )}

            <button
              type="submit"
              id="btn-submit-growth-plan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md shadow-indigo-200 transition-all min-h-[48px] order-1 sm:order-2"
            >
              <span>Create My Growth Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
