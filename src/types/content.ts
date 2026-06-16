export interface PricingPlan {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  currency: string;
  billingPeriod: string;
  features: string[];
  highlighted: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio?: string | null;
  avatarUrl?: string | null;
  linkedIn?: string | null;
  twitter?: string | null;
}

export interface CareerOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  postedAt: string;
}

export interface SiteSection {
  key: string;
  page: string;
  payload: Record<string, unknown>;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export interface ContactSubmission extends ContactRequest {
  id: string;
  status: string;
  createdAt: string;
}
