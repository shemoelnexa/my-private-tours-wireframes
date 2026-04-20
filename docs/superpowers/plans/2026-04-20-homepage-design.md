# MyPrivateTours.com Homepage Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build three distinct static homepage design concepts (Editorial Minimal, Confident Modern, Cinematic Immersive) inside `/homepage/`, each rendering all ten sections from the v3 sitemap with concept-specific typography, layout, and motion. Deliverable is separate from the existing `/wireframes/` files.

**Architecture:** One HTML file per concept sharing a token layer (CSS vars), a data layer (JSON), and a motion layer (GSAP Core + ScrollTrigger + Lenis + split-type). Concept-specific CSS and motion JS live in sibling files. A landing `index.html` lets the client navigate between the three concepts.

**Tech Stack:** HTML5 · Tailwind CSS (CDN) · Nunito (self-hosted WOFF2) · EB Garamond (Google Fonts WOFF2, used by Concepts A and C) · GSAP Core + ScrollTrigger · split-type (MIT) · Lenis · vanilla JS.

**Spec reference:** `docs/superpowers/specs/2026-04-20-homepage-design.md` — all visual specs live there. This plan translates the spec into implementation steps. When a task says "per spec §7.3," read that section of the spec for the full treatment.

---

## Files overview

```
homepage/
├── index.html                                  → Landing page, 3 concept tiles
├── concept-a-editorial.html                    → Concept A full homepage
├── concept-b-modern.html                       → Concept B full homepage
├── concept-c-cinematic.html                    → Concept C full homepage
├── README.md                                   → How to view locally
└── assets/
    ├── css/
    │   ├── tokens.css                          → Shared CSS variables (colors, fonts)
    │   ├── base.css                            → Shared reset, Tailwind base, utilities
    │   ├── concept-a.css                       → Editorial concept styles
    │   ├── concept-b.css                       → Modern concept styles
    │   └── concept-c.css                       → Cinematic concept styles
    ├── js/
    │   ├── motion-core.js                      → Lenis init, GSAP register, motion helpers
    │   ├── concept-a.js                        → Editorial motion choreography
    │   ├── concept-b.js                        → Modern motion choreography
    │   └── concept-c.js                        → Cinematic motion choreography
    ├── fonts/
    │   └── nunito/                             → Nunito WOFF2 weights 400–900
    ├── images/
    │   ├── sources.md                          → Photographer attribution list
    │   ├── cities/                             → 8 city hero images
    │   ├── tours/                              → Tour card imagery
    │   └── blog/                               → Blog thumbnails
    └── data/
        ├── cities.json                         → 8 cities: name, slug, country, count, image
        ├── tours.json                          → 6–8 invented tours with city, price, duration
        ├── testimonials.json                   → 5 reviews
        └── blog-posts.json                     → 3 latest posts
```

Each concept file is a standalone HTML that loads `tokens.css` + `base.css` + its own concept CSS, plus `motion-core.js` + its own concept JS.

---

## Execution notes

- **No TDD:** This is a design deliverable. "Verify" steps mean opening the file in a browser at the specified URL and checking acceptance criteria. Use `python -m http.server 8080` from the repo root (or any static server) to avoid `file://` CORS issues with JSON fetches.
- **Image strategy:** Use Unsplash direct CDN URLs (`https://images.unsplash.com/photo-XXX?w=1600&fm=webp&q=85`) in `<picture>` tags so the design ships fast. Document each source URL + photographer in `sources.md`. Dev team self-hosts during WordPress port.
- **Each concept is independent.** Completing one leaves the project shippable at that stage.
- **Commit at the end of every task.** If a task is interrupted mid-steps, stage what's done and commit `wip: task N partial` rather than losing the work.

---

## Task 1: Project scaffold

Set up the `/homepage/` folder with the empty index shell and directory structure.

**Files:**
- Create: `homepage/index.html`
- Create: `homepage/README.md`
- Create: `homepage/assets/images/sources.md`
- Create directories: `homepage/assets/{css,js,fonts,images/{cities,tours,blog},data}`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p homepage/assets/css homepage/assets/js homepage/assets/fonts homepage/assets/images/cities homepage/assets/images/tours homepage/assets/images/blog homepage/assets/data
```

- [ ] **Step 2: Create `homepage/README.md`**

```markdown
# MyPrivateTours.com — Homepage Design Concepts

Three concept homepages delivered for client review. Open `index.html` in a browser to see all three at once.

## Local preview

From repo root:

    python -m http.server 8080

Then open:

- http://localhost:8080/homepage/                          (Landing — all 3)
- http://localhost:8080/homepage/concept-a-editorial.html  (Editorial Minimal)
- http://localhost:8080/homepage/concept-b-modern.html     (Confident Modern)
- http://localhost:8080/homepage/concept-c-cinematic.html  (Cinematic Immersive)

## Handoff notes

- All three concepts share `assets/css/tokens.css` + `base.css` and `assets/js/motion-core.js`.
- Imagery uses Unsplash direct CDN URLs in dev; self-host during WordPress port.
- Search bars (Concepts B and C) are visual-only — wire up to search endpoint during port.
- Mailchimp forms have hooks but no live endpoint — wire up during port.
- See `docs/superpowers/specs/2026-04-20-homepage-design.md` for full design specs.
```

- [ ] **Step 3: Create `homepage/assets/images/sources.md` template**

```markdown
# Image sources

All imagery from Unsplash, used under the Unsplash License.

## Cities

- `cities/paris-hero.jpg` — Photo by [Photographer Name](unsplash-profile-url) on [Unsplash](unsplash-photo-url)
- `cities/rome-hero.jpg` — ...
- `cities/london-hero.jpg` — ...
- `cities/barcelona-hero.jpg` — ...
- `cities/florence-hero.jpg` — ...
- `cities/prague-hero.jpg` — ...
- `cities/venice-hero.jpg` — ...
- `cities/new-york-hero.jpg` — ...

## Tours

- `tours/eiffel-tower.jpg` — ...
- `tours/colosseum.jpg` — ...
- `tours/louvre.jpg` — ...
- (etc.)

## Blog

- `blog/paris-guide.jpg` — ...
- `blog/rome-guide.jpg` — ...
- `blog/london-guide.jpg` — ...
```

The actual photograph URLs are populated in Task 4.

- [ ] **Step 4: Create `homepage/index.html` — landing shell**

This is a minimal shell; the full landing is finished in Task 15. For now, just a placeholder so the folder is navigable.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MyPrivateTours.com — Homepage Concepts</title>
  <link rel="stylesheet" href="assets/css/tokens.css" />
  <link rel="stylesheet" href="assets/css/base.css" />
</head>
<body>
  <main style="padding:80px 40px;max-width:1200px;margin:0 auto;font-family:'Nunito',system-ui,sans-serif">
    <h1 style="font-size:48px;font-weight:900">MyPrivateTours.com</h1>
    <p style="color:#666;margin-top:8px">Three homepage design concepts — in progress.</p>
    <ul style="margin-top:32px;line-height:2">
      <li><a href="concept-a-editorial.html">Concept A — Editorial Minimal</a></li>
      <li><a href="concept-b-modern.html">Concept B — Confident Modern</a></li>
      <li><a href="concept-c-cinematic.html">Concept C — Cinematic Immersive</a></li>
    </ul>
  </main>
</body>
</html>
```

- [ ] **Step 5: Verify folder structure**

```bash
find homepage -type d
```

Expected output:

```
homepage
homepage/assets
homepage/assets/css
homepage/assets/data
homepage/assets/fonts
homepage/assets/images
homepage/assets/images/blog
homepage/assets/images/cities
homepage/assets/images/tours
homepage/assets/js
```

- [ ] **Step 6: Commit**

```bash
git add homepage/
git commit -m "scaffold /homepage/ folder structure with README and index placeholder"
```

---

## Task 2: Shared tokens and base CSS

Install the design system as CSS variables. Every concept consumes these.

**Files:**
- Create: `homepage/assets/css/tokens.css`
- Create: `homepage/assets/css/base.css`

- [ ] **Step 1: Create `tokens.css`**

```css
/* ==========================================================================
   MyPrivateTours.com — Design tokens
   Shared across all three homepage concepts.
   ========================================================================== */

:root {
  /* Brand palette — from COLORS.pdf */
  --mpt-orange:       #E0653C;
  --mpt-orange-soft:  #FDEEE7;
  --mpt-sand:         #EDD285;
  --mpt-beige:        #E5E3D6;
  --mpt-off:          #F8F8F8;
  --mpt-ink:          #252525;

  /* Cinematic (Concept C) derived */
  --mpt-dark:         #0f0907;
  --mpt-warm-shadow:  #5a2d15;

  /* Typography */
  --font-sans:   'Nunito', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-serif:  'EB Garamond', 'Times New Roman', Georgia, serif;

  /* Motion */
  --ease-out:     cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring:  cubic-bezier(0.5, 1.5, 0.5, 1);
  --ease-snap:    cubic-bezier(0.5, 1.8, 0.5, 1);

  /* Radius */
  --r-sm:  8px;
  --r-md:  12px;
  --r-lg:  16px;
  --r-xl:  24px;
  --r-pill: 999px;

  /* Layout */
  --container-narrow: 1140px;
  --container-wide:   1280px;
  --container-max:    1440px;
}
```

- [ ] **Step 2: Create `base.css`**

```css
/* ==========================================================================
   MyPrivateTours.com — Base reset + utilities
   Shared across all three concepts.
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..700;1,400..700&family=Nunito:wght@400;500;700;800;900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; } /* Lenis handles smooth-scroll */
body {
  font-family: var(--font-sans);
  color: var(--mpt-ink);
  background: var(--mpt-off);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
img, picture, video { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
button { border: 0; background: transparent; cursor: pointer; font: inherit; color: inherit; }
ul, ol { list-style: none; }

/* Screen-reader-only utility */
.sr-only {
  position: absolute;
  width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); border: 0;
}

/* Generic container */
.container {
  width: 100%;
  max-width: var(--container-wide);
  margin: 0 auto;
  padding: 0 40px;
}
@media (max-width: 768px) {
  .container { padding: 0 20px; }
}

/* Focus rings — concepts override accent color */
:focus-visible {
  outline: 2px solid var(--mpt-orange);
  outline-offset: 3px;
  border-radius: 4px;
}

/* Reduced motion — stop all transforms/transitions beyond 200ms fades */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 200ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Verify by loading `homepage/index.html`**

Start a local server from the repo root:

```bash
python -m http.server 8080
```

Open `http://localhost:8080/homepage/`. Verify:
- Page loads with Nunito font (not Times)
- Orange color `#E0653C` appears if you inspect a link (via devtools computed styles)
- No 404s in the network tab

- [ ] **Step 4: Commit**

```bash
git add homepage/assets/css/
git commit -m "add shared design tokens (colors, fonts, motion, radius) and base CSS"
```

---

## Task 3: Shared data files

Create the JSON data sources the concepts iterate over.

**Files:**
- Create: `homepage/assets/data/cities.json`
- Create: `homepage/assets/data/tours.json`
- Create: `homepage/assets/data/testimonials.json`
- Create: `homepage/assets/data/blog-posts.json`

- [ ] **Step 1: Create `cities.json`**

```json
[
  { "name": "Paris",     "slug": "paris",     "country": "France",         "countryCode": "FR", "tourCount": 12, "tagline": "Light, art, and slow afternoons.", "image": "assets/images/cities/paris-hero.jpg" },
  { "name": "Rome",      "slug": "rome",      "country": "Italy",          "countryCode": "IT", "tourCount": 9,  "tagline": "Three millennia, one walk.",         "image": "assets/images/cities/rome-hero.jpg" },
  { "name": "London",    "slug": "london",    "country": "United Kingdom", "countryCode": "UK", "tourCount": 10, "tagline": "Royal, rebellious, rain-lit.",       "image": "assets/images/cities/london-hero.jpg" },
  { "name": "Barcelona", "slug": "barcelona", "country": "Spain",          "countryCode": "ES", "tourCount": 8,  "tagline": "Gaudí mornings, tapas nights.",      "image": "assets/images/cities/barcelona-hero.jpg" },
  { "name": "Florence",  "slug": "florence",  "country": "Italy",          "countryCode": "IT", "tourCount": 7,  "tagline": "Where the Renaissance still breathes.","image": "assets/images/cities/florence-hero.jpg" },
  { "name": "Prague",    "slug": "prague",    "country": "Czech Republic", "countryCode": "CZ", "tourCount": 6,  "tagline": "Gothic bones, golden hour.",         "image": "assets/images/cities/prague-hero.jpg" },
  { "name": "Venice",    "slug": "venice",    "country": "Italy",          "countryCode": "IT", "tourCount": 6,  "tagline": "Water streets, whispered palaces.",  "image": "assets/images/cities/venice-hero.jpg" },
  { "name": "New York",  "slug": "new-york",  "country": "USA",            "countryCode": "US", "tourCount": 5,  "tagline": "The city that rewrites itself.",     "image": "assets/images/cities/new-york-hero.jpg" }
]
```

- [ ] **Step 2: Create `tours.json`** (8 invented tours across cities)

```json
[
  { "id": "paris-eiffel-private",       "name": "Private Eiffel Tower Summit", "city": "Paris",     "duration": "3h", "priceFrom": 289, "currency": "EUR", "rating": 4.9, "reviews": 428, "image": "assets/images/tours/eiffel-tower.jpg" },
  { "id": "paris-louvre-skipline",      "name": "Louvre After-Hours Private Tour", "city": "Paris", "duration": "2.5h","priceFrom": 245, "currency": "EUR", "rating": 4.8, "reviews": 312, "image": "assets/images/tours/louvre.jpg" },
  { "id": "rome-colosseum-underground", "name": "Colosseum Underground & Arena", "city": "Rome",   "duration": "3h", "priceFrom": 310, "currency": "EUR", "rating": 4.9, "reviews": 521, "image": "assets/images/tours/colosseum.jpg" },
  { "id": "rome-vatican-early",         "name": "Vatican Before Dawn",           "city": "Rome",   "duration": "4h", "priceFrom": 395, "currency": "EUR", "rating": 5.0, "reviews": 188, "image": "assets/images/tours/vatican.jpg" },
  { "id": "london-tower-crown",         "name": "Tower of London Crown Jewels",  "city": "London", "duration": "2h", "priceFrom": 195, "currency": "GBP", "rating": 4.7, "reviews": 276, "image": "assets/images/tours/tower-london.jpg" },
  { "id": "barcelona-sagrada-private",  "name": "Sagrada Família Towers",        "city": "Barcelona","duration":"2.5h","priceFrom": 215, "currency": "EUR", "rating": 4.9, "reviews": 342, "image": "assets/images/tours/sagrada.jpg" },
  { "id": "florence-uffizi-private",    "name": "Uffizi Masters Private Walk",   "city": "Florence","duration": "3h","priceFrom": 275, "currency": "EUR", "rating": 4.8, "reviews": 201, "image": "assets/images/tours/uffizi.jpg" },
  { "id": "venice-gondola-sunset",      "name": "Hidden Canals Gondola Sunset",  "city": "Venice", "duration": "1.5h","priceFrom": 180, "currency": "EUR", "rating": 4.9, "reviews": 398, "image": "assets/images/tours/venice-gondola.jpg" }
]
```

- [ ] **Step 3: Create `testimonials.json`**

```json
[
  { "name": "Amelia R.",   "city": "Paris",     "rating": 5, "quote": "Our guide didn't just show us the Louvre — she told us stories that made the paintings speak. We had the Mona Lisa room almost entirely to ourselves." },
  { "name": "James T.",    "city": "Rome",      "rating": 5, "quote": "Walking the Colosseum underground with no crowds was unreal. Every detail felt tailored — no rushing, no scripts. Worth every euro." },
  { "name": "Priya S.",    "city": "Florence",  "rating": 5, "quote": "They reshuffled our whole itinerary when my daughter got sick. No fuss, full refund on the missed day. That's trust." },
  { "name": "Lucas M.",    "city": "Barcelona", "rating": 5, "quote": "Our guide had keys to a private terrace above Park Güell. We watched the sunset alone. That moment was the whole trip." },
  { "name": "Hannah B.",   "city": "New York",  "rating": 5, "quote": "Booked three tours across Europe through them. Consistent. Considered. I'll never book the crowded bus tour again." }
]
```

