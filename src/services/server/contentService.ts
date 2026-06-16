import { prisma } from '@/lib/prisma';
import { loadSiteJson } from '@/lib/contentLoader';
import type { PricingPlan, TeamMember, CareerOpening, SiteSection } from '@/types/content';

export async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const plans = await prisma.pricingPlan.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (plans.length > 0) {
      return plans.map((plan) => ({
        ...plan,
        features: plan.features as string[],
      }));
    }
  } catch {
    /* fallback to fixtures */
  }
  const json = loadSiteJson<{ plans: Omit<PricingPlan, 'id'>[] }>('pricing.json');
  return json.plans.map((plan, index) => ({
    id: `fixture-${index}`,
    ...plan,
  }));
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const members = await prisma.teamMember.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (members.length > 0) return members;
  } catch {
    /* fallback */
  }
  const json = loadSiteJson<{ members: Omit<TeamMember, 'id'>[] }>('team.json');
  return json.members.map((member, index) => ({ id: `fixture-${index}`, ...member }));
}

export async function getCareerOpenings(): Promise<CareerOpening[]> {
  try {
    const openings = await prisma.careerOpening.findMany({
      where: { active: true },
      orderBy: { postedAt: 'desc' },
    });
    if (openings.length > 0) {
      return openings.map((o) => ({ ...o, postedAt: o.postedAt.toISOString() }));
    }
  } catch {
    /* fallback */
  }
  const json = loadSiteJson<{ openings: Omit<CareerOpening, 'id' | 'postedAt'>[] }>('careers.json');
  return json.openings.map((opening, index) => ({
    id: `fixture-${index}`,
    postedAt: new Date().toISOString(),
    ...opening,
  }));
}

export async function getSiteSection(key: string): Promise<SiteSection | null> {
  const section = await prisma.siteSection.findUnique({ where: { key } });
  if (section) {
    return { key: section.key, page: section.page, payload: section.payload as Record<string, unknown> };
  }
  return null;
}

export function getSiteSectionFromJson(page: string): Record<string, unknown> {
  return loadSiteJson<Record<string, unknown>>(`${page}.json`);
}
