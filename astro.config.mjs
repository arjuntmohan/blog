// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Your live address. Link previews and the RSS feed depend on it,
	// so update it if the domain ever changes.
	site: 'https://blog.arjuntmohan.com',
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
