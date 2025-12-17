'use client';

import { motion } from 'framer-motion';

const buckets = [
  { id: 'engage', name: 'Engage', color: '#3AACCF' },
  { id: 'launch', name: 'Launch', color: '#FF9F40' },
  { id: 'ventures', name: 'Ventures', color: '#20B2A4' },
  { id: 'team', name: 'Team', color: '#E85A6F' },
];

interface BucketNavigationProps {
  show: boolean;
  active: string;
}

export default function BucketNavigation({ show, active }: BucketNavigationProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0F1D2F]/95 backdrop-blur-xl border-b border-[#2D4A6F]"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Edge E logo - small */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logos/Gundersen_Edge_RGB_White.png`}
            alt="Edge"
            className="h-8 w-auto"
          />
        </button>

        {/* Navigation items */}
        <div className="flex gap-2 md:gap-4">
          {buckets.map((bucket) => {
            const isActive = active === bucket.id;
            return (
              <button
                key={bucket.id}
                onClick={() => scrollToSection(bucket.id)}
                className="relative px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300"
                style={{
                  backgroundColor: isActive ? `${bucket.color}20` : 'transparent',
                  color: isActive ? bucket.color : 'rgba(255, 255, 255, 0.6)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                  }
                }}
              >
                {bucket.name}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: bucket.color }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
