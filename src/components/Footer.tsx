import { Shield, Lock } from 'lucide-react';

interface FooterProps {
  setView: (view: 'landing' | 'onboarding' | 'results' | 'dashboard') => void;
  currentView: 'landing' | 'onboarding' | 'results' | 'dashboard';
  onAgencyLoginClick: () => void;
}

export default function Footer({ setView, currentView, onAgencyLoginClick }: FooterProps) {
  return (
    <footer className="w-full bg-[#131b2e] text-[#faf8ff] border-t border-[#dae2fd]/10" id="app_footer">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-[#dae2fd]/10 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#004ac6] to-[#2563eb] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-base">P</span>
              </div>
              <span className="font-sans font-bold text-lg tracking-tight text-[#ffffff]">
                PlumbGrowth <span className="text-[#6ffbbe]">Pro</span>
              </span>
            </div>
            <p className="font-sans text-xs text-[#c3c6d7] max-w-md leading-relaxed">
              © {new Date().getFullYear()} PlumbGrowth Pro. All rights reserved. Industry-leader scaling solutions. Limited territory allocation locks remaining for exclusive contractor support.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end items-center text-xs">
            <button
              onClick={() => {
                alert(
                  'Privacy Policy:\n\nPlumbGrowth Pro is committed to protecting contractor data. We operate robust 256-bit encryption for all leads, audit entries, and performance score estimations. We never share, sell, or disclose individual agency diagnostics to third parties.'
                );
              }}
              className="text-[#c3c6d7] hover:text-[#faf8ff] hover:underline transition-colors focus:outline-none text-left"
              id="privacy_policy_btn"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                alert(
                  'Terms of Service:\n\nAll leads provided during qualification tests are simulated for operational diagnostic purposes. Real-time advertising setup, custom landing page mockups, and strategic growth plans are rendered based on current municipal territory status. Subject to region availability.'
                );
              }}
              className="text-[#c3c6d7] hover:text-[#faf8ff] hover:underline transition-colors focus:outline-none text-left"
              id="terms_of_service_btn"
            >
              Terms of Service
            </button>
            <button
              onClick={() => {
                const mail = prompt('Please enter your email and query for support:');
                if (mail) {
                  alert(`Thank you! Our support strategist will reply to you shortly.`);
                }
              }}
              className="text-[#c3c6d7] hover:text-[#faf8ff] hover:underline transition-colors focus:outline-none text-left"
              id="contact_support_btn"
            >
              Contact Support
            </button>
            <button
              onClick={onAgencyLoginClick}
              className="flex items-center gap-1 bg-[#283044] hover:bg-[#004ac6] text-[#6ffbbe] px-3.5 py-1.5 rounded-lg border border-[#c3c6d7]/10 hover:border-[#2563eb]/20 transition-all font-mono font-bold tracking-wider uppercase text-[10px]"
              id="agency_login_btn"
            >
              <Lock className="w-3 h-3" />
              <span>Agency Login</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#737686]">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Secure 256-Bit SSL Lead Transmission Tunnel Active</span>
          </div>
          <div>
            <span>Platform Status: <span className="text-[#10B981] font-semibold">● Operational</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
