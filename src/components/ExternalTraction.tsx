'use client';

interface Highlight {
  category: string;
  partner: string;
  image?: string;
  title: string;
  description: string[];
  color: string;
}

const highlights: Highlight[] = [
  {
    category: 'National Thought Leadership',
    partner: 'VegaHealth',
    title: 'Revolutionizing Healthcare: Innovation, Investment & Impact',
    description: [
      'Invited to speak at HealthTech Conference (Birmingham)',
      'Position: Edge seen as an innovation thought leader',
      'May 14-15, 2025 | Birmingham, AL'
    ],
    color: 'from-purple-600 to-indigo-600',
  },
  {
    category: 'Innovation Ecosystem Building',
    partner: 'gener8tor',
    title: 'Corporate Innovation Network',
    description: [
      'Corporate innovation network event with gener8tor',
      'Support: Expansion of innovation space + partnerships',
      'Building a thriving innovation ecosystem'
    ],
    color: 'from-orange-500 to-red-500',
  },
  {
    category: 'National Media Exposure',
    partner: 'Homecare Hub',
    title: 'Pioneering New Model for Patient Care',
    description: [
      'Homecare Hub partnership featured in national media',
      'Validation: Edge\'s work being recognized externally',
      'Emplify Health and Homecare Hub partnership highlighted'
    ],
    color: 'from-teal-500 to-blue-500',
  },
];

export default function ExternalTraction() {
  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 pt-24" style={{ backgroundImage: 'url(/network-dark.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            External Traction Highlights
          </h2>
          <div className="inline-block bg-gradient-to-r from-teal-400 to-green-400 text-gray-900 px-8 py-3 rounded-full text-2xl font-bold">
            2025
          </div>
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex flex-col">
              {/* Category Header */}
              <div className="bg-white/10 backdrop-blur-sm rounded-t-2xl p-6 border-b-4 border-white/20">
                <h3 className="text-2xl font-bold text-white text-center mb-2">
                  {highlight.category}
                </h3>
              </div>

              {/* Content Card */}
              <div className="bg-white/5 border border-white/10 rounded-b-2xl shadow-2xl flex-1 flex flex-col">
                {/* Image Placeholder */}
                <div className={`h-48 bg-gradient-to-br ${highlight.color} rounded-t-2xl flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center p-6">
                    <div className="text-white text-xl font-bold mb-2">
                      {highlight.title}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {highlight.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold text-lg">•</span>
                        <span className="text-gray-200 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Partner Logo Area */}
                  <div className="mt-auto pt-6 border-t border-white/20">
                    <div className="bg-white/5 border border-white/20 rounded-lg p-4 text-center text-white">
                      <span className="text-2xl font-bold">
                        {highlight.partner}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
            <div className="text-5xl font-bold text-teal-400 mb-2">3</div>
            <div className="text-white/80 font-medium text-lg">Major External Partnerships</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
            <div className="text-5xl font-bold text-green-400 mb-2">National</div>
            <div className="text-white/80 font-medium text-lg">Media & Conference Exposure</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
            <div className="text-5xl font-bold text-blue-400 mb-2">2025</div>
            <div className="text-white/80 font-medium text-lg">Year of Recognition</div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-white/90 italic">
            "Building credibility and visibility in the national healthcare innovation landscape"
          </blockquote>
        </div>
      </div>
    </section>
  );
}
