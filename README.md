# Gold.Fi — Landing Page

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
    ├── main.jsx            Vite entry — mounts <App /> into #root
    ├── app/
    │   └── App.jsx         App shell, landing composition, legal route switch
    ├── styles.css          Design tokens, @font-face, layout utilities
    ├── components/
    │   ├── chrome.jsx      TopNav, PriceStrip, Footer
    │   ├── primitives.jsx  Sparkline, Reveal, PhoneMini, live price helper
    │   └── tweaks-panel.jsx
    ├── features/
    │   ├── landing/        Hero variants and landing-page sections
    │   └── waitlist/       Waitlist form
    └── routes/
        └── legal/          Terms and privacy pages
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
