import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Every Markdown file in src/content/blog/ becomes a post.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			// Lowercase tags like ['tech', 'ai']. Each tag gets its own page at /tags/<tag>/.
			tags: z.array(z.string()).default([]),
			// Drafts show up while you preview locally but never on the live site.
			draft: z.boolean().default(false),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog };
