import React from 'react';

import { TopNav, PriceStrip, Footer } from '../components/chrome';
import { HeroEditorial } from '../features/landing/heroes';
import { HowItWorks, SecuritySection, AppShowcase } from '../features/landing/sections';
import { AutoSave, FAQ } from '../features/landing/auto-save-faq';
import { Waitlist } from '../features/waitlist/Waitlist';
import TermsPage from '../routes/legal/TermsPage';
import PrivacyPage from '../routes/legal/PrivacyPage';

function Landing() {
  const onLaunch = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div data-screen-label="Landing · Gold.Fi" style={{ minHeight: '100vh' }}>
      <TopNav onLaunch={onLaunch} />
      <HeroEditorial onLaunch={onLaunch} />
      {/* <PriceStrip />*/}
      <HowItWorks />
      <SecuritySection />
      <AppShowcase />
      <AutoSave />
      <FAQ />
      <Waitlist />
      <Footer />
    </div>
  );
}

function LegalRoute({ children }) {
  const onLaunch = () => { window.location.assign('/#waitlist'); };
  return (
    <>
      <TopNav onLaunch={onLaunch} />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/terms') return <LegalRoute><TermsPage /></LegalRoute>;
  if (path === '/privacy') return <LegalRoute><PrivacyPage /></LegalRoute>;
  return <Landing />;
}
