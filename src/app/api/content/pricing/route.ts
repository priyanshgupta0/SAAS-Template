import { NextResponse } from 'next/server';
import { getPricingPlans } from '@/services/server/contentService';

export async function GET() {
  const plans = await getPricingPlans();
  return NextResponse.json(plans);
}
