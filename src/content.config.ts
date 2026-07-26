import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Shared frontmatter schema reused across every content collection.
const postSchema = ({ image }: { image: () => z.ZodType }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.optional(image()),
		// Topic tags used for listing filters and related-post discovery.
		tags: z.array(z.string()).default([]),
		// Pin a post to the "Featured" row on the landing page.
		featured: z.boolean().default(false),
	});

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

const knowledgeBase = defineCollection({
	loader: glob({ base: './src/content/knowledge-base', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

const fintech = defineCollection({
	loader: glob({ base: './src/content/fintech', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

export const collections = { blog, knowledgeBase, fintech };