- [ ] **Step 4: Create `blog-posts.json`**

```json
[
  { "slug": "best-time-to-visit-paris",    "title": "The Best Time to Visit Paris — a Month-by-Month Guide", "city": "Paris",    "readTime": "8 min", "tag": "Travel Guide", "excerpt": "Parisians disappear in August, tourists multiply in July. Here's how to read the city's year.", "image": "assets/images/blog/paris-guide.jpg", "date": "2026-04-12" },
  { "slug": "rome-colosseum-underground",  "title": "Inside the Colosseum Underground — What You'll Actually See", "city": "Rome", "readTime": "6 min", "tag": "Attraction", "excerpt": "Most visitors never go below the arena floor. Here's what waits in the hypogeum.", "image": "assets/images/blog/rome-guide.jpg", "date": "2026-04-08" },
  { "slug": "venice-hidden-canals",        "title": "Venice's Quietest Canals — A Private Guide's Route",       "city": "Venice",   "readTime": "5 min", "tag": "Local Tips",  "excerpt": "Our lead Venice guide shares the route she takes her own family — no gondola selfies in sight.", "image": "assets/images/blog/venice-guide.jpg", "date": "2026-04-02" }
]
```

- [ ] **Step 5: Verify JSON validity**

```bash
for f in homepage/assets/data/*.json; do
  python -c "import json; json.load(open('$f'))" && echo "OK: $f" || echo "INVALID: $f"
done
```

Expected: 4 lines of `OK: ...`.

- [ ] **Step 6: Commit**

```bash
git add homepage/assets/data/
git commit -m "add shared data files (cities, tours, testimonials, blog posts)"
```

---

## Task 4: Imagery — Unsplash source list

Populate `sources.md` with specific Unsplash photo URLs and document the direct CDN URLs the HTML will reference. No binaries committed — we link to `images.unsplash.com` and document the provenance.

**Files:**
- Modify: `homepage/assets/images/sources.md`

- [ ] **Step 1: Search Unsplash for imagery**

For each city, search Unsplash for high-quality landscape-oriented photos. Prefer:
- Paris: Eiffel Tower at golden hour, empty streets, Louvre courtyard
- Rome: Colosseum, Pantheon, Trevi at dawn
- London: Tower Bridge, Big Ben, Westminster
- Barcelona: Sagrada Família, Park Güell, La Rambla
- Florence: Duomo, Ponte Vecchio, Uffizi
- Prague: Charles Bridge, Old Town Square, castle
- Venice: Grand Canal, gondolas, St Mark's
- New York: Central Park, skyline, Statue of Liberty

Note the photographer name, photo URL (format `https://unsplash.com/photos/XXXXX`), and direct image URL (format `https://images.unsplash.com/photo-XXXXXXXXXXXXX-XXXXXXXXXXXX`).

- [ ] **Step 2: Replace `sources.md` contents**

Replace the entire file with:

```markdown
# Image sources

All imagery from [Unsplash](https://unsplash.com), used under the [Unsplash License](https://unsplash.com/license).

## URL scheme used in HTML

The HTML files use direct `images.unsplash.com` URLs with query params:

    https://images.unsplash.com/photo-XXXXXXXXXXXXX?w=1600&fm=webp&q=85

Sizes used:

- Hero: `?w=1920&fm=webp&q=85`
- City card: `?w=800&fm=webp&q=85`
- Tour card: `?w=640&fm=webp&q=85`
- Blog thumbnail: `?w=640&fm=webp&q=85`

Dev team replaces with self-hosted AVIF/WebP/JPEG `<picture>` during WordPress port.

## Cities

| File path | Photo URL | Photographer |
|---|---|---|
| `cities/paris-hero.jpg` | https://unsplash.com/photos/XXXX | Photographer Name |
| `cities/rome-hero.jpg` | ... | ... |
| `cities/london-hero.jpg` | ... | ... |
| `cities/barcelona-hero.jpg` | ... | ... |
| `cities/florence-hero.jpg` | ... | ... |
| `cities/prague-hero.jpg` | ... | ... |
| `cities/venice-hero.jpg` | ... | ... |
| `cities/new-york-hero.jpg` | ... | ... |

## Tours

| File path | Photo URL | Photographer |
|---|---|---|
| `tours/eiffel-tower.jpg` | ... | ... |
| `tours/louvre.jpg` | ... | ... |
| `tours/colosseum.jpg` | ... | ... |
| `tours/vatican.jpg` | ... | ... |
| `tours/tower-london.jpg` | ... | ... |
| `tours/sagrada.jpg` | ... | ... |
| `tours/uffizi.jpg` | ... | ... |
| `tours/venice-gondola.jpg` | ... | ... |

## Blog

| File path | Photo URL | Photographer |
|---|---|---|
| `blog/paris-guide.jpg` | ... | ... |
| `blog/rome-guide.jpg` | ... | ... |
| `blog/venice-guide.jpg` | ... | ... |
```

Fill in each `...` with the actual photographer name and Unsplash photo URL.

- [ ] **Step 3: Update `cities.json` and `tours.json` and `blog-posts.json` image paths**

Replace each `"image": "assets/images/cities/paris-hero.jpg"` style path with the direct Unsplash CDN URL plus sizing params. Example for Paris in `cities.json`:

```json
"image": "https://images.unsplash.com/photo-PLACEHOLDER?w=1600&fm=webp&q=85"
```

