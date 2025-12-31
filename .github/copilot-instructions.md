# View From The Edge - AI Agent Instructions

## Project Overview

**View From The Edge** (aka Edge Team Innovation Showcase) is a modern marketing website showcasing the Edge Team's projects, achievements, and innovation methodology. It's a static Next.js site with interactive components and smooth animations.

**Tech Stack**: Next.js 16 + React 19, TypeScript, Tailwind CSS v4, Framer Motion, Static export for Netlify

---

## Critical Architecture Patterns

### Next.js App Router Structure

Single-page application using Next.js App Router:

- **Main Route**: `/` - Landing page with scroll sections
- **Component Architecture**: Modular sections (Hero, Showcase, Navigation)
- **Static Generation**: Entire site exported as static HTML/CSS/JS
- **TypeScript First**: All components are `.tsx` with strict typing

### Component Organization

```
src/
├── app/
│   ├── page.tsx          # Main landing page
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global Tailwind styles
└── components/
    ├── Navigation.tsx    # Top navigation bar
    ├── Hero.tsx          # Hero section with animations
    ├── Showcase.tsx      # Projects carousel
    └── ProjectCard.tsx   # Individual project cards
```

### Scroll-Based Sections

Landing page divided into scroll sections:

1. **Hero**: Brand introduction with animated elements
2. **Showcase**: Horizontal scrolling project carousel
3. **Methodology**: Edge Team's innovation approach
4. **Case Studies**: Success stories and metrics
5. **Contact**: Team information and links

### Animation System

Framer Motion powers all animations:

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {content}
</motion.div>
```

**Animation Patterns**:
- Fade in on scroll (IntersectionObserver)
- Stagger animations for lists
- Hover effects on cards
- Smooth page transitions

---

## Development Workflows

### Running the App

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Adding New Projects

Edit the projects array in `src/components/Showcase.tsx`:

```typescript
const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Brief project description",
    image: "/projects/project-image.jpg",
    tags: ["Healthcare", "AI", "Operations"],
    link: "/projects/project-name",
    metrics: {
      impact: "50% efficiency gain",
      timeline: "3 months",
      team: "5 people"
    }
  },
  // ... more projects
];
```

### Managing Assets

**Public Directory Structure**:
```
public/
├── backgrounds/   # Background images and patterns
├── brand/         # Logo files and brand assets
├── logos/         # Partner and client logos
├── methodology/   # Methodology diagrams and visuals
├── News/          # Press releases and articles
├── Events/        # Event photos and materials
└── projects/      # Project screenshots and images
```

**Asset Guidelines**:
- Use WebP format for images when possible
- Optimize images before adding (use Next.js Image)
- Remove spaces and special characters from filenames
- Use descriptive, kebab-case names

---

## Code Conventions

### TypeScript Usage

All components must be typed:

```typescript
// Component props interface
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

// Component with typed props
export default function ProjectCard({ 
  title, 
  description, 
  image, 
  tags, 
  link 
}: ProjectCardProps) {
  return (
    <div className="project-card">
      {/* ... */}
    </div>
  );
}
```

### Tailwind CSS v4 Patterns

```tsx
// Responsive grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Gradient backgrounds
<div className="bg-gradient-to-br from-blue-500 to-purple-600">

// Glass morphism effect
<div className="bg-white/10 backdrop-blur-lg border border-white/20">

// Hover states
<button className="hover:scale-105 transition-transform duration-300">
```

**Edge Brand Standards**: See `../../.github/DESIGN_SYSTEM.md` for shared design system across all Edge projects.

### Metadata Configuration

Each page should export metadata for SEO:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edge Team Innovation Showcase",
  description: "Showcasing cutting-edge healthcare innovation projects",
  keywords: ["healthcare", "innovation", "AI", "operations"],
  openGraph: {
    title: "Edge Team Innovation Showcase",
    description: "Showcasing cutting-edge healthcare innovation projects",
    images: ["/og-image.jpg"],
  },
};
```

---

## Key Domain Concepts

### Edge Team Projects

Project categories showcased:

- **Healthcare Operations**: Workflow optimization, capacity planning
- **AI & Machine Learning**: Predictive analytics, decision support
- **Facility Planning**: Master facility planning, space programming
- **Data Platforms**: Real-time dashboards, reporting systems

### Innovation Methodology

The Edge Team approach:

1. **Discovery**: Identify pain points and opportunities
2. **Design**: Prototype solutions with stakeholder input
3. **Development**: Agile implementation with rapid iteration
4. **Deployment**: Phased rollout with training and support
5. **Data**: Continuous monitoring and optimization

### Success Metrics

Project impacts tracked:

- Efficiency gains (time saved, cost reduction)
- Quality improvements (error reduction, satisfaction scores)
- Scalability (users served, facilities supported)
- ROI (financial impact, resource optimization)

---

## Common Gotchas

1. **Asset File Naming**: Always use kebab-case without spaces:
   ```
   ✅ edge-team-logo.png
   ❌ Edge Team Logo.png
   ```

2. **Static Export**: Don't use dynamic features requiring server:
   - No Server Actions
   - No dynamic API routes at runtime
   - No ISR or SSR
   - Use client-side data fetching if needed

3. **Framer Motion Client Directive**: Always add `'use client'` to components using Framer Motion:
   ```tsx
   'use client';
   import { motion } from 'framer-motion';
   ```

4. **Image Optimization**: Use Next.js Image component:
   ```tsx
   import Image from 'next/image';
   <Image 
     src="/projects/demo.jpg" 
     alt="Project Demo" 
     width={800} 
     height={600}
     className="rounded-lg"
   />
   ```

5. **Scroll Animations**: Use IntersectionObserver with Framer Motion:
   ```tsx
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true });
   
   <motion.div
     ref={ref}
     initial={{ opacity: 0 }}
     animate={isInView ? { opacity: 1 } : { opacity: 0 }}
   />
   ```

6. **Tailwind Purging**: Avoid dynamic class names:
   ```tsx
   ❌ className={`text-${color}-500`}  // Won't work
   ✅ className={color === 'blue' ? 'text-blue-500' : 'text-red-500'}
   ```

---

## Integration Points

- **Netlify**: Static hosting with automatic deployments
- **Framer Motion**: Animation library for all motion
- **Tailwind CSS v4**: Utility-first styling with PostCSS
- **Next.js Image**: Automatic image optimization
- **Analytics**: Google Analytics or similar (configure in layout)

---

## Reference Files for Patterns

- **Main page structure**: `src/app/page.tsx`
- **Component examples**: `src/components/Navigation.tsx`, `src/components/Showcase.tsx`
- **Animation patterns**: All components use Framer Motion
- **Tailwind configuration**: `postcss.config.mjs`, `src/app/globals.css`
- **Deployment config**: `netlify.toml` in edge-team-showcase folder

---

## Quick Start for AI Agents

1. **Single page focus**: Most content lives in `src/app/page.tsx` with modular components
2. **Projects in data**: Edit `src/components/Showcase.tsx` to add/modify projects
3. **Tailwind utilities**: Use existing utility classes, avoid custom CSS
4. **Framer Motion**: Check existing animations for patterns before creating new ones
5. **Asset management**: Place files in appropriate `public/` subdirectory
6. **Test locally**: Run `npm run dev` and `npm run build` to verify static export works

When adding new sections or projects, follow the established component patterns and animation styles for consistency.
