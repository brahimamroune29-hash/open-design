import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: false,
    // Restrict allowed image domains — add entries only when genuinely needed
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    serverActions: {
      // Keep the body limit tight — raise only if a specific feature requires it
      bodySizeLimit: "1mb",
    },
  },
  // Redirect HTTP → HTTPS in production automatically
  async redirects() {
    return process.env.NODE_ENV === "production"
      ? [
          {
            source: "/:path*",
            has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
            destination: "https://:host/:path*",
            permanent: true,
          },
        ]
      : [];
  },
  // Prevent sensitive Next.js headers from leaking
  poweredByHeader: false,
};

export default nextConfig;
