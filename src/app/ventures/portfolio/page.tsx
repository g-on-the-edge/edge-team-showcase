'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

// Thesis category colors
const thesisCategories = {
  'Digital Health': { color: '#3B82F6', bgColor: 'bg-blue-500/10', textColor: 'text-blue-400' },
  'Beyond the Hospital': { color: '#A8D4B8', bgColor: 'bg-[#A8D4B8]/10', textColor: 'text-[#A8D4B8]' },
  'Emerging & Specialty': { color: '#F97316', bgColor: 'bg-orange-500/10', textColor: 'text-orange-400' },
  'Venture Fund': { color: '#8B5CF6', bgColor: 'bg-purple-500/10', textColor: 'text-purple-400' },
};

// Logo mapping for all portfolio companies
const companyLogos: Record<string, string | null> = {
  'Genome Medical': '/partner-logos/genome_medical.png',
  'Flywheel': '/partner-logos/Flywheel3.png',
  'Panda Health': null,
  'Recombinetics/Makana': null,
  'IdeaFund II': '/partner-logos/IdeaFund2.png',
  'Digital Diagnostics': '/partner-logos/Digital_Diagnostics_Logo.jpg',
  'WiserCare': '/partner-logos/WiserCare_Logo.png.webp',
  'IdeaWake': '/partner-logos/IdeaWake.png',
  'YourPath': '/partner-logos/YourPath.png.webp',
  'KeyCare': '/partner-logos/KeyCare2.png',
  'Eneration': '/partner-logos/Eneration.png',
  'Homecare Hub': '/partner-logos/homcare_hub.png',
  'MediView': null,
  'Vega Health': '/partner-logos/Vega.png',
};

// Investment data based on the tracker with detailed history
const strategicInvestments = [
  {
    company: 'Genome Medical',
    logo: '/partner-logos/genome_medical.png',
    investment: 544516,
    plannedFollowOns: 0,
    currentValuation: 558143,
    gainLoss: 13627,
    status: 'active',
    category: 'Telehealth / Genetic Counseling',
    thesis: 'Digital Health',
    description: 'Provider of genetic counseling services intended to improve patient access through a scalable telehealth service.',
    investmentHistory: [
      { type: 'Convertible Note', amount: 500000, date: 'Jan 2020' },
      { type: 'Convertible Note', amount: 44516, date: 'Mar 2021' },
    ],
    notes: 'Formerly GeneMatters. Current valuation includes $538,475 realized gain + $19,668 outstanding position.',
  },
  {
    company: 'Flywheel',
    logo: '/partner-logos/Flywheel3.png',
    investment: 2921839,
    plannedFollowOns: 167846,
    currentValuation: 710041,
    gainLoss: -2211798,
    status: 'active',
    category: 'Medical Imaging / AI',
    thesis: 'Digital Health',
    description: 'Developer of cloud-based data management platform designed to accelerate biomedical research and collaboration.',
    investmentHistory: [
      { type: 'Convertible Note', amount: 1000000, date: 'Feb 2020' },
      { type: 'Convertible Note', amount: 1120787, date: 'Feb 2023' },
    ],
    notes: 'Invested through Series E. Valuation marked down from peak of $4.08M.',
  },
  {
    company: 'Panda Health',
    logo: null,
    investment: 5921420,
    plannedFollowOns: 0,
    currentValuation: 2380633,
    gainLoss: -3540787,
    status: 'active',
    category: 'Digital Health Marketplace',
    thesis: 'Digital Health',
    description: 'Operator of an online marketplace designed to source, connect, and manage digital health solutions.',
    investmentHistory: [
      { type: 'Series Seed', amount: 500000, date: 'Apr 2021' },
      { type: 'SAFE', amount: 773207, date: 'Various' },
      { type: 'Seed A, Tranche 1', amount: 600000, date: 'Apr 2024' },
      { type: 'Seed A, Tranche 2A', amount: 240672, date: 'Apr 2025' },
    ],
    notes: 'Multiple follow-on investments. Actively used within health system.',
  },
  {
    company: 'Recombinetics/Makana',
    logo: null,
    investment: 48919658,
    plannedFollowOns: 0,
    currentValuation: 0,
    gainLoss: -48919658,
    status: 'active',
    category: 'Gene Editing / Xenotransplantation',
    thesis: 'Emerging & Specialty',
    description: 'Pioneering gene editing technologies and solving the transplantable organ shortage through genetically modified donor organs.',
    investmentHistory: [
      { type: 'Strategic Investment', amount: 48919658, date: 'Various' },
    ],
    notes: 'Major strategic investment in xenotransplantation technology.',
  },
  {
    company: 'IdeaFund II',
    logo: '/partner-logos/IdeaFund2.png',
    investment: 5000000,
    plannedFollowOns: 0,
    currentValuation: 5000000,
    gainLoss: 0,
    status: 'active',
    category: 'Venture Fund',
    thesis: 'Venture Fund',
    description: 'Local venture capital fund that partners with seed- and early-stage startup businesses across the region. They support people who are solving challenging problems with passion and drive.',
    investmentHistory: [
      { type: 'Fund Commitment', amount: 5000000, date: 'Nov 2020' },
    ],
    notes: '$1,825,000 distributed to date. Edge + Idea Fund collaborate on deal flow.',
  },
];

