/**
 * Generates the first-draft placeholder imagery.
 *
 * Deliberately plain grey boxes. An earlier pass drew illustrated landscape
 * scenes here, which was a mistake: a placeholder's whole job is to hold the
 * space and read unmistakably as "a photo goes here". Anything more detailed
 * than that competes with the layout you are trying to judge, and invites
 * feedback on artwork nobody is going to ship.
 *
 * One file per intended photo rather than one shared file, so replacing a
 * photo later is a drop-in at the same path with no page edits — and so each
 * one keeps its own descriptive filename, caption and alt text in the
 * meantime.
 *
 * Run: node scripts/generate-placeholders.mjs
 * Delete this script, and everything it writes, once real photos land — see
 * CLAUDE.md, "Gallery / Photo Uploads" for the naming convention they follow.
 */
import { mkdir, writeFile, readdir, unlink, readFile } from 'node:fs/promises';
import sharp from 'sharp';

// Read the brand colours out of tokens.css rather than pasting them here.
// This script's output is a static PNG, so a stale hex would ship a social
// card in a colour the site no longer uses — which is exactly what happened
// across the last two re-themes.
const tokens = await readFile('src/styles/tokens.css', 'utf8');
const token = (name) => {
	const match = tokens.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{3,8})\\s*;`));
	if (!match) throw new Error(`--${name} not found as a literal hex in tokens.css`);
	return match[1];
};
const BRAND = token('color-brand');
const BRAND_HOVER = token('color-brand-hover');
const TINT_SAND = token('tint-sand');

// Neutral on purpose, and not drawn from tokens.css. These are scaffolding,
// not part of the design — a placeholder tinted to the brand palette starts
// looking like a considered choice rather than a gap.
const FILL = '#E8E8E6';
const LINE = '#D6D6D3';
const GLYPH = '#AFAFAB';

const W = 1600;
const H = 1200;

/**
 * A grey box with a faint image glyph centred in it. The glyph is the one
 * concession to pure flat colour: an empty rectangle is indistinguishable
 * from an image that failed to load, and "is this broken?" is not a question
 * worth fielding during a draft review.
 */
const box = (label) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">
	<title>${label}</title>
	<rect width="${W}" height="${H}" fill="${FILL}"/>
	<rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke="${LINE}" stroke-width="2"/>
	<g transform="translate(${W / 2} ${H / 2})" fill="none" stroke="${GLYPH}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
		<rect x="-90" y="-70" width="180" height="140" rx="12"/>
		<circle cx="-36" cy="-24" r="18"/>
		<path d="M-90 40l56-52 44 42 26-24 54 50"/>
	</g>
</svg>`;

// The intended subject of each photo, kept as the filename so the client can
// see at a glance which photo is missing from where.
const slugs = [
	'oak-motte-meadow',
	'live-oak-canopy',
	'native-planting-beds',
	'limestone-terrace',
	'pergola-shade-structure',
	'dry-stack-retaining-wall',
	'irrigation-zone',
	'evening-path-lighting',
	'site-plan-drawing',
	'crew-on-site',
	'maintenance-visit',
];

const outDir = 'public/images/gallery';
await mkdir(outDir, { recursive: true });

// Clear anything this script wrote previously, so a renamed or dropped slug
// doesn't leave an orphan file behind that nothing references.
for (const file of await readdir(outDir)) {
	if (file.endsWith('.svg')) await unlink(`${outDir}/${file}`);
}

for (const slug of slugs) {
	await writeFile(`${outDir}/${slug}.svg`, box('Photo placeholder').replace(/\n\t*/g, ''));
}
console.log(`wrote ${slugs.length} placeholder boxes to ${outDir}/`);

// The Open Graph image has to be a raster: X, Slack, iMessage and LinkedIn
// all refuse SVG, so a link preview would silently fall back to nothing.
// This one is not a photo placeholder — it is the actual social card, a
// typographic brand asset that works as-is until the client has a logo, so
// it stays on the brand colour rather than becoming a grey box.
const OGW = 1200;
const OGH = 630;
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="${OGW}" height="${OGH}" viewBox="0 0 ${OGW} ${OGH}">
	<rect width="${OGW}" height="${OGH}" fill="${BRAND}"/>
	<ellipse cx="${OGW * 0.5}" cy="${OGH * 1.25}" rx="${OGW * 0.9}" ry="${OGH * 0.6}" fill="${BRAND_HOVER}"/>
	<text x="80" y="290" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="88" font-weight="500" letter-spacing="-2.5" fill="#FFFFFF">West Oaks Design</text>
	<text x="80" y="366" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="38" font-weight="400" fill="${TINT_SAND}">Landscape design, build and stewardship</text>
	<text x="80" y="424" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="30" font-weight="400" fill="${TINT_SAND}" opacity="0.8">Austin and the Texas Hill Country</text>
</svg>`;

await mkdir('public/images', { recursive: true });
await sharp(Buffer.from(og)).png().toFile('public/images/og-default.png');
console.log('wrote public/images/og-default.png');
