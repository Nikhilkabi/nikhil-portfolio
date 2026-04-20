# CLAUDE.md — Nikhil Kulkarni Portfolio Website

## Project Overview

Build a personal portfolio website for **Nikhil Kulkarni**, a Growth & Marketing Operations professional based in Bangalore, India. Primary purpose: impress potential employers and convert visits into interview requests. Communicate competence, taste, and depth within seconds. This is not a creative agency site — it is a focused, employer-facing professional portfolio.

---

## Goal

Every design and code decision serves one outcome: an employer reads this and books a call. No noise. No filler. No fluff.

---

## Tech Stack — Exact Versions

```
next@14.2.x          App Router, static export
react@18.x
typescript@5.x
tailwindcss@3.4.x
framer-motion@11.x
```

**Initialize with:**
```bash
npx create-next-app@14 portfolio \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```

Then install:
```bash
npm install framer-motion
```

**next.config.ts — static export for Vercel:**
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // required for static export
  },
}

export default nextConfig
```

> ⚠️ `next export` CLI flag is deprecated in Next.js 14. Use `output: 'export'` in config only.

---

## File Structure

```
/
├── app/
│   ├── layout.tsx          ← Root layout: fonts, metadata, globals
│   ├── page.tsx            ← Single page, assembles all sections
│   └── globals.css         ← CSS variables, Tailwind base, resets
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── SectionLabel.tsx    ← Shared section label component (reused across all sections)
├── lib/
│   ├── animations.ts       ← Framer Motion variant definitions
│   ├── useReducedMotion.ts ← Custom hook — see spec below
│   └── useActiveSection.ts ← Custom hook — see spec below
├── data/
│   ├── projects.ts
│   └── skills.ts
├── public/
│   ├── favicon.ico
│   └── og-image.png        ← 1200×630px, plain text on --color-bg (generate a simple one)
├── tailwind.config.ts
├── next.config.ts
└── CLAUDE.md
```

---

## Design Philosophy — Bauhaus Minimalism

> "Form follows function. Every element earns its place."

Reference: Bauhaus school (1919–1933), Dieter Rams' 10 principles, Swiss International Typographic Style.

### Non-negotiable principles:
- **White space is structural, not decorative.** Sections need room to breathe. Padding is generous and intentional.
- **The grid is law.** Use a consistent content max-width of `1100px`, centered, with horizontal padding of `clamp(1.5rem, 5vw, 4rem)`. No arbitrary spacing outside the spacing scale.
- **Typography IS the design.** If removing a decorative element makes the page feel stronger, remove it.
- **One accent color. One.** `--color-accent` appears in exactly 5 places (specified per section). Nowhere else.
- **No shadows. No gradients. No blur effects. No glass morphism.** If you find yourself writing `box-shadow`, `backdrop-filter`, or `background: linear-gradient` — stop and delete it.
- **Motion is functional.** Animations reveal content or reward attention. They never perform.

### Aesthetic tone:
Light, editorial, typographic. The feeling of a well-designed Swiss print annual — but interactive. Think Neue Grafik magazine, not Dribbble.

---

## Color Palette

Define all colors as CSS custom properties in `globals.css`. Extend into Tailwind via config (see Tailwind Config section). Do not use raw hex values anywhere in components — always reference the token.

```css
/* globals.css */
:root {
  --color-bg:               #F8F7F4;
  --color-surface:          #FFFFFF;
  --color-border:           #E2E0DA;
  --color-text-primary:     #1A1916;
  --color-text-secondary:   #6B6862;
  --color-accent:           #C4592A;
  --color-accent-light:     #F2E8E2;

  --spacing-section:        clamp(5rem, 10vw, 9rem);
  --content-width:          1100px;
  --content-padding:        clamp(1.5rem, 5vw, 4rem);
}
```

**Accent usage — exactly these 5 locations, nowhere else:**
1. Active nav link underline
2. Hero location tag (`Bangalore, India`)
3. CTA button (outline + fill on hover)
4. Project card left-border on hover
5. Contact links on hover

---

## Tailwind Config

Wire CSS variables into Tailwind so components use utility classes, not arbitrary values:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:             'var(--color-bg)',
        surface:        'var(--color-surface)',
        border:         'var(--color-border)',
        primary:        'var(--color-text-primary)',
        secondary:      'var(--color-text-secondary)',
        accent:         'var(--color-accent)',
        'accent-light': 'var(--color-accent-light)',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'Courier New', 'monospace'],
      },
      maxWidth: {
        content: 'var(--content-width)',
      },
      spacing: {
        section: 'var(--spacing-section)',
      },
    },
  },
  plugins: [],
}

export default config
```

