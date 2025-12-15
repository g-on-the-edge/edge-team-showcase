import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/edge-team-showcase',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