Do the same for every city, tour, and blog post entry. The photo IDs come from the Unsplash photo URLs you collected in Step 1 (the ID is the slug after the last `-` in the photo URL's path).

- [ ] **Step 4: Verify image URLs resolve**

Pick 3 image URLs at random from the JSON files and open them in a browser. All should render a 1600px-wide WebP image.

- [ ] **Step 5: Commit**

```bash
git add homepage/assets/data/ homepage/assets/images/sources.md
git commit -m "document Unsplash image sources and update data files with direct CDN URLs"
```

---

## Task 5: Shared motion infrastructure

Install Lenis, GSAP, and split-type via CDN and create the motion helper module every concept imports.

**Files:**
- Create: `homepage/assets/js/motion-core.js`

- [ ] **Step 1: Create `motion-core.js`**

```javascript
/**
 * motion-core.js
 *
 * Initializes Lenis smooth-scroll and GSAP with ScrollTrigger. Exports
 * helpers used across all three concepts:
 *   - initSmoothScroll(options)
 *   - splitAndAnimate(element, options)
 *   - animateCounter(element, target, duration)
 *   - isReducedMotion()
 *
 * Each concept script calls initSmoothScroll() once and then uses
 * the helpers + its own ScrollTrigger choreography.
 */

window.MPT = window.MPT || {};

MPT.isReducedMotion = function () {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

MPT.initSmoothScroll = function (options = {}) {
  if (MPT.isReducedMotion()) return null;

  const lenis = new Lenis({
    duration: options.duration ?? 1.2,
    easing: options.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  return lenis;
};

/**
 * Split an element's text via split-type and stagger reveal it.
 * @param {HTMLElement} el
 * @param {object} options { split: 'chars'|'words'|'lines', from: {y,opacity,blur}, stagger, duration, ease }
 */
MPT.splitAndAnimate = function (el, options = {}) {
  if (MPT.isReducedMotion()) {
    gsap.to(el, { opacity: 1, duration: 0.2 });
    return;
  }

  const splitType = options.split ?? 'chars';
  const split = new SplitType(el, { types: splitType });
  const targets = split[splitType] ?? split.chars;

  const from = {
    opacity: 0,
    y: options.from?.y ?? 24,
    filter: options.from?.blur ? `blur(${options.from.blur}px)` : 'blur(0px)',
  };

  gsap.set(targets, from);
  gsap.to(targets, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: options.duration ?? 0.6,
    ease: options.ease ?? 'power3.out',
    stagger: options.stagger ?? 0.08,
    scrollTrigger: {
      trigger: el,
      start: options.start ?? 'top 85%',
      once: true,
    },
  });
};

/**
 * Count a number from 0 to target when element enters viewport.
 * @param {HTMLElement} el element whose textContent becomes the number
 * @param {number} target final integer value
 * @param {number} duration seconds (default 1.6)
 */
MPT.animateCounter = function (el, target, duration = 1.6) {
  if (MPT.isReducedMotion()) {
    el.textContent = target.toLocaleString();
    return;
  }

  const obj = { n: 0 };
  gsap.to(obj, {
    n: target,
    duration,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    onUpdate: () => { el.textContent = Math.round(obj.n).toLocaleString(); },
  });
};

/**
 * Magnetic cursor pull for CTAs (Concept A).
 * Mutates transform; keep elements out of flow-dependent layouts.
 */
MPT.magnetize = function (el, strength = 0.3) {
  if (MPT.isReducedMotion()) return;
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
};

/**
 * Register GSAP plugins when this file loads.
 * Concept scripts assume these are registered.
 */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
```

- [ ] **Step 2: Verify no syntax errors**

Open `homepage/index.html` in a browser with devtools open. Add `<script src="assets/js/motion-core.js"></script>` to `<head>` temporarily plus the three CDN scripts *before* it:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.0.42/dist/lenis.min.js"></script>
<script src="assets/js/motion-core.js"></script>
```

Open devtools console and type `MPT.isReducedMotion()` — should return `false` (unless your OS is set to reduce motion). Type `typeof MPT.initSmoothScroll` — should return `'function'`.

Remove the temporary script tags from `index.html` after verifying — the landing page doesn't need motion yet; concept pages each load these themselves.

- [ ] **Step 3: Commit**

```bash
git add homepage/assets/js/motion-core.js
git commit -m "add shared motion-core.js (Lenis init, split-type helper, counter, magnetize)"
```

---

## Task 6: Concept A — shell (nav + footer + concept-a.css)

Build the Concept A page skeleton, nav, and footer. Verify in browser before filling in sections.

**Files:**
- Create: `homepage/concept-a-editorial.html`
- Create: `homepage/assets/css/concept-a.css`
- Create: `homepage/assets/js/concept-a.js` (empty shell for now)

Spec reference: `docs/superpowers/specs/2026-04-20-homepage-design.md` §7 (Concept A).

- [ ] **Step 1: Create `concept-a-editorial.html` shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MyPrivateTours — A quiet kind of luxury</title>
  <meta name="description" content="Expert-led private tours across eight of the world's most storied cities. No strangers. No scripts. Just yours." />

  <link rel="preload" as="image" href="IMAGE-URL-FOR-PARIS-HERO-FROM-cities.json" />
  <link rel="stylesheet" href="assets/css/tokens.css" />
  <link rel="stylesheet" href="assets/css/base.css" />
  <link rel="stylesheet" href="assets/css/concept-a.css" />
</head>
<body class="ca">

  <!-- 1. NAV -->
  <header class="ca-nav" role="banner">
    <div class="ca-nav__inner">
      <a href="index.html" class="ca-nav__logo" aria-label="MyPrivateTours home">
        MyPrivate<em>Tours</em><span class="ca-nav__dot">.</span>
      </a>
      <nav class="ca-nav__primary" aria-label="Primary">
        <ul>
          <li><a href="#cities">Cities</a></li>
          <li><a href="#tours">Tours</a></li>
          <li><a href="#journal">Journal</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#b2b">B2B</a></li>
        </ul>
      </nav>
      <a href="#tours" class="ca-btn ca-btn--outline" data-magnetic>Book a Tour →</a>
    </div>
  </header>

  <main>
    <!-- sections added in Tasks 7 and 8 -->
  </main>

  <!-- 10. FOOTER -->
  <footer class="ca-footer" role="contentinfo">
    <div class="ca-footer__inner">
      <div class="ca-footer__wordmark">
        <span>MyPrivate</span><em>Tours.</em>
      </div>
      <div class="ca-footer__cols">
        <div>
          <h4>Cities</h4>
          <ul>
            <li><a href="#">Paris</a></li>
            <li><a href="#">Rome</a></li>
            <li><a href="#">London</a></li>
            <li><a href="#">Barcelona</a></li>
            <li><a href="#">Florence</a></li>
            <li><a href="#">Prague</a></li>
            <li><a href="#">Venice</a></li>
            <li><a href="#">New York</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#b2b">B2B &amp; Travel Agents</a></li>
            <li><a href="#journal">Journal</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div class="ca-footer__bottom">
        <span>© MyPrivateTours 2026</span>
        <ul class="ca-footer__social">
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">TripAdvisor</a></li>
        </ul>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp widget -->
  <a href="https://wa.me/PLACEHOLDER" class="ca-whatsapp" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="currentColor" d="M17.5 14.4c-.3-.2-1.7-.8-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.7-.6-.6-.7-.6h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.6 1.1 3.1 1.2 3.3.2.2 2.2 3.4 5.4 4.7 3.2 1.2 3.2.8 3.8.8.6-.1 1.8-.7 2.1-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l4.9-1.4C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
    </svg>
  </a>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.0.42/dist/lenis.min.js"></script>
  <script src="assets/js/motion-core.js"></script>
  <script src="assets/js/concept-a.js" defer></script>

</body>
</html>
```

Replace `IMAGE-URL-FOR-PARIS-HERO-FROM-cities.json` with the actual URL from `cities.json[0].image`.
Replace `https://wa.me/PLACEHOLDER` with `https://wa.me/` (phone number to be filled by client).

- [ ] **Step 2: Create `concept-a.css` — base, nav, footer**

```css
/* ==========================================================================
   Concept A — Editorial Minimal
   Typography: EB Garamond + Nunito | Canvas: cream/beige | Orange as accent
   ========================================================================== */

body.ca {
  background: var(--mpt-off);
  color: var(--mpt-ink);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
}

/* ---- Type utilities ---- */
.ca h1, .ca h2, .ca .serif { font-family: var(--font-serif); font-weight: 400; }
.ca .eyebrow {
  font-size: 11px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--mpt-ink);
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.ca .eyebrow::before {
  content: '';
  width: 32px; height: 1px;
  background: var(--mpt-orange);
}

/* ---- Buttons ---- */
.ca-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 28px;
  border-radius: var(--r-pill);
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 700;
  transition: background 0.25s var(--ease-out), color 0.25s var(--ease-out), border-color 0.25s var(--ease-out);
  will-change: transform;
}
.ca-btn--primary {
  background: var(--mpt-ink);
  color: var(--mpt-off);
}
.ca-btn--primary:hover { background: var(--mpt-orange); }
.ca-btn--outline {
  border: 1px solid var(--mpt-ink);
  color: var(--mpt-ink);
}
.ca-btn--outline:hover { background: var(--mpt-ink); color: var(--mpt-off); }
.ca-btn--ghost {
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--mpt-ink);
  border-bottom: 1px solid var(--mpt-ink);
  padding-bottom: 3px;
}

/* ---- Nav ---- */
.ca-nav {
  position: sticky; top: 0; z-index: 50;
  background: var(--mpt-off);
  border-bottom: 1px solid var(--mpt-beige);
}
.ca-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  max-width: var(--container-max);
  margin: 0 auto;
}
.ca-nav__logo {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 22px;
  letter-spacing: -0.01em;
  color: var(--mpt-ink);
}
.ca-nav__logo em { font-style: italic; }
.ca-nav__dot { color: var(--mpt-orange); }
.ca-nav__primary ul {
  display: flex;
  gap: 28px;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
}
.ca-nav__primary a { padding-bottom: 3px; position: relative; }
.ca-nav__primary a::after {
  content: '';
  position: absolute; left: 0; right: 0; bottom: 0;
  height: 1px; background: var(--mpt-orange);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.3s var(--ease-out);
}
.ca-nav__primary a:hover::after { transform: scaleX(1); }

/* ---- Footer ---- */
.ca-footer {
  background: var(--mpt-beige);
  color: var(--mpt-ink);
  padding: 96px 40px 32px;
  margin-top: 160px;
}
.ca-footer__inner { max-width: var(--container-max); margin: 0 auto; }
.ca-footer__wordmark {
  font-family: var(--font-serif);
  font-size: clamp(80px, 14vw, 200px);
  line-height: 0.9;
  letter-spacing: -0.03em;
  margin-bottom: 64px;
}
.ca-footer__wordmark em { font-style: italic; color: var(--mpt-orange); }
.ca-footer__cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  border-top: 1px solid rgba(37,37,37,.15);
  padding-top: 48px;
}
.ca-footer__cols h4 {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 18px;
}
.ca-footer__cols ul { display: flex; flex-direction: column; gap: 10px; }
.ca-footer__cols a { font-size: 14px; transition: color 0.2s; }
.ca-footer__cols a:hover { color: var(--mpt-orange); }
.ca-footer__bottom {
  margin-top: 64px;
  padding-top: 24px;
  border-top: 1px solid rgba(37,37,37,.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}
.ca-footer__social { display: flex; gap: 20px; }

/* ---- WhatsApp widget ---- */
.ca-whatsapp {
  position: fixed;
  right: 28px; bottom: 28px; z-index: 40;
  width: 52px; height: 52px;
  display: flex; align-items: center; justify-content: center;
  background: var(--mpt-off);
  border: 1px solid var(--mpt-ink);
  border-radius: 50%;
  color: var(--mpt-ink);
  transition: background 0.2s, color 0.2s, transform 0.3s var(--ease-out);
}
.ca-whatsapp:hover { background: var(--mpt-ink); color: var(--mpt-off); transform: scale(1.05); }

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .ca-nav__primary { display: none; }
  .ca-footer__cols { grid-template-columns: 1fr 1fr; }
}
```

- [ ] **Step 3: Create empty `concept-a.js`**

```javascript
/**
 * concept-a.js — Editorial Minimal motion choreography
 * Section motion added in Tasks 7 and 8.
 */
(function () {
  const lenis = MPT.initSmoothScroll({ duration: 1.2 });

  // Magnetic CTAs
  document.querySelectorAll('[data-magnetic]').forEach((el) => MPT.magnetize(el, 0.3));
})();
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:8080/homepage/concept-a-editorial.html`. Verify:
- Nav is sticky at top with logo (italic serif) + 5 links + outline CTA
- Footer shows oversized wordmark + 3 link columns + bottom row
- WhatsApp circle fixed bottom-right
- Nav link hover reveals orange underline that swipes left-to-right
- CTA button darkens on hover
- Magnetic CTA pulls toward cursor when hovering within 60px
- No console errors

- [ ] **Step 5: Commit**

```bash
git add homepage/concept-a-editorial.html homepage/assets/css/concept-a.css homepage/assets/js/concept-a.js
git commit -m "concept A — add page shell, nav, footer, WhatsApp widget, base type system"
```

---

## Task 7: Concept A — Hero, Cities, Why sections

Add the three top sections: hero, featured cities, why MyPrivateTours. Full motion choreography included.

**Files:**
- Modify: `homepage/concept-a-editorial.html` (insert sections into `<main>`)
- Modify: `homepage/assets/css/concept-a.css` (append section styles)
- Modify: `homepage/assets/js/concept-a.js` (append motion)

Spec reference: spec §7.Layout (Hero, Cities grid, Why).

- [ ] **Step 1: Insert hero section into `<main>` of `concept-a-editorial.html`**

```html
<!-- 2. HERO -->
<section class="ca-hero" aria-labelledby="ca-hero-h1">
  <div class="ca-hero__inner">
    <div class="ca-hero__copy">
      <p class="eyebrow">Chapter 01 — Curated cities</p>
      <h1 id="ca-hero-h1" class="ca-hero__h1" data-split>
        Discover the world,<br /><em>privately.</em>
      </h1>
      <p class="ca-hero__sub">
        Expert-led private tours across eight of the world's most storied cities.
        No strangers. No scripts. Just yours.
      </p>
      <div class="ca-hero__ctas">
        <a href="#tours" class="ca-btn ca-btn--primary" data-magnetic>Explore tours →</a>
        <a href="#cities" class="ca-btn--ghost">Browse cities</a>
      </div>
    </div>
    <figure class="ca-hero__figure">
      <img src="PARIS-HERO-URL" alt="The Eiffel Tower at golden hour, Paris" loading="eager" />
      <figcaption>Paris · 19:02 · Eiffel Tower</figcaption>
    </figure>
  </div>
</section>
```

Replace `PARIS-HERO-URL` with the URL from `cities.json[0].image` (using `?w=1200` for this crop).

- [ ] **Step 2: Insert Featured Cities section**

Fetch cities from `cities.json` at runtime in the script (Step 7 below). Use this static HTML skeleton for now — the script will populate the list on page load using the JSON:

```html
<!-- 3. FEATURED CITIES -->
<section id="cities" class="ca-cities" aria-labelledby="ca-cities-h2">
  <div class="container">
    <header class="ca-cities__header">
      <h2 id="ca-cities-h2" class="ca-cities__title" data-split>
        Eight cities,<br /><em>eight stories.</em>
      </h2>
      <p class="eyebrow">Index · 2026</p>
    </header>
    <div class="ca-cities__grid" data-cities-grid>
      <!-- Populated from cities.json by concept-a.js -->
    </div>
  </div>
</section>
```

- [ ] **Step 3: Insert Why MyPrivateTours section**

```html
<!-- 4. WHY MYPRIVATETOURS -->
<section class="ca-why" aria-labelledby="ca-why-h2">
  <div class="container">
    <header class="ca-why__header">
      <p class="eyebrow">Why MyPrivateTours</p>
      <h2 id="ca-why-h2" class="ca-why__title" data-split>
        A quiet kind<br /><em>of luxury.</em>
      </h2>
    </header>
    <dl class="ca-why__list">
      <div class="ca-why__row">
        <dt>Expert local guides</dt>
        <dd>Every guide is a city specialist — art historians in Florence, architects in Barcelona, chefs in Rome. They live where they teach.</dd>
      </div>
      <div class="ca-why__row">
        <dt>100% private groups</dt>
        <dd>Your tour is yours. No strangers, no pace compromises, no waiting on thirty others. Ask questions. Linger. Change the route mid-walk.</dd>
      </div>
      <div class="ca-why__row">
        <dt>Flexible booking</dt>
        <dd>Free cancellation up to 48 hours before. Reschedule at no cost when life interrupts. We're patient because travel shouldn't be stressful.</dd>
      </div>
      <div class="ca-why__row">
        <dt>Fully curated experiences</dt>
        <dd>We don't aggregate. Every tour is designed end-to-end by us and booked directly. From skip-the-line tickets to private after-hours access.</dd>
      </div>
    </dl>
  </div>
</section>
```

- [ ] **Step 4: Append CSS to `concept-a.css` — hero**

```css
/* ---- Hero ---- */
.ca-hero { padding: 80px 40px 120px; }
.ca-hero__inner {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 60px;
  max-width: var(--container-max);
  margin: 0 auto;
  align-items: center;
}
.ca-hero__h1 {
  font-size: clamp(48px, 8vw, 96px);
  line-height: 0.98;
  letter-spacing: -0.03em;
  margin-top: 32px;
}
.ca-hero__h1 em { color: var(--mpt-orange); font-style: italic; }
.ca-hero__sub {
  font-size: 17px;
  line-height: 1.6;
  color: #555;
  margin-top: 32px;
  max-width: 440px;
}
.ca-hero__ctas {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-top: 48px;
  flex-wrap: wrap;
}
.ca-hero__figure {
  position: relative;
  min-height: 520px;
  overflow: hidden;
  border-radius: 4px;
  background: var(--mpt-beige);
}
.ca-hero__figure img {
  width: 100%; height: 100%;
  object-fit: cover;
  position: absolute; inset: 0;
  will-change: transform;
}
.ca-hero__figure figcaption {
  position: absolute;
  left: 20px; bottom: 20px;
  color: rgba(255,255,255,0.9);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 700;
}

@media (max-width: 900px) {
  .ca-hero__inner { grid-template-columns: 1fr; gap: 40px; }
  .ca-hero__figure { min-height: 360px; }
}
```

- [ ] **Step 5: Append CSS for cities grid**

```css
/* ---- Cities grid (editorial) ---- */
.ca-cities { background: var(--mpt-beige); padding: 120px 0; }
.ca-cities__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 64px;
}
.ca-cities__title {
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1;
  letter-spacing: -0.02em;
}
.ca-cities__title em { color: var(--mpt-orange); font-style: italic; }
.ca-cities__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 280px;
  gap: 20px;
}
.ca-city {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  background: var(--mpt-ink);
  cursor: pointer;
  transition: transform 0.4s var(--ease-out);
}
.ca-city:nth-child(1),
.ca-city:nth-child(4) { grid-row: span 2; }
.ca-city:hover { transform: translateY(-4px); }
.ca-city__img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}
.ca-city:hover .ca-city__img { transform: scale(1.05); }
.ca-city__meta {
  position: absolute;
  left: 20px; right: 20px; bottom: 20px;
  color: #fff;
  z-index: 2;
}
.ca-city::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.7), transparent 55%);
  z-index: 1;
}
.ca-city__num {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 13px;
  opacity: 0.85;
  margin-bottom: 4px;
}
.ca-city__name {
  font-family: var(--font-serif);
  font-size: 32px;
  line-height: 1;
}
.ca-city__count {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;
  margin-top: 6px;
  opacity: 0.75;
}

@media (max-width: 900px) {
  .ca-cities__grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 240px; }
  .ca-cities__grid .ca-city:nth-child(1),
  .ca-cities__grid .ca-city:nth-child(4) { grid-row: auto; }
}
```

- [ ] **Step 6: Append CSS for Why section**

```css
/* ---- Why ---- */
.ca-why { padding: 120px 0; }
.ca-why__header {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;
  margin-bottom: 80px;
  align-items: end;
}
.ca-why__title {
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1;
  letter-spacing: -0.02em;
}
.ca-why__title em { color: var(--mpt-orange); font-style: italic; }
.ca-why__list { border-top: 1px solid var(--mpt-beige); }
.ca-why__row {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  padding: 40px 0;
  border-bottom: 1px solid var(--mpt-beige);
}
.ca-why__row dt {
  font-family: var(--font-serif);
  font-size: 32px;
  line-height: 1.1;
  letter-spacing: -0.01em;
}
.ca-why__row dd {
  font-size: 16px;
  line-height: 1.7;
  color: #555;
  max-width: 560px;
}

@media (max-width: 900px) {
  .ca-why__header,
  .ca-why__row { grid-template-columns: 1fr; }
}
```

- [ ] **Step 7: Append motion + city-population logic to `concept-a.js`**

```javascript
// ==== Hero headline reveal ====
document.querySelectorAll('[data-split]').forEach((el) => {
  MPT.splitAndAnimate(el, {
    split: 'chars',
    from: { y: 24, blur: 8 },
    stagger: 0.08,
    duration: 0.6,
    ease: 'power3.out',
    start: 'top 90%',
  });
});

// ==== Hero image parallax ====
const heroImg = document.querySelector('.ca-hero__figure img');
if (heroImg && !MPT.isReducedMotion()) {
  gsap.to(heroImg, {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.ca-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

// ==== Populate cities grid from cities.json ====
(async function () {
  const grid = document.querySelector('[data-cities-grid]');
  if (!grid) return;
  const res = await fetch('assets/data/cities.json');
  const cities = await res.json();

  cities.slice(0, 8).forEach((city, i) => {
    const article = document.createElement('article');
    article.className = 'ca-city';
    const num = String(i + 1).padStart(2, '0');
    article.innerHTML = `
      <img class="ca-city__img" src="${city.image}" alt="${city.name}, ${city.country}" loading="lazy" />
      <div class="ca-city__meta">
        <div class="ca-city__num"><em>No. ${num}</em></div>
        <div class="ca-city__name">${city.name}</div>
        <div class="ca-city__count">${city.tourCount} tours</div>
      </div>
    `;
    grid.appendChild(article);
  });

  // Animate grid tiles in on scroll
  if (!MPT.isReducedMotion()) {
    gsap.from('.ca-city', {
      y: 40, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
    });
  }
})();

// ==== Why rows fade up ====
if (!MPT.isReducedMotion()) {
  gsap.utils.toArray('.ca-why__row').forEach((row) => {
    gsap.from(row, {
      y: 40, opacity: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: row, start: 'top 85%', once: true },
    });
  });
}
```

- [ ] **Step 8: Verify in browser**

Open `http://localhost:8080/homepage/concept-a-editorial.html`. Check:
- Hero headline reveals character-by-character on load with blur-in
- Hero image parallaxes upward as you scroll past
- Cities grid populates with 8 tiles showing real city images
- Tiles 1 and 4 span 2 rows (asymmetric)
- Hover on a city tile lifts it 4px and zooms image
- Why section reveals rows as they enter viewport
- No console errors, no layout shift

- [ ] **Step 9: Responsive check**

Resize browser to 1280, 768, 375 widths. Verify:
- At 1280: 4-column cities grid, all sections properly contained
- At 768: 2-column cities grid, hero stacks vertically
- At 375: single column, all type remains readable

- [ ] **Step 10: Commit**

```bash
git add homepage/concept-a-editorial.html homepage/assets/css/concept-a.css homepage/assets/js/concept-a.js
git commit -m "concept A — hero, cities grid, why sections with motion"
```

---

## Task 8: Concept A — Tours, Testimonials, Trust, Blog, Newsletter + polish

Fill in the remaining 5 sections, polish accessibility, do a final responsive check.

**Files:**
- Modify: `homepage/concept-a-editorial.html`
- Modify: `homepage/assets/css/concept-a.css`
- Modify: `homepage/assets/js/concept-a.js`

Spec reference: spec §7.Layout (Tours, Testimonials, Trust, Blog, Newsletter).

- [ ] **Step 1: Insert 5 sections into `<main>`**

Append after the Why section:

```html
<!-- 5. FEATURED TOURS -->
<section id="tours" class="ca-tours" aria-labelledby="ca-tours-h2">
  <div class="container">
    <header class="ca-tours__header">
      <h2 id="ca-tours-h2" data-split>Featured<br /><em>tours.</em></h2>
      <a href="#" class="ca-btn--ghost">View all 75+ tours →</a>
    </header>
    <div class="ca-tours__track" data-tours-track>
      <!-- Populated from tours.json -->
    </div>
  </div>
</section>

<!-- 6. TESTIMONIALS -->
<section class="ca-testimonials" aria-labelledby="ca-test-h2">
  <div class="container">
    <h2 id="ca-test-h2" class="sr-only">What our travellers say</h2>
    <div class="ca-testimonials__quote" data-testimonials>
      <!-- Single quote rotates via JS -->
    </div>
  </div>
</section>

<!-- 7. TRUST -->
<section class="ca-trust" aria-label="Our numbers">
  <div class="container">
    <ul class="ca-trust__list">
      <li><span data-count="500000">0</span><small>Travellers guided</small></li>
      <li><span>4.9<em>★</em></span><small>Average rating</small></li>
      <li><span data-count="8">0</span><small>Cities curated</small></li>
      <li><span>24/7</span><small>Concierge support</small></li>
      <li><span>48h</span><small>Free cancellation</small></li>
    </ul>
  </div>
</section>

<!-- 8. BLOG -->
<section id="journal" class="ca-blog" aria-labelledby="ca-blog-h2">
  <div class="container">
    <header class="ca-blog__header">
      <p class="eyebrow">The Journal</p>
      <h2 id="ca-blog-h2" data-split>Travel notes,<br /><em>from our guides.</em></h2>
    </header>
    <div class="ca-blog__grid" data-blog-grid>
      <!-- Populated from blog-posts.json -->
    </div>
  </div>
</section>

<!-- 9. NEWSLETTER -->
<section class="ca-newsletter" aria-labelledby="ca-news-h2">
  <div class="container">
    <h2 id="ca-news-h2" data-split><em>Stay a while.</em></h2>
    <p>Exclusive tour notes, city guides, and quiet seasonal deals.</p>
    <form class="ca-newsletter__form" action="#" method="post">
      <label class="sr-only" for="ca-email">Email address</label>
      <input id="ca-email" type="email" name="email" placeholder="your@email.com" required />
      <button type="submit" class="ca-btn ca-btn--primary">Subscribe →</button>
    </form>
  </div>
</section>
```

- [ ] **Step 2: Append CSS for Tours, Testimonials, Trust**

```css
/* ---- Tours (horizontal snap carousel) ---- */
.ca-tours { padding: 120px 0; background: var(--mpt-off); }
.ca-tours__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 64px;
}
.ca-tours__header h2 {
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1;
}
.ca-tours__header em { color: var(--mpt-orange); font-style: italic; }
.ca-tours__track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 420px;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 24px;
  scrollbar-width: thin;
  scrollbar-color: var(--mpt-beige) transparent;
}
.ca-tour {
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ca-tour__img {
  aspect-ratio: 4/3;
  border-radius: 4px;
  overflow: hidden;
  background: var(--mpt-beige);
}
.ca-tour__img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease-out); }
.ca-tour:hover .ca-tour__img img { transform: scale(1.03); }
.ca-tour__name { font-family: var(--font-serif); font-size: 24px; line-height: 1.15; }
.ca-tour__meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: #666;
}
.ca-tour__meta .price { color: var(--mpt-ink); }

/* ---- Testimonials ---- */
.ca-testimonials { padding: 160px 0; background: var(--mpt-beige); }
.ca-testimonials__quote {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  min-height: 280px;
}
.ca-testimonials__quote::before {
  content: '"';
  position: absolute;
  left: 50%;
  top: -60px;
  transform: translateX(-50%);
  font-family: var(--font-serif);
  font-size: 140px;
  color: var(--mpt-orange);
  line-height: 1;
}
.ca-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.3;
  letter-spacing: -0.01em;
}
.ca-quote__attribution {
  margin-top: 32px;
  font-family: var(--font-serif);
  font-size: 16px;
  font-style: italic;
}
.ca-quote__stars {
  color: var(--mpt-orange);
  letter-spacing: 2px;
  margin-top: 12px;
}

/* ---- Trust ---- */
.ca-trust { padding: 60px 0; border-top: 1px solid var(--mpt-beige); border-bottom: 1px solid var(--mpt-beige); }
.ca-trust__list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
}
.ca-trust__list li { padding: 20px; border-right: 1px solid var(--mpt-beige); }
.ca-trust__list li:last-child { border-right: 0; }
.ca-trust__list span {
  display: block;
  font-family: var(--font-serif);
  font-size: 40px;
  font-weight: 400;
  letter-spacing: -0.02em;
}
.ca-trust__list em { color: var(--mpt-orange); font-style: normal; }
.ca-trust__list small {
  display: block;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;
  color: #666;
  margin-top: 8px;
}

@media (max-width: 900px) {
  .ca-trust__list { grid-template-columns: repeat(2, 1fr); }
  .ca-trust__list li { border-right: 0; border-bottom: 1px solid var(--mpt-beige); }
}
```

- [ ] **Step 3: Append CSS for Blog and Newsletter**

```css
/* ---- Blog ---- */
.ca-blog { padding: 120px 0; }
.ca-blog__header {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;
  margin-bottom: 64px;
  align-items: end;
}
.ca-blog__header h2 {
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1;
}
.ca-blog__header em { color: var(--mpt-orange); font-style: italic; }
.ca-blog__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.ca-post {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.ca-post:nth-child(2) { margin-top: 80px; }
.ca-post__img { aspect-ratio: 4/5; border-radius: 4px; overflow: hidden; background: var(--mpt-beige); }
.ca-post__img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease-out); }
.ca-post:hover .ca-post__img img { transform: scale(1.04); }
.ca-post__tag {
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  font-weight: 800;
  color: var(--mpt-orange);
}
.ca-post__title {
  font-family: var(--font-serif);
  font-size: 26px;
  line-height: 1.15;
  letter-spacing: -0.01em;
}
.ca-post__meta {
  font-size: 12px;
  color: #666;
  display: flex;
  gap: 12px;
}

@media (max-width: 900px) {
  .ca-blog__header,
  .ca-blog__grid { grid-template-columns: 1fr; }
  .ca-post:nth-child(2) { margin-top: 0; }
}

/* ---- Newsletter ---- */
.ca-newsletter { padding: 160px 0; background: var(--mpt-beige); text-align: center; }
.ca-newsletter h2 {
  font-family: var(--font-serif);
  font-size: clamp(56px, 9vw, 120px);
  font-style: italic;
  line-height: 1;
  letter-spacing: -0.03em;
}
.ca-newsletter h2 em { color: var(--mpt-orange); }
.ca-newsletter p {
  font-size: 16px;
  color: #555;
  margin-top: 16px;
  max-width: 500px;
  margin-left: auto; margin-right: auto;
}
.ca-newsletter__form {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 40px;
  flex-wrap: wrap;
}
.ca-newsletter__form input {
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--mpt-ink);
  padding: 12px 4px;
  font: inherit;
  font-size: 16px;
  min-width: 320px;
  color: var(--mpt-ink);
}
.ca-newsletter__form input:focus {
  outline: none;
  border-bottom-color: var(--mpt-orange);
}
```

- [ ] **Step 4: Append JS for remaining sections**

```javascript
// ==== Populate tours ====
(async function () {
  const track = document.querySelector('[data-tours-track]');
  if (!track) return;
  const res = await fetch('assets/data/tours.json');
  const tours = await res.json();
  tours.forEach((tour) => {
    const art = document.createElement('article');
    art.className = 'ca-tour';
    art.innerHTML = `
      <div class="ca-tour__img"><img src="${tour.image}" alt="${tour.name}" loading="lazy" /></div>
      <div class="ca-tour__name">${tour.name}</div>
      <div class="ca-tour__meta">
        <span>${tour.city} · ${tour.duration}</span>
        <span class="price">From €${tour.priceFrom}</span>
      </div>
    `;
    track.appendChild(art);
  });
})();

// ==== Testimonials rotate ====
(async function () {
  const mount = document.querySelector('[data-testimonials]');
  if (!mount) return;
  const res = await fetch('assets/data/testimonials.json');
  const reviews = await res.json();

  function render(i) {
    const r = reviews[i];
    mount.innerHTML = `
      <blockquote class="ca-quote">${r.quote}
        <div class="ca-quote__stars">${'★'.repeat(r.rating)}</div>
        <div class="ca-quote__attribution">— ${r.name}, ${r.city}</div>
      </blockquote>`;
  }
  let i = 0;
  render(i);
  setInterval(() => {
    i = (i + 1) % reviews.length;
    if (!MPT.isReducedMotion()) {
      gsap.to(mount, { opacity: 0, duration: 0.4, onComplete: () => { render(i); gsap.to(mount, { opacity: 1, duration: 0.4 }); } });
    } else {
      render(i);
    }
  }, 6000);
})();

// ==== Trust counters ====
document.querySelectorAll('[data-count]').forEach((el) => {
  const target = parseInt(el.dataset.count, 10);
  MPT.animateCounter(el, target, 1.6);
});

// ==== Blog populate ====
(async function () {
  const grid = document.querySelector('[data-blog-grid]');
  if (!grid) return;
  const res = await fetch('assets/data/blog-posts.json');
  const posts = await res.json();
  posts.forEach((p) => {
    const a = document.createElement('a');
    a.className = 'ca-post';
    a.href = `#${p.slug}`;
    a.innerHTML = `
      <div class="ca-post__img"><img src="${p.image}" alt="${p.title}" loading="lazy" /></div>
      <p class="ca-post__tag">${p.tag} · ${p.city}</p>
      <h3 class="ca-post__title">${p.title}</h3>
      <div class="ca-post__meta"><span>${p.readTime}</span><span>${new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
    `;
    grid.appendChild(a);
  });
})();
```

- [ ] **Step 5: Verify all sections in browser**

Refresh `http://localhost:8080/homepage/concept-a-editorial.html`. Scroll top-to-bottom. Check:
- Tours horizontal-scrolls with keyboard arrows + mouse drag
- Single testimonial visible, rotates every 6 seconds
- Trust counters animate 0 → 500,000 and 0 → 8
- Blog grid shows 3 posts with middle post offset down 80px (asymmetric)
- Newsletter italic serif at "Stay a while." with underline input
- Form submits → page reloads (hook intact, no handler yet)

