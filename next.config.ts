import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "shop.kuleta.io" },
      { protocol: "https", hostname: "dev-preview-1025.kuleta.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "media.licdn.com" },
    ],
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
