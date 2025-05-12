import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  if (
    process.env.VERCEL_ENV !== "production" ||
    process.env.NODE_ENV !== "production"
  ) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "*",
        },
      ],
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/preview/", "/upload/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