- [ ] **Step 6: Accessibility pass**

Run axe DevTools (browser extension) or Lighthouse → Accessibility. Target: 95+ score. Fix any:
- Missing alt text on images
- Insufficient color contrast
- Missing labels on form inputs
- Heading hierarchy skips

- [ ] **Step 7: Reduced-motion toggle test**

In devtools → Rendering → "Emulate CSS media prefers-reduced-motion: reduce". Reload. Confirm:
- No Ken Burns, parallax, magnetic cursor, or blur-in animations
- Page fades in gently; scrolling is native
- All content still visible and navigable

- [ ] **Step 8: Commit**

```bash
git add homepage/concept-a-editorial.html homepage/assets/css/concept-a.css homepage/assets/js/concept-a.js
git commit -m "concept A — add tours carousel, testimonials, trust counters, blog, newsletter"
```

---

## Task 9: Concept B — shell (nav + footer + concept-b.css)

Same pattern as Task 6 but for Concept B. Bold Nunito-only typography, white canvas, orange CTAs with glow.

**Files:**
- Create: `homepage/concept-b-modern.html`
- Create: `homepage/assets/css/concept-b.css`
- Create: `homepage/assets/js/concept-b.js`

Spec reference: spec §8 (Concept B).

- [ ] **Step 1: Create `concept-b-modern.html` shell**

Clone the structure from Task 6 Step 1 but swap class names from `ca-*` to `cb-*`, set `body class="cb"`, and use `assets/css/concept-b.css` + `assets/js/concept-b.js`. The nav markup looks like:

```html
<header class="cb-nav" role="banner">
  <div class="cb-nav__inner">
    <a href="index.html" class="cb-nav__logo">
      MyPrivateTours<span class="cb-nav__dot"></span>
    </a>
    <nav class="cb-nav__primary" aria-label="Primary">
      <ul>
        <li><a href="#cities" class="is-active">Cities</a></li>
        <li><a href="#tours">Tours</a></li>
        <li><a href="#journal">Travel Guides</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#b2b">B2B</a></li>
      </ul>
    </nav>
    <a href="#tours" class="cb-btn cb-btn--primary">Book a Tour</a>
  </div>
</header>
```

Footer: use the same 4-column layout as Concept A but with white canvas, bolder Nunito headings, and orange hover underlines (instead of color change). WhatsApp widget is a bold orange pill with the SVG glyph.

- [ ] **Step 2: Create `concept-b.css` — base, buttons, nav, footer, WhatsApp**

```css
/* ==========================================================================
   Concept B — Confident Modern
   Typography: Nunito only, weights 500/700/900 | Canvas: white
   Orange CTAs with soft shadow glow; sandy yellow highlight strokes
   ========================================================================== */

body.cb {
  background: #fff;
  color: var(--mpt-ink);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
}

.cb h1, .cb h2, .cb h3 { font-weight: 900; letter-spacing: -0.03em; }
.cb .eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--mpt-orange-soft);
  color: var(--mpt-orange);
  font-size: 12px;
  letter-spacing: 0.05em;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: var(--r-pill);
}
.cb .eyebrow-pill .pulse {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--mpt-orange);
  animation: cb-pulse 1.5s infinite;
}
@keyframes cb-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.3; }
}

/* ---- Buttons ---- */
.cb-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 28px;
  border-radius: var(--r-md);
  font-size: 15px;
  font-weight: 800;
  transition: transform 0.15s var(--ease-snap), box-shadow 0.2s, background 0.2s;
  cursor: pointer;
}
.cb-btn:hover { transform: scale(1.03); }
.cb-btn:active { transform: scale(0.97); }
.cb-btn--primary {
  background: var(--mpt-orange);
  color: #fff;
  box-shadow: 0 8px 24px rgba(224, 101, 60, 0.35);
}
.cb-btn--primary:hover { box-shadow: 0 12px 32px rgba(224, 101, 60, 0.5); }
.cb-btn--ghost {
  background: var(--mpt-off);
  color: var(--mpt-ink);
  border: 1.5px solid var(--mpt-ink);
}
.cb-btn--dark {
  background: var(--mpt-ink);
  color: #fff;
}

/* ---- Nav ---- */
.cb-nav {
  position: sticky; top: 0; z-index: 50;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.cb-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 40px;
  max-width: var(--container-max);
  margin: 0 auto;
}
.cb-nav__logo {
  font-weight: 900;
  font-size: 20px;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--mpt-ink);
}
.cb-nav__dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--mpt-orange);
}
.cb-nav__primary ul {
  display: flex;
  gap: 4px;
  font-size: 14px;
  font-weight: 700;
}
.cb-nav__primary a {
  padding: 8px 14px;
  border-radius: var(--r-sm);
  transition: background 0.2s, color 0.2s;
}
.cb-nav__primary a:hover,
.cb-nav__primary a.is-active {
  background: var(--mpt-orange-soft);
  color: var(--mpt-orange);
}

/* ---- Footer (white canvas, orange hover underlines) ---- */
.cb-footer {
  background: var(--mpt-off);
  border-top: 1px solid #f0f0f0;
  padding: 80px 40px 32px;
}
.cb-footer__inner { max-width: var(--container-max); margin: 0 auto; }
.cb-footer__top {
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid #e8e8e8;
}
.cb-footer__brand h3 {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -0.03em;
  display: flex; align-items: center; gap: 6px;
}
.cb-footer__brand h3 span {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--mpt-orange);
}
.cb-footer__brand p { font-size: 15px; color: #666; margin-top: 12px; max-width: 320px; }
.cb-footer h4 {
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 18px;
  letter-spacing: -0.01em;
}
.cb-footer ul { display: flex; flex-direction: column; gap: 10px; }
.cb-footer li a {
  font-size: 14px;
  color: #555;
  transition: color 0.2s;
  position: relative;
}
.cb-footer li a:hover { color: var(--mpt-orange); }
.cb-footer__bottom {
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #666;
  flex-wrap: wrap;
  gap: 16px;
}

/* ---- WhatsApp widget (bold orange pill) ---- */
.cb-whatsapp {
  position: fixed;
  right: 24px; bottom: 24px; z-index: 40;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--mpt-orange);
  color: #fff;
  padding: 14px 18px;
  border-radius: var(--r-pill);
  font-weight: 800;
  font-size: 14px;
  box-shadow: 0 10px 28px rgba(224, 101, 60, 0.4);
  transition: transform 0.15s var(--ease-snap), box-shadow 0.2s;
}
.cb-whatsapp:hover { transform: scale(1.05); box-shadow: 0 14px 34px rgba(224, 101, 60, 0.55); }
```

- [ ] **Step 3: Create `concept-b.js`**

```javascript
/**
 * concept-b.js — Confident Modern motion choreography
 * Section motion added in Tasks 10 and 11.
 */
(function () {
  MPT.initSmoothScroll({ duration: 1.0 });
})();
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:8080/homepage/concept-b-modern.html`. Verify:
- Nav shows bold Nunito logo with orange dot, 5 links with active "Cities" highlighted in orange-soft pill
- Orange primary CTA has glowing shadow
- Footer has bold Nunito hierarchy, orange hover on links
- WhatsApp widget is an orange pill with SVG glyph, scales on hover

- [ ] **Step 5: Commit**

```bash
git add homepage/concept-b-modern.html homepage/assets/css/concept-b.css homepage/assets/js/concept-b.js
git commit -m "concept B — add page shell, nav, footer, WhatsApp pill, button system"
```

---

## Task 10: Concept B — Hero, Cities, Why sections

Spec reference: spec §8.Layout.

**Files:**
- Modify: `homepage/concept-b-modern.html`
- Modify: `homepage/assets/css/concept-b.css`
- Modify: `homepage/assets/js/concept-b.js`

- [ ] **Step 1: Insert hero section**

```html
<section class="cb-hero" aria-labelledby="cb-hero-h1">
  <div class="container">
    <span class="eyebrow-pill"><span class="pulse"></span> Private tours · 8 cities worldwide</span>
    <h1 id="cb-hero-h1" class="cb-hero__h1" data-split-words>
      Extraordinary cities,<br />
      <span class="cb-hl">expertly</span> <em>private.</em>
    </h1>
    <p class="cb-hero__sub">Handpicked local guides. Zero strangers on your tour. Fully curated, instantly bookable.</p>
    <div class="cb-hero__ctas">
      <a href="#tours" class="cb-btn cb-btn--primary">Browse all tours →</a>
      <button type="button" class="cb-btn cb-btn--ghost">▷ Watch 60s intro</button>
    </div>
    <form class="cb-hero__search" action="#" method="get">
      <div class="cb-hero__search-field">
        <div class="lbl">Where</div>
        <div class="val">Paris, France</div>
      </div>
      <div class="cb-hero__search-field">
        <div class="lbl">When</div>
        <div class="val">Add dates</div>
      </div>
      <div class="cb-hero__search-field">
        <div class="lbl">Guests</div>
        <div class="val">2 travellers</div>
      </div>
      <button type="submit" class="cb-btn cb-btn--primary">Search</button>
    </form>
    <ul class="cb-hero__chips">
      <li><button class="cb-chip is-active">All</button></li>
      <li><button class="cb-chip">Paris</button></li>
      <li><button class="cb-chip">Rome</button></li>
      <li><button class="cb-chip">London</button></li>
      <li><button class="cb-chip">Barcelona</button></li>
      <li><button class="cb-chip">Florence</button></li>
      <li><button class="cb-chip">Prague</button></li>
      <li><button class="cb-chip">Venice</button></li>
      <li><button class="cb-chip">New York</button></li>
    </ul>
  </div>
</section>
```

