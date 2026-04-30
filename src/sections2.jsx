import React from 'react';
import { Sparkline, Reveal } from './primitives';

// Remaining sections: Auto-Save (was IRA), FAQ

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

