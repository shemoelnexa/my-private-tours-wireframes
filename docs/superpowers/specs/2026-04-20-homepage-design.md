# MyPrivateTours.com — Homepage Design Spec

**Date:** 2026-04-20
**Status:** Draft — pending user approval
**Scope:** Homepage design only (separate from existing `/wireframes/` deliverable)

---

## 1. Goal

Produce three distinct, production-quality homepage design concepts for MyPrivateTours.com that the client can review, pick from, or combine. All three concepts implement the complete homepage section list from the v3 sitemap, follow the MPT brand system, and showcase modern animation polish (text reveals, button micro-interactions, section transitions).

---

## 2. Non-goals

- Not redesigning or replacing the existing `/wireframes/` files — the wireframe `index.html` stays as-is.
- Not building city, sub-category, tour detail, blog, or support pages. Homepage only.
- Not wiring up real Bokun, Mailchimp, GA4, or Meta Pixel — static placeholders with sensible markup hooks.
- Not wiring up real search behavior — the hero search bar (Concepts B and C) is visual/interactive shell only; submit is a no-op, dev team hooks it up when tied to a search endpoint or Bokun product filter.
- Not producing a WordPress theme. Output is static HTML/CSS/JS; the dev team ports to WordPress later.

---

## 3. Deliverable

A single `/homepage/` folder containing three self-contained homepage design concepts, plus a shared landing index that lets the client click between them.

```
/homepage/
├── index.html                      → Landing screen with 3 concept tiles (click to open)
├── concept-a-editorial.html        → Concept A — Editorial Minimal
├── concept-b-modern.html           → Concept B — Confident Modern
├── concept-c-cinematic.html        → Concept C — Cinematic Immersive
├── assets/
│   ├── css/
│   │   ├── tokens.css              → Brand tokens (colors, type, spacing) — shared
│   │   ├── base.css                → Reset + Tailwind utilities base — shared
│   │   ├── concept-a.css           → Editorial-specific styles
│   │   ├── concept-b.css           → Modern-specific styles
│   │   └── concept-c.css           → Cinematic-specific styles
│   ├── js/
│   │   ├── lenis.js                → Smooth-scroll (shared)
│   │   ├── gsap-core.js            → GSAP + ScrollTrigger + SplitText (shared)
│   │   ├── concept-a.js            → Editorial motion choreography
│   │   ├── concept-b.js            → Modern motion choreography
│   │   └── concept-c.js            → Cinematic motion choreography
│   ├── fonts/                      → Nunito (self-hosted) + serif pairing
│   └── images/                     → Unsplash-sourced photography (Paris, Rome, London, Barcelona, Florence, Prague, Venice, New York)
```

---

## 4. Tech stack

- **Static HTML5** — one file per concept, no build step required to view locally.
- **Tailwind CSS via CDN** — utility layer. Each concept extends it with its own concept CSS file for tokens, typography, and complex treatments.
- **Vanilla JS** — no framework.
- **GSAP** (Core + ScrollTrigger) — scroll-linked animations, pinned sections.
- **split-type** (MIT) — headline character/word/line splitting for staggered reveals. Chosen over GSAP's paid SplitText plugin; upgrade path available if the client later licenses Club GreenSock.
- **Lenis** — smooth-scroll layer (tuned per concept).
- **Vanilla JS for 3D tilt (Concept B)** — custom mousemove + CSS `transform: perspective() rotateX/Y` to avoid pulling in an extra library.
- **Self-hosted Nunito** (WOFF2) — brand-required.
- **Self-hosted serif** — EB Garamond or Fraunces for Concepts A and C (Google Fonts, WOFF2).

Everything ships as static assets the dev team can port into WordPress.

---

## 5. Brand system (shared across all three concepts)

**Colors** (from COLORS.pdf):

| Token | Hex | Role |
|---|---|---|
| `--mpt-orange` | `#E0653C` | Primary — CTAs, accents, orange glow |
| `--mpt-sand` | `#EDD285` | Secondary — highlight strokes, warm highlights |
| `--mpt-beige` | `#E5E3D6` | Neutral — section backgrounds, cream canvas |
| `--mpt-off` | `#F8F8F8` | Light canvas |
| `--mpt-ink` | `#252525` | Primary text, dark canvas |
| `--mpt-orange-soft` | `#FDEEE7` | Orange-tinted surface (Concept B pills) — derived |

