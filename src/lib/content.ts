import {
	type CollectionEntry,
	type CollectionKey,
	getCollection,
} from 'astro:content';

/**
 * Drafts are visible while writing and absent from production builds.
 *
 * `astro dev` sets DEV, so localhost always shows everything. `astro build`
 * (local or on Vercel) sets PROD and strips drafts. Set `SHOW_DRAFTS=true` to
 * include them in a build — useful for checking how a draft renders in a
 * production build before publishing it.
 */
export const showDrafts =
	import.meta.env.DEV || import.meta.env.SHOW_DRAFTS === 'true';

/**
 * `getCollection` with drafts filtered out in production.
 *
 * Use this everywhere instead of `getCollection` — including in
 * `getStaticPaths`, so a draft has no route at all rather than an unlisted one.
 */
export async function getPosts<C extends CollectionKey>(
	collection: C,
): Promise<CollectionEntry<C>[]> {
	return getCollection(collection, ({ data }) => showDrafts || !data.draft);
}
