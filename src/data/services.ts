/**
 * The service lines, in one place.
 *
 * Home, Services, Process and the JSON-LD all read from this array, so a
 * service can't end up described one way on the homepage and another on the
 * services page — which is the single most common way a small-business site
 * drifts out of sync with itself.
 *
 * This is also the extraction point if the client later wants to edit
 * services through a CMS: it's already a structured list with a stable slug
 * per item, so moving it to a content collection is a rename, not a refactor
 * (see CLAUDE.md, "Content Editing / Light CMS").
 *
 * ⚠️ FIRST DRAFT — the six lines below come straight from the intake form's
 * description of the business, but the specifics inside each one (timelines,
 * methods, what's included) are informed guesses about how a Hill Country
 * design-build firm works. Walk through them with the client before launch.
 */

export interface Service {
	/** Anchor target on /services/, and the id the schema points at. */
	slug: string;
	title: string;
	/** One line. Used on the homepage cards, where space is tight. */
	short: string;
	/** The full description, used on /services/ and in the Service schema. */
	long: string;
	includes: string[];
	/** Icon name from src/components/Icon.astro. */
	icon: string;
	/** Tint token name for the card fill on the homepage. */
	tint: string;
}

export const SERVICES: Service[] = [
	{
		slug: 'landscape-design',
		title: 'Landscape design',
		short: 'A plan for the whole property, drawn from how the site already works.',
		long: 'We start with the land you have — its slope, its soil, where the water goes in a storm, where the shade falls in August — and design around it rather than against it. You get a drawn master plan you can build in one season or in stages over several years, without the later phases fighting the earlier ones.',
		includes: [
			'Site analysis: drainage, soil, sun and existing trees',
			'Concept plan and revisions with you in the room',
			'Planting plan with every species named',
			'Hardscape layouts, levels and material selections',
			'Phasing and budget so the plan can be built over time',
		],
		icon: 'ruler',
		tint: '--tint-moss',
	},
	{
		slug: 'tree-care',
		title: 'Tree care and planting',
		short: 'Keeping the oaks you have, and planting the ones that will outlast us.',
		long: 'The mature live oaks and cedar elms on a Hill Country property are the most valuable thing on it and the hardest to replace, so they get looked after first. We prune for structure rather than for looks, protect root zones before any machine arrives, and follow the Texas A&M Forest Service oak wilt calendar on every cut. New trees go in young and small, because a young tree establishes faster and outgrows a boxed specimen within a few seasons.',
		includes: [
			'Structural and clearance pruning by certified arborists',
			'Oak wilt prevention: seasonal timing and wound sealing',
			'Root zone protection during construction',
			'Deep-root fertilisation and soil decompaction',
			'Native and adapted tree selection and planting',
		],
		icon: 'tree',
		tint: '--tint-sage',
	},
	{
		slug: 'hardscape',
		title: 'Patios, pergolas and hardscape',
		short: 'Limestone terraces, cedar shade structures and the paths between them.',
		long: 'Hardscape is what makes a landscape usable in a Texas summer: somewhere level to sit, something overhead at four in the afternoon, and a dry path to get there. We build in local limestone, decomposed granite and cedar, detailed to weather rather than to look new for one season.',
		includes: [
			'Limestone and flagstone patios and terraces',
			'Cedar pergolas, ramadas and shade structures',
			'Dry-stacked and mortared retaining walls',
			'Decomposed granite paths and gravel courtyards',
			'Steps, seat walls and outdoor fireplaces',
		],
		icon: 'pergola',
		tint: '--tint-clay',
	},
	{
		slug: 'irrigation',
		title: 'Irrigation and water management',
		short: 'Getting water where it is needed, and keeping the rest on the property.',
		long: 'Most landscapes here are watered on a schedule that made sense the day it was set and has not been touched since. We design zones around what each area actually needs, convert spray beds to drip, and set controllers that watch the weather. Upstream of that, we grade and detain so a heavy rain soaks in on your land instead of leaving it.',
		includes: [
			'New irrigation design and installation by a licensed irrigator',
			'Spray-to-drip conversions and zone rezoning',
			'Smart controllers with weather and soil-moisture input',
			'Rainwater collection and tank integration',
			'Grading, swales, dry creeks and detention',
		],
		icon: 'droplet',
		tint: '--tint-mist',
	},
	{
		slug: 'lighting',
		title: 'Outdoor lighting',
		short: 'Low-voltage lighting that extends the evening without flooding it.',
		long: 'Lighting is the cheapest way to double the hours a landscape gets used, and the easiest to overdo. We light the things worth looking at — a canopy, a wall, the edge of a step — and leave the rest dark. Every fixture is low-voltage, shielded and aimed down, which keeps the night sky intact and your neighbours friendly.',
		includes: [
			'Low-voltage design and installation',
			'Uplighting for specimen trees and limestone walls',
			'Path, step and seat-wall lighting for safe footing',
			'Dark-sky friendly shielded fixtures',
			'Timers, zones and phone control',
		],
		icon: 'lamp',
		tint: '--tint-bone',
	},
	{
		slug: 'stewardship',
		title: 'Stewardship and land consulting',
		short: 'Ongoing care, and advice on land you own or are about to buy.',
		long: 'A landscape is an asset, and like any asset it does better with a management plan than with occasional emergency attention. We hold a written plan for each property we look after — what gets pruned when, what the water budget is, what is due for replacement — and work to it. For acreage, we consult on the questions that come before any of that: what this land can carry, what is worth clearing, what is worth protecting.',
		includes: [
			'Written annual landscape management plan',
			'Scheduled seasonal visits, not call-outs',
			'Water budgeting and usage review',
			'Acreage and pre-purchase land consulting',
			'Native restoration and invasive species management',
		],
		icon: 'sprout',
		tint: '--tint-sage',
	},
];
