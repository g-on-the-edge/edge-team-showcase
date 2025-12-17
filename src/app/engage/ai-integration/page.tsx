'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AIIntegrationPage() {
  return (
    <div className="min-h-screen bg-[#0F1D2F] text-white">
      {/* Header with Home Button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F1D2F]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/#engage"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Home</span>
          </Link>

          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logos/Gundersen_Edge_RGB_wht_ENGAGE_lockup.png`}
            alt="Edge Engage"
            className="h-8 w-auto"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#A8D4B8]/20 to-[#3AACCF]/20 border border-[#A8D4B8]/30 flex items-center justify-center"
            >
              <svg className="w-10 h-10 text-[#A8D4B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A8D4B8] to-[#3AACCF]">
                AI Integration & Education
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Edge is partnering with Emplify Health&apos;s ITDS team to lead AI integration,
              adoption, and education across the organization. Together, we&apos;re shaping
              how healthcare embraces intelligent technology.
            </motion.p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#A8D4B8]/30 shadow-2xl shadow-[#A8D4B8]/10">
              <div className="aspect-video">
                <iframe
                  src="https://player.vimeo.com/video/1147151674?badge=0&autopause=0&player_id=0&app_id=58479&transparent=0"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  title="AI Integration & Education"
                />
              </div>
            </div>
          </motion.div>

          {/* Content Sections */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            {/* Partnership Overview */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                A Strategic Partnership
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                The collaboration between Edge and Emplify Health&apos;s Information Technology
                and Digital Services (ITDS) team represents a commitment to thoughtfully
                integrating artificial intelligence into healthcare operations.
              </p>
              <p className="text-white/70 leading-relaxed">
                Our joint mission focuses on three key pillars: responsible AI integration,
                organization-wide adoption strategies, and comprehensive education programs
                that empower every team member to leverage AI effectively.
              </p>
            </div>

            {/* Key Focus Areas */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-[#A8D4B8]/10 to-transparent border border-[#A8D4B8]/20">
                <div className="w-12 h-12 rounded-lg bg-[#A8D4B8]/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#A8D4B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Integration</h3>
                <p className="text-white/60 text-sm">
                  Seamlessly incorporating AI tools into existing workflows and systems.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-[#3AACCF]/10 to-transparent border border-[#3AACCF]/20">
                <div className="w-12 h-12 rounded-lg bg-[#3AACCF]/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#3AACCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Adoption</h3>
                <p className="text-white/60 text-sm">
                  Building strategies for organization-wide AI adoption and acceptance.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-[#FF9F40]/10 to-transparent border border-[#FF9F40]/20">
                <div className="w-12 h-12 rounded-lg bg-[#FF9F40]/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#FF9F40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Education</h3>
                <p className="text-white/60 text-sm">
                  Empowering team members with AI knowledge and practical skills.
                </p>
              </div>
            </div>

            {/* Featured Article */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#A8D4B8]/10 to-[#3AACCF]/10 border border-[#A8D4B8]/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#A8D4B8]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#A8D4B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Featured Reading
                  </h3>
                  <p className="text-white/70 mb-4 leading-relaxed">
                    Explore the future of AI in healthcare with insights on what&apos;s coming in 2026.
                  </p>
                  <a
                    href="/News/How the AI conversation will change in 2026: 10 bold predictions.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#A8D4B8]/20 text-[#A8D4B8] hover:bg-[#A8D4B8]/30 transition-colors border border-[#A8D4B8]/30"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    How the AI conversation will change in 2026: 10 bold predictions
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#A8D4B8]/10 to-[#3AACCF]/10 border border-[#A8D4B8]/30 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Interested in Learning More?
              </h3>
              <p className="text-white/60 mb-6">
                Have questions about our AI initiatives or want to get involved?
              </p>
              <a
                href="mailto:greg@ghsedge.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#A8D4B8] text-[#0F1D2F] font-semibold hover:bg-[#A8D4B8]/90 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </a>
            </div>
          </motion.div>

          {/* Back to Home Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <Link
              href="/#engage"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Edge Engage
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