**Logo:** `MPT___Open_Files/Logos/SVG/` — use `LOGO.svg` (dark) or `LOGO_1.svg` (alt) per concept canvas.

**Primary font:** Nunito (weights 400, 500, 700, 800, 900).

**Secondary font (Concepts A and C only):** EB Garamond (weights 400 regular, 400 italic, 500). Chosen over Fraunces for softer, more elegant weight curve that reads well at both 14px UI and 96px display.

**Imagery:** Unsplash photos, one hero shot per city + supporting shots. Sourced at ≥2000px wide, served as AVIF (primary), WebP (secondary), JPEG (fallback) via `<picture>` tags. Aspect ratios: hero 16:9 or 3:4 (concept-dependent), city cards 3:4, tour cards 4:3, blog thumbnails 16:9. Specific photo selections + photographer credits documented in `/homepage/images/sources.md` at build time.

---

## 6. Section inventory — all three concepts

Every concept implements all ten sections in this order. The structure is identical; the expression is concept-specific.

1. **Global nav** — logo, primary links (Cities, Tours, Journal/Blog, About, B2B), language/currency toggle, primary CTA.
2. **Hero** — headline + subhead + primary CTA + search/selector + visual.
3. **Featured cities** — all 8 cities (Paris, Rome, London, Barcelona, Florence, Prague, Venice, New York).
4. **Why MyPrivateTours** — 4 value props (Expert local guides · 100% private groups · Flexible booking · Fully curated experiences).
5. **Featured tours** — 6–8 tours across cities. Card: image, name, city, duration, price from, rating.
6. **Testimonials** — 3–5 reviews with rating, name, city toured.
7. **Trust badges** — verified reviews, secure booking, 24/7 support, free cancellation, travellers served counter.
8. **From the blog** — 3 latest travel guides with thumbnail, title, city tag, read time.
9. **Newsletter** — email capture with Mailchimp-ready markup.
10. **Global footer** — nav links, legal, social, contact, newsletter echo, copyright.

---

## 7. Concept A — Editorial Minimal

**Ethos:** *Quiet, considered, unhurried.* A travel magazine you'd find at an Aman resort.

### Typography
- **Display:** EB Garamond, italic 400, −0.03em, leading 0.98. Headline sizes: 96/72/56.
- **H2:** EB Garamond regular 400, −0.02em. 52/40/32.
- **Body / UI:** Nunito 500, leading 1.6. 16/15.
- **Eyebrow:** Nunito 700, uppercase, 0.35em tracking, 11px. Preceded by 32px orange rule (hairline).

### Color & canvas
- **Primary canvas:** `#F8F8F8`.
- **Alt canvas:** `#E5E3D6` (Featured Cities, Newsletter).
- **Orange** used sparingly — as accent rule, inside emphasized words, as button hover state.
- **Buttons:** Primary = ink pill on cream; Secondary = ghost text with ink underline.
- **Imagery treatment:** photographs rendered at full saturation but with warm Kodak Portra LUT; no overlays.

### Layout
- **Grid:** 12-col, 1440 content max, generous gutters (40px). Sections at 160–200px vertical padding.
- **Hero:** Asymmetric split 1.1fr / 1fr — copy left, large image right. Image runs edge-to-edge on the right.
- **Cities grid:** Asymmetric editorial — some tiles span 2 rows. "No. 01 Paris" chapter numbering in italic serif. 4-col desktop, 2-col tablet, 1-col mobile.
- **Why:** 4 rows stacked with thin `#E5E3D6` divider rules, serif H3 + Nunito body, no icons.
- **Tours:** Horizontal snap-scroll carousel, oversized cards (420px wide), minimal metadata beneath image.
- **Testimonials:** Single-quote editorial — one quote at a time, giant italic serif, orange opening quotation mark, reviewer name in italic, next/prev arrows as serif chars.
- **Trust badges:** Thin text-only horizontal strip, tabular-numeric counters (500,000+ · 4.9★ · 8 · 24/7), hairline dividers between items.
- **Blog:** Three magazine teasers in asymmetric row (tall-short-tall), italic serif titles.
- **Newsletter:** Centered italic serif headline "Stay a while." over cream band; minimal form (single underline input + ghost submit).
- **Footer:** Oversized serif wordmark at left, compact link columns at right, thin hairline above copyright.

