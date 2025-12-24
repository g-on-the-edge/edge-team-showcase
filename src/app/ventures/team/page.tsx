'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Core Team - ordered left to right as they appear in the group image
const coreTeam = [
  {
    name: 'Corey Zarecki',
    role: 'Director BADD',
    venturesRole: 'Managing Partner Edge Ventures',
  },
  {
    name: 'Bill Farrell',
    role: 'Chief Strategy & Innovation Officer',
    venturesRole: 'Managing Director Edge Ventures',
  },
  {
    name: 'Greg LaPoint',
    role: 'Director of Innovation | Edge Team',
    venturesRole: 'Managing Partner Edge Ventures',
  },
];

// Extended Team - Matrixed support
const extendedTeam = [
  {
    name: 'Dave Talenfeld',
    role: 'Innovation New Venture Partner',
    venturesRole: 'Investment Associate Edge Ventures',
    image: '/team/dave_t.jpeg',
  },
  {
    name: 'Alicia Waletzko',
    role: 'Innovation Integration Partner',
    venturesRole: '',
    image: '/team/Photo_Alicia.jpg',
  },
];

// Emplify Health Edge Advocates by Region
const advocateRegions = [
  {
    name: 'Gundersen Region',
    color: '#3AACCF', // Cyan
    advocates: [
      { name: 'Maria Ludwigson', department: 'Legal' },
      { name: 'Christina Flisram', department: 'Emplify/Quartz Strategic Collaboration' },
      { name: 'Daric Snyder', department: 'Digital User Experience' },
      { name: 'Erica Ericksen', department: 'Nursing' },
      { name: 'Dr. Jennifer Kleven', department: 'Research & Grants' },
      { name: 'Dr. Christine Waller', department: 'Nursing & System Practices' },
      { name: 'Kasey Kirschbaum', department: 'Human Resources' },
      { name: 'Krystal Suntken', department: 'Quality & Patient Safety' },
      { name: 'Tim Schuldt', department: 'Finance' },
      { name: 'Katie Nowak', department: 'Strategy' },
      { name: 'Tim Wilson', department: 'Facility Operations' },
    ],
  },
  {
    name: 'Bellin Region',
    color: '#E85D5D', // Coral/Red
    advocates: [
      { name: 'Christopher Elfner', department: 'Clinically Integrated Network' },
      { name: 'Mike Finley', department: 'Revenue Cycle' },
      { name: 'Maggie Koch', department: 'Care Beyond Walls' },
      { name: 'Kevin Donnelly', department: 'Strategy' },
      { name: 'Colin Schreck', department: 'HR Operations' },
      { name: 'Jami Berger', department: 'Chief Clinical Officer' },
    ],
  },
  {
    name: 'Enterprise',
    color: '#FF9F40', // Orange
    advocates: [
      { name: 'Andrea Werner', department: 'Population Health' },
      { name: 'Eric Dehn', department: 'Architecture/Solution Design IT' },
      { name: 'Randy Van Straten', department: 'Business & Community Health' },
      { name: 'Dallas Wait', department: 'Strategy & Innovation' },
      { name: 'Lacie Ketelhut', department: 'Change Management' },
      { name: 'Adam Hatfield', department: 'Media & Communications' },
      { name: 'Kendra Maggert', department: 'Marketing' },
    ],
  },
  {
    name: 'Quartz',
    color: '#A8D4B8', // Green
    advocates: [
      { name: 'Christina Flisram', department: 'Strategic Collaboration' },
    ],
  },
];

