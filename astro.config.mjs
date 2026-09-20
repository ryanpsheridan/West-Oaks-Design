// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
	// TODO: confirm at launch. The client does not own a domain yet and gave
	// the business name as "West Oaks Design", so this is the matching apex.
	// This value is what canonical URLs, Open Graph URLs, the sitemap and
	// every absolute URL in the JSON-LD are built from, so it has to be the
	// real domain before the site is indexed — a wrong value here poisons all
	// of them at once.
	site: 'https://www.westoaksdesign.com',
	build: {
		// Inline all page CSS directly into the HTML instead of splitting it
		// into a separate hashed file. On a slow connection, an external
		// stylesheet request can lose the race with first paint, showing a
		// flash of unstyled (browser-default) content before it loads.
		inlineStylesheets: 'always',
	},
	integrations: [
		sitemap({
			// Internal and utility pages. All three are noindex'd at the page level too, but a
			// noindex page listed in a sitemap is a contradictory signal —
			// the sitemap says "index this", the page says "don't" — and
			// Search Console reports it as an error rather than resolving it.
			filter: (page) =>
				!page.includes('/style-guide') &&
				!page.includes('/setup') &&
				!page.includes('/pay'),
		}),
	],
});
