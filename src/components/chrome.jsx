import React from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useGoldPrice, fmtINR } from './primitives';

// Site chrome: top nav + footer + price marquee strip

function ThemeSwitcher() {
  const themes = [
    { id: 'noir', label: 'Noir' },
    { id: 'ivory', label: 'Ivory' },
  ];
  const [theme, setTheme] = React.useState(() => {
    if (typeof window === 'undefined') return 'noir';
    try {
      return localStorage.getItem('gf-theme') || document.documentElement.getAttribute('data-theme') || 'noir';
    } catch (e) {
      return document.documentElement.getAttribute('data-theme') || 'noir';
    }
  });

  React.useEffect(() => {
    const onChange = (e) => setTheme(e.detail);
    window.addEventListener('gf-theme-change', onChange);
    return () => window.removeEventListener('gf-theme-change', onChange);
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const apply = (t) => {
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('gf-theme', t); } catch (e) {}
    window.dispatchEvent(new CustomEvent('gf-theme-change', { detail: t }));
  };
  return (
    <div className="gf-theme-switcher" style={{ display: 'inline-flex', gap: 2, padding: 3, borderRadius: 999, border: '1px solid var(--border)', background: 'var(--surface-sunken)' }}>
      {themes.map((t) => (
        <button key={t.id} onClick={() => apply(t.id)} className="gf-theme-pill" style={{
          borderRadius: 999, fontSize: 10,
          fontFamily: 'var(--font-mono)', letterSpacing: '0.16em',
          background: theme === t.id ? 'var(--gold-bright)' : 'transparent',
          color: theme === t.id ? 'var(--gold-ink)' : 'var(--text-secondary)',
          fontWeight: theme === t.id ? 700 : 500,
          textTransform: 'uppercase',
        }}>{t.label}</button>
      ))}
    </div>
  );
}

const NAV_LINKS = [
  { label: 'Product',  hash: 'product' },
  { label: 'Security', hash: 'security' },
  { label: 'Learn',    hash: 'learn' },
];

function MobileNav({ headerHeight, onLaunch }) {
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef(null);
  const panelRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    const first = panelRef.current && panelRef.current.querySelector('a, button');
    if (first) first.focus();
    return () => {
      html.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      if (btnRef.current) btnRef.current.focus();
    };
  }, [open]);

  const go = (href) => { setOpen(false); window.location.assign(href); };

  return (
    <div className="gf-nav-toggle">
      <button
        ref={btnRef}
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 12, color: 'var(--text-primary)',
        }}
      >
        {open ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
      </button>

      {open && (
        <>
          <div className="gf-nav-panel-backdrop" style={{ top: headerHeight }} onClick={() => setOpen(false)} />
          <nav ref={panelRef} className="gf-nav-panel" style={{ top: headerHeight, padding: '8px 20px 20px' }}>
            {NAV_LINKS.map((x) => (
              <a
                key={x.label}
                href={'/#' + x.hash}
                onClick={(e) => { e.preventDefault(); go('/#' + x.hash); }}
                style={{
                  display: 'flex', alignItems: 'center', minHeight: 48,
                  fontSize: 16, color: 'var(--text-secondary)',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                {x.label}
              </a>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 16 }}>
              <button
                className="gf-cta"
                style={{ flex: 1 }}
                onClick={() => { setOpen(false); (onLaunch || (() => window.location.assign('/#waitlist')))(); }}
              >
                Join waitlist
                <ArrowRight size={14} strokeWidth={1.8} />
              </button>
              <ThemeSwitcher />
            </div>
          </nav>
        </>
      )}
    </div>
  );
}

export function TopNav({ onLaunch }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const headerHeight = 64;
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'color-mix(in oklab, var(--bg-primary) 78%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      transition: 'background 240ms var(--ease-out), border-color 240ms var(--ease-out), backdrop-filter 240ms var(--ease-out)',
    }}>
      <div className="gf-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: headerHeight }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.svg" alt="goldfi" style={{ height: 26, width: 'auto', display: 'block' }} />
        </a>
        <nav className="gf-nav-desktop" style={{ gap: 28, alignItems: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
          {NAV_LINKS.map((x) => (
            <a key={x.label} href={'/#' + x.hash} style={{ transition: 'color 150ms' }}
               onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
               onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>{x.label}</a>
          ))}
        </nav>
        <div className="gf-nav-desktop" style={{ gap: 12, alignItems: 'center' }}>
          <button className="gf-cta" onClick={onLaunch || (() => { window.location.assign('/#waitlist'); })} style={{ padding: '10px 18px', fontSize: 14 }}>
            Join waitlist
            <ArrowRight size={14} strokeWidth={1.8} />
          </button>
        </div>
        <MobileNav headerHeight={headerHeight} onLaunch={onLaunch} />
      </div>
    </header>
  );
}

export function PriceStrip() {
  const g = useGoldPrice();
  const goldUp = g.changePct >= 0;
  const goldDelta = `${goldUp ? '+' : '−'}${Math.abs(g.changePct).toFixed(2)}%`;
  const items = [
    { label: '24K Gold',      val: `₹${fmtINR(g.perGram24k, 0)} / g`, d: goldDelta, up: goldUp },
    { label: '22K Gold',      val: `₹${fmtINR(g.perGram22k, 0)} / g`, d: goldDelta, up: goldUp },
    { label: 'Silver',        val: '₹93.20 / g',   d: '−0.18%', up: false },
    { label: 'USD / INR',     val: `₹${fmtINR(g.usdInr, 2)}`,         d: '',       up: true },
    { label: 'Sensex',        val: '78,420',         d: '+0.31%', up: true },
    { label: 'BTC / 10g',     val: `${g.btcPer10g.toFixed(4)} BTC`,   d: '',       up: true },
    { label: 'Vault total',   val: '2,400 kg',       d: 'live',  up: true },
  ];
  const row = (
    <>
      {items.concat(items).map((x, i) => (
        <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: 10 }}>{x.label}</span>
          <span style={{ color: 'var(--text-primary)' }}>{x.val}</span>
          <span style={{ color: x.up ? 'var(--success)' : 'var(--error)' }}>{x.d}</span>
          <span style={{ color: 'var(--border-strong)' }}>·</span>
        </div>
      ))}
    </>
  );
  return (
    <div style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', overflow: 'hidden', background: 'var(--bg-elev-1)' }}>
      <div className="gf-marquee" style={{ padding: '12px 0' }}>
        {row}
      </div>
    </div>
  );
}

