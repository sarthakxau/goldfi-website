import React from 'react';

// Shared visual primitives: live ticker, sparkline, reveal, phone frame.

const EMPTY_STYLE = Object.freeze({});

// Live gold price (Tether Gold / XAUT, via CoinGecko)
const TROY_OUNCE_G = 31.1034768;
const COINGECKO = 'https://api.coingecko.com/api/v3';
const COINGECKO_DEMO_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const COINGECKO_HEADERS = COINGECKO_DEMO_KEY ? { 'x-cg-demo-api-key': COINGECKO_DEMO_KEY } : undefined;

// FALLBACK VALUES
const FALLBACK_XAUT_USD = 4612;
const FALLBACK_USD_INR = 86;
const FALLBACK_BTC_USD = 95000;

function deriveGoldQuote({ xautUsd, xautInr, btcUsd, changePct }) {
  const pct = Number.isFinite(changePct) ? changePct : 0;
  const perGram24k = xautInr / TROY_OUNCE_G;
  const prev24k = perGram24k / (1 + pct / 100);
  return {
    xautUsd,
    xautInr,
    perGram24k,
    perGram22k: perGram24k * (22 / 24),
    usdInr: xautInr / xautUsd,
    changePct: pct,
    changeInr: perGram24k - prev24k,
    btcPer10g: btcUsd ? ((xautUsd / TROY_OUNCE_G) * 10) / btcUsd : 0,
  };
}

const FALLBACK_GOLD_QUOTE = deriveGoldQuote({
  xautUsd: FALLBACK_XAUT_USD,
  xautInr: FALLBACK_XAUT_USD * FALLBACK_USD_INR,
  btcUsd: FALLBACK_BTC_USD,
  changePct: 0,
});

// Gentle wander around a centre price — keeps sparklines from rendering empty
// before live history arrives, or if the history call fails.
function syntheticSeries(centre, n = 48) {
  const out = [];
  let v = centre * 0.997;
  for (let i = 0; i < n; i++) {
    v += (Math.random() - 0.45) * centre * 0.0014;
    out.push(v);
  }
  out.push(centre);
  return out;
}

let goldStore = {
  ...FALLBACK_GOLD_QUOTE,
  series: syntheticSeries(FALLBACK_GOLD_QUOTE.perGram24k),
  live: false,
  loading: true,
};
const goldSubs = new Set();
let goldTimer = null;

function publishGold(next) {
  goldStore = next;
  goldSubs.forEach((fn) => fn(goldStore));
}

async function refreshGold() {
  try {
    const [spotRes, histRes] = await Promise.all([
      fetch(`${COINGECKO}/simple/price?ids=tether-gold,bitcoin&vs_currencies=usd,inr&include_24hr_change=true`, { headers: COINGECKO_HEADERS }),
      fetch(`${COINGECKO}/coins/tether-gold/market_chart?vs_currency=inr&days=1`, { headers: COINGECKO_HEADERS }),
    ]);
    if (!spotRes.ok || !histRes.ok) throw new Error('coingecko request failed');
    const spot = await spotRes.json();
    const hist = await histRes.json();
    const g = spot && spot['tether-gold'];
    if (!g || typeof g.inr !== 'number' || typeof g.usd !== 'number') throw new Error('unexpected payload');
    const quote = deriveGoldQuote({
      xautUsd: g.usd,
      xautInr: g.inr,
      btcUsd: spot.bitcoin && spot.bitcoin.usd,
      changePct: g.inr_24h_change,
    });
    const series = Array.isArray(hist.prices) && hist.prices.length
      ? hist.prices.map((p) => p[1] / TROY_OUNCE_G)
      : syntheticSeries(quote.perGram24k);
    publishGold({ ...quote, series, live: true, loading: false });
  } catch (e) {
    // Keep the last good (or fallback) numbers — just clear the loading flag.
    publishGold({ ...goldStore, loading: false });
  }
}

function startGoldPolling() {
  if (goldTimer) return;
  refreshGold();
  goldTimer = setInterval(refreshGold, 60000);
}

// Live 24K / 22K gold quote in INR, plus the implied USD/INR rate, BTC-per-10g,
// 24h change, and an intraday ₹/gram series for sparklines.
export function useGoldPrice() {
  const [snapshot, setSnapshot] = React.useState(goldStore);
  React.useEffect(() => {
    goldSubs.add(setSnapshot);
    setSnapshot(goldStore);
    startGoldPolling();
    return () => {
      goldSubs.delete(setSnapshot);
      if (goldSubs.size === 0 && goldTimer) { clearInterval(goldTimer); goldTimer = null; }
    };
  }, []);
  return snapshot;
}

// Indian-grouped number, no currency symbol.
export function fmtINR(n, decimals = 0) {
  if (!Number.isFinite(n)) return '0';
  return Number(n).toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// Mini sparkline path. Pass fluid to make the SVG fill its parent's width.
// Pass drawn={false} to render it "undrawn" — the line then animates in (left→right)
// and the area fades in when drawn flips to true.
export function Sparkline({ data, width = 200, height = 50, fluid = false, drawn = true, stroke = 'var(--gold-bright)', fill = 'rgba(245,184,50,0.12)' }) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const pts = data.map((v, i) => [i * stepX, height - ((v - min) / range) * (height - 4) - 2]);
  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = `${path} L${width},${height} L0,${height} Z`;
  return (
    <svg
      width={fluid ? '100%' : width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ display: 'block', maxWidth: '100%' }}
    >
      <path d={area} fill={fill} style={{ opacity: drawn ? 1 : 0, transition: 'opacity 1.6s var(--ease-out)' }} />
      <path
        d={path}
        pathLength="1"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ strokeDasharray: 1, strokeDashoffset: drawn ? 0 : 1, transition: 'stroke-dashoffset 1.6s var(--ease-out)' }}
      />
    </svg>
  );
}

// Hook: in-view trigger (fires once, then disconnects)
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

export function Reveal({ children, delay = 0, as = 'div', style = EMPTY_STYLE, className = '', ...rest }) {
  const [ref, inView] = useInView();
  const Tag = as;
  return (
    <Tag ref={ref} className={('gf-reveal' + (inView ? ' in' : '') + ' ' + className).trim()} style={{ transitionDelay: delay + 'ms', ...style }} {...rest}>
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
