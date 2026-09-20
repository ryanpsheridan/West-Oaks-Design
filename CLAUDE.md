# Client Site. Claude Code Instructions

## Project Overview

This is a starter template for small-business client sites, built with Astro and deployed to Vercel. It was created from `ryanpsheridan/client-site-starter`, a reusable base with clean design tokens, accessibility-first defaults, and SEO/AEO baked in from the first commit.

Design tokens live in `src/styles/tokens.css`. Site-wide values (business name, description, contact info, nav links) live in `src/consts.ts`, fill these in first for any new client project before touching anything else.

## Project Status. West Oaks Design

This repo is no longer the blank starter: it is the West Oaks Design client
build, at **first-draft stage**. The site was drafted from the intake
questionnaire alone, with no client call yet, so a lot of what reads as fact
on the page is a placeholder standing in for one.

**Where the placeholders are.** Every one is marked with a `TODO` or
`PLACEHOLDER` in the source, so `grep -rn "TODO\|PLACEHOLDER\|FIRST DRAFT" src/` is the
authoritative list. The ones that matter most, because they are factual
claims or feed structured data:

- `src/consts.ts`, phone, email, service-area towns, founding year, and the
  Calendly and Stripe URLs. All of these flow into the JSON-LD.
- `src/pages/index.astro`, the two credential claims in the trust bar
  (arborist certification, irrigator licence). These carry more weight than
  usual precisely because there is no social proof to lean on, so confirm
  them and add the real licence numbers, or delete them.
- `src/pages/about.astro`, the whole founding story. This is the most
  invented page on the site, and with no completed projects it is also the
  load-bearing one: the founder's background *is* the credential.
- `src/pages/services.astro`, the three price points and several FAQ answers.
- `src/pages/process.astro`, stage durations and the warranty terms.
- `src/components/ProjectForm.astro`, the Formspree endpoint. Send a real
  test submission before launch.
- `public/images/gallery/`, every image is a plain grey placeholder box, and
  every project location in the gallery is invented. Each file is named for
  the photo it is holding space for, so replacing one is a drop-in at the same
  path; then delete the "Photo placeholder:" prefix from that image's alt
  text, which is otherwise already written for the real photo.

**Hard constraints from the client. Do not undo these:**

- **The business is new and has no clients or completed projects.** Nothing on
  the site may imply otherwise. No testimonials, no project counts, no years
  in business, no "trusted by", and no gallery presented as delivered work.
  The `Testimonial` and `StatBand` components still exist and are demoed on
  `/style-guide/`, waiting for real quotes and real figures; they are not used
  on any live page. `/gallery/` is framed as the range of work the studio
  takes on, not as a portfolio, and carries no project locations.
- **There is no site visit to book and no scheduler.** Enquiries come through
  one detailed form (`src/components/ProjectForm.astro`) covering type of
  work, location, timeline and budget range. Calendly is gone, `BOOKING_URL`
  is gone, and the site has exactly one form: a second, shorter one would
  split enquiries into two shapes of data in the same inbox.
- **No black.** `--color-ink` is a deep green, not a near-black, and every
  field that used to be black (menu button, primary buttons, closing band)
  now reads green. Near-black stays correct for *text* only, the rule is
  about fields, not glyphs. See the note on `--color-ink` in `tokens.css`.
- **No borders on cards, pills or tabs.** The page surface is a real step
  darker than `--surface-raised` so fill alone distinguishes a card. Form
  inputs keep their borders: there, the border is the affordance. Restoring
  card borders means lightening the page back, so do both or neither.
- **Never two dark sections in a row.** Alternate them with a light or sunken
  section. Two saturated bands back to back read as one long dark stripe with
  a seam in it rather than as two sections. The About page's founder quote
  moved off the brand band for exactly this reason: it sat directly above the
  closing CTA band.
- **Cards are an outline plus one step of value.** One `.card` class, a light
  outline, an 8px corner, and a white fill. White works against both the
  limestone page (1.15:1) and the darker sunken band (1.29:1), so a card needs
  no variant per surface; on a dark band it inverts to a faint wash of that
  band's contrast colour. An earlier pass made the fill one step *darker* than
  the page, which was invisible at 1.06:1 and left the outline carrying the
  card alone. One step of *value*, never a hue. Filled cards were tried white and then warm tan and
  both turned a grid of cards into a set of coloured objects to look at rather
  than a list of things to read. `--tint-sand` survives on the eyebrow pill;
  the other tints are a kept ramp, not an invitation to tint cards again.
- **Corners are tight and nothing is a capsule.** The radius scale runs
  2/4/6/8px: chips and the menu button at 4px, buttons at 6px, cards, images
  and the header shell at 8px. `--radius-pill` is effectively retired. A page
  of capsules was the single biggest thing making this read as a brochure
  rather than a piece of software. Genuine circles (the arrow badge, the
  process step markers) still use 50%, because there the circle *is* the
  shape rather than a softened rectangle.
