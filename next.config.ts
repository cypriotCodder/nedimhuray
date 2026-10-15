import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No cacheComponents: every route is plain static output, so <Link> prefetches
  // whole case studies and the cover morph has its destination ready on click.
  turbopack: {
    // Pin the root: a package-lock.json higher up (in $HOME) confuses auto-detection.
    root: path.resolve(process.cwd()),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
