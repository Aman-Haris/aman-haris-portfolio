# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running Locally

No build step — open `index.html` directly in a browser, or use the **Live Server** extension in VSCode (right-click `index.html` → "Open with Live Server"). There is no package manager, bundler, or dev server command.

Deployed as a static site on [Render.com](https://render.com) — push to GitHub and Render auto-deploys.

## Architecture

Single-page portfolio (`index.html`) with no framework. All sections live in `index.html`; CSS and JS are split into modules loaded via `<link>` and `<script>` tags.

**CSS — `css/`**
Each file maps to one section. Load order in `index.html` matters:
`variables.css` → `base.css` → section stylesheets → `animations.css`
All design tokens (colors, spacing, fonts) are CSS custom properties defined in `variables.css`. The page defaults to `data-theme="dark"` on `<body>`.

**JS — `js/`**
- `main.js` — entry point; imports and initialises all modules
- `js/modules/` — one file per concern:
  - `theme.js` — dark/light toggle
  - `navigation.js` — scroll-aware nav behaviour
  - `animations.js` (inside `modules/animations/`) — IntersectionObserver-based section reveals
  - `projects.js` — Swiper carousel for project cards
  - `skills.js`, `experience.js`, `contact.js` — section-specific logic

**Assets — `assets/`**
- `assets/videos/` — project demo `.mp4` files embedded in the Projects section
- `assets/resume/` — downloadable PDF resume
- `assets/images/projects/` — project thumbnail images
- `assets/fonts/` — local Nunito font files (woff/woff2)
- `assets/icons/` — favicon and UI icons

## Key Conventions

- Add new sections by: creating `css/<section>.css`, adding a `<link>` in `<head>`, writing `js/modules/<section>.js`, importing it in `main.js`, and adding the HTML block in `index.html`.
- Theming: use existing CSS variables from `variables.css` — never hard-code colours. The `[data-theme="light"]` selector in `variables.css` overrides the dark defaults.
- External CDN dependencies: Font Awesome 6.4.0 and Swiper 8 are loaded via CDN in `<head>`.
