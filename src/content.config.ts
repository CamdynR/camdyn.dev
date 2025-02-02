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

const photos = defineCollection({
  // Load Markdown and MDX files in the `src/content/music/` directory.
  loader: glob({ base: './src/content/photos', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    shootDates: z.array(z.coerce.date()),
    locations: z.array(z.string()),
    cameras: z.array(z.string()),
    lenses: z.array(z.string()).optional(),
    films: z.array(z.string())
  })
});

const music = defineCollection({
  // Load Markdown and MDX files in the `src/content/music/` directory.
  loader: glob({ base: './src/content/music', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    // Transform string to Date object
    pubDate: z.coerce.date(),
    description: z.string(),
    artist: z.string().optional(),
    playlist: z.string().optional(),
    album: z.string().optional(),
    tracks: z.array(z.string()).optional()
  })
});

export const collections = { blog, photos, music };
