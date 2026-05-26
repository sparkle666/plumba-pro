import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OnboardingState, Lead, BookedSession } from './types';
import { submitLeadToNetlify } from './lib/netlifyForms';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import FunnelSteps from './components/FunnelSteps';
import ResultsPage from './components/ResultsPage';
import AdminDashboard from './components/AdminDashboard';
import { Lock, X, AlertOctagon } from 'lucide-react';

const LOCAL_STORAGE_LEADS_KEY = 'plumbgrowth_leads';

const sampleLeads: Lead[] = [
  {
    id: 'lead_1',
    createdTime: new Date(Date.now() - 172800000).toLocaleString(), // 2 days ago
    answers: {
      businessType: 'Residential',
      businessSize: '2-5 employees',
      websiteState: 'Outdated',
      monthlyRevenue: '$5k - $20k',
      leadFlowSatisfaction: 2,
      fullName: 'Marcus Vance',
      businessName: 'Vance Plumbing & Drain',
      email: 'marcus@vanceplumbing.com',
      phone: '(206) 555-8391',
      location: 'Seattle, WA'
    },
    booking: {
      date: '2026-10-15',
      timeSlot: '10:00 AM EST'
    },
    qualified: true,
    score: 89
  },
  {
    id: 'lead_2',
    createdTime: new Date(Date.now() - 86400000).toLocaleString(), // 1 day ago
    answers: {
      businessType: 'Commercial',
      businessSize: '6-15 employees',
      websiteState: 'No leads',
      monthlyRevenue: '$20k - $50k',
      leadFlowSatisfaction: 3,
      fullName: 'Linda Brody',
      businessName: 'Brody Commercial Sewers',
      email: 'lbrody@brodysewers.com',
      phone: '(407) 555-0129',
      location: 'Orlando, FL'
    },
    booking: null,
    qualified: true,
    score: 81
  },
  {
    id: 'lead_3',
    createdTime: new Date(Date.now() - 3600000).toLocaleString(), // 1 hour ago
    answers: {
      businessType: 'Starting out',
      businessSize: 'Solo',
      websiteState: 'No website',
      monthlyRevenue: 'Under $5k',
      leadFlowSatisfaction: 1,
      fullName: 'Keith Geller',
      businessName: 'Geller Emergency Plumbers',
      email: 'keithgplumbing@gmail.com',
      phone: '(512) 555-9201',
      location: 'Austin, TX'
    },
    booking: null,
    qualified: true,
    score: 97
  }
];

