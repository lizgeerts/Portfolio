// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.string(),
    cardDate: z.string(),

    image: image(),                 // hero image (detail page)
    cardImage: image(),  // card image (homepage)

    description: z.string(),                // hero
    cardDescription: z.string(),  // card

    partners: z.string(),
    labels: z.array(z.string()),
    role: z.string().optional(),
    technology: z.string().optional(),
    tools: z.string().optional(),

    buttons: z.array(z.object({
      id: z.string(),
      label: z.string(),
      href: z.string(),
      icon: z.string().optional(),
      placement: z.enum(["hero", "content"]),
    })),
  }),
});

export const collections = { projects };