import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/spacestagram" : "";

const nextConfig: NextConfig = {
  basePath: basePath,
  assetPrefix: basePath,
  output: "export",
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images-assets.nasa.gov",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
