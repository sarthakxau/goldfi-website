import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Sparkline, Reveal, useLivePrice, genPriceData } from '../../components/primitives';

export function HeroEditorial({ onLaunch }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }} className="gf-grain gf-hero">
      <div className="gf-grid-bg" />
      <div className="gf-guilloche" />

      <div className="gf-container gf-hero-inner">
        <div className="gf-split" style={{ alignItems: 'end' }}>
          {/* LEFT: type */}
          <div>
            <Reveal>
              <div className="gf-eyebrow" style={{ marginBottom: 24 }}>Pre-launch · Closed beta · Backed by Tether Gold</div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="gf-h1" style={{ marginBottom: 28 }}>
                Gold,<br />
                held the way<br />
                it <em>should be.</em>
              </h1>
            </Reveal>
            <Reveal delay={220}>
              <p className="gf-lede" style={{ marginBottom: 32, maxWidth: 480 }}>
                A SIP for gold. Save ₹100 at a time over UPI, settled into Tether Gold (XAUT). Withdraw back to your bank, gift grams to friends, or redeem as a physical coin.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="gf-cta-stack" style={{ marginBottom: 48 }}>
                <button className="gf-cta" onClick={onLaunch}>
                  Join the waitlist
                  <ArrowRight size={14} strokeWidth={1.8} />
                </button>
                <button className="gf-cta-ghost">Watch 90-second tour</button>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Start from ₹100 · No paperwork</span>
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
    <div style={{ position: 'relative', aspectRatio: '5/6', margin: '0 auto' }} className="gf-vault-plate">
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
      }} />

      {/* Floating live price chip */}
      <div className="gf-vault-chip gf-vault-chip--price" style={{
        position: 'absolute',
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 16, padding: '12px 16px',
        boxShadow: 'var(--shadow-lg)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="gf-live-dot" />
          <span className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>24K · INR / gram</span>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400, letterSpacing: '-0.03em' }}>
          ₹{(15369 + val * 0.005).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </div>
        <div style={{ fontSize: 12, color: delta >= 0 ? 'var(--success)' : 'var(--error)', fontFamily: 'var(--font-mono)' }}>
          {delta >= 0 ? '▲' : '▼'} ₹{Math.abs(delta * 3).toFixed(0)} · 24h
        </div>
        <div style={{ marginTop: 10, opacity: 0.95 }}>
          <Sparkline data={data} height={42} fluid />
        </div>
      </div>

      {/* Floating receipt chip */}
      <div className="gf-vault-chip gf-vault-chip--receipt" style={{
        position: 'absolute',
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 14, padding: '12px 14px',
        boxShadow: 'var(--shadow-md)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 8, background: 'var(--gold-bright)', color: 'var(--gold-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>✓</div>
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
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {[
        { v: '₹100', l: 'Minimum to start' },
        { v: '1:1', l: 'Backed by XAUT' },
        { v: 'UPI', l: 'Pay & withdraw' },
      ].map((s) => (
        <div key={s.l} style={{ borderLeft: '1px solid var(--border)', paddingLeft: 14, flex: '1 1 90px' }}>
          <div className="gf-price-num" style={{ fontSize: 20 }}>{s.v}</div>
          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: 'var(--font-mono)', marginTop: 4 }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}
