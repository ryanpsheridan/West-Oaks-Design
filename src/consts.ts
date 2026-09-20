// Single source of truth for site-wide values so nothing gets hand-typed
// inconsistently across pages. Everything else (BaseHead, Header, Footer,
// schema) reads from here.
//
// ---------------------------------------------------------------------------
// ⚠️ FIRST-DRAFT PLACEHOLDERS — CONFIRM WITH THE CLIENT BEFORE LAUNCH
//
// The intake form gave us the business name, the services, the palette and
// the reference sites, but not the operational details below. Everything
// marked TODO is invented to make the draft readable and MUST be replaced
// with real values — several of them (phone, email, address, service area,
// licence numbers, founding year) also feed the LocalBusiness structured
// data, where a wrong value is worse than no value at all.
// ---------------------------------------------------------------------------

export const SITE_TITLE = 'West Oaks Design';

// The description is the single most reused string on the site: it's the
// homepage meta description, the og:description, and the `description` on the
// LandscapingBusiness schema. It leads with what they do and where, because
// that's the pairing both search and answer engines match a local query on.
export const SITE_DESCRIPTION =
	'Landscape design-build in the Texas Hill Country — tree care, native planting, patios and pergolas, irrigation and outdoor lighting, designed around how you actually use your land.';

// A one-line version for places that need the elevator pitch rather than the
// full sentence (footer, schema `slogan`, the header's mobile panel).
export const SITE_TAGLINE = 'Landscape design, build and stewardship.';

export const SITE_PHONE = '(512) 555-0142'; // TODO: real number — 555-01xx is the reserved fictional range, so it is safe to ship in a draft and obvious in a review
export const SITE_EMAIL = 'hello@westoaksdesign.com'; // TODO: real inbox, once the domain is registered
export const SITE_ADDRESS = ''; // TODO: confirm. Left blank deliberately — most design-build firms work out of a yard/shop and take no walk-ins, and publishing an address they don't want visitors at is worse than publishing none.

// Where they actually work. Drives the schema's areaServed and the copy in
// the footer, so keep it to places they'll genuinely travel to.
// TODO: confirm this list — invented from the "West Oaks" name and a Hill
// Country read of the reference sites.
export const SERVICE_AREA = [
	'Austin',
	'Buda',
	'Kyle',
	'Dripping Springs',
	'Wimberley',
	'San Marcos',
	'Driftwood',
];

export const SERVICE_AREA_LABEL = 'Austin and the Texas Hill Country';

// TODO: confirm. Feeds the About page's stat band and the schema's
// foundingDate — both are credibility claims, so neither should ship invented.
export const FOUNDED_YEAR = 2011;

// Booking. The client asked for "Google calendar integrations" — Calendly is
// the template default (see CLAUDE.md, "Scheduling") and syncs to Google
// Calendar natively, so their availability stays in the calendar they already
// live in. Replace the slug once their account exists.
export const BOOKING_URL = 'https://calendly.com/CALENDLY_SLUG/site-visit'; // TODO: real Calendly link

// Payments. The client asked for a simple one-time Stripe flow they can link
// out to, which is exactly the Payment Links case in CLAUDE.md's decision
// tree — a hosted checkout page, no code, no card data touching this site.
export const PAYMENT_URL = 'https://buy.stripe.com/STRIPE_PAYMENT_LINK'; // TODO: real Stripe Payment Link

// The header's call to action, pinned opposite the nav links. Kept separate
// from NAV_LINKS because it isn't a peer of them — it's the one action the
// header is asking for, and it stays visible on mobile where the links don't.
export const NAV_CTA = { label: 'Book a site visit', href: '/contact/#book' };

// Style Guide is deliberately absent: it's an internal reference page, not
// somewhere a client's customer should ever be sent. It stays reachable at
// /style-guide/ for the developer.
export const NAV_LINKS = [
	{ label: 'Home', href: '/' },
	{ label: 'Services', href: '/services/' },
	{ label: 'Process', href: '/process/' },
	{ label: 'Gallery', href: '/gallery/' },
	{ label: 'About', href: '/about/' },
	{ label: 'Contact', href: '/contact/' },
];

// Footer-only links — real pages that don't earn a slot in the top nav.
export const FOOTER_LINKS = [
	{ label: 'Make a payment', href: '/pay/' },
];
