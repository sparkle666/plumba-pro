import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {   CheckCircle, 
  Sparkles, 
  Calendar, 
  Clock, 
  Video, 
  PhoneCall, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle, 
  FileText, 
  UserCheck, 
  Laptop, 
  Gauge, 
  TrendingUp, 
  Share2, 
  BookmarkCheck,
  Download
} from 'lucide-react';
import { OnboardingState, BookedSession } from '../types';

interface ResultsPageProps {
  answers: OnboardingState;
  onBookSession: (booking: BookedSession) => void;
  booking: BookedSession | null;
}

export default function ResultsPage({ answers, onBookSession, booking }: ResultsPageProps) {
  // Simple rule-based dynamic score calculation
  const getGrowthScore = () => {
    let score = 55;
    // Low satisfaction means high upside potential
    score += (5 - answers.leadFlowSatisfaction) * 8;
    // Smaller revenue means room to scale
    if (answers.monthlyRevenue === 'Under $5k') score += 10;
    else if (answers.monthlyRevenue === '$5k - $20k') score += 5;
    // Business size additions
    if (answers.businessSize === 'Solo') score += 5;
    return Math.min(score, 98);
  };

  const getDynamicOpportunity = () => {
    const revenueFactor = answers.monthlyRevenue === 'Under $5k' ? '$25k+' : '$100k+';
    const typeLabel = answers.businessType === 'Residential' ? 'Emergency water line & sewer callbacks' : 'Commercial key-facility accounts';
    return {
      revenueFactor,
      typeLabel
    };
  };

  const score = getGrowthScore();
  const opportunities = getDynamicOpportunity();

  // Manual booking states
  const [isBookingProcessing, setIsBookingProcessing] = useState(false);

  // Calendar parameters
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(currentDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(7);

  // Available dates (e.g., next 7 days except Sunday)
  const isDaySelectable = (dayNum: number) => {
    const d = new Date(currentYear, currentMonth, dayNum);
    const dayOfWeek = d.getDay();
    // Allow weekdays and Saturdays
    return dayOfWeek !== 0 && d >= new Date(Date.now() - 86400000);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calculate days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const totalDays = getDaysInMonth(currentMonth, currentYear);
  const startOffset = getFirstDayOfMonth(currentMonth, currentYear);

  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
  const offsetArray = Array.from({ length: startOffset }, (_, i) => null);
  const combinedDays = [...offsetArray, ...daysArray];

  // Specific slots for chosen day
  const timeSlots = [
    '08:30 AM EST',
    '10:00 AM EST',
    '11:30 AM EST',
    '01:00 PM EST',
    '02:30 PM EST',
    '04:00 PM EST'
  ];

  const handleDayClick = (day: number) => {
    if (isDaySelectable(day)) {
      setSelectedDay(day);
    }
  };

  const handleBookingConfirm = async (slot: string) => {
    if (selectedDay === null) return;
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    
    setIsBookingProcessing(true);
    // Mimic quick responsive submission state to make experience smooth
    setTimeout(() => {
      onBookSession({
        date: formattedDate,
        timeSlot: slot,
      });
      setIsBookingProcessing(false);
    }, 600);
  };

  const changeMonth = (dir: 'prev' | 'next') => {
    if (dir === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(prev => prev - 1);
      } else {
        setCurrentMonth(prev => prev - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(prev => prev + 1);
      } else {
        setCurrentMonth(prev => prev + 1);
      }
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#faf8ff] px-6 max-w-7xl mx-auto space-y-12" id="results_portal_wrapper">
      
      {/* 1. Congratulatory Header Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-[#d1fae5] border border-[#10b981]/10 text-[#065f46] px-4 py-1.5 rounded-full font-sans font-bold text-xs tracking-wider uppercase">
          <Sparkles className="w-4 h-4 text-[#10B981]" />
          <span>Evaluation Complete — Strong Territory Fit Match</span>
        </div>
        <h1 className="font-sans font-extrabold text-3xl md:text-5xl text-[#131b2e] tracking-tight leading-tighter">
          Your Plumbing Website Growth Plan Is Ready
        </h1>
        <p className="font-sans text-[#434655] text-base md:text-lg leading-relaxed">
          Based on your insights, <strong className="text-[#004ac6]">{answers.businessName}</strong> has strong potential to generate <strong>2-5x more calls</strong> with a professional layout optimized for plumbing contractors.
        </p>
      </section>

      {/* 2. Visual Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Grid Point: Mockup Screen representation (Col-Span 7) */}
        <div className="lg:col-span-7 bg-[#ffffff] border border-[#c3c6d7] rounded-2xl overflow-hidden shadow-md flex flex-col justify-between" id="homepage_mock_card">
          {/* Mock Browser Frame Navigation Bar */}
          <div className="bg-[#f2f3ff] px-4 py-3 border-b border-[#c3c6d7] flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 bg-[#ff5f56] rounded-full inline-block"></span>
              <span className="w-3 h-3 bg-[#ffbd2e] rounded-full inline-block"></span>
              <span className="w-3 h-3 bg-[#27c93f] rounded-full inline-block"></span>
            </div>
            <div className="flex-1 bg-white border border-[#c3c6d7]/50 rounded-lg px-2 py-0.5 max-w-md mx-auto flex items-center justify-between text-[11px] text-[#737686] font-mono shadow-inner select-none">
              <span>https://plumbgrowthpro.com/preview/{answers.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}</span>
              <Laptop className="w-3 h-3 opacity-60" />
            </div>
          </div>

          {/* Actual Hotlinked Visual Mockup inside desktop mockup view */}
          <div className="p-4 bg-gradient-to-b from-white to-[#f2f3ff] border-b border-[#c3c6d7]/50">
            <span className="font-sans font-bold text-xs text-[#004ac6] uppercase tracking-wider block mb-2">
              EXCLUSIVE PRE-ASSEMBLED HOMEPAGE MOCKUP TEMPLATE FOR PLUMBING CONTRACTORS
            </span>
            <div className="rounded-xl overflow-hidden border border-[#c3c6d7]/50 shadow-sm relative group bg-white">
              <img 
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGsyL8UYrR4km-5PJjne8F4ywywRIakDZYrBv1LuBEbl6A2PBLrKQHgXVfpYNYk2Q9zoZfKTAoBRymkZF34iiDrFG7UdVnN44fuBG1JkkUNbNiuC96jhlG1i1tS377PkfnGYn6SqGAt0AGch5p1VlHGsxXKBYQI5sqkyptPlTMElGUesAIWOGtRY8WuOj4DqqBcIrxdkqSq03g2QLqSf5gNw5RwqDrrXvsnzuQ466PYQrH0tKfG7Jp2vXt6Z3iSPU36v8Ks16ds6I" 
                alt="Full responsive layout mockup showing professional plumbing conversion blocks" 
                className="w-full h-auto object-cover max-h-[420px] filter hover:brightness-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all pointer-events-none"></div>
            </div>
            <div className="flex justify-between items-center mt-3 text-xs text-[#434655]">
              <span className="font-sans flex items-center gap-1.5 font-semibold">
                <Laptop className="w-3.5 h-3.5 text-[#10B981]" />
                Touch Screen & Click-To-Call Active
              </span>
              <button 
                onClick={() => {
                  alert('Generating mock asset packages... Download link has been secured for your Strategy brief.');
                }}
                className="font-sans font-bold text-[#004ac6] hover:underline flex items-center gap-1"
                id="mock_download_btn"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Layout PDF</span>
              </button>
            </div>
          </div>

          {/* Value Pitch footer */}
          <div className="p-6 bg-[#faf8ff] space-y-4">
            <h4 className="font-sans font-extrabold text-[#131b2e] text-base">Key Conversion Factors Engineered in Your Preview:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <p className="text-[#434655]"><strong>Sticky Header Phone Trigger</strong> — Stressed callers can call your dispatch center instantly on any phone size screen.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <p className="text-[#434655]"><strong>Neighborhood Trust Badge Setup</strong> — Localizes trust dynamically to ensure maximum conversion inside your municipal area.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Grid Point: Performance Insights Cards (Col-Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between items-stretch">
          
          {/* Conversion Potential Card */}
          <div className="p-8 bg-[#131b2e] text-white rounded-2xl border border-white/10 flex flex-col justify-between h-1/2">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-[#6ffbbe] tracking-widest block">PLUMB GROWTH PERFORMANCE MATCH</span>
                <h3 className="font-sans font-extrabold text-xl md:text-2xl tracking-tight text-white">Estimated Growth Potential Score</h3>
              </div>
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#6ffbbe]">
                <TrendingUp className="w-7 h-7" />
              </div>
            </div>

            {/* Huge numeric score with ring progress */}
            <div className="my-6 flex items-center gap-6">
              <div className="font-sans font-black text-6xl md:text-7xl text-[#6ffbbe] tracking-tight">
                {score}%
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 bg-[#10b981]/20 text-[#6ffbbe] px-2 py-0.5 rounded text-[11px] font-bold uppercase">
                  Excellent Margin
                </div>
                <p className="font-sans text-xs text-[#c3c6d7] leading-relaxed">
                  Your website state rating ({answers.websiteState || 'Unchecked'}) indicates severe customer leak points. Upgrading boosts inbound emergencies.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider">Estimated Monthly Opportunity Volume:</h4>
              <p className="font-sans text-xs text-[#c3c6d7]">
                Opportunity value estimated up to <strong className="text-white">{opportunities.revenueFactor}/month</strong> with optimized {opportunities.typeLabel}.
              </p>
            </div>
          </div>

          {/* Speed & Competitor Insight Technical Audit */}
          <div className="p-8 bg-white border border-[#c3c6d7] rounded-2xl flex flex-col justify-between h-1/2">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#004ac6] block font-bold">
                TECHNICAL DIAGNOSTIC SUMMARY
              </span>
              <h3 className="font-sans font-bold text-xl text-[#131b2e] leading-tight">
                Estimated Performance Metric Gaps
              </h3>
            </div>

            <div className="space-y-4 my-5 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-[#f2f3ff] border border-[#eaedff] rounded-xl">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4.5 h-4.5 text-[#ba1a1a]" />
                  <span className="font-sans font-bold text-[#131b2e]">Estimated Speed Score</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#ba1a1a] bg-[#ffdad6] px-2 py-0.5 rounded">
                  42 / 100 (Unoptimized)
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#f2f3ff] border border-[#eaedff] rounded-xl">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4.5 h-4.5 text-[#004ac6]" />
                  <span className="font-sans font-bold text-[#131b2e]">Territory Competitor Danger</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#004ac6] bg-[#6cf8bb]/30 px-2 py-0.5 rounded text-[#00714d]">
                  High Density Search
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#c3c6d7] flex items-center gap-3">
              {/* Overlapping small avatar profiles */}
              <div className="flex -space-x-2 overflow-hidden">
                <span className="inline-block w-7.5 h-7.5 rounded-full ring-2 ring-white bg-[#e2e8f0] flex items-center justify-center font-bold text-[9px] text-[#131b2e]">AD</span>
                <span className="inline-block w-7.5 h-7.5 rounded-full ring-2 ring-white bg-[#e2e8f0] flex items-center justify-center font-bold text-[9px] text-[#2563eb]">JS</span>
                <span className="inline-block w-7.5 h-7.5 rounded-full ring-2 ring-white bg-[#e2e8f0] flex items-center justify-center font-bold text-[9px] text-[#00714d]">TL</span>
              </div>
              <p className="font-sans text-[11px] text-[#434655]">
                Evaluated by PlumbGrowth strategists. Join 400+ plumbing owners who optimized their funnel.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Limited Slots Alert and Booking Calendar Widget */}
      <section className="bg-[#ffffff] border border-[#c3c6d7] rounded-2xl overflow-hidden premium-shadow" id="booking_calendar_section">
        <div className="bg-[#eaedff] px-6 py-4 border-b border-[#c3c6d7] flex items-center gap-2 text-sm text-[#004ac6] font-semibold">
          <AlertCircle className="w-5 h-5 text-[#2563eb] shrink-0" />
          <span>Active Session Booking Alert: There are only 2 slots remaining for Q4 territorial lockouts. Match date selector below:</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          
          {/* Calendar Left Info sidebar (Col-span 4) */}
          <div className="lg:col-span-4 p-8 bg-[#faf8ff] border-r border-[#c3c6d7] space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-wider uppercase bg-[#eaedff] text-[#2563eb] px-2.5 py-1 rounded font-bold block w-fit">
                STRATEGY BRIEFING
              </span>
              <h3 className="font-sans font-extrabold text-[#131b2e] text-2xl tracking-tight leading-snug">
                Plumbing Growth Strategy Call
              </h3>
            </div>

            <div className="space-y-3.5 text-xs text-[#434655]">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4.5 h-4.5 text-[#004ac6] shrink-0" />
                <span>30 Minutes Assessment Session</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Video className="w-4.5 h-4.5 text-[#004ac6] shrink-0" />
                <span>Video Call (Teams/Google Meet Link Provided On Submit)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4.5 h-4.5 text-[#004ac6] shrink-0" />
                <span>Complete review of {answers.businessName} customized mockup</span>
              </div>
            </div>

            <p className="font-sans text-[11px] text-[#737686] leading-relaxed italic border-t border-[#c3c6d7]/50 pt-4">
              "We lay out the exact blueprint to optimize your physical trucks dispatch flow with automatic local emergency response pages. Completely free, non-binding."
            </p>
          </div>

          {/* Calendar Calendar & Slots Center/Right (Col-span 8) */}
          <div className="lg:col-span-8 p-6 md:p-8">
            <AnimatePresence mode="wait">
              {booking ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center space-y-4 max-w-md mx-auto"
                  id="booking_confirmation_widget"
                >
                  <div className="w-16 h-16 bg-[#d1fae5] text-[#10B981] rounded-full flex items-center justify-center mx-auto text-3xl">
                    <BookmarkCheck className="w-10 h-10" />
                  </div>
                  <h3 className="font-sans font-extrabold text-2xl text-[#131b2e]">Booking Requested!</h3>
                  <div className="p-4 bg-[#f2f3ff] border border-[#eaedff] rounded-xl space-y-2 text-sm text-left">
                    <p className="font-sans text-[#434655]">
                       Date: <strong className="text-[#131b2e]">{booking.date}</strong>
                    </p>
                    <p className="font-sans text-[#434655]">
                      Time Slot: <strong className="text-[#131b2e]">{booking.timeSlot}</strong>
                    </p>
                    <p className="font-sans text-[#434655]">
                      Company: <strong className="text-[#131b2e]">{answers.businessName}</strong>
                    </p>
                  </div>
                  <p className="font-sans text-xs text-[#737686]">
                    ✓ **Manual Request Logged**: We've saved your preferred slot. A growth representative will confirm the consultation date and provide a direct video meeting space link manually at **{answers.email}** shortly.
                  </p>
                  <button 
                    onClick={() => {
                      alert('A high-performance strategy blueprint PDF is being synthesized and sent directly to your inbox!');
                    }}
                    className="w-full bg-[#131b2e] hover:bg-[#283044] text-white py-3 rounded-lg font-sans font-bold text-xs uppercase tracking-wider mt-2"
                  >
                    Check Email Diagnostic Guide
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Monthly calendar matrix */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-[#f2f3ff] px-3.5 py-2 rounded-xl border border-[#eaedff]">
                      <span className="font-sans font-bold text-sm text-[#131b2e]">
                        {monthNames[currentMonth]} {currentYear}
                      </span>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => changeMonth('prev')}
                          className="p-1 hover:bg-white rounded transition-colors"
                          id="cal_prev_btn"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => changeMonth('next')}
                          className="p-1 hover:bg-white rounded transition-colors"
                          id="cal_next_btn"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                        <span key={idx} className="font-semibold text-[#737686] py-1">
                          {day}
                        </span>
                      ))}

                      {combinedDays.map((val, idx) => {
                        if (val === null) {
                          return <div key={idx} className="p-2" />;
                        }
                        const isSelectable = isDaySelectable(val);
                        const isSelected = selectedDay === val;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleDayClick(val)}
                            disabled={!isSelectable}
                            className={`p-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center relative ${
                              isSelected 
                                ? 'bg-[#004ac6] text-white shadow shadow-[#004ac6]/20' 
                                : isSelectable 
                                ? 'hover:bg-[#eaedff] text-[#131b2e] cursor-pointer' 
                                : 'text-[#c3c6d7] cursor-not-allowed opacity-40'
                            }`}
                          >
                            <span>{val}</span>
                            {/* Unobtrusive pulsing marker for today's visual highlight */}
                            {val === currentDate.getDate() && currentMonth === currentDate.getMonth() && !isSelected && (
                              <span className="absolute bottom-1 w-1 h-1 bg-[#10B981] rounded-full"></span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Available Time Slot Selection */}
                  <div className="space-y-4">
                    <span className="font-sans font-bold text-sm text-[#131b2e] block">
                      Select Available Time Slot for Day {selectedDay}:
                    </span>

                    {/* Manual Email-Based Booking Notice Banner */}
                    <div className="p-3 bg-gradient-to-r from-[#f2f3ff] to-[#faf8ff] border border-[#eaedff] rounded-xl text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-[#131b2e]">
                        <Calendar className="w-4 h-4 text-[#2563eb]" />
                        <span>Manual Email Coordination</span>
                      </div>
                      <p className="text-[#434655] text-[11px] leading-relaxed">
                        Select your preferred slot. We will manually review your diagnostics and reach out via email to <strong className="text-[#131b2e]">{answers.email}</strong> to finalize and provide the meet room.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {isBookingProcessing ? (
                        <div className="py-8 flex flex-col items-center justify-center gap-3 bg-white border border-[#c3c6d7] rounded-xl">
                          <div className="w-8 h-8 border-3 border-[#2563eb] border-t-transparent rounded-full animate-spin"></div>
                          <span className="font-sans text-xs font-bold text-[#2563eb]">Submitting Slot Request...</span>
                        </div>
                      ) : (
                        timeSlots.map((slot, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleBookingConfirm(slot)}
                            className="p-3 border border-[#c3c6d7] hover:border-[#10B981] bg-white text-[#131b2e] hover:bg-[#faf8ff] rounded-xl text-left font-sans font-semibold text-xs transition-all relative group flex items-center justify-between focus:outline-none"
                          >
                            <span>{slot}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] text-[#10B981] font-bold uppercase">
                              Request Slot
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-[11px] text-[#737686]">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>Slot will be requested and manually followed up via email.</span>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  );
}
