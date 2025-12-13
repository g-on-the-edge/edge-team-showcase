# Edge Team Innovation Showcase

A modern, interactive web application showcasing the innovative projects and achievements of the Edge Team. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern Design**: Clean, professional interface with smooth animations
- 📱 **Responsive**: Fully responsive design that works on all devices
- ⚡ **Fast**: Built with Next.js for optimal performance
- 🎯 **Interactive**: Smooth scrolling transitions and project carousel
- 🚀 **Easy to Deploy**: Ready to deploy on Vercel, Netlify, or any platform

## Project Structure

```
edge-team-showcase/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page with scroll sections
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── components/
│       ├── Navigation.tsx    # Top navigation bar
│       ├── Hero.tsx         # Hero/landing section
│       ├── Showcase.tsx     # Projects showcase section
│       └── ProjectCard.tsx  # Individual project card
├── public/                   # Static assets
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page will auto-reload as you edit files.

### Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Customization

### Adding Projects

Edit [`src/components/Showcase.tsx`](src/components/Showcase.tsx) and update the `projects` array:

```typescript
const projects = [
  {
    id: 1,
    title: 'Your Project Title',
    description: 'Project description...',
    category: 'Category Name',
    impact: 'Key metric or achievement',
    color: 'from-blue-500 to-cyan-500', // Tailwind gradient
  },
  // Add more projects...
];
```

### Styling

- Global styles: [`src/app/globals.css`](src/app/globals.css)
- Component styles: Inline Tailwind CSS classes
- Colors: Update gradient colors in project objects

### Sections

- **Hero**: [`src/components/Hero.tsx`](src/components/Hero.tsx)
- **Showcase**: [`src/components/Showcase.tsx`](src/components/Showcase.tsx)
- **Navigation**: [`src/components/Navigation.tsx`](src/components/Navigation.tsx)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

Build the static site:

```bash
npm run build
```

Deploy the `.next` folder to your hosting provider.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React 19](https://react.dev/) - UI library

## License

MIT

## Support

For questions or issues, please contact the Edge Team.
