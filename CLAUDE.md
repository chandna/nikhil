# PortfolioV1 — Claude Code Context

## What this is
Nikhil Chandna's personal portfolio. Staff Product Designer at LinkedIn. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion.

---

## About Nikhil

**Role**: Staff Product Designer at LinkedIn, Bengaluru (11 years)
**Before LinkedIn**: UX Designer at SlideShare (Delhi) → Designer at IndiaMart (Noida)
**Experience**: 15 years across consumer products and enterprise tools

**Origin story**: Started at SlideShare coding his own Photoshop designs into production HTML — a designer who ships, not just specs. This instinct to close the gap between design and production has defined his career.

**Design philosophy**: The best design is invisible. No friction, no confusion — just the feeling that something works exactly the way it should. Getting there takes obsession with the details most people skip.

**AI approach**: Built a multi-agent pipeline using Cursor + a custom Design Systems Playground that lets 8 non-coder designers on the Sales Navigator team ship production Ember.js PRs independently. He thinks about AI the way he thought about coding his own Photoshop designs in 2012 — it's the next forcing function separating designers who ship from designers who spec.

**Tone for portfolio**: Confident but not boastful. Specific over vague. Real numbers, real problems. No buzzwords. Editorial and minimal — the kind of portfolio that feels like a human who cares deeply laid it out.

**Target audience**: Senior design leadership hiring managers, founders building product teams, people who care about the intersection of design and engineering.

---

## Projects

### 01 — Warm Introductions (Sales Navigator, 2026)

**The real problem (from PRD)**: Sellers knew warm intros converted far better than cold outreach — 77% of hunters see ≥2× effectiveness, 26% call it 10× over cold. 400K+ weekly clicks on mutual/teamlink connection spotlights by ~80-100K sellers, but the process was manual and confidence-driven. Reps relied on personal intuition to judge whether a connection was "strong enough" — asking for an intro carries real social cost. When the signal was obvious (shared work history), sellers moved quickly (one rep booked meetings with 80% of 10 leads where the sponsor shared past work experience). When ambiguous, they fell back to cold outreach despite warm paths existing.

**What Nikhil designed**:
- Consolidated 4 fragmented connection surfaces into a single trusted entry point
- Weighted ranking system prioritising overlapping shared work/education history
- Explainability layer giving sellers language to act with confidence
- Auto-drafted messaging for seller→introducer and introducer→lead outreach
- 3-way conversation facilitation natively in Sales Navigator
- Strategic reframe: from "do I happen to have a connection?" to "where should I focus given my network advantage?"

**Impact**: 77% of enterprise sellers reported ≥2× conversion over cold outreach. Redesign targeted the 90% of SN users not yet engaging with connection surfaces.

**Tags**: Enterprise Sales Navigator, IA & Systems, AI Ranking, Explainability, UX Strategy

---

### 02 — Product × Code (Sales Navigator, 2026)

**The real problem (from PRD)**: The gap between a design decision and a shipped pixel was measured in weeks and meetings. Designers had no way to ship frontend changes without engineering handoff. InMail/Messaging WAUs on SN were at just 25% of SN WAUs (stagnant for years). 50% of SN users sending inmails sent only 4 or fewer per month vs. 50 credited per license.

**What Nikhil built**:
- Design Systems Playground (DSP) — a cloned, static library of all production UI components, icons, patterns, and frontend standards from the `lighthouse-web` codebase
- 5 custom AI agents built using Captain MCP: Welcome, Investigator, Builder, Code Review, Pull Request
- Agents use the DSP as source of truth to resolve Jira tickets, write production-grade Ember.js code, and open PRs
- Each agent has a specific role: Investigator audits design system fit, Builder generates code, Code Review validates standards, PR Agent ships to production

**Impact**: 8 non-coder designers on the Sales Navigator team can now merge production PRs independently. Design-to-deployment compressed from weeks to hours.

**Tags**: AI Agents, Design Systems, Design Leadership, Design Engineering

---

### 03 — Groups Organizer (LinkedIn Groups, 2022)

**The real problem**: LinkedIn Groups had a participation crisis. 50% of membership requests went unactioned in the first week. 80% of admins approved every request indiscriminately (no quality filter). Organizers were drowning in manual overhead with no tools.

**What Nikhil designed**:
- End-to-end redesign from group creation through member onboarding to ongoing management
- Automated membership review with configurable criteria
- Automated post moderation
- Analytics dashboard for organizers to understand what's working
- Rethought onboarding flow helping admins build communities worth joining from day one

**Impact**: Automation didn't just save time — it improved community quality. Full lifecycle redesign.

**Tags**: Consumer, LinkedIn Groups, Community, End-to-end Design, Automation, Mobile

---

## Portfolio intent

**What it should feel like**: Editorial print magazine meets luxury stationery. Warm, human, specific. Not a template. Not "AI slop". Feels like Nikhil laid it out himself.

**What it should NOT feel like**: Generic designer portfolio. Purple gradients. Vague impact claims. Buzzword-heavy case studies.

**Key differentiators to emphasise**:
1. He codes — started by coding his own Photoshop designs
2. Consumer AND enterprise — rare combination at this level
3. AI as a design tool — not just designing AI products, but using AI to design and ship
4. Scale — hundreds of millions of users, real enterprise impact

---

## Dev server
```bash
# Start (clears stale cache — always use this)
pkill -f next 2>/dev/null; sleep 1; rm -rf .next && export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && npm run dev

# Shell alias (added to ~/.zshrc)
devstart
```

The page going blank is always a stale `.next` cache issue. Run `devstart` to fix it. Never just `npm run dev` — always clear `.next` first.

---

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
  HeroMockMarquee.tsx — 3D scrolling marquee (hidden, set view="marquee" to show)
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

## Mocks (public/mocks/)
| File | Type | Dimensions | Project |
|------|------|-----------|---------|
| warm-intro-message.png | Mobile | 393×900 | Warm Introductions |
| warm-intro-3way-message.png | Mobile | 393×900 | Warm Introductions |
| sn-value-reporting.png | Desktop | 1440×900 | Product × Code |
| sn-scheduled-message.png | Desktop | 1440×900 | Product × Code |
| group-creation.png | Mobile | 393×900 | Groups Organizer |
| group-welcome-new-member.png | Mobile | 393×900 | Groups Organizer |
| group-analytics.png | Mobile | 393×900 | Groups Organizer |
| group-detail-mobile.png | Mobile | 393×900 | Groups Organizer |
| group-detail-web.png | Desktop | 1440×900 | Groups Organizer |

## Videos (public/videos/)
| File | Project |
|------|---------|
| warm-introductions.mov | Warm Introductions |
| product-x-code.mov | Product × Code |
| groups-organizer.mov | Groups Organizer |

## Hero section
- Left half: headline, role tag, description, CTAs
- Right half (desktop): slideshow of product mocks (absolute positioned, full height)
- Mobile: text stacks above slideshow in document flow (≤768px)
- Slideshow is default; marquee variant in code (set `view` state to `"marquee"` in Hero.tsx to show)
- Mouse parallax on "Design" watermark + subtle terracotta spotlight glow

## Responsive
- Hero: two-column on desktop, stacked on mobile (≤768px)
- Project cards: two-column when expanded, single on mobile
- Nav: desktop links hidden on mobile, hamburger menu shown

## shadcn components
Project uses shadcn-style components in `components/ui/`. Not using full shadcn CLI — components are copy-pasted and adapted to the portfolio's CSS variable system.

## Deployment
Not yet deployed. Intended for Vercel. Run `npm run build` to verify before deploying.
