import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  Building, 
  Layers, 
  Rocket, 
  User, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  CheckCircle, 
  AlertCircle, 
  X,
  Sparkles,
  RefreshCw,
  Computer,
  AlertOctagon
} from 'lucide-react';
import { OnboardingState, PlumbingBusinessType, BusinessSize, YesNoNotSure, RevenueTier } from '../types';

interface FunnelStepsProps {
  onSubmit: (data: OnboardingState) => void;
  onBackToLanding: () => void;
}

export default function FunnelSteps({ onSubmit, onBackToLanding }: FunnelStepsProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;
  
  // Local form state
  const [formData, setFormData] = useState<OnboardingState>({
    businessType: null,
    businessSize: null,
    websiteState: null,
    monthlyRevenue: null,
    leadFlowSatisfaction: 3,
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    location: ''
  });

  // Animated checklist loading state
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const verifySteps = [
    'Connecting securely with PlumbGrowth Pro servers...',
    'Verifying regional territory availability & Q4 slot limits...',
    'Analyzing city competitor densities & digital marketing voids...',
    'Assembling customizable high-end homepage mockups...',
    'Synthesizing performance score metrics'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVerifying) {
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= verifySteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              setIsVerifying(false);
              onSubmit(formData);
            }, 800);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isVerifying]);

  const handleSelectType = (val: PlumbingBusinessType) => {
    setFormData(prev => ({ ...prev, businessType: val }));
    nextStep();
  };

  const handleSelectSize = (val: BusinessSize) => {
    setFormData(prev => ({ ...prev, businessSize: val }));
    nextStep();
  };

  const handleSelectWebsite = (val: YesNoNotSure) => {
    setFormData(prev => ({ ...prev, websiteState: val }));
    nextStep();
  };

  const handleSelectRevenue = (val: RevenueTier) => {
    setFormData(prev => ({ ...prev, monthlyRevenue: val }));
    nextStep();
  };

  const handleSatisfactionChange = (val: number) => {
    setFormData(prev => ({ ...prev, leadFlowSatisfaction: val }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBackToLanding();
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.businessName || !formData.email || !formData.phone || !formData.location) {
      alert('Please fill out all contact details to unlock your growth strategy.');
      return;
    }
    setIsVerifying(true);
    setLoadingStep(0);
  };

  // Safe percentage helper
  const getProgressPercentage = () => {
    return Math.round(((currentStep - 1) / totalSteps) * 100);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#faf8ff] flex flex-col items-center px-4" id="funnel_container_root">
      {/* Verification / Loading Modal */}
      <AnimatePresence>
        {isVerifying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#131b2e] flex flex-col items-center justify-center p-6 text-white text-center"
            id="verifying_screen"
          >
            <div className="max-w-md w-full space-y-8">
              {/* Spinner wrapper */}
              <div className="relative w-24 h-24 mx-auto">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="w-full h-full border-4 border-[#faf8ff]/10 border-t-[#10B981] rounded-full"
                ></motion.div>
                <div className="absolute inset-0 flex items-center justify-center text-[#10B981]">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="font-sans font-extrabold text-2xl tracking-tight text-white">
                  Generating Your Growth Plan
                </h2>
                <p className="font-sans text-xs text-[#c3c6d7] uppercase tracking-widest font-semibold">
                  Secure audit setup session is constructing...
                </p>
              </div>

              {/* Progress Checklist */}
              <div className="bg-[#283044] border border-[#dae2fd]/10 rounded-2xl p-6 text-left space-y-4 shadow-xl">
                {verifySteps.map((step, idx) => {
                  const isDone = idx < loadingStep;
                  const isActive = idx === loadingStep;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0.3 }}
                      animate={{ 
                        opacity: isDone ? 1 : isActive ? 1 : 0.3,
                        x: isActive ? 4 : 0
                      }}
                      className="flex items-center gap-3 text-sm leading-relaxed"
                    >
                      {isDone ? (
                        <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />
                      ) : isActive ? (
                        <RefreshCw className="w-5 h-5 text-[#2563eb] animate-spin shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-white/20 shrink-0" />
                      )}
                      <span className={isDone ? 'text-white/60 line-through' : isActive ? 'text-[#6ffbbe] font-semibold' : 'text-white/60'}>
                        {step}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <p className="font-sans text-xs text-[#737686]">
                This action is backed by PlumbGrowth verified criteria algorithms.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info Panel inside the Onboarding Funnel */}
      <div className="w-full max-w-2xl text-center mb-8">
        <span className="font-sans text-xs font-semibold text-[#004ac6] tracking-widest uppercase bg-[#f2f3ff] border border-[#eaedff] px-4 py-1 rounded-full">
          PHASE {currentStep}: {
            currentStep === 1 ? 'Strategic Sector Alignment' : 
            currentStep === 2 ? 'Operational Scalability Metric' : 
            currentStep === 3 ? 'Digital Asset Diagnostic' : 
            currentStep === 4 ? 'Fiscal Viability Assessment' : 
            currentStep === 5 ? 'Market Demand Satisfaction' : 
            'Identity Authentication Secure Tunnel'
          }
        </span>
      </div>

      {/* Progress Bar View Widget */}
      <div className="w-full max-w-2xl mb-8 space-y-2 px-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-sans font-extrabold uppercase text-[#737686] tracking-wider">
            Onboarding Progress Tracker
          </span>
          <span className="font-sans font-bold text-[#004ac6] bg-[#f2f3ff] px-2.5 py-0.5 rounded">
            Step {currentStep} of {totalSteps} ({getProgressPercentage()}% Complete)
          </span>
        </div>
        <div className="h-2.5 w-full bg-[#dae2fd] rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="h-full bg-gradient-to-r from-[#004ac6] to-[#10B981] rounded-full"
          ></motion.div>
        </div>
      </div>

      {/* Onboarding Cards Wrapper */}
      <div className="w-full max-w-2xl bg-[#ffffff] rounded-2xl border border-[#c3c6d7] premium-shadow overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#004ac6] to-[#10B981]"></div>
        
        <div className="p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* STEP 1: Sectors */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="font-sans font-extrabold text-2xl md:text-3xl text-[#131b2e] tracking-tight">
                      What type of plumbing business do you run?
                    </h1>
                    <p className="font-sans text-[#434655] text-sm">
                      We tailor our hyper-local SEO and conversion funnels based on your corporate focus and equipment deployment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <button
                      onClick={() => handleSelectType('Residential')}
                      className="group p-6 bg-[#ffffff] border border-[#c3c6d7] rounded-xl hover:border-[#10B981] text-left hover:bg-[#faf8ff] transition-all duration-300 relative focus:outline-none"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-[#f2f3ff] rounded-lg flex items-center justify-center text-[#2563eb] group-hover:bg-[#10B981]/10 group-hover:text-[#10B981] transition-all">
                          <Home className="w-5 h-5" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#737686]/50 group-hover:translate-x-1 transition-transform group-hover:text-[#10B981]" />
                      </div>
                      <h3 className="font-sans font-bold text-lg text-[#131b2e] group-hover:text-[#004ac6]">Residential</h3>
                      <p className="font-sans text-xs text-[#434655] mt-1 leading-relaxed">
                        Service calls, water heaters, toilet replacement, and custom home renovations.
                      </p>
                    </button>

                    <button
                      onClick={() => handleSelectType('Commercial')}
                      className="group p-6 bg-[#ffffff] border border-[#c3c6d7] rounded-xl hover:border-[#10B981] text-left hover:bg-[#faf8ff] transition-all duration-300 relative focus:outline-none"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-[#f2f3ff] rounded-lg flex items-center justify-center text-[#2563eb] group-hover:bg-[#10B981]/10 group-hover:text-[#10B981] transition-all">
                          <Building className="w-5 h-5" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#737686]/50 group-hover:translate-x-1 transition-transform group-hover:text-[#10B981]" />
                      </div>
                      <h3 className="font-sans font-bold text-lg text-[#131b2e] group-hover:text-[#004ac6]">Commercial</h3>
                      <p className="font-sans text-xs text-[#434655] mt-1 leading-relaxed">
                        Retail outlets, industrial drain lines, restaurant accounts, and municipal contracts.
                      </p>
                    </button>

                    <button
                      onClick={() => handleSelectType('Both')}
                      className="group p-6 bg-[#ffffff] border border-[#c3c6d7] rounded-xl hover:border-[#10B981] text-left hover:bg-[#faf8ff] transition-all duration-300 relative focus:outline-none"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-[#f2f3ff] rounded-lg flex items-center justify-center text-[#2563eb] group-hover:bg-[#10B981]/10 group-hover:text-[#10B981] transition-all">
                          <Layers className="w-5 h-5" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#737686]/50 group-hover:translate-x-1 transition-transform group-hover:text-[#10B981]" />
                      </div>
                      <h3 className="font-sans font-bold text-lg text-[#131b2e] group-hover:text-[#004ac6]">Both (Hybrid)</h3>
                      <p className="font-sans text-xs text-[#434655] mt-1 leading-relaxed">
                        Dual business model accommodating resident calls alongside recurring business assets.
                      </p>
                    </button>

                    <button
                      onClick={() => handleSelectType('Starting out')}
                      className="group p-6 bg-[#ffffff] border border-[#c3c6d7] rounded-xl hover:border-[#10B981] text-left hover:bg-[#faf8ff] transition-all duration-300 relative focus:outline-none"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-[#f2f3ff] rounded-lg flex items-center justify-center text-[#2563eb] group-hover:bg-[#10B981]/10 group-hover:text-[#10B981] transition-all">
                          <Rocket className="w-5 h-5" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#737686]/50 group-hover:translate-x-1 transition-transform group-hover:text-[#10B981]" />
                      </div>
                      <h3 className="font-sans font-bold text-lg text-[#131b2e] group-hover:text-[#004ac6]">Starting Out</h3>
                      <p className="font-sans text-xs text-[#434655] mt-1 leading-relaxed">
                        Newly established owners or self-employed operators mapping dynamic territory bounds.
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Size */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="font-sans font-extrabold text-2xl md:text-3xl text-[#131b2e] tracking-tight">
                      How big is your plumbing agency team?
                    </h1>
                    <p className="font-sans text-[#434655] text-sm">
                      We optimize lead distribution depending on your geographic dispatch capability and crew count.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    {[
                      { key: 'Solo' as BusinessSize, title: 'Solo Operator', desc: 'Single plumber owner handling operations independently' },
                      { key: '2-5 employees' as BusinessSize, title: 'Focused Crew (2-5)', desc: 'Small core team covering specific service radii' },
                      { key: '6-15 employees' as BusinessSize, title: 'Established Agency (6-15)', desc: 'Multi-truck presence with structured dispatcher support' },
                      { key: '15+ employees' as BusinessSize, title: 'Enterprise Contractor (15+)', desc: 'Large local franchise scaling diverse utility lines' }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleSelectSize(item.key)}
                        className="flex items-center justify-between p-5 bg-[#ffffff] border border-[#c3c6d7] rounded-xl hover:border-[#10B981] hover:bg-[#faf8ff] transition-all duration-300 group focus:outline-none"
                      >
                        <div>
                          <span className="font-sans font-bold text-[#131b2e] text-base group-hover:text-[#004ac6] block text-left">
                            {item.title}
                          </span>
                          <span className="font-sans text-xs text-[#434655] block text-left mt-0.5">
                            {item.desc}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#737686]/50 group-hover:translate-x-1 transition-transform group-hover:text-[#10B981]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Website State */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="font-sans font-extrabold text-2xl md:text-3xl text-[#131b2e] tracking-tight">
                      Do you have a current digital storefront?
                    </h1>
                    <p className="font-sans text-[#434655] text-sm">
                      Select which descriptor fits your plumbing business's current internet presence.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {[
                      { key: 'Outdated' as YesNoNotSure, title: 'Yes, but outdated', desc: 'Running older 2010 layouts needing a conversion upgrade' },
                      { key: 'No leads' as YesNoNotSure, title: 'Yes, but no leads', desc: 'The site is pretty, but emergency calls are non-existent' },
                      { key: 'No website' as YesNoNotSure, title: 'No website', desc: 'Starting completely fresh on the internet scene' },
                      { key: 'Not sure' as YesNoNotSure, title: 'Not entirely sure', desc: 'Own a site but require an expert performance evaluation' }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleSelectWebsite(item.key)}
                        className="p-5 bg-[#ffffff] border border-[#c3c6d7] rounded-xl text-left hover:border-[#10B981] hover:bg-[#faf8ff] transition-all duration-300 group focus:outline-none flex flex-col justify-between h-40"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#2563eb] group-hover:bg-[#10B981]/10 group-hover:text-[#10B981] transition-all">
                          <Computer className="w-4 h-4" />
                        </div>
                        <div className="mt-4">
                          <h4 className="font-sans font-bold text-base text-[#131b2e] group-hover:text-[#004ac6]">{item.title}</h4>
                          <p className="font-sans text-[11px] text-[#434655] mt-1 leading-normal">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Monthly Revenue */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="font-sans font-extrabold text-2xl md:text-3xl text-[#131b2e] tracking-tight">
                      What is your average monthly revenue range?
                    </h1>
                    <p className="font-sans text-[#434655] text-sm">
                      This parameters enables our diagnostics to estimate local growth margins and competitor ad thresholds.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    {[
                      { key: 'Under $5k' as RevenueTier, text: 'Under $5,000 / month' },
                      { key: '$5k - $20k' as RevenueTier, text: '$5,000 - $20,000 / month' },
                      { key: '$20k - $50k' as RevenueTier, text: '$20,000 - $50,000 / month' },
                      { key: '$50k+' as RevenueTier, text: 'Over $50,000+ / month' }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleSelectRevenue(item.key)}
                        className="flex items-center justify-between p-5 bg-[#ffffff] border border-[#c3c6d7] rounded-xl hover:border-[#10B981] hover:bg-[#faf8ff] transition-all duration-300 group focus:outline-none"
                      >
                        <span className="font-sans font-bold text-lg text-[#131b2e] group-hover:text-[#004ac6] block text-left">
                          {item.text}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#737686]/50 group-hover:translate-x-1 transition-transform group-hover:text-[#10B981]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Lead Satisfaction Slider */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="font-sans font-extrabold text-2xl md:text-3xl text-[#131b2e] tracking-tight">
                      How satisfied are you with current leads?
                    </h1>
                    <p className="font-sans text-[#434655] text-sm">
                      Select which rating describes your current lead flow consistency and phone frequency.
                    </p>
                  </div>

                  <div className="py-8 px-4 bg-[#f2f3ff]/40 border border-[#eaedff] rounded-2xl text-center space-y-8">
                    {/* Value Badge Callout */}
                    <div className="inline-block px-6 py-3 rounded-2xl bg-[#ffffff] border border-[#c3c6d7] shadow-sm">
                      <span className="font-mono text-3xl font-black text-[#004ac6]">
                        {formData.leadFlowSatisfaction} / 5
                      </span>
                      <p className="font-sans font-semibold text-xs text-[#00714d] uppercase mt-1">
                        {
                          formData.leadFlowSatisfaction === 1 ? 'Extremely Slow, Immediate Need' :
                          formData.leadFlowSatisfaction === 2 ? 'Inconsistent, Want regular work' :
                          formData.leadFlowSatisfaction === 3 ? 'Okay, but lots of idle trucks' :
                          formData.leadFlowSatisfaction === 4 ? 'Good stream, searching for edge' :
                          'Fully Booked, seeking enterprise scale'
                        }
                      </p>
                    </div>

                    {/* Numeric slider */}
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={formData.leadFlowSatisfaction}
                        onChange={(e) => handleSatisfactionChange(Number(e.target.value))}
                        className="w-full h-2.5 bg-[#dae2fd] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
                      />
                      <div className="flex justify-between text-xs text-[#737686] font-semibold uppercase px-1">
                        <span>1 (Crisis Mode / Slow)</span>
                        <span>3 (Moderate stream)</span>
                        <span>5 (Fully Booked)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <button
                      onClick={nextStep}
                      className="bg-[#2563eb] text-[#ffffff] hover:bg-[#004ac6] font-sans font-bold text-sm px-10 py-4 rounded-xl shadow-lg transition-all inline-flex items-center gap-2 group cursor-pointer"
                    >
                      <span>Continue to Authentication</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 6: Form Identifiers */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h1 className="font-sans font-extrabold text-2xl md:text-3xl text-[#131b2e] tracking-tight">
                      Confirm Territory & Business Identity
                    </h1>
                    <p className="font-sans text-[#434655] text-xs max-w-md mx-auto">
                      PlumbGrowth Pro matches clients only if regional boundaries exist. Confirm your plumbing credentials below to compile your report.
                    </p>
                  </div>

                  <form onSubmit={handleFinalSubmit} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-bold text-[#434655] uppercase tracking-wider">
                          Full Name
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737686]">
                            <User className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-sm text-[#131b2e] focus:outline-none focus:border-[#2563eb] focus:ring-3 focus:ring-[#2563eb]/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Business Name */}
                      <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-bold text-[#434655] uppercase tracking-wider">
                          Business Name
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737686]">
                            <Briefcase className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            required
                            placeholder="Elite Plumbing Solutions"
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-sm text-[#131b2e] focus:outline-none focus:border-[#2563eb] focus:ring-3 focus:ring-[#2563eb]/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5 text-left">
                      <label className="block text-xs font-bold text-[#434655] uppercase tracking-wider">
                        Professional Email
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737686]">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          required
                          placeholder="john@eliteplumbing.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-sm text-[#131b2e] focus:outline-none focus:border-[#2563eb] focus:ring-3 focus:ring-[#2563eb]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-bold text-[#434655] uppercase tracking-wider">
                          Phone Number
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737686]">
                            <Phone className="w-4 h-4" />
                          </span>
                          <input
                            type="tel"
                            required
                            placeholder="(555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-sm text-[#131b2e] focus:outline-none focus:border-[#2563eb] focus:ring-3 focus:ring-[#2563eb]/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-bold text-[#434655] uppercase tracking-wider">
                          City / State
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737686]">
                            <MapPin className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            required
                            placeholder="Austin, TX"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-sm text-[#131b2e] focus:outline-none focus:border-[#2563eb] focus:ring-3 focus:ring-[#2563eb]/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-[#10B981] text-white hover:bg-[#006c49] font-sans font-extrabold text-[#ffffff] py-4 rounded-xl shadow-xl transition-all block text-center focus:outline-none transform hover:-translate-y-0.5 cursor-pointer"
                        id="form_submit_btn"
                      >
                        See My Website Strategy
                      </button>
                      
                      <div className="flex items-center justify-center gap-1.5 font-sans text-[11px] text-[#737686] mt-3">
                        <Lock className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>Secure submission. We keep all plumbing statistics strictly confidential.</span>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Funnel Sticky Bottom Nav */}
        <div className="bg-[#f2f3ff]/50 border-t border-[#dae2fd]/50 px-8 py-4 flex justify-between items-center">
          <button
            onClick={prevStep}
            className="flex items-center gap-1.5 font-sans font-bold text-xs text-[#434655] hover:text-[#004ac6] transition-colors focus:outline-none select-none"
            id="funnel_back_btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-1 font-mono text-[9px] text-[#737686] font-semibold tracking-wider uppercase">
            <span>Powered by PlumbGrowth Engine v4.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
