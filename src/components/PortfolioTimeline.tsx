'use client';

interface Company {
  name: string;
  logo?: string;
  category: 'strategic' | 'fund1';
}

const companies: Record<string, Company[]> = {
  '2020-2021': [
    { name: 'Genome Medical', category: 'strategic' },
    { name: 'GeneMatters', category: 'strategic' },
    { name: 'Panda Health', category: 'strategic' },
    { name: 'Digital Diagnostics', category: 'fund1' },
  ],
  '2022-2023': [
    { name: 'Flywheel', category: 'strategic' },
    { name: 'IdeaFund II', category: 'strategic' },
  ],
  '2024-2025': [
    { name: 'KeyCare', category: 'fund1' },
    { name: 'HomecareHub', category: 'fund1' },
    { name: 'MediView', category: 'fund1' },
    { name: 'YourPath', category: 'fund1' },
    { name: 'VegaHealth', category: 'fund1' },
  ],
  '2026': [
    { name: 'Eneration', category: 'fund1' },
    { name: 'IdeaWake', category: 'fund1' },
    { name: 'WiserCare', category: 'fund1' },
  ],
};

const integrationStages = [
  'Internal Champion',
  'ROI Calculated',
  'Investment Made',
  'Pilot Designed',
  'Contracts Engaged',
  'Change Management',
  'Implemented',
  'Feedback to Company'
];

export default function PortfolioTimeline() {
  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 pt-24" style={{ backgroundImage: 'url(/network-dark.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-sm mb-4 md:mb-6">
            Portfolio Company Integration
          </h2>
          <div className="inline-block bg-gradient-to-r from-teal-500/90 to-cyan-400 text-gray-900 px-4 md:px-8 py-2 md:py-4 rounded-full text-sm md:text-xl font-semibold mb-4 md:mb-6 shadow-2xl">
            % Integrated - 60% (6/8) plus 3 new investments
          </div>
        </div>

        {/* Integration Journey */}
        <div className="mb-8 md:mb-16 bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-4 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">Integration Journey</h3>
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-3">
            {integrationStages.map((stage, index) => (
              <div key={stage} className="flex items-center">
                <div className="px-2 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-lg text-xs md:text-sm font-medium text-center">
                  {stage}
                </div>
                {index < integrationStages.length - 1 && (
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-teal-300 mx-0.5 md:mx-1 hidden sm:block" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Funnel */}
        <div className="relative">
          {/* Timeline Years */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 mb-8">
            {Object.keys(companies).map((year, index) => (
              <div key={year} className="relative">
                {/* Funnel Shape - rounded on mobile, clip-path on desktop */}
                <div className="bg-gradient-to-b from-teal-600 to-blue-900 text-white py-3 md:py-6 font-bold text-base md:text-xl text-center relative rounded-lg md:rounded-none">
                  {year}
                </div>

                {/* Companies for this year */}
                <div className="mt-4 md:mt-8 space-y-2 md:space-y-3">
                  {companies[year].map((company) => (
                    <div
                      key={company.name}
                      className={`p-2 md:p-4 rounded-lg shadow-lg text-center text-sm md:text-base font-semibold transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer ${
                        company.category === 'strategic'
                          ? 'bg-gradient-to-r from-purple-500/90 to-pink-500 text-white'
                          : 'bg-white/5 text-white border border-teal-500/40'
                      }`}
                    >
                      {company.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 md:mt-16 flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-8 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0"></div>
            <div>
              <p className="font-bold text-white text-sm md:text-base">Strategic Investments</p>
              <p className="text-xs md:text-sm text-white/70">Gene Matters, Genome Medical, Flywheel, Panda Health, IdeaFund II</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-gradient-to-r from-white/60 to-teal-300 border border-teal-400/80 flex-shrink-0"></div>
            <div>
              <p className="font-bold text-white text-sm md:text-base">Edge Ventures Fund I</p>
              <p className="text-xs md:text-sm text-white/70">Digital Diagnostics, IdeaWake, WiserCare, YourPath, KeyCare, Eneration, HomecareHub, MediView, VegaHealth</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 md:mt-16 grid grid-cols-3 gap-2 md:gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl shadow-2xl p-3 md:p-8 text-center">
            <div className="text-2xl md:text-5xl font-bold text-teal-400 mb-1 md:mb-2">14</div>
            <div className="text-white/80 font-medium text-xs md:text-base">Total Companies</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl shadow-2xl p-3 md:p-8 text-center">
            <div className="text-2xl md:text-5xl font-bold text-green-400 mb-1 md:mb-2">60%</div>
            <div className="text-white/80 font-medium text-xs md:text-base">Integration Rate</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl shadow-2xl p-3 md:p-8 text-center">
            <div className="text-2xl md:text-5xl font-bold text-blue-400 mb-1 md:mb-2">2026</div>
            <div className="text-white/80 font-medium text-xs md:text-base">Next Wave</div>
          </div>
        </div>
      </div>
    </section>
  );
}
