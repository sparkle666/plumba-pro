import { useState } from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface HeaderProps {
  currentView: 'landing' | 'onboarding' | 'results' | 'dashboard';
  setView: (view: 'landing' | 'onboarding' | 'results' | 'dashboard') => void;
  onCheckClick: () => void;
}

export default function Header({ currentView, setView, onCheckClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff] border-b border-[#e2e8f0]/80 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-18 flex justify-between items-center">
        {/* Brand Logo */}
        <button
          onClick={() => setView('landing')}
          className="flex items-center gap-2 text-left group transition-transform focus:outline-none"
          id="logo_btn"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-[#004ac6] to-[#2563eb] rounded-xl flex items-center justify-center shadow-md shadow-[#004ac6]/20 transition-transform group-hover:scale-105">
            <span className="text-white font-black text-xl leading-none">P</span>
          </div>
          <div>
            <span className="font-sans font-bold text-lg tracking-tight text-[#131b2e] block leading-none">
              PlumbGrowth <span className="text-[#004ac6]">Pro</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#434655] block mt-0.5">
              LEAD GENERATION
            </span>
          </div>
        </button>

        {/* Dynamic Context Header */}
        <div className="hidden md:flex items-center gap-8">
          {currentView === 'landing' && (
            <>
              <a
                href="#process"
                className="font-sans font-medium text-sm text-[#434655] hover:text-[#004ac6] transition-colors"
              >
                Process
              </a>
              <a
                href="#results-sec"
                className="font-sans font-medium text-sm text-[#434655] hover:text-[#004ac6] transition-colors"
              >
                Results
              </a>
              <a
                href="#case-studies"
                className="font-sans font-medium text-sm text-[#434655] hover:text-[#004ac6] transition-colors"
              >
                Case Studies
              </a>
            </>
          )}

          {currentView === 'onboarding' && (
            <div className="flex items-center gap-2 bg-[#f2f3ff]/80 border border-[#eaedff] px-4 py-1.5 rounded-full shadow-inner">
              <span className="w-2 h-2 bg-[#004ac6] rounded-full animate-ping"></span>
              <span className="font-mono text-xs font-semibold text-[#004ac6] tracking-wider uppercase">
                Active Qualification Review
              </span>
            </div>
          )}

          {currentView === 'results' && (
            <div className="flex items-center gap-2 bg-[#f2f3ff]/80 border border-[#eaedff] px-4 py-1.5 rounded-full shadow-inner">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span className="font-sans text-xs font-semibold text-[#00714d] tracking-wider uppercase">
                Territory Match Approved (Q4)
              </span>
            </div>
          )}

          {currentView === 'dashboard' && (
            <div className="flex items-center gap-2 bg-[#f2f3ff]/80 border border-[#eaedff] px-4 py-1.5 rounded-full shadow-inner">
              <span className="w-2.5 h-2.5 bg-[#004ac6] rounded-full"></span>
              <span className="font-mono text-xs font-semibold text-[#131b2e] tracking-wider uppercase">
                Manager Workspace Portal
              </span>
            </div>
          )}
        </div>

        {/* CTA Actions */}
        <div className="flex items-center gap-4">
          {currentView === 'dashboard' ? (
            <button
              onClick={() => setView('landing')}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#434655] hover:text-[#131b2e] bg-[#f8fafc] border border-[#c3c6d7] transition-all hover:border-[#737686]"
              id="back_to_landing_btn"
            >
              Back to App
            </button>
          ) : (
            <button
              onClick={onCheckClick}
              className="bg-[#10B981] text-[#ffffff] font-sans font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#006c49] shadow-md hover:shadow-[#10B981]/20 transform active:scale-95 transition-all flex items-center gap-1.5"
              id="check_qualification_btn"
            >
              <span>Check Qualification</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
