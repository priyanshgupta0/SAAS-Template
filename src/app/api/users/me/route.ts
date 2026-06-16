import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/apiAuth';
import { prisma } from '@/lib/prisma';
import { toUserPublic } from '@/lib/userMapper';
import type { UpdateUserRequest } from '@/types/user';

export async function GET() {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: 'unauthorized', message: 'Not authenticated' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: 'not_found', message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(toUserPublic(user));
}

export async function PATCH(request: Request) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: 'unauthorized', message: 'Not authenticated' }, { status: 401 });
  }

  const body = (await request.json()) as UpdateUserRequest;
  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { name: body.name, theme: body.theme },
  });

  return NextResponse.json(toUserPublic(user));
}
