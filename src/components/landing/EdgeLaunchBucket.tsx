'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function EdgeLaunchBucket() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      id="launch"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="group relative overflow-hidden"
    >
      {/* Main card container */}
      <div className="relative p-8 rounded-3xl min-h-[450px] flex flex-col items-center justify-center text-center bg-white/5 border border-[#FF9F40]/20 backdrop-blur-xl transition-all duration-500">
        {/* Gradient accent at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9F40] to-[#FF8200] rounded-t-3xl opacity-60" />

        {/* Logo (dimmed) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logos/Gundersen_Edge_RGB_wht_LAUNCH_lockup.png`}
            alt="Edge Launch"
            className="h-14 md:h-16 w-auto"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/40 mb-8 max-w-xs leading-relaxed"
        >
          Accelerating healthcare startups from idea to impact
        </motion.p>

        {/* Coming Soon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? {
            opacity: 1,
            scale: [1, 1.05, 1],
          } : { opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 0.4, delay: 0.4 },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="px-6 py-3 rounded-full bg-[#FF9F40]/10 border border-[#FF9F40]/30"
        >
          <span className="text-[#FF9F40] font-bold text-sm uppercase tracking-wider">
            Coming Soon
          </span>
        </motion.div>

        {/* Decorative text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/20 text-sm mt-6"
        >
          Startup acceleration program details coming soon
        </motion.p>

        {/* Decorative icons */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 opacity-20">
          {/* Rocket icon */}
          <svg className="w-8 h-8 text-[#FF9F40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
          {/* Lightning bolt */}
          <svg className="w-8 h-8 text-[#FF9F40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
