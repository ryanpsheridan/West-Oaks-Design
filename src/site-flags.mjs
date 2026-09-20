/**
 * Build-time flags.
 *
 * Deliberately a .mjs rather than living in consts.ts: astro.config.mjs needs
 * to read this too, and the Astro config is plain ESM that cannot import a
 * TypeScript module. Keeping one file both sides can import is what stops the
 * flag being duplicated and then only half-flipped.
 */

/**
 * Whether search engines may index this site.
 *
 * FALSE right now, and this is the only switch that controls it. While the
 * site is a preview being shared with the client by link, it should be
 * reachable by anyone who has the URL and findable by nobody.
 *
 * Flipping this to true at launch does three things at once:
 *   - drops the `noindex, nofollow` from every page and restores the normal
 *     `index, follow` directives (src/components/BaseHead.astro)
 *   - re-enables the sitemap integration (astro.config.mjs)
 *   - puts the Sitemap line back in robots.txt (src/pages/robots.txt.ts)
 *
 * Note what this deliberately does NOT do: robots.txt still allows crawling
 * while this is false. That looks backwards and is not. A crawler blocked by
 * robots.txt never fetches the page, so it never sees the noindex, and a URL
 * that is linked from anywhere can still surface in results as a bare link.
 * Letting crawlers in to read the noindex is what actually keeps the site out
 * of the index.
 */
export const SITE_INDEXABLE = false;