- **No secondary metadata lines under headings.** The process page used to
  carry a duration under every step title. A second, quieter line under each
  heading turns a list into a table of specifications, and a published
  timeline is a number the client gets held to. Where a duration matters it
  belongs in an FAQ answer, in a sentence.
- **`--color-brand` is the darkest thing on the site**, darker than
  `--color-ink`, which inverts the usual arrangement on purpose: the brand
  band should be the deepest note on a page and the closing CTA band a step up
  from it. Its depth comes from saturation as much as darkness. It now sits at
  73%, against the 42% of the value that once read as black, because a
  desaturated dark loses its hue long before it loses its luminance. **Every
  time this has been darkened, saturation has gone up with it. Keep doing
  that.** `--color-accent` is deliberately left where it is: it is the link
  colour and has to stay legible as text on a light surface.
- **No em dashes anywhere**, in site copy, code comments or these docs. A
  client standing preference. Pick the punctuation the sentence actually
  needs: a colon before a list or an explanation, a full stop between two
  independent clauses, parentheses around an aside, a comma for an appositive.
  Check for `&mdash;` as well as the literal character; a sweep for one missed
  the other.
- **Watch for text glued to an inline element.** Astro trims the whitespace
  between a text node and an element on the next source line, so
  `... on the\n<a>process page</a>` renders as "on theprocess page". Keep the
  space inside the previous text node. The audit greps the built HTML for
  `\w<a>\w` to catch it.

**Deliberate decisions worth not undoing:**

- Business name taken as "West Oaks Design", per the intake's domain answer,
  over the "West Oaks / Old Oaks design build" alternatives offered.
- `/process/` and `/pay/` were added beyond the requested page list. Process
  answers the questions a design-build prospect actually has and is the
  strongest AEO page on the site; `/pay/` is the Stripe link-out the intake
  asked for, and is `noindex` and footer-only because nobody arrives at it
  from search.
- No address is published and no `aggregateRating` or `openingHours` is in the
  schema. Inventing any of them is fabricated structured data. Add each only
  when the client supplies the real value.
- The placeholder boxes are generated by `scripts/generate-placeholders.mjs`.
  They are deliberately plain and neutral rather than illustrated or tinted to
  the brand: a placeholder that looks designed competes with the layout you
  are trying to judge and draws feedback on artwork nobody will ship. Delete
  the script and its output together once real photography lands. The same
  script also writes the OG social card, which is a real brand asset rather
  than a placeholder, keep that.
- The nav CTA is hidden below the desktop breakpoint. On a phone the bar has
  to carry the business name and the menu button, and the name was being
  ellipsed to make room for a button that duplicates what is inside the menu.
  The mobile panel carries the same action instead.

**The site is currently noindex.** `SITE_INDEXABLE` in `src/site-flags.mjs`
is `false`, which is the single switch controlling it: every page sends
`noindex, nofollow`, no sitemap is generated, and `robots.txt` publishes no
Sitemap line. The site stays reachable by anyone with the link and findable by
nobody, which is what a client preview wants. Flip that one constant at launch.

Note that `robots.txt` still *allows* crawling while this is false, which looks
backwards and is not: a crawler blocked by robots.txt never fetches the page,
so it never sees the `noindex`, and the URL can still surface in results as a
bare link. Letting crawlers in to read the directive is what keeps the site
out of the index. Don't "tighten" this to `Disallow: /`.

**Before this goes anywhere near production:** clear the TODOs, delete
`src/pages/setup.astro`, remove the yellow draft note at the top of
`gallery.astro`, flip `SITE_INDEXABLE` in `src/site-flags.mjs`, and set the
real domain in `astro.config.mjs` and `SITE_EMAIL`. (`robots.txt` is generated
from `src/pages/robots.txt.ts` now and follows the flag and the domain on its
own.)

## Build & Handoff Sequence

**Default path**: build the site solo in your own GitHub/Vercel accounts, and only transfer ownership to the client once they've approved a preview link. Assume the client has little to no technical experience, you'll be assisting with every third-party account setup (by call or written instructions), but every account is still created with the client's own email/info, never yours.

1. **Build solo.** Create the repo under your own GitHub account and import it into your own Vercel project. Wire up any forms/scheduling/payments against a temporary/sandbox account of your own during development, so real functionality can be tested before the client is involved at all.
2. **Share a preview link** with the client for approval. Iterate until approved, no accounts needed on their end yet.
3. **Once approved, transfer ownership:**
   - GitHub: repo → Settings → Transfer ownership → client's account (preserves full history). Re-add yourself as a collaborator afterward.
   - Vercel: transfer the project to the client's account/team.
