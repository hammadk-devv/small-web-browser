import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@small-web/shared'],
  // This hides the floating Next.js "N" logo in development
  devIndicators: false,
};

export default nextConfig;
