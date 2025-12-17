'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import EdgeEngageBucket from './EdgeEngageBucket';
import EdgeLaunchBucket from './EdgeLaunchBucket';
import EdgeVenturesBucket from './EdgeVenturesBucket';

export default function BucketGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-5%' });

  return (
    <section
      ref={ref}
      className="min-h-screen bg-[#0F1D2F] py-24 px-6 relative"
    >
      {/* Background subtle texture */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/backgrounds/EdgeBackgroundSkyDivingIN.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Explore Edge
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Four pillars driving innovation in healthcare
          </motion.p>
        </motion.div>

        {/* Grid: Engage spans full width on top, Launch and Ventures below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="md:col-span-2">
            <EdgeEngageBucket />
          </div>
          <EdgeLaunchBucket />
          <EdgeVenturesBucket />
        </div>
      </div>
    </section>
  );
}
