'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 1,
    title: 'Edge Engage',
    description: 'Fostering innovation from within by soliciting and vetting innovative ideas from all 15,000+ Emplify Health employees. Breaking barriers and transforming healthcare through collaborative ideation.',
    category: 'Internal Innovation',
    impact: 'Empowering 15,000+ innovators',
    color: 'from-teal-500 to-cyan-500',
    logo: 'engage',
  },
  {
    id: 2,
    title: 'Edge Launch',
    description: 'Our incubation studio where ideas are transformed into ventures with impact. We nurture, validate, and build groundbreaking concepts using customer-centric methodology inspired by Silicon Valley.',
    category: 'Venture Studio',
    impact: 'Pipeline of transformative ventures',
    color: 'from-green-500 to-teal-500',
    logo: 'launch',
  },
  {
    id: 3,
    title: 'Edge Ventures',
    description: 'Dedicated fund investing in game-changing startups and emerging technology. Portfolio includes pioneers in gene editing, AI diagnostics, telehealth, and regenerative medicine.',
    category: 'Venture Capital',
    impact: '9+ portfolio companies',
    color: 'from-emerald-500 to-green-500',
    logo: 'ventures',
  },
  {
    id: 4,
    title: 'Digital Diagnostics',
    description: 'Portfolio company developing AI diagnostic technology transforming the quality, accessibility, and affordability of healthcare worldwide.',
    category: 'Portfolio: AI & Diagnostics',
    impact: 'Global healthcare transformation',
    color: 'from-blue-500 to-teal-500',
  },
  {
    id: 5,
    title: 'Recombinetics',
    description: 'Portfolio company pioneering gene editing technologies to improve human health through advanced disease models and regenerative medicine.',
    category: 'Portfolio: Gene Editing',
    impact: 'Next-gen regenerative medicine',
    color: 'from-purple-500 to-blue-500',
  },
  {
    id: 6,
    title: 'Genome Medical',
    description: 'Portfolio company providing counseling services to improve patient access to genetic counseling through scalable telehealth services.',
    category: 'Portfolio: Telehealth',
    impact: 'Democratizing genetic counseling',
    color: 'from-pink-500 to-purple-500',
  },
  {
    id: 7,
    title: 'KeyCare',
    description: "World's first virtual healthcare platform with Epic licensure, pairing office-based physicians with a tech-empowered virtual team to address healthcare inefficiencies.",
    category: 'Portfolio: Virtual Care',
    impact: 'Revolutionizing care delivery',
    color: 'from-orange-500 to-pink-500',
  },
  {
    id: 8,
    title: 'Makana Therapeutics',
    description: 'Portfolio company focused on solving the transplantable organ shortage crisis using genetically modified pigs to provide abundant donor organs.',
    category: 'Portfolio: Xenotransplantation',
    impact: 'Solving organ shortage crisis',
    color: 'from-red-500 to-orange-500',
  },
];

export default function Showcase() {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden pt-20" style={{ backgroundImage: 'url(/network-dark.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Transforming Healthcare
        </h2>
          <p className="text-xl text-gray-300">
            Catalysts of transformation through innovation, investment, and incubation
          </p>
        </div>

        <div className="relative">
          <ProjectCard project={projects[currentProject]} />
          
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevProject}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous project"
            >
              <svg className="w-6 h-6 text-white/70" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentProject 
                      ? 'bg-teal-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextProject}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Next project"
            >
              <svg className="w-6 h-6 text-white/70" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Project Counter */}
        <div className="text-center mt-6 text-gray-300">
          <span className="text-2xl font-semibold text-white">{currentProject + 1}</span>
          <span className="text-lg text-white/70"> / {projects.length}</span>
        </div>
      </div>
    </section>
  );
}
