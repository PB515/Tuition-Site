import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Site images are compressed to WebP in the browser before upload, but
    // raise the Server Action body limit (default 1 MB) as a safety margin so
    // a slightly larger file reaches the action and gets a clear error message
    // instead of failing with a blank/404 page.
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
};

export default nextConfig;
