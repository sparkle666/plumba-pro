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
          Based on our assessment, <strong className="text-[#004ac6]">{answers.businessName}</strong> has significant potential to increase customer inquiries and generate <strong>2–5x more service calls</strong> with a professionally designed website tailored specifically for plumbing contractors.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-3xl border border-[#10b981]/20 bg-[#ecfdf5] px-5 py-4 text-sm text-[#065f46] shadow-sm">
          <CheckCircle className="w-5 h-5 text-[#10b981]" />
          <div>
            We have saved your submission successfully. We will contact you via email at <strong>{answers.email}</strong> with the next steps.
          </div>
        </div>
      </section>



      {/* 2. Booking Calendar Widget */}
      <section className="bg-[#ffffff] border border-[#c3c6d7] rounded-2xl overflow-hidden premium-shadow" id="booking_calendar_section">
        <div className="bg-gradient-to-r from-[#004ac6] to-[#2563eb] px-6 py-5 border-b border-[#c3c6d7] flex items-center gap-3 text-white font-semibold">
          <CheckCircle className="w-6 h-6 shrink-0" />
          <div>
            <div className="text-base">Ready to Get Started?</div>
            <div className="text-sm font-normal opacity-90">Pick a time below and we'll jump on a call to walk through your growth plan</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          
          {/* Calendar Left Info sidebar (Col-span 4) */}
          <div className="lg:col-span-4 p-8 bg-[#faf8ff] border-r border-[#c3c6d7] space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-wider uppercase bg-[#eaedff] text-[#2563eb] px-2.5 py-1 rounded font-bold block w-fit">
                YOUR CALL DETAILS
              </span>
              <h3 className="font-sans font-extrabold text-[#131b2e] text-2xl tracking-tight leading-snug">
                30-Minute Strategy Call
              </h3>
            </div>

            <div className="space-y-3.5 text-xs text-[#434655]">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4.5 h-4.5 text-[#004ac6] shrink-0" />
                <span>Quick 30-minute assessment</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Video className="w-4.5 h-4.5 text-[#004ac6] shrink-0" />
                <span>Video call link sent via email</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4.5 h-4.5 text-[#10B981] shrink-0" />
                <span>One-on-one with our growth team</span>
              </div>
            </div>

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
                      Choose Your Preferred Time — we'll jump on a quick call for Day {selectedDay}:
                    </span>

                    {/* Manual Email-Based Booking Notice Banner */}
                    <div className="p-3 bg-gradient-to-r from-[#f2f3ff] to-[#faf8ff] border border-[#eaedff] rounded-xl text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-[#131b2e]">
                        <Calendar className="w-4 h-4 text-[#2563eb]" />
                        <span>Confirm Call — We'll Reach Out</span>
                      </div>
                      <p className="text-[#434655] text-[11px] leading-relaxed">
                        Pick a slot and we'll contact you to confirm the time and send a video meeting link to <strong className="text-[#131b2e]">{answers.email}</strong>. We'll jump on a short call to walk through your plan.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {isBookingProcessing ? (
                        <div className="py-10 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#f2f3ff] to-white border-2 border-[#004ac6] rounded-xl">
                          <div className="w-10 h-10 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin"></div>
                          <span className="font-sans text-sm font-bold text-[#2563eb]">Submitting Your Slot Request...</span>
                        </div>
                      ) : (
                        timeSlots.map((slot, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleBookingConfirm(slot)}
                            className="p-4 border-2 border-[#004ac6]/30 hover:border-[#10B981] bg-white hover:bg-[#ecfdf5] text-[#131b2e] rounded-xl text-left font-sans font-bold text-sm transition-all relative group flex items-center justify-between focus:outline-none shadow-sm hover:shadow-md transform hover:scale-105"
                          >
                            <span className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-[#2563eb]" />
                              {slot}
                            </span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs text-[#10B981] font-extrabold uppercase">
                              ➜ Request
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-[11px] text-[#737686]">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>We'll follow up by email to confirm the meeting and send the video link.</span>
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