Usage in components: `text-accent`, `bg-bg`, `font-display`, `font-mono`, `max-w-content` — never `text-[#C4592A]` or arbitrary values.

---

## Typography

Load fonts in `app/layout.tsx` using `next/font/google`. Assign CSS variable names:

```ts
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

// Apply all three variables to <html>:
// className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable}`}
```

### Font roles — never mix these:
| Role | Font | Tailwind class |
|------|------|---------------|
| H1, H2, H3 | Playfair Display | `font-display` |
| Body, UI, buttons | DM Sans | `font-sans` |
| Labels, tags, section numbers | JetBrains Mono | `font-mono` |

### Type scale — use Tailwind default classes:
```
text-xs    → 0.75rem  / 12px  — mono labels, captions
text-sm    → 0.875rem / 14px  — body secondary
text-base  → 1rem     / 16px  — body
text-lg    → 1.125rem / 18px  — body large
text-2xl   → 1.5rem   / 24px  — section sub-headings
text-3xl   → 2rem     / 32px  — section titles (H2)
text-5xl   → 3rem     / 48px  — hero name (tablet/mobile)
text-7xl   → 4.5rem   / 72px  — hero name (desktop)
```

Line heights: body `leading-relaxed` (1.625), headings `leading-tight` (1.25), mono labels `leading-none`.

---

## Custom Hooks

### `lib/useReducedMotion.ts`

```ts
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
```

**Every Framer Motion component must check this hook.** If `reduced === true`, skip animation variants and render content immediately (opacity: 1, y: 0, no transition).

Pattern:
```ts
const reduced = useReducedMotion()
const variants = reduced ? {} : fadeUp
```

---

### `lib/useActiveSection.ts`

Used by Nav to highlight the current section via IntersectionObserver:

```ts
import { useEffect, useState } from 'react'

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'contact'] as const
export type SectionId = typeof SECTIONS[number]

export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return active
}
```

---

## Shared Component: `SectionLabel`

Every section uses the same label component. Build it once, use everywhere:

```tsx
// components/SectionLabel.tsx
interface SectionLabelProps {
  number: string   // e.g. "01"
  title: string    // e.g. "ABOUT"
}
```

Visual spec:
```
01 — ABOUT
──────────────────────────────────────────────  ← 1px border-border, full section width
                                                ← mb-12 below the rule
```

Styles: `font-mono text-xs text-secondary tracking-widest uppercase mb-2` on the text, then a `<hr>` with `border-t border-border mb-12`.

---

## Animations

### `lib/animations.ts` — define once, import everywhere:

```ts
import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}
```

### Scroll trigger pattern — use on every section:
```tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { useReducedMotion } from '@/lib/useReducedMotion'

const ref = useRef(null)
const inView = useInView(ref, { once: true, margin: '-80px' })
const reduced = useReducedMotion()

<motion.div
  ref={ref}
  variants={reduced ? {} : staggerContainer}
  initial="hidden"
  animate={inView ? 'visible' : 'hidden'}
>
  <motion.h2 variants={reduced ? {} : fadeUp}>...</motion.h2>
  <motion.p  variants={reduced ? {} : fadeUp}>...</motion.p>
