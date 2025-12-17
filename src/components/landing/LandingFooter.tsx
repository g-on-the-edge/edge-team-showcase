'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const buckets = [
  { id: 'engage', name: 'Edge Engage', color: '#3AACCF' },
  { id: 'launch', name: 'Edge Launch', color: '#FF9F40' },
  { id: 'ventures', name: 'Edge Ventures', color: '#20B2A4' },
  { id: 'team', name: 'Edge Team', color: '#E85A6F' },
];

export default function LandingFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      ref={ref}
      className="bg-[#0F1D2F] border-t border-[#2D4A6F] py-16 relative overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logos/Gundersen_Edge_RGB_White_large_tagline.png`}
              alt="GHS Edge"
              className="h-16 w-auto mb-4"
            />
            <p className="text-white/40 text-sm">
              On the Other Side of Possible
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <div className="space-y-2">
              {buckets.map((bucket) => (
                <button
                  key={bucket.id}
                  onClick={() => scrollToSection(bucket.id)}
                  className="block text-white/60 transition-colors"
                  style={{ '--hover-color': bucket.color } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = bucket.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                  }}
                >
                  {bucket.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <a
              href="mailto:greg@ghsedge.com"
              className="text-[#A8D4B8] hover:text-[#A8D4B8]/80 transition-colors"
            >
              greg@ghsedge.com
            </a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} GHS Edge. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
