# DESIGN.md

> A teacher's squared notebook come to life: warm, handmade and a little bit magic, never a template.

## 1. Visual Theme & Atmosphere

**Style**: Playful Classroom × Warm Professional ("The Squared Notebook")
**Keywords**: caring, handmade, Cyrillic, squared paper, fridge-magnet letters, sunny, trustworthy, alive
**Tone**: warm, personal, joyful, reassuring to parents — NOT corporate SaaS, NOT glassy AI gradient, NOT childish clip-art
**Feel**: Opening the exercise book of the teacher every child remembers: squared paper, coloured magnet letters on the fridge, a handwritten note in the margin that says "well done!".

**Concept anchors (what makes it not-a-template):**
1. **Cyrillic as hero.** Bulgaria gave the world the Cyrillic alphabet. Big, coloured, *draggable* magnet letters (А Б В Г Д Ж Щ Ю Я) float around the hero. Click one and it teaches you a word.
2. **Squared-paper ground** (тетрадка на квадратчета, the notebook every Bulgarian child uses) with a pink margin line.
3. **Handwritten margin notes** in Caveat: little arrows and annotations, the teacher's voice.
4. **Time-zone planner** as the centrepiece: "Her morning is your afternoon". Parents pick their city and see her free hours in their own time.

**Interaction Tier**: L2 Fluid
**Dependencies**: React 19 + TypeScript + Vite, Tailwind CSS v4, `motion` (motion/react), `lucide-react`. No GSAP, no Lenis, no WebGL.

## 2. Color Palette & Roles

Source of truth: `src/theme.css` (copied verbatim from the provided `theme.css`, plus the extension block below). Light mode is the designed experience; the `.dark` tokens are kept for future use.

```css
:root {
  /* Backgrounds */
  --background: #ffffff;          /* page */
  --card: #f8fafc;                /* cards / surfaces */
  --muted: #f1f5f9;               /* alternating sections, input bg */
  --sidebar-accent: #e2e8f0;      /* surface hover */

  /* Borders */
  --border: #e2e8f0;
  --sidebar-border: #cbd5e1;      /* border hover / grid lines */

  /* Text */
  --foreground: #1c1917;          /* headings, key text */
  --sidebar-foreground: #334155;  /* body copy */
  --muted-foreground: #64748b;    /* labels, meta */

  /* Brand */
  --primary: #6366f1;             /* indigo: CTAs, links, active, focus ring */
  --secondary: #facc15;           /* sunshine: highlights, "free" badges, marker strokes */
  --accent: #4ade80;              /* leaf: availability / success / "free slot" */
  --chart-4: #f472b6;             /* pink: margin line, hearts, magnet letter */
  --chart-5: #fb923c;             /* orange: magnet letter, warm accents */
  --destructive: #ef4444;

  /* ── Extension (added in src/theme.css) ── */
  --primary-hover: color-mix(in oklab, var(--primary) 85%, black);
  --primary-rgb: 99, 102, 241;
  --secondary-rgb: 250, 204, 21;
  --accent-rgb: 74, 222, 128;
  --pink-rgb: 244, 114, 182;
  --orange-rgb: 251, 146, 60;
  --foreground-rgb: 28, 25, 23;
  --paper-grid: rgba(var(--primary-rgb), 0.07);   /* squared-paper lines */
  --paper-margin: rgba(var(--pink-rgb), 0.45);    /* notebook margin line */
  --whatsapp: #25d366;                             /* brand-required */
  --viber: #7360f2;                                /* brand-required */
}
```

**Color Rules:**
- Every colour is referenced through a CSS variable / Tailwind token (`bg-primary`, `text-muted-foreground`). Zero raw hex in components.
- Indigo `primary` is the only CTA colour. Yellow `secondary` is for highlighter marks and badges, never for body text on white.
- Magnet letters cycle through the five chart colours (indigo, leaf, sunshine, pink, orange). This is the only place all five appear together.
- Text on yellow uses `--secondary-foreground`; text on green uses `--accent-foreground`.
- WhatsApp and Viber brand colours are used only on their own buttons.

## 3. Typography Rules

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Merriweather:ital,wght@0,400;0,700;0,900;1,400&family=Nunito:wght@400;600;700;800&family=Quicksand:wght@400;500;600;700&display=swap');

