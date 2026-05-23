export interface MetricItem {
  label: string;
  beforeValue: string;
  afterValue: string;
  isPositive: boolean;
}

export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  shortDesc: string;
  image: string;
  alt: string;
  location: string;
  specialty: string;
  averageMonthlyRevenueBefore: string;
  averageMonthlyRevenueAfter: string;
  averageCostPerLeadBefore: string;
  averageCostPerLeadAfter: string;
  conversionRateBefore: string;
  conversionRateAfter: string;
  returnOnAdSpendBefore: string;
  returnOnAdSpendAfter: string;
  profileText: string;
  challenge: string;
  systemsApplied: string[];
  resultsBreakdown: string;
  metricsTable: MetricItem[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "city-plumbing",
    tag: "CASE STUDY: CITY PLUMBING",
    title: "From 12 to 84 Weekly Lead Calls",
    shortDesc: "Re-anchored metropolitan emergency funnel with high-visibility tap-to-call mechanics, localized landing cards, and rapid-response dispatch elements.",
    image: "/src/assets/images/city_plumbing_hero_1779540998303.png",
    alt: "Tools & Digital Dashboard tablet of a Chicago plumbing contractor",
    location: "Chicago Metro Area, IL",
    specialty: "24/7 Emergency Sewer & Drain Routing",
    averageMonthlyRevenueBefore: "$45,000 / mo",
    averageMonthlyRevenueAfter: "$185,000 / mo",
    averageCostPerLeadBefore: "$88.00 per lead",
    averageCostPerLeadAfter: "$24.00 per lead",
    conversionRateBefore: "4.2%",
    conversionRateAfter: "19.8%",
    returnOnAdSpendBefore: "1.8x ROAS",
    returnOnAdSpendAfter: "7.5x ROAS",
    profileText: "City Plumbing serves a high-competition metro region of Chicago. Their old template was bogged down by slow load speeds on smartphones, losing anxious basement-flooded callers in real time.",
    challenge: "During active emergencies (such as burst mains and backing sewers), users make split-second decisions based on immediate responsiveness. Although City Plumbing was bidding $15+ per click on Google search ads, over 95% of visitors bounced immediately. They had no clear mobile tap-to-call bars, lacked neighborhood trust signals, and couldn't compete with larger franchised fleets.",
    systemsApplied: [
      "Mounted high-visibility 'Tap-To-Call Direct' response bars with persistent sticky mobile triggers.",
      "Engineered neighborhood-validated landing cells with dynamic municipal headers.",
      "Injected localized contractor structured schema markup which automated local map positioning.",
      "Integrated real-time dispatcher proximity widgets showing arrival assurances for peace of mind."
    ],
    resultsBreakdown: "Within 30 days of deploying the PlumbGrowth layout, overall landing page bounce rates plummeted from 78% down to 21%. Weekly inbound emergency calls surged from an average of 12 calls to a record-setting 84 calls per week, scaling average revenues from $45k to over $185k per month.",
    metricsTable: [
      { label: "Weekly Prime Inbound Calls", beforeValue: "12 / wk", afterValue: "84 / wk", isPositive: true },
      { label: "Average Cost-Per-Lead (CPL)", beforeValue: "$88.00", afterValue: "$24.00", isPositive: false },
      { label: "Funnel Conversion Efficiency", beforeValue: "4.2%", afterValue: "19.8%", isPositive: true },
      { label: "Pipeline Ad Return (ROAS)", beforeValue: "1.8x", afterValue: "7.5x", isPositive: true }
    ]
  },
  {
    id: "elite-drains",
    tag: "CASE STUDY: ELITE DRAINS",
    title: "Dominating Local Search in 90 Days",
    shortDesc: "Built neighborhood-level service clusters to maximize high-ticket installation loops, tankless water heater upgrades, and repipings.",
    image: "/src/assets/images/elite_drains_hero_1779541017092.png",
    alt: "Clean compartments inside a professional service van for residential upgrades",
    location: "Austin Suburbs, TX",
    specialty: "Premium Water Heater & Tankless Upgrades",
    averageMonthlyRevenueBefore: "$32,000 / mo",
    averageMonthlyRevenueAfter: "$128,500 / mo",
    averageCostPerLeadBefore: "$76.00 per lead",
    averageCostPerLeadAfter: "$19.00 per lead",
    conversionRateBefore: "3.5%",
    conversionRateAfter: "16.4%",
    returnOnAdSpendBefore: "2.1x ROAS",
    returnOnAdSpendAfter: "6.4x ROAS",
    profileText: "Elite Drains is an independent residential team focusing on replacement systems and high-margin water quality equipment. They were dependent on expensive, shared leads before partnering with us.",
    challenge: "Depending on shared lead brokers meant competing with 5 other local plumbers for every single consumer request—slashing margins and leading to countless hours of wasted office callbacks. Their site could not convert higher ticket traffic for systems like tankless heaters because the messaging was generic rather than educational.",
    systemsApplied: [
      "Designed interactive client onboarding self-diagnostic questionnaires to filter serious upgrade buyers.",
      "Wrote structured neighborhood cluster pages mapping search targets across 12 strategic suburbs.",
      "Integrated dynamic upfront average pricing charts which established ultimate consumer confidence.",
      "Published high-contrast local case stories directly on municipal-focused service landers."
    ],
    resultsBreakdown: "By introducing interactive pre-qualifying systems, suburban service clusters began ranking on page 1 of search engines. Customer confidence skyrocketed due to pricing transparency, resulting in a 4.6x jump in non-shared High-Ticket Bookings and fully cutting out third-party reseller dependence.",
    metricsTable: [
      { label: "Monthly High-Ticket Bookings", beforeValue: "9 / mo", afterValue: "44 / mo", isPositive: true },
      { label: "Broker Referral Expense", beforeValue: "$4,200 / mo", afterValue: "$0.00 / mo", isPositive: false },
      { label: "Lead Conversion Ratio", beforeValue: "3.5%", afterValue: "16.4%", isPositive: true },
      { label: "Planned Job Margins", beforeValue: "18.5%", afterValue: "38.0%", isPositive: true }
    ]
  },
  {
    id: "propipe-solutions",
    tag: "CASE STUDY: PROPIPE SOLUTIONS",
    title: "342% Increase in Emergency Jobs",
    shortDesc: "Engineered high-velocity commercial client portals and real-time dispatcher pings optimized for corporate landlords and property managers.",
    image: "/src/assets/images/propipe_solutions_hero_1779541033205.png",
    alt: "Macro shot of high-end designer faucet demonstrating commercial plumbing facilities",
    location: "Phoenix Metro, AZ",
    specialty: "High-Density Commercial & Tenant Upkeep",
    averageMonthlyRevenueBefore: "$95,000 / mo",
    averageMonthlyRevenueAfter: "$410,000 / mo",
    averageCostPerLeadBefore: "$94.00 per lead",
    averageCostPerLeadAfter: "$17.00 per lead",
    conversionRateBefore: "5.1%",
    conversionRateAfter: "24.2%",
    returnOnAdSpendBefore: "2.4x ROAS",
    returnOnAdSpendAfter: "8.8x ROAS",
    profileText: "Propipe Solutions supports large residential complexes and business spaces. They needed an interface that matched their corporate clients' demands for instant accountability and rapid ticketing.",
    challenge: "When a multi-unit property manager experiences a backflow failure or hot water emergency, every minute represents thousands in potential tenant penalties. Propipe of Arizona had plenty of field trucks but their marketing site looked like a basic residential blog—failing to capture high-value corporate retainers.",
    systemsApplied: [
      "Launched the 'Corporate Fast-Track Dispatcher Portal' backed by a 15-minute diagnostic SLA assurance.",
      "Programmed inline mobile proximity estimators mapping vehicle status during peak hours.",
      "Embedded compliance warranty, backflow certifications, and general liability documentation downloads.",
      "Engineered automated text-alert callbacks linking callers directly to high-tier engineers."
    ],
    resultsBreakdown: "Commercial property accounts managed under contract multiplied immediately. Propipe Solutions went from supporting 4 building networks to 38 fully contracted accounts in under 90 days. This stable monthly recurring revenue allowed them to invest in 11 new branded dispatch trucks.",
    metricsTable: [
      { label: "Contracted Property Accounts", beforeValue: "4 accounts", afterValue: "38 accounts", isPositive: true },
      { label: "Dispatch Response Time lag", beforeValue: "45 mins", afterValue: "11 mins", isPositive: false },
      { label: "Service Request Efficiency", beforeValue: "5.1%", afterValue: "24.2%", isPositive: true },
      { label: "Monthly Gross Revenue Metrics", beforeValue: "$95,000", afterValue: "$410,000", isPositive: true }
    ]
  }
];