4. **Swap in the client's real third-party accounts.** Help the client set up Formspree, Calendly, Stripe, etc. (per the decision trees below) under their own email, via call or a well-structured instructions email, then swap the placeholder/sandbox endpoints from step 1 for their real ones.
5. **Domain.** Help the client register or point their domain, then connect it in the now-transferred Vercel project.
6. **Google Search Console.** Help the client set it up under their own Google account, submit the sitemap, request indexing.
7. **Optional, self-editing setup.** Only if intake indicated the client wants to edit the site themselves going forward:
   - Editing via Claude Code directly (open-ended, any part of the site), help them set up their own Claude account (Pro/Max). No further "connection" step is needed: Claude Code just operates on whatever repo is in front of it, so once they own the repo and have their own Claude account, they can start a session against it themselves.
   - Editing via Decap CMS (structured fields only, no coding knowledge, best for blog-style content), see "Content Editing / Light CMS" below.
   - A mix of both, or fully developer-handled with no self-editing at all, the default, no extra setup.

**Important nuance, applies to every account creation step above and everywhere else in this doc**: assisting a client on a call or via instructions is not the same as owning the account on their behalf. Every account (GitHub, Vercel, Formspree, Calendly, Stripe, Google) gets created with the client's own email, never yours, and for anything involving sensitive personal/financial info (Stripe bank/tax details especially), have the client type those fields in themselves even during an assisted screen-share, rather than entering them for them. Recovery emails, phone numbers, and 2FA on every account should be the client's, never yours, so they're never locked out of their own accounts later.

**Alternate path, technical client wants to self-serve immediately**: some clients would rather set up their own GitHub/Vercel from day one instead of receiving a transfer later. This is a fine substitute for steps 1 and 3 above (skip straight to building in the client's own accounts, with the developer added as a collaborator), the rest of the sequence (forms/scheduling/payments/domain/GSC/self-editing) proceeds the same either way. `SETUP.md` documents this alternate path for a client who wants to follow it directly.

## First Steps On A New Client Project

1. Fill in `src/consts.ts` with the real business name, description, phone, email, nav structure, and `NAV_CTA` (the header's call-to-action button, kept separate from `NAV_LINKS` because it isn't a peer of them). The favicon (`src/pages/favicon.svg.ts`) auto-derives from `SITE_TITLE`'s first letter, so this alone gives every new project a reasonable default with no manual asset work.
2. Replace placeholder copy in `src/pages/index.astro`, `about.astro`, `services.astro`, `process.astro`, `gallery.astro` and `contact.astro` with the client's real content. Service copy is shared: it lives once in `src/data/services.ts` and is read by the homepage, the services page and the JSON-LD, so edit it there rather than in any page.
3. Update `astro.config.mjs`'s `site` value to the client's real domain once known.
4. Once the client has real branding/a logo, replace the auto-generated favicon: delete `src/pages/favicon.svg.ts` and add a real static file at `public/favicon.svg` (or `.ico`/`.png`, updating the `<link>` in `BaseHead.astro` accordingly). Also replace `public/images/og-default.png`.
5. Re-theme `src/styles/tokens.css`, swap `--color-accent*`, `--color-brand*`, the `--tint-*` set, and `--color-bg*` for the client's brand colors. `--color-brand` is usually the client's actual brand color, since it's the one that appears as a large field; check any new tint against `--color-text` for AA before shipping it. Everything else in the site reads from these tokens, so a full re-skin should only require editing this one file (also update the hardcoded fill in `favicon.svg.ts` to match, until it's replaced per step 4).
6. `src/pages/setup.astro` (`/setup`) is your own reference page, not linked anywhere on the site, not shown to the client. Use it while pitching/building; see "Before Launch" below for when to remove it.

## Before Launch

`src/pages/setup.astro` is `noindex` and unlinked, so it's harmless to leave temporarily, but must not ship to production long-term:

- Delete `src/pages/setup.astro`.
- See that page itself for the full pre-launch checklist (placeholder content, domain, Search Console) while it still exists.
- To hand the client their own setup steps, send `SETUP.md`'s content directly (email/text/shared file), never point them at `/setup`, which is written for you, not them.

## Google Search Console

Set up once the site is live on its real domain:

- Property is verified under the **client's own Google account**, same ownership principle as every other third-party account in this project.
- Prefer a **Domain property** (DNS TXT verification, covers all subdomains/protocols) over URL-prefix, when the client can access their domain's DNS settings.
- Submit `sitemap-index.xml` (already generated by `@astrojs/sitemap`) under Sitemaps.
- Use URL Inspection → Request Indexing on the homepage and key pages after launch, and again any time a page's content changes substantially.

## Typography

