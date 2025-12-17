'use client';

import { motion } from 'framer-motion';

interface VideoPlayerProps {
  vimeoId: string;
  title?: string;
  description?: string;
}

export default function VideoPlayer({ vimeoId, title, description }: VideoPlayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      {title && (
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-white/60 mb-6 text-center">
          {description}
        </p>
      )}
      
      <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      {/* Optional gradient glow effect */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-gradient-to-r from-[#A8D4B8] via-[#3AACCF] to-[#E85A6F]" />
    </motion.div>
  );
}
