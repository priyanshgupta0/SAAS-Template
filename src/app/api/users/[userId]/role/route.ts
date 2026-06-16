import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/apiAuth';
import { prisma } from '@/lib/prisma';
import { toUserPublic } from '@/lib/userMapper';
import type { UpdateRoleRequest } from '@/types/user';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const session = await requireRole(['ADMIN']);
  if (!session) {
    return NextResponse.json({ error: 'forbidden', message: 'Admin only' }, { status: 403 });
  }

  const { userId } = await params;
  const body = (await request.json()) as UpdateRoleRequest;

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role: body.role },
  });

  return NextResponse.json(toUserPublic(user));
}
