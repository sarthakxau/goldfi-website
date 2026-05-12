import React from 'react';
import { Sparkline, Reveal, useInView } from '../../components/primitives';

// Remaining sections: Auto-Save, FAQ

const PREFERS_REDUCED_MOTION =
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animate an integer 0 → target on an ease-out curve, once `active` becomes true.
function useCountUp(target, duration = 1800, active = true) {
  const [val, setVal] = React.useState(PREFERS_REDUCED_MOTION ? target : 0);
  React.useEffect(() => {
    if (!active) return;
    if (PREFERS_REDUCED_MOTION) { setVal(target); return; }
    let raf, startT = null;
    const step = (t) => {
      if (startT === null) startT = t;
      const p = Math.min(1, (t - startT) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

export function AutoSave() {
  const onWaitlist = () => { const el = document.getElementById('waitlist'); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 24; window.scrollTo({ top, behavior: 'smooth' }); } };
  return (
    <section id="auto-save" className="gf-section" style={{ position: 'relative', background: 'var(--bg-elev-1)' }}>
      <div className="gf-grid-bg" />
      <div className="gf-container" style={{ position: 'relative' }}>
        <div className="gf-split-even" style={{ alignItems: 'center' }}>
          <div>
            <Reveal><div className="gf-eyebrow" style={{ marginBottom: 20 }}>Auto-save in gold</div></Reveal>
            <Reveal delay={80}><h2 className="gf-h2" style={{ marginBottom: 24 }}>A savings habit<br /><em>that protects itself.</em></h2></Reveal>
            <Reveal delay={160}><p className="gf-lede" style={{ marginBottom: 32 }}>
Set up UPI Autopay once. Save ₹100 a week, ₹500 a month, or whatever fits your salary cycle. Each contribution settles into Tether Gold (XAUT), where each token is backed 1:1 by a troy ounce of LBMA Good Delivery 24K bullion. No lock-in. Withdraw anytime.
            </p></Reveal>
            <Reveal delay={240}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
                {[
                  ['₹100', 'Minimum SIP'],
                  ['0%', 'Setup fee'],
                  ['60s', 'To activate'],
                ].map(([v, l]) => (
                  <div key={l} style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                    <div className="gf-price-num" style={{ fontSize: 'clamp(22px, 6vw, 28px)' }}>{v}</div>
                    <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-tertiary)', marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="gf-cta-stack">
                <button className="gf-cta" onClick={onWaitlist}>Join the waitlist →</button>
                <button className="gf-cta-ghost" disabled style={{ opacity: 0.45, cursor: 'not-allowed' }}>Calculate returns</button>
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

function AutoSaveCard() {
  const points = React.useMemo(
    () => Array.from({ length: 30 }, (_, i) => 50 + i * 8 + Math.pow(i, 1.55) * 1.4),
    []
  );
  const [cardRef, seen] = useInView({ threshold: 0.25 });
  const projected = useCountUp(684290, 1800, seen);
  const gain = useCountUp(319290, 1800, seen);
  return (
    <div ref={cardRef} className="gf-card-elev gf-autosave-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="gf-guilloche" />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 22 }}>
          <div>
            <div className="mono-tag" style={{ color: 'var(--text-tertiary)' }}>Daily SIP · UPI Autopay</div>
            <div className="font-display" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 7vw, 36px)', fontWeight: 400, letterSpacing: '-0.02em', marginTop: 6 }}>₹100 / day</div>
            <div style={{ fontSize: 12.5, color: 'var(--success)', fontFamily: 'var(--font-mono)' }}>▲ 0.084 g credited today · 5:31 AM</div>
          </div>
          <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 12, background: 'linear-gradient(135deg, var(--cta-1), var(--cta-2), var(--cta-3))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cta-ink)', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600 }}>Au</div>
        </div>

        <div style={{ position: 'relative', height: 120, marginBottom: 18 }}>
          <Sparkline data={points} height={120} fluid drawn={seen} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-tertiary)' }}>Projected · 10y</div>
            <div className="gf-price-num" style={{ fontSize: 'clamp(22px, 6vw, 30px)', marginTop: 4, whiteSpace: 'nowrap' }}>₹{projected.toLocaleString('en-IN')}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-tertiary)' }}>Gain</div>
            <div style={{ fontSize: 'clamp(15px, 4vw, 18px)', color: 'var(--success)', fontFamily: 'var(--font-mono)', marginTop: 4, whiteSpace: 'nowrap' }}>+₹{gain.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="gf-autosave-log" style={{ marginTop: 18, display: 'grid', gap: 1, background: 'var(--border-subtle)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          {[
            ['MON · 14 OCT', '₹100', '0.084 g', 'UPI · HDFC'],
            ['SUN · 13 OCT', '₹100', '0.085 g', 'UPI · HDFC'],
            ['SAT · 12 OCT', '₹100', '0.083 g', 'UPI · HDFC'],
          ].map(([d, amt, g, src]) => (
            <div key={d} className="gf-autosave-log-row" style={{ background: 'var(--surface-elevated)', display: 'grid', gap: 10, padding: '10px 14px', fontSize: 12, alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', fontSize: 11 }}>{d}</span>
              <span style={{ fontWeight: 600 }}>{amt}</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold-bright)' }}>{g}</span>
              <span className="gf-autosave-log-src" style={{ textAlign: 'right', fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{src}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const items = [
    ['Is the gold actually mine?', 'Your balance is denominated in Tether Gold (XAUT), held to your account on Ethereum. Each XAUT token is backed 1:1 by a troy ounce of LBMA Good Delivery 24K bullion held by Tether’s London custodian. Your XAUT holdings are publicly verifiable on-chain, and we never lend them. Once you cross 1 tola (~11.66 g) you can redeem 24K coins shipped insured to your door.'],
    ['How is goldfi different from a Gold ETF or Sovereign Gold Bond?', 'Gold ETFsx` are fund-house paper that you can’t redeem for metal. Sovereign Gold Bonds lock you in for 8 years. With goldfi your savings sit in Tether Gold (XAUT), backed 1:1 by allocated LBMA Good Delivery bullion, sellable back to your bank in minutes, gift-able by gram over UPI, and redeemable as a 24K physical coin once your balance crosses 1 tola.'],
    ['What is XAUT, and do I need to know about crypto?', 'XAUT is Tether Gold, a digital token where each unit is backed 1:1 by a troy ounce of LBMA Good Delivery 24K bullion held by Tether’s custodian. We use it as the settlement layer because it is liquid, denominated in a clear unit, and your balance is publicly verifiable on Ethereum. You never have to think about crypto: you pay over UPI, see grams in the app, and sell back to your bank in INR.'],
    ['Where is the underlying gold held?', 'The gold backing XAUT is held by Tether’s London custodian as LBMA Good Delivery 24K bars. Your XAUT balance is visible on Ethereum at any time, and Tether publishes periodic attestations of the physical reserves prepared by a third-party firm.'],
    ['What are the charges and taxes?', 'Live spot price with a transparent buy/sell spread of around 0.5%. GST of 3% applies on each purchase. On sale, 1% TDS is withheld at source under Section 194S of the Income Tax Act, and gains are taxable at 30% under Section 115BBH (digital gold is treated as a Virtual Digital Asset in India). No making charges, no wastage, no hidden platform fees.'],
    ['Can I take physical delivery?', 'Yes, once your holdings cross 1 tola (~11.66 g). We ship 24K coins fully insured with signature on delivery, or you can redeem as jewellery at our partner stores nationwide.'],
    ['Do I need KYC to start?', 'You can sign up with just your phone number to join the waitlist. Full KYC (PAN + DigiLocker) takes under 2 minutes and is required before your first buy. We hold no card or UPI credentials.'],
    ['What if goldfi shuts down?', 'Your gold backing sits in XAUT, an independently issued token whose reserves are not on goldfi\'s balance sheet. In the unlikely event we wind down, your XAUT-backed claim survives and can be redeemed.'],
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section id="learn" className="gf-section" style={{ background: 'var(--bg-elev-1)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="gf-container" style={{ maxWidth: 980 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Reveal><div className="gf-eyebrow" style={{ marginBottom: 20, justifyContent: 'center' }}>Frequently asked</div></Reveal>
          <Reveal delay={80}><h2 className="gf-h2">Questions, <em>answered.</em></h2></Reveal>
        </div>
        <div>
          {items.map(([q, a], i) => (
            <Reveal key={q} delay={i * 50}>
              <div style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                  width: '100%', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                  textAlign: 'left',
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 4.5vw, 22px)', fontWeight: 400, letterSpacing: '-0.01em', color: open === i ? 'var(--gold-bright)' : 'var(--text-primary)' }}>{q}</span>
                  <span style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--text-secondary)', fontSize: 16, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 200ms' }}>+</span>
                </button>
                <div style={{ maxHeight: open === i ? 800 : 0, overflow: 'hidden', transition: 'max-height 360ms var(--ease-out)' }}>
                  <p style={{ paddingBottom: 24, fontSize: 'clamp(14px, 3.6vw, 16px)', color: 'var(--text-secondary)', maxWidth: '70ch', lineHeight: 1.6 }}>{a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
