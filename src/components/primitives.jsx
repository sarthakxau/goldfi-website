import React from 'react';

// Shared visual primitives: live ticker, sparkline, reveal, phone frame.

const EMPTY_STYLE = Object.freeze({});

// Live price ticker: generates a small smooth random walk around base
export function useLivePrice(base = 2384.50) {
  const [val, setVal] = React.useState(base);
  const [delta, setDelta] = React.useState(0);
  React.useEffect(() => {
    let last = base;
    const id = setInterval(() => {
      const noise = (Math.random() - 0.48) * 0.8;
      const next = +(last + noise).toFixed(2);
      setVal(next);
      setDelta(+(next - last).toFixed(2));
      last = next;
    }, 1800);
    return () => clearInterval(id);
  }, []);
  return { val, delta };
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

// Hook: in-view trigger
function useInView(opts = { threshold: 0.18 }) {
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

export function Reveal({ children, delay = 0, as = 'div', style = EMPTY_STYLE, ...rest }) {
  const [ref, inView] = useInView();
  const Tag = as;
  return (
    <Tag ref={ref} className={'gf-reveal' + (inView ? ' in' : '')} style={{ transitionDelay: delay + 'ms', ...style }} {...rest}>
      {children}
    </Tag>
  );
}

// Phone frame mini for app showcase
export function PhoneMini({ children, scale = 1, style = EMPTY_STYLE }) {
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
