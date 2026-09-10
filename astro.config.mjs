// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Your live address. Change this to https://<your-github-username>.github.io
	// (or your own domain) before publishing — link previews and the RSS feed depend on it.
	site: 'https://example.github.io',
	integrations: [mdx(), sitemap()],
	// The post list lives on the home page.
	redirects: { '/blog': '/' },
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Newsreader',
			cssVariable: '--font-serif',
			weights: ['400', '500', '600'],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'serif'],
		},
	],
});