export default function App() {
  const [view, setView] = useState<'landing' | 'onboarding' | 'results' | 'dashboard'>('landing');
  const [activeAnswers, setActiveAnswers] = useState<OnboardingState | null>(null);
  const [activeBooking, setActiveBooking] = useState<BookedSession | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordField, setPasswordField] = useState('');
  const [loginError, setLoginError] = useState('');

  // Hydrate Leads from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_LEADS_KEY);
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        // Hydrate with sample leads on initial load
        setLeads(sampleLeads);
        localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(sampleLeads));
      }
    } catch (e) {
      console.error('Error reading localStorage: ', e);
    }
  }, []);

  const saveLeadsToStorage = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    try {
      localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(updatedLeads));
    } catch (e) {
      console.error('Error writing to localStorage: ', e);
    }
  };

  const handleStartOnboarding = () => {
    setView('onboarding');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishOnboarding = (answers: OnboardingState) => {
    setActiveAnswers(answers);
    setActiveBooking(null);

    // Calculate score & save as lead
    let potentialScore = 55;
    potentialScore += (5 - answers.leadFlowSatisfaction) * 8;
    if (answers.monthlyRevenue === 'Under $5k') potentialScore += 10;
    else if (answers.monthlyRevenue === '$5k - $20k') potentialScore += 5;
    if (answers.businessSize === 'Solo') potentialScore += 5;
    const finalScore = Math.min(potentialScore, 98);

    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      createdTime: new Date().toLocaleString(),
      answers,
      booking: null,
      qualified: true,
      score: finalScore
    };

    console.log('Lead created at onboarding completion:', newLead);

    const newLeadsList = [newLead, ...leads];
    saveLeadsToStorage(newLeadsList);

    // Live submit to Netlify Forms
    submitLeadToNetlify(newLead).catch(e => console.error("Auto background Netlify submission failed:", e));

    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookStrategyCall = (booking: BookedSession) => {
    setActiveBooking(booking);

    // Update the booking details in our latest lead
    const updated = leads.map((lead, idx) => {
      // Typically, current lead matches the activeAnswers name
      if (idx === 0 && activeAnswers && lead.answers.fullName === activeAnswers.fullName) {
        const updatedLead = { ...lead, booking };
        // Sync manually booked slot details directly to Netlify Forms
        submitLeadToNetlify(updatedLead).catch(e => console.error("Failed to sync booking update to Netlify Forms:", e));
        return updatedLead;
      }
      return lead;
    });

    saveLeadsToStorage(updated);
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    saveLeadsToStorage(updated);
  };

  const handleClearAllLeads = () => {
    if (confirm('Are you absolutely sure you want to wipe all lead records from diagnostic history?')) {
      saveLeadsToStorage([]);
    }
  };

  const handleAddSampleLeads = () => {
    const regeneratedLeads = [...sampleLeads, ...leads];
    // Remove duplicates based on ID
    const uniqueMap = new Map();
    regeneratedLeads.forEach(l => uniqueMap.set(l.id, l));
    const uniqueLeads = Array.from(uniqueMap.values());
    saveLeadsToStorage(uniqueLeads);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordField === 'admin') {
      setView('dashboard');
      setShowLoginModal(false);
      setPasswordField('');
      setLoginError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setLoginError('Invalid Pass Code. Tip: Enter "admin" for instantaneous access.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8ff] font-sans antialiased text-[#131b2e]">
      
      {/* Platform Header */}
      <Header 
        currentView={view} 
        setView={setView} 
        onCheckClick={handleStartOnboarding} 
      />

      {/* Main Container Views */}
      <main className="flex-grow pt-1.5 pb-6">
        {view === 'landing' && (
          <LandingPage 
            onStartFunnel={handleStartOnboarding} 
            savedLeadsCount={leads.length} 
          />
        )}

        {view === 'onboarding' && (
          <FunnelSteps 
            onSubmit={handleFinishOnboarding} 
            onBackToLanding={() => setView('landing')} 
          />
        )}

        {view === 'results' && activeAnswers && (
          <ResultsPage 
            answers={activeAnswers}
            booking={activeBooking}
            onBookSession={handleBookStrategyCall}
          />
        )}

        {view === 'dashboard' && (
          <AdminDashboard 
            leads={leads}
            onDeleteLead={handleDeleteLead}
            onClearAllLeads={handleClearAllLeads}
            onAddSampleLeads={handleAddSampleLeads}
            onExit={() => setView('landing')}
          />
        )}
      </main>

      {/* Platform Footer */}
      <Footer 
        currentView={view} 
        setView={setView} 
        onAgencyLoginClick={() => setShowLoginModal(true)} 
      />

      {/* Custom Agency Access Dialog Modal (Framer Motion backdrop) */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="login_modal_backdrop">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-[#c3c6d7] rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#004ac6] to-[#2563eb]"></div>
              
              <button 
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginError('');
                }}
                className="absolute top-4 right-4 p-1.5 hover:bg-[#faf8ff] text-[#737686] rounded-lg transition-colors"
                id="close_login_modal"
              >
                <X className="w-4 h-4" />
              </button>

              <form onSubmit={handleLoginSubmit} className="p-6 md:p-8 space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-10 h-10 bg-[#f2f3ff] rounded-full flex items-center justify-center text-[#2563eb] mx-auto">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-[#131b2e]">Agency Partner Login</h3>
                  <p className="font-sans text-xs text-[#737686]">
                    Unlock your contractor Leads management analytics board.
                  </p>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold text-[#434655] uppercase tracking-wider">
                    Secret Pass Code
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter pass code 'admin'"
                    value={passwordField}
                    onChange={(e) => setPasswordField(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#2563eb] focus:ring-3 focus:ring-[#2563eb]/10"
                    id="password_input"
                  />
                  {loginError ? (
                    <p className="text-[#ba1a1a] text-[11px] font-semibold flex items-center gap-1 mt-1">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>{loginError}</span>
                    </p>
                  ) : (
                    <p className="text-[#00714d] text-[10px] font-semibold tracking-wide italic block mt-1">
                      Tip: Enter password 'admin' to unlock immediately!
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#131b2e] hover:bg-[#283044] text-white py-3 rounded-lg font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  id="submit_login_btn"
                >
                  Access Workspace Panel
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
