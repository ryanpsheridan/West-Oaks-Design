import type { APIRoute } from 'astro';

// Placeholder brand mark: a simplified oak canopy over a trunk, on the brand
// field colour. The starter generates a letter from SITE_TITLE instead, but a
// single "W" says nothing about what this business does, and West Oaks has a
// literal namesake to draw — so this route draws that instead.
//
// Deliberately coarse: a favicon renders at 16px, where a realistic canopy
// turns to mush. Three overlapping lobes and a wide trunk still read as a tree
// at that size, which is the only thing this has to do.
//
// Replace this whole route with a static public/favicon.svg once the client
// has real branding — see CLAUDE.md, "First Steps On A New Client Project".
//
// The fills come from tokens.css, parsed at build time — this is a static
// asset and can't read a CSS custom property, but it shouldn't need hand-syncing
// either. See src/lib/brand.ts.
import { BRAND_COLOR as BRAND, BRAND_CONTRAST as CONTRAST } from '../lib/brand';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="West Oaks Design"><rect width="32" height="32" rx="7" fill="${BRAND}"/><g fill="${CONTRAST}"><circle cx="16" cy="12" r="6.2"/><circle cx="10" cy="15" r="4.6"/><circle cx="22" cy="15" r="4.6"/><rect x="14.4" y="16" width="3.2" height="9" rx="1.2"/></g></svg>`;

export const GET: APIRoute = () =>
	new Response(svg, {
		headers: { 'Content-Type': 'image/svg+xml' },
	});
