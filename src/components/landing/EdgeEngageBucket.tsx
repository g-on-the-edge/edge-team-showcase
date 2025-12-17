'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const tripleAim = [
  { label: 'Better Health', icon: '♥' },
  { label: 'Better Care', icon: '✦' },
  { label: 'Lower Cost', icon: '◆' },
];

export default function EdgeEngageBucket() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      id="engage"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
      className="group relative overflow-hidden"
    >
      {/* Main card container */}
      <div className="relative p-8 rounded-3xl bg-white/5 border border-[#3AACCF]/30 backdrop-blur-xl hover:bg-white/10 hover:border-[#3AACCF]/50 transition-all duration-500 flex flex-col">
        {/* Gradient accent at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3AACCF] to-[#007FA3] rounded-t-3xl" />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logos/Gundersen_Edge_RGB_wht_ENGAGE_lockup.png`}
            alt="Edge Engage"
            className="h-14 md:h-16 w-auto"
          />
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Breaking Barriers & Transforming Healthcare
          </span>
        </motion.h3>

        {/* Mission Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/70 mb-6 leading-relaxed"
        >
          Edge Engage is where{' '}
          <span className="text-[#3AACCF] font-medium">expertise meets opportunity</span>.
          We bring together resources, connections, and collaborative spirit to transform
          healthcare innovation from concept to reality.
        </motion.p>

        {/* Triple Aim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          {tripleAim.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3AACCF]/10 border border-[#3AACCF]/30"
            >
              <span className="text-[#3AACCF]">{item.icon}</span>
              <span className="text-white/80 text-sm font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scale callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-[#A8D4B8]">15,000+</div>
            <div className="text-white/60 text-sm">employees supporting healthcare innovation</div>
          </div>
        </motion.div>

        {/* Engage with what's next section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-6 p-5 rounded-xl bg-gradient-to-br from-[#3AACCF]/10 to-[#007FA3]/10 border border-[#3AACCF]/20"
        >
          <h4 className="text-lg font-semibold text-[#3AACCF] mb-2">
            Engage with what&apos;s next
          </h4>
          <p className="text-white/60 text-sm mb-4">
            Got an innovative idea that could transform healthcare? We want to hear from you.
          </p>
          <a
            href="mailto:greg@ghsedge.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3AACCF]/20 text-[#3AACCF] hover:bg-[#3AACCF]/30 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Submit Your Idea
          </a>
        </motion.div>

        {/* Explore More - Links to sub-pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="space-y-3"
        >
          <h4 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
            Explore More
          </h4>

          {/* AI Integration Link */}
          <Link href="/engage/ai-integration" className="block">
            <motion.div
              whileHover={{ scale: 1.02, x: 4 }}
              className="p-4 rounded-xl bg-gradient-to-r from-[#A8D4B8]/10 to-[#3AACCF]/5 border border-[#A8D4B8]/20 hover:border-[#A8D4B8]/50 transition-all duration-300 cursor-pointer group/ai"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#A8D4B8]/20 flex items-center justify-center group-hover/ai:bg-[#A8D4B8]/30 transition-colors">
                    <svg className="w-5 h-5 text-[#A8D4B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-0.5 group-hover/ai:text-[#A8D4B8] transition-colors">
                      AI Integration & Education
                    </h5>
                    <p className="text-white/50 text-sm">
                      Partnering with ITDS to shape healthcare&apos;s AI future
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#A8D4B8]/10 flex items-center justify-center group-hover/ai:bg-[#A8D4B8]/20 transition-colors">
                  <svg
                    className="w-4 h-4 text-[#A8D4B8] group-hover/ai:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Execution Method Link */}
          <Link href="/engage-method-v2" className="block">
            <motion.div
              whileHover={{ scale: 1.02, x: 4 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#3AACCF]/40 transition-all duration-300 cursor-pointer group/method"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#3AACCF]/20 flex items-center justify-center group-hover/method:bg-[#3AACCF]/30 transition-colors">
                    <svg className="w-5 h-5 text-[#3AACCF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-0.5 group-hover/method:text-[#3AACCF] transition-colors">
                      Execution Method
                    </h5>
                    <p className="text-white/50 text-sm">
                      Our disruptive process to reinvent healthcare delivery
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3AACCF]/10 flex items-center justify-center group-hover/method:bg-[#3AACCF]/20 transition-colors">
                  <svg
                    className="w-4 h-4 text-[#3AACCF] group-hover/method:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Background glow effect */}
      <div className="absolute -inset-4 -z-10 bg-[#3AACCF]/10 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
