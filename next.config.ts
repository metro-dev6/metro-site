import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ["192.168.50.5"],
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.metroautodetailing.pro" }],
        destination: "https://metroautodetailing.pro/:path*",
        permanent: true,
      },
      { source: "/faq", destination: "/", permanent: true },
      { source: "/faq/", destination: "/", permanent: true },
      { source: "/exploring-the-latest-trends-in-limousine-interior-design-and-technology", destination: "/blog", permanent: true },
      { source: "/exploring-the-latest-trends-in-limousine-interior-design-and-technology/", destination: "/blog", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