### Motion — "Quiet, considered, unhurried"
- **Lenis:** `duration: 1.2`, easing cubic.
- **Headline:** split-type by character; GSAP staggers 80–100ms; 20px y-rise; 600ms blur-in (8px → 0); eased `power3.out`.
- **Section entry:** whole section at once: 40px y-rise + fade, 600ms, `power2.out`, trigger at `top 80%`.
- **Image parallax:** every image `y: −15%` translate over its scroll range. Subtle.
- **Buttons:** ink pill — on hover, background shifts to orange (250ms), arrow icon translates 4px right; no scale.
- **Cursor:** magnetic on primary CTAs — cursor pulls button 8px toward itself within 60px radius.
- **Cities grid cards:** 4px lift + warm-gradient overlay on hover (400ms ease-out).
- **No bouncy springs, no layered parallax, no marquees.**

---

## 8. Concept B — Confident Modern

**Ethos:** *Snappy, springy, confident.* Airbnb Luxe meets Linear — agency-polished.

### Typography
- **All Nunito.** Three-weight hierarchy only: 900 / 700 / 500.
- **Display:** Nunito 900, −0.035em. 72/56/40.
- **H2:** Nunito 900, −0.03em. 44/36/28.
- **Body:** Nunito 500, leading 1.6. 17/15.
- **Eyebrow:** Nunito 800, wider tracking 0.25em. Often sits inside a pill (orange-on-soft-orange).
- **Highlight effect:** key words inside headlines wrap in `<span class="hl">` that renders a sandy-yellow rounded bar behind the text at `z-index: -1`, offset 4px bottom.

### Color & canvas
- **Primary canvas:** `#FFFFFF`.
- **Alt canvas:** `#F8F8F8` (Cities grid, Trust badges).
- **Orange-soft `#FDEEE7`** for pill eyebrows and the nav active state.
- **Orange is loud here** — primary CTAs, soft shadow glow, accent emphasis.
- **Buttons:**
  - Primary: orange pill, `shadow: 0 8px 24px rgba(224,101,60,0.35)`, rounded 12.
  - Ghost: transparent with ink border 1.5, rounded 12.
  - Soft: orange-soft fill with orange text.
  - Dark: ink fill with white text.
- **Imagery treatment:** clean, high-saturation, no filter.

### Layout
- **Grid:** 12-col, 1280 content max, 14px gutters on card grids.
- **Hero:** Centered composition. Pulsing-dot eyebrow pill. Headline with highlight swipe. Subhead at 560px max-width. Dual CTAs (orange primary + ghost). Airbnb-style 4-cell search pill (Where / When / Guests / Search) below CTAs. City chip row (8 chips, horizontal scroll on mobile) below search.
- **Cities grid:** 4×2 rounded cards (aspect 3/4), gradient overlay, name + tour count + "View →" chip that slides up on hover.
- **Why:** 4 feature cards with orange-soft tile holding an icon, bold H3, Nunito body. Cards lift on hover.
- **Tours:** Card grid with filter chip bar above (All · Paris · Rome · etc.). Tour card: image top with price-from badge in top-right, name, duration, rating row, "Book →" link on hover.
- **Testimonials:** Peek-carousel — 3 visible cards with 2 partial on each side. Drag and snap. Star rating, quote, reviewer row.
- **Trust badges:** 4-column stat row with animated number counters on scroll-in. Large Nunito 900 numbers, small eyebrow labels beneath.
- **Blog:** 3-col grid, category tag pill, bold title, meta row (read time + date). Image zooms 1.04 on hover.
- **Newsletter:** Orange-gradient band spanning full width. White H2, subtle sand accent. Inline email + "Subscribe" submit. Success state handled client-side.
- **Footer:** White canvas, 4-column link grid, dark bottom strip with copyright and socials.

### Motion — "Snappy, springy, confident"
- **Lenis:** `duration: 1.0`, snappier easing.
- **Headline:** split-type by word; word-by-word slide-up, 80ms stagger, 260ms per word, `back.out(1.4)` spring.
- **Highlight stroke:** sandy-yellow bar swipes left-to-right (scaleX 0→1, transform-origin left) as hero enters.
- **Hero pill eyebrow dot:** infinite 1.5s pulse.
- **Section entry:** 24px y-rise + fade, 280ms, `back.out(1.2)` spring.
- **Buttons:** on hover, scale 1.03 + shadow intensifies. On press, 0.97 snap. All 150ms.
- **Cities grid cards:** 6px lift + 1.02 scale, `cubic-bezier(.5,1.8,.5,1)` bounce.
- **Tours cards:** 3D tilt on mouseover, perspective 1000px, subtle 5° max tilt.
- **Stats counters:** 0 → target over 1.6s, `power2.out`, triggered on viewport entry.
- **Chip row:** active chip slides background pill via GSAP Flip.