const fundIInvestments = [
  {
    company: 'Digital Diagnostics',
    logo: '/partner-logos/Digital_Diagnostics_Logo.jpg',
    investment: 999991,
    plannedFollowOns: 1000000,
    currentValuation: 999991,
    gainLoss: 0,
    status: 'active',
    category: 'AI & Diagnostics',
    thesis: 'Emerging & Specialty',
    description: 'Built the first ever autonomous diagnostic platform to receive FDA clearance that does not require direct physician oversight.',
    investmentHistory: [
      { type: 'Series B', amount: 999991, date: 'Aug 2022' },
    ],
    notes: 'FDA-cleared autonomous AI. Bellin region actively using; Gundersen exploring.',
  },
  {
    company: 'WiserCare',
    logo: '/partner-logos/WiserCare_Logo.png.webp',
    investment: 0,
    plannedFollowOns: 0,
    currentValuation: 8405,
    gainLoss: 8405,
    status: 'active',
    category: 'Patient Decision Support',
    thesis: 'Beyond the Hospital',
    description: "WiserCare's patient decision support platform helps patients and care teams make person-centered choices, faster. Combining preferences and goals with clinical data and evidence to support a range of decisions.",
    investmentHistory: [
      { type: 'Equity Grant', amount: 0, date: 'Various' },
    ],
    notes: 'Received shares for aiding in company development. Actively used within health system.',
  },
  {
    company: 'IdeaWake',
    logo: '/partner-logos/IdeaWake.png',
    investment: 250219,
    plannedFollowOns: 250000,
    currentValuation: 324702,
    gainLoss: 74483,
    status: 'active',
    category: 'Innovation Platform',
    thesis: 'Beyond the Hospital',
    description: 'An easy to use, highly configurable idea management platform that makes it easy to capture, evaluate, and take action on ideas from those who know the most about your organization.',
    investmentHistory: [
      { type: 'Series A', amount: 100218, date: 'Aug 2023' },
      { type: 'Series Seed', amount: 150001, date: 'Jun 2024' },
    ],
    notes: 'Used for Edge ideation process and structured idea challenges.',
  },
  {
    company: 'YourPath',
    logo: '/partner-logos/YourPath.png.webp',
    investment: 499999,
    plannedFollowOns: 0,
    currentValuation: 299999,
    gainLoss: -200000,
    status: 'active',
    category: 'Population Health',
    thesis: 'Beyond the Hospital',
    description: 'Turnkey population health solution for substance use disorders (SUD), utilizing a SaaS ecosystem platform to improve access to care for patients with substance use disorders.',
    investmentHistory: [
      { type: 'Series B', amount: 250001, date: 'Nov 2023' },
      { type: 'Convertible Note', amount: 200000, date: 'May 2025' },
    ],
    notes: 'Validating potential use cases for SUD patient populations within Emplify.',
  },
  {
    company: 'KeyCare',
    logo: '/partner-logos/KeyCare2.png',
    investment: 2527490,
    plannedFollowOns: 1500000,
    currentValuation: 3204895,
    gainLoss: 677405,
    status: 'active',
    category: 'Virtual Care',
    thesis: 'Digital Health',
    description: "World's first & only virtual healthcare platform granted Epic licensure, enabling them to address inefficiencies in contemporary healthcare by pairing office-based physicians with a tech-empowered virtual team.",
    investmentHistory: [
      { type: 'Note', amount: 2000000, date: 'Nov 2023' },
      { type: 'Series A-2', amount: 527490, date: 'May 2025' },
    ],
    notes: 'In use via Remission Medical team. Exploring broader Emplify integration.',
  },
  {
    company: 'Eneration',
    logo: '/partner-logos/Eneration.png',
    investment: 625001,
    plannedFollowOns: 0,
    currentValuation: 1582222,
    gainLoss: 957221,
    status: 'active',
    category: 'Energy Management',
    thesis: 'Beyond the Hospital',
    description: 'Eneration aims to help other health systems find immediate energy savings in current buildings, construct radically efficient new facilities and develop long-term strategic energy plans to achieve and manage energy independence—all while advancing patient safety and care.',
    investmentHistory: [
      { type: 'Series A (via Envision)', amount: 500000, date: 'Jun 2024' },
      { type: 'Series B', amount: 125001, date: 'Jul 2025' },
    ],
    notes: 'Investment via Envision. Contracted and actively used within health system.',
  },
  {
    company: 'Homecare Hub',
    logo: '/partner-logos/homcare_hub.png',
    investment: 1000000,
    plannedFollowOns: 1000000,
    currentValuation: 1000000,
    gainLoss: 0,
    status: 'active',
    category: 'Home Health',
    thesis: 'Beyond the Hospital',
    description: 'Homecare Hub is a purpose-driven team with a bold vision to keep people out of large institutional nursing homes by building creative solutions that decrease the cost and improve the quality and experience of receiving home care services.',
    investmentHistory: [
      { type: 'SAFE', amount: 1000000, date: 'Jul 2025' },
    ],
    notes: 'Contract executed. Pending integration.',
  },
  {
    company: 'MediView',
    logo: null,
    investment: 499999,
    plannedFollowOns: 500000,
    currentValuation: 499999,
    gainLoss: 0,
    status: 'active',
    category: 'Surgical Navigation',
    thesis: 'Emerging & Specialty',
    description: 'Develops extended reality surgical navigation technology aimed at enhancing the accuracy, efficacy, and speed of procedures while minimizing the cognitive and ergonomic burden on surgeons.',
    investmentHistory: [
      { type: 'Series Investment', amount: 499999, date: 'Sep 2025' },
    ],
    notes: 'Negotiating product purchase for health system.',
  },
  {
    company: 'Vega Health',
    logo: '/partner-logos/Vega.png',
    investment: 750000,
    plannedFollowOns: 747000,
    currentValuation: 750000,
    gainLoss: 0,
    status: 'active',
    category: 'Healthcare Analytics',
    thesis: 'Digital Health',
    description: 'Healthcare analytics platform leveraging AI and machine learning to optimize clinical operations and improve patient outcomes through data-driven insights.',
    investmentHistory: [
      { type: 'Series Investment', amount: 750000, date: '2024' },
    ],
    notes: 'Integration planning in progress.',
  },
];

