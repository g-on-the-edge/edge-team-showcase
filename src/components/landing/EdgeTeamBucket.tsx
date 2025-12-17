'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  'Ideation',
  'Product Design',
  'Storytelling',
  'Venture Building',
  'Program Development',
];

const values = [
  {
    name: 'Curious',
    description: 'We make breakthroughs and solve problems by asking questions, exploring possibilities, and cultivating empathy.',
    icon: '?',
  },
  {
    name: 'Fearless',
    description: 'We must be bold to be impactful. We apply every lesson we learn to the challenges ahead.',
    icon: '!',
  },
  {
    name: 'Open-Minded',
    description: 'Good ideas can come from anywhere and everywhere. If they have the potential to shape the future of healthcare, they\'re welcome here.',
    icon: '∞',
  },
  {
    name: 'Community-Focused',
    description: 'Our work harnesses the spirit of internal and external entrepreneurs, feeding the results of their innovations back into our organization and community.',
    icon: '♥',
  },
  {
    name: 'Forward-Thinking',
    description: 'Our eye is always on the horizon. We absorb information, imagine something better and determine ways to move beyond the edge of what\'s been done.',
    icon: '→',
  },
];

const teamMembers = [
  { name: 'Bill Farrell', title: 'Chief Strategy and Innovation Officer', photo: 'Photo_Bill.jpg' },
  { name: 'Greg LaPoint', title: 'Director of Innovation | Managing Partner', photo: 'Greg_ima.png' },
  { name: 'John Richards', title: 'Operations Partner', photo: 'Richards_John.jpg' },
  { name: 'Alicia Waletzko', title: 'Business Integration Partner', photo: 'Photo_Alicia.jpg' },
  { name: 'Justine Egner', title: 'Customer / Product Development Partner', photo: 'Justine.jpg' },
  { name: 'Arie Bachmann', title: 'Designer / Storyteller', photo: 'IMG_3895_2Arie.png' },
  { name: 'Lizzy Haucke', title: 'Operations Partner', photo: 'Lizzy_20240228_01.jpg' },
];

export default function EdgeTeamBucket() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' });

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: false, margin: '-10%' });

  const peopleRef = useRef<HTMLDivElement>(null);
  const peopleInView = useInView(peopleRef, { once: false, margin: '-10%' });

  const historyRef = useRef<HTMLDivElement>(null);
  const historyInView = useInView(historyRef, { once: false, margin: '-10%' });

  const missionRef = useRef<HTMLDivElement>(null);
  const missionInView = useInView(missionRef, { once: false, margin: '-10%' });

  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: false, margin: '-10%' });

  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: false, margin: '-10%' });

  return (
    <section
      ref={ref}
      id="team"
      className="bg-[#0F1D2F] py-24 px-6 relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E85A6F]/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Edge E Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logos/Gundersen_Edge_E_RGB_White.png`}
              alt="Edge"
              className="h-20 md:h-24 w-auto mx-auto"
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Who We Are
            </span>
          </motion.h2>

          {/* Intro paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-8"
          >
            Edge is a <span className="text-[#E85A6F] font-semibold">formidable force</span>, committed to making a substantial and enduring impact in healthcare. We excel in the skills necessary to discover innovative ideas and make them a reality.
          </motion.p>

          {/* Skills badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className="px-4 py-2 rounded-full bg-[#E85A6F]/10 border border-[#E85A6F]/30 text-white/80 text-sm font-medium"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* People First Section */}
        <motion.div
          ref={peopleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={peopleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-20 p-8 md:p-12 rounded-3xl bg-white/5 border border-[#E85A6F]/20 backdrop-blur-xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-[#E85A6F]/20 flex items-center justify-center">
                <span className="text-4xl text-[#E85A6F]">♥</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                People First
              </h3>
              <p className="text-white/70 leading-relaxed">
                In the dynamic realm of healthcare, we create a vibrant ecosystem where Emplify Health&apos;s{' '}
                <span className="text-[#A8D4B8] font-semibold">15,000-strong workforce</span>, advocates, subject matter experts, and Edge teams converge harmoniously. Together, we collaborate to forge a better and more inclusive future of healthcare, working towards the collective goal of improving healthcare for everyone.
              </p>
            </div>
          </div>
        </motion.div>

        {/* History Section */}
        <motion.div
          ref={historyRef}
          initial={{ opacity: 0, y: 30 }}
          animate={historyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={historyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-8"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E85A6F] to-[#FF9F40]">
              We&apos;ve Been Part of History
            </span>
            <br />
            <span className="text-white/90">Now Let&apos;s Make the Future</span>
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={historyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto space-y-6 text-white/70 leading-relaxed"
          >
            <p>
              Edge was formed within <span className="text-white font-medium">Gundersen Health System</span>, an innovation leader for nearly <span className="text-[#E85A6F] font-semibold">130 years</span>. GHS stands proudly with the best-known names in cancer and interventional care and has been recognized by the U.S. Department of Energy as a pioneer in green healthcare.
            </p>
            <p>
              Our history only got more robust following the merger between GHS and Bellin Health System to form <span className="text-[#A8D4B8] font-semibold">Emplify Health</span> – which now provides transformational care throughout Wisconsin, Minnesota, Iowa and Michigan&apos;s Upper Peninsula.
            </p>
            <p className="text-white/50 italic">
              All that&apos;s impressive. But it&apos;s not enough.
            </p>
            <p className="text-white font-medium">
              To further improve the lives of our patients, employees, community members, and fellow global citizens, we need an imagination hub. We need ideas from anyone and everyone. And we need to take our seat at the head of the innovation table.
            </p>
          </motion.div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          ref={missionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#E85A6F]/10 to-[#C41F3E]/10 border border-[#E85A6F]/30"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#E85A6F] mb-6 text-center">
            Our Mission
          </h3>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed text-center max-w-4xl mx-auto">
            Our mission is to <span className="text-white font-semibold">radically transform the future of healthcare</span> through innovation. Fueled by internal and community ideas, energized by other disruptors, and funded by our corporate ventures, we will harness the power of entrepreneurship, creativity, open-mindedness, and curiosity. Together we&apos;ll inspire, build, and distinguish ourselves by sharing healthcare innovations to benefit our organization, our community, our world.
          </p>
        </motion.div>

        {/* Values Section */}
        <motion.div
          ref={valuesRef}
          initial={{ opacity: 0, y: 30 }}
          animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Our Values
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#E85A6F]/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#E85A6F]/20 flex items-center justify-center mb-4 group-hover:bg-[#E85A6F]/30 transition-colors">
                  <span className="text-xl text-[#E85A6F]">{value.icon}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#E85A6F] transition-colors">
                  {value.name}
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Members Section */}
        <motion.div
          ref={teamRef}
          initial={{ opacity: 0, y: 30 }}
          animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Meet the Team
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={teamInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Photo */}
                <div className="relative mb-4">
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-3 border-[#E85A6F]/30 group-hover:border-[#E85A6F] transition-all duration-300 group-hover:scale-105">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/team/${member.photo}`}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-[#E85A6F]/0 group-hover:bg-[#E85A6F]/10 blur-xl transition-all duration-300 -z-10" />
                </div>

                {/* Name */}
                <h4 className="text-white font-semibold text-sm md:text-base mb-1 group-hover:text-[#E85A6F] transition-colors">
                  {member.name}
                </h4>

                {/* Title */}
                <p className="text-white/50 text-xs md:text-sm leading-snug">
                  {member.title}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F1D2F] to-transparent pointer-events-none" />
    </section>
  );
}
