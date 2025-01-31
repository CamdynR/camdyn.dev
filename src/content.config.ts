import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional()
  })
});

const music = defineCollection({
  // Load Markdown and MDX files in the `src/content/music/` directory.
  loader: glob({ base: './src/content/music', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    // Transform string to Date object
    pubDate: z.coerce.date(),
    description: z.coerce.string(),
    artist: z.coerce.string().optional(),
    playlist: z.coerce.string().optional(),
    album: z.coerce.string().optional(),
    tracks: z.coerce.string().optional()
  })
});

export const collections = { blog, music };
