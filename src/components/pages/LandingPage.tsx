import { Hero } from '@/components/organisms/Hero';
import { FeaturesSection } from '@/components/organisms/FeaturesSection';
import { CtaSection } from '@/components/organisms/CtaSection';
import { loadSiteJson } from '@/lib/contentLoader';

interface LandingData {
  hero: { title: string; subtitle: string; ctaPrimary: string; ctaSecondary: string };
  features: Array<{ title: string; description: string }>;
}

export function LandingPage() {
  const data = loadSiteJson<LandingData>('landing.json');

  return (
    <>
      <Hero {...data.hero} />
      <FeaturesSection features={data.features} />
      <CtaSection />
    </>
  );
}
