# PortfolioV1 — Claude Code Context

## What this is
Nikhil Chandna's personal portfolio. Staff Product Designer at LinkedIn. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion.

## Dev server
```bash
# Start (clears stale cache — always use this)
pkill -f next 2>/dev/null; sleep 1; rm -rf .next && export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && npm run dev

# Shell alias (added to ~/.zshrc)
devstart
```

The page going blank is always a stale `.next` cache issue. Run `devstart` (or the command above) to fix it. Never just `npm run dev` — always clear `.next` first.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + inline styles with CSS variables
- **Animations**: Framer Motion
- **Node**: v20 via nvm (`~/.nvm`)
- **Font**: Fraunces (serif) + DM Sans (sans) via `next/font/google`

## Key files
```
app/
  layout.tsx        — font loading (Fraunces + DM Sans), metadata
  page.tsx          — assembles all sections
  globals.css       — CSS variables, base styles, responsive rules

components/
  Nav.tsx           — fixed nav, glass blur on scroll, mobile hamburger
  Hero.tsx          — hero section with mouse parallax, slideshow/marquee toggle
  HeroSlideshow.tsx — slideshow wrapper (uses FeatureCarousel)
  HeroMockMarquee.tsx — 3D scrolling marquee (hidden, toggle to show)
  Work.tsx          — selected work section header
  ProjectCard.tsx   — expandable project cards with video
  About.tsx         — bio, timeline
  Contact.tsx       — contact links
  Footer.tsx        — minimal footer
  ui/
    feature-carousel.tsx — full-size crossfade slideshow with prev/next/dots
    3d-marquee.tsx       — vertical marquee primitive
    card.tsx             — shadcn card
    avatar.tsx           — shadcn avatar
    button.tsx           — shadcn button

data/
  projects.ts       — all project content (3 case studies)

lib/
  utils.ts          — cn() utility (clsx + tailwind-merge)
  motion.ts         — shared EASE constant for Framer Motion

public/
  mocks/            — product screenshot images (mobile: 393×900, desktop: 1440×900)
  videos/           — product demo videos (.mov)
```

## Design tokens (CSS variables)
```css
--paper: #f5f2ed        /* warm cream — page background */
--paper-warm: #eeeae3   /* slightly darker warm */
--paper-deep: #e8e3db   /* deepest warm */
--ink: #1a1814          /* near-black */
--ink-muted: #7a766e    /* muted text */
--ink-faint: #c8c4bc    /* borders, faint lines */
--accent: #c84b2f       /* terracotta red */
--serif: Fraunces       /* headings */
--sans: DM Sans         /* body */
```

## Projects (data/projects.ts)
| # | Title | Type | Year |
|---|-------|------|------|
| 01 | Warm Introductions | Enterprise · Sales Navigator | 2026 |
| 02 | Product × Code | Design Engineering · AI Systems | 2026 |
| 03 | Groups Organizer | Consumer · LinkedIn Groups | 2022 |

Each project has: `id`, `title`, `subtitle`, `summary`, `detail`, `impact[]`, `tags[]`, `url`, `video`

## Hero section
- Left half: headline, role tag, description, CTAs
- Right half (desktop): slideshow of product mocks (absolute positioned, full height)
- Mobile: text stacks above slideshow in document flow
- Slideshow default; marquee variant still in code (set `view` state to `"marquee"` to show)
- Mouse parallax on "Design" watermark + subtle spotlight glow

## Videos
Located at `public/videos/`:
- `warm-introductions.mov` → project 01
- `product-x-code.mov` → project 02
- `groups-organizer.mov` → project 03

Referenced in `data/projects.ts` and rendered in `ProjectCard.tsx` inside a browser chrome wrapper.

## Mocks (public/mocks/)
| File | Type | Dimensions |
|------|------|-----------|
| 27.png, 29.png, 128–131.png | Mobile | 393×900 |
| Find the right people.png, Frame 2025790875.png, Frame 2147234937.png | Desktop | 1440×900 |

## Responsive
- Hero: two-column on desktop, stacked on mobile (≤768px)
- Project cards: two-column when expanded, single on mobile
- Nav: desktop links hidden on mobile, hamburger menu shown

## shadcn components
Project uses shadcn-style components in `components/ui/`. Not using full shadcn CLI — components are copy-pasted and adapted to the portfolio's CSS variable system.

## Deployment
Not yet deployed. Intended for Vercel. Run `npm run build` to verify before deploying.