- [ ] **Step 2: Insert Cities and Why sections**

```html
<section id="cities" class="cb-cities" aria-labelledby="cb-cities-h2">
  <div class="container">
    <header class="cb-cities__header">
      <h2 id="cb-cities-h2" data-split-words>Eight <em>unforgettable</em> cities</h2>
      <p>Pick your city. Find your tour. Book in 60 seconds.</p>
    </header>
    <div class="cb-cities__grid" data-cities-grid></div>
  </div>
</section>

<section class="cb-why" aria-labelledby="cb-why-h2">
  <div class="container">
    <header class="cb-why__header">
      <h2 id="cb-why-h2" data-split-words>Why <em>MyPrivateTours</em></h2>
      <p>Four things we refuse to compromise on.</p>
    </header>
    <div class="cb-why__grid">
      <div class="cb-why__card">
        <div class="cb-why__icon" aria-hidden="true">★</div>
        <h3>Expert local guides</h3>
        <p>City specialists — art historians, architects, chefs. They live where they teach.</p>
      </div>
      <div class="cb-why__card">
        <div class="cb-why__icon" aria-hidden="true">♡</div>
        <h3>100% private groups</h3>
        <p>No strangers. No compromises. Your tour, your pace, your questions.</p>
      </div>
      <div class="cb-why__card">
        <div class="cb-why__icon" aria-hidden="true">✓</div>
        <h3>Flexible booking</h3>
        <p>Free cancellation up to 48 hours before. Reschedule at no cost.</p>
      </div>
      <div class="cb-why__card">
        <div class="cb-why__icon" aria-hidden="true">◇</div>
        <h3>Fully curated</h3>
        <p>Every tour designed end-to-end by us. Skip-the-line and after-hours access included.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Append CSS for hero, cities, why**

```css
/* ---- Hero ---- */
.cb-hero { padding: 80px 40px 100px; text-align: center; }
.cb-hero__h1 {
  font-size: clamp(40px, 7vw, 80px);
  line-height: 1.02;
  margin: 20px auto 0;
  max-width: 920px;
}
.cb-hero__h1 em { color: var(--mpt-orange); font-style: normal; }
.cb-hl {
  position: relative;
  display: inline-block;
  white-space: nowrap;
}
.cb-hl::after {
  content: '';
  position: absolute;
  left: -4px; right: -4px; bottom: 6px;
  height: 18px;
  background: var(--mpt-sand);
  z-index: -1;
  border-radius: 4px;
  transform: scaleX(0);
  transform-origin: left;
}
.cb-hero__sub {
  font-size: 18px;
  color: #555;
  max-width: 620px;
  margin: 24px auto 0;
  line-height: 1.5;
}
.cb-hero__ctas {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 32px;
  flex-wrap: wrap;
}
.cb-hero__search {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr auto;
  gap: 1px;
  margin: 40px auto 0;
  max-width: 720px;
  background: var(--mpt-off);
  border: 1px solid #e8e8e8;
  border-radius: var(--r-lg);
  padding: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}
.cb-hero__search-field {
  background: #fff;
  text-align: left;
  padding: 10px 16px;
  border-radius: var(--r-md);
  cursor: pointer;
  transition: background 0.2s;
}
.cb-hero__search-field:hover { background: var(--mpt-orange-soft); }
.cb-hero__search-field .lbl {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #888;
}
.cb-hero__search-field .val {
  font-size: 14px;
  font-weight: 700;
  margin-top: 2px;
}
.cb-hero__search .cb-btn { border-radius: var(--r-md); padding: 0 28px; }
.cb-hero__chips {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
}
.cb-chip {
  font-size: 13px;
  font-weight: 700;
  padding: 8px 16px;
  border: 1px solid #e2e2e2;
  border-radius: var(--r-pill);
  color: #555;
  background: #fff;
  transition: all 0.2s;
}
.cb-chip:hover { border-color: var(--mpt-ink); }
.cb-chip.is-active { background: var(--mpt-ink); color: #fff; border-color: var(--mpt-ink); }

@media (max-width: 720px) {
  .cb-hero__search { grid-template-columns: 1fr; }
}

/* ---- Cities ---- */
.cb-cities { padding: 120px 0; background: var(--mpt-off); }
.cb-cities__header { text-align: center; margin-bottom: 64px; }
.cb-cities__header h2 {
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
}
.cb-cities__header h2 em { color: var(--mpt-orange); font-style: normal; }
.cb-cities__header p { color: #666; margin-top: 8px; font-size: 16px; }
.cb-cities__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.cb-city {
  position: relative;
  aspect-ratio: 3/4;
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--mpt-beige);
  cursor: pointer;
  transition: transform 0.3s var(--ease-snap);
}
.cb-city:hover { transform: translateY(-6px) scale(1.02); }
.cb-city img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}
.cb-city:hover img { transform: scale(1.06); }
.cb-city__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75), transparent 55%);
}
.cb-city__body {
  position: absolute;
  left: 16px; right: 16px; bottom: 16px;
  color: #fff;
}
.cb-city__name {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -0.02em;
}
.cb-city__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}
.cb-city__count { font-size: 12px; font-weight: 700; opacity: 0.9; }
.cb-city__view {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  padding: 6px 10px;
  border-radius: var(--r-sm);
  font-size: 11px;
  font-weight: 800;
}

@media (max-width: 960px) { .cb-cities__grid { grid-template-columns: repeat(2, 1fr); } }

/* ---- Why ---- */
.cb-why { padding: 120px 0; }
.cb-why__header { text-align: center; margin-bottom: 64px; }
.cb-why__header h2 {
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
}
.cb-why__header h2 em { color: var(--mpt-orange); font-style: normal; }
.cb-why__header p { color: #666; margin-top: 8px; font-size: 16px; }
.cb-why__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.cb-why__card {
  background: var(--mpt-off);
  border: 1px solid #eee;
  border-radius: var(--r-lg);
  padding: 28px;
  transition: transform 0.3s var(--ease-snap), border-color 0.2s, box-shadow 0.2s;
}
.cb-why__card:hover {
  transform: translateY(-4px);
  border-color: var(--mpt-orange);
  box-shadow: 0 14px 30px rgba(224, 101, 60, 0.12);
}
.cb-why__icon {
  width: 52px; height: 52px;
  display: flex; align-items: center; justify-content: center;
  background: var(--mpt-orange-soft);
  color: var(--mpt-orange);
  border-radius: var(--r-md);
  font-size: 24px;
  font-weight: 900;
}
.cb-why__card h3 { font-size: 20px; margin-top: 20px; font-weight: 900; letter-spacing: -0.02em; }
.cb-why__card p { color: #555; font-size: 15px; margin-top: 8px; line-height: 1.5; }

@media (max-width: 900px) { .cb-why__grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) { .cb-why__grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 4: Append JS for motion + cities population**

```javascript
// Hero headline word-by-word spring reveal
document.querySelectorAll('[data-split-words]').forEach((el) => {
  MPT.splitAndAnimate(el, {
    split: 'words', from: { y: 28, blur: 0 },
    stagger: 0.08, duration: 0.26, ease: 'back.out(1.4)', start: 'top 90%',
  });
});

// Highlight stroke — add `.is-revealed` when element enters viewport
const hlObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-revealed');
      hlObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.cb-hl').forEach((el) => hlObserver.observe(el));

// Populate cities grid
(async function () {
  const grid = document.querySelector('[data-cities-grid]');
  if (!grid) return;
  const res = await fetch('assets/data/cities.json');
  const cities = await res.json();

  cities.forEach((city) => {
    const a = document.createElement('a');
    a.className = 'cb-city';
    a.href = `#${city.slug}`;
    a.innerHTML = `
      <img src="${city.image}" alt="${city.name}, ${city.country}" loading="lazy" />
      <div class="cb-city__overlay"></div>
      <div class="cb-city__body">
        <div class="cb-city__name">${city.name}</div>
        <div class="cb-city__bottom">
          <span class="cb-city__count">${city.tourCount} private tours</span>
          <span class="cb-city__view">View →</span>
        </div>
      </div>
    `;
    grid.appendChild(a);
  });

  if (!MPT.isReducedMotion()) {
    gsap.from('.cb-city', {
      y: 30, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(1.2)',
      scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
    });
  }
})();

// Why cards stagger in
if (!MPT.isReducedMotion()) {
  gsap.from('.cb-why__card', {
    y: 30, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(1.3)',
    scrollTrigger: { trigger: '.cb-why__grid', start: 'top 85%', once: true },
  });
}
```

Also update the `.cb-hl` CSS (in Step 3 of this task) so the bar scales in only after JS adds `.is-revealed`. Replace the `.cb-hl::after` block with this:

```css
.cb-hl::after {
  content: '';
  position: absolute;
  left: -4px; right: -4px; bottom: 6px;
  height: 18px;
  background: var(--mpt-sand);
  z-index: -1;
  border-radius: 4px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.8s var(--ease-out);
}
.cb-hl.is-revealed::after { transform: scaleX(1); }
/* Fallback when JS disabled: keep the highlight visible statically */
.no-js .cb-hl::after { transform: scaleX(1); }
```

- [ ] **Step 5: Verify hero + cities + why**

Refresh page. Verify:
- Hero eyebrow pill has pulsing orange dot
- Headline reveals word-by-word with spring overshoot
- Sandy-yellow highlight stripe swipes in behind "expertly"
- Search pill renders with 4 cells, hover lightens each
- 9 city chips under search; "All" is active (dark)
- Cities grid: 4×2 of rounded cards, gradient overlay, "View →" chip slides in hover
- Why: 4 cards with orange-soft icon tiles; hover lifts + warms border

- [ ] **Step 6: Commit**

```bash
git add homepage/concept-b-modern.html homepage/assets/css/concept-b.css homepage/assets/js/concept-b.js
git commit -m "concept B — hero with search, cities grid, why cards, spring motion"
```

---

## Task 11: Concept B — Tours, Testimonials, Trust, Blog, Newsletter + polish

Spec reference: spec §8.Layout (Tours through Newsletter).

**Files:**
- Modify: `homepage/concept-b-modern.html`
- Modify: `homepage/assets/css/concept-b.css`
- Modify: `homepage/assets/js/concept-b.js`

- [ ] **Step 1: Insert remaining sections**

```html
<section id="tours" class="cb-tours" aria-labelledby="cb-tours-h2">
  <div class="container">
    <header class="cb-tours__header">
      <div>
        <p class="cb-tag">Featured tours</p>
        <h2 id="cb-tours-h2" data-split-words>Hand-picked, <em>never crowded.</em></h2>
      </div>
      <ul class="cb-tours__filters">
        <li><button class="cb-chip is-active" data-city="all">All</button></li>
        <li><button class="cb-chip" data-city="Paris">Paris</button></li>
        <li><button class="cb-chip" data-city="Rome">Rome</button></li>
        <li><button class="cb-chip" data-city="London">London</button></li>
      </ul>
    </header>
    <div class="cb-tours__grid" data-tours-grid></div>
  </div>
</section>

<section class="cb-testimonials" aria-labelledby="cb-test-h2">
  <div class="container">
    <header class="cb-test__header">
      <p class="cb-tag">Reviews</p>
      <h2 id="cb-test-h2" data-split-words><em>4.9 stars</em> from 12,000+ travellers.</h2>
    </header>
    <div class="cb-test__track" data-testimonials></div>
  </div>
</section>

<section class="cb-trust" aria-label="Our numbers">
  <div class="container">
    <ul class="cb-trust__list">
      <li><strong data-count="500000">0</strong><span>Travellers guided</span></li>
      <li><strong>4.9★</strong><span>Average rating</span></li>
      <li><strong data-count="8">0</strong><span>Cities curated</span></li>
      <li><strong>24/7</strong><span>Concierge</span></li>
    </ul>
  </div>
</section>

<section id="journal" class="cb-blog" aria-labelledby="cb-blog-h2">
  <div class="container">
    <header class="cb-blog__header">
      <div>
        <p class="cb-tag">Travel guides</p>
        <h2 id="cb-blog-h2" data-split-words>Read <em>before</em> you go.</h2>
      </div>
      <a href="#" class="cb-btn cb-btn--ghost">All articles →</a>
    </header>
    <div class="cb-blog__grid" data-blog-grid></div>
  </div>
</section>

<section class="cb-newsletter" aria-labelledby="cb-news-h2">
  <div class="container">
    <div class="cb-newsletter__card">
      <h2 id="cb-news-h2" data-split-words>Exclusive tours, straight to your inbox.</h2>
      <p>Monthly city guides, seasonal deals, and private tour launches. No spam.</p>
      <form class="cb-newsletter__form" action="#" method="post">
        <label class="sr-only" for="cb-email">Email</label>
        <input id="cb-email" type="email" placeholder="your@email.com" required />
        <button type="submit" class="cb-btn cb-btn--dark">Subscribe</button>
      </form>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append CSS for remaining sections**

