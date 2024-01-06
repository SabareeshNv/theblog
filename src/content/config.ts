import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      summary: z.string(),
      pubDate: z.string().transform((str) => new Date(str)),
      tags: z.array(z.string()),
      coverImage: image(),
      coverAlt: z.string().default("No Alt Specified"),
      draft: z.boolean().optional().default(false),
    }),
});

export const collections = { blog };
