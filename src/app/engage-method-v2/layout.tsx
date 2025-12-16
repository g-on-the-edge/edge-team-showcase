import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edge Engage Method | Strategic Execution Framework',
  description: 'A proven 3-phase methodology for transforming strategic goals into measurable outcomes through structured discovery, prioritization, and execution.',
  openGraph: {
    title: 'Edge Engage Method',
    description: 'Transform strategic goals into measurable outcomes',
    images: [{
      url: '/edge-team-showcase/Edge%20Engage%20Execution%20Method.jpg',
      width: 1200,
      height: 630,
      alt: 'Edge Engage Method Framework',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edge Engage Method',
    description: 'Transform strategic goals into measurable outcomes',
    images: ['/edge-team-showcase/Edge%20Engage%20Execution%20Method.jpg'],
  },
};

export default function EngageMethodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