function ExtendedTeamMemberCard({ member, index }: {
  member: typeof extendedTeam[0],
  index: number,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-xl border transition-all duration-300 bg-white/5 border-white/10 hover:border-white/20">
        {/* Image Container - smaller aspect ratio */}
        <div className="relative overflow-hidden aspect-[4/5]">
          <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${member.image}`}
              alt={member.name}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D2F] via-[#0F1D2F]/30 to-transparent" />
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
          <h3 className="text-sm md:text-base font-bold text-white mb-0.5">{member.name}</h3>
          <p className="text-white/60 text-[10px] md:text-xs mb-0.5">{member.role}</p>
          {member.venturesRole && (
            <p className="text-[#A8D4B8] text-[10px] md:text-xs font-medium">{member.venturesRole}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function VenturesTeamPage() {
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
                className="px-3 md:px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors text-xs md:text-sm font-medium"
              >
                Portfolio
              </Link>
              <Link
                href="/ventures/team"
                className="px-3 md:px-4 py-2 rounded-lg bg-white/10 text-white text-xs md:text-sm font-medium"
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
              className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logos/Gundersen_Edge_RGB_wht_lockup_VENTURES_icon.png`}
                alt="Edge Ventures"
                className="w-full h-full object-contain"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#20B2A4] to-[#A8D4B8]">
                Our Team
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-2"
            >
              The leadership and partners driving Edge Ventures&apos; mission to transform healthcare through strategic investment.
            </motion.p>
          </motion.div>

          {/* Core Team Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12 md:mb-16"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-[#20B2A4] to-[#20B2A4]/30 rounded-full" />
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">Edge Ventures Team</h2>
                <p className="text-white/50 text-xs md:text-sm">Driving our investment strategy</p>
              </div>
            </div>

            {/* Group Image with Name Labels */}
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-[#20B2A4]/20 bg-gradient-to-b from-white/5 to-transparent">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/team/Ventures_Team.png`}
                alt="Edge Ventures Leadership Team"
                className="w-full h-auto"
              />

              {/* Name Labels Overlay - 3 horizontal boxes matching photo positions */}
              <div className="p-2 md:p-6 bg-gradient-to-t from-[#0F1D2F] via-[#0F1D2F]/95 to-[#0F1D2F]/80">
                {/* Mobile: 3 horizontal compact boxes */}
                <div className="md:hidden grid grid-cols-3 gap-1.5">
                  {coreTeam.map((member, index) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="p-2 rounded-lg bg-white/5 text-center"
                    >
                      <h3 className="text-[11px] font-bold text-white leading-tight">{member.name}</h3>
                      <p className="text-white/60 text-[9px] leading-tight mt-0.5">{member.role}</p>
                      <p className="text-[#20B2A4] text-[9px] font-medium leading-tight mt-0.5">{member.venturesRole}</p>
                    </motion.div>
                  ))}
                </div>
                {/* Desktop: 3-column grid */}
                <div className="hidden md:grid grid-cols-3 gap-4">
                  {coreTeam.map((member, index) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="text-center"
                    >
                      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-white/60 text-sm mb-1">{member.role}</p>
                      <p className="text-[#20B2A4] text-sm font-medium">{member.venturesRole}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Extended Team Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-12 md:mb-16"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-[#A8D4B8] to-[#A8D4B8]/30 rounded-full" />
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">Extended Team</h2>
                <p className="text-white/50 text-xs md:text-sm">Matrixed partners supporting our ventures</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-md">
              {extendedTeam.map((member, index) => (
                <ExtendedTeamMemberCard key={member.name} member={member} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Edge Advocates Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12 md:mb-16"
          >
            {/* Section Header */}
            <div className="text-center mb-8 md:mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4"
              >
                <svg className="w-4 h-4 text-[#20B2A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-white/70 text-sm font-medium">Organization-Wide Network</span>
              </motion.div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                Emplify Health{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#20B2A4] to-[#A8D4B8]">
                  Edge Advocates
                </span>
              </h2>
              <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
                Champions across every region driving innovation and transformation throughout our healthcare system
              </p>
            </div>

            {/* Advocates Grid by Region */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {advocateRegions.map((region, regionIndex) => (
                <motion.div
                  key={region.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + regionIndex * 0.1 }}
                  className="relative overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-white/[0.02]"
                  style={{ borderColor: `${region.color}20` }}
                >
                  {/* Region Header */}
                  <div
                    className="px-4 md:px-6 py-3 md:py-4 border-b"
                    style={{
                      background: `linear-gradient(135deg, ${region.color}15 0%, transparent 100%)`,
                      borderColor: `${region.color}20`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                        style={{ backgroundColor: region.color }}
                      />
                      <h3 className="text-base md:text-lg font-bold text-white">{region.name}</h3>
                      <span
                        className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${region.color}20`,
                          color: region.color
                        }}
                      >
                        {region.advocates.length} {region.advocates.length === 1 ? 'Advocate' : 'Advocates'}
                      </span>
                    </div>
                  </div>

                  {/* Advocates List */}
                  <div className="p-3 md:p-4">
                    <div className="grid grid-cols-1 gap-2">
                      {region.advocates.map((advocate, index) => (
                        <div
                          key={advocate.name}
                          className="group flex items-center gap-3 p-2 md:p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                        >
                          {/* Avatar Circle */}
                          <div
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0 transition-transform group-hover:scale-110"
                            style={{
                              backgroundColor: `${region.color}20`,
                              color: region.color
                            }}
                          >
                            {advocate.name.split(' ').map(n => n[0]).join('')}
                          </div>

                          {/* Info */}
                          <div className="min-w-0 flex-1">
                            <p className="text-white text-sm md:text-base font-medium truncate">
                              {advocate.name}
                            </p>
                            <p className="text-white/50 text-xs md:text-sm truncate">
                              {advocate.department}
                            </p>
                          </div>

                          {/* Hover indicator */}
                          <div
                            className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            style={{ backgroundColor: region.color }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative gradient */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-50"
                    style={{ background: `linear-gradient(90deg, ${region.color}, transparent)` }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Total Advocates Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-6 md:mt-8 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="text-[#20B2A4] font-bold text-lg">
                  {advocateRegions.reduce((sum, r) => sum + r.advocates.length, 0)}
                </span>
                <span className="text-white/60 text-sm">Total Advocates Across Emplify Health</span>
              </div>
            </motion.div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="p-6 md:p-8 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#20B2A4]/10 to-[#A8D4B8]/10 border border-[#20B2A4]/30 text-center">
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                Connect With Our Team
              </h3>
              <p className="text-white/60 text-sm md:text-base mb-4 md:mb-6 max-w-lg mx-auto">
                Interested in partnership opportunities or want to learn more about Edge Ventures?
              </p>
              <a
                href="mailto:greg@ghsedge.com"
                className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-xl bg-[#20B2A4] text-[#0F1D2F] font-semibold hover:bg-[#20B2A4]/90 transition-colors text-sm md:text-base"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in Touch
              </a>
            </div>
          </motion.section>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-8 md:mt-12 text-center"
          >
            <Link
              href="/ventures"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm md:text-base"
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
