'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function EdgeVenturesBucket() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      id="ventures"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="group relative overflow-hidden"
    >
      <Link href="/ventures">
        {/* Main card container */}
        <div className="relative p-8 rounded-3xl min-h-[450px] flex flex-col items-center justify-center text-center bg-white/5 border border-[#20B2A4]/20 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.08] hover:border-[#20B2A4]/40 cursor-pointer">
          {/* Gradient accent at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#20B2A4] to-[#A8D4B8] rounded-t-3xl opacity-60 group-hover:opacity-100 transition-opacity" />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 group-hover:opacity-100 transition-opacity"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logos/Gundersen_Edge_RGB_wht_VENTURES_lockup.png`}
              alt="Edge Ventures"
              className="h-14 md:h-16 w-auto"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/50 mb-6 max-w-xs leading-relaxed group-hover:text-white/70 transition-colors"
          >
            Strategic investments in healthcare innovation
          </motion.p>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-6 mb-6"
          >
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#20B2A4]">14</p>
              <p className="text-xs text-white/40 uppercase tracking-wider">Portfolio Companies</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-white">$69.8M</p>
              <p className="text-xs text-white/40 uppercase tracking-wider">Total Invested</p>
            </div>
          </motion.div>

          {/* View Portfolio Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="px-6 py-3 rounded-full bg-[#20B2A4]/10 border border-[#20B2A4]/30 group-hover:bg-[#20B2A4]/20 group-hover:border-[#20B2A4]/50 transition-all"
          >
            <span className="text-[#20B2A4] font-semibold text-sm flex items-center gap-2">
              View Portfolio
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </motion.div>

          {/* Decorative icons */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 opacity-20 group-hover:opacity-30 transition-opacity">
            {/* Chart icon */}
            <svg className="w-8 h-8 text-[#20B2A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            {/* Globe icon */}
            <svg className="w-8 h-8 text-[#20B2A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
