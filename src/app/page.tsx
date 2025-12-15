'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import EdgeVenturesLogos from '@/components/EdgeVenturesLogos';
import ExploreOverlay from '@/components/ExploreOverlay';
import EdgeEngage from '@/components/EdgeEngage';
import EdgeLaunch from '@/components/EdgeLaunch';
import EdgeVentures from '@/components/EdgeVentures';
import PortfolioTimeline from '@/components/PortfolioTimeline';
import ExternalTraction from '@/components/ExternalTraction';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);

  return (
    <div className="overflow-x-hidden">
      <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />

      {/* Hero stays fixed at z-0, everything scrolls over it */}
      <div id="section-0">
        <Hero />
      </div>

      {/* Overlay scrolls up over Hero, stays sticky while scrolling through it */}
      <ExploreOverlay />

      {/* All following sections flow naturally like a camera roll */}
      <div id="section-1">
        <EdgeEngage />
      </div>
      
      <EdgeVenturesLogos />

      <div id="section-2">
        <EdgeLaunch />
      </div>
      <div id="section-3">
        <EdgeVentures />
      </div>
      
      <PortfolioTimeline />
      <ExternalTraction />
    </div>
  );
}
