'use client';

import { useEffect, useRef, useState } from 'react';

const investments = [
  { name: 'Digital Diagnostics', focus: 'AI diagnostics' },
  { name: 'Recombinetics', focus: 'Gene editing' },
  { name: 'Genome Medical', focus: 'Accessible genetics' },
  { name: 'KeyCare', focus: 'Virtual care' },
  { name: 'Makana Therapeutics', focus: 'Organ innovation' },
  { name: 'HomecareHub', focus: 'Community care' },
];

export default function EdgeVenturesLogos() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-10 min-h-[70vh] flex items-center justify-center px-6 py-20 text-white overflow-hidden"
      style={{ backgroundImage: 'radial-gradient(circle at top, rgba(16, 185, 129, 0.35), transparent 45%), radial-gradient(circle at 20% 40%, rgba(14, 165, 233, 0.25), transparent 40%), #03030b' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-[#02030b] pointer-events-none" aria-hidden="true" />
      <div className="relative w-full max-w-6xl space-y-10 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-white drop-shadow-lg">
          Companies powering Edge Ventures on the other side of possible
        </h2>

        <div
          className={`grid gap-6 md:grid-cols-3 lg:grid-cols-4 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 translate-y-10 -translate-x-4'
          }`}
        >
          {investments.map((investment) => (
            <div
              key={investment.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-3">Portfolio</p>
              <h3 className="text-2xl font-semibold text-white">{investment.name}</h3>
              <p className="text-sm text-gray-200 mt-2">{investment.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
