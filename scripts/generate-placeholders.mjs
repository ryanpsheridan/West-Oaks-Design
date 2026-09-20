/**
 * Generates the first-draft placeholder imagery.
 *
 * These stand in for the client's real photography, which doesn't exist yet.
 * They are drawn rather than stock-sourced on purpose: a drawn scene in the
 * site's own palette shows the layout working at the right density without
 * ever being mistaken for a real project photo, and it costs no licence and
 * no third-party request. Every one is a few hundred bytes of SVG.
 *
 * Run: node scripts/generate-placeholders.mjs
 * Delete this script, and everything it writes, once real photos land — see
 * CLAUDE.md, "Gallery / Photo Uploads" for the naming convention they follow.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// Sampled from tokens.css. Kept as literals because this is a build-time
// script with no CSS custom properties to read.
const C = {
	brand: '#17403A',
	brandDeep: '#12332E',
	ink: '#0A1A16',
	sage: '#DDE4DC',
	moss: '#E9EDE5',
	mist: '#E3E9E8',
	clay: '#EBE2D8',
	bone: '#F3EFE8',
	limestone: '#D9CFBF',
	canopy: '#2F5E4E',
	canopyLight: '#4A7A62',
	white: '#FFFFFF',
};

const W = 1600;
const H = 1200;

/** A canopy: overlapping lobes over a trunk, sized and placed by the caller. */
const tree = (x, y, r, fill, trunk = C.ink) => `
	<rect x="${x - r * 0.09}" y="${y}" width="${r * 0.18}" height="${r * 1.5}" fill="${trunk}" opacity="0.75"/>
	<circle cx="${x}" cy="${y - r * 0.45}" r="${r * 0.72}" fill="${fill}"/>
	<circle cx="${x - r * 0.62}" cy="${y - r * 0.05}" r="${r * 0.52}" fill="${fill}"/>
	<circle cx="${x + r * 0.62}" cy="${y - r * 0.05}" r="${r * 0.52}" fill="${fill}"/>`;

/** A soft horizon band, drawn as a wide ellipse clipped by the frame. */
const ridge = (cy, rx, ry, fill) =>
	`<ellipse cx="${W / 2}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/>`;

/** Flagstone / paver field in perspective — the hardscape scenes. */
const pavers = (top, rows, cols, fill, stroke) => {
	let out = '';
	for (let r = 0; r < rows; r++) {
		const y = top + (H - top) * (r / rows) ** 1.35;
		const yN = top + (H - top) * ((r + 1) / rows) ** 1.35;
		const spread = 0.35 + 0.65 * (r / rows);
		const spreadN = 0.35 + 0.65 * ((r + 1) / rows);
		for (let c = 0; c < cols; c++) {
			const x1 = W / 2 + (c - cols / 2) * (W / cols) * spread;
			const x2 = W / 2 + (c + 1 - cols / 2) * (W / cols) * spread;
			const x3 = W / 2 + (c + 1 - cols / 2) * (W / cols) * spreadN;
			const x4 = W / 2 + (c - cols / 2) * (W / cols) * spreadN;
			out += `<polygon points="${x1},${y} ${x2},${y} ${x3},${yN} ${x4},${yN}" fill="${fill}" stroke="${stroke}" stroke-width="3" opacity="${0.55 + 0.4 * (r / rows)}"/>`;
		}
	}
	return out;
};

/** Pergola rafters in perspective. */
const rafters = (n, top, height, fill) => {
	let out = '';
	for (let i = 0; i < n; i++) {
		const t = i / (n - 1);
		const x = W * (0.08 + 0.84 * t);
		out += `<rect x="${x - 9}" y="${top}" width="18" height="${height}" rx="4" fill="${fill}" opacity="0.9"/>`;
	}
	return out;
};

const frame = (body, label) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">
	<title>${label}</title>
	<clipPath id="f"><rect width="${W}" height="${H}"/></clipPath>
	<g clip-path="url(#f)">${body}</g>
