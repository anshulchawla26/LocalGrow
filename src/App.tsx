import React, { useState, useEffect } from "react";
import { ActiveView, BusinessInfo, GrowthScoreResult } from "./types";
import { calculateGrowthScore } from "./utils/growthCalculator";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LandingPage } from "./components/LandingPage";
import { BusinessSetup } from "./components/BusinessSetup";
import { Dashboard } from "./components/Dashboard";
import { GrowthTools } from "./components/GrowthTools";
import { BusinessProfile } from "./components/BusinessProfile";
import { Sidebar } from "./components/Sidebar";

const STORAGE_KEY = "localgrow_business_profile_v1";

const DEFAULT_DEMO_BUSINESS: BusinessInfo = {
  name: "Sunrise Café",
  category: "Café / Restaurant",
  location: "Gurugram",
  offerings: "Coffee, snacks and casual meals",
  challenge: "Online visibility",
  hasInstagram: true,
  hasWebsite: false,
  hasGoogleProfile: true,
};

export default function App() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>("landing");
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) {
          setBusinessInfo(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage when businessInfo changes
  const saveBusiness = (info: BusinessInfo) => {
    setBusinessInfo(info);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
    setActiveView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplyDemo = () => {
    saveBusiness(DEFAULT_DEMO_BUSINESS);
  };

  const handleResetBusiness = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Could not clear localStorage:", e);
    }
    setBusinessInfo(null);
    setActiveView("setup");
  };

  // Compute live score
  const scoreResult: GrowthScoreResult | null = businessInfo
    ? calculateGrowthScore(businessInfo)
    : null;

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Views with App Shell (Sidebar layout for dashboard/tools/profile when business exists)
  const isAppShellView =
    businessInfo &&
    (activeView === "dashboard" ||
      activeView === "tools" ||
      activeView === "profile");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {isAppShellView ? (
        <div className="flex-1 flex flex-col md:flex-row min-h-screen">
          {/* Sidebar (Desktop) + Mobile Top/Bottom Nav */}
          <Sidebar
            activeView={activeView}
            setActiveView={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            businessInfo={businessInfo}
            onResetBusiness={handleResetBusiness}
          />

          {/* Main workspace for dashboard, tools, and profile */}
          <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-28 md:pb-12 overflow-x-hidden">
            {activeView === "dashboard" && scoreResult && (
              <Dashboard
                businessInfo={businessInfo}
                scoreResult={scoreResult}
                setActiveView={setActiveView}
              />
            )}

            {activeView === "tools" && (
              <GrowthTools businessInfo={businessInfo} />
            )}

            {activeView === "profile" && scoreResult && (
              <BusinessProfile
                businessInfo={businessInfo}
                scoreResult={scoreResult}
                onUpdateInfo={saveBusiness}
                setActiveView={setActiveView}
              />
            )}
          </main>
        </div>
      ) : (
        /* Standalone Views: Landing Page or Setup */
        <>
          <Navbar
            activeView={activeView}
            setActiveView={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            businessInfo={businessInfo}
          />

          <main className="flex-1">
            {activeView === "landing" && (
              <LandingPage
                setActiveView={setActiveView}
                onTryDemo={handleApplyDemo}
              />
            )}

            {activeView === "setup" && (
              <BusinessSetup
                initialInfo={businessInfo}
                onSave={saveBusiness}
                onCancel={
                  businessInfo ? () => setActiveView("dashboard") : undefined
                }
              />
            )}
          </main>

          <Footer setActiveView={setActiveView} />
        </>
      )}
    </div>
  );
}
