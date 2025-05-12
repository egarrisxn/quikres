import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllPublicUsernamesWithLiveResume } from "@/lib/actions";
import { getUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const publicUsernames = await getAllPublicUsernamesWithLiveResume();

  const userResumePages: MetadataRoute.Sitemap = await Promise.all(
    publicUsernames.map(async (username) => {
      return {
        url: getUrl(username),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      };
    })
  );

  return [...staticPages, ...userResumePages];
}