</svg>`;

const scenes = {
	// --- Planting / tree care -------------------------------------------------
	'oak-motte-meadow': frame(
		`<rect width="${W}" height="${H}" fill="${C.mist}"/>
		<circle cx="${W * 0.78}" cy="${H * 0.2}" r="110" fill="${C.bone}"/>
		${ridge(H * 0.82, W * 0.95, H * 0.32, C.sage)}
		${ridge(H * 0.98, W * 1.1, H * 0.34, C.canopyLight)}
		${tree(W * 0.3, H * 0.62, 230, C.canopy)}
		${tree(W * 0.58, H * 0.68, 150, C.brand)}
		${tree(W * 0.72, H * 0.71, 110, C.canopy)}`,
		'Placeholder illustration: a motte of live oaks over a meadow'
	),
	'live-oak-canopy': frame(
		`<rect width="${W}" height="${H}" fill="${C.bone}"/>
		${ridge(H * 1.02, W * 1.2, H * 0.3, C.sage)}
		${tree(W * 0.5, H * 0.72, 380, C.brand)}
		${tree(W * 0.14, H * 0.8, 150, C.canopyLight)}
		${tree(W * 0.88, H * 0.8, 150, C.canopyLight)}`,
		'Placeholder illustration: a single mature live oak with a wide canopy'
	),
	'native-planting-beds': frame(
		`<rect width="${W}" height="${H}" fill="${C.moss}"/>
		${ridge(H * 0.5, W * 1.15, H * 0.2, C.sage)}
		${tree(W * 0.12, H * 0.48, 150, C.canopy)}
		${tree(W * 0.9, H * 0.46, 130, C.brand)}
		<path d="M${W * 0.44} ${H * 0.54} L${W * 0.56} ${H * 0.54} L${W * 0.82} ${H} L${W * 0.18} ${H}Z" fill="${C.limestone}"/>
		${Array.from({ length: 6 }, (_, r) => {
			const y = H * 0.56 + (H * 0.44) * (r / 6) ** 1.3;
			const inset = 0.06 + 0.14 * (r / 6);
			return `<line x1="${W * (0.5 - inset)}" y1="${y}" x2="${W * (0.5 + inset)}" y2="${y}" stroke="${C.bone}" stroke-width="5"/>`;
		}).join('')}
		${[[0.1, 0.62, 170, C.canopyLight], [0.26, 0.74, 200, C.canopy], [0.9, 0.62, 170, C.canopyLight], [0.76, 0.76, 210, C.canopy]]
			.map(([t, v, r, fill]) => `<ellipse cx="${W * t}" cy="${H * v}" rx="${r}" ry="${r * 0.62}" fill="${fill}"/>`)
			.join('')}
		${Array.from({ length: 14 }, (_, i) => {
			const side = i % 2 ? 1 : -1;
			const x = W * 0.5 + side * W * (0.13 + 0.025 * Math.floor(i / 2));
			const y = H * (0.66 + 0.045 * Math.floor(i / 2));
			return `<path d="M${x} ${y} q26 -90 0 -140 q-26 50 0 140Z" fill="${C.sage}" opacity="0.85"/>`;
		}).join('')}`,
		'Placeholder illustration: native planting beds flanking a stone path'
	),

	// --- Hardscape ------------------------------------------------------------
	'limestone-terrace': frame(
		`<rect width="${W}" height="${H}" fill="${C.mist}"/>
		${ridge(H * 0.42, W * 1.1, H * 0.2, C.sage)}
		${tree(W * 0.2, H * 0.38, 170, C.canopy)}
		${tree(W * 0.82, H * 0.36, 140, C.brand)}
		${pavers(H * 0.46, 6, 6, C.limestone, C.bone)}`,
		'Placeholder illustration: a limestone terrace stepping down to a lawn'
	),
	'pergola-shade-structure': frame(
		`<rect width="${W}" height="${H}" fill="${C.bone}"/>
		${ridge(H * 0.62, W * 1.1, H * 0.22, C.sage)}
		${tree(W * 0.88, H * 0.52, 190, C.canopyLight)}
		<rect x="${W * 0.06}" y="${H * 0.16}" width="${W * 0.88}" height="26" rx="8" fill="${C.brand}"/>
		${rafters(11, H * 0.2, H * 0.06, C.brandDeep)}
		<rect x="${W * 0.08}" y="${H * 0.2}" width="26" height="${H * 0.62}" rx="8" fill="${C.brand}"/>
		<rect x="${W * 0.89}" y="${H * 0.2}" width="26" height="${H * 0.62}" rx="8" fill="${C.brand}"/>
		${pavers(H * 0.8, 3, 6, C.limestone, C.clay)}`,
		'Placeholder illustration: a cedar pergola over a paved seating area'
	),
	'dry-stack-retaining-wall': frame(
		`<rect width="${W}" height="${H}" fill="${C.moss}"/>
		${ridge(H * 0.3, W * 1.2, H * 0.18, C.sage)}
		${tree(W * 0.26, H * 0.3, 150, C.canopy)}
		${tree(W * 0.7, H * 0.26, 120, C.brand)}
		<rect y="${H * 0.46}" width="${W}" height="${H * 0.2}" fill="${C.limestone}"/>
		${Array.from({ length: 3 }, (_, r) =>
			Array.from({ length: 9 }, (_, c) => {
				const off = r % 2 ? (W / 9) * 0.5 : 0;
				return `<rect x="${(W / 9) * c + off - 40}" y="${H * 0.46 + r * (H * 0.067)}" width="${W / 9 - 8}" height="${H * 0.058}" rx="6" fill="${C.clay}" stroke="${C.bone}" stroke-width="3"/>`;
			}).join('')
		).join('')}
		<rect y="${H * 0.66}" width="${W}" height="${H * 0.34}" fill="${C.sage}"/>`,
		'Placeholder illustration: a dry-stacked limestone retaining wall'
	),

	// --- Water / light --------------------------------------------------------
	'irrigation-zone': frame(
		`<rect width="${W}" height="${H}" fill="${C.mist}"/>
		${ridge(H * 0.46, W * 1.15, H * 0.18, C.sage)}
		${tree(W * 0.07, H * 0.44, 140, C.canopy)}
		${tree(W * 0.94, H * 0.44, 140, C.canopy)}
		<rect y="${H * 0.52}" width="${W}" height="${H * 0.48}" fill="${C.canopy}"/>
		${Array.from({ length: 5 }, (_, i) => {
			const x = W * (0.14 + 0.18 * i);
			const y = H * (0.78 + (i % 2) * 0.06);
			const spread = 200;
			return `<path d="M${x} ${y} q-${spread} -${spread * 1.5} 0 -${spread * 1.9} q${spread} ${spread * 0.4} 0 ${spread * 1.9}Z" fill="${C.mist}" opacity="0.55"/>` +
				`<path d="M${x} ${y} q-${spread * 0.55} -${spread} 0 -${spread * 1.25} q${spread * 0.55} ${spread * 0.25} 0 ${spread * 1.25}Z" fill="${C.bone}" opacity="0.8"/>` +
				`<circle cx="${x}" cy="${y}" r="15" fill="${C.ink}"/>`;
		}).join('')}`,
		'Placeholder illustration: an irrigation zone spraying across planting'
	),
	'evening-path-lighting': frame(
		`<rect width="${W}" height="${H}" fill="${C.brandDeep}"/>
		<circle cx="${W * 0.5}" cy="${H * 0.3}" r="${W * 0.55}" fill="${C.brand}" opacity="0.7"/>
		${tree(W * 0.18, H * 0.58, 200, C.ink)}
		${tree(W * 0.84, H * 0.56, 170, C.ink)}
		${Array.from({ length: 4 }, (_, i) => {
			const x = W * (0.32 + 0.12 * i);
			const y = H * (0.66 + 0.07 * i);
			return `<path d="M${x} ${y} l-70 130 h140Z" fill="${C.clay}" opacity="0.5"/><circle cx="${x}" cy="${y}" r="11" fill="${C.bone}"/>`;
		}).join('')}
		${pavers(H * 0.74, 3, 5, C.brand, C.canopy)}`,
		'Placeholder illustration: low-voltage path lighting at dusk'
	),

	// --- Process / people -----------------------------------------------------
	'site-plan-drawing': frame(
		`<rect width="${W}" height="${H}" fill="${C.bone}"/>
		${Array.from({ length: 20 }, (_, i) => `<line x1="0" y1="${(H / 20) * i}" x2="${W}" y2="${(H / 20) * i}" stroke="${C.limestone}" stroke-width="2" opacity="0.5"/>`).join('')}
		${Array.from({ length: 26 }, (_, i) => `<line x1="${(W / 26) * i}" y1="0" x2="${(W / 26) * i}" y2="${H}" stroke="${C.limestone}" stroke-width="2" opacity="0.5"/>`).join('')}
		<rect x="${W * 0.12}" y="${H * 0.16}" width="${W * 0.34}" height="${H * 0.38}" rx="10" fill="none" stroke="${C.brand}" stroke-width="8"/>
		<path d="M${W * 0.5} ${H * 0.3} h${W * 0.34} v${H * 0.42} h-${W * 0.2}" fill="none" stroke="${C.brand}" stroke-width="8" stroke-dasharray="28 18"/>
		<circle cx="${W * 0.62}" cy="${H * 0.24}" r="70" fill="none" stroke="${C.canopy}" stroke-width="7"/>
		<circle cx="${W * 0.76}" cy="${H * 0.78}" r="95" fill="none" stroke="${C.canopy}" stroke-width="7"/>
		<circle cx="${W * 0.24}" cy="${H * 0.76}" r="80" fill="none" stroke="${C.canopy}" stroke-width="7"/>
		<rect x="${W * 0.16}" y="${H * 0.24}" width="${W * 0.26}" height="${H * 0.22}" fill="${C.mist}" opacity="0.8"/>`,
		'Placeholder illustration: a hand-drafted site plan over a grid'
	),
	'crew-on-site': frame(
		`<rect width="${W}" height="${H}" fill="${C.mist}"/>
		${ridge(H * 0.7, W * 1.1, H * 0.26, C.sage)}
		${tree(W * 0.14, H * 0.54, 190, C.canopy)}
		${tree(W * 0.88, H * 0.5, 160, C.brand)}
		${[0.38, 0.5, 0.62].map((t, i) => {
			const x = W * t;
			const y = H * (0.66 + (i % 2) * 0.03);
			return `<circle cx="${x}" cy="${y - 120}" r="46" fill="${C.brand}"/><path d="M${x - 62} ${y + 140} v-90 a62 62 0 0 1 124 0 v90Z" fill="${C.canopy}"/>`;
		}).join('')}
		${pavers(H * 0.82, 2, 5, C.limestone, C.clay)}`,
		'Placeholder illustration: a crew walking a property during a site visit'
	),
	'maintenance-visit': frame(
		`<rect width="${W}" height="${H}" fill="${C.moss}"/>
		${ridge(H * 0.44, W * 1.15, H * 0.2, C.sage)}
		${tree(W * 0.34, H * 0.46, 260, C.brand)}
		${tree(W * 0.74, H * 0.5, 180, C.canopy)}
		<rect y="${H * 0.72}" width="${W}" height="${H * 0.28}" fill="${C.canopyLight}"/>
		${Array.from({ length: 7 }, (_, i) => `<path d="M${W * (0.08 + 0.14 * i)} ${H * 0.98} q30 -120 0 -180 q-30 60 0 180Z" fill="${C.sage}" opacity="0.6"/>`).join('')}`,
		'Placeholder illustration: seasonal maintenance under an established canopy'
	),
};

const outDir = 'public/images/gallery';
await mkdir(outDir, { recursive: true });

for (const [slug, svg] of Object.entries(scenes)) {
	await writeFile(`${outDir}/${slug}.svg`, svg.replace(/\n\t*/g, ''));
}
console.log(`wrote ${Object.keys(scenes).length} scenes to ${outDir}/`);

// The Open Graph image has to be a raster: X, Slack, iMessage and LinkedIn all
// refuse SVG, so a link preview would silently fall back to nothing. Rendered
// here from the same vocabulary at the 1.91:1 ratio OG expects.
const OGW = 1200;
const OGH = 630;
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="${OGW}" height="${OGH}" viewBox="0 0 ${OGW} ${OGH}">
	<rect width="${OGW}" height="${OGH}" fill="${C.brand}"/>
	<ellipse cx="${OGW * 0.5}" cy="${OGH * 1.25}" rx="${OGW * 0.9}" ry="${OGH * 0.6}" fill="${C.brandDeep}"/>
	<g transform="translate(${OGW * 0.78} ${OGH * 0.52}) scale(1.1)">
		<rect x="-16" y="0" width="32" height="150" rx="10" fill="${C.canopy}"/>
		<circle cx="0" cy="-60" r="118" fill="${C.canopy}"/>
		<circle cx="-96" cy="-6" r="84" fill="${C.canopy}"/>
		<circle cx="96" cy="-6" r="84" fill="${C.canopy}"/>
	</g>
	<text x="80" y="290" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="88" font-weight="500" letter-spacing="-2.5" fill="${C.white}">West Oaks Design</text>
	<text x="80" y="366" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="38" font-weight="400" fill="${C.sage}">Landscape design, build and stewardship</text>
	<text x="80" y="424" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="30" font-weight="400" fill="${C.sage}" opacity="0.8">Austin and the Texas Hill Country</text>
</svg>`;

await mkdir('public/images', { recursive: true });
await sharp(Buffer.from(og)).png().toFile('public/images/og-default.png');
console.log('wrote public/images/og-default.png');
