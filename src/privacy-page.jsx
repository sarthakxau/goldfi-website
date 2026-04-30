import { LegalShell, H2, P, Strong, Callout, Table } from './legal';

export default function PrivacyPage() {
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
