import { apiGet, apiPut } from '@/lib/apiClient';
import type {
  CareerOpening,
  PricingPlan,
  SiteSection,
  TeamMember,
} from '@/types/content';

export async function fetchPricingPlans(): Promise<PricingPlan[]> {
  return apiGet<PricingPlan[]>('/content/pricing');
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  return apiGet<TeamMember[]>('/content/team');
}

export async function fetchCareerOpenings(): Promise<CareerOpening[]> {
  return apiGet<CareerOpening[]>('/content/careers');
}

export async function fetchSiteSection(key: string): Promise<SiteSection> {
  return apiGet<SiteSection>(`/content/sections/${key}`);
}

export async function updateSiteSection(
  key: string,
  payload: Record<string, unknown>,
): Promise<SiteSection> {
  return apiPut<SiteSection>(`/content/sections/${key}`, { payload });
}