// Calculate totals
const strategicTotals = {
  investment: strategicInvestments.reduce((sum, inv) => sum + inv.investment, 0),
  plannedFollowOns: strategicInvestments.reduce((sum, inv) => sum + inv.plannedFollowOns, 0),
  currentValuation: strategicInvestments.reduce((sum, inv) => sum + inv.currentValuation, 0),
  gainLoss: strategicInvestments.reduce((sum, inv) => sum + inv.gainLoss, 0),
};

const fundITotals = {
  investment: fundIInvestments.reduce((sum, inv) => sum + inv.investment, 0),
  plannedFollowOns: fundIInvestments.reduce((sum, inv) => sum + inv.plannedFollowOns, 0),
  currentValuation: fundIInvestments.reduce((sum, inv) => sum + inv.currentValuation, 0),
  gainLoss: fundIInvestments.reduce((sum, inv) => sum + inv.gainLoss, 0),
};

// Format currency
const formatCurrency = (amount: number) => {
  if (amount === 0) return '$0';
  const absAmount = Math.abs(amount);
  if (absAmount >= 1000000) {
    return `${amount < 0 ? '-' : ''}$${(absAmount / 1000000).toFixed(1)}M`;
  }
  if (absAmount >= 1000) {
    return `${amount < 0 ? '-' : ''}$${(absAmount / 1000).toFixed(0)}K`;
  }
  return `${amount < 0 ? '-' : ''}$${absAmount.toLocaleString()}`;
};

const formatFullCurrency = (amount: number) => {
  return `${amount < 0 ? '-' : ''}$${Math.abs(amount).toLocaleString()}`;
};

