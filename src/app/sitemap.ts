import type { MetadataRoute } from "next";
import { entries } from "@/lib/content";

const baseUrl = "https://spylink.security";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: "2026-10-23",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: "2026-10-23",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: "2026-10-18",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2026-10-23",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const content = entries.map((entry) => ({
    url: `${baseUrl}/learn/${entry.slug}`,
    lastModified: entry.date,
    changeFrequency: "monthly" as const,
    priority: entry.featured ? 0.8 : 0.6,
  }));

  return [...pages, ...content];
}
