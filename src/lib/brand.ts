// Vite inlines the file's contents as a string at build time. This is the
// mechanism that matters: reading the file with `fs` and a path relative to
// import.meta.url looks equivalent but breaks in the build, because by then
// this module has been bundled somewhere else and the relative path no longer
// points at src/styles/. `?raw` is resolved by the bundler, so it survives.
import tokensCss from '../styles/tokens.css?raw';

/**
 * Brand colours, read out of tokens.css at build time.
 *
 * A handful of things on this site cannot read a CSS custom property and so
 * need the literal hex: the `theme-color` meta tag, the generated favicon,
 * and the Open Graph card. Every one of them had the value pasted in by hand,
 * and every one was left stale by the last two re-themes — the favicon was
 * still painting a colour the site had stopped using two revisions earlier,
 * which nobody would notice until a client opened a tab.
 *
 * Parsing the stylesheet makes that impossible. tokens.css stays the single
 * source of truth, this costs nothing at runtime, and a re-theme is still a
 * one-file edit. If a token is renamed or switched to a var() alias, the
 * build fails here rather than silently shipping the wrong colour.
 */
function readToken(name: string): string {
	// Only matches a literal hex, not a var() alias — an alias would need
	// resolving, and every token read here is deliberately a literal.
	const match = tokensCss.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{3,8})\\s*;`));
	if (!match) {
		throw new Error(
			`brand.ts: --${name} not found as a literal hex in tokens.css. ` +
				`If it was renamed or changed to a var() alias, update this lookup.`
		);
	}
	return match[1];
}

export const BRAND_COLOR = readToken('color-brand');
export const BRAND_CONTRAST = readToken('color-brand-contrast');