---

## 9. Concept C — Cinematic Immersive

**Ethos:** *Cinematic, layered, slow-burn.* A travel docuseries opening — Aman / CityWonders / Chanel Travel.

### Typography
- **Display:** EB Garamond 400, italic for emphasis clauses. −0.03em, leading 0.94. 96/82/56.
- **H2:** EB Garamond 400 italic. 52/40/28.
- **Body / UI:** Nunito 500/700. 16/14.
- **Label:** Nunito 700, uppercase, 0.35em tracking. Always 11px, preceded by a 40px sand-colored rule.
- **Frame count:** Tabular numerics, 11px, 0.2em tracking, uppercase ("01 / 08 — PARIS").

### Color & canvas
- **Primary canvas:** `#0f0907` (near-black warm).
- **Alt canvas:** Full-bleed imagery with dark overlay (hero, testimonials, cities carousel background).
- **Orange** as warm glow on CTAs, light spill in overlays.
- **Sand `#EDD285`** for italic emphasis clauses and eyebrow rules.
- **Buttons:**
  - Primary: orange pill with `box-shadow: 0 0 30px rgba(224,101,60,0.45)` glow.
  - Frosted: semi-transparent white over image with `backdrop-filter: blur(20px)`, 1px white-at-20% border.
  - Text: sand-colored label with sand underline.
- **Imagery treatment:** warm cinematic LUT (orange/teal leanings), preserved highlights, slightly crushed blacks.

### Layout
- **Grid:** 12-col, 1440 content max. Sections at 120px vertical padding.
- **Hero:** Full-bleed image, 100vh or clamped 720px min. Ken Burns zoom in CSS `@keyframes`, 20s loop, alternate-reverse. Dark overlay gradient (top-to-bottom + radial spotlight). Content structure: `hero-top` (live indicator pill + frame count), `hero-center` (sand eyebrow + giant italic serif headline + Nunito subhead), `hero-bottom` (frosted search pill + vertical "Scroll ↓" indicator).
- **Cities carousel:** Horizontal snap scroll, 4 visible desktop, cards 280×380px. Each card: chapter number (italic serif, sand), city name (serif 36), country code + tour count in caps. Image within card has its own subtle Ken Burns. Below carousel: infinite marquee with all 8 city names separated by ✦ glyphs.
- **Why:** Sticky-scroll "filmstrip" — the section pins for 4 scroll-steps; each step reveals one value prop as a full-height split (headline left, cinematic image right). Uses GSAP ScrollTrigger pin.
- **Tours:** 3×2 dark card grid. Cards with Ken Burns image background, gradient overlay. Price and duration render in tabular numerics at bottom. Hover: frosted info panel slides up from bottom with included/not included summary.
- **Testimonials:** One quote at a time, occupies full viewport. Scroll advances to next quote with mask-wipe transition. Background image swaps to reviewer's toured city. Italic serif quote in 48px.
- **Trust badges:** Thin horizontal ticker with tabular numerics counting up on scroll-in. Cinema-strip feel — thin dashes between items.
- **Blog:** Dark canvas, 3-col magazine grid. Serif titles oversized (28px), Nunito meta beneath. Hover: image zooms + darkens.
- **Newsletter:** Dark band with centered italic serif "Join the journal.", glowing orange CTA. Accompanied by small sand-colored running note.
- **Footer:** Oversized serif wordmark "MyPrivateTours" spanning full width. Below: city links listed as chapters ("Ch. 01 — Paris"), legal row, copyright.

