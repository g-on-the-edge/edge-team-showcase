'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';

const engageProjects = [
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
    title: 'Innovation Pipeline',
    description: 'A structured process that takes ideas from submission through evaluation, prototyping, and implementation. Our systematic approach ensures every voice is heard and the best ideas move forward.',
    category: 'Process & Methodology',
    impact: 'Systematic innovation framework',
    color: 'from-teal-500 to-cyan-500',
    logo: 'engage',
  },
  {
    id: 3,
    title: 'Success Stories',
    description: 'Employee-generated ideas have transformed into real-world solutions, improving patient care, operational efficiency, and workplace culture across the entire Emplify Health system.',
    category: 'Impact & Results',
    impact: 'Ideas implemented system-wide',
    color: 'from-teal-500 to-cyan-500',
    logo: 'engage',
  },
  {
    id: 4,
    title: 'Innovation Culture',
    description: 'Building a culture where curiosity thrives, failure is embraced as learning, and every employee is empowered to contribute to the future of healthcare delivery.',
    category: 'Culture & Community',
    impact: 'Organization-wide transformation',
    color: 'from-teal-500 to-cyan-500',
    logo: 'engage',
  },
];

export default function EdgeEngage() {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % engageProjects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + engageProjects.length) % engageProjects.length);
  };

  return (
    <section className="relative z-20 h-screen flex items-center justify-center overflow-hidden pt-20 pb-8" style={{ backgroundImage: 'url(/network-dark.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10 flex flex-col h-full justify-center">
        <div className="text-center mb-4">
          <img 
            src="/Gundersen_Edge_RGB_wht-ENGAGE_lockup.png"
            alt="Edge Engage"
            className="h-10 md:h-12 w-auto mx-auto mb-2"
          />
          <p className="text-base md:text-lg text-gray-300">
            Fostering innovation from within through collaborative ideation
          </p>
        </div>

        <div className="relative flex-shrink">
          <ProjectCard project={engageProjects[currentProject]} />
          
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={prevProject}
              className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-teal-500 hover:bg-teal-400 shadow-lg flex items-center justify-center transition-all transform hover:scale-105"
              aria-label="Previous slide"
            >
              <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <div className="flex items-center gap-1.5">
              {engageProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentProject 
                      ? 'bg-teal-400 w-4' 
                      : 'bg-white/60 hover:bg-white w-1.5'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextProject}
              className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-teal-500 hover:bg-teal-400 shadow-lg flex items-center justify-center transition-all transform hover:scale-105"
              aria-label="Next slide"
            >
              <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-2 text-gray-300">
          <span className="text-base font-semibold text-white">{currentProject + 1}</span>
          <span className="text-sm text-white/70"> / {engageProjects.length}</span>
        </div>
      </div>
    </section>
  );
}
