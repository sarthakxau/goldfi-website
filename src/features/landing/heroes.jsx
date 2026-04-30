import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Sparkline, Reveal, useLivePrice, genPriceData } from '../../components/primitives';

// 3 hero variants for Gold.Fi landing
// Variant A: Editorial - big serif, asymmetric, vault photograph placeholder
// Variant B: Live ticker - split layout, animated chart + price as centerpiece
// Variant C: 3D bar - centered, dramatic gold bar floating over grid

// ============== HERO A - EDITORIAL =================
export function HeroEditorial({ onLaunch }) {
  return (
    <section style={{ position: 'relative', minHeight: '92vh', overflow: 'hidden', background: 'var(--bg-primary)' }} className="gf-grain">
      <div className="gf-grid-bg" />
      <div className="gf-guilloche" />

      <div className="gf-container" style={{ position: 'relative', paddingTop: 96, paddingBottom: 72 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'end', minHeight: '70vh' }}>
          {/* LEFT: type */}
          <div>
            <Reveal>
              <div className="gf-eyebrow" style={{ marginBottom: 32 }}>Pre-launch · Closed beta · Backed by Tether Gold</div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="gf-h1" style={{ marginBottom: 32 }}>
                Gold,<br />
                held the way<br />
                it <em>should be.</em>
              </h1>
            </Reveal>
            <Reveal delay={220}>
              <p className="gf-lede" style={{ marginBottom: 36, maxWidth: 480 }}>
                A SIP for gold. Save ₹100 at a time over UPI, settled into Tether Gold (XAUT), where each token is backed 1:1 by a troy ounce of LBMA Good Delivery 24K bullion held by Tether's London custodian. Your balance shows in grams. Sell back to your bank, gift grams to friends, or redeem as a physical coin.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
                <button className="gf-cta" onClick={onLaunch}>
                  Join the waitlist
                  <ArrowRight size={14} strokeWidth={1.8} />
                </button>
                <button className="gf-cta-ghost">Watch 90-second tour</button>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 6 }}>Start from ₹100 · No paperwork</span>
              </div>
            </Reveal>
            <Reveal delay={420}>
              <HeroProof />
            </Reveal>
          </div>

          {/* RIGHT: large gold bar plate */}
          <div style={{ position: 'relative', alignSelf: 'stretch', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Reveal delay={300}>
              <HeroVaultPlate />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVaultPlate() {
  const data = React.useMemo(() => genPriceData(60, 2380, 16), []);
  const { val, delta } = useLivePrice(2384.50);
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 560, aspectRatio: '5/6' }}>
      {/* Big bar */}
      <div style={{
        position: 'absolute', inset: '8% 4% 14% 6%',
        borderRadius: 14,
        background: `
          radial-gradient(120% 80% at 30% 25%, rgba(255,239,184,0.6) 0%, transparent 55%),
          radial-gradient(80% 60% at 80% 90%, rgba(0,0,0,0.35) 0%, transparent 60%),
          linear-gradient(135deg, #8B6B2E 0%, #C8951A 25%, #FFE08A 45%, #F5B832 65%, #B8860B 85%, #5A3F10 100%)
        `,
        boxShadow: '0 60px 120px rgba(212,160,18,0.35), 0 30px 60px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.5) inset',
        transform: 'perspective(1200px) rotateX(8deg) rotateY(-12deg)',
      }}>
    </div>

      {/* Floating live price chip */}
      <div style={{
        position: 'absolute', top: '4%', right: '-6%',
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 16, padding: '14px 18px',
        boxShadow: 'var(--shadow-lg)',
        backdropFilter: 'blur(8px)',
        minWidth: 220,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="gf-live-dot" />
          <span className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>24K · INR / gram</span>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 400, letterSpacing: '-0.03em' }}>
          ₹{(15369 + val * 0.005).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </div>
        <div style={{ fontSize: 12, color: delta >= 0 ? 'var(--success)' : 'var(--error)', fontFamily: 'var(--font-mono)' }}>
          {delta >= 0 ? '▲' : '▼'} ₹{Math.abs(delta * 3).toFixed(0)} · 24h
        </div>
        <div style={{ marginTop: 10, opacity: 0.95 }}>
          <Sparkline data={data} width={186} height={42} />
        </div>
      </div>

      {/* Floating receipt chip */}
      <div style={{
        position: 'absolute', bottom: '0%', left: '-4%',
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 14, padding: '14px 16px',
        boxShadow: 'var(--shadow-md)',
        minWidth: 240,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gold-bright)', color: 'var(--gold-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>✓</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Gold credited to your vault</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>0.0648 g · ₹500</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: 8, fontFamily: 'var(--font-mono)' }}>
          <span>UPI · PRIYA@HDFCBANK</span>
          <span>09:42 IST</span>
        </div>
      </div>
    </div>
  );
}

