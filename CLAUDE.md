# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running Locally

No build step — open `index.html` directly in a browser, or use the **Live Server** extension in VSCode (right-click `index.html` → "Open with Live Server"). There is no package manager, bundler, or dev server command.

Deployed as a static site on [Render.com](https://render.com) — push to GitHub and Render auto-deploys.

## Architecture

Single-page portfolio (`index.html`) with no framework. The layout is a **bento grid** — each section is a compact glass card. Clicking a card clones a `<template>` into a modal overlay for the full view.

### CSS — `css/`

Load order in `index.html` matters:
`variables.css` → `base.css` → `bento.css` → section stylesheets → `animations.css`

| File | Responsibility |
|------|---------------|
| `variables.css` | All design tokens: colors, spacing, radii, shadows, transitions |
| `base.css` | Reset, typography, `.glass-card`, sticky header, header action buttons |
| `bento.css` | Grid layout, area assignments, all bento card styles, modal overlay |
| `about.css` | Expanded about modal styles |
| `skills.css` | Expanded skills accordion modal styles |
| `experience.css` | Expanded experience + education modal styles |
| `projects.css` | Expanded project modal styles |
| `contact.css` | Expanded contact form styles |
| `footer.css` | Minimal footer |
| `animations.css` | Keyframes: `glowPulse`, `modalSlideIn`, `fadeIn`, `slideUp` |

### JS — `js/`

- `main.js` — entry point; imports and initialises all modules
- `js/modules/bento.js` — card expand/collapse via `<template>` cloning, card entrance `IntersectionObserver`, photo flip toggle
- `js/modules/theme.js` — dark/light toggle (`data-theme` on `<body>`)
- `js/modules/navigation.js` — header opacity on scroll
- `js/modules/animations/index.js` — exports `initCanvasParticles`
- `js/modules/animations/particles.js` — connecting-dots canvas animation (targets `canvas.connecting-dots`)

### HTML structure

The bento grid lives in `<main class="bento-grid">`. All expanded content lives in `<template id="expand-*">` elements at the bottom of `<body>` — `bento.js` clones these into `#modal-body` on card click, never concatenates HTML strings.

### Grid areas (desktop → tablet → mobile)

```
Desktop (4-col):           Tablet (2-col):      Mobile (1-col):
about about skills  edu    about  about          about
about about skills  exp    skills edu            skills / edu / exp
p1    p2    p3      contact exp    p1             p1 / p2 / p3
all   all   all     contact p2     p3             all / contact
                            all    all
                            contact contact
```

## Design System

**Palette** — violet primary + amber secondary, dark blue-black backgrounds:
- `--primary-accent: #7c3aed` — violet (borders, glows, stat numbers, CTAs)
- `--secondary-accent: #f59e0b` — amber (metrics, links, highlights)
- Light mode uses muted slate-lavender backgrounds (`#ecedf4`) not pure white

**Never hard-code colours** — use tokens from `variables.css`. All glow/glass/accent utility tokens are derived from the two accents.

**Skill tag colours** (hardcoded in `bento.css`): violet = AI, amber = code, green = cloud, pink = soft skills.

## Key Conventions

- **New bento card**: add card HTML in `<main>`, a `<template id="expand-*">` at the bottom, a grid area in `bento.css`, and any card-specific styles in the relevant CSS file.
- **Expanded modal content**: always use `<template>` cloning — never build HTML strings from data.
- **Tool logos**: served from `https://cdn.simpleicons.org/{slug}`. Local placeholder files go in `assets/images/logos/` with class `tool-icon-placeholder` (gets `brightness(0) invert(1)` filter for dark mode).
- **Fonts**: Chillax (heading, `--font-heading`) + Nunito (body, `--font-body`) — local woff/woff2 in `assets/fonts/`.
- **External CDN**: Font Awesome 6.4.0 only. Swiper has been removed.
- **Professional projects**: all NDA — show name, description, and metrics only. No images or source links.
