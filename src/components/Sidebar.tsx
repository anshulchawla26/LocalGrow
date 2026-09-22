import React from "react";
import {
  Sprout,
  LayoutDashboard,
  Sparkles,
  Building2,
  ArrowLeft,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { ActiveView, BusinessInfo } from "../types";

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  businessInfo: BusinessInfo;
  onResetBusiness: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  businessInfo,
  onResetBusiness,
}) => {
  const navItems = [
    {
      id: "dashboard" as ActiveView,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "tools" as ActiveView,
      label: "Growth Tools",
      icon: Sparkles,
      badge: "AI",
    },
    {
      id: "profile" as ActiveView,
      label: "Business Profile",
      icon: Building2,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/90 h-screen sticky top-0 shrink-0 z-30 justify-between p-4">
        <div className="space-y-6">
          {/* Logo */}
          <div className="px-2 pt-2 flex items-center justify-between">
            <button
              id="sidebar-logo"
              onClick={() => setActiveView("dashboard")}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
                <Sprout className="w-5 h-5 text-emerald-200" strokeWidth={2.2} />
              </div>
              <div>
                <span className="font-bold text-lg text-slate-900 tracking-tight block">
                  LocalGrow
                </span>
                <span className="text-[10px] text-slate-600 font-medium">
                  Student Prototype
                </span>
              </div>
            </button>
          </div>

          {/* Current Business Badge */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="text-xs font-bold text-slate-800 truncate">
                {businessInfo.name}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate pl-4">
              {businessInfo.category}
            </p>
          </div>

          {/* Nav links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`sidebar-link-${item.id}`}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-xs shadow-indigo-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-indigo-50 text-indigo-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility buttons */}
        <div className="pt-4 border-t border-slate-100 space-y-1.5">
          <button
            id="sidebar-btn-landing"
            onClick={() => setActiveView("landing")}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </button>

          <button
            id="sidebar-btn-reset-business"
            onClick={onResetBusiness}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Switch Business</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header (Sticky) */}
      <div className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setActiveView("dashboard")}
          className="flex items-center gap-2 text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Sprout className="w-4 h-4 text-emerald-200" />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900">LocalGrow</span>
            <span className="text-[10px] text-slate-500 block truncate max-w-[130px]">
              {businessInfo.name}
            </span>
          </div>
        </button>

        <button
          onClick={() => setActiveView("landing")}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-md border border-slate-200"
        >
          Home
        </button>
      </div>

      {/* Mobile Bottom Navigation Bar (Sticky bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[11px] font-semibold transition-colors ${
                isActive ? "text-indigo-600 font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600 stroke-[2.5]" : ""}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
