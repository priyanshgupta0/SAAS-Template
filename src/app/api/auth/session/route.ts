import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/apiAuth';
import { prisma } from '@/lib/prisma';
import { toUserPublic } from '@/lib/userMapper';

/**
 * @swagger
 * /api/auth/session:
 *   get:
 *     summary: Get current session
 *     tags: [Auth]
 */
export async function GET() {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, user: toUserPublic(user) });
}
