import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/celpip-guide",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
