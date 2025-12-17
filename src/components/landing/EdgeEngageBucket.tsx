'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const features = [
  'Define Outcomes & Guiding Principles',
  'Discovery & Prioritize Solutions',
  'Execution & Monitoring',
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
      <div className="relative p-8 rounded-3xl bg-white/5 border border-[#3AACCF]/30 backdrop-blur-xl hover:bg-white/10 hover:border-[#3AACCF]/50 transition-all duration-500 min-h-[450px] flex flex-col">
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
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Gundersen_Edge_RGB_wht_ENGAGE_lockup.png`}
            alt="Edge Engage"
            className="h-14 md:h-16 w-auto"
          />
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold mb-3"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Execution Method
          </span>
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/60 mb-6 flex-grow leading-relaxed"
        >
          A disruptive process to break down current biases, processes, and procedures to{' '}
          <span className="text-[#A8D4B8] font-medium">reinvent</span>.
          When the situation needs a breakthrough disruption.
        </motion.p>

        {/* Key features list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-3 mb-8"
        >
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-[#3AACCF] flex-shrink-0" />
              <span className="text-white/80 text-sm">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <Link href="/engage-method-v2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#3AACCF] to-[#007FA3] text-white font-semibold text-lg shadow-lg shadow-[#3AACCF]/30 hover:shadow-xl hover:shadow-[#3AACCF]/40 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Explore Method
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </Link>
      </div>

      {/* Background glow effect */}
      <div className="absolute -inset-4 -z-10 bg-[#3AACCF]/10 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
