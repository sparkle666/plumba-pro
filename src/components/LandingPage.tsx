import { motion } from 'motion/react';
import { 
  Verified, 
  CheckCircle, 
  TrendingUp, 
  XCircle, 
  ArrowRight, 
  FileLock2, 
  Activity, 
  BookOpen, 
  Database,
  PhoneCall, 
  Laptop
} from 'lucide-react';

interface LandingPageProps {
  onStartFunnel: () => void;
  savedLeadsCount: number;
}

export default function LandingPage({ onStartFunnel, savedLeadsCount }: LandingPageProps) {
  // Animating points in the graph
  const barHeights = [20, 32, 26, 48, 62, 58, 92];

  return (
    <div className="pt-18 bg-[#faf8ff] text-[#131b2e] overflow-x-hidden" id="landing_page_container">
      {/* 1. Hero Section */}
      <section className="relative px-6 py-12 md:py-24 max-w-7xl mx-auto overflow-hidden">
        {/* Abstract Background Blur Nodes */}
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-[#004ac6]/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-[40%] -left-[20%] w-[400px] h-[400px] bg-[#2563eb]/5 rounded-full blur-3xl -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Details */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-[#6cf8bb]/25 border border-[#00714d]/20 text-[#00714d] px-4 py-1.5 rounded-full font-sans font-semibold text-xs tracking-wider uppercase"
            >
              <Verified className="w-4 h-4 text-[#10B981]" />
              <span>Trusted by 100+ Professional Agencies</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#131b2e] leading-[1.08]"
              id="hero_headline"
            >
              Turn Your Plumbing Business Into a <span className="text-[#004ac6] bg-clip-text">24/7 Lead-Generating Machine</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-[#434655] text-lg md:text-xl leading-relaxed max-w-[580px]"
            >
              We design high-converting plumbing websites that bring you more calls, more bookings, and more emergency jobs — even while you sleep.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button 
                onClick={onStartFunnel}
                className="bg-[#10B981] text-white hover:bg-[#006c49] font-sans font-extrabold text-base px-8 py-4.5 rounded-2xl shadow-xl shadow-[#10B981]/20 hover:shadow-[#006c49]/30 transform hover:-translate-y-1 transition-all active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
                id="hero_cta_btn"
              >
                <span>Check If Your Business Qualifies</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Quick Benefits Checklist */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-x-6 gap-y-3 pt-4 border-t border-[#e2e8f0]"
            >
              <div className="flex items-center gap-2 text-sm text-[#434655] font-semibold">
                <CheckCircle className="w-4 h-4 text-[#10B981]" />
                <span>Built for Contractors</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#434655] font-semibold">
                <CheckCircle className="w-4 h-4 text-[#10B981]" />
                <span>High Conversion Design</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#434655] font-semibold">
                <CheckCircle className="w-4 h-4 text-[#10B981]" />
                <span>Lead-Focused Strategy</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="relative z-10 rounded-2xl overflow-hidden border border-[#c3c6d7] bg-[#ffffff] premium-shadow"
            >
              <img 
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoH1ZJ5FUufARIINl-8EmWGUSnolL56Viz4-IeDJNj6kcFlj3EWsyaAeKHbhOFBQ4H70ha1PCa4hUHee4LPsxrXCdFv4GYy9nYSwehMA_3n2OCmOqTvckM1HSNLhNGtGssrJJ9yPUWN8JyZzrXW7jrj3IQz7WmK8NneNyLCVcCKSs9D4h7oNTrIwO5ngYwHiDCiUV-SWIWcqT_DgRDgDczuANGDoFCAU-ChmwIw9LO7ceCaa_qI44bXmyK3fhDaPlA3Jc0snYlxlk" 
                alt="A professional plumber in uniform inspecting residential pipes" 
                className="w-full aspect-video object-cover hover:scale-102 transition-transform duration-700"
              />
            </motion.div>

            {/* Float Stat Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-6 -left-4 md:-left-8 z-20 bg-[#ffffff] px-6 py-4 rounded-2xl border border-[#c3c6d7] shadow-xl flex items-center gap-4 max-w-[250px]"
            >
              <div className="w-12 h-12 bg-[#2563eb] rounded-xl flex items-center justify-center text-white shadow-md shadow-[#2563eb]/20">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="font-sans font-extrabold text-2xl text-[#004ac6] block leading-none">300%</span>
                <span className="font-serif text-[11px] text-[#434655] block mt-1 leading-none font-medium">Avg. Lead Increase</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Brand Partner Bar */}
      <section className="bg-[#f2f3ff] border-y border-[#eaedff] py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center font-mono text-[10px] uppercase tracking-widest text-[#737686] mb-6 font-bold">
            PARTNERING WITH TOP CONTRACTOR NETWORKS & PLATFORMS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-50 hover:opacity-100 transition-opacity duration-300 select-none grayscale.5 hover:grayscale-0">
            <span className="font-sans font-black text-sm tracking-widest text-[#131b2e]">DRAIN MASTERS</span>
            <span className="font-sans font-black text-sm tracking-widest text-[#131b2e]">PRO-FLOW</span>
            <span className="font-sans font-black text-sm tracking-widest text-[#131b2e]">TITAN PLUMBING</span>
            <span className="font-sans font-black text-sm tracking-widest text-[#131b2e]">ELITE WATER</span>
            <span className="font-sans font-black text-sm tracking-widest text-[#131b2e]">BLUE SKY</span>
          </div>
        </div>
      </section>

      {/* 3. Problem Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6" id="process">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-[#131b2e] tracking-tight leading-tight">
              Most Plumbing Websites Are <span className="text-[#ba1a1a] underline decoration-wavy decoration-[#ffdad6] underline-offset-4">Losing You Money</span> Every Day
            </h2>
            <p className="font-sans text-[#434655] text-lg leading-relaxed">
              You are paying for marketing traffic that never converts. Emergency clients are stressed and in a hurry. A pretty website is useless if the phone doesn't ring within 3 seconds.
            </p>

            {/* Problem Points List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-base text-[#131b2e]">Zero Phone Calls</h4>
                  <p className="font-sans text-sm text-[#434655] mt-0.5">Emergency visitors land and immediately bounce because they can't find a prominent call button.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-base text-[#131b2e]">Not Mobile Optimized</h4>
                  <p className="font-sans text-sm text-[#434655] mt-0.5">Stressed callers with a bursting pipe can't load or navigate slow, desktop layouts on their smartphones.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-base text-[#131b2e]">Outdated 2010 Design</h4>
                  <p className="font-sans text-sm text-[#434655] mt-0.5">Clunky, old templates run without modern local trust indicators, instantly destroying contractor credibility.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-base text-[#131b2e]">No City SEO Structure</h4>
                  <p className="font-sans text-sm text-[#434655] mt-0.5">Nearby competitors steal all local high-ticket commercial accounts by mapping neighborhood-specific niches.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={onStartFunnel}
                className="bg-[#131b2e] text-[#faf8ff] hover:bg-[#434655] font-sans font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-black/10 transition-all flex items-center gap-2 group cursor-pointer"
                id="problem_cta_btn"
              >
                <span>Fix My Website Setup</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Lost Emergency Revenue */}
              <div className="p-8 bg-[#f2f3ff]/40 border border-[#eaedff] rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#ffdad6] rounded-xl flex items-center justify-center text-[#93000a]">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-bold text-xl text-[#131b2e]">Lost Emergency Revenue</h3>
                <p className="font-sans text-sm text-[#434655] leading-relaxed">
                  If local clients can't call you in 3 seconds, they immediately click back and hire the next plumber in Google Maps. Hours of premium billing, lost instantly.
                </p>
              </div>

              {/* Wasted Ad Spend Card (With slight visual offset on larger screens) */}
              <div className="p-8 bg-[#f2f3ff]/40 border border-[#eaedff] rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-shadow lg:transform lg:translate-y-8">
                <div className="w-12 h-12 bg-[#ffdad6] rounded-xl flex items-center justify-center text-[#93000a]">
                  <Laptop className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-bold text-xl text-[#131b2e]">Wasted Ad Spend</h3>
                <p className="font-sans text-sm text-[#434655] leading-relaxed">
                  Sending valuable Local Service Ads or PPC traffic to a broken, slow website layout is like throwing hard earned cash directly into a sewage furnace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Results & Metrics Section */}
      <section className="bg-[#131b2e] text-[#faf8ff] py-20 md:py-28" id="results-sec">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-[#faf8ff] tracking-tight leading-none">
              Data-Driven Growth That Actually Moves The Needle
            </h2>
            <p className="font-sans text-[#c3c6d7] text-base md:text-lg">
              Stop guessing. We use cold, hard consumer behavior data to optimize every pixel for immediate calls and booking conversions.
            </p>
          </div>

          {/* Graph and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
            {/* Live Chart Block */}
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between group">
              <div className="flex justify-between items-start gap-4 mb-8">
                <div>
                  <h4 className="font-sans font-bold text-lg md:text-xl text-[#faf8ff]">Live Client Performance</h4>
                  <p className="font-sans text-xs text-[#c3c6d7] mt-0.5">Real-time localized customer response rate over last 30 days</p>
                </div>
                <div className="text-right">
                  <span className="text-[#6ffbbe] font-sans font-black text-2xl md:text-3xl block leading-none">+284%</span>
                  <span className="font-sans text-[10px] text-[#c3c6d7] uppercase tracking-wider block mt-1 leading-none">Conversion Rate</span>
                </div>
              </div>

              {/* Animated Bar Graph Mock */}
              <div className="pt-8 h-48 flex items-end gap-2 md:gap-3 w-full border-b border-white/10 pb-1">
                {barHeights.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end h-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                      className={`w-full rounded-t-lg transition-transform hover:scale-105 cursor-pointer relative ${
                        i === barHeights.length - 1 
                          ? 'bg-gradient-to-t from-[#006c49] to-[#10B981] shadow-lg shadow-[#10B981]/30 border-t border-[#6ffbbe]/25' 
                          : 'bg-gradient-to-t from-[#2563eb]/20 to-[#2563eb]/60 hover:to-[#2563eb]'
                      }`}
                    >
                      {/* Tooltip hint */}
                      <span className="opacity-0 hover:opacity-100 transition-opacity absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#283044] text-[10px] text-white px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-30">
                        {h * 3} Web Calls
                      </span>
                    </motion.div>
                    <span className="text-center font-mono text-[9px] text-[#737686] mt-2 block font-medium">
                      WK {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Summary Panels */}
            <div className="flex flex-col gap-6 justify-between">
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl flex-1 flex flex-col justify-center space-y-2 hover:bg-white/10 transition-colors">
                <span className="text-[#c3c6d7] font-mono text-[10px] uppercase tracking-wider font-bold">Total Contractor Pages Built</span>
                <span className="font-sans font-extrabold text-4xl block text-white">100+</span>
                <span className="text-[#6ffbbe] text-xs font-semibold block pt-1">High-performance custom neighborhood landers</span>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl flex-1 flex flex-col justify-center space-y-2 hover:bg-white/10 transition-colors">
                <span className="text-[#c3c6d7] font-mono text-[10px] uppercase tracking-wider font-bold">Average Regional Scale Growth</span>
                <span className="font-sans font-extrabold text-4xl block text-white">3x</span>
                <span className="text-[#6ffbbe] text-xs font-semibold block pt-1">More monthly booked contractor appointments</span>
              </div>
            </div>
          </div>

          {/* Case Studies grid with hotlinked assets */}
          <div className="space-y-6" id="case-studies">
            <h3 className="font-mono text-center text-xs tracking-widest text-[#6ffbbe] uppercase font-bold mb-8">
              ACTIVE CASE STUDIES — EXTREME PERFORMANCE DIRECTIVES
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Case Study 1 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-[#2563eb]/40 hover:bg-white/10 transition-all flex flex-col">
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgGT4ZZMSblqX7jifipK1_ohimoLzeCgDODYRTYmKq-H3n36vD286DKbpd-UtAVLlIKBUr_scPO8tx8yyz923Q46IbO8qSJEcjD57vv9c60vx4vD2x6xeFG1BMNSnLq1ItB0NyQbTU71QNSm-cCO6I-qzJYeIxPGYCpVl916WecYEXdByg4PDvnR9wBPxiboKwKHPhB932f2lWNy4HYRVBZf_KAprSWFFxUHUPXAV1bHis-INx4V0mmZMTSA8xCp73UWqfrqz04C8" 
                    alt="Case Study 1: Tools & Digital Dashboard tablet" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] to-transparent opacity-60"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[#6ffbbe] font-mono text-[10px] uppercase font-extrabold tracking-wider block">CASE STUDY: CITY PLUMBING</span>
                    <h5 className="font-sans font-bold text-lg text-white group-hover:text-[#6ffbbe] transition-colors leading-tight">From 12 to 84 Weekly Lead Calls</h5>
                  </div>
                  <p className="font-sans text-xs text-[#c3c6d7] mt-3 leading-relaxed">
                    Completely re-anchored home funnel with phone indicators and rapid regional validation tags for emergency sewer repair.
                  </p>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-[#2563eb]/40 hover:bg-white/10 transition-all flex flex-col">
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmM8ceQ8OhsXhG4Q_0TtT3vt1aIeLOLuVjL1B8T-80HmTJySCiue0CC3Miu3o3WseYy0Le5MEnJKaiP2C_Qkedlj0D46tp2Tbgm3UjzW0axRw7QBfW89RtRT6ZDAYiEQcbdEw0TwxGdUeTSUJn3olI5LSSqdPzCQBYudTuuwxGaJ4uDvr1tks_-Txbzd6Bdwn1bNtOidRDvwL2tNqW4WfpgNTELd-lHJ_cKJ_M0Kn_a62P4uHPn0DQ115fcvf2ImIWqqw5YSjksQA" 
                    alt="Case Study 2: Clean compartments inside professional service van" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] to-transparent opacity-60"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[#6ffbbe] font-mono text-[10px] uppercase font-extrabold tracking-wider block">CASE STUDY: ELITE DRAINS</span>
                    <h5 className="font-sans font-bold text-lg text-white group-hover:text-[#6ffbbe] transition-colors leading-tight">Dominating Local Search in 90 Days</h5>
                  </div>
                  <p className="font-sans text-xs text-[#c3c6d7] mt-3 leading-relaxed">
                    Mapped neighborhood-level commercial niches to optimize regional plumbing ad landing zones for peak booking.
                  </p>
                </div>
              </div>

              {/* Case Study 3 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-[#2563eb]/40 hover:bg-white/10 transition-all flex flex-col">
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqXr-2tR-436W9N3vsrO7e9Gwp1cs90t0PRNDKlhrvjbvD7LIEqUZANlWJb5vVCK32Rz0yvYifigsj8Se2PeJeerMMujU-8-_5LbNZ_CVBPoIwyeZhZQLzx-NQ3R0deahrvDFgZe3MD4d3xnS3UDcV-sd0s8NfvF5ZIu2y7xXYAMOOqFN7-8dLq2GETyO2wyIToXEoIVGQx9nvOD1AVR6v3gt3L2-7OzhY_0Z8N7yGBcOJrZjt9ZFGtMzLR-VDlEmQmLBepi4W7TQ" 
                    alt="Case Study 3: Macro shot of water flowing in a chrome high-end designer faucet" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] to-transparent opacity-60"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[#6ffbbe] font-mono text-[10px] uppercase font-extrabold tracking-wider block">CASE STUDY: PROPIPE SOLUTIONS</span>
                    <h5 className="font-sans font-bold text-lg text-white group-hover:text-[#6ffbbe] transition-colors leading-tight">342% Increase in Emergency Jobs</h5>
                  </div>
                  <p className="font-sans text-xs text-[#c3c6d7] mt-3 leading-relaxed">
                    Engineered instant client mobile tap-to-call interfaces for premium response tracking across three urban centers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Stop Losing Leads - Final CTA Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-[#faf8ff] to-[#f2f3ff]" id="case-studies-cta">
        {/* Decorative backdrop mesh */}
        <div className="absolute inset-0 bg-[#004ac6]/5 -z-10 bg-grid-pattern"></div>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-[#131b2e] tracking-tight leading-none">
              Stop Losing Leads to Bad Websites
            </h2>
            <p className="font-sans text-[#434655] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              There are only a few exclusive territory slots available each month. Secure your area before your biggest municipal competitor locks it out.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={onStartFunnel}
              className="bg-[#10B981] text-[#ffffff] hover:bg-[#006c49] font-sans font-extrabold text-lg px-12 py-5 rounded-2xl shadow-xl shadow-[#10B981]/25 hover:shadow-[#006c49]/40 transform hover:-translate-y-1 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              id="final_cta_btn"
            >
              <span>Check Qualification & Book Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#00714d] tracking-wider uppercase mt-2">
              <span className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-pulse"></span>
              <span>Currently accepting applications for Q4 territory allocation</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