</motion.div>
```

### Hero load animation:
```
Sequence (no scroll trigger — above the fold):
  Name       → delay 0s
  Role       → delay 0.1s
  Location   → delay 0.2s
  Bio        → delay 0.35s
  CTA        → delay 0.5s
All use fadeUp variant. animate on mount (initial="hidden" animate="visible" with delay per child).
```

### Project card hover:
```
Implement with CSS (not Framer Motion — cleaner for hover):

Card wrapper: position: relative; overflow: hidden; cursor: default;

Left accent bar:
  position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
  background: var(--color-accent);
  transform: scaleY(0); transform-origin: top;
  transition: transform 0.2s ease;

Card:hover left accent bar → transform: scaleY(1)
Card:hover project title   → transform: translateX(6px); transition: transform 0.2s ease;
```

### Nav link hover:
```
CSS only:
  Link: position: relative;
  Link::after: content:''; position:absolute; bottom:-2px; left:0;
               width:100%; height:1px; background:var(--color-accent);
               transform:scaleX(0); transform-origin:left;
               transition: transform 0.2s ease;
  Link:hover::after, Link[data-active=true]::after → transform: scaleX(1)
```

### Banned animations — do not implement:
- Parallax on any element
- Scroll-jacking or scroll-snapping
- Cursor effects of any kind
- Page transition animations
- Looping or continuous animations
- `type: 'spring'` — banned entirely
- Animated backgrounds

---

## Section Specifications

### 1. Nav

```
Layout:     fixed top, full-width, z-50
Background: bg-bg, border-b border-border
Height:     h-14 (56px)
Inner:      max-w-content mx-auto px-[--content-padding] flex justify-between items-center

Left:
  "NK"
  ← font-sans font-medium text-sm text-primary, linked to #hero
  ← Initials only — clean, typographic

Right (≥ md):
  About  Skills  Projects  Contact
  ← font-sans text-sm text-secondary
  ← Active: text-primary + accent underline (CSS ::after scaleX)
  ← Hover: text-primary

Mobile (< md):
  Hamburger: three 20px horizontal lines, text-primary, gap-1.5 between lines
  On click: drawer slides down from below nav (not full overlay)
  Drawer: bg-surface, border-b border-border
  Links: stacked, 48px min tap target each, px-[--content-padding] py-3
  Drawer closes on: link click, second hamburger tap
  State: useState<boolean> in Nav.tsx — no external library
```

---

### 2. Hero

```
Height:  100vh, min-h-[640px]
Layout:  flex flex-col justify-center
Padding: pt-14 (clears fixed nav) + px-[--content-padding]

Content alignment: LEFT-ALIGNED. Max-width of text block: 700px.

Elements (top to bottom):

  Top label:
    "PORTFOLIO — 2025"
    font-mono text-xs text-secondary tracking-widest uppercase mb-16

  Name:
    "Nikhil Kulkarni"
    font-display font-bold text-7xl (lg) / text-5xl (md) / text-4xl (sm)
    text-primary leading-tight mb-1

  Role:
    "Growth & Marketing Operations"
    font-sans font-light text-2xl (lg) / text-xl (sm)
    text-secondary mb-2

  Location:
    "Bangalore, India"
    font-mono text-xs text-accent tracking-wide mb-10

  Bio:
    "I build growth systems that generate revenue and the marketing ops stacks that scale them."
    font-sans text-lg text-secondary leading-relaxed max-w-[520px] mb-12

  CTA:
    "View My Work ↓"
    border border-accent text-accent font-sans font-medium text-sm
    px-6 py-3, NO border-radius (square corners — Bauhaus rule)
    hover: bg-accent text-white, transition duration-200 ease
    onClick: smooth scroll to #projects

  Decorative mark (bottom-right, absolute):
    Two perpendicular 1px lines forming an L-shape, 32×32px
    color: border (--color-border)
    position: absolute bottom-12 right-[--content-padding]
    This is the ONLY decorative element on the entire page.
