import React from "react";
import { Sprout } from "lucide-react";
import { ActiveView } from "../types";

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sprout className="w-4 h-4 text-emerald-200" />
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                LocalGrow
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm">
              Simple digital tools for growing local businesses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <button
              id="footer-link-home"
              onClick={() => {
                setActiveView("landing");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Home
            </button>
            <button
              id="footer-link-how-it-works"
              onClick={() => {
                setActiveView("landing");
                setTimeout(() => {
                  const el = document.getElementById("how-it-works-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }}
              className="text-slate-600 hover:text-indigo-600 transition-colors"
            >
              How It Works
            </button>
            <button
              id="footer-link-tools"
              onClick={() => setActiveView("tools")}
              className="text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Tools
            </button>
            <button
              id="footer-link-get-started"
              onClick={() => {
                setActiveView("setup");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>
            © {new Date().getFullYear()} LocalGrow. Designed for local neighborhood businesses.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            <span>Student Project Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
