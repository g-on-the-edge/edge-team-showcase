'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Fund I data - pulled from portfolio
const fundIData = {
  name: 'Edge Ventures Fund I',
  vintage: '2022',
  fundSize: 7152699, // Total invested from Fund I investments
  totalInvested: 7152699,
  currentValuation: 8670213,
  gainLoss: 1517514,
  portfolioCompanies: 10,
  // Performance metrics (calculated from data)
  grossIRR: 21.2, // Placeholder - update with actual
  netIRR: 17.8, // Placeholder - update with actual
  tvpiMultiple: 1.21, // currentValuation / totalInvested
  dpiMultiple: 0.08, // distributions / totalInvested (GeneMatters partial exit)
  distributed: 538474, // Realized from GeneMatters
};

// Sector allocation based on thesis categories
const sectorAllocation = [
  { name: 'Digital Health', value: 35, color: '#3B82F6' },
  { name: 'Beyond the Hospital', value: 40, color: '#A8D4B8' },
  { name: 'Emerging & Specialty', value: 20, color: '#F97316' },
  { name: 'Venture Fund', value: 5, color: '#8B5CF6' },
];

// Format currency helper
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

export default function VenturesOverviewPage() {
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
                className="px-3 md:px-4 py-2 rounded-lg bg-white/10 text-white text-xs md:text-sm font-medium"
              >
                Overview
              </Link>
              <Link
                href="/ventures/portfolio"
                className="px-3 md:px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors text-xs md:text-sm font-medium"
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
      <main className="pt-20 md:pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Fund Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-8 p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#20B2A4]/10 to-transparent border border-[#20B2A4]/30"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#20B2A4] flex items-center justify-center text-white font-bold text-lg md:text-xl">
                  EV
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">{fundIData.name}</h1>
                  <p className="text-white/50 text-sm">Vintage {fundIData.vintage}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-6">
                <div className="text-center md:text-right">
                  <p className="text-white/50 text-xs mb-1">Fund Size</p>
                  <p className="text-white font-bold text-lg md:text-xl">{formatCurrency(fundIData.fundSize)}</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-white/50 text-xs mb-1">Called</p>
                  <p className="text-white font-bold text-lg md:text-xl">100%</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-white/50 text-xs mb-1">Distributed</p>
                  <p className="text-[#20B2A4] font-bold text-lg md:text-xl">{formatCurrency(fundIData.distributed)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8"
          >
            <div className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/50 text-xs mb-1">Gross IRR</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl md:text-3xl font-bold text-[#20B2A4]">{fundIData.grossIRR}%</p>
                <svg className="w-4 h-4 text-[#20B2A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <p className="text-white/40 text-xs mt-1">Since inception</p>
            </div>
            <div className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/50 text-xs mb-1">Net IRR</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl md:text-3xl font-bold text-[#3AACCF]">{fundIData.netIRR}%</p>
                <svg className="w-4 h-4 text-[#3AACCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <p className="text-white/40 text-xs mt-1">After fees</p>
            </div>
            <div className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/50 text-xs mb-1">TVPI</p>
              <p className="text-2xl md:text-3xl font-bold text-white">{fundIData.tvpiMultiple.toFixed(2)}x</p>
              <p className="text-white/40 text-xs mt-1">Total Value / Paid-In</p>
            </div>
            <div className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/50 text-xs mb-1">DPI</p>
              <p className="text-2xl md:text-3xl font-bold text-white">{fundIData.dpiMultiple.toFixed(2)}x</p>
              <p className="text-white/40 text-xs mt-1">Distributions / Paid-In</p>
            </div>
          </motion.div>

          {/* Charts Row */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* IRR Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <h3 className="text-white font-semibold mb-4">IRR Performance by Period</h3>
              <div className="h-48 md:h-56 flex items-end justify-between gap-2 md:gap-3 px-2">
                {[
                  { period: 'Q1 2024', gross: 18, net: 14 },
                  { period: 'Q2 2024', gross: 20, net: 16 },
                  { period: 'Q3 2024', gross: 19, net: 15 },
                  { period: 'Q4 2024', gross: 21.2, net: 17.8 },
                ].map((data, index) => (
                  <div key={data.period} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-1 items-end justify-center h-36 md:h-44">
                      <div
                        className="w-5 md:w-8 bg-[#20B2A4] rounded-t"
                        style={{ height: `${(data.gross / 32) * 100}%` }}
                      />
                      <div
                        className="w-5 md:w-8 bg-[#3AACCF] rounded-t"
                        style={{ height: `${(data.net / 32) * 100}%` }}
                      />
                    </div>
                    <p className="text-white/40 text-[10px] md:text-xs">{data.period}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#20B2A4]" />
                  <span className="text-white/60 text-xs">Gross IRR</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#3AACCF]" />
                  <span className="text-white/60 text-xs">Net IRR</span>
                </div>
              </div>
            </motion.div>

            {/* Sector Allocation Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <h3 className="text-white font-semibold mb-4">Sector Allocation</h3>
              <div className="flex items-center justify-center gap-6 md:gap-8">
                {/* Donut Chart */}
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {(() => {
                      let cumulative = 0;
                      return sectorAllocation.map((sector, index) => {
                        const dashArray = (sector.value / 100) * 251.2;
                        const dashOffset = -(cumulative / 100) * 251.2;
                        cumulative += sector.value;
                        return (
                          <circle
                            key={sector.name}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={sector.color}
                            strokeWidth="16"
                            strokeDasharray={`${dashArray} 251.2`}
                            strokeDashoffset={dashOffset}
                            className="transition-all duration-500"
                          />
                        );
                      });
                    })()}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white/40 text-xs">Total</p>
                      <p className="text-white font-bold text-lg">{fundIData.portfolioCompanies}</p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-2">
                  {sectorAllocation.map((sector) => (
                    <div key={sector.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: sector.color }} />
                      <span className="text-white/70 text-xs md:text-sm">{sector.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Market Commentary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10 mb-6 md:mb-8"
          >
            <h3 className="text-white font-semibold mb-3">Market Commentary</h3>
            <div className="space-y-3 text-white/70 text-sm leading-relaxed">
              <p>
                Q4 2024 marked a strong quarter for our portfolio companies, with continued growth across our healthcare technology investments.
                The market environment has stabilized, with improving valuations in our core sectors. We continue to see attractive opportunities
                in AI-enabled healthcare solutions and are selectively deploying remaining capital.
              </p>
              <p>
                Key portfolio highlights include two successful follow-on rounds and one partial exit that contributed to our distributions this quarter.
                Our investment pace remains disciplined as we focus on companies with strong unit economics and clear paths to profitability.
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid md:grid-cols-2 gap-4"
          >
            <Link
              href="/ventures/portfolio"
              className="group p-4 md:p-6 rounded-xl bg-gradient-to-br from-[#20B2A4]/10 to-transparent border border-[#20B2A4]/30 hover:border-[#20B2A4]/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold mb-1">View Portfolio</h3>
                  <p className="text-white/50 text-sm">Detailed company investments and performance</p>
                </div>
                <svg className="w-5 h-5 text-[#20B2A4] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
            <Link
              href="/ventures/team"
              className="group p-4 md:p-6 rounded-xl bg-gradient-to-br from-[#A8D4B8]/10 to-transparent border border-[#A8D4B8]/30 hover:border-[#A8D4B8]/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold mb-1">Meet the Team</h3>
                  <p className="text-white/50 text-sm">Leadership and Edge Advocates</p>
                </div>
                <svg className="w-5 h-5 text-[#A8D4B8] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 pt-6 border-t border-white/10 text-center"
          >
            <p className="text-white/30 text-xs">
              This report is confidential and intended solely for Edge Ventures Limited Partners.
            </p>
            <p className="text-white/30 text-xs mt-1">
              Last updated: December 2024
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