```

---

### 3. About

```
id: "about"
SectionLabel: number="01" title="ABOUT"
py-section

Layout: grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16

Left (3fr):
  H2: "Who I am"
  font-display text-3xl text-primary mb-8

  3 paragraphs — font-sans text-base text-secondary leading-relaxed space-y-4:

    "Growth & marketing ops professional with 3.5 years across Nielsen Sports and YuviPep.
    I sit at the intersection of paid acquisition, data operations, and AI workflow automation."

    "Obsessed with systems that compound. I think in leverage points, not tasks — building
    processes that keep working after I stop touching them."

    "Long-term orientation: operator to investor. Currently building toward that, one system at a time."

Right (2fr):
  <dl> — definition list, no default browser styles

  Each item:
    <dt> font-mono text-xs text-secondary tracking-wide uppercase mb-1
    <dd> font-sans text-base text-primary mb-6
    Followed by <hr className="border-t border-border mb-6"> (except after last item)

  Items:
    Location    / Bangalore, India
    Experience  / 3.5 years
    Focus       / Growth · Marketing Ops · RevOps
    Currently   / Open to opportunities  ← this value: text-accent
```

---

### 4. Skills & Tools

```
id: "skills"
SectionLabel: number="02" title="SKILLS & TOOLS"
py-section

Layout: grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12

Each category:
  Category name:
    font-mono text-xs text-accent tracking-widest uppercase mb-3

  Skill list:
    <ul> with list-none, p-0, m-0
    Each <li>: font-sans text-base text-primary leading-relaxed
    One skill per line. No bullets. No icons. No tags.

Data (in data/skills.ts):

  GROWTH & ACQUISITION
    Google Ads
    Meta Ads
    LinkedIn Ads
    Performance Marketing
    A/B Testing & Conversion Optimization

  MARKETING OPERATIONS
    HubSpot
    CRM Workflow Automation
    Attribution Modeling
    Marketing Analytics

  DATA & ANALYTICS
    SQL
    Excel / Google Sheets
    Google Analytics 4
    Looker Studio
    Nielsen Sports Data Tools

  AUTOMATION & AI
    N8N
    AI Workflow Design
    Prompt Engineering
    Claude API Integration

  DEVELOPMENT
    React / Vite
    Next.js
    HTML & CSS
    Git / GitHub
```

---

### 5. Projects

```
id: "projects"
SectionLabel: number="03" title="PROJECTS"
py-section

Layout: vertical stack, full-width
Each card: border-t border-border py-10
No card backgrounds. No rounded corners. No shadows.

Card inner layout:
  grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-8

Left cell (desktop only, hidden on mobile):
  Project index: "01"
  font-mono text-xs text-secondary pt-1

Right cell:
  Name:         font-display text-2xl text-primary mb-1
  Descriptor:   font-sans font-light text-base text-secondary mb-4
  Description:  font-sans text-base text-secondary leading-relaxed max-w-[640px] mb-6
  Stack tags:   each tag: font-mono text-xs text-secondary border border-border px-2 py-1
                inline-block mr-2 mb-2, NO background, NO border-radius
  Links:        "→ Live Demo"  "→ GitHub"
                font-sans text-sm text-accent mr-6
                hover: underline + arrow translateX(3px) CSS transition 0.15s ease

Hover state on card (CSS group pattern):
  <article className="group relative ...">
    Left accent bar (absolute, 2px wide, full height):
      bg-accent, scaleY(0) → group-hover:scaleY(1), origin-top, transition 0.2s ease
    Title:
      group-hover:translate-x-[6px], transition 0.2s ease