- Font: **Aspekta** for both body and headings (`--font-sans` / `--font-heading` in `tokens.css`), **self-hosted**, one 30KB variable file at `public/fonts/AspektaVF.woff2` covering weights 100–900, `@font-face` in `global.css`, preloaded in `BaseHead.astro`. No Google Fonts request, no third-party connection.
- Licensed OFL 1.1; the licence ships alongside the font at `public/fonts/Aspekta-OFL-LICENSE.txt` and must stay there.
- The whole scale sits at **medium (500)**, including headings. Hierarchy comes from size and tracking, not weight, that's what lets headings run this large without shouting. Semibold is a rare emphasis step, not the heading default.
- Don't introduce a second typeface without updating the token, the `@font-face`, and the preload together.

## Accessibility. Non-Negotiable Defaults

- Every interactive element must have a visible focus state, never add `outline: none` without replacing it with an equally visible alternative (`global.css` already handles this globally via `:focus-visible`).
- Every page keeps the skip-to-content link (`BaseLayout.astro`), don't remove it even if it "isn't needed" for a short page.
- All images require descriptive `alt` text, never `alt=""` unless the image is genuinely decorative (and say so with an empty string deliberately, not by omission).
- Respect `prefers-reduced-motion` for any new animation, `global.css` already disables transitions/animations under that media query; new custom animations must check for it too.
- Form fields always get a real `<label for>`, never a placeholder-only field.
- Color is never the only signal for state (error, success, required), pair it with text or an icon.
- Maintain WCAG AA contrast (4.5:1 for body text) when re-theming `tokens.css` for a client's brand colors, check new `--color-text` / `--color-bg` combinations before committing.

## SEO / AEO. Baked In From The Start