function HeroProof() {
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      {[
        { v: '₹100', l: 'Minimum to start' },
        { v: '1:1', l: 'Backed by XAUT' },
        { v: '24K', l: '999.9 fine gold' },
        { v: 'UPI', l: 'Pay & withdraw' },
      ].map((s) => (
        <div key={s.l} style={{ borderLeft: '1px solid var(--border)', paddingLeft: 16 }}>
          <div className="gf-price-num" style={{ fontSize: 22 }}>{s.v}</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.16em', fontFamily: 'var(--font-mono)', marginTop: 4 }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

// ============== HERO B - LIVE TICKER ===============
export function HeroTicker({ onLaunch }) {
  const data = React.useMemo(() => genPriceData(120, 2380, 22), []);
  const { val, delta } = useLivePrice(2384.50);
  return (
    <section style={{ position: 'relative', minHeight: '92vh', overflow: 'hidden', background: 'var(--bg-primary)' }} className="gf-grain">
      <div className="gf-grid-bg" />
      <div className="gf-container" style={{ position: 'relative', paddingTop: 88, paddingBottom: 56 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', minHeight: '76vh' }}>
          <div>
            <Reveal>
              <div className="gf-eyebrow" style={{ marginBottom: 28 }}>Pre-launch · Live spot · 24K ₹ / gram</div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="gf-h1" style={{ marginBottom: 28 }}>
                The 5,000-year<br />
                hedge, now<br />
                <em>tappable.</em>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="gf-lede" style={{ marginBottom: 32, maxWidth: 520 }}>
                A SIP for gold. ₹100 at a time, settled into Tether Gold (XAUT), with each token backed 1:1 by a troy ounce of LBMA Good Delivery 24K bullion. Buy via UPI, sell back to your bank, set up autopay, or send grams as a gift, all without ever touching a wallet, address, or token name.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <BuyCalculator onLaunch={onLaunch} />
            </Reveal>
          </div>
          <Reveal delay={250}>
            <HeroChartCard data={data} val={val} delta={delta} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HeroChartCard({ data, val, delta }) {
  const inrPerGram = 7700 + val * 0.005;
  const inrDelta = delta * 3;
  return (
    <div className="gf-card-elev" style={{ padding: 28, position: 'relative' }}>
      <div className="gf-guilloche" style={{ borderRadius: 20 }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span className="gf-live-dot" />
              <span className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>24K Gold · ₹ / gram</span>
            </div>
            <div className="gf-price-num" style={{ fontSize: 56 }}>₹{inrPerGram.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
            <div style={{ fontSize: 14, color: delta >= 0 ? 'var(--success)' : 'var(--error)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
              {delta >= 0 ? '▲' : '▼'} ₹{Math.abs(inrDelta).toFixed(0)} · {(Math.abs(inrDelta) / inrPerGram * 100).toFixed(2)}% (24h)
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--surface-sunken)', borderRadius: 10, border: '1px solid var(--border)' }}>
            {['1H', '1D', '1W', '1M', '1Y', 'ALL'].map((p, i) => (
              <button key={p} style={{
                padding: '6px 10px', borderRadius: 7, fontSize: 11,
                fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
                background: i === 3 ? 'var(--gold-bright)' : 'transparent',
                color: i === 3 ? 'var(--gold-ink)' : 'var(--text-secondary)',
                fontWeight: i === 3 ? 700 : 500,
              }}>{p}</button>
            ))}
          </div>
        </div>
        <div style={{ height: 240, marginBottom: 16 }}>
          <Sparkline data={data} width={520} height={240} stroke="var(--gold-bright)" fill="rgba(245,184,50,0.10)" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
          {[
            ['Open', '15,123'],
            ['High', '₹15,369'],
            ['Low', '₹14,945'],
            ['Vol', '184 kg'],
          ].map(([l, v]) => (
            <div key={l}>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-tertiary)', marginBottom: 4 }}>{l}</div>
              <div style={{ fontSize: 15, fontWeight: 500, fontFamily: 'var(--font-display)' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BuyCalculator({ onLaunch }) {
  const [inr, setInr] = React.useState(500);
  const grams = (inr / 7712).toFixed(4);
  return (
    <div className="gf-card" style={{ padding: 18, maxWidth: 520 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>Quick Buy · UPI</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>₹7,712 / g · live</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center' }}>
        <div style={{ background: 'var(--surface-sunken)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 14px' }}>
          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em' }}>You pay</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 22, color: 'var(--text-secondary)' }}>₹</span>
            <input type="number" value={inr} onChange={(e) => setInr(Math.max(10, +e.target.value || 0))}
              style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 400, width: '100%', letterSpacing: '-0.02em' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 999, background: 'var(--gold-bright)', color: 'var(--gold-ink)' }}>→</div>
        <div style={{ background: 'var(--surface-sunken)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 14px' }}>
          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em' }}>You receive</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 400, letterSpacing: '-0.02em' }}>{grams}</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>g</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        {[100, 500, 1000, 5000].map((v) => (
          <button key={v} onClick={() => setInr(v)} style={{
            flex: 1, padding: '8px 0', borderRadius: 8,
            border: '1px solid var(--border)',
            fontSize: 12, fontFamily: 'var(--font-mono)',
            background: inr === v ? 'var(--surface-elevated)' : 'transparent',
            color: inr === v ? 'var(--gold-bright)' : 'var(--text-secondary)',
          }}>₹{v.toLocaleString('en-IN')}</button>
        ))}
      </div>
      <button className="gf-cta" onClick={onLaunch} style={{ width: '100%', marginTop: 14 }}>Reserve early access →</button>
    </div>
  );
}

// ============== HERO C - DRAMATIC =================
export function HeroDramatic({ onLaunch }) {
  const { val } = useLivePrice(2384.50);
  return (
    <section style={{ position: 'relative', minHeight: '94vh', overflow: 'hidden', background: 'var(--bg-deep)' }} className="gf-grain">
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(60% 50% at 50% 35%, rgba(245,184,50,0.18) 0%, transparent 60%)',
      }} />
      <div className="gf-grid-bg" />

      {/* Big watermark word */}
      <div aria-hidden style={{
        position: 'absolute', left: 0, right: 0, bottom: '-8%',
        textAlign: 'center', fontFamily: 'var(--font-display)',
        fontSize: 'clamp(160px, 28vw, 460px)', fontWeight: 300,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(212,160,18,0.1)',
        letterSpacing: '-0.04em', lineHeight: 0.85, pointerEvents: 'none',
      }}></div>

      <div className="gf-container" style={{ position: 'relative', paddingTop: 96, textAlign: 'center' }}>
        <Reveal>
          <div className="gf-eyebrow" style={{ marginBottom: 32, justifyContent: 'center' }}>
            <span className="gf-live-dot" /> Live spot · ₹{(7700 + val * 0.005).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} / gram
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="gf-h1" style={{ maxWidth: 1100, margin: '0 auto 28px' }}>
            Money that has <em>outlasted</em><br />
            every empire, every currency,<br />
            every century.
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="gf-lede" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
Now in your pocket. Save ₹100 at a time into Tether Gold (XAUT), where each token represents a troy ounce of LBMA Good Delivery 24K bullion. Sell back to your bank in fifteen minutes. Redeem as a coin once you cross 1 tola.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="gf-cta" onClick={onLaunch} style={{ padding: '16px 28px', fontSize: 16 }}>
              Join the waitlist
              <ArrowRight size={14} strokeWidth={1.8} />
            </button>
            <button className="gf-cta-ghost">See how it works</button>
          </div>
        </Reveal>

        {/* Centerpiece: floating bar */}
        <Reveal delay={250}>
          <div style={{ position: 'relative', margin: '64px auto 0', width: 'min(700px, 90vw)', height: 360 }}>
            {/* Glow */}
            <div style={{ position: 'absolute', inset: '-10% -10% 30% -10%', background: 'radial-gradient(60% 60% at 50% 60%, rgba(245,184,50,0.4) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%) perspective(1400px) rotateX(20deg) rotateY(-22deg) rotateZ(2deg)',
              width: '85%', aspectRatio: '5/2',
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: 8,
                background: `
                  radial-gradient(120% 80% at 25% 20%, rgba(255,239,184,0.7) 0%, transparent 55%),
                  radial-gradient(80% 60% at 80% 95%, rgba(0,0,0,0.4) 0%, transparent 55%),
                  linear-gradient(135deg, #8B6B2E 0%, #C8951A 25%, #FFE08A 45%, #F5B832 65%, #B8860B 85%, #5A3F10 100%)
                `,
                boxShadow: '0 100px 200px rgba(212,160,18,0.45), 0 40px 80px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.5) inset',
                position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ textAlign: 'center', color: '#1F1A08' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.4em', opacity: 0.7 }}>· 24K · 999.9 · XAUT-BACKED ·</div>
                </div>
              </div>
            </div>
            {/* Reflection */}
            <div style={{
              position: 'absolute', left: '50%', bottom: 0,
              transform: 'translateX(-50%) scaleY(-0.4) skewX(-20deg)',
              transformOrigin: 'top',
              width: '70%', aspectRatio: '5/2',
              background: 'linear-gradient(135deg, #C8951A, #F5B832, #B8860B)',
              opacity: 0.18, filter: 'blur(8px)', borderRadius: 8,
              maskImage: 'linear-gradient(to bottom, black, transparent 70%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 70%)',
            }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
