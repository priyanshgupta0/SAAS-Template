import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/apiAuth';
import { prisma } from '@/lib/prisma';
import { getSiteSection, getSiteSectionFromJson } from '@/services/server/contentService';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  const section = await getSiteSection(key);

  if (section) {
    return NextResponse.json(section);
  }

  const page = key.split('.')[0];
  try {
    const payload = getSiteSectionFromJson(page);
    return NextResponse.json({ key, page, payload });
  } catch {
    return NextResponse.json({ error: 'not_found', message: 'Section not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const session = await requireRole(['ADMIN']);
  if (!session) {
    return NextResponse.json({ error: 'forbidden', message: 'Admin only' }, { status: 403 });
  }

  const { key } = await params;
  const body = await request.json();
  const page = key.split('.')[0] ?? 'landing';

  const section = await prisma.siteSection.upsert({
    where: { key },
    update: { payload: body.payload, updatedById: session.user.id },
    create: { key, page, payload: body.payload, updatedById: session.user.id },
  });

  return NextResponse.json({
    key: section.key,
    page: section.page,
    payload: section.payload as Record<string, unknown>,
  });
}