- Every page passes a unique `title` and `description` to `BaseLayout`/`BaseHead`, no page should reuse another page's description.
- Titles should read naturally for both search engines and AI answer engines, phrase them the way a person would actually search or ask, not keyword-stuffed.
- `@astrojs/sitemap` is already wired in `astro.config.mjs`, no manual sitemap maintenance needed.
- Add JSON-LD structured data per page where it makes sense (the homepage already has a `LocalBusiness` example in `index.astro`, swap the `@type` for whatever fits the client's actual business).
- Internal links between pages (e.g. a service page linking to the contact page) should read naturally in body copy, not just exist in nav.
- Heading hierarchy must be logical: one `<h1>` per page, `<h2>` for major sections, never skipping a level.
- Canonical URLs and Open Graph/Twitter tags are handled automatically by `BaseHead.astro`, don't hand-roll these per page.

## Structured Data

All JSON-LD is built in `src/lib/schema.ts` and rendered once per page by
`BaseLayout`, which merges the sitewide nodes with whatever the page passes as
its `schema` prop into a single `@graph`.

- Don't hand-write JSON-LD in a page. Business facts come from `consts.ts`, so
  a phone number can't disagree between the footer and the markup, which is a
  live NAP-consistency problem for local search, and exactly how hand-written
  schema goes wrong.
- Every entity carries a stable `@id` and references the others by it, so a
  consumer reads one connected business rather than several unrelated snippets
  that happen to share a name.
- Every page passes at least its `BreadcrumbList`.
- Never mark up text that isn't rendered. The FAQ and HowTo blocks build from
  the same arrays that render the visible accordion and steps; marking up an
  answer a visitor can't reach is cloaking.
- A malformed block fails silently, it just stops producing rich results with
  nothing visibly broken. Validate changes against
  <https://validator.schema.org/> and Search Console's Rich Results Test.

## Forms. Decision Tree

Default: **Formspree**. A form's `action` points at `https://formspree.io/f/{FORM_ID}` (see `src/pages/contact.astro`), submissions land straight in the client's inbox, no backend code, free tier covers low-volume sites.

Only reach for something else if:
- Formspree's free-tier submission limit becomes a real constraint → switch to **Basin** (same pattern, different URL).
- The form needs custom logic a form service can't do (writing to a database, conditional routing) → build a Vercel Serverless Function instead (see SimplySheet's `api/poll.js` for the pattern this repo's sibling project uses).

The Formspree (or equivalent) account belongs to the **client**, not the developer, it's his inbox the submissions land in.

**Setup**: client signs up free at formspree.io using their own email, creates a new form in the dashboard, and copies the resulting `https://formspree.io/f/{form_id}` endpoint. Paste that into the `action` attribute in `src/pages/contact.astro`, replacing the `FORMSPREE_ID` placeholder, then submit a test entry after deploying to confirm delivery before considering the form done.

### Project intake / questionnaire form (portfolio site, not this template)

`INTAKE.md` in this repo is the developer-filled checklist for a live call. There's also a standing, self-serve version at https://www.ryansheridan.studio/project-questionnaire, a single questionnaire on the developer's own portfolio site (not duplicated per client project) that covers the same ground as `INTAKE.md`. Send that link to a prospective client, their answers land in the developer's inbox via Formspree, and those answers are what get pasted into the first Claude Code prompt on a fresh copy of this template to kick off the actual build.

This playbook documents that questionnaire's design so it can be maintained/rebuilt on the portfolio site if needed, it does not describe anything to build inside this template:

- **Layout**: single column, narrower than the site's normal max-width (~656px), forms read better narrow. Group into named `<h2>` sections separated by dividers with equal spacing above and below; use uppercase `<h3>` sub-labels for related sub-topics within a section instead of a new divider every time.
- **Inputs**: stack every radio/checkbox group vertically, never side-by-side. Prefer multiple-choice over free text wherever the answer space is guessable (people often don't know exactly what they want, concrete options to react to beat a blank textarea), and always give an "Other" option a visible follow-up text field. Reserve one open-ended catch-all field for the end (framed as low-pressure, e.g. "want to just rant randomly?") so nothing forces itself into the structured questions.
- **Progressive disclosure**: hide follow-up questions that only make sense after a Yes/No answer, and reveal them via JS when selected, don't just de-emphasize them, actually hide them, so the form stays short at a glance.
- **Accessibility**: same non-negotiables as the rest of the site, real `<label for>` on every field, `<fieldset><legend>` around every option group, visible focus states, helper copy in a muted `<p class="field-note">` under the question (never a placeholder, which disappears on focus).
- **Tone**: reassuring and low-pressure, explicitly tell people it's OK to skip or guess ("Not sure yet? Pick what feels closest").
- **Submission**: same Formspree pattern as `contact.astro`, but via `fetch()` with `Accept: application/json` instead of a native POST, so a successful submit swaps in an inline "Thanks!" confirmation on the same page instead of redirecting to a third-party thank-you page. Include a honeypot field (`name="_gotcha"`, hidden from sighted and AT users) for basic spam protection.
- **Indexing**: mark the page `noindex` (it's a link sent directly to specific people, not meant to be discoverable) but leave `robots.txt` alone, blocking it there would also break link-preview bots (iMessage, Slack) from generating a preview card for the URL.

## Scheduling. Decision Tree

**Not used on this project.** The client takes enquiries through the project
form instead of offering bookable slots, so there is no scheduler anywhere on
the site. If that changes, the template default is **Calendly** (embed or
link) under the client's own account, since it's their calendar and it syncs
to Google Calendar natively. Use **Cal.com** instead only if the client
specifically prefers an open-source alternative to Calendly's branding and
free-tier limits.

If a scheduler is ever added, embed it with `defer`, give the container an
explicit min-height so the page doesn't jump when it paints, and keep a plain
link as the no-JS fallback.

## Payments. Decision Tree

Default: **Stripe Payment Links**, no code, a hosted checkout page the client links or embeds a button to. Use **Stripe Checkout (embedded)** instead only if the client wants the payment flow to feel fully inside the site rather than a redirect. Use **PayPal Buttons** only if the client already uses/strongly prefers PayPal over Stripe.

The payment account is always the client's, it's his money.

## Gallery / Photo Uploads. Decision Tree

Default: manual upload via GitHub's web UI (`public/images/gallery/`, see naming convention below), zero new accounts, fine for clients who update photos occasionally.

Only reach for a dedicated image host (Cloudinary or similar) if the client updates the gallery frequently/independently and the friction of the GitHub UI becomes a real recurring pain point. That's a deliberate tradeoff (one more account with its own login/password/emails), don't default to it.

**Naming convention**: `public/images/gallery/{descriptive-slug}.{ext}`, e.g. `public/images/gallery/storefront-exterior.jpg`, not `IMG_4821.jpg`. Always pair a new image with real, descriptive `alt` text in whatever page renders it (see `src/pages/gallery.astro`).

## Content Editing / Light CMS. Decision Tree

Default: **no CMS**. Most clients don't need one, occasional content changes routed through the developer (or the client describing changes in plain English via Claude Code) covers the large majority of sites. Don't add this by default; it's opt-in per client, same reasoning as Gallery's "don't default to a dedicated image host."

When to reach for it: the client specifically wants to edit content themselves on an ongoing basis without going through the developer or Claude Code each time, most commonly for a blog they'll post to regularly.

Recommended option: **Decap CMS** (free, open-source, git-based, formerly Netlify CMS).

- It's not a separate content database, it's a form-based UI (`/admin`) that writes the exact same markdown/frontmatter files this template's content collections already use. A save from the CMS is a git commit, indistinguishable from one made via Claude Code. Both the client (via the CMS) and the developer (via Claude Code) can post to the same blog without conflict.
- Best fit: blog posts, since Astro content collections (markdown + frontmatter) are exactly the shape Decap CMS expects. Fields can be as detailed as needed, title, slug, author, publish date, featured image, a full markdown rich-text body, tags, SEO meta fields, and repeatable field groups (e.g. FAQ question/answer pairs).
- Important limitation to set expectations on: Decap CMS only edits content that's been deliberately structured into a content file. Hardcoded copy inside a page's component (e.g. the homepage hero text in `index.astro`) isn't editable through the CMS out of the box, it would need to be extracted into a small data file (e.g. `src/content/home.json`) first, which is a one-time refactor per section made editable. Don't imply to a client that installing this gives them Webflow-style "click anywhere and edit", it's closer to unlocking specific fields.
- Custom Astro/MDX components (this template's equivalent of SimplySheet's ProductPromo/Poll pattern) aren't freely composable through the CMS either, each one made available to the client needs its own explicit field definition (e.g. a dropdown to insert a predefined promo), not open-ended authoring.
- Setup isn't as turnkey as Formspree/Calendly/Stripe: Decap CMS needs an OAuth backend to authenticate the client against GitHub, and since this template deploys to Vercel (not Netlify, where Decap's auth is native), that backend has to be a small serverless function added to the project. Research the current recommended approach for wiring Decap CMS's GitHub OAuth flow on Vercel before implementing this for a real client, the ecosystem around this shifts, so verify rather than assuming the setup is a five-minute account signup like the other decision trees.
- Access to `/admin` should be gated to the client (and the developer), never left open to the public.

## Hover States

**Every hover rule on the site sits inside `@media (hover: hover)`.** A touch
device has no hover to leave, so it latches the state on tap and holds it:
cards lit up and stayed lit while scrolling past them, which is what this
rule exists to prevent. Put any new hover styling behind the same guard.

Two details worth keeping:

- **Don't group `:hover` with `:focus-visible` in one rule.** Putting the pair
  behind the guard takes keyboard focus with it, and a laptop with a
  touchscreen reports `hover: none`. Split them, guard only the hover half.
  `.gallery-trigger` and `.copy-btn` both do this.
- **Cards get no `:active` substitute.** A button can flash under a thumb; a
  whole tile doing it mid-scroll is the same problem the guard just fixed.

The only ungated `:hover` selectors left are the four `.cta-link, .cta-link:hover`
rules, which declare the *same* colour for both states. They exist to stop the
global `a:hover` accent applying on a dark band, so there is no hover change to
suppress and guarding them would be pointless.

## Motion

The site's motion budget is deliberately small: roughly 10% surprise-and-delight on top of 90% functionality. Everything below is CSS-first and adds no third-party bytes, **never add an animation library** (GSAP, Framer Motion, AOS). The whole build is currently ~500KB including the font and images, with zero external JS or CSS files; one animation library would be a bigger download than the entire site.

Rules for any new motion:

- **CSS before JS.** Prefer native features, view transitions, scroll-driven animations (`animation-timeline`), `::details-content` with `interpolate-size`, over a scroll listener or a library. Wrap anything not yet universal in `@supports` so unsupported browsers get the static state, never a broken one.
- **Animate `transform` and `opacity`** where possible; they're the only properties that stay off the main thread.
- **Respect `prefers-reduced-motion`.** `global.css` disables transitions/animations globally via a `*` selector, but that does **not** reach the `::view-transition` pseudo-element tree (handled explicitly in `global.css`) and does not reach JS-driven motion, which must check `matchMedia` itself.
- **Never gate content behind motion.** No fade-up-on-scroll: content is in the HTML and visible immediately. The one scroll-triggered exception is the `StatBand` count-up, and even there the finished numbers are in the markup, the animation only replaces text that already rendered.
- **Don't call `scrollIntoView` to reposition something inside a scrollable strip.** It scrolls *every* scrollable ancestor including the document, so even `block: 'nearest'` will move the page, which is how the gallery carousel silently scrolled every visitor past the top of the page on load. Set the container's `scrollLeft`/`scrollTop` instead; that can only move the container.
- **Don't use the `animation` shorthand with a scroll timeline.** It resets `animation-timeline` to `auto`, and the CSS minifier may reorder declarations so the reset lands last. Use longhands (see `Header.astro`).

What's in place: cross-page view transitions; scroll-aware sticky header; staggered mobile-menu reveal; tinted cards deepening their fill on hover; the arrow nudge on `.btn-arrow`; tap-to-copy on the contact details; a smooth FAQ accordion; and the `StatBand` count-up.

## Design Tokens

Anything that needs a brand colour as a literal hex, the `theme-color` meta
tag, the generated favicon, the Open Graph card, imports it from
`src/lib/brand.ts`, which parses `tokens.css` at build time via Vite's `?raw`.
Do not paste a hex into those files. All three had hand-copied values and all
three were left stale by two consecutive re-themes; the favicon was painting a
retired colour for two revisions before anyone would have noticed.

Note the mechanism: `?raw` is resolved by the bundler and survives the build.
Reading the file with `fs` and a path relative to `import.meta.url` looks
equivalent and fails, because by build time the module has been bundled
elsewhere and the relative path no longer points at `src/styles/`.

Use CSS variables from `src/styles/tokens.css` for all styling, never hardcode a color, spacing value, duration, or font. `/style-guide` renders every token and component class below; if something isn't on that page, it isn't in the system.

`tokens.css` is layered, a raw palette feeds a semantic layer, and only the semantic names get referenced from components. That indirection is what lets dark mode be added later without renaming anything, so don't reach past it to the `--gray-*` palette from a component.

- Surfaces: `--surface-page`, `--surface-raised`, `--surface-sunken`, `--surface-fill`
- Borders: `--border-hairline`, `--border-default`, `--border-strong`
- Text: `--color-text`, `--color-text-secondary`, `--color-text-tertiary`
- Brand (the per-client re-theme surface): `--color-accent` (+ `-hover`/`-contrast`) for inline links only, `--color-ink` (+ `-hover`/`-contrast`) for primary buttons, `--color-brand` (+ `-hover`/`-contrast`) for saturated fields. `--color-bg` / `--color-bg-subtle` feed the surface tokens.
- `--color-ink` is set to its own value rather than aliased to `--ink-900`. It was aliased in the starter, but `--ink-900` is also `--color-text`, and a value tuned to read crisply at 16px body size becomes flat black once it is a full-bleed `.cta-band`. Keep them separate: text wants the darkest value, the band wants one two steps lighter that still belongs to the palette.
- Tints: `--tint-clay` (every tinted card), `--tint-sand` (the eyebrow pill), `--tint-bone`, plus `--tint-moss` and `--tint-sage` (greens, currently unused), whole-field colors for tinted cards, eyebrow pills, and brand bands. **These are backgrounds only.** `--color-text` clears AA on all of them comfortably (11.9:1 at worst, measured). `--color-text-secondary` clears it by as little as 0.2, which is too thin to build on, so anything on a tint takes primary text, or a muted tone mixed down from it via `color-mix`, never the secondary/tertiary roles.

  These have been renamed twice, both times because the names stopped matching the values. A token called `--tint-lime` holding a clay colour is a trap for whoever edits a page next. If you re-theme again, rename again, the names are part of the value.
- Semantic accents (use sparingly, only for actual state, positive/caution/critical/info): `--color-accent-positive`, `--color-accent-caution`, `--color-accent-critical`, `--color-accent-info` (each with a matching `-bg` variant)
- Spacing: `--space-1` through `--space-10`, on a 4px grid. Roughly: 1–4 inside components, 5–7 between components, 8–10 between sections.
- Typography: `--text-eyebrow`/`-small`/`-body`/`-large`, `--text-h5` through `--text-h1`, `--text-display`
- Tracking: `--tracking-tight`/`-snug`/`-body`/`-normal`/`-caps`, large type needs negative tracking, uppercase labels need positive
- Leading: `--leading-display`/`-tight`/`-snug`/`-body`
- Weights: `--weight-normal`, `--weight-medium`, `--weight-semibold` (no 700, semibold is the ceiling)
- Radius/elevation: `--radius-sm`/`-md`/`-lg`/`-xl`/`-pill`, `--shadow-xs`/`-sm`/`-md`/`-lg`, `--ring`
- Motion: `--duration-fast`/`-base`/`-slow`, `--ease-out`/`--ease-in-out`
- Layout: `--content-width`, `--measure-narrow`/`--measure`/`--measure-wide`

## Component Layer

Shared classes live in `src/styles/global.css`. Reach for these before writing anything in a page's scoped `<style>` block, a page block should hold genuinely page-specific layout, never a re-implementation of a shared pattern.

- Layout: `.container` (+ `.container-narrow`), `.section` / `.section-tight` / `.section-loose` / `.section-hero`, `.section-sunken`, `.grid-auto` (tune with `--grid-min`), `.split` (+ `.split-reverse`, `.split-top`, tune with `--split-cols`), `.stack`, `.divider`
- Form fields have no fill. An input takes the colour of whatever container it sits in and its border alone draws it, because a field painted a different shade from its own card reads as a second surface stacked inside the first, and a form of a dozen fields becomes a stack of tinted slabs.
- Components: `.card` (+ `.card-interactive`, `.card-tint` tuned with `--card-tint`), `.btn` with `.btn-primary`/`.btn-brand`/`.btn-secondary`/`.btn-inverse`, `.btn-sm`/`.btn-lg`, and `.btn-arrow`, `.field` (+ `.field-hint`, `.field-error`, `.field-invalid`), `.media-frame` (tune with `--media-ratio`), `.topline`, `.tag`, `.quote`, `.stat-value`/`.stat-label`, `.stat-band` (tune with `--stat-cols`), `.faq-list` + `.faq-item`
- `.faq-list`/`.faq-item` wrap a native `<details>`/`<summary>`: an accordion the browser already knows how to open, keyboard-operate and announce, with no JavaScript and every answer present in the HTML whether expanded or not. That last part is what makes the `FAQPage` schema honest, build the visible list and the schema from one array, never mark up an answer a visitor cannot reach.
- `.btn-arrow` adds the inverted disc inside the pill's right edge. It's a navigation signal, reserve it for links that go somewhere, not for submit buttons.
- Section headers: `.section-header` wrapping a `.section-header-text` (eyebrow + heading + lead), with an optional `.link-arrow` action pinned to the opposite end. Use this rather than stranding a button under the grid. Add `.section-header-center` when there's no action to pin opposite.
- **Centring is a desktop device and is gated at 720px.** The reason to centre a header is that a lone left-aligned one above a symmetrical multi-column grid leaves the right half of the row empty, which is an argument entirely about wide layouts. On a phone every grid is one column, so there is no empty half to balance and a centred header on top of left-aligned cards just reads as two alignments fighting. `.section-header-center` and `.pay-card` both align left below 720px. Anything new that centres should do the same unless it is a genuine standalone device.
- The one deliberate exception is the About founder quote (`.quote-feature`), which stays centred at every width. A pull quote is a self-contained statement with nothing left-aligned beside it to clash with, so centring reads as intent rather than inconsistency.
- Saturated bands: `.cta-band` (ink) for a full-bleed closing call to action with `.btn-inverse` inside it, and `.section-brand` (brand color) for a full-bleed highlight band. **One of each per page at most**, each works by being the only thing on the page that inverts or saturates, so a second costs the first its impact.
- `.card-tint` and `.section-brand` re-point `--color-text-secondary` / `--color-text-tertiary` (and `--color-text`, on the brand band) to tint-safe tones on themselves. So a page's scoped CSS can keep referencing those tokens normally inside either one, don't add per-page color overrides for muted text on a tint, and don't reach for a raw palette value to work around it.
- Text: `.display`, `.eyebrow` (a tinted pill, tuned with `--eyebrow-tint`; `.eyebrow-plain` drops the pill), `.lead`, `.text-secondary`, `.text-tertiary`, `.measure` / `.measure-narrow` / `.measure-wide`

### Navigation

`Header.astro` is a floating pill that sticks below the top edge, frosted (`backdrop-filter`) over a mostly-opaque white fill with a hairline border, carrying the logo, links, and `NAV_CTA` on one row. A few constraints worth keeping:

- The fill is **translucent white, not solid**. Solid would remove the thing the `backdrop-filter` blurs, so the glass effect would vanish. The hairline carries the edge definition instead, which is why the shadow only needs to be a hint of lift.

- The shell stays **in normal flow and sticks**; it is not `position: fixed`. Fixed would make every page responsible for reserving matching top padding, and any page that forgot would hide its own first heading under the bar.
- Every direct child of the bar sets an explicit `grid-row: 1`. With only `grid-column` set, an item asking for column 1 after one already placed in column 2 wraps to a second row instead of moving the cursor backwards.
- On mobile the links become a floating panel hung under the bar (not a full-screen takeover), over a blurred backdrop. The panel is `aria-modal` with a focus trap, closes on Escape, on a backdrop click, and on any link click.
- The bar carries `view-transition-name: site-header` so it doesn't cross-fade on navigation.

Three shared Astro components sit alongside the CSS layer:

- `Icon.astro`, small stroke-icon set on a 24px grid at 1.5 stroke, so icons match `--weight-medium` text optically. Icons inherit `currentColor` and are decorative by default; pass `title` only when the icon is the sole carrier of meaning. **Add new icons to this file rather than inlining SVG in a page.**
- `Testimonial.astro`, testimonial card taking `quote`, `name`, and optional `role`, `rating`, `image`. Every optional part degrades cleanly, so a client with only a quote still gets a finished card. Use this rather than hand-rolling a quote card; `.quote` in `global.css` is for pull quotes in running content, which is a different job.
- `StatBand.astro`, row of headline figures taking `stats` and an optional `cols`. Carries the count-up behaviour, so use it rather than hand-writing `.stat-band` markup.

## Page Content Blocks

Every page keeps its editable copy in a single clearly-marked block at the top of the file (`// PAGE CONTENT`), with the markup below reading from it. Content changes should mean editing that block, never hunting through markup. When adding a new section to a page, add its copy to that block rather than inlining strings, it's also what makes a later Decap CMS extraction cheap (see "Content Editing / Light CMS").

A section that needs a background band wraps a `.container` rather than being one, so the band goes full-bleed instead of stopping at the gutter:

```html
<section class="section section-sunken">
  <div class="container">…</div>
</section>
```

## Deployment

- Hosted on **Vercel**, connected directly to the client's GitHub repo, every push to `main` deploys automatically. No manual deploy step.
- Preview deployments are generated for every PR/branch push and commented directly on the GitHub PR.
- No separate staging environment needed for a site this size. PR previews serve that purpose.
