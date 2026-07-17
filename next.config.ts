import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Change 'standalone' to 'export'
  images: {
    unoptimized: true, // This is required for static export
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;