--font-sans: 'Quicksand', 'Nunito', ui-rounded, system-ui, sans-serif;
--font-serif: 'Merriweather', Georgia, serif;
--font-hand: 'Caveat', 'Comic Sans MS', cursive;
```

> **Cyrillic note:** Quicksand has no Cyrillic glyphs. `Nunito` (rounded, full Cyrillic) sits second in the sans stack so Bulgarian text renders in a matching rounded face instead of a system fallback. Merriweather and Caveat both include Cyrillic.

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 | Merriweather | clamp(2.6rem, 6.4vw, 5.25rem) | 900 | 1.05 | -0.02em |
| Section H2 | Merriweather | clamp(2rem, 4.2vw, 3.25rem) | 900 | 1.12 | -0.015em |
| H3 | Merriweather | 1.375rem | 700 | 1.3 | — |
| Body | Quicksand/Nunito | 1.0625rem (17px) | 500 | 1.7 | -0.01em |
| Lead | Quicksand/Nunito | 1.25rem | 500 | 1.6 | — |
| Label / eyebrow | Quicksand/Nunito | 0.8125rem | 700 | 1.2 | 0.14em, uppercase |
| Hand note | Caveat | 1.5–2rem | 700 | 1.1 | — |
| Magnet letter | Merriweather | 3–4.5rem | 900 | 1 | — |

**Typography Rules:**
- Headings are always Merriweather 700–900. Body is never below weight 500 (Quicksand is thin).
- Caveat is used only for short annotations (≤ 6 words), never for paragraphs or buttons.
- One highlighted keyword per heading max, using a yellow "marker" underline swash.
- **NEVER use**: Inter, Roboto, Arial, Poppins, Montserrat, or any font without Cyrillic for BG copy.

**Text Decoration** (from text-decoration-rules, Playful × Warm):
- Hero H1: no gradient fill (keeps Cyrillic crisp). Keyword gets a hand-drawn SVG marker stroke in `secondary` behind it. Soft shadow `0 2px 8px rgba(var(--foreground-rgb), .06)`.
- Section H2: no gradient, no shadow; optional marker highlight on one word.
- Body p: no decoration.

## 4. Component Stylings

### Buttons
```css
.btn {
  display: inline-flex; align-items: center; gap: .5rem;
  min-height: 48px; padding: 0 1.4rem;
  border-radius: 999px; font-weight: 700; font-size: 1rem;
  transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s, background-color .2s;
}
.btn-primary {
  background: var(--primary); color: var(--primary-foreground);
  box-shadow: 0 4px 0 0 var(--primary-hover), var(--shadow-md);   /* chunky "pressable" base */
}
.btn-primary:hover  { background: var(--primary-hover); transform: translateY(-2px); }
.btn-primary:active { transform: translateY(3px); box-shadow: 0 1px 0 0 var(--primary-hover); }
.btn:focus-visible  { outline: 3px solid var(--ring); outline-offset: 3px; }
.btn:disabled       { opacity: .5; cursor: not-allowed; transform: none; box-shadow: none; }

.btn-ghost { background: var(--background); color: var(--foreground); border: 2px solid var(--border); }
.btn-ghost:hover  { border-color: var(--foreground); transform: translateY(-2px); }
.btn-ghost:active { transform: translateY(1px); }

.btn-whatsapp { background: var(--whatsapp); color: white; }
.btn-viber    { background: var(--viber);    color: white; }
```

### Cards
```css
.card {
  background: var(--background); border: 2px solid var(--border);
  border-radius: var(--radius-xl); padding: 1.75rem;
  box-shadow: var(--shadow-sm);
  transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s, border-color .3s;
}
.card:hover { transform: translateY(-4px) rotate(-.4deg); box-shadow: var(--shadow-xl); border-color: var(--sidebar-border); }
.card:focus-within { outline: 3px solid var(--ring); outline-offset: 3px; }

/* Spotlight variant (lesson bento): radial glow follows pointer */
.spotlight::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(var(--primary-rgb), .10), transparent 60%);
  opacity: 0; transition: opacity .3s;
}
.spotlight:hover::before { opacity: 1; }

/* Note card (reviews): paper note pinned with tape */
.note { background: var(--background); border-radius: 6px; box-shadow: var(--shadow-lg); rotate: var(--tilt, -1.5deg); }
.note:hover { rotate: 0deg; translate: 0 -6px; box-shadow: var(--shadow-2xl); }
```

### Navigation
```css
.nav { position: fixed; inset: 0 0 auto; z-index: 50; padding-top: env(safe-area-inset-top, 0px);
       transition: background-color .3s, box-shadow .3s, backdrop-filter .3s; }