```css
/* ---- Tours ---- */
.cb-tours { padding: 120px 0; background: #fff; }
.cb-tours__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 48px;
  flex-wrap: wrap;
  gap: 24px;
}
.cb-tag {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  font-weight: 800;
  color: var(--mpt-orange);
  margin-bottom: 8px;
}
.cb-tours__header h2 {
  font-size: clamp(32px, 4vw, 48px);
  line-height: 1.05;
}
.cb-tours__header em { color: var(--mpt-orange); font-style: normal; }
.cb-tours__filters { display: flex; gap: 8px; flex-wrap: wrap; }
.cb-tours__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.cb-tour {
  background: #fff;
  border: 1px solid #eee;
  border-radius: var(--r-lg);
  overflow: hidden;
  transition: transform 0.3s var(--ease-snap), box-shadow 0.2s;
  cursor: pointer;
}
.cb-tour:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.08); }
.cb-tour__img {
  aspect-ratio: 4/3;
  position: relative;
  overflow: hidden;
}
.cb-tour__img img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}
.cb-tour:hover .cb-tour__img img { transform: scale(1.04); }
.cb-tour__price {
  position: absolute;
  top: 10px; right: 10px;
  background: #fff;
  padding: 6px 12px;
  border-radius: var(--r-pill);
  font-size: 13px;
  font-weight: 800;
}
.cb-tour__body { padding: 18px; }
.cb-tour__name { font-weight: 900; font-size: 16px; letter-spacing: -0.01em; }
.cb-tour__meta {
  font-size: 13px;
  color: #666;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}
.cb-tour__rating { color: var(--mpt-ink); font-weight: 700; }
.cb-tour__rating em { color: var(--mpt-orange); font-style: normal; }

@media (max-width: 960px) { .cb-tours__grid { grid-template-columns: repeat(2, 1fr); } }

/* ---- Testimonials (peek carousel) ---- */
.cb-testimonials { padding: 120px 0; background: var(--mpt-off); overflow: hidden; }
.cb-test__header { text-align: center; margin-bottom: 48px; }
.cb-test__header h2 { font-size: clamp(32px, 4vw, 48px); line-height: 1.1; }
.cb-test__header em { color: var(--mpt-orange); font-style: normal; }
.cb-test__track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 8px 40px;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.cb-test__track::-webkit-scrollbar { display: none; }
.cb-test-card {
  flex: 0 0 360px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: var(--r-lg);
  padding: 28px;
  scroll-snap-align: start;
}
.cb-test-card__stars { color: var(--mpt-orange); letter-spacing: 2px; font-size: 16px; }
.cb-test-card__quote { margin-top: 14px; font-size: 16px; line-height: 1.55; }
.cb-test-card__who { margin-top: 18px; font-size: 13px; font-weight: 700; color: #666; }

/* ---- Trust ---- */
.cb-trust { padding: 60px 0; background: #fff; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; }
.cb-trust__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  gap: 24px;
}
.cb-trust__list strong {
  display: block;
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--mpt-ink);
}
.cb-trust__list span {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #666;
  font-weight: 800;
}

@media (max-width: 640px) { .cb-trust__list { grid-template-columns: 1fr 1fr; } }

/* ---- Blog ---- */
.cb-blog { padding: 120px 0; }
.cb-blog__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 48px;
  flex-wrap: wrap;
  gap: 24px;
}
.cb-blog__header h2 { font-size: clamp(32px, 4vw, 48px); line-height: 1.05; }
.cb-blog__header em { color: var(--mpt-orange); font-style: normal; }
.cb-blog__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
.cb-post {
  display: block;
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--mpt-off);
  transition: transform 0.3s var(--ease-snap);
}
.cb-post:hover { transform: translateY(-4px); }
.cb-post__img { aspect-ratio: 16/10; overflow: hidden; }
.cb-post__img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease-out); }
.cb-post:hover .cb-post__img img { transform: scale(1.05); }
.cb-post__body { padding: 22px; }
.cb-post__tag {
  display: inline-block;
  background: var(--mpt-orange-soft);
  color: var(--mpt-orange);
  padding: 4px 10px;
  border-radius: var(--r-pill);
  font-size: 11px;
  letter-spacing: 0.05em;
  font-weight: 800;
}
.cb-post__title { font-size: 19px; font-weight: 900; line-height: 1.3; margin-top: 12px; letter-spacing: -0.02em; }
.cb-post__meta { font-size: 13px; color: #666; display: flex; gap: 12px; margin-top: 10px; }

@media (max-width: 900px) { .cb-blog__grid { grid-template-columns: 1fr; } }

/* ---- Newsletter ---- */
.cb-newsletter { padding: 80px 40px 160px; }
.cb-newsletter__card {
  background: linear-gradient(135deg, var(--mpt-orange) 0%, #d8511c 100%);
  color: #fff;
  border-radius: var(--r-xl);
  padding: 80px 40px;
  text-align: center;
  max-width: var(--container-wide);
  margin: 0 auto;
}
.cb-newsletter h2 {
  font-size: clamp(32px, 4vw, 48px);
  line-height: 1.1;
  max-width: 680px;
  margin: 0 auto;
}
.cb-newsletter p {
  color: rgba(255, 255, 255, 0.85);
  margin-top: 14px;
  font-size: 16px;
}
.cb-newsletter__form {
  display: flex;
  gap: 10px;
  max-width: 480px;
  margin: 28px auto 0;
  flex-wrap: wrap;
  justify-content: center;
}
.cb-newsletter__form input {
  flex: 1 1 240px;
  padding: 14px 18px;
  border-radius: var(--r-md);
  border: 0;
  background: rgba(255, 255, 255, 0.95);
  font: inherit;
  font-size: 15px;
  color: var(--mpt-ink);
}
.cb-newsletter__form input:focus { outline: 2px solid var(--mpt-sand); outline-offset: 2px; }
```

- [ ] **Step 3: Append JS for tours, testimonials, chip filter, counters**

```javascript
// ==== Tours grid + chip filter ====
(async function () {
  const grid = document.querySelector('[data-tours-grid]');
  if (!grid) return;
  const res = await fetch('assets/data/tours.json');
  const tours = await res.json();

  function render(filter = 'all') {
    grid.innerHTML = '';
    const list = filter === 'all' ? tours : tours.filter((t) => t.city === filter);
    list.forEach((t) => {
      const article = document.createElement('article');
      article.className = 'cb-tour';
      article.innerHTML = `
        <div class="cb-tour__img">
          <img src="${t.image}" alt="${t.name}" loading="lazy" />
          <div class="cb-tour__price">From €${t.priceFrom}</div>
        </div>
        <div class="cb-tour__body">
          <div class="cb-tour__name">${t.name}</div>
          <div class="cb-tour__meta">
            <span>${t.city} · ${t.duration}</span>
            <span class="cb-tour__rating"><em>★</em> ${t.rating} (${t.reviews})</span>
          </div>
        </div>
      `;
      grid.appendChild(article);
    });

    if (!MPT.isReducedMotion()) {
      gsap.from('.cb-tour', {
        y: 20, opacity: 0, duration: 0.35, stagger: 0.05, ease: 'back.out(1.2)',
      });
    }
  }

  render();

  document.querySelectorAll('.cb-tours__filters .cb-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.cb-tours__filters .cb-chip').forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      render(chip.dataset.city);
    });
  });
})();

// ==== Testimonials as peek-carousel ====
(async function () {
  const track = document.querySelector('[data-testimonials]');
  if (!track) return;
  const res = await fetch('assets/data/testimonials.json');
  const reviews = await res.json();
  reviews.forEach((r) => {
    const card = document.createElement('article');
    card.className = 'cb-test-card';
    card.innerHTML = `
      <div class="cb-test-card__stars">${'★'.repeat(r.rating)}</div>
      <blockquote class="cb-test-card__quote">"${r.quote}"</blockquote>
      <div class="cb-test-card__who">${r.name} · ${r.city}</div>
    `;
    track.appendChild(card);
  });
})();

// ==== Trust counters ====
document.querySelectorAll('[data-count]').forEach((el) => {
  MPT.animateCounter(el, parseInt(el.dataset.count, 10), 1.6);
});

// ==== Blog populate ====
(async function () {
  const grid = document.querySelector('[data-blog-grid]');
  if (!grid) return;
  const res = await fetch('assets/data/blog-posts.json');
  const posts = await res.json();
  posts.forEach((p) => {
    const a = document.createElement('a');
    a.className = 'cb-post';
    a.href = `#${p.slug}`;
    a.innerHTML = `
      <div class="cb-post__img"><img src="${p.image}" alt="${p.title}" loading="lazy" /></div>
      <div class="cb-post__body">
        <span class="cb-post__tag">${p.tag}</span>
        <h3 class="cb-post__title">${p.title}</h3>
        <div class="cb-post__meta"><span>${p.city}</span><span>·</span><span>${p.readTime}</span></div>
      </div>
    `;
    grid.appendChild(a);
  });
})();

// Section-entry snap-up for all top-level sections
if (!MPT.isReducedMotion()) {
  gsap.utils.toArray('main > section').forEach((section) => {
    gsap.from(section, {
      y: 24, opacity: 0, duration: 0.45, ease: 'back.out(1.2)',
      scrollTrigger: { trigger: section, start: 'top 90%', once: true },
    });
  });
}
```

- [ ] **Step 4: Verify page top-to-bottom**

Refresh. Confirm:
- Tour filter chips change the grid contents
- Testimonials horizontal-scroll with snap, partial cards visible on edges
- Trust counters animate to target
- Blog cards with orange tag pill, spring lift on hover
- Newsletter orange gradient band, inline email submit
- Lighthouse Accessibility > 95
- Reduced-motion mode: no parallax/springs, static layout

- [ ] **Step 5: Commit**

```bash
git add homepage/concept-b-modern.html homepage/assets/css/concept-b.css homepage/assets/js/concept-b.js
git commit -m "concept B — tours filter, testimonials carousel, trust, blog, newsletter"
```

---

## Task 12: Concept C — shell (dark theme nav + footer + concept-c.css)

Spec reference: spec §9 (Concept C).

**Files:**
- Create: `homepage/concept-c-cinematic.html`
- Create: `homepage/assets/css/concept-c.css`
- Create: `homepage/assets/js/concept-c.js`

- [ ] **Step 1: Create `concept-c-cinematic.html` shell**

Structure mirrors Tasks 6 and 9 but the body uses `class="cc"` and dark theme. The nav starts transparent:

```html
<header class="cc-nav" role="banner" data-cc-nav>
  <div class="cc-nav__inner">
    <a href="index.html" class="cc-nav__logo">MyPrivate<em>Tours</em></a>
    <nav class="cc-nav__primary" aria-label="Primary">
      <ul>
        <li><a href="#cities">Cities</a></li>
        <li><a href="#tours">Tours</a></li>
        <li><a href="#journal">Journal</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
    <div class="cc-nav__right">
      <span class="cc-nav__lang">EN · €</span>
      <a href="#tours" class="cc-btn cc-btn--glow">Book Now</a>
    </div>
  </div>
</header>
```

Footer uses oversized serif wordmark on dark canvas. WhatsApp widget is a frosted-glass circle with orange glow.

- [ ] **Step 2: Create `concept-c.css` — base, buttons, nav, footer**

```css
/* ==========================================================================
   Concept C — Cinematic Immersive
   Typography: EB Garamond italic + Nunito | Canvas: near-black warm
   Orange as glow, sand as emphasis, Ken Burns + parallax + marquee
   ========================================================================== */

body.cc {
  background: var(--mpt-dark);
  color: #F8F8F8;
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  overflow-x: hidden;
}

.cc h1, .cc h2, .cc .serif { font-family: var(--font-serif); font-weight: 400; }
.cc em { font-style: italic; color: var(--mpt-sand); }

.cc .label {
  font-size: 11px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--mpt-sand);
  display: inline-flex;
  align-items: center;
  gap: 14px;
}
.cc .label::before {
  content: '';
  width: 40px; height: 1px;
  background: var(--mpt-sand);
}

/* ---- Buttons ---- */
.cc-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  border-radius: var(--r-pill);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: transform 0.25s var(--ease-out), box-shadow 0.3s;
}
.cc-btn--glow {
  background: var(--mpt-orange);
  color: #fff;
  box-shadow: 0 0 30px rgba(224, 101, 60, 0.45);
}
.cc-btn--glow:hover {
  transform: scale(1.03);
  box-shadow: 0 0 40px rgba(224, 101, 60, 0.7);
}
.cc-btn--frosted {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}
.cc-btn--text {
  color: var(--mpt-sand);
  padding: 11px 0;
  border-bottom: 1px solid var(--mpt-sand);
  border-radius: 0;
}

/* ---- Nav (transparent → solid dark on scroll) ---- */
.cc-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  transition: background 0.3s ease, backdrop-filter 0.3s ease, padding 0.3s ease;
}
.cc-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 40px;
  max-width: var(--container-max);
  margin: 0 auto;
}
.cc-nav.is-stuck {
  background: rgba(15, 9, 7, 0.85);
  backdrop-filter: blur(16px);
}
.cc-nav.is-stuck .cc-nav__inner { padding: 14px 40px; }
.cc-nav__logo {
  font-family: var(--font-serif);
  font-size: 22px;
  color: #fff;
}
.cc-nav__logo em { color: var(--mpt-sand); font-style: italic; }
.cc-nav__primary ul {
  display: flex;
  gap: 28px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.cc-nav__primary a { color: rgba(255, 255, 255, 0.85); transition: color 0.2s; }
.cc-nav__primary a:hover { color: var(--mpt-sand); }
.cc-nav__right { display: flex; align-items: center; gap: 16px; }
.cc-nav__lang {
  color: rgba(255, 255, 255, 0.7);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 6px 12px;
  border-radius: var(--r-pill);
}

/* ---- Footer ---- */
.cc-footer {
  background: #000;
  color: #F8F8F8;
  padding: 120px 40px 40px;
  border-top: 1px solid #1a1a1a;
  margin-top: 160px;
}
.cc-footer__inner { max-width: var(--container-max); margin: 0 auto; }
.cc-footer__wordmark {
  font-family: var(--font-serif);
  font-size: clamp(90px, 16vw, 240px);
  line-height: 0.9;
  letter-spacing: -0.03em;
  margin-bottom: 64px;
}
.cc-footer__wordmark em { font-style: italic; color: var(--mpt-orange); }
.cc-footer__cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 48px;
}
.cc-footer h4 {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--mpt-sand);
  font-weight: 700;
  margin-bottom: 18px;
}
.cc-footer ul { display: flex; flex-direction: column; gap: 12px; }
.cc-footer ul a {
  font-family: var(--font-serif);
  font-size: 15px;
  color: rgba(255,255,255,0.85);
  transition: color 0.2s;
}
.cc-footer ul a:hover { color: var(--mpt-orange); }
.cc-footer__bottom {
  margin-top: 64px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  font-style: italic;
}

