import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Frontend asks for "/api/predict"
        source: '/api/:path*',
        // Next.js on Vercel forwards it to your Hugging Face Space
        // Use the DIRECT API URL format for Hugging Face Spaces
        destination: 'https://sumoy47-medguard-api.hf.space/:path*',
      },
    ];
  },
};

export default nextConfig;