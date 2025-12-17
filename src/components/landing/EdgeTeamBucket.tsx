'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function EdgeTeamBucket() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      id="team"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="group relative overflow-hidden"
    >
      {/* Main card container */}
      <div className="relative p-8 rounded-3xl min-h-[450px] flex flex-col items-center justify-center text-center bg-white/5 border border-[#E85A6F]/20 backdrop-blur-xl transition-all duration-500">
        {/* Gradient accent at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E85A6F] to-[#C41F3E] rounded-t-3xl opacity-60" />

        {/* Logo (dimmed) - using the E logo for Team */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Gundersen_Edge_E_RGB_White.png`}
            alt="Edge Team"
            className="h-16 md:h-20 w-auto"
          />
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-xl font-bold text-white mb-4"
        >
          Edge Team
        </motion.h3>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/40 mb-8 max-w-xs leading-relaxed"
        >
          The people driving healthcare transformation
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
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }
          }}
          className="px-6 py-3 rounded-full bg-[#E85A6F]/10 border border-[#E85A6F]/30"
        >
          <span className="text-[#E85A6F] font-bold text-sm uppercase tracking-wider">
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
          Meet the team behind Edge
        </motion.p>

        {/* Decorative icons */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 opacity-20">
          {/* Users icon */}
          <svg className="w-8 h-8 text-[#E85A6F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          {/* Heart icon */}
          <svg className="w-8 h-8 text-[#E85A6F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