/* ---- WhatsApp (frosted) ---- */
.cc-whatsapp {
  position: fixed;
  right: 28px; bottom: 28px; z-index: 40;
  width: 56px; height: 56px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  color: var(--mpt-sand);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 40px rgba(224, 101, 60, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
}
.cc-whatsapp:hover { transform: scale(1.08); box-shadow: 0 0 60px rgba(224, 101, 60, 0.6); }
```

- [ ] **Step 3: Create `concept-c.js`**

```javascript
(function () {
  MPT.initSmoothScroll({ duration: 1.4 });

  // Nav transparent → solid on scroll
  const nav = document.querySelector('[data-cc-nav]');
  if (nav) {
    ScrollTrigger.create({
      trigger: 'body',
      start: 60,
      end: 99999,
      onEnter: () => nav.classList.add('is-stuck'),
      onLeaveBack: () => nav.classList.remove('is-stuck'),
    });
  }
})();
```

- [ ] **Step 4: Verify shell in browser**

Load `http://localhost:8080/homepage/concept-c-cinematic.html`. Verify:
- Dark (`#0f0907`) canvas, cream text
- Nav transparent at top; scroll >60px → nav solidifies with blur backdrop
- Nav has italic serif wordmark + nav links + "EN · €" language pill + glowing orange CTA
- Footer has oversized serif wordmark + three link columns with serif body + orange-tinted glow around WhatsApp widget

- [ ] **Step 5: Commit**

```bash
git add homepage/concept-c-cinematic.html homepage/assets/css/concept-c.css homepage/assets/js/concept-c.js
git commit -m "concept C — add page shell, scroll-aware nav, frosted footer, WhatsApp glow"
```

---

## Task 13: Concept C — Hero (Ken Burns), Cities carousel, Why filmstrip

Spec reference: spec §9.Layout (Hero, Cities, Why).

**Files:**
- Modify: `homepage/concept-c-cinematic.html`
- Modify: `homepage/assets/css/concept-c.css`
- Modify: `homepage/assets/js/concept-c.js`

- [ ] **Step 1: Insert hero**

```html
<section class="cc-hero" aria-labelledby="cc-hero-h1">
  <div class="cc-hero__bg">
    <img src="PARIS-HERO-URL" alt="Paris — Eiffel Tower at sunset" class="cc-hero__img" />
    <div class="cc-hero__overlay"></div>
  </div>
  <div class="cc-hero__content">
    <div class="cc-hero__top">
      <span class="cc-live"><span class="dot"></span> Now in Paris · 18:42</span>
      <span class="cc-frame">01 / 08 — PARIS</span>
    </div>
    <div class="cc-hero__center">
      <p class="label">Chapter one — The curated city</p>
      <h1 id="cc-hero-h1" class="cc-hero__h1" data-split-lines>
        The world,<br /><em>on private terms.</em>
      </h1>
      <p class="cc-hero__sub">Expert local guides. Zero strangers. Eight cities, crafted into private chapters.</p>
    </div>
    <div class="cc-hero__bottom">
      <form class="cc-hero__search" action="#" method="get">
        <input type="search" placeholder="Where would you like to go?" aria-label="Destination" />
        <button type="submit" class="cc-btn cc-btn--glow">Explore</button>
      </form>
      <span class="cc-scroll">Scroll ↓</span>
    </div>
  </div>
</section>
```

Replace `PARIS-HERO-URL` with `cities.json[0].image` using `?w=1920`.

- [ ] **Step 2: Insert Cities carousel + marquee**

```html
<section id="cities" class="cc-cities" aria-labelledby="cc-cities-h2">
  <div class="container">
    <header class="cc-cities__header">
      <h2 id="cc-cities-h2" data-split-lines>Eight chapters,<br /><em>one passport.</em></h2>
      <div class="cc-cities__nav">
        <button class="cc-cities__arrow" data-scroll-cities="-1" aria-label="Previous">←</button>
        <button class="cc-cities__arrow" data-scroll-cities="1" aria-label="Next">→</button>
      </div>
    </header>
  </div>
  <div class="cc-cities__track" data-cities-grid></div>
  <div class="cc-marquee">
    <div class="cc-marquee__track" data-marquee>
      <!-- Filled by JS with duplicated spans -->
    </div>
  </div>
</section>
```

- [ ] **Step 3: Insert Why as sticky filmstrip**

```html
<section class="cc-why" aria-labelledby="cc-why-h2">
  <div class="cc-why__pin" data-why-pin>
    <div class="cc-why__left">
      <p class="label">Why MyPrivateTours</p>
      <h2 id="cc-why-h2" class="cc-why__title" data-why-title>
        <span class="cc-why__slide is-active" data-i="0">Expert local guides.</span>
        <span class="cc-why__slide" data-i="1">100% private groups.</span>
        <span class="cc-why__slide" data-i="2">Flexible booking.</span>
        <span class="cc-why__slide" data-i="3">Fully curated.</span>
      </h2>
      <div class="cc-why__body" data-why-body>
        <p class="cc-why__copy is-active" data-i="0">City specialists, not tour reps. They live where they teach.</p>
        <p class="cc-why__copy" data-i="1">No strangers. No pace compromise. Your tour is genuinely yours.</p>
        <p class="cc-why__copy" data-i="2">Free cancellation up to 48 hours before. Reschedule at no cost.</p>
        <p class="cc-why__copy" data-i="3">End-to-end design. Skip-the-line. After-hours access. No aggregators.</p>
      </div>
      <div class="cc-why__progress">
        <span data-dot="0" class="is-active"></span>
        <span data-dot="1"></span>
        <span data-dot="2"></span>
        <span data-dot="3"></span>
      </div>
    </div>
    <div class="cc-why__right" data-why-images>
      <img data-i="0" class="is-active" src="WHY-IMAGE-1" alt="Local guide with travellers" />
      <img data-i="1" src="WHY-IMAGE-2" alt="Private walking tour" />
      <img data-i="2" src="WHY-IMAGE-3" alt="Flexible booking moment" />
      <img data-i="3" src="WHY-IMAGE-4" alt="Curated after-hours access" />
    </div>
  </div>
</section>
```

Replace `WHY-IMAGE-1..4` with 4 tour-card images from `tours.json` or pick from Unsplash; `?w=1400` crop.

- [ ] **Step 4: Append CSS for hero**

```css
/* ---- Hero ---- */
.cc-hero {
  position: relative;
  min-height: 720px;
  height: 100vh;
  max-height: 900px;
  overflow: hidden;
  color: #fff;
}
.cc-hero__bg { position: absolute; inset: 0; }
.cc-hero__img {
  width: 100%; height: 100%;
  object-fit: cover;
  animation: cc-kenburns 20s var(--ease-out) infinite alternate;
  transform-origin: 50% 45%;
  will-change: transform;
}
@keyframes cc-kenburns {
  from { transform: scale(1); }
  to   { transform: scale(1.08); }
}
.cc-hero__overlay {
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 40% 60%, transparent 15%, rgba(0,0,0,0.4) 70%),
    linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%, rgba(0,0,0,0.2) 100%);
}
.cc-hero__content {
  position: relative;
  z-index: 2;
  padding: 120px 40px 48px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: var(--container-max);
  margin: 0 auto;
}
.cc-hero__top { display: flex; justify-content: space-between; align-items: center; }
.cc-live {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(10px);
  padding: 6px 14px;
  border-radius: var(--r-pill);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 700;
  border: 1px solid rgba(255,255,255,0.15);
}
.cc-live .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 10px #4ade80;
  animation: cc-pulse 1.5s infinite;
}
@keyframes cc-pulse { 0%,100% {opacity:1} 50% {opacity:.3} }
.cc-frame {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  font-variant-numeric: tabular-nums;
}
.cc-hero__h1 {
  font-size: clamp(56px, 10vw, 120px);
  line-height: 0.94;
  letter-spacing: -0.03em;
  margin-top: 24px;
  max-width: 820px;
}
.cc-hero__sub {
  font-size: 17px;
  color: rgba(255,255,255,0.85);
  margin-top: 24px;
  max-width: 460px;
  line-height: 1.5;
}
.cc-hero__bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 30px;
}
.cc-hero__search {
  flex: 1;
  max-width: 560px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: var(--r-pill);
  padding: 8px 8px 8px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
}
.cc-hero__search input {
  flex: 1;
  background: transparent;
  border: 0;
  color: #fff;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  outline: none;
}
.cc-hero__search input::placeholder { color: rgba(255,255,255,0.6); }
.cc-scroll {
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
}

@media (max-width: 720px) {
  .cc-hero { min-height: 560px; }
  .cc-hero__bottom { flex-direction: column; align-items: stretch; }
  .cc-scroll { display: none; }
}
```

- [ ] **Step 5: Append CSS for Cities carousel + marquee**

```css
/* ---- Cities cinematic carousel ---- */
.cc-cities { padding: 120px 0 60px; overflow: hidden; }
.cc-cities__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}
.cc-cities__header h2 {
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1;
  letter-spacing: -0.02em;
}
.cc-cities__header em { color: var(--mpt-orange); font-style: italic; }
.cc-cities__nav { display: flex; gap: 8px; }
.cc-cities__arrow {
  width: 48px; height: 48px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  color: #fff;
  font-size: 18px;
  transition: background 0.2s, border-color 0.2s;
}
.cc-cities__arrow:hover { background: rgba(255,255,255,0.08); border-color: var(--mpt-sand); }

.cc-cities__track {
  display: flex;
  gap: 18px;
  padding: 0 40px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
.cc-cities__track::-webkit-scrollbar { display: none; }
.cc-city {
  flex: 0 0 320px;
  height: 440px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  scroll-snap-align: start;
}
.cc-city img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}
.cc-city:hover img { transform: scale(1.06); }
.cc-city::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent 55%);
  z-index: 1;
}
.cc-city__meta {
  position: absolute;
  left: 22px; right: 22px; bottom: 22px;
  color: #fff;
  z-index: 2;
}
.cc-city__chapter {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 14px;
  color: rgba(255,255,255,0.7);
}
.cc-city__name {
  font-family: var(--font-serif);
  font-size: 42px;
  line-height: 1;
  margin-top: 6px;
}
.cc-city__info {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  font-weight: 700;
}

/* ---- Marquee ---- */
.cc-marquee {
  margin-top: 60px;
  padding: 28px 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  overflow: hidden;
}
.cc-marquee__track {
  display: flex;
  gap: 60px;
  white-space: nowrap;
  font-family: var(--font-serif);
  font-size: clamp(28px, 4vw, 44px);
  color: rgba(255,255,255,0.35);
  font-style: italic;
  will-change: transform;
}
.cc-marquee__track em { font-style: normal; color: var(--mpt-orange); }
```

- [ ] **Step 6: Append CSS for Why filmstrip**

```css
/* ---- Why filmstrip ---- */
.cc-why {
  height: 400vh; /* 4 scroll steps × 1 viewport each */
  position: relative;
}
.cc-why__pin {
  height: 100vh;
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  padding: 0 40px;
  align-items: center;
  max-width: var(--container-max);
  margin: 0 auto;
}
.cc-why__title {
  position: relative;
  font-size: clamp(52px, 8vw, 96px);
  line-height: 1;
  letter-spacing: -0.02em;
  min-height: 1.2em;
}
.cc-why__slide {
  position: absolute; top: 0; left: 0; right: 0;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s, transform 0.5s;
}
.cc-why__slide.is-active { opacity: 1; transform: translateY(0); color: var(--mpt-sand); font-style: italic; }
.cc-why__copy {
  position: absolute;
  opacity: 0;
  transform: translateY(30px);
  max-width: 460px;
  font-size: 17px;
  color: rgba(255,255,255,0.8);
  transition: opacity 0.5s 0.1s, transform 0.5s 0.1s;
}
.cc-why__copy.is-active { position: relative; opacity: 1; transform: translateY(0); }
.cc-why__body {
  margin-top: 32px;
  position: relative;
  min-height: 100px;
}
.cc-why__progress {
  display: flex;
  gap: 10px;
  margin-top: 40px;
}
.cc-why__progress span {
  width: 36px; height: 2px;
  background: rgba(255,255,255,0.25);
  transition: background 0.3s;
}
.cc-why__progress span.is-active { background: var(--mpt-orange); }
.cc-why__right {
  position: relative;
  aspect-ratio: 4/5;
  border-radius: 4px;
  overflow: hidden;
  height: 80%;
  max-height: 640px;
  justify-self: end;
}
.cc-why__right img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 0.6s, transform 1.2s var(--ease-out);
}
.cc-why__right img.is-active { opacity: 1; transform: scale(1); }

@media (max-width: 900px) {
  .cc-why { height: auto; }
  .cc-why__pin { position: relative; height: auto; grid-template-columns: 1fr; padding: 80px 20px; }
  .cc-why__right { height: 400px; justify-self: stretch; }
  .cc-why__slide:not(.is-active) { display: none; }
}
```

- [ ] **Step 7: Append JS for hero reveal, cities carousel, marquee, Why pin**

```javascript
// ---- Hero headline line-by-line mask wipe ----
document.querySelectorAll('[data-split-lines]').forEach((el) => {
  MPT.splitAndAnimate(el, {
    split: 'lines',
    from: { y: 40, blur: 10 },
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    start: 'top 90%',
  });
});

// ---- Cities: populate + wire arrows ----
(async function () {
  const track = document.querySelector('[data-cities-grid]');
  if (!track) return;
  const res = await fetch('assets/data/cities.json');
  const cities = await res.json();

  cities.forEach((city, i) => {
    const div = document.createElement('article');
    div.className = 'cc-city';
    const chapter = String(i + 1).padStart(2, '0');
    div.innerHTML = `
      <img src="${city.image}" alt="${city.name}, ${city.country}" loading="lazy" />
      <div class="cc-city__meta">
        <div class="cc-city__chapter">Chapter ${chapter}</div>
        <div class="cc-city__name">${city.name}</div>
        <div class="cc-city__info"><span>${city.tourCount} tours</span><span>${city.countryCode}</span></div>
      </div>
    `;
    track.appendChild(div);
  });

  document.querySelectorAll('[data-scroll-cities]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dir = parseInt(btn.dataset.scrollCities, 10);
      track.scrollBy({ left: dir * 340, behavior: 'smooth' });
    });
  });

  // Marquee: populate
  const marquee = document.querySelector('[data-marquee]');
  if (marquee) {
    const piece = cities.map((c) => c.name).join(' <em>✦</em> ');
    marquee.innerHTML = `<span>${piece} <em>✦</em> </span><span aria-hidden="true">${piece} <em>✦</em> </span>`;

    if (!MPT.isReducedMotion()) {
      gsap.to(marquee, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    }
  }
})();

// ---- Why filmstrip: pin + stepped reveal via ScrollTrigger ----
(function () {
  if (MPT.isReducedMotion()) return;
  const steps = 4;
  ScrollTrigger.create({
    trigger: '.cc-why',
    start: 'top top',
    end: `+=${steps * window.innerHeight}`,
    scrub: true,
    onUpdate: (self) => {
      const idx = Math.min(steps - 1, Math.floor(self.progress * steps));
      document.querySelectorAll('[data-why-title] .cc-why__slide').forEach((el) => {
        el.classList.toggle('is-active', parseInt(el.dataset.i, 10) === idx);
      });
      document.querySelectorAll('[data-why-body] .cc-why__copy').forEach((el) => {
        el.classList.toggle('is-active', parseInt(el.dataset.i, 10) === idx);
      });
      document.querySelectorAll('[data-why-images] img').forEach((el) => {
        el.classList.toggle('is-active', parseInt(el.dataset.i, 10) === idx);
      });
      document.querySelectorAll('.cc-why__progress span').forEach((el) => {
        el.classList.toggle('is-active', parseInt(el.dataset.dot, 10) === idx);
      });
    },
  });
})();
```

- [ ] **Step 8: Verify hero + cities + Why**

Refresh `http://localhost:8080/homepage/concept-c-cinematic.html`. Check:
- Hero: full-bleed Paris image with slow Ken Burns zoom (visible over ~20 seconds)
- Dark overlay preserves contrast; headline italic serif with sand emphasis
- Green live dot pulses in top-left indicator
- Frame counter "01 / 08 — PARIS" in top-right
- Headline reveals line-by-line with blur-in on load
- Frosted search pill at bottom-left; vertical "Scroll ↓" at right
- Nav becomes solid dark with blur when scrolling past 60px
- Cities: horizontal-scrolling cinematic cards with chapter framing; arrows shift track
- Marquee: city names drift right-to-left infinitely
- Why: sticky for 4 scroll-steps; headline text + body copy + image all swap through 4 states as you scroll

- [ ] **Step 9: Commit**

```bash
git add homepage/concept-c-cinematic.html homepage/assets/css/concept-c.css homepage/assets/js/concept-c.js
git commit -m "concept C — Ken Burns hero, cinematic cities carousel, marquee, sticky filmstrip Why"
```

---

## Task 14: Concept C — Tours, Testimonials, Trust, Blog, Newsletter + polish

Spec reference: spec §9.Layout (Tours through Footer).

**Files:**
- Modify: `homepage/concept-c-cinematic.html`
- Modify: `homepage/assets/css/concept-c.css`
- Modify: `homepage/assets/js/concept-c.js`

- [ ] **Step 1: Insert remaining sections**

```html
<section id="tours" class="cc-tours" aria-labelledby="cc-tours-h2">
  <div class="container">
    <header class="cc-tours__header">
      <p class="label">Featured tours</p>
      <h2 id="cc-tours-h2" data-split-lines>Cinema-worthy<br /><em>afternoons.</em></h2>
    </header>
    <div class="cc-tours__grid" data-tours-grid></div>
  </div>
</section>

<section class="cc-testimonials" aria-labelledby="cc-test-h2">
  <h2 id="cc-test-h2" class="sr-only">Traveller reviews</h2>
  <div class="cc-test__stage" data-testimonials>
    <!-- One active at a time; rotates on scroll -->
  </div>
</section>

<section class="cc-trust" aria-label="Our numbers">
  <div class="container">
    <ul class="cc-trust__strip">
      <li><strong data-count="500000">0</strong><span>Travellers guided</span></li>
      <li><strong>4.9<em>★</em></strong><span>Average rating</span></li>
      <li><strong data-count="8">0</strong><span>Cities</span></li>
      <li><strong>24/7</strong><span>Concierge</span></li>
      <li><strong>48h</strong><span>Free cancel</span></li>
    </ul>
  </div>
</section>

<section id="journal" class="cc-blog" aria-labelledby="cc-blog-h2">
  <div class="container">
    <header class="cc-blog__header">
      <p class="label">The journal</p>
      <h2 id="cc-blog-h2" data-split-lines>Stories<br /><em>before departure.</em></h2>
    </header>
    <div class="cc-blog__grid" data-blog-grid></div>
  </div>
</section>

<section class="cc-newsletter" aria-labelledby="cc-news-h2">
  <div class="container">
    <h2 id="cc-news-h2" data-split-lines><em>Join the journal.</em></h2>
    <p>Quiet seasonal notes, unpublished city guides, and first access to new tours.</p>
    <form class="cc-newsletter__form" action="#" method="post">
      <label class="sr-only" for="cc-email">Email</label>
      <input id="cc-email" type="email" placeholder="your@email.com" required />
      <button type="submit" class="cc-btn cc-btn--glow">Subscribe</button>
    </form>
  </div>
</section>
```

- [ ] **Step 2: Append CSS for Tours, Testimonials, Trust, Blog, Newsletter**

```css
/* ---- Tours (dark grid with Ken Burns per card) ---- */
.cc-tours { padding: 120px 0; }
.cc-tours__header { text-align: center; margin-bottom: 64px; }
.cc-tours__header h2 {
  font-size: clamp(44px, 6vw, 80px);
  line-height: 1;
  margin-top: 18px;
}
.cc-tours__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.cc-tour {
  position: relative;
  aspect-ratio: 4/5;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}
.cc-tour img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 6s var(--ease-out);
}
.cc-tour:hover img { transform: scale(1.06); }
.cc-tour::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%);
  z-index: 1;
}
.cc-tour__body {
  position: absolute;
  left: 20px; right: 20px; bottom: 20px;
  z-index: 2;
  color: #fff;
}
.cc-tour__name { font-family: var(--font-serif); font-size: 24px; line-height: 1.1; font-style: italic; }
.cc-tour__meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.75);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  margin-top: 10px;
}
.cc-tour__meta .price em { color: var(--mpt-sand); font-style: normal; }

@media (max-width: 900px) { .cc-tours__grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 540px) { .cc-tours__grid { grid-template-columns: 1fr; } }

/* ---- Testimonials (fullscreen quotes) ---- */
.cc-testimonials { padding: 60px 0; }
.cc-test__stage {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.cc-test-quote {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  position: relative;
  overflow: hidden;
  background: var(--mpt-dark);
}
.cc-test-quote img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.25;
  filter: grayscale(30%);
}
.cc-test-quote__inner {
  position: relative;
  z-index: 2;
  max-width: 760px;
  text-align: center;
  color: #fff;
}
.cc-test-quote blockquote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(26px, 3.5vw, 44px);
  line-height: 1.3;
  letter-spacing: -0.01em;
}
.cc-test-quote .who {
  margin-top: 32px;
  font-family: var(--font-sans);
  font-size: 13px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--mpt-sand);
}

/* ---- Trust strip ---- */
.cc-trust { padding: 60px 0; border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); }
.cc-trust__strip {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
  gap: 20px;
  align-items: center;
}
.cc-trust__strip li + li { border-left: 1px dashed rgba(255,255,255,0.12); padding-left: 20px; }
.cc-trust__strip strong {
  display: block;
  font-family: var(--font-serif);
  font-size: clamp(32px, 4vw, 52px);
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}
.cc-trust__strip em { color: var(--mpt-orange); font-style: normal; }
.cc-trust__strip span {
  display: block;
  margin-top: 6px;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  font-weight: 700;
}

@media (max-width: 720px) {
  .cc-trust__strip { grid-template-columns: 1fr 1fr; }
  .cc-trust__strip li + li { border-left: 0; padding-left: 0; }
}

/* ---- Blog ---- */
.cc-blog { padding: 120px 0; }
.cc-blog__header { text-align: center; margin-bottom: 64px; }
.cc-blog__header h2 {
  font-size: clamp(44px, 6vw, 80px);
  line-height: 1;
  margin-top: 18px;
}
.cc-blog__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.cc-post {
  display: block;
  transition: transform 0.3s var(--ease-out);
}
.cc-post:hover { transform: translateY(-4px); }
.cc-post__img { aspect-ratio: 16/10; overflow: hidden; border-radius: 4px; }
.cc-post__img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease-out); }
.cc-post:hover .cc-post__img img { transform: scale(1.05); filter: brightness(0.8); }
.cc-post__tag {
  display: block;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--mpt-sand);
  font-weight: 700;
  margin-top: 18px;
}
.cc-post__title {
  font-family: var(--font-serif);
  font-size: 28px;
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin-top: 10px;
}
.cc-post__meta {
  font-size: 12px;
  color: rgba(255,255,255,0.55);
  margin-top: 10px;
  display: flex;
  gap: 12px;
}

@media (max-width: 900px) { .cc-blog__grid { grid-template-columns: 1fr; } }

/* ---- Newsletter ---- */
.cc-newsletter { padding: 120px 0 160px; text-align: center; background: linear-gradient(180deg, var(--mpt-dark) 0%, #000 100%); }
.cc-newsletter h2 {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(52px, 8vw, 96px);
  line-height: 1;
  letter-spacing: -0.03em;
}
.cc-newsletter h2 em { color: var(--mpt-orange); }
.cc-newsletter p {
  font-family: var(--font-serif);
  font-size: 17px;
  color: rgba(255,255,255,0.7);
  margin-top: 16px;
  max-width: 520px;
  margin-left: auto; margin-right: auto;
  font-style: italic;
}
.cc-newsletter__form {
  display: flex;
  gap: 10px;
  max-width: 500px;
  margin: 36px auto 0;
  justify-content: center;
  flex-wrap: wrap;
}
.cc-newsletter__form input {
  flex: 1 1 260px;
  padding: 14px 20px;
  border-radius: var(--r-pill);
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.05);
  color: #fff;
  font: inherit;
  font-size: 15px;
}
.cc-newsletter__form input::placeholder { color: rgba(255,255,255,0.5); }
.cc-newsletter__form input:focus { outline: none; border-color: var(--mpt-sand); }
```

- [ ] **Step 3: Append JS for tours grid, testimonials scroll, counters, blog**

```javascript
// ---- Tours dark grid ----
(async function () {
  const grid = document.querySelector('[data-tours-grid]');
  if (!grid) return;
  const res = await fetch('assets/data/tours.json');
  const tours = await res.json();
  tours.slice(0, 6).forEach((t) => {
    const a = document.createElement('a');
    a.className = 'cc-tour';
    a.href = `#${t.id}`;
    a.innerHTML = `
      <img src="${t.image}" alt="${t.name}" loading="lazy" />
      <div class="cc-tour__body">
        <div class="cc-tour__name">${t.name}</div>
        <div class="cc-tour__meta">
          <span>${t.city} · ${t.duration}</span>
          <span class="price">From <em>€${t.priceFrom}</em></span>
        </div>
      </div>
    `;
    grid.appendChild(a);
  });
})();

