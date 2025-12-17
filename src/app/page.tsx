'use client';

import { useState, useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

import LandingHero from '@/components/landing/LandingHero';
import BucketNavigation from '@/components/landing/BucketNavigation';
import BucketGrid from '@/components/landing/BucketGrid';
import LandingFooter from '@/components/landing/LandingFooter';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const [showNav, setShowNav] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Show/hide navigation based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      setShowNav(progress > 0.1);
      setScrollProgress(progress);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Intersection Observer for section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    const sections = ['hero', 'engage', 'launch', 'ventures', 'team'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-[#0F1D2F]"
    >
      {/* Sticky navigation - appears after scrolling */}
      <BucketNavigation show={showNav} active={activeSection} />

      {/* Hero section */}
      <div id="hero">
        <LandingHero />
      </div>

      {/* Bucket grid section */}
      <BucketGrid />

      {/* Footer */}
      <LandingFooter />

      {/* Scroll progress indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/5 z-50">
        <div
          className="h-full transition-all duration-150"
          style={{
            background: 'linear-gradient(to right, #3AACCF, #FF9F40, #20B2A4, #E85A6F)',
            width: `${Math.min(100, scrollProgress * 100)}%`
          }}
        />
      </div>

      {/* Section indicator dots (right side) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
        {['hero', 'engage', 'launch', 'ventures', 'team'].map((section) => {
          const colors: Record<string, string> = {
            hero: '#A8D4B8',
            engage: '#3AACCF',
            launch: '#FF9F40',
            ventures: '#20B2A4',
            team: '#E85A6F',
          };
          const isActive = activeSection === section;
          return (
            <button
              key={section}
              type="button"
              onClick={() => {
                const element = document.getElementById(section);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive ? 'scale-150' : 'bg-white/20 hover:bg-white/40'
              }`}
              style={isActive ? { backgroundColor: colors[section] } : undefined}
              aria-label={`Go to ${section} section`}
            />
          );
        })}
      </div>
    </div>
  );
}