Data (in data/projects.ts — typed with a Project interface):

  interface Project {
    id: string
    name: string
    descriptor: string
    description: string
    stack: string[]
    liveUrl: string | null
    githubUrl: string | null
    status: 'live' | 'in-progress'
  }

  Project 01 — Alpha Engine:
    descriptor:  "AI-powered stock screener for NSE/BSE"
    description: "A thesis-driven screener that scores Indian equities across macro themes —
                  clean energy/EVs, China+1 manufacturing, and digital infrastructure. Designed
                  to automate systematic investment research with filters for small-cap,
                  asset-light, high-ROE businesses."
    stack: ['Python', 'NSE/BSE APIs', 'Claude API', 'Data Analysis']
    liveUrl: '[ALPHENGINE_LIVE]'
    githubUrl: '[ALPHENGINE_GITHUB]'
    status: 'live'

  Project 02 — DatePix:
    descriptor:  "Dating app photo optimization tool"
    description: "A React web app that analyzes and scores profile photos for dating apps using AI.
                  Built to solve a real, underserved problem — helping people present themselves
                  better through photo selection and composition guidance."
    stack: ['React', 'Vite', 'Claude API', 'CSS']
    liveUrl: '[DATEPIX_LIVE]'
    githubUrl: '[DATEPIX_GITHUB]'
    status: 'live'

  Project 03 — Next Project:
    descriptor:  "In progress"
    description: ""
    stack: []
    liveUrl: null
    githubUrl: null
    status: 'in-progress'

"In progress" card render rules:
  - Replace solid border-t with border-t border-dashed border-border
  - No links row
  - No stack tags row
  - Description replaced with: "Currently building."
    font-mono text-xs text-secondary italic
```

---

### 6. Contact

```
id: "contact"
SectionLabel: number="04" title="CONTACT"
py-section pb-32

Layout: single column, max-w-[600px]

H2: "Let's talk."
font-display text-5xl text-primary mb-6

Subtext:
  "Open to Growth, Marketing Ops, and RevOps roles.
   If you're building something interesting — reach out."
font-sans text-lg text-secondary leading-relaxed mb-16

Links block — rendered as <dl>:
  Each row: flex items-baseline gap-6 border-t border-border pt-6 mb-0

  <dt>: font-mono text-xs text-secondary tracking-widest uppercase w-24 flex-shrink-0
  <dd>: <a> font-sans text-base text-accent
        hover: underline + "→" nudges translateX(3px) transition 0.15s ease
        Email: href="mailto:[EMAIL]"
        LinkedIn: href="[LINKEDIN_URL]" target="_blank" rel="noopener noreferrer"
        GitHub: href="[GITHUB_URL]" target="_blank" rel="noopener noreferrer"

  Rows:
    Email     / [EMAIL]
    LinkedIn  / [LINKEDIN_URL]
    GitHub    / [GITHUB_URL]

Footer (mt-24):
  "Nikhil Kulkarni © 2025"
  font-mono text-xs text-secondary text-center
```

---

## Metadata & SEO

```ts
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Nikhil Kulkarni — Growth & Marketing Operations',
  description: 'Portfolio of Nikhil Kulkarni, a Growth & Marketing Operations professional based in Bangalore. Open to Growth, Marketing Ops, and RevOps roles.',
  openGraph: {
    title: 'Nikhil Kulkarni — Growth & Marketing Operations',
    description: 'Growth systems. Marketing ops. Built to scale.',
    url: 'https://[DOMAIN]',
    siteName: 'Nikhil Kulkarni',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nikhil Kulkarni — Growth & Marketing Operations',
    description: 'Growth systems. Marketing ops. Built to scale.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}
```

OG image: generate a static 1200×630px PNG. Background `#F8F7F4`, name in large Playfair Display, role in DM Sans below. Place at `public/og-image.png`.

---

## Responsiveness

Mobile-first. All breakpoints use Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280).

| Element | Mobile | Tablet (md) | Desktop (lg+) |
|---------|--------|-------------|---------------|
| Hero name | text-4xl | text-5xl | text-7xl |
| Hero bio | text-base | text-base | text-lg |
| About layout | 1 column | 1 column | grid-cols-[3fr_2fr] |
| Skills grid | 1 column | 2 columns | 2 columns |
| Project card | 1 column | 1 column | grid-cols-[80px_1fr] |
| Project number | hidden | hidden | visible |
| Nav | hamburger | hamburger | inline links |
| Section padding | py-16 | py-16 | py-section |

