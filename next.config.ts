import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  // Modern formats first; next/image picks the best one each browser supports.
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
