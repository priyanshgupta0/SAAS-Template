import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/apiAuth';
import { prisma } from '@/lib/prisma';
import type { ContactRequest } from '@/types/content';
import type { ContactStatus } from '@prisma/client';

export async function POST(request: Request) {
  const body = (await request.json()) as ContactRequest;

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: 'validation', message: 'Missing fields' }, { status: 400 });
  }

  const submission = await prisma.contactSubmission.create({
    data: { name: body.name, email: body.email, message: body.message },
  });

  return NextResponse.json(
    { ...submission, createdAt: submission.createdAt.toISOString() },
    { status: 201 },
  );
}

export async function GET(request: Request) {
  const session = await requireRole(['ADMIN', 'MANAGER']);
  if (!session) {
    return NextResponse.json({ error: 'forbidden', message: 'Insufficient role' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') as ContactStatus | null;

  const submissions = await prisma.contactSubmission.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(
    submissions.map((s) => ({ ...s, createdAt: s.createdAt.toISOString() })),
  );
}