---

## Accessibility

- Semantic HTML: `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`, `<article>` for projects, `<dl>` for about info and contact
- Every `<section>` has `id` (anchor target) and `aria-label` matching its heading
- Skip-to-content: `<a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface focus:text-primary">Skip to content</a>` — first element in `<body>`
- All external links: `target="_blank" rel="noopener noreferrer"`
- All links have descriptive text — no "click here"
- Color contrast: #C4592A on #F8F7F4 = 4.6:1 ✓ (WCAG AA)
- `useReducedMotion` hook applied to all Framer Motion components

---

## What NOT to Build

Hard constraint — do not implement any of the following:

- Blog or writing section
- Testimonials
- Resume / CV download button
- Hero photo or avatar image
- Dark mode toggle
- Social media feed embeds
- Loading or splash screen
- Particle effects, WebGL, canvas animations
- Scroll progress indicator
- "Back to top" button
- Cookie banner
- Third-party analytics scripts
- Animated background
- Custom cursor
- Border-radius on buttons, tags, or cards (Bauhaus — square corners only)

---

## Content Placeholders

| Placeholder | Replace with |
|-------------|-------------|
| `[EMAIL]` | Your email address |
| `[LINKEDIN_URL]` | Full LinkedIn profile URL |
| `[GITHUB_URL]` | Full GitHub profile URL |
| `[ALPHENGINE_LIVE]` | Alpha Engine live demo URL |
| `[ALPHENGINE_GITHUB]` | Alpha Engine GitHub repo URL |
| `[DATEPIX_LIVE]` | DatePix live demo URL |
| `[DATEPIX_GITHUB]` | DatePix GitHub repo URL |
| `[DOMAIN]` | Your Vercel or custom domain |

---

## Definition of Done

**Functionality**
- [ ] All anchor links scroll smoothly to correct sections
- [ ] Nav active state tracks scroll via IntersectionObserver (`useActiveSection` hook)
- [ ] Mobile hamburger opens/closes correctly, closes on link click
- [ ] CTA button scrolls to #projects
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`

**Design fidelity**
- [ ] Accent color appears in exactly 5 specified locations — search codebase for `text-accent`, `bg-accent`, `border-accent` and verify count
- [ ] Zero instances of `box-shadow`, `backdrop-filter`, `linear-gradient` in codebase
- [ ] All section labels use `SectionLabel` component — no one-off implementations
- [ ] Zero `border-radius` on interactive elements (buttons, tags, cards)
- [ ] Bottom-right L-mark visible on Hero desktop

**Animation**
- [ ] All section animations trigger on scroll (not page load)
- [ ] Hero text sequences on mount with correct delays
- [ ] Project card: left border scaleY + title translateX on hover
- [ ] `prefers-reduced-motion: reduce` → all animations disabled, content visible immediately

**Code quality**
- [ ] TypeScript strict — zero `any` types, `Project` and `Skill` interfaces defined in data files
- [ ] No inline styles except Framer Motion dynamic values
- [ ] Zero raw hex values in component files — token classes only
- [ ] Zero arbitrary Tailwind values (no `text-[#C4592A]`, no `w-[73px]`)
- [ ] `lib/animations.ts` is the single source of all Framer Motion variants

**Performance & compatibility**
- [ ] `next build` — zero errors, zero warnings
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90
- [ ] Zero FOUT — fonts load via `next/font` with `display: swap`
- [ ] Renders correctly at: 375px, 768px, 1024px, 1440px
- [ ] Tested in Chrome, Firefox, Safari

**Deployment**
- [ ] `out/` directory generated by `next build` (static export)
- [ ] Deploys to Vercel with zero config changes
- [ ] OG image displays correctly on LinkedIn share preview
- [ ] All `[PLACEHOLDER]` values replaced