// ---- Testimonials as fullscreen quotes ----
(async function () {
  const stage = document.querySelector('[data-testimonials]');
  if (!stage) return;
  const res = await fetch('assets/data/testimonials.json');
  const reviews = await res.json();
  const citiesRes = await fetch('assets/data/cities.json');
  const cities = await citiesRes.json();

  reviews.forEach((r) => {
    const section = document.createElement('div');
    section.className = 'cc-test-quote';
    const cityData = cities.find((c) => c.name === r.city);
    const bgImage = cityData ? cityData.image : '';
    section.innerHTML = `
      <img src="${bgImage}" alt="" />
      <div class="cc-test-quote__inner">
        <blockquote>"${r.quote}"</blockquote>
        <div class="who">${r.name} · ${r.city}</div>
      </div>
    `;
    stage.appendChild(section);
  });
})();

// ---- Trust counters ----
document.querySelectorAll('[data-count]').forEach((el) => {
  MPT.animateCounter(el, parseInt(el.dataset.count, 10), 1.6);
});

// ---- Blog populate ----
(async function () {
  const grid = document.querySelector('[data-blog-grid]');
  if (!grid) return;
  const res = await fetch('assets/data/blog-posts.json');
  const posts = await res.json();
  posts.forEach((p) => {
    const a = document.createElement('a');
    a.className = 'cc-post';
    a.href = `#${p.slug}`;
    a.innerHTML = `
      <div class="cc-post__img"><img src="${p.image}" alt="${p.title}" loading="lazy" /></div>
      <span class="cc-post__tag">${p.tag} · ${p.city}</span>
      <h3 class="cc-post__title">${p.title}</h3>
      <div class="cc-post__meta"><span>${p.readTime}</span><span>${new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
    `;
    grid.appendChild(a);
  });
})();

// ---- Section-entry curtain mask ----
if (!MPT.isReducedMotion()) {
  gsap.utils.toArray('main > section').forEach((section) => {
    gsap.from(section, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 85%', once: true },
    });
  });
}
```

- [ ] **Step 4: Verify page bottom-to-top**

Refresh. Check:
- Tours: 3×2 dark cards with italic serif name, sand-highlighted price
- Testimonials: each quote fills ~80vh; background city image with 25% opacity + grayscale; quote italic serif, who line sand color
- Trust: 5-item thin strip with dashed dividers, serif numbers, sand orange star
- Blog: 3-col dark with oversized serif titles, sand category tag
- Newsletter: giant italic serif, frosted input pill, glowing orange button
- Curtain mask transition visible between sections on scroll

- [ ] **Step 5: Reduced-motion test**

Toggle `prefers-reduced-motion: reduce` in devtools. Confirm:
- Ken Burns stopped (static image)
- Marquee stopped
- Filmstrip reduces to linear flow (all 4 Why panels visible)
- Curtain masks disabled
- Scroll becomes native (no Lenis smoothing)

- [ ] **Step 6: Responsive check at 1280 / 900 / 400**

At 400px width:
- Hero headline wraps gracefully
- Cities carousel still drags horizontally
- Why filmstrip collapses to vertical stack (panel stack visible in flow)
- Tours grid single column

- [ ] **Step 7: Commit**

```bash
git add homepage/concept-c-cinematic.html homepage/assets/css/concept-c.css homepage/assets/js/concept-c.js
git commit -m "concept C — tours dark grid, scroll-driven testimonials, trust strip, blog, newsletter"
```

---

## Task 15: Landing index + cross-concept audit

Finish the landing page (now the navigation launchpad), audit all three concepts in parallel, ship.

**Files:**
- Rewrite: `homepage/index.html`

- [ ] **Step 1: Rewrite `homepage/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MyPrivateTours — Homepage concepts</title>
  <link rel="stylesheet" href="assets/css/tokens.css" />
  <link rel="stylesheet" href="assets/css/base.css" />
  <style>
    body { background: var(--mpt-off); min-height: 100vh; }
    .landing { max-width: 1280px; margin: 0 auto; padding: 80px 40px; }
    .landing__head { text-align: center; margin-bottom: 64px; }
    .landing__kicker { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; font-weight: 700; color: var(--mpt-orange); }
    .landing__title { font-family: var(--font-serif); font-size: clamp(48px, 7vw, 80px); line-height: 1; letter-spacing: -0.03em; margin-top: 16px; }
    .landing__title em { color: var(--mpt-orange); font-style: italic; }
    .landing__sub { font-size: 17px; color: #555; margin-top: 18px; max-width: 560px; margin-left: auto; margin-right: auto; }
    .concepts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .concept { display: block; background: #fff; border: 1px solid #eee; border-radius: var(--r-lg); overflow: hidden; transition: transform 0.3s var(--ease-out), box-shadow 0.3s; text-decoration: none; color: inherit; }
    .concept:hover { transform: translateY(-6px); box-shadow: 0 24px 50px rgba(0,0,0,0.1); }
    .concept__preview { aspect-ratio: 4/3; position: relative; overflow: hidden; }
    .concept--a .concept__preview { background: var(--mpt-beige); }
    .concept--b .concept__preview { background: linear-gradient(135deg, #fff 0%, var(--mpt-orange-soft) 100%); }
    .concept--c .concept__preview { background: linear-gradient(135deg, #2a1408 0%, #5a2d15 50%, var(--mpt-orange) 100%); }
    .concept__preview-h { position: absolute; left: 24px; bottom: 24px; right: 24px; }
    .concept--a .concept__preview-h { font-family: var(--font-serif); font-size: 28px; font-style: italic; color: var(--mpt-ink); }
    .concept--b .concept__preview-h { font-weight: 900; font-size: 24px; color: var(--mpt-ink); }
    .concept--c .concept__preview-h { font-family: var(--font-serif); font-size: 28px; font-style: italic; color: #fff; }
    .concept__body { padding: 24px; }
    .concept__label { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 800; color: var(--mpt-orange); }
    .concept__name { font-size: 20px; font-weight: 800; margin-top: 6px; }
    .concept__desc { font-size: 14px; color: #666; margin-top: 8px; line-height: 1.5; }
    .concept__cta { display: inline-flex; gap: 8px; align-items: center; margin-top: 16px; font-size: 13px; font-weight: 800; color: var(--mpt-ink); }
    .concept:hover .concept__cta { color: var(--mpt-orange); }
    @media (max-width: 900px) { .concepts { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <main class="landing">
    <header class="landing__head">
      <p class="landing__kicker">MyPrivateTours — Homepage concepts</p>
      <h1 class="landing__title">Three ways to <em>tell the story.</em></h1>
      <p class="landing__sub">Same brand. Same sitemap. Three distinct homepage designs for your review. Click a concept to open the full page.</p>
    </header>
    <div class="concepts">
      <a href="concept-a-editorial.html" class="concept concept--a">
        <div class="concept__preview"><div class="concept__preview-h">Discover the world, <em>privately.</em></div></div>
        <div class="concept__body">
          <span class="concept__label">Concept A</span>
          <h2 class="concept__name">Editorial Minimal</h2>
          <p class="concept__desc">Serif italic display, asymmetric grids, beige canvas. A travel magazine you'd find at an Aman resort.</p>
          <span class="concept__cta">View concept →</span>
        </div>
      </a>
      <a href="concept-b-modern.html" class="concept concept--b">
        <div class="concept__preview"><div class="concept__preview-h">Extraordinary cities, expertly private.</div></div>
        <div class="concept__body">
          <span class="concept__label">Concept B</span>
          <h2 class="concept__name">Confident Modern</h2>
          <p class="concept__desc">Bold Nunito, highlight strokes, snappy springs. Airbnb Luxe meets Linear — agency-polished.</p>
          <span class="concept__cta">View concept →</span>
        </div>
      </a>
      <a href="concept-c-cinematic.html" class="concept concept--c">
        <div class="concept__preview"><div class="concept__preview-h">The world, <em>on private terms.</em></div></div>
        <div class="concept__body">
          <span class="concept__label">Concept C</span>
          <h2 class="concept__name">Cinematic Immersive</h2>
          <p class="concept__desc">Full-bleed Ken Burns, mixed serif + sans, orange glow. A travel docuseries opening.</p>
          <span class="concept__cta">View concept →</span>
        </div>
      </a>
    </div>
  </main>
</body>
</html>
```

- [ ] **Step 2: Lighthouse audit — all three concepts**

For each concept page, run Chrome DevTools → Lighthouse (mobile + desktop). Target:
- Performance: ≥ 80 (mobile), ≥ 90 (desktop)
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 90

Fix any issues. Common fixes:
- Missing image dimensions → add `width` and `height` on `<img>`
- Missing `lang` or `title` → check `<html lang>` and `<title>`
- Contrast ratio on sand/orange — check specific pairings
- Missing `meta description` — already in each file

- [ ] **Step 3: Cross-browser smoke test**

Open each concept in:
- Chrome latest
- Safari latest (or WebKit-based browser)
- Firefox latest

Confirm:
- Fonts load correctly
- GSAP animations run
- Lenis smooth-scroll works
- Backdrop-filter renders (or gracefully degrades) on Safari/Firefox
- No console errors

- [ ] **Step 4: Keyboard navigation test**

Tab through each concept from top to bottom. Confirm:
- Focus-visible ring appears on each interactive element
- Tab order follows visual order
- Can reach and activate all CTAs, nav items, form inputs
- Can dismiss any popups/overlays with Esc

- [ ] **Step 5: Final commit + push**

```bash
git add homepage/index.html
git commit -m "finalize landing index with 3-concept launcher tiles"
git push origin main
```

- [ ] **Step 6: Verify deployable**

From a fresh terminal:

```bash
cd "D:/Code Files/my private tours"
python -m http.server 8080
```

Then share:
- `http://localhost:8080/homepage/` (or the production URL once deployed) with the client for review.

---

## Self-review checklist

Run through this after completing all 15 tasks:

**Spec coverage:**
- [ ] All 10 sections implemented in each of the 3 concepts (nav, hero, cities, why, tours, testimonials, trust, blog, newsletter, footer)
- [ ] Concept A uses EB Garamond + Nunito, asymmetric layouts, beige canvas ← spec §7
- [ ] Concept B uses Nunito-only, highlight strokes, search pill, city chips ← spec §8
- [ ] Concept C uses EB Garamond italic + Nunito, Ken Burns, sticky filmstrip, marquee ← spec §9
- [ ] All three concepts have styled WhatsApp widgets ← spec §15
- [ ] All three share `tokens.css`, `base.css`, `motion-core.js` ← spec §3
- [ ] Data layer (cities, tours, testimonials, blog-posts) shared across concepts ← spec §11
- [ ] Unsplash imagery documented in `sources.md` with photographer credits ← spec §5

**Accessibility:**
- [ ] All three concepts pass Lighthouse Accessibility ≥ 95
- [ ] `prefers-reduced-motion` respected on every concept
- [ ] Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) present
- [ ] Alt text on every image
- [ ] Focus-visible styles consistent within each concept

**Performance:**
- [ ] Hero LCP image preloaded in each concept
- [ ] Fonts preloaded
- [ ] Images lazy-loaded below the fold
- [ ] Shared JS (Lenis + GSAP) under 90KB gzipped (check Network tab)

**Responsiveness:**
- [ ] All three concepts functional at 1440 / 1280 / 900 / 768 / 400 widths
- [ ] Hero, cities grid, why, tours, blog all collapse gracefully

**Fixes anything found during the checklist with a targeted commit.**
