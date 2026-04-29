import React from 'react';
import { Sparkline, Reveal } from './primitives';

// Remaining sections: Auto-Save (was IRA), testimonials, FAQ, CTA

export function AutoSave() {
  return (
    <section id="auto-save" style={{ padding: '120px 0', position: 'relative', background: 'var(--bg-elev-1)' }}>
      <div className="gf-grid-bg" />
      <div className="gf-container" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <Reveal><div className="gf-eyebrow" style={{ marginBottom: 20 }}>Auto-save in gold</div></Reveal>
            <Reveal delay={80}><h2 className="gf-h2" style={{ marginBottom: 24 }}>A savings habit<br /><em>that protects itself.</em></h2></Reveal>
            <Reveal delay={160}><p className="gf-lede" style={{ marginBottom: 32 }}>
Set up UPI Autopay once. Save ₹100 a week, ₹500 a month, or whatever fits your salary cycle — instantly converted into 24K gold backed by Tether Gold (XAUT). No lock-in. Withdraw anytime.
            </p></Reveal>
            <Reveal delay={240}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
                {[
                  ['₹100', 'Minimum SIP'],
                  ['0%', 'Setup fee'],
                  ['60s', 'To activate'],
                ].map(([v, l]) => (
                  <div key={l} style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                    <div className="gf-price-num" style={{ fontSize: 28 }}>{v}</div>
                    <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-tertiary)', marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="gf-cta" onClick={() => { const el = document.getElementById('waitlist'); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 24; window.scrollTo({ top, behavior: 'smooth' }); } }}>Join the waitlist →</button>
                <button className="gf-cta-ghost">Calculate returns</button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <AutoSaveCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function AutoSaveCard() {
  // Daily SIP projection ~ ₹100/day, 10 years
  const points = React.useMemo(
    () => Array.from({ length: 30 }, (_, i) => 50 + i * 8 + Math.pow(i, 1.55) * 1.4),
    []
  );
  return (
    <div className="gf-card-elev" style={{ padding: 32, position: 'relative', overflow: 'hidden' }}>
      <div className="gf-guilloche" />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div>
            <div className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>Daily SIP · UPI Autopay</div>
            <div className="font-display" style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em', marginTop: 6 }}>₹100 / day</div>
            <div style={{ fontSize: 13, color: 'var(--success)', fontFamily: 'var(--font-mono)' }}>▲ 0.084 g credited today · 5:31 AM</div>
          </div>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: 'linear-gradient(135deg, var(--cta-1), var(--cta-2), var(--cta-3))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cta-ink)', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600 }}>Au</div>
        </div>

        {/* Sparkline */}
        <div style={{ position: 'relative', height: 130, marginBottom: 18 }}>
          <Sparkline data={points} width={520} height={130} axis />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-tertiary)' }}>Projected · 10y</div>
            <div className="gf-price-num" style={{ fontSize: 30, marginTop: 4, whiteSpace: 'nowrap' }}>₹6,84,290</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-tertiary)' }}>Gain</div>
            <div style={{ fontSize: 18, color: 'var(--success)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>+₹3,19,290</div>
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'grid', gap: 1, background: 'var(--border-subtle)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          {[
            ['MON · 14 OCT', '₹100', '0.084 g', 'UPI · HDFC'],
            ['SUN · 13 OCT', '₹100', '0.085 g', 'UPI · HDFC'],
            ['SAT · 12 OCT', '₹100', '0.083 g', 'UPI · HDFC'],
          ].map(([d, amt, g, src]) => (
            <div key={d} style={{ background: 'var(--surface-elevated)', display: 'grid', gridTemplateColumns: '1.2fr 0.7fr 0.8fr 1fr', gap: 10, padding: '10px 14px', fontSize: 12, alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', fontSize: 11 }}>{d}</span>
              <span style={{ fontWeight: 600 }}>{amt}</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold-bright)' }}>{g}</span>
              <span style={{ textAlign: 'right', fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{src}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const t = [
    { q: '"Finally — gold without the jeweller spread, the making charges, and the locker fees. Bought my first gram in 90 seconds via GPay."', n: 'Arjun M.', r: 'Software engineer, Bengaluru', amt: '4.6 g' },
    { q: '"I save ₹50 every day on autopay. Six months in, my balance has crossed ₹12,000 and I barely notice it leaving my account."', n: 'Priya S.', r: 'Teacher, Pune', amt: '₹12,400' },
    { q: '"I run a kirana store. The round-up feature converts my UPI spare change into gold — feels like I\'m saving for free."', n: 'Rakesh V.', r: 'Shop owner, Indore', amt: '11.2 g' },
  ];
  return (
    <section style={{ padding: '120px 0' }}>
      <div className="gf-container">
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 80, marginBottom: 56 }}>
          <div>
            <Reveal><div className="gf-eyebrow" style={{ marginBottom: 20 }}>Customers</div></Reveal>
            <Reveal delay={80}><h2 className="gf-h2">2,40,000 savers.<br />One thing in <em>common.</em></h2></Reveal>
          </div>
          <Reveal delay={160}><p className="gf-lede" style={{ paddingTop: 40 }}>
            They wanted gold without the friction — without jewellers, making charges, locker fees, or the lingering question of whether their "digital gram" was actually backed by metal.
          </p></Reveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {t.map((x, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="gf-card" style={{ padding: 28, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" style={{ marginBottom: 18 }}>
                  <path d="M0 18V11C0 5.5 3 1.5 8 0L9 3C5.5 4 4 6.5 4 9H8V18H0ZM13 18V11C13 5.5 16 1.5 21 0L22 3C18.5 4 17 6.5 17 9H21V18H13Z" fill="var(--gold-bright)" opacity="0.7" />
                </svg>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.01em', flex: 1, marginBottom: 24 }}>
                  {x.q}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 18, borderTop: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{x.n}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{x.r}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold-bright)', letterSpacing: '0.1em' }}>{x.amt}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const items = [
    ['Is the gold actually mine?', 'Yes. Every gram you save into goldfi is backed one-to-one by Tether Gold (XAUT) — a token where each unit represents one troy ounce of real, allocated 24K bullion. The backing is on-chain auditable, never lent, never pooled. Once you cross 1 tola (~11.66 g) you can redeem 24K coins shipped insured to your door.'],
    ['How is goldfi different from a Gold ETF or Sovereign Gold Bond?', 'ETFs are paper claims managed by a fund house and you cannot redeem the underlying metal. SGBs lock your money in for 8 years. With goldfi you own real 24K gold directly, can sell back to your bank in minutes, send grams to friends over UPI, or redeem as a physical coin.'],
    ['What is XAUT, and do I need to know about crypto?', 'XAUT is Tether Gold — a digital token where each unit is backed one-to-one by a troy ounce of physical 24K gold. It is the settlement layer behind goldfi because it is liquid, transparent, and on-chain auditable 24/7. You never see crypto: you pay over UPI, see grams in the app, and sell back to your bank account in INR.'],
    ['Where is the underlying gold held?', 'The gold backing XAUT is real, allocated 24K bullion verified by Tether on-chain. You can audit XAUT reserves yourself any time on Ethereum or Tron — that is the whole point of the model. No quarterly PDFs, no opaque pooled custody.'],
    ['What are the charges?', 'Live spot price with a transparent buy/sell spread of around 0.5%. Government GST of 3% applies to digital gold purchases, same as buying from a jeweller. No making charges, no wastage, no hidden fees.'],
    ['Can I take physical delivery?', 'Yes, once your holdings cross 1 tola (~11.66 g). We ship 24K coins fully insured with signature on delivery, or you can redeem as jewellery at our partner stores nationwide.'],
    ['Do I need KYC to start?', 'You can sign up with just your phone number to join the waitlist. Full KYC — PAN + DigiLocker — takes under 2 minutes and is required before your first buy. We hold no card or UPI credentials.'],
    ['What if goldfi shuts down?', 'Your gold backing sits in XAUT, an independently issued token whose reserves are not on goldfi\'s balance sheet. In the unlikely event we wind down, your XAUT-backed claim survives and can be redeemed.'],
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section id="learn-faq" style={{ padding: '120px 0', background: 'var(--bg-elev-1)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="gf-container" style={{ maxWidth: 980 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Reveal><div className="gf-eyebrow" style={{ marginBottom: 20, justifyContent: 'center' }}>Frequently asked</div></Reveal>
          <Reveal delay={80}><h2 className="gf-h2">Questions, <em>answered.</em></h2></Reveal>
        </div>
        <div>
          {items.map(([q, a], i) => (
            <Reveal key={i} delay={i * 50}>
              <div style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                  width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
                  textAlign: 'left',
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em', color: open === i ? 'var(--gold-bright)' : 'var(--text-primary)' }}>{q}</span>
                  <span style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--text-secondary)', fontSize: 16, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 200ms' }}>+</span>
                </button>
                <div style={{ maxHeight: open === i ? 240 : 0, overflow: 'hidden', transition: 'max-height 320ms var(--ease-out)' }}>
                  <p style={{ paddingBottom: 24, fontSize: 16, color: 'var(--text-secondary)', maxWidth: '70ch', lineHeight: 1.6 }}>{a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({ onLaunch }) {
  return (
    <section style={{ padding: '140px 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-deep)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 60% at 50% 50%, rgba(245,184,50,0.18) 0%, transparent 70%)' }} />
      <div className="gf-grid-bg" />
      <div className="gf-container" style={{ position: 'relative', textAlign: 'center' }}>
        <Reveal>
          <div className="gf-eyebrow" style={{ marginBottom: 24, justifyContent: 'center' }}>Real gold · Real vaults · Real ownership</div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="gf-h2" style={{ maxWidth: 900, margin: '0 auto 28px', fontSize: 'clamp(40px, 5.5vw, 80px)' }}>
            Buy your first <em>gram</em><br />of gold in 90 seconds.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="gf-lede" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
            Open an account with just your phone number. From ₹10. No paperwork, no jeweller, no making charges.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="gf-cta" onClick={onLaunch} style={{ padding: '16px 28px', fontSize: 16 }}>
              Buy gold with UPI
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L8 3m5 5l-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
            </button>
            <button className="gf-cta-ghost">Download the app</button>
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div style={{ marginTop: 56, display: 'flex', gap: 36, justifyContent: 'center', flexWrap: 'wrap', fontSize: 12, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-tertiary)' }}>
            <span>· 24K MMTC-PAMP</span>
            <span>· BIS hallmarked</span>
            <span>· Insured vault</span>
            <span>· UPI Autopay</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { AutoSave, Testimonials, FAQ, FinalCTA });
