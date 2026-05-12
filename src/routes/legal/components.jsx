// Shared legal-page layout primitives. Inline styles use the global CSS
// variables defined in styles.css so dual-theme (noir/ivory) works for free.
// Vite's plugin-react uses the automatic JSX runtime, so no React import needed.

function LegalShell({ kind, title, children }) {
  return (
    <main style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', paddingTop: 24 }}>
      <div className="gf-container gf-legal-shell" style={{ maxWidth: 880 }}>
        <div style={{ marginBottom: 32 }}>
          <a href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
            ← Back to goldfi
          </a>
        </div>
        <div style={{ marginBottom: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-bright)' }}>
          {kind}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 56px)', lineHeight: 1.05, margin: '0 0 12px' }}>
          {title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 8 }}>goldfi platform, India</p>
        <p style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', marginBottom: 56 }}>
          Effective Date: 30 April 2026 &nbsp;·&nbsp; Last Updated: April 2026
        </p>
        <div style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          {children}
        </div>
      </div>
    </main>
  );
}

const H2 = ({ children }) => (
  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 4.5vw, 26px)', lineHeight: 1.25, color: 'var(--text-primary)', margin: '40px 0 16px' }}>{children}</h2>
);

const P = ({ children, ...rest }) => (
  <p style={{ margin: '0 0 14px' }} {...rest}>{children}</p>
);

const Strong = ({ children }) => (
  <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{children}</strong>
);

const Callout = ({ tone = 'warn', title, children }) => (
  <div style={{
    margin: '24px 0',
    padding: '18px 20px',
    borderRadius: 10,
    border: `1px solid ${tone === 'warn' ? 'var(--gold-bright)' : 'var(--border-subtle)'}`,
    background: tone === 'warn' ? 'color-mix(in oklab, var(--gold-bright) 8%, transparent)' : 'var(--surface-sunken)',
  }}>
    {title && (
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-bright)', marginBottom: 8 }}>
        {title}
      </div>
    )}
    <div style={{ color: 'var(--text-primary)', fontSize: 14.5, lineHeight: 1.65 }}>{children}</div>
  </div>
);

const Table = ({ headers, rows }) => (
  <div style={{ overflowX: 'auto', margin: '16px 0 24px', WebkitOverflowScrolling: 'touch' }}>
    <table style={{ width: '100%', minWidth: 440, borderCollapse: 'collapse', fontSize: 14 }}>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 500 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]}>
            {row.map((cell, j) => (
              <td key={cell} style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', verticalAlign: 'top', color: j === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export { LegalShell, H2, P, Strong, Callout, Table };
