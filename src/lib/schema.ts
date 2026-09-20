/**
 * JSON-LD builders.
 *
 * Every structured-data block on the site is assembled here rather than
 * hand-written per page, for three reasons:
 *
 *   1. The business facts (name, phone, service area, URL) live in consts.ts
 *      and flow into the schema from there. A phone number that disagrees
 *      between the footer and the markup is a live NAP-consistency problem
 *      for local search, and hand-written schema is exactly how that happens.
 *   2. Every entity gets a stable `@id` and refers to the others by it, so
 *      search and answer engines read one connected graph of a single
 *      business rather than several unrelated snippets that happen to share
 *      a name.
 *   3. A malformed block fails silently, it just stops producing rich
 *      results, with nothing visibly broken on the page. Generating it from
 *      one typed place is what stops that going unnoticed.
 *
 * Validate any change against https://validator.schema.org/ and Search
 * Console's Rich Results Test before shipping it.
 */
import {
	SITE_TITLE,
	SITE_DESCRIPTION,
	SITE_TAGLINE,
	SITE_PHONE,
	SITE_EMAIL,
	SERVICE_AREA,
	SERVICE_AREA_LABEL,
	FOUNDED_YEAR,
} from '../consts';

/** Absolute URL for a site-relative path. Schema requires absolute URLs. */
export const abs = (site: URL | undefined, path: string): string =>
	site ? new URL(path, site).toString() : path;

/**
 * Stable node identifiers. Anchoring every entity to a hash `@id` off the
 * site root is what lets `provider`, `publisher` and `about` reference the
 * business by pointer instead of restating it, which is how a consumer knows
 * the homepage's business and the services page's provider are one entity.
 */
export const ids = (site: URL | undefined) => ({
	business: `${abs(site, '/')}#business`,
	website: `${abs(site, '/')}#website`,
});

/**
 * The business itself.
 *
 * `LandscapingBusiness` rather than the generic `LocalBusiness`: it is a real
 * schema.org subtype, and the more specific type is what lets an answer
 * engine match "who does landscaping near me" without inferring it from prose.
 *
 * Note what is deliberately absent: no `address` (the client has no public
 * premises, see SITE_ADDRESS in consts.ts), no `aggregateRating`, and no
 * `openingHours`. Inventing any of them would be fabricated structured data,
 * which is both a Google policy violation and worse for trust than omission.
 * Add each one only when the client supplies the real value.
 */
export const businessSchema = (site: URL | undefined) => ({
	'@type': 'LandscapingBusiness',
	'@id': ids(site).business,
	name: SITE_TITLE,
	description: SITE_DESCRIPTION,
	slogan: SITE_TAGLINE,
	url: abs(site, '/'),
	telephone: SITE_PHONE,
	email: SITE_EMAIL,
	image: abs(site, '/images/og-default.png'),
	logo: abs(site, '/favicon.svg'),
	foundingDate: String(FOUNDED_YEAR),
	// Both the named towns and the region they sit in. The towns answer a
	// "do you come to Wimberley?" query directly; the region catches the
	// surrounding places nobody thought to list.
	areaServed: [
		...SERVICE_AREA.map((name) => ({ '@type': 'City', name, addressRegion: 'TX' })),
		{ '@type': 'AdministrativeArea', name: 'Texas Hill Country' },
	],
	knowsAbout: [
		'Landscape design',
		'Landscape architecture',
		'Tree care and arboriculture',
		'Native and adapted planting for Central Texas',
		'Limestone hardscape and patios',
		'Pergolas and shade structures',
		'Drip irrigation and water conservation',
		'Low-voltage landscape lighting',
		'Biophilic design',
		'Sustainable land stewardship',
	],
});

/** The site as an entity, so sitelinks and brand queries resolve to it. */
export const websiteSchema = (site: URL | undefined) => ({
	'@type': 'WebSite',
	'@id': ids(site).website,
	name: SITE_TITLE,
	url: abs(site, '/'),
	description: SITE_DESCRIPTION,
	publisher: { '@id': ids(site).business },
	inLanguage: 'en-US',
});

/**
 * Breadcrumbs. Pass the trail *excluding* Home, which is prepended here so
 * no page can forget it and no two pages can disagree about its label.
 */
export const breadcrumbSchema = (
	site: URL | undefined,
	trail: { name: string; path: string }[]
) => ({
	'@type': 'BreadcrumbList',
	itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, i) => ({
		'@type': 'ListItem',
		position: i + 1,
		name: crumb.name,
		item: abs(site, crumb.path),
	})),
});

/**
 * An FAQ block. This is the highest-leverage AEO markup on the site: it hands
 * an answer engine a question and its answer already paired, instead of
 * asking it to infer the pairing from headings.
 *
 * Answers must be the same text a visitor sees on the page. Marking up an
 * answer that isn't rendered is cloaking, so pages build both the visible
 * accordion and this block from one array.
 */
export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
	'@type': 'FAQPage',
	mainEntity: faqs.map((faq) => ({
		'@type': 'Question',
		name: faq.question,
		acceptedAnswer: { '@type': 'Answer', text: faq.answer },
	})),
});

/** One service line, provided by the business and offered in its area. */
export const serviceSchema = (
	site: URL | undefined,
	service: { title: string; description: string; slug?: string }
) => ({
	'@type': 'Service',
	name: service.title,
	description: service.description,
	serviceType: service.title,
	provider: { '@id': ids(site).business },
	areaServed: { '@type': 'AdministrativeArea', name: SERVICE_AREA_LABEL },
	...(service.slug ? { url: abs(site, `/services/#${service.slug}`) } : {}),
});

/**
 * Wraps a page's nodes into one `@graph`. A single graph beats several loose
 * `<script>` blocks: the nodes can reference each other by `@id`, and a
 * consumer parses one document rather than guessing how N of them relate.
 */
export const graph = (site: URL | undefined, nodes: object[]) => ({
	'@context': 'https://schema.org',
	'@graph': [businessSchema(site), websiteSchema(site), ...nodes],
});
