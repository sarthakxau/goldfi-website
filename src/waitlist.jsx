import React from 'react';
import { Reveal } from './primitives';

// Waitlist section — pre-launch capture form

export function Waitlist() {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [status, setStatus] = React.useState('idle'); // idle | submitting | done
  const [position, setPosition] = React.useState(null);
  const submit = (e) => {
    e.preventDefault();
    if (!email && !phone) return;
    setStatus('submitting');
    setTimeout(() => {
      const pos = 4218 + Math.floor(Math.random() * 280);
      setPosition(pos);
      setStatus('done');
    }, 700);
  };

  return (
    <section id="waitlist" style={{ padding: '140px 0 120px', position: 'relative', overflow: 'hidden', background: 'var(--bg-deep)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 60% at 50% 40%, rgba(245,184,50,0.16) 0%, transparent 70%)' }} />
      <div className="gf-grid-bg" />
      <div className="gf-guilloche" />
      <div className="gf-container" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 80, alignItems: 'center' }}>
          {/* Left — pitch */}
          <div>
            <Reveal>
              <div className="gf-eyebrow" style={{ marginBottom: 24 }}>
                <span className="gf-live-dot" /> Pre-launch · Closed beta
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="gf-h2" style={{ marginBottom: 24, maxWidth: 640 }}>
                Be the first to <em>own</em><br />gold the new way.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="gf-lede" style={{ marginBottom: 36, maxWidth: 540 }}>
                We're rolling out invites in waves through 2026. Join the waitlist and you'll get early access, your first gram free, and a permanent zero-spread tier on your first ₹50,000 in deposits.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', marginBottom: 8 }}>
                {[
                  { v: '4,218', l: 'On the waitlist' },
                  { v: '142', l: 'Invited this week' },
                  { v: 'Q2 2026', l: 'Public launch' },
                ].map((s) => (
                  <div key={s.l} style={{ borderLeft: '1px solid var(--border)', paddingLeft: 16 }}>
                    <div className="gf-price-num" style={{ fontSize: 22 }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.16em', fontFamily: 'var(--font-mono)', marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — form card */}
          <Reveal delay={200}>
            <div className="gf-card-elev" style={{ padding: 32, position: 'relative', overflow: 'hidden' }}>
              {status !== 'done' ? (
                <form onSubmit={submit}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>Reserve your spot</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>~30 seconds</div>
                  </div>

                  <label style={{ display: 'block', marginBottom: 14 }}>
                    <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-tertiary)', marginBottom: 8 }}>Email</div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="priya@example.com"
                      style={{
                        width: '100%', padding: '14px 16px',
                        background: 'var(--surface-sunken)',
                        border: '1px solid var(--border)',
                        borderRadius: 12,
                        fontSize: 16, color: 'var(--text-primary)',
                        fontFamily: 'var(--font-sans)',
                        transition: 'border-color 150ms',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--gold-bright)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                      required
                    />
                  </label>

                  <label style={{ display: 'block', marginBottom: 18 }}>
                    <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-tertiary)', marginBottom: 8 }}>Mobile · for invite SMS</div>
                    <div style={{ display: 'flex', gap: 0, background: 'var(--surface-sunken)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                      <span style={{ padding: '14px 14px 14px 16px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: 14, borderRight: '1px solid var(--border-subtle)' }}>+91</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, '').slice(0, 10))}
                        placeholder="98765 43210"
                        style={{
                          flex: 1, padding: '14px 16px',
                          fontSize: 16, color: 'var(--text-primary)',
                          fontFamily: 'var(--font-sans)',
                          background: 'transparent',
                        }}
                      />
                    </div>
                  </label>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-tertiary)', marginBottom: 10 }}>I'd primarily use it for</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                      {[
                        { id: 'sip', label: 'Daily / weekly SIP' },
                        { id: 'lump', label: 'Lump-sum savings' },
                        { id: 'gift', label: 'Gifting gold' },
                        { id: 'yield', label: 'Earning yield on gold' },
                      ].map((opt) => (
                        <label key={opt.id} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '10px 14px', borderRadius: 10,
                          border: '1px solid var(--border)',
                          background: 'var(--surface)',
                          fontSize: 13, cursor: 'pointer',
                        }}>
                          <input type="checkbox" name="usecase" style={{ accentColor: 'var(--gold-bright)' }} />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="gf-cta" disabled={status === 'submitting'} style={{ width: '100%', padding: '16px' }}>
                    {status === 'submitting' ? 'Reserving…' : 'Join the waitlist →'}
                  </button>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                    No spam. Unsubscribe anytime. We never share your data.
                  </div>
                </form>
              ) : (
                <div style={{ padding: '12px 0' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 999, background: 'rgba(20,192,136,0.14)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4 10-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h3 className="gf-h3" style={{ marginBottom: 8 }}>You're in.</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 24, lineHeight: 1.55 }}>
                    We'll send your invite to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>. Watch for an SMS from goldfi when your wave opens.
                  </p>
                  <div style={{ background: 'var(--surface-sunken)', border: '1px solid var(--border)', borderRadius: 12, padding: 18, marginBottom: 18 }}>
                    <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-tertiary)', marginBottom: 6 }}>Your spot</div>
                    <div className="gf-price-num" style={{ fontSize: 38 }}>#{position && position.toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Estimated invite · 4–6 weeks</div>
                  </div>
                  <div style={{ padding: 14, borderRadius: 12, border: '1px dashed var(--border-strong)', background: 'rgba(245,184,50,0.06)' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: 'var(--gold-bright)' }}>Skip the line</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>Refer 3 friends and we'll move you to the next wave. Your link: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>goldfi.app/r/PRIYA42</span></div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Trust strip */}
        <div style={{ marginTop: 96, paddingTop: 36, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Backed by ·
          </div>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'center', flex: 1, justifyContent: 'flex-end', fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
            <span>Tether Gold (XAUT)</span>
            <span style={{ color: 'var(--border-strong)' }}>·</span>
            <span>On-chain auditable</span>
            <span style={{ color: 'var(--border-strong)' }}>·</span>
            <span>UPI · NPCI</span>
            <span style={{ color: 'var(--border-strong)' }}>·</span>
            <span>ISO 27001</span>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Waitlist });
