import React from "react";
import {
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Compass,
  Lightbulb,
  ShieldCheck,
  ChevronRight,
  MapPin,
  Coffee,
} from "lucide-react";
import { ActiveView } from "../types";

interface LandingPageProps {
  setActiveView: (view: ActiveView) => void;
  onTryDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  setActiveView,
  onTryDemo,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 border-b border-slate-200/60">
        {/* Subtle decorative background blur */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-tr from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Simple digital tools for growing local businesses</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Grow your local business,{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                  digitally.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                LocalGrow helps small businesses discover digital opportunities,
                get practical growth recommendations, and use simple tools to
                improve their online presence.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  id="hero-btn-get-started"
                  onClick={() => setActiveView("setup")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md shadow-indigo-200 transition-all hover:translate-y-[-1px] min-h-[48px]"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  id="hero-btn-how-it-works"
                  onClick={() => {
                    const el = document.getElementById("how-it-works-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-colors min-h-[48px]"
                >
                  See How It Works
                </button>
              </div>

              {/* Instant Try Demo Business shortcut */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-500">
                <span>Want to see it in action?</span>
                <button
                  id="hero-btn-demo-quick"
                  onClick={onTryDemo}
                  className="font-semibold text-indigo-600 hover:text-indigo-800 underline underline-offset-4 decoration-indigo-300 hover:decoration-indigo-600 transition-all py-1 min-h-[36px]"
                >
                  Explore Sunrise Café Demo →
                </button>
              </div>
            </div>

            {/* Right Column: Visual Representation of LocalGrow Dashboard */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-indigo-100/50 p-4 sm:p-6 space-y-4 sm:space-y-5 relative">
                {/* Header preview */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 leading-tight truncate">
                        Sunrise Café
                      </h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" /> Gurugram • Café
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 shrink-0">
                    <TrendingUp className="w-3 h-3" />
                    +18%
                  </span>
                </div>

                {/* Score & Circular gauge preview */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-indigo-50/70 to-slate-50 border border-indigo-100/60 flex items-center justify-between gap-3 sm:gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-indigo-600">
                      Digital Growth Score
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-3xl font-extrabold text-slate-900">
                        75
                      </span>
                      <span className="text-sm font-medium text-slate-400">
                        / 100
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      Good foundation — high local upside.
                    </p>
                  </div>

                  {/* Circular progress SVG */}
                  <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-indigo-600"
                        strokeDasharray="75, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-slate-800">
                      75%
                    </span>
                  </div>
                </div>

                {/* Recommendations preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Priority Recommendations</span>
                    <span className="text-[11px] text-indigo-600">3 Actions</span>
                  </div>

                  <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-slate-800">
                        Create a simple online home
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        A lightweight landing page helps diners browse menus.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-slate-800">
                        Ask for Google reviews on receipts
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        Quick WhatsApp prompts after great meal visits.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Small analytics chart preview */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-700">Growth Snapshot</span>
                    <span className="text-[10px] text-slate-600 uppercase font-medium bg-slate-100 px-1.5 py-0.5 rounded">
                      Sample progress
                    </span>
                  </div>

                  {/* Sparkline bars */}
                  <div className="grid grid-cols-4 gap-2 items-end h-14 bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full bg-indigo-200 rounded-t h-5"></div>
                      <span className="text-[9px] text-slate-600">W1</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full bg-indigo-300 rounded-t h-7"></div>
                      <span className="text-[9px] text-slate-600">W2</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full bg-indigo-400 rounded-t h-9"></div>
                      <span className="text-[9px] text-slate-600">W3</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full bg-indigo-600 rounded-t h-12"></div>
                      <span className="text-[9px] font-bold text-indigo-600">W4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        id="how-it-works-section"
        className="py-16 md:py-24 bg-white border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-600">
              Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              A simpler way to grow
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Three clear steps tailored for busy small business owners — no
              confusing tech jargon or heavy setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 01 */}
            <div className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-7 transition-all hover:shadow-md hover:border-indigo-100 group">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  01
                </span>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Understand
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tell LocalGrow about your business and discover your digital
                strengths and gaps.
              </p>
            </div>

            {/* Card 02 */}
            <div className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-7 transition-all hover:shadow-md hover:border-indigo-100 group">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  02
                </span>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Improve
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Get personalised recommendations based on your business.
              </p>
            </div>

            {/* Card 03 */}
            <div className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-7 transition-all hover:shadow-md hover:border-indigo-100 group">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  03
                </span>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Grow
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Use simple tools and track your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features-section"
        className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-600">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Everything you need to get started
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Focused on the exact practical levers that turn internet searchers
              into repeat paying customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Digital Growth Score
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Understand your business's digital readiness at a glance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Personalised Recommendations
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Get practical suggestions based on your business and its goals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Simple Growth Tools
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Use lightweight tools designed for everyday business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-b from-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-14 shadow-xl shadow-slate-200 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Ready to grow your business?
              </h2>
              <p className="text-indigo-200 text-sm sm:text-lg">
                Tell us a little about your business and get your personalised
                growth plan.
              </p>
              <div className="pt-2 sm:pt-4">
                <button
                  id="cta-btn-create-plan"
                  onClick={() => setActiveView("setup")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-slate-900 bg-white hover:bg-slate-100 active:bg-slate-200 rounded-xl shadow-lg transition-transform hover:scale-102 min-h-[48px]"
                >
                  <span>Create My Growth Plan</span>
                  <ArrowRight className="w-5 h-5 text-indigo-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
