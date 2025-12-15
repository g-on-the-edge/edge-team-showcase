'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';

const launchProjects = [
  {
    id: 1,
    title: 'Edge Launch',
    description: 'Our incubation studio where ideas are transformed into ventures with impact. We nurture, validate, and build groundbreaking concepts using customer-centric methodology inspired by Silicon Valley.',
    category: 'Venture Studio',
    impact: 'Pipeline of transformative ventures',
    color: 'from-green-500 to-teal-500',
    logo: 'launch',
  },
];

export default function EdgeLaunch() {
  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden pt-20" style={{ backgroundImage: 'url(/network-light.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Edge Launch
          </h2>
          <p className="text-xl text-gray-300">
            Transforming ideas into ventures through our incubation studio
          </p>
        </div>

        <div className="relative">
          <ProjectCard project={launchProjects[0]} />
        </div>
      </div>
    </section>
  );
}