.nav[data-scrolled="true"] {
  background: rgba(255,255,255,.82); backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--border);
}
.nav a:hover { color: var(--primary); }
/* Language toggle: pill with sliding thumb (BG | EN) */
```

### Links
```css
.link { color: var(--primary); font-weight: 700;
        background: linear-gradient(currentColor, currentColor) 0 100% / 0 2px no-repeat;
        transition: background-size .3s; }
.link:hover { background-size: 100% 2px; }
.link:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; border-radius: 4px; }
```

### Tags / Badges
```css
.badge { display:inline-flex; align-items:center; gap:.375rem; padding:.3rem .75rem;
         border-radius:999px; font-size:.8125rem; font-weight:700; }
.badge-sun  { background: var(--secondary); color: var(--secondary-foreground); }
.badge-leaf { background: rgba(var(--accent-rgb), .22); color: var(--accent-foreground); }
.badge-ink  { background: rgba(var(--primary-rgb), .1); color: var(--primary); }
```

### Magnet Letter
```css
.magnet { font-family: var(--font-serif); font-weight: 900; color: var(--m-color);
          text-shadow: 0 3px 0 rgba(var(--foreground-rgb), .12), 0 10px 18px rgba(var(--foreground-rgb), .12);
          cursor: grab; user-select: none; touch-action: none; }
.magnet:active { cursor: grabbing; }
.magnet:focus-visible { outline: 3px dashed var(--ring); outline-offset: 6px; border-radius: 12px; }
```

### Time-zone Planner
- City chips (`badge`-like buttons, 44px tall, selected = `bg-primary text-primary-foreground`).
- 24-hour track: 24 cells, free hours = `accent`, her busy block = striped `muted`, night = `muted` darker; "now" marker = pink pin.

### Inputs
```css
.input { min-height: 48px; border-radius: var(--radius-md); border: 2px solid var(--input);
         background: var(--background); padding: 0 1rem; }
.input:hover { border-color: var(--sidebar-border); }
.input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(var(--primary-rgb), .15); }
.input:disabled { background: var(--muted); opacity: .6; }
```

## 5. Layout Principles

**Container:**
- Max width: 1200px (`max-w-6xl`), side padding `1.25rem` mobile, `2rem` desktop
- Narrow variant (story text): 720px

**Spacing Scale:**
- Section padding: `clamp(5rem, 10vw, 8.5rem)` vertical
- Component gap: 1.5rem (cards), 2.5–4rem (columns)
- Card internal padding: 1.75rem (mobile 1.25rem)

**Grid:**
```css
.hero-grid    { display:grid; grid-template-columns: 1.15fr .85fr; gap: 3rem; align-items:center; }
.lesson-bento { display:grid; grid-template-columns: repeat(6, 1fr); grid-auto-rows: minmax(190px, auto); gap: 1.25rem; }
/* bento spans: 4+2 / 2+2+2 / 3+3: never equal-size rows */
.reviews-wall { columns: 3 300px; column-gap: 1.5rem; }
```

**Section order:** Nav → Hero (magnets) → Word marquee → Time-zone planner → Meet her (story + stats) → Lessons bento → How it works (3 steps) → Parents' notes (reviews) → FAQ → Book / Contact → Footer.

**Background:** whole page sits on squared paper (`--paper-grid` 28px squares) with a pink margin line at the left on ≥ 1280px. Hero additionally gets soft drifting colour blobs (grainient).

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | none, 2px `--border` | inputs, FAQ rows |
| Subtle | `var(--shadow-sm)` | cards at rest, chips |
| Elevated | `var(--shadow-lg)` | review notes, planner panel, photo polaroid |
| Lifted | `var(--shadow-xl)` | hovered cards |
| Floating | `var(--shadow-2xl)` | hovered notes, dragged magnet, mobile menu |
| Pressable | `0 4px 0 0 var(--primary-hover)` | primary buttons: chunky "physical" base |

## 7. Animation & Interaction

**Motion Philosophy**: Things behave like real classroom objects: magnets snap, paper notes lift, buttons press down. Bouncy springs, never sluggish fades. Only `transform` + `opacity` animate.
**Tier**: L2

### Dependencies
```bash
npm i motion lucide-react
```

### Signature moments (≥ 6, one per category)
| Category | Effect | Where |
|----------|--------|-------|
| Hero H1 text | **SplitText**: words rise + un-rotate with stagger | Hero H1 |
| Section H2 text | **ScrollFloat**: characters float up on enter | every H2 |
| Body / label text | **ScrollReveal**: words fade from 15% → 100% with scroll | "Meet her" story paragraph |
| Element | **Magnet** CTA (pointer-pulled primary button) + marker-stroke draw-on | Hero + booking CTAs |
| Component | **Draggable alphabet magnets** (spring back, click → word card) + **interactive time-zone planner** + tilted review notes | Hero, planner, reviews |
| Background | **Grainient blobs** (CSS, slow drift) on squared paper | Hero |
| Hook after hero | **Word marquee**: BG ↔ EN word pairs scrolling, pauses on hover | Section 2 |
| Delight | **Easter egg**: clicking a magnet teaches a word ("Ж — жираф · giraffe"); footer magnets spell **"БЛАГОДАРЯ"** when you reach the bottom | Hero / footer |

### Entrance Animation
```ts
// motion/react variants
const rise = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };
```

### Scroll Behavior
```ts
// Reveal: <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} />
// Parallax: hero magnets layer y = useTransform(scrollY, [0, 600], [0, -80])
// Nav: data-scrolled when scrollY > 24
// ScrollReveal: useScroll({ target, offset: ['start 85%', 'end 55%'] }) → per-word opacity
```

### Hover & Focus States
- Buttons: lift −2px, press +3px; focus ring 3px `--ring`.
- Cards: lift −4px with slight counter-rotation; spotlight glow follows pointer (rAF-throttled CSS vars).
- Notes: un-tilt to 0° and lift.
- Magnets: scale 1.08 on hover, `cursor: grab`; drag with spring return (`dragSnapToOrigin`).
- Every focusable element has a visible `:focus-visible` style.

### Special Effects
- **Magnet CTA:** pointer within 80px pulls the button up to 10px (rAF, only `(hover: hover)`).
- **Marker stroke:** SVG path `pathLength` 0 → 1 under the hero keyword, 0.9s, delay 0.6s.
- **Planner:** switching cities animates the free-hours band with `layout` spring; the "now" pin pulses.

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; scroll-behavior: auto !important; }
  .marquee-track { animation: none !important; }
}
```
```ts
// JS side: useReducedMotion() → skip SplitText/ScrollFloat offsets, disable parallax, magnets stay static (still clickable).
```

