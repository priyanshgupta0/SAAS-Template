import { NextResponse } from 'next/server';
import { getTeamMembers } from '@/services/server/contentService';

export async function GET() {
  const members = await getTeamMembers();
  return NextResponse.json(members);
}
