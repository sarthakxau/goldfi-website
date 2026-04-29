# Gold.Fi — Landing Page

## Stack

- **Vite** — dev server & production bundler
- **React 18** — UI components
- **CSS** — design tokens in `src/styles.css`, no Tailwind/CSS-in-JS

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173 with HMR
npm run build    # outputs dist/
npm run preview  # serve dist/ at http://localhost:4173
```

## Project layout

```
.
├── index.html              Vite entry HTML
├── package.json
├── vite.config.js
├── public/                 Static assets, served at root
│   ├── logo.svg            → /logo.svg
│   └── fonts/              → /fonts/*.woff2  (DM Sans, Fraunces, JetBrains Mono)
└── src/
    ├── main.jsx            App entry — mounts <Landing /> into #root
    ├── styles.css          Design tokens, @font-face, layout utilities
    ├── primitives.jsx      GoldBarSVG, Sparkline, Reveal, PhoneMini …
    ├── chrome.jsx          TopNav, PriceStrip, Footer, ThemeSwitcher
    ├── heroes.jsx          HeroEditorial, HeroTicker, HeroDramatic
    ├── sections.jsx        HowItWorks, SecuritySection, AppShowcase, …
    ├── sections2.jsx       AutoSave, FAQ, Testimonials, FinalCTA
    ├── waitlist.jsx        Waitlist form
    └── tweaks-panel.jsx    On-page design tweaks panel
```

## Theming

Two themes — `noir` (dark) and `ivory` (light) — driven by `data-theme` on
`<html>`. The current value is persisted in `localStorage` under `gf-theme`.
The pre-paint script in `index.html` reads it before any CSS loads to avoid
a theme flash.

CSS custom properties for both themes live in `src/styles.css` under
`:root, html[data-theme='noir']` and `html[data-theme='ivory']`.

## Deploying

Run `npm run build` and drop the contents of `dist/` onto any static host
(Vercel, Netlify, S3+CloudFront, GitHub Pages, plain nginx). No server-side
runtime is required.
