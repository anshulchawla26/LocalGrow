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
      <div className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3.5 py-2.5 flex items-center justify-between shadow-2xs">
        <button
          onClick={() => setActiveView("dashboard")}
          className="flex items-center gap-2.5 text-left focus:outline-none min-h-[40px]"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs shadow-indigo-200">
            <Sprout className="w-4 h-4 text-emerald-200" strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-slate-900 leading-tight truncate">
                {businessInfo.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            </div>
            <span className="text-[11px] text-slate-500 block truncate max-w-[140px] xs:max-w-[190px]">
              {businessInfo.category}
            </span>
          </div>
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onResetBusiness}
            title="Switch or reset registered business"
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 active:bg-slate-100 min-h-[36px]"
          >
            <RefreshCw className="w-3 h-3 text-slate-500" />
            <span className="hidden xs:inline">Switch</span>
          </button>
          <button
            onClick={() => setActiveView("landing")}
            className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 active:bg-slate-100 min-h-[36px]"
          >
            Home
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (Sticky bottom with safe area insets) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 pt-1.5 pb-[max(env(safe-area-inset-bottom,0px),10px)] flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-[11px] font-semibold transition-all min-h-[48px] touch-manipulation ${
                isActive
                  ? "text-indigo-600 bg-indigo-50/80 font-bold"
                  : "text-slate-500 hover:text-slate-800 active:bg-slate-50"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? "text-indigo-600 stroke-[2.4] scale-105" : "text-slate-500"
                  }`}
                />
                {item.badge && (
                  <span
                    className={`absolute -top-1 -right-3 text-[9px] font-bold px-1 rounded leading-tight ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
