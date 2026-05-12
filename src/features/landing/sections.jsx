import React from 'react';
import { UserCheck, Wallet, Send, Check, ArrowRight } from 'lucide-react';
import { Sparkline, Reveal, PhoneMini, useLivePrice, genPriceData } from '../../components/primitives';

// Mid-page sections: how it works, security, app showcase

export function HowItWorks() {
  const steps = [
    { n: '01', t: 'Sign up in 60 seconds', d: 'Just your phone number to start. PAN/DigiLocker KYC takes another two minutes, and is required before your first buy.', icon: 'id' },
    { n: '02', t: 'Buy with UPI', d: 'From ₹100. Pay over UPI; we settle your purchase in Tether Gold (XAUT), where each token is backed 1:1 by a troy ounce of LBMA Good Delivery 24K bullion.', icon: 'buy' },
    { n: '03', t: 'Sell, gift, or redeem', d: 'Sell back to your bank in 15 minutes. Send grams to anyone via a link. Redeem 24K coins or jewellery once you cross 1 tola from your nearest Jeweller.', icon: 'send' },
  ];
  return (
    <section id="product" className="gf-section" style={{ position: 'relative' }}>
      <div className="gf-container">
        <div className="gf-split-bias" style={{ alignItems: 'start', marginBottom: 48 }}>
          <div>
            <Reveal><div className="gf-eyebrow" style={{ marginBottom: 20 }}>How it works</div></Reveal>
            <Reveal delay={80}><h2 className="gf-h2">From phone to <em>vault,</em><br />in three steps.</h2></Reveal>
          </div>
          <Reveal delay={160}>
            <p className="gf-lede gf-howitworks-lede">
              No paperwork. No mark-ups. Each gram you buy is settled in Tether Gold (XAUT), backed by serialised LBMA Good Delivery 24K bars held by Tether's London custodian. Cross 1 tola and you can redeem 24K coins shipped to your door.
            </p>
          </Reveal>
        </div>
        <div className="gf-cols-3-flat" style={{ gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div style={{
                background: 'var(--surface)', padding: '28px 20px', height: '100%',
                position: 'relative',
                transition: 'background 200ms',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-elevated)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                  <div className="font-mono" style={{ fontSize: 11, color: 'var(--gold-bright)', letterSpacing: '0.18em' }}>{s.n} / 03</div>
                  <StepIcon kind={s.icon} />
                </div>
                <h3 className="gf-h3" style={{ marginBottom: 12 }}>{s.t}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepIcon({ kind }) {
  const props = { size: 32, color: 'var(--gold-bright)', strokeWidth: 1.4, absoluteStrokeWidth: true };
  if (kind === 'id') return <UserCheck {...props} />;
  if (kind === 'buy') return <Wallet {...props} />;
  if (kind === 'send') return <Send {...props} />;
  return null;
}

export function SecuritySection() {
  return (
    <section id="security" className="gf-section" style={{ position: 'relative', background: 'var(--bg-elev-1)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="gf-guilloche" />
      <div className="gf-container" style={{ position: 'relative' }}>
        <div className="gf-split-even gf-split--visual-first" style={{ alignItems: 'center' }}>
          <div>
            <Reveal><div className="gf-eyebrow" style={{ marginBottom: 20 }}>Custody & insurance</div></Reveal>
            <Reveal delay={80}><h2 className="gf-h2" style={{ marginBottom: 24 }}>Real gold,<br /><em>verifiable on-chain.</em></h2></Reveal>
            <Reveal delay={160}><p className="gf-lede" style={{ marginBottom: 36 }}>
              We don't hold the gold ourselves. Every gram you buy is settled into Tether Gold (XAUT), a token where each unit is backed 1:1 by a troy ounce of LBMA Good Delivery 24K bullion held by Tether's London custodian. You see grams in the app; ownership lives on Ethereum, with every transaction publicly verifiable.
            </p></Reveal>
            <div style={{ display: 'grid', gap: 0 }}>
              {[
                ['Backed 1:1 by Tether Gold (XAUT)', '1 XAUT = 1 troy ounce of LBMA Good Delivery 24K bullion held by Tether’s London custodian.'],
                ['On-chain verifiable, 24/7', 'Your XAUT balance is visible on Ethereum at any time. Every transaction comes with a block-explorer link you can audit yourself.'],
                ['Independent reserve attestations', 'Tether publishes periodic attestations of the physical bullion backing XAUT, prepared by a third-party attestation firm. Reports are publicly available.'],
                ['ISO 27001-aligned + DigiLocker KYC', 'Encryption at rest and in transit. We hold no card or UPI credentials; those stay with your bank.'],
              ].map(([t, d], i) => (
                <Reveal key={t} delay={200 + i * 80}>
                  <div style={{ display: 'flex', gap: 14, padding: '18px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                    <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 8, background: 'rgba(245,184,50,0.12)', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} strokeWidth={1.8} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{t}</div>
                      <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', marginTop: 2 }}>{d}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="gf-split__visual">
            <VaultDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function VaultDiagram() {
  const nodes = [
    { label: 'BACKED · XAUT',     sub: 'Tether Gold · 1:1',    start: -70,  dur: 14 },
    { label: 'CHAIN · ETHEREUM',  sub: 'On-chain verifiable',  start:  20,  dur: 18 },
    { label: 'STANDARD · 1 oz',   sub: '1 XAUT = 1 troy oz',   start: 110,  dur: 22 },
    { label: 'ATTESTED',          sub: 'Reserve reports',      start: 200,  dur: 16 },
  ];

  // Used only by the static (mobile/tablet) layout — size is always a number.
  const VaultCore = ({ size }) => (
    <div style={{
      width: size, height: size,
      background: 'var(--surface-elevated)',
      border: '1.5px solid var(--gold-bright)',
      borderRadius: 10,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
      boxShadow: '0 0 40px rgba(245,184,50,0.18)',
    }}>
      <svg viewBox="0 0 60 60" width={size * 0.46} height={size * 0.46}>
        <circle cx="30" cy="30" r="22" fill="none" stroke="var(--gold-bright)" strokeWidth="1.5" />
        <circle cx="30" cy="30" r="5" fill="var(--gold-bright)" />
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const x = 30 + Math.cos(a * Math.PI / 180) * 22;
          const y = 30 + Math.sin(a * Math.PI / 180) * 22;
          return <circle key={a} cx={x} cy={y} r="2" fill="var(--gold-bright)" opacity="0.7" />;
        })}
        <line x1="30" y1="30" x2="30" y2="10" stroke="var(--gold-bright)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.28em', color: 'var(--gold-bright)', textTransform: 'uppercase', opacity: 0.85 }}>SECURE</div>
    </div>
  );

  return (
    <div className="gf-vault-diagram" style={{ position: 'relative', margin: '0 auto', maxWidth: 480 }}>
      {/* --- Static layout: mobile + tablet (< 1024px) --- */}
      <div className="gf-vault-static">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: 28, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,184,50,0.16) 0%, transparent 70%)' }}>
            <VaultCore size={108} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          {nodes.map((n) => (
            <div key={n.label} style={{ background: 'var(--surface)', padding: '14px 14px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ width: 8, height: 8, marginTop: 5, borderRadius: '50%', background: 'var(--gold-bright)', boxShadow: '0 0 0 4px rgba(245,184,50,0.18)', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 10.5, letterSpacing: '0.12em', fontWeight: 700, color: 'var(--text-primary)' }}>{n.label}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 9.5, color: 'var(--text-tertiary)', marginTop: 2 }}>{n.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Orbit layout: desktop (>= 1024px) --- */}
      <div className="gf-vault-orbit" style={{ position: 'relative', aspectRatio: '1/1' }}>
        <style>{`
          @keyframes orbit {
            from { transform: rotate(var(--start)) translateX(var(--r)) rotate(calc(-1 * var(--start))); }
            to   { transform: rotate(calc(var(--start) + 360deg)) translateX(var(--r)) rotate(calc(-360deg + -1 * var(--start))); }
          }
          .vault-orbit-arm {
            position: absolute; top: 50%; left: 50%; width: 0; height: 0;
            transform: rotate(var(--start)) translateX(var(--r)) rotate(calc(-1 * var(--start)));
          }
          .vault-orbit-node {
            position: absolute; transform: translate(-50%, -50%);
            display: flex; flex-direction: column; align-items: center; gap: 6px;
            pointer-events: none; white-space: nowrap;
          }
          .vault-orbit-dot {
            width: 10px; height: 10px; border-radius: 50%; background: var(--gold-bright);
            box-shadow: 0 0 0 4px rgba(245,184,50,0.18), 0 0 12px rgba(245,184,50,0.35); flex-shrink: 0;
          }
          .vault-orbit-label { font-family: monospace; font-size: 9.5px; letter-spacing: 0.14em; font-weight: 700; color: var(--text-primary); text-align: center; }
          .vault-orbit-sub { font-family: monospace; font-size: 8px; color: var(--text-tertiary); text-align: center; margin-top: -2px; }
        `}</style>
        <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <defs>
            <radialGradient id="vg2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(245,184,50,0.32)" />
              <stop offset="55%" stopColor="rgba(245,184,50,0.04)" />
              <stop offset="100%" stopColor="rgba(245,184,50,0)" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="196" fill="url(#vg2)" />
          <circle cx="200" cy="200" r="148" fill="none" stroke="var(--border-strong)" strokeWidth="0.8" strokeDasharray="3 5" opacity="0.6" />
          <circle cx="200" cy="200" r="188" fill="none" stroke="var(--border)" strokeWidth="0.5" opacity="0.35" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="var(--border)" strokeWidth="0.5" opacity="0.25" />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '36%', aspectRatio: '1/1', background: 'var(--surface-elevated)', border: '1.5px solid var(--gold-bright)', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 0 40px rgba(245,184,50,0.18)' }}>
          <svg viewBox="0 0 60 60" width="52" height="52">
            <circle cx="30" cy="30" r="22" fill="none" stroke="var(--gold-bright)" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="5" fill="var(--gold-bright)" />
            {[0, 60, 120, 180, 240, 300].map((a) => {
              const x = 30 + Math.cos(a * Math.PI / 180) * 22;
              const y = 30 + Math.sin(a * Math.PI / 180) * 22;
              return <circle key={a} cx={x} cy={y} r="2" fill="var(--gold-bright)" opacity="0.7" />;
            })}
            <line x1="30" y1="30" x2="30" y2="10" stroke="var(--gold-bright)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.28em', color: 'var(--gold-bright)', textTransform: 'uppercase', opacity: 0.85 }}>SECURE</div>
        </div>
        {nodes.map((n, i) => (
          <div key={i} className="vault-orbit-arm" style={{ '--start': `${n.start}deg`, '--r': '148px', '--dur': `${n.dur}s` }}>
            <div className="vault-orbit-node">
              <div className="vault-orbit-dot" />
              <div className="vault-orbit-label">{n.label}</div>
              <div className="vault-orbit-sub">{n.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AppShowcase() {
  return (
    <section id="app" style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="gf-container">
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <Reveal><div className="gf-eyebrow" style={{ marginBottom: 20, justifyContent: 'center' }}>The app</div></Reveal>
          <Reveal delay={80}><h2 className="gf-h2" style={{ maxWidth: 800, margin: '0 auto 20px' }}>Buy. Save. Sell. <em>Gift.</em><br />All from your pocket.</h2></Reveal>
          <Reveal delay={160}><p className="gf-lede" style={{ margin: '0 auto', textAlign: 'center' }}>Designed by people who use it daily: to set up a daily SIP, round up UPI payments, or send a gram of gold for a wedding or birthday.</p></Reveal>
        </div>
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <Reveal delay={100}><AppMockup kind="home" tag="Home" /></Reveal>
          <Reveal delay={200} style={{ marginBottom: 40 }}><AppMockup kind="buy" tag="Buy" highlight /></Reveal>
          <Reveal delay={300}><AppMockup kind="chart" tag="Live charts" /></Reveal>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 56 }}>
          <a href="#waitlist" className="gf-cta" style={{ padding: '14px 26px' }}>
            Join the waitlist
            <ArrowRight size={14} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </section>
  );
}

function AppMockup({ kind, tag, highlight }) {
  const data = React.useMemo(() => genPriceData(40, 2380, 18), []);
  const { delta } = useLivePrice(2384.50);
  return (
    <div style={{ position: 'relative' }}>
      {highlight && (
        <div style={{ position: 'absolute', inset: -20, background: 'radial-gradient(50% 60% at 50% 60%, rgba(245,184,50,0.25) 0%, transparent 70%)', filter: 'blur(20px)', borderRadius: 60, pointerEvents: 'none' }} />
      )}
      <PhoneMini scale={0.9}>
        {kind === 'home' && <AppHome data={data} />}
        {kind === 'buy' && <AppBuy />}
        {kind === 'chart' && <AppChart delta={delta} data={data} />}
      </PhoneMini>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <span className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>{tag}</span>
      </div>
    </div>
  );
}

function AppHome({ data }) {
  return (
    <div style={{ background: 'var(--bg-primary)', height: '100%', padding: '50px 18px 18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Good morning, Priya</div>
        <div style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--gold-bright)' }} />
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'var(--font-mono)' }}>Your gold</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 300, letterSpacing: '-0.03em', marginTop: 4 }}>₹12,485</div>
        <div style={{ fontSize: 11, color: 'var(--success)' }}>▲ ₹128 · 1.04% · 1.62 g</div>
      </div>
      <div style={{ background: 'var(--surface)', borderRadius: 12, padding: 12, border: '1px solid var(--border)', marginBottom: 12 }}>
        <Sparkline data={data} width={210} height={56} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: 6 }}>
          <span>1D</span><span>1W</span><span>1M</span><span style={{ color: 'var(--gold-bright)' }}>1Y</span><span>ALL</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        <div style={{ background: 'linear-gradient(135deg, var(--cta-1), var(--cta-2))', color: 'var(--cta-ink)', borderRadius: 10, padding: 10, fontSize: 12, fontWeight: 600, textAlign: 'center' }}>Buy</div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 10, fontSize: 12, fontWeight: 500, textAlign: 'center' }}>Sell</div>
      </div>
      <div style={{ background: 'var(--surface)', borderRadius: 10, padding: 10, fontSize: 11, marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span>24K Gold · 1g</span><span style={{ color: 'var(--success)' }}>₹7,712</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)' }}>
          <span>Updated 2s ago</span><span>+₹12</span>
        </div>
      </div>
    </div>
  );
}

function AppBuy() {
  return (
    <div style={{ background: 'var(--bg-primary)', height: '100%', padding: '50px 18px 18px' }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>← Buy gold</div>
      <div style={{ marginTop: 18, marginBottom: 22 }}>
        <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'var(--font-mono)' }}>Amount</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 300, letterSpacing: '-0.03em' }}>₹500</div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>≈ 0.0648 g · ₹7,712 / g</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: 16 }}>
        {['₹100', '₹500', '₹1K'].map((c) => (
          <div key={c} style={{ padding: '8px 0', textAlign: 'center', fontSize: 11, fontFamily: 'var(--font-mono)', background: c === '₹500' ? 'var(--surface-elevated)' : 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: c === '₹500' ? 'var(--gold-bright)' : 'var(--text-secondary)' }}>{c}</div>
        ))}
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 11 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: 'var(--text-muted)' }}>Gold value</span><span>₹485</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: 'var(--text-muted)' }}>GST (3%)</span><span>₹15</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 6, borderTop: '1px solid var(--border-subtle)' }}>
          <span>Pay via UPI</span><span style={{ fontWeight: 600 }}>₹500</span>
        </div>
      </div>
      <div style={{ background: 'linear-gradient(135deg, var(--cta-1), var(--cta-2))', color: 'var(--cta-ink)', borderRadius: 999, padding: 12, fontSize: 13, fontWeight: 700, textAlign: 'center' }}>Pay with UPI</div>
    </div>
  );
}

function AppChart({ delta, data }) {
  return (
    <div style={{ background: 'var(--bg-primary)', height: '100%', padding: '50px 18px 18px' }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>← Live · 24K Gold / INR</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 300, letterSpacing: '-0.03em' }}>₹7,712 / g</div>
      <div style={{ fontSize: 11, color: delta >= 0 ? 'var(--success)' : 'var(--error)', marginBottom: 20, fontFamily: 'var(--font-mono)' }}>
        {delta >= 0 ? '▲' : '▼'} ₹{Math.abs(delta * 3).toFixed(0)} · 24h
      </div>
      <Sparkline data={data} width={228} height={140} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 4, marginTop: 14, fontSize: 9, fontFamily: 'var(--font-mono)' }}>
        {['1H', '1D', '1W', '1M', '1Y'].map((p, i) => (
          <div key={p} style={{
            padding: '6px 0', textAlign: 'center', borderRadius: 6,
            background: i === 3 ? 'var(--gold-bright)' : 'transparent',
            color: i === 3 ? 'var(--gold-ink)' : 'var(--text-secondary)',
            border: i === 3 ? 'none' : '1px solid var(--border)',
          }}>{p}</div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: 10, background: 'var(--surface)', borderRadius: 10, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ color: 'var(--text-muted)' }}>OPEN</span><span>₹7,684</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ color: 'var(--text-muted)' }}>HIGH</span><span>₹7,742</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>LOW</span><span>₹7,672</span></div>
      </div>
    </div>
  );
}
