'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';

const venturesProjects = [
  {
    id: 1,
    title: 'Digital Diagnostics',
    description: 'Portfolio company developing AI diagnostic technology transforming the quality, accessibility, and affordability of healthcare worldwide.',
    category: 'Portfolio: AI & Diagnostics',
    impact: 'Global healthcare transformation',
    color: 'from-blue-500 to-teal-500',
  },
  {
    id: 2,
    title: 'Recombinetics',
    description: 'Portfolio company pioneering gene editing technologies to improve human health through advanced disease models and regenerative medicine.',
    category: 'Portfolio: Gene Editing',
    impact: 'Next-gen regenerative medicine',
    color: 'from-purple-500 to-blue-500',
  },
  {
    id: 3,
    title: 'Genome Medical',
    description: 'Portfolio company providing counseling services to improve patient access to genetic counseling through scalable telehealth services.',
    category: 'Portfolio: Telehealth',
    impact: 'Democratizing genetic counseling',
    color: 'from-pink-500 to-purple-500',
  },
  {
    id: 4,
    title: 'KeyCare',
    description: "World's first virtual healthcare platform with Epic licensure, pairing office-based physicians with a tech-empowered virtual team to address healthcare inefficiencies.",
    category: 'Portfolio: Virtual Care',
    impact: 'Revolutionizing care delivery',
    color: 'from-orange-500 to-pink-500',
  },
  {
    id: 5,
    title: 'Makana Therapeutics',
    description: 'Portfolio company focused on solving the transplantable organ shortage crisis using genetically modified pigs to provide abundant donor organs.',
    category: 'Portfolio: Xenotransplantation',
    impact: 'Solving organ shortage crisis',
    color: 'from-red-500 to-orange-500',
  },
];

export default function EdgeVentures() {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % venturesProjects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + venturesProjects.length) % venturesProjects.length);
  };

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden pt-20" style={{ backgroundImage: 'url(/network-dark.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Edge Ventures
          </h2>
          <p className="text-xl text-gray-300">
            Investing in game-changing startups and emerging technology
          </p>
        </div>

        <div className="relative">
          <ProjectCard project={venturesProjects[currentProject]} />
          
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevProject}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Previous project"
            >
              <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <div className="flex items-center gap-2">
              {venturesProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentProject 
                      ? 'bg-teal-400 w-8' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextProject}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Next project"
            >
              <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Project Counter */}
        <div className="text-center mt-6 text-gray-300">
          <span className="text-2xl font-semibold text-white">{currentProject + 1}</span>
          <span className="text-lg text-white/70"> / {venturesProjects.length}</span>
        </div>
      </div>
    </section>
  );
}