## 8. Do's and Don'ts

### Do
- Write like a person: warm, specific, short sentences. Address parents as "you" and the child by role ("your child").
- Keep Cyrillic visible everywhere: magnets, marquee, small BG words beside EN headings.
- Always show times in the visitor's own time zone, with her time (London) as secondary.
- Keep one clear primary action per section ("Book a free trial lesson").
- Give every placeholder (name, photo, reviews, links) a `TODO` in `src/content.ts` so nothing fake ships by accident.
- Respect `prefers-reduced-motion` and keep 60fps on a mid-range phone.

### Don't
- ❌ No purple-to-blue gradient blobs, glassmorphism hero cards or "AI-startup" sparkles.
- ❌ No equal three-column feature grid. Use the bento with uneven spans.
- ❌ No emoji as icons. Use lucide-react or hand-drawn SVG.
- ❌ No `filter: blur()` on moving elements; backdrop blur ≤ 12px and only on the nav.
- ❌ No raw hex in components; tokens only.
- ❌ No body text in Caveat, and nothing below 16px for body copy.
- ❌ No stock "smiling businesswoman" imagery. Her real photo goes in the polaroid.
- ❌ Don't publish placeholder reviews as real ones. Replace with genuine parent quotes before launch.
- ❌ No auto-playing sound, no scroll-jacking, no custom cursor.
- ❌ Don't hard-code a single time zone in copy ("9am UK"). Always compute it.

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | ≥ 1024px | 2-col hero, 6-col bento, 3-col notes wall, margin line + full nav links visible from 1280px |
| Tablet | 640–1023px | hero stacks (photo under text), bento 2-col, notes 2-col |
| Mobile | < 640px | single column, magnets reduced to 6 and placed around the photo, planner keeps one 24h track per row with 6-hourly labels, buttons may wrap, nav collapses to menu sheet |

**Touch Targets:** minimum 44×44px (buttons 48px).
**Collapsing Strategy:** nav links → full-height sheet with large links + language toggle + book button; marquee keeps running but slower; planner city chips scroll horizontally with snap.

```css
@media (max-width: 1023px) { .hero-grid { grid-template-columns: 1fr; } .lesson-bento { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 639px)  { .lesson-bento { grid-template-columns: 1fr; } .reviews-wall { columns: 1; } }
```

---
*Motion effects inspired by [react-bits](https://github.com/DavidHDev/react-bits) by DavidHDev (MIT).*
