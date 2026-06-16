import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/theme2", destination: "/", permanent: false },
      { source: "/theme3", destination: "/", permanent: false },
      { source: "/theme4", destination: "/", permanent: false },
      { source: "/theme4/search", destination: "/search", permanent: false },
      { source: "/theme4/car/:id*", destination: "/car/:id*", permanent: false },
      { source: "/theme4/policies/:path*", destination: "/policies/:path*", permanent: false },
      { source: "/our-fleets", destination: "/search", permanent: false },
      { source: "/search-your-car", destination: "/search", permanent: false },
      { source: "/track-order", destination: "/account", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "mobiscarrental.com.au",
      },
    ],
  },
};

export default nextConfig;