### Motion — "Cinematic, layered, slow-burn"
- **Lenis:** `duration: 1.4`, deeper momentum.
- **Ken Burns:** hero image scales 1.0 → 1.08 over 20s, alternate-reverse, `ease-in-out`.
- **Headline reveal:** split-type by line; line-by-line mask wipe (clip-path) + 10px blur-in, 800ms per line, 150ms stagger.
- **Nav on scroll:** transparent at scroll 0; above scroll 60px, transitions to `rgba(15,9,7,0.85)` + `backdrop-filter: blur(16px)` + slight shrink of row height.
- **Cities carousel:** drag-momentum (pointer events + inertia decay); images within cards translate Y at 0.5x scroll speed for depth.
- **Marquee:** GSAP infinite linear loop, 40s per cycle; pauses on hover.
- **Why filmstrip:** GSAP ScrollTrigger pin with scrub-linked opacity transitions between the 4 panels.
- **Section transitions:** curtain-mask reveal — section clips from `inset(100% 0 0 0)` to `inset(0)` over its entry.
- **Buttons:** orange glow pulses outward on hover (animated box-shadow + scale 1.02).
- **Testimonials transitions:** ScrollTrigger scrubbed; each quote occupies 100vh scroll distance.

---

## 10. Landing index (`/homepage/index.html`)

A single page that greets the client with three large tiles — one per concept. Each tile shows a hero-area preview, concept name, short descriptor, and "View concept →" CTA that opens the concept's full homepage in the same tab. Neutral styling (does not favor any concept). Serves as the review launchpad.

---

## 11. Content strategy

### Copy
Each concept uses the same base messaging but in a voice that matches its personality:

- **Concept A voice:** literary, restrained. Short sentences. "Discover the world, privately." / "A quiet kind of luxury."
- **Concept B voice:** confident, product-led, benefit-forward. "Extraordinary cities, expertly private." / "Handpicked guides. Zero strangers. Book in 60 seconds."
- **Concept C voice:** cinematic, evocative, singular. "The world, on private terms." / "Eight chapters, one passport."

Draft copy lives inline in the HTML; client marks up with changes during review. Copy is a draft, not final — the client's copywriter may rewrite.

### Imagery
One hero photo per city plus 1–2 supporting shots (tours, guides, details) sourced from Unsplash under the Unsplash license. All image sources documented in `/homepage/images/sources.md` with photographer credit. Concepts may use the same source images with different treatments (Concept A warm Portra LUT, Concept B clean, Concept C cinematic orange/teal).

---

## 12. Accessibility

All three concepts must:

- Preserve semantic HTML landmarks (`header`, `nav`, `main`, `section`, `footer`, `article`).
- Maintain WCAG AA contrast — orange CTA text on white, white text on orange backgrounds, all body text on canvas.
- Respect `prefers-reduced-motion`: disable Ken Burns, parallax, magnetic cursor, blur-in, and marquee; keep opacity fades at 200ms.
- Keyboard-accessible nav, CTAs, carousel controls.
- `alt` text on every image (documented with the image source).
- Focus-visible styles consistent with each concept's accent color.

---

## 13. Performance budget (targets)

- Hero LCP under 2.5s on a 4G connection; hero image preloaded, served AVIF with WebP and JPEG fallbacks.
- Total JS (GSAP + Lenis + concept script) under 90KB gzipped per concept.
- Images lazy-loaded below the fold.
- Fonts preloaded (`<link rel="preload">`), `font-display: swap`.

---

## 14. Out of scope

- Mobile micro-interactions beyond responsive layout + tap targets. Each concept has full mobile-responsive layout but mobile animation is simplified (reduced parallax, no magnetic cursor, ticker pauses).
- Real data from Bokun, Mailchimp, TripAdvisor. Markup hooks only.
- CMS/WordPress port.
- SEO meta tags beyond a sensible default `<title>`, `<meta description>`, and Open Graph image per concept.
- A/B test instrumentation.

---

## 15. Resolved defaults

1. **Serif:** EB Garamond for Concepts A and C (softer weight curve than Fraunces, better mixed-size rendering). Can be swapped later if client prefers.
2. **Mailchimp endpoint:** Placeholder `#` on form `action`, with Mailchimp-compatible markup hooks (`honeypot` field, hidden fields for audience ID) the dev team can wire up post-handoff.
3. **WhatsApp floating widget:** In scope for all three concepts. Each concept styles the widget to match its own language:
   - Concept A — cream circle with ink WhatsApp glyph, hairline ring
   - Concept B — bold orange pill with white glyph and spring-hover
   - Concept C — frosted-glass circle with orange glow, sand glyph
4. **Featured tours:** Stubbed with 6–8 invented tours per concept (name, city, price from, duration, rating) drawn from a shared `/homepage/assets/data/tours.json` the dev team can replace with Bokun feed. Same data across concepts, different card styling.
