/**
 * Absolute origin for metadata (canonical URLs, Open Graph, sitemap).
 * Set NEXT_PUBLIC_SITE_URL once there's a custom domain; on Vercel the
 * production domain is picked up automatically.
 */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);