// Investment row component with thesis badges and expandable history
function InvestmentRow({ investment, index, showDetails }: { investment: typeof strategicInvestments[0], index: number, showDetails: boolean }) {
  const isPositive = investment.gainLoss >= 0;
  const thesis = thesisCategories[investment.thesis as keyof typeof thesisCategories] || thesisCategories['Digital Health'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      {/* Mobile Layout */}
      <div className="md:hidden p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
        <div className="flex items-start gap-3 mb-3">
          {/* Company Logo - smaller on mobile */}
          {investment.logo ? (
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0 p-1">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${investment.logo}`}
                alt={`${investment.company} logo`}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-base">{investment.company}</p>
            <p className="text-xs text-white/40 mt-0.5">{investment.category}</p>
          </div>
          <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${thesis.bgColor} ${thesis.textColor} shrink-0`}>
            {investment.thesis}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-white/40 text-xs mb-1">Invested</p>
            <p className="text-white font-mono">{formatCurrency(investment.investment)}</p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-xs mb-1">Gain/Loss</p>
            <p className={`font-mono font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{formatCurrency(investment.gainLoss)}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-12 gap-4 py-4 px-4 rounded-lg hover:bg-white/5 transition-colors border-b border-white/5">
        <div className="col-span-3">
          <div className="flex items-center gap-3">
            {/* Company Logo */}
            {investment.logo ? (
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0 p-1.5">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${investment.logo}`}
                  alt={`${investment.company} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-white group-hover:text-[#20B2A4] transition-colors truncate">{investment.company}</p>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${thesis.bgColor} ${thesis.textColor} shrink-0`}>
                  {investment.thesis}
                </span>
              </div>
              <p className="text-xs text-white/40 mt-0.5 truncate">{investment.category}</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 text-right flex items-center justify-end">
          <p className="text-white/80 font-mono text-sm">{formatCurrency(investment.investment)}</p>
        </div>
        <div className="col-span-2 text-right flex items-center justify-end">
          <p className="text-white/60 font-mono text-sm">{formatCurrency(investment.plannedFollowOns)}</p>
        </div>
        <div className="col-span-2 text-right flex items-center justify-end">
          <p className="text-white/80 font-mono text-sm">{formatCurrency(investment.currentValuation)}</p>
        </div>
        <div className="col-span-3 text-right flex items-center justify-end">
          <p className={`font-mono text-sm font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{formatCurrency(investment.gainLoss)}
          </p>
        </div>
      </div>

      {/* Expanded Details - responsive margin */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="px-4 pb-4 pt-2"
        >
          <div className="pl-4 border-l-2 border-[#20B2A4]/30 space-y-3 ml-0 md:ml-12">
            {/* Description */}
            <p className="text-sm text-white/60">{investment.description}</p>

            {/* Investment History */}
            {investment.investmentHistory && investment.investmentHistory.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-white/40 uppercase tracking-wider">Investment History</p>
                <div className="grid gap-2">
                  {investment.investmentHistory.map((hist, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/[0.02] rounded-lg px-3 py-2 gap-1 sm:gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xs text-white/50 w-16 sm:w-20">{hist.date}</span>
                        <span className="text-sm text-white/70">{hist.type}</span>
                      </div>
                      <span className="text-sm font-mono text-white/80 pl-[72px] sm:pl-0">
                        {hist.amount > 0 ? formatCurrency(hist.amount) : 'Equity'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {investment.notes && (
              <p className="text-xs text-white/40 italic">{investment.notes}</p>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Totals row component
function TotalsRow({ totals, label }: { totals: typeof strategicTotals, label: string }) {
  const isPositive = totals.gainLoss >= 0;

  return (
    <>
      {/* Mobile Totals */}
      <div className="md:hidden p-4 bg-white/5 border-t border-white/10">
        <p className="font-bold text-white mb-3">{label}</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-white/40 text-xs mb-1">Total Invested</p>
            <p className="text-white font-mono font-bold">{formatCurrency(totals.investment)}</p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-xs mb-1">Total Gain/Loss</p>
            <p className={`font-mono font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{formatCurrency(totals.gainLoss)}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Totals */}
      <div className="hidden md:grid grid-cols-12 gap-4 py-4 px-4 bg-white/5 rounded-lg mt-2">
        <div className="col-span-3">
          <p className="font-bold text-white">{label}</p>
        </div>
        <div className="col-span-2 text-right">
          <p className="text-white font-mono text-sm font-bold">{formatCurrency(totals.investment)}</p>
        </div>
        <div className="col-span-2 text-right">
          <p className="text-white/70 font-mono text-sm font-semibold">{formatCurrency(totals.plannedFollowOns)}</p>
        </div>
        <div className="col-span-2 text-right">
          <p className="text-white font-mono text-sm font-bold">{formatCurrency(totals.currentValuation)}</p>
        </div>
        <div className="col-span-3 text-right">
          <p className={`font-mono text-sm font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{formatCurrency(totals.gainLoss)}
          </p>
        </div>
      </div>
    </>
  );
}

// Fund view type
type FundView = 'fund-i' | 'strategic';

export default function VenturesReportPage() {
  const [showDetails, setShowDetails] = useState(false);
  const [activeView, setActiveView] = useState<FundView>('fund-i');

  // Get the current view's data
  const currentInvestments = activeView === 'fund-i' ? fundIInvestments : strategicInvestments;
  const currentTotals = activeView === 'fund-i' ? fundITotals : strategicTotals;
  const currentCompanyCount = currentInvestments.length;

  return (
    <div className="min-h-screen bg-[#0F1D2F] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F1D2F]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logos/Gundersen_Edge_RGB_wht_VENTURES_lockup.png`}
                alt="Edge Ventures"
                className="h-8 md:h-10 w-auto"
              />
              <p className="text-white/50 text-xs hidden sm:block">LP Portal</p>
            </div>

            {/* Center: Navigation */}
            <nav className="flex items-center gap-1 md:gap-2">
              <Link
                href="/ventures"
                className="px-3 md:px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors text-xs md:text-sm font-medium"
              >
                Overview
              </Link>
              <Link
                href="/ventures/portfolio"
                className="px-3 md:px-4 py-2 rounded-lg bg-white/10 text-white text-xs md:text-sm font-medium"
              >
                Portfolio
              </Link>
              <Link
                href="/ventures/team"
                className="px-3 md:px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors text-xs md:text-sm font-medium"
              >
                Team
              </Link>
            </nav>

            {/* Right: Back link */}
            <Link
              href="/#ventures"
              className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-xs md:text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden md:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#20B2A4]/20 to-[#A8D4B8]/20 border border-[#20B2A4]/30 flex items-center justify-center"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10 text-[#20B2A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#20B2A4] to-[#A8D4B8]">
                Investment Portfolio
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-2"
            >
              Strategic investments in healthcare innovation, from gene editing and AI diagnostics to virtual care platforms.
            </motion.p>

            {/* Fund Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 md:mt-8 flex items-center justify-center"
            >
              <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveView('fund-i')}
                  className={`px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-medium text-sm transition-all ${
                    activeView === 'fund-i'
                      ? 'bg-[#20B2A4] text-white shadow-lg shadow-[#20B2A4]/20'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5 md:gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Fund I
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('strategic')}
                  className={`px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-medium text-sm transition-all ${
                    activeView === 'strategic'
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5 md:gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Strategic
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Fund Header Banner */}
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`mb-6 md:mb-8 p-4 md:p-6 rounded-xl md:rounded-2xl border ${
              activeView === 'fund-i'
                ? 'bg-gradient-to-r from-[#20B2A4]/10 to-transparent border-[#20B2A4]/30'
                : 'bg-gradient-to-r from-white/5 to-transparent border-white/10'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
              <div className="flex items-start md:items-center gap-3 md:gap-4">
                {activeView === 'fund-i' && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logos/Gundersen_Edge_RGB_wht_lockup_VENTURES_icon.png`}
                    alt="Edge Ventures"
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className={`text-xl md:text-3xl font-bold ${activeView === 'fund-i' ? 'text-[#20B2A4]' : 'text-white/80'}`}>
                      {activeView === 'fund-i' ? 'Fund I' : 'Gundersen Strategic Investments'}
                    </h2>
                    {activeView === 'fund-i' && (
                      <span className="inline-flex md:hidden items-center gap-1.5 px-2 py-1 rounded-full bg-[#20B2A4]/20 text-[#20B2A4] text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#20B2A4] animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 text-sm md:text-base mt-1">
                    {activeView === 'fund-i'
                      ? 'Active fund investing in healthcare innovation per our 2025 criteria'
                      : 'Pre-fund strategic investments in healthcare technology'}
                  </p>
                </div>
              </div>
              {activeView === 'fund-i' && (
                <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#20B2A4]/20 text-[#20B2A4] text-sm font-medium shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#20B2A4] animate-pulse" />
                  Active Fund
                </span>
              )}
            </div>
          </motion.div>

          {/* Summary Cards - Dynamic based on active view */}
          <motion.div
            key={`summary-${activeView}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12"
          >
            <div className={`p-4 md:p-6 rounded-xl md:rounded-2xl border ${activeView === 'fund-i' ? 'bg-[#20B2A4]/5 border-[#20B2A4]/20' : 'bg-white/5 border-white/10'}`}>
              <p className="text-white/50 text-xs md:text-sm mb-1 md:mb-2">Total Invested</p>
              <p className={`text-xl md:text-3xl font-bold ${activeView === 'fund-i' ? 'text-[#20B2A4]' : 'text-white'}`}>
                {formatCurrency(currentTotals.investment)}
              </p>
            </div>
            <div className={`p-4 md:p-6 rounded-xl md:rounded-2xl border ${activeView === 'fund-i' ? 'bg-[#20B2A4]/5 border-[#20B2A4]/20' : 'bg-white/5 border-white/10'}`}>
              <p className="text-white/50 text-xs md:text-sm mb-1 md:mb-2">Current Valuation</p>
              <p className="text-xl md:text-3xl font-bold text-white">{formatCurrency(currentTotals.currentValuation)}</p>
            </div>
            <div className={`p-4 md:p-6 rounded-xl md:rounded-2xl border ${activeView === 'fund-i' ? 'bg-[#20B2A4]/5 border-[#20B2A4]/20' : 'bg-white/5 border-white/10'}`}>
              <p className="text-white/50 text-xs md:text-sm mb-1 md:mb-2">Portfolio Companies</p>
              <p className="text-xl md:text-3xl font-bold text-white">{currentCompanyCount}</p>
            </div>
            <div className={`p-4 md:p-6 rounded-xl md:rounded-2xl border ${activeView === 'fund-i' ? 'bg-[#20B2A4]/5 border-[#20B2A4]/20' : 'bg-white/5 border-white/10'}`}>
              <p className="text-white/50 text-xs md:text-sm mb-1 md:mb-2">Unrealized Gain/Loss</p>
              <p className={`text-xl md:text-3xl font-bold ${currentTotals.gainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {currentTotals.gainLoss >= 0 ? '+' : ''}{formatCurrency(currentTotals.gainLoss)}
              </p>
            </div>
          </motion.div>

          {/* Pipeline & Activity Section - Only on Fund I view */}
          {activeView === 'fund-i' && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-[#5BB5E0] to-[#5BB5E0]/30 rounded-full" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Pipeline & Activity</h2>
                  <p className="text-white/50 text-sm">Deal flow through December 2025</p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-4 md:p-8">
                {/* Main Pipeline Bar */}
                <div className="mb-6 md:mb-8">
                  <div className="bg-[#5BB5E0] rounded-xl p-4 md:p-6 text-center">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-1 md:gap-4">
                      <span className="text-4xl md:text-6xl font-bold text-white">496</span>
                      <span className="text-base md:text-2xl text-white/90">Deals Reviewed for Investment</span>
                    </div>
                  </div>
                </div>

                {/* Pipeline Flow */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                  {/* Under Review */}
                  <div className="text-center p-3 md:p-4 rounded-xl border border-dashed border-white/20">
                    <p className="text-3xl md:text-5xl font-bold text-white mb-1 md:mb-2">26</p>
                    <p className="text-white/50 text-xs md:text-sm">Under Review</p>
                  </div>

                  {/* Active Due Diligence */}
                  <div className="text-center p-3 md:p-4 rounded-xl border border-dashed border-white/20">
                    <p className="text-3xl md:text-5xl font-bold text-white mb-1 md:mb-2">1</p>
                    <p className="text-white/50 text-xs md:text-sm leading-tight">Active Due Diligence</p>
                  </div>

                  {/* Deals Passed */}
                  <div className="text-center p-3 md:p-4 rounded-xl bg-white/5">
                    <p className="text-3xl md:text-5xl font-bold text-white/60 mb-1 md:mb-2">484</p>
                    <p className="text-white/40 text-xs md:text-sm">Deals Passed</p>
                  </div>

                  {/* Portfolio Companies */}
                  <div className="text-center p-3 md:p-4 rounded-xl border-2 border-[#20B2A4]/40 bg-[#20B2A4]/10">
                    <p className="text-3xl md:text-5xl font-bold text-[#20B2A4] mb-1 md:mb-2">12</p>
                    <p className="text-white/50 text-xs md:text-sm leading-tight">Portfolio Companies</p>
                  </div>
                </div>

                {/* Partial Exit Highlight */}
                <div className="mt-6 md:mt-8 p-4 md:p-6 rounded-xl bg-gradient-to-r from-[#20B2A4]/10 to-transparent border border-[#20B2A4]/20">
                  <div className="flex flex-col gap-3 md:gap-4">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                      <span className="px-2 md:px-3 py-1 rounded-full bg-[#20B2A4]/20 text-[#20B2A4] text-[10px] md:text-xs font-bold uppercase tracking-wider">
                        Partial Exit
                      </span>
                      <span className="text-white font-semibold text-sm md:text-base">GeneMatters → Genome Medical</span>
                    </div>
                    <ul className="text-xs md:text-sm text-white/60 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#20B2A4] mt-1.5 shrink-0" />
                        <span>Acquired by Genome Medical (August 30, 2021)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#20B2A4] mt-1.5 shrink-0" />
                        <span>40% liquidated in cash; 60% converted into Genome Medical common stock</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span className="text-emerald-400 font-semibold">$538,474 realized gain (1X return to date)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Strategic Investments Context - Only on Strategic view */}
          {activeView === 'strategic' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">About Strategic Investments</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    These investments were made prior to establishing formal Edge Ventures Fund I criteria. They represent early strategic bets in healthcare technology and innovation that laid the groundwork for our structured fund approach.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Toggle Details */}
          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm"
            >
              <svg className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {/* Dynamic Investment Table - Based on Active View */}
          <motion.section
            key={`investments-${activeView}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <div className={`rounded-2xl border overflow-hidden ${
              activeView === 'fund-i'
                ? 'bg-white/[0.02] border-[#20B2A4]/20'
                : 'bg-white/[0.02] border-white/10'
            }`}>
              {/* Header - Desktop only */}
              <div className={`hidden md:grid grid-cols-12 gap-4 py-3 px-4 border-b text-xs uppercase tracking-wider text-white/50 ${
                activeView === 'fund-i' ? 'bg-[#20B2A4]/10 border-[#20B2A4]/20' : 'bg-white/5 border-white/10'
              }`}>
                <div className="col-span-3">Company</div>
                <div className="col-span-2 text-right">Investment</div>
                <div className="col-span-2 text-right">Follow-Ons</div>
                <div className="col-span-2 text-right">Valuation</div>
                <div className="col-span-3 text-right">Gain/Loss</div>
              </div>
              {/* Mobile Header */}
              <div className={`md:hidden py-3 px-4 border-b text-xs uppercase tracking-wider text-white/50 ${
                activeView === 'fund-i' ? 'bg-[#20B2A4]/10 border-[#20B2A4]/20' : 'bg-white/5 border-white/10'
              }`}>
                Portfolio Companies
              </div>

              {/* Rows */}
              {currentInvestments.map((investment, index) => (
                <InvestmentRow key={investment.company} investment={investment} index={index} showDetails={showDetails} />
              ))}

              {/* Totals */}
              <TotalsRow totals={currentTotals} label="Total" />
            </div>
          </motion.section>

          {/* Fund II Teaser - Only show on Fund I view */}
          {activeView === 'fund-i' && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-12"
            >
              <div className="p-8 rounded-2xl bg-gradient-to-br from-[#20B2A4]/10 to-transparent border border-[#20B2A4]/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#20B2A4]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#20B2A4]/20 text-[#20B2A4] text-xs font-bold uppercase tracking-wider">
                      Coming Soon
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logos/Gundersen_Edge_RGB_wht_lockup_VENTURES_icon.png`}
                      alt="Edge Ventures"
                      className="w-10 h-10 object-contain"
                    />
                    <h3 className="text-2xl font-bold text-white">Fund II</h3>
                  </div>
                  <p className="text-white/60 max-w-xl">
                    Building on the success of Fund I, we&apos;re preparing our next fund to continue investing in transformative healthcare companies.
                    Investment criteria and fund details will be shared with qualified investors.
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {/* Portfolio Strategy Section - Only on Fund I view */}
          {activeView === 'fund-i' && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-[#FF9F40] to-[#FF9F40]/30 rounded-full" />
                <h2 className="text-2xl font-bold text-white">Portfolio Strategy</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Investment Criteria */}
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[#20B2A4]/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#20B2A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#20B2A4]">Investment Criteria</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'Healthcare-focused',
                      'Direct minority investments, with reputable leads sought',
                      'Scalable business with "venture" growth expectations and outlooks',
                      'Primarily focused on investments in the US market, with clearance and compliance to operate in US healthcare',
                      'Has some form of validated customer demand (preferably)',
                      'Drugs & Products have a higher bar to reach',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#20B2A4] mt-2 shrink-0" />
                        <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Terms */}
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[#A8D4B8]/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#A8D4B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#A8D4B8]">Terms</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      { label: 'Stage(s)', value: 'Seed, Series A, Series B' },
                      { label: 'Average Check-sizes', value: '$100K - 2M' },
                      { label: 'Target Portfolio Size', value: '15 - 25 companies' },
                      { label: 'Reserves', value: 'Follow-on participation in high-performers' },
                      { label: 'Concentration Limit', value: 'No more than 10% of the fund in any one investment' },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#A8D4B8] mt-2 shrink-0" />
                        <div>
                          <span className="text-white font-semibold text-sm">{item.label}:</span>
                          <span className="text-white/70 text-sm ml-2">{item.value}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          )}

          {/* Integration Overview Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-[#8B5CF6] to-[#8B5CF6]/30 rounded-full" />
              <div>
                <h2 className="text-2xl font-bold text-white">Integration Overview</h2>
                <p className="text-white/50 text-sm">Operationalizing investments through Emplify Health adoption</p>
              </div>
            </div>

            {/* Key Differentiator Callout */}
            <div className="mb-6 p-4 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
              <div className="flex items-start gap-3">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logos/Gundersen_Edge_RGB_wht_lockup_VENTURES_icon.png`}
                  alt="Edge Ventures"
                  className="w-8 h-8 object-contain shrink-0 mt-0.5"
                />
                <p className="text-white/80 text-sm">
                  <span className="text-[#8B5CF6] font-semibold">Key Advantage:</span> Edge Ventures creates unique value by facilitating integration of portfolio companies within Emplify Health, providing real-world validation and revenue opportunities for our investments.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {/* Active Integrations */}
              {[
                {
                  company: 'Genome Medical',
                  status: 'Previously Active',
                  statusColor: 'text-white/50',
                  bgColor: 'bg-white/5',
                  detail: 'Previously used in Gundersen region to clear low-impact case backlog, enabled team space to eliminate backlog and optimize internal processes. Can be re-engaged if needed. Bellin region exploring potential use.',
                },
                {
                  company: 'Panda Health',
                  status: 'Active',
                  statusColor: 'text-emerald-400',
                  bgColor: 'bg-emerald-400/10',
                  detail: 'Contracted and actively used within the health system.',
                },
                {
                  company: 'Digital Diagnostics',
                  status: 'Active & Expanding',
                  statusColor: 'text-emerald-400',
                  bgColor: 'bg-emerald-400/10',
                  detail: 'Bellin region using successfully; Gundersen region Primary Care exploring desirability for use.',
                },
                {
                  company: 'WiserCare',
                  status: 'Active',
                  statusColor: 'text-emerald-400',
                  bgColor: 'bg-emerald-400/10',
                  detail: 'Contracted and actively used within the health system.',
                },
                {
                  company: 'IdeaFund II',
                  status: 'Partner',
                  statusColor: 'text-[#8B5CF6]',
                  bgColor: 'bg-[#8B5CF6]/10',
                  detail: 'Idea Fund actively investing; Edge + Idea Fund collaborate regularly regarding companies of potential investment interest.',
                },
                {
                  company: 'IdeaWake',
                  status: 'Active',
                  statusColor: 'text-emerald-400',
                  bgColor: 'bg-emerald-400/10',
                  detail: 'Contracted and actively used within the health system for Edge ideation process and structured idea challenges.',
                },
                {
                  company: 'YourPath',
                  status: 'In Progress',
                  statusColor: 'text-amber-400',
                  bgColor: 'bg-amber-400/10',
                  detail: 'Work in progress validating potential use cases and fit within Emplify for SUD and similar patient populations.',
                },
                {
                  company: 'KeyCare',
                  status: 'Active & Exploring',
                  statusColor: 'text-emerald-400',
                  bgColor: 'bg-emerald-400/10',
                  detail: 'In use via Remission Medical team supporting Rheumatology. Exploration for fit within Emplify that is complimentary to virtual care options already offered by Emplify.',
                },
                {
                  company: 'Eneration',
                  status: 'Active',
                  statusColor: 'text-emerald-400',
                  bgColor: 'bg-emerald-400/10',
                  detail: 'Contracted and actively used within health system.',
                },
                {
                  company: 'Homecare Hub',
                  status: 'Pending',
                  statusColor: 'text-amber-400',
                  bgColor: 'bg-amber-400/10',
                  detail: 'Contract executed. Pending integration.',
                },
                {
                  company: 'MediView',
                  status: 'Negotiating',
                  statusColor: 'text-amber-400',
                  bgColor: 'bg-amber-400/10',
                  detail: 'Negotiating product purchase.',
                },
                {
                  company: 'Flywheel',
                  status: 'Not a Fit',
                  statusColor: 'text-white/40',
                  bgColor: 'bg-white/5',
                  detail: 'Not a fit for our institution; no plans to implement.',
                },
              ].map((item, index) => {
                const logo = companyLogos[item.company];
                return (
                  <motion.div
                    key={item.company}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.95 + index * 0.03 }}
                    className="p-3 md:p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-2 md:mb-3">
                      {/* Company Logo */}
                      {logo ? (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0 p-1">
                          <img
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${logo}`}
                            alt={`${item.company} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-white font-semibold text-sm md:text-base">{item.company}</span>
                          <span className={`text-[10px] md:text-xs font-medium px-2 py-0.5 md:py-1 rounded-full ${item.bgColor} ${item.statusColor} shrink-0`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-white/50 text-xs md:text-sm leading-relaxed">{item.detail}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#20B2A4]/10 to-[#A8D4B8]/10 border border-[#20B2A4]/30 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Interested in Partnership Opportunities?
              </h3>
              <p className="text-white/60 mb-6 max-w-lg mx-auto">
                We&apos;re always looking to connect with innovative healthcare companies and strategic partners.
              </p>
              <a
                href="mailto:greg@ghsedge.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#20B2A4] text-[#0F1D2F] font-semibold hover:bg-[#20B2A4]/90 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </a>
            </div>
          </motion.section>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-12 text-center"
          >
            <Link
              href="/ventures"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Overview
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
