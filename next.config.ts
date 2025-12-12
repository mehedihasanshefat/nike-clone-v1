import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // Replace with your image host
        port: "",
        pathname: "/**", // Use "/**" to allow all paths
      },
      {
        protocol: "https",
        hostname: "another-trusted-host.com", // Add more hosts as needed
      },
    ],
  },
};

export default nextConfig;
