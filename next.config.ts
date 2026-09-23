import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/duhpqf0ax/**",
      },
    ],
  },
  serverExternalPackages: ["@prisma/client", "prisma", "bcryptjs", "qrcode"],
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      { source: "/business/dashboard", destination: "/dashboard", permanent: false },
      { source: "/business/products", destination: "/dashboard/products", permanent: false },
      { source: "/business/serials", destination: "/dashboard/identities", permanent: false },
      { source: "/business/analytics", destination: "/dashboard/risk", permanent: false },
      { source: "/developers", destination: "/platform", permanent: false },
      { source: "/signup", destination: "/auth/signup", permanent: false },
      { source: "/login", destination: "/auth/login", permanent: false },
    ];
  },
};

export default nextConfig;
