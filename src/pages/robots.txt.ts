import type { APIRoute } from 'astro';
import { SITE_INDEXABLE } from '../site-flags.mjs';

// robots.txt is generated rather than shipped as a static file in public/, so
// it can follow SITE_INDEXABLE along with the meta tags and the sitemap. A
// static file would be a fourth place to remember at launch.
//
// Crawling stays ALLOWED even while the site is noindex. See the long note on
// SITE_INDEXABLE: a crawler that is blocked never reads the noindex, and the
// URL can still surface as a bare link. Letting it in to read the directive is
// what keeps the site out of the index.
const body = (site: URL | undefined) => {
	const lines = [
		'User-agent: *',
		'Allow: /',
		'',
		'# Internal design-system reference, not customer-facing. It is also',
		"# noindex'd at the page level; this is the belt-and-braces half.",
		'Disallow: /style-guide/',
	];

	if (SITE_INDEXABLE && site) {
		lines.push('', `Sitemap: ${new URL('sitemap-index.xml', site).toString()}`);
	} else {
		lines.push(
			'',
			'# Preview build. Every page sends `noindex, nofollow`, so this site is',
			'# reachable by anyone with the link and findable by nobody. No sitemap',
			'# is published while that is true. Flip SITE_INDEXABLE in',
			'# src/site-flags.mjs at launch.'
		);
	}

	return lines.join('\n') + '\n';
};

export const GET: APIRoute = ({ site }) =>
	new Response(body(site), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
