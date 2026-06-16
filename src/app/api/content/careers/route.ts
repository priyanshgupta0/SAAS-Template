import { NextResponse } from 'next/server';
import { getCareerOpenings } from '@/services/server/contentService';

export async function GET() {
  const openings = await getCareerOpenings();
  return NextResponse.json(openings);
}
