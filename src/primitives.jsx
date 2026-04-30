import React from 'react';

// Shared visual primitives — gold bar SVG, live ticker, sparkline, etc.

export function GoldBarSVG({ size = 1, style = {} }) {
  const w = 280 * size, h = 180 * size;
  return (
    <svg viewBox="0 0 280 180" width={w} height={h} style={style}>
      <defs>
        <linearGradient id="bar-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFEFB8" />
          <stop offset="55%" stopColor="#F0C649" />
          <stop offset="100%" stopColor="#C8951A" />
        </linearGradient>
        <linearGradient id="bar-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8B530" />
          <stop offset="50%" stopColor="#C8951A" />
          <stop offset="100%" stopColor="#7A5A14" />
        </linearGradient>
        <linearGradient id="bar-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B6B2E" />
          <stop offset="100%" stopColor="#5A3F10" />
        </linearGradient>
      </defs>
      {/* Top face (parallelogram) */}
      <polygon points="40,40 240,40 260,60 60,60" fill="url(#bar-top)" />
      {/* Front face */}
      <polygon points="60,60 260,60 260,150 60,150" fill="url(#bar-front)" />
      {/* Side face */}
      <polygon points="40,40 60,60 60,150 40,130" fill="url(#bar-side)" />
      {/* Stamp */}
      <text x="160" y="105" textAnchor="middle" fontFamily="serif" fontSize="14" fontWeight="700" fill="#1F1A08" opacity="0.7">GOLD.FI</text>
      <text x="160" y="125" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#1F1A08" opacity="0.55" letterSpacing="2">999.9 · 1oz</text>
    </svg>
  );
}

export function GoldCoinSVG({ size = 120, style = {} }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={style}>
      <defs>
        <radialGradient id="coin-face" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#FFEFB8" />
          <stop offset="55%" stopColor="#E4A500" />
          <stop offset="100%" stopColor="#8B6B2E" />
        </radialGradient>
        <linearGradient id="coin-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4A012" />
          <stop offset="100%" stopColor="#5A3F10" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="64" r="52" fill="url(#coin-edge)" />
      <circle cx="60" cy="60" r="52" fill="url(#coin-face)" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#7A5A14" strokeWidth="0.5" opacity="0.6" />
      <text x="60" y="56" textAnchor="middle" fontFamily="serif" fontSize="22" fontWeight="700" fill="#5A3F10">G.fi</text>
      <text x="60" y="74" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#5A3F10" letterSpacing="2">·999.9·</text>
    </svg>
  );
}

// Live price ticker — generates a small smooth random walk around base
export function useLivePrice(base = 2384.50, drift = 0.0003) {
  const [val, setVal] = React.useState(base);
  const [delta, setDelta] = React.useState(0);
  const [pulse, setPulse] = React.useState(0);
  React.useEffect(() => {
    let last = base;
    const id = setInterval(() => {
      const noise = (Math.random() - 0.48) * 0.8;
      const next = +(last + noise).toFixed(2);
      setVal(next);
      setDelta(+(next - last).toFixed(2));
      last = next;
      setPulse((p) => p + 1);
    }, 1800);
    return () => clearInterval(id);
  }, []);
  return { val, delta, pulse };
}

// Mini sparkline path
export function Sparkline({ data, width = 200, height = 50, stroke = 'var(--gold-bright)', fill = 'rgba(245,184,50,0.12)' }) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const pts = data.map((v, i) => [i * stepX, height - ((v - min) / range) * (height - 4) - 2]);
  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = `${path} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <path d={area} fill={fill} />
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// Generates synthetic price-history data
export function genPriceData(n = 80, base = 2380, vol = 18) {
  const out = [];
  let v = base - vol;
  for (let i = 0; i < n; i++) {
    v += (Math.random() - 0.45) * vol * 0.4;
    out.push(v);
  }
  return out;
}

// Auto-counter — counts up to value once on mount/in-view
function useCountUp(target, duration = 1600) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

// Hook: in-view trigger
export function useInView(opts = { threshold: 0.18 }) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, opts);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export function Reveal({ children, delay = 0, as = 'div', style = {}, ...rest }) {
  const [ref, inView] = useInView();
  const Tag = as;
  return (
    <Tag ref={ref} className={'gf-reveal' + (inView ? ' in' : '')} style={{ transitionDelay: delay + 'ms', ...style }} {...rest}>
      {children}
    </Tag>
  );
}

// Phone frame mini for app showcase
export function PhoneMini({ children, scale = 1, style = {} }) {
  return (
    <div style={{
      width: 280 * scale, height: 580 * scale,
      background: '#000', borderRadius: 38 * scale, padding: 6 * scale,
      boxShadow: '0 0 0 1.5px #1a1a1a, 0 30px 70px rgba(0,0,0,0.5)',
      position: 'relative', ...style,
    }}>
      <div style={{
        position: 'absolute', top: 10 * scale, left: '50%', transform: 'translateX(-50%)',
        width: 90 * scale, height: 22 * scale, background: '#000', borderRadius: 14 * scale, zIndex: 5,
      }} />
      <div style={{
        width: '100%', height: '100%', borderRadius: 32 * scale, overflow: 'hidden',
        background: 'var(--bg-primary)', position: 'relative',
      }}>
        {children}
      </div>
    </div>
  );
}