export function Footer() {
  const cols = [
    { h: 'Company', items: [{ label: 'Contact', href: 'mailto:help@bulliondigital.io' }] },
    { h: 'Legal', items: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
    ] },
  ];
  return (
    <footer style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
      <div className="gf-guilloche" />
      <div className="gf-container gf-footer-inner" style={{ position: 'relative' }}>
        <div className="gf-footer-grid gf-footer-cols">
          <div className="gf-footer-brand">
            <div style={{ marginBottom: 16 }}>
              <a href="/"><img src="/logo.svg" alt="goldfi" style={{ height: 26, width: 'auto', display: 'block' }} /></a>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, maxWidth: 320 }}>
              Save into 24K gold on your phone. Buy from ₹100 with UPI, settled into Tether Gold (XAUT).
            </p>
            <div style={{ marginTop: 24 }}>
              <a href="/#waitlist" className="gf-cta" style={{ padding: '10px 18px', fontSize: 13 }}>
                Join the waitlist
                <ArrowRight size={12} strokeWidth={1.8} />
              </a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-bright)', marginBottom: 16 }}>{c.h}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.items.map((i) => (
                  <li key={i.label}><a href={i.href} style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>{i.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="gf-footer-bottom" style={{ borderTop: '1px solid var(--border-subtle)', fontSize: 12, color: 'var(--text-muted)' }}>
          <div>© 2026 Bullion Digital (BVI) Ltd. All rights reserved. Gold purchases are subject to GST. Past performance does not guarantee future returns.</div>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 11 }}>
            <span>XAUT-backed</span>
            <span>On-chain verifiable</span>
            <span>UPI · NPCI</span>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
