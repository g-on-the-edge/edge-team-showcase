'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const buckets = [
  { id: 'engage', name: 'Edge Engage', color: '#3AACCF' },
  { id: 'launch', name: 'Edge Launch', color: '#FF9F40' },
  { id: 'ventures', name: 'Edge Ventures', color: '#20B2A4' },
  { id: 'team', name: 'Edge Team', color: '#E85A6F' },
];

export default function LandingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY, scale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/cliff_edge.png)` }}
        />
        {/* Gradient overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center"
      >
        {/* Edge Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Gundersen_Edge_RGB_White_large_tagline.png`}
            alt="GHS Edge - On the Other Side of Possible"
            className="h-32 md:h-40 lg:h-48 w-auto"
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-white/80 tracking-wide">
            Transforming Healthcare Through{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A8D4B8] via-[#20B2A4] to-[#A8D4B8] font-medium">
              Innovation
            </span>
          </h1>
        </motion.div>

        {/* Bucket Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {buckets.map((bucket, index) => (
            <motion.button
              key={bucket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection(bucket.id)}
              className="px-6 py-3 rounded-xl transition-all duration-300"
              style={{
                backgroundColor: `${bucket.color}15`,
                border: `1px solid ${bucket.color}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${bucket.color}25`;
                e.currentTarget.style.borderColor = `${bucket.color}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${bucket.color}15`;
                e.currentTarget.style.borderColor = `${bucket.color}40`;
              }}
            >
              <span className="text-white font-semibold text-sm uppercase tracking-wider">
                {bucket.name}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/50 text-xs uppercase tracking-widest">Scroll to explore</span>
          <svg
            className="w-5 h-5 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Mist/fog effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F1D2F] to-transparent z-20" />
    </section>
  );
}
