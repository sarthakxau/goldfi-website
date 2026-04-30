import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

import { TopNav, PriceStrip, Footer } from './chrome';
import { HeroEditorial, HeroTicker, HeroDramatic } from './heroes';
import { HowItWorks, SecuritySection, AppShowcase } from './sections';
import { AutoSave, FAQ } from './sections2';
import { Waitlist } from './waitlist';
import TermsPage from './terms-page';
import PrivacyPage from './privacy-page';

import {
  useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakRadio, TweakSelect,
} from './tweaks-panel';

const TWEAK_DEFAULTS = {
  "heroVariant": "editorial",
  "theme": "noir",
  "accent": "#F5B832",
  "fontDisplay": "Fraunces",
  "showGrain": true
};

const HERO_VARIANTS = [
  { value: 'editorial', label: 'Editorial' },
  { value: 'ticker',    label: 'Ticker' },
  { value: 'dramatic',  label: 'Dramatic' },
];

const FONT_OPTIONS = [
  { value: 'Fraunces', label: 'Fraunces (serif)' },
  { value: 'DM Serif Display', label: 'DM Serif' },
  { value: 'DM Sans', label: 'DM Sans (sans)' },
];

const ACCENT_OPTIONS = [
  { value: '#F5B832', label: 'Bright Gold' },
  { value: '#D4A012', label: 'Classic Gold' },
  { value: '#B8860B', label: 'Deep Gold' },
  { value: '#E4A500', label: '22k' },
];

function Landing() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // On mount, hydrate theme from localStorage if it differs from the tweak default
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gf-theme');
      if (saved && saved !== tweaks.theme) setTweak('theme', saved);
    } catch (e) {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply theme + broadcast so the footer ThemeSwitcher stays in sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
    try { localStorage.setItem('gf-theme', tweaks.theme); } catch (e) {}
    window.dispatchEvent(new CustomEvent('gf-theme-change', { detail: tweaks.theme }));
  }, [tweaks.theme]);

  // Listen for theme changes coming from the footer ThemeSwitcher
  useEffect(() => {
    const onChange = (e) => {
      if (e.detail !== tweaks.theme) setTweak('theme', e.detail);
    };
    window.addEventListener('gf-theme-change', onChange);
    return () => window.removeEventListener('gf-theme-change', onChange);
  }, [tweaks.theme, setTweak]);

  // Per-theme accent defaults
  const THEME_ACCENT_DEFAULTS = { noir: '#F5B832', ivory: '#D4A012' };

  // When theme changes, reset accent to that theme's default
  const prevThemeRef = React.useRef(tweaks.theme);
  useEffect(() => {
    if (prevThemeRef.current !== tweaks.theme) {
      const def = THEME_ACCENT_DEFAULTS[tweaks.theme];
      if (def) setTweak('accent', def);
      prevThemeRef.current = tweaks.theme;
    }
  }, [tweaks.theme, setTweak]);

  // Apply accent
  useEffect(() => {
    document.documentElement.style.setProperty('--gold-bright', tweaks.accent);
  }, [tweaks.accent]);

  // Apply display font
  useEffect(() => {
    const fam = tweaks.fontDisplay === 'DM Sans'
      ? `'DM Sans', sans-serif`
      : `'${tweaks.fontDisplay}', Georgia, serif`;
    document.documentElement.style.setProperty('--font-display', fam);
  }, [tweaks.fontDisplay]);

  // Grain toggle
  useEffect(() => {
    document.documentElement.style.setProperty('--grain-opacity', tweaks.showGrain ? '0.18' : '0');
  }, [tweaks.showGrain]);

  const onLaunch = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const Hero =
    tweaks.heroVariant === 'ticker'   ? HeroTicker :
    tweaks.heroVariant === 'dramatic' ? HeroDramatic :
    HeroEditorial;

  return (
    <div data-screen-label="Landing · Gold.Fi" style={{ minHeight: '100vh' }}>
      <TopNav onLaunch={onLaunch} />
      <Hero onLaunch={onLaunch} />
      <PriceStrip />
      <HowItWorks />
      <SecuritySection />
      <AppShowcase />
      <AutoSave />
      <FAQ />
      <Waitlist />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero & theme" />
        <TweakRadio label="Hero" options={HERO_VARIANTS}
          value={tweaks.heroVariant}
          onChange={(v) => setTweak('heroVariant', v)} />
        <TweakRadio label="Theme"
          options={[{ value: 'noir', label: 'Noir' }, { value: 'ivory', label: 'Ivory' }]}
          value={tweaks.theme}
          onChange={(v) => setTweak('theme', v)} />
        <TweakSection label="Style" />
        <TweakSelect label="Accent" options={ACCENT_OPTIONS}
          value={tweaks.accent}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSelect label="Display font" options={FONT_OPTIONS}
          value={tweaks.fontDisplay}
          onChange={(v) => setTweak('fontDisplay', v)} />
        <TweakToggle label="Paper grain"
          value={tweaks.showGrain}
          onChange={(v) => setTweak('showGrain', v)} />
      </TweaksPanel>
    </div>
  );
}

// Minimal pathname-based router. Vite dev/preview servers fall back to
// index.html for unknown paths automatically; production deploys need an
// SPA rewrite (see vercel.json).
function LegalRoute({ children }) {
  const onLaunch = () => { window.location.assign('/#waitlist'); };
  return (
    <>
      <TopNav onLaunch={onLaunch} />
      {children}
      <Footer />
    </>
  );
}

function Root() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/terms')   return <LegalRoute><TermsPage /></LegalRoute>;
  if (path === '/privacy') return <LegalRoute><PrivacyPage /></LegalRoute>;
  return <Landing />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
