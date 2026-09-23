import React, { useState } from "react";
import {
  Sprout,
  ArrowRight,
  LayoutDashboard,
  Sparkles,
  Menu,
  X,
  Compass,
  Wrench,
  RotateCcw,
} from "lucide-react";
import { ActiveView, BusinessInfo } from "../types";

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  businessInfo: BusinessInfo | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  businessInfo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (callback: () => void) => {
    callback();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          id="btn-nav-logo"
          onClick={() => {
            setActiveView(businessInfo ? "dashboard" : "landing");
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-xs shadow-indigo-200 group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5 text-emerald-200" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                LocalGrow
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 hidden xs:inline-block">
                Prototype
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-1 sm:gap-2">
          {activeView === "landing" ? (
            <>
              <button
                id="btn-nav-how-it-works"
                onClick={() => {
                  const el = document.getElementById("how-it-works-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100/70 transition-colors"
              >
                How It Works
              </button>
              <button
                id="btn-nav-tools"
                onClick={() => {
                  if (businessInfo) {
                    setActiveView("tools");
                  } else {
                    const el = document.getElementById("features-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100/70 transition-colors"
              >
                Tools
              </button>
              <button
                id="btn-nav-get-started"
                onClick={() => setActiveView("setup")}
                className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs shadow-indigo-200 transition-all hover:translate-x-0.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="btn-nav-view-landing"
                onClick={() => setActiveView("landing")}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Landing Page
              </button>
              {businessInfo && (
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {businessInfo.name}
                  </span>
                  <button
                    id="btn-nav-go-dashboard"
                    onClick={() => setActiveView("dashboard")}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeView === "dashboard"
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    id="btn-nav-go-tools"
                    onClick={() => setActiveView("tools")}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeView === "tools"
                        ? "bg-indigo-600 text-white shadow-xs shadow-indigo-200"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tools</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Header Actions */}
        <div className="flex sm:hidden items-center gap-2">
          {activeView === "landing" ? (
            <>
              <button
                id="btn-nav-mobile-cta"
                onClick={() => setActiveView("setup")}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                id="btn-nav-mobile-menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 min-w-[40px] min-h-[40px] flex items-center justify-center"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-800" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-800" />
                )}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveView("landing")}
                className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-md border border-slate-200"
              >
                Home
              </button>
              {businessInfo && (
                <button
                  onClick={() => setActiveView("dashboard")}
                  className="px-2.5 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-md shadow-xs"
                >
                  Dashboard
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Slide-down Menu for Landing Page */}
      {mobileMenuOpen && activeView === "landing" && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() =>
                handleNavClick(() => {
                  const el = document.getElementById("how-it-works-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                })
              }
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-left min-h-[44px]"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>How It Works</span>
            </button>
            <button
              onClick={() =>
                handleNavClick(() => {
                  if (businessInfo) {
                    setActiveView("tools");
                  } else {
                    const el = document.getElementById("features-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                })
              }
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-left min-h-[44px]"
            >
              <Wrench className="w-4 h-4 text-indigo-600" />
              <span>Core Features & Tools</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick(() => setActiveView("setup"))}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-xs min-h-[46px]"
            >
              <span>Create Growth Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
