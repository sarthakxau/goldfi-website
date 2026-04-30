// Shared legal-page layout primitives. Inline styles use the global CSS
// variables defined in styles.css so dual-theme (noir/ivory) works for free.
// Vite's plugin-react uses the automatic JSX runtime, so no React import needed.

function LegalShell({ kind, title, children }) {
  return (
    <main style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', paddingTop: 24 }}>
      <div className="gf-container" style={{ padding: '40px 32px 96px', maxWidth: 880 }}>
        <div style={{ marginBottom: 32 }}>
          <a href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
            ← Back to goldfi
          </a>
        </div>
        <div style={{ marginBottom: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-bright)' }}>
          {kind}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.05, margin: '0 0 12px' }}>
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
  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, lineHeight: 1.2, color: 'var(--text-primary)', margin: '48px 0 16px' }}>{children}</h2>
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
  <div style={{ overflowX: 'auto', margin: '16px 0 24px' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 500 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', verticalAlign: 'top', color: j === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Terms of Service
// ─────────────────────────────────────────────────────────────────────────────

export function TermsPage() {
  return (
    <LegalShell kind="Legal" title="Terms of Service">
      <Callout title="Important Risk Disclosure">
        Crypto products and NFTs are unregulated and can be highly risky. There may be no regulatory recourse for any loss from such transactions. Virtual Digital Assets (“VDAs”) including Tether Gold (XAU₮) are not legal tender, are not backed by the Government of India, and are subject to market volatility, technological risks, and regulatory uncertainty. You may lose some or all of your investment. The goldfi platform is not a bank, financial institution, depository, or custodian within the meaning of any Indian statute.
      </Callout>

      <H2>1. Introduction and Parties</H2>
      <P>1.1 These Terms of Service (“Terms”) constitute a legally binding agreement between you (“User”, “you”, “your”) and the following entities:</P>
      <P><Strong>Bullion Digital (BVI) Ltd</Strong>, a company incorporated under the laws of the British Virgin Islands (“Bullion BVI” or “we” or “us”), which operates the goldfi technology platform, including the mobile application and web interface;</P>
      <P><Strong>[FIU-IND Registered Partner Name]</Strong>, a company incorporated under the laws of India, registered with the Financial Intelligence Unit – India (“FIU-IND”) as a Reporting Entity under the Prevention of Money Laundering Act, 2002 (“PMLA”), which provides Virtual Digital Asset exchange and custody services in India (“Indian Partner”).</P>
      <P>1.2 The goldfi platform (“Platform”) enables Users in India to buy, sell, hold, and redeem digital gold backed by Tether Gold (XAU₮), a Virtual Digital Asset as defined under Section 2(47A) of the Income Tax Act, 1961, read with the Finance Act, 2022.</P>
      <P>1.3 By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms, the <a href="/privacy" style={{ color: 'var(--gold-bright)' }}>Privacy Policy</a>, and any additional terms referenced herein. If you do not agree, you must immediately cease using the Platform.</P>
      <P>1.4 <Strong>Contact Information:</Strong> Bullion Digital (BVI) Ltd, [BVI Registered Address]. Email: help@bulliondigital.io. Indian Partner: [Partner Name], [Indian Address].</P>

      <H2>2. Definitions</H2>
      <P>2.1 <Strong>“Digital Gold”</Strong> means a fractional interest in Tether Gold (XAU₮) tokens, which are Virtual Digital Assets representing ownership claims on physical gold held in custody by TG Commodities Limited, denominated in grams on the Platform.</P>
      <P>2.2 <Strong>“Virtual Digital Asset” or “VDA”</Strong> has the meaning assigned under Section 2(47A) of the Income Tax Act, 1961.</P>
      <P>2.3 <Strong>“Scudo”</Strong> means a unit of account used on the Platform to denominate a User's Digital Gold holdings, where 1 Scudo = [defined gold-equivalent weight]. Scudo is not legal tender, is not a regulated financial instrument, and has no independent value apart from its Digital Gold backing.</P>
      <P>2.4 <Strong>“Wallet”</Strong> means the blockchain-based digital wallet associated with a User's account on the Platform, which stores the User's VDA holdings.</P>

      <H2>3. Eligibility</H2>
      <P>3.1 You must be at least 18 years of age and a resident of India to use the Platform.</P>
      <P>3.2 You must possess a valid Permanent Account Number (“PAN”) issued by the Income Tax Department of India.</P>
      <P>3.3 You must not be a person or entity subject to sanctions under any applicable sanctions regime, including the United Nations Security Council Consolidated List, OFAC SDN List, or any list maintained by the Ministry of Home Affairs, Government of India.</P>
      <P>3.4 You represent and warrant that you are not acting on behalf of any third party, and that all funds used on the Platform are from lawful sources.</P>

      <H2>4. Account Registration and KYC</H2>
      <P>4.1 To use the Platform, you must create an account and complete Know Your Customer (“KYC”) verification as required under the PMLA and rules thereunder. KYC is performed by or on behalf of the Indian Partner as the FIU-IND Reporting Entity.</P>
      <P>4.2 You must provide accurate, current, and complete information, including: full legal name, date of birth, PAN, Aadhaar number (for e-KYC, subject to your consent), residential address with proof, photograph or selfie for liveness verification, and contact information.</P>
      <P>4.3 We and/or the Indian Partner reserve the right to request Enhanced Due Diligence (“EDD”) documentation including source of funds, source of wealth, income tax returns, or bank statements, at any time and without providing reasons.</P>
      <P>4.4 Failure to complete KYC or respond to EDD requests within the timeframe specified may result in account suspension, transaction restrictions, or account closure.</P>
      <P>4.5 The Indian Partner will upload your KYC information to the Central KYC Records Registry (“CKYCR”) as required by RBI and SEBI directives.</P>

      <H2>5. Platform Services</H2>
      <P><Strong>5.1 Buy Digital Gold.</Strong> Users may purchase Digital Gold using Indian Rupees (INR) through the Platform. Purchases are executed at the prevailing real-time market price of gold, inclusive of any applicable spread.</P>
      <P><Strong>5.2 Sell / Redeem Digital Gold.</Strong> Users may sell their Digital Gold holdings for INR or, where available, redeem for physical gold through participating jewelers. Redemption is subject to minimum quantity requirements, delivery charges, making charges, and applicable taxes.</P>
      <P><Strong>5.3 Hold Digital Gold.</Strong> Users may hold Digital Gold in their Wallet. Holdings are denominated in grams, INR, USD, and Scudo. The Platform displays live gold pricing sourced from international spot gold markets.</P>

      <H2>6. Fees and Taxes</H2>
      <Table
        headers={['Fee Type', 'Description', 'Rate']}
        rows={[
          ['Buy Spread', 'Markup on gold purchase price', '[X]%'],
          ['Sell Spread', 'Markdown on gold sale price', '[X]%'],
          ['Platform Fee', 'Service fee on transactions', '[X]%'],
          ['Withdrawal Fee', 'INR withdrawal to bank', '₹[X]'],
          ['Physical Redemption', 'Delivery of physical gold', 'Varies'],
        ]}
      />
      <P><Strong>Tax Obligations (India):</Strong> TDS at the rate of 1% is applicable on the transfer of VDAs under Section 194S. Gains are taxed at 30% under Section 115BBH. GST may apply to service fees. You are solely responsible for determining and fulfilling your tax obligations.</P>

      <H2>7. Risk Disclosures</H2>
      <P>Crypto products and NFTs are unregulated and can be highly risky. There may be no regulatory recourse for any loss from such transactions.</P>
      <P><Strong>7.1 Market Risk.</Strong> The price of gold and VDAs fluctuates and may decline significantly. You may lose the entire value of your investment.</P>
      <P><Strong>7.2 Regulatory Risk.</Strong> VDAs are not regulated by RBI, SEBI, or any other financial regulator in India. The regulatory environment is evolving and may change adversely.</P>
      <P><Strong>7.3 Counterparty Risk.</Strong> Digital Gold is backed by Tether Gold (XAU₮) tokens issued by TG Commodities Limited. We do not guarantee the solvency or performance of TG Commodities Limited.</P>
      <P><Strong>7.4 Technology Risk.</Strong> Blockchain transactions are irreversible. Loss of wallet credentials may result in permanent loss of Digital Gold.</P>
      <P><Strong>7.5 Custody Risk.</Strong> The Platform is not a bank or depository and does not provide deposit insurance.</P>
      <P><Strong>7.6 Liquidity Risk.</Strong> There is no guarantee that you will be able to sell or redeem your Digital Gold at any given time or at a favorable price.</P>
      <P><Strong>7.7 FX Risk.</Strong> Fluctuations in the INR/USD exchange rate affect the INR value of your holdings.</P>

      <H2>8. Prohibited Activities</H2>
      <P>You shall not: use the Platform for money laundering, terrorist financing, or any activity prohibited under the PMLA; provide false KYC information; circumvent foreign exchange controls under FEMA; use automated bots or scrapers; reverse-engineer Platform software; engage in wash trading or market manipulation; transfer your account to any third party; or use the Platform on behalf of any minor.</P>

      <H2>9. Intellectual Property</H2>
      <P>9.1 The Platform, including its source code, design, branding (including the “goldfi” trademarks), and all related intellectual property, is owned by Bullion Digital Corp (Ontario, Canada) and licensed to Bullion BVI. No right, title, or interest is transferred to you.</P>

      <H2>10. Disclaimers and Limitation of Liability</H2>
      <P>The Platform is provided “as is” and “as available.” Bullion BVI, the Indian Partner, and their affiliates disclaim all warranties, express or implied. To the maximum extent permitted by law, neither Bullion BVI nor the Indian Partner shall be liable for any indirect, incidental, special, consequential, or punitive damages. Aggregate liability shall not exceed the total fees paid by you in the twelve (12) months preceding the event giving rise to the claim.</P>

      <H2>11. Indemnification</H2>
      <P>You agree to indemnify, defend, and hold harmless Bullion BVI, the Indian Partner, and their respective directors, officers, employees, agents, and affiliates from and against any claims, damages, losses, liabilities, costs, and expenses arising from your use of the Platform, your breach of these Terms, or your violation of any applicable law.</P>

      <H2>12. Dispute Resolution</H2>
      <P><Strong>12.1 Governing Law:</Strong> Laws of India (for Indian Partner obligations) and laws of the British Virgin Islands (for Bullion BVI obligations).</P>
      <P><Strong>12.2 Grievance Redressal:</Strong> Contact the Grievance Officer at help@bulliondigital.io. 48 hours acknowledgment; 30 days resolution.</P>
      <P><Strong>12.3 Arbitration:</Strong> Under the Arbitration and Conciliation Act, 1996. Seat: Mumbai, India. Language: English. Sole arbitrator.</P>

      <H2>13. Suspension and Termination</H2>
      <P>We may suspend or terminate your account for breach, legal requirement, suspected fraud, KYC failure, or with 30 days' notice. Upon termination, you must withdraw holdings within 30 days.</P>

      <H2>14. Regulatory Status</H2>
      <P>Bullion BVI is not registered with any Indian regulatory body and does not directly provide financial services in India. The Indian Partner is registered with FIU-IND. Neither entity is a bank, NBFC, payment system operator, depository, or custodian under any Indian statute.</P>

      <H2>15. Advertising Disclaimer (ASCI Compliance)</H2>
      <P>Crypto products and NFTs are unregulated and can be highly risky. There may be no regulatory recourse for any loss from such transactions. This disclaimer is made pursuant to ASCI guidelines for Virtual Digital Assets, effective 1 April 2022.</P>

      <H2>16. Modifications</H2>
      <P>We may modify these Terms at any time. Material changes will be notified at least 15 days before becoming effective. Continued use constitutes acceptance.</P>

      <H2>17. Miscellaneous</H2>
      <P>These Terms, together with the Privacy Policy and any other terms referenced herein, constitute the entire agreement. If any provision is held invalid, the remaining provisions continue. Failure to enforce any right is not a waiver. You may not assign your rights. These Terms are provided in English.</P>
    </LegalShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Privacy Policy
// ─────────────────────────────────────────────────────────────────────────────

export function PrivacyPage() {
  return (
    <LegalShell kind="Legal" title="Privacy Policy">
      <H2>1. Introduction</H2>
      <P>1.1 This Privacy Policy (“Policy”) describes how Bullion Digital (BVI) Ltd (“Bullion BVI”) and [FIU-IND Registered Partner Name] (“Indian Partner”) (collectively, “we”, “us”, “our”) collect, use, store, share, and protect your personal data when you use the goldfi platform (“Platform”).</P>
      <P>1.2 This Policy is issued in compliance with the Digital Personal Data Protection Act, 2023 (“DPDPA”), the Information Technology Act, 2000 (“IT Act”), the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (“SPDI Rules”), and the Prevention of Money Laundering Act, 2002 (“PMLA”).</P>
      <P>1.3 By using the Platform, you consent to the collection and processing of your personal data as described in this Policy.</P>

      <H2>2. Data Fiduciary Information</H2>
      <P>Under the DPDPA, the Data Fiduciary for the processing of your personal data is:</P>
      <ul style={{ paddingLeft: 20, margin: '0 0 16px' }}>
        <li style={{ marginBottom: 6 }}><Strong>For Platform operations:</Strong> Bullion Digital (BVI) Ltd. Email: help@bulliondigital.io</li>
        <li style={{ marginBottom: 6 }}><Strong>For KYC and regulatory compliance:</Strong> [Indian Partner Name]</li>
        <li><Strong>Data Protection Officer:</Strong> Email: help@bulliondigital.io</li>
      </ul>

      <H2>3. Personal Data We Collect</H2>
      <P><Strong>3.1 Data You Provide</Strong></P>
      <Table
        headers={['Category', 'Data Elements', 'Purpose']}
        rows={[
          ['Identity Data', 'Full name, DOB, gender, nationality, photograph', 'KYC verification'],
          ['Government ID', 'PAN, Aadhaar, voter ID, passport', 'PMLA compliance'],
          ['Contact Data', 'Email, mobile, address', 'Communications'],
          ['Financial Data', 'Bank account, UPI ID', 'Deposits & withdrawals'],
          ['Source of Funds', 'ITR, salary slips, bank statements', 'Enhanced Due Diligence'],
        ]}
      />
      <P><Strong>3.2 Data We Collect Automatically</Strong></P>
      <Table
        headers={['Category', 'Data Elements', 'Purpose']}
        rows={[
          ['Device Data', 'Device type, OS, unique ID, IP', 'Security, fraud prevention'],
          ['Usage Data', 'Pages viewed, features used', 'Analytics'],
          ['Location Data', 'Approximate geolocation (IP)', 'Regulatory compliance'],
          ['Blockchain Data', 'Wallet addresses, tx hashes', 'AML monitoring'],
        ]}
      />
      <P><Strong>3.3 Data from Third Parties:</Strong> KYC verification providers, CKYCR data, blockchain analytics providers, payment service providers, and credit bureaus (where applicable).</P>

      <H2>4. Purpose of Processing</H2>
      <Table
        headers={['Purpose', 'Legal Basis']}
        rows={[
          ['Account creation and KYC', 'Legal obligation (PMLA); Consent (DPDPA)'],
          ['Transaction processing', 'Contract performance; Legal obligation'],
          ['AML/CFT monitoring', 'Legal obligation (PMLA, IT Act)'],
          ['Tax compliance (TDS)', 'Legal obligation (Income Tax Act)'],
          ['FIU-IND reporting', 'Legal obligation (PMLA)'],
          ['Customer support', 'Legitimate interest; Consent'],
          ['Platform improvement', 'Legitimate interest; Consent'],
          ['Marketing communications', 'Consent (opt-in)'],
        ]}
      />

      <H2>5. Data Sharing and Transfers</H2>
      <P><Strong>5.1</Strong> Your personal data is shared between Bullion BVI and the Indian Partner under a data processing agreement.</P>
      <P><Strong>5.2 Third-Party Sharing:</Strong> KYC providers (Persona/Onfido), blockchain analytics (Chainalysis), payment processors, cloud infrastructure (AWS/GCP), FIU-IND, Income Tax Department, CKYCR, and law enforcement as legally required.</P>
      <P><Strong>5.3 Cross-Border Transfers:</Strong> Data is transferred to the British Virgin Islands and may be processed on servers in the US, EU, and Singapore, in compliance with Section 16 of the DPDPA, 2023. Appropriate safeguards including encryption and contractual clauses are implemented.</P>

      <H2>6. Data Retention</H2>
      <Table
        headers={['Data Type', 'Retention Period', 'Legal Basis']}
        rows={[
          ['KYC / Identity', '5 years after account closure', 'PMLA Rule 9'],
          ['Transaction Records', '5 years after closure', 'PMLA; IT Act'],
          ['Tax Records (TDS)', '8 years from assessment year', 'Income Tax Act'],
          ['Blockchain Data', 'Permanent (on-chain)', 'Nature of blockchain'],
          ['Communication Logs', '3 years', 'Customer service'],
          ['Usage / Analytics', '2 years (anonymized after)', 'Legitimate interest'],
        ]}
      />

      <H2>7. Data Security</H2>
      <P>We implement reasonable security practices including:</P>
      <ul style={{ paddingLeft: 20, margin: '0 0 16px' }}>
        <li style={{ marginBottom: 6 }}>AES-256 encryption at rest</li>
        <li style={{ marginBottom: 6 }}>TLS 1.3 encryption in transit</li>
        <li style={{ marginBottom: 6 }}>Multi-factor authentication</li>
        <li style={{ marginBottom: 6 }}>Role-based access controls with audit logging</li>
        <li style={{ marginBottom: 6 }}>Regular vulnerability assessments and penetration testing</li>
        <li style={{ marginBottom: 6 }}>72-hour breach notification to affected users and authorities</li>
        <li>ISO 27001-aligned information security management</li>
      </ul>
      <P>No security system is impenetrable. We cannot guarantee the absolute security of your data.</P>

      <H2>8. Your Rights</H2>
      <P>Under the DPDPA, 2023:</P>
      <P><Strong>8.1 Right to Access:</Strong> Request a summary of your personal data and processing activities.</P>
      <P><Strong>8.2 Right to Correction:</Strong> Request correction, completion, or updating of inaccurate data.</P>
      <P><Strong>8.3 Right to Erasure:</Strong> Request erasure of data no longer necessary for its purpose, subject to legal retention obligations.</P>
      <P><Strong>8.4 Right to Withdraw Consent:</Strong> Withdraw consent at any time. Note: withdrawing KYC consent will result in account suspension.</P>
      <P><Strong>8.5 Right to Nominate:</Strong> Nominate another individual to exercise your rights in the event of death or incapacity.</P>
      <P><Strong>8.6 Right to Grievance Redressal:</Strong> File complaints with us or the Data Protection Board of India.</P>
      <P>To exercise your rights, contact: <Strong>help@bulliondigital.io</Strong>. We will respond within 30 days.</P>

      <H2>9. Children's Data</H2>
      <P>The Platform is not intended for individuals under 18. We do not knowingly collect data from children. Contact help@bulliondigital.io if you believe a child has provided data to us.</P>

      <H2>10. Cookies and Tracking</H2>
      <P>The Platform uses essential cookies for session management. Analytics cookies are deployed only with consent. The mobile app uses equivalent local storage. You may manage preferences in browser settings.</P>

      <H2>11. Grievance Officer</H2>
      <P><Strong>Email:</Strong> help@bulliondigital.io</P>
      <P>Complaints acknowledged within 48 hours, resolved within 30 days.</P>

      <H2>12. Changes to This Policy</H2>
      <P>Material changes will be notified at least 15 days before becoming effective via email or in-app notification.</P>

      <H2>13. Contact Us</H2>
      <P>Email: <Strong>help@bulliondigital.io</Strong></P>
    </LegalShell>
  );
}
