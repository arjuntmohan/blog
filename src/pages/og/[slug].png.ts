import type { APIRoute, GetStaticPaths } from 'astro';
import { SITE } from '../../consts';
import { getPosts } from '../../lib/posts';
import { renderCard } from '../../lib/og';

export const getStaticPaths = (async () => {
	const posts = await getPosts();
	return [
		{ params: { slug: 'site' }, props: { title: SITE.tagline, kicker: 'Blog' } },
		...posts.map((post) => ({
			params: { slug: post.id },
			props: { title: post.data.title, kicker: post.data.tags[0] ?? 'Blog' },
		})),
	];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
	const png = await renderCard(props.title, props.kicker);
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
