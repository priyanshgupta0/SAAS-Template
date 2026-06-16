import { loadSiteJson } from '@/lib/contentLoader';

describe('contentLoader', () => {
  it('loads pricing fixture', () => {
    const data = loadSiteJson<{ plans: unknown[] }>('pricing.json');
    expect(data.plans.length).toBeGreaterThan(0);
  });
});
