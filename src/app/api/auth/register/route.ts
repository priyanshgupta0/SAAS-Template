import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { toUserPublic } from '@/lib/userMapper';
import type { RegisterRequest } from '@/types/user';

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 */
export async function POST(request: Request) {
  const body = (await request.json()) as RegisterRequest;

  if (!body.email || !body.password || !body.name) {
    return NextResponse.json({ error: 'validation', message: 'Missing fields' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email: body.email } });
  if (existing) {
    return NextResponse.json({ error: 'conflict', message: 'Email already exists' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(body.password, 12);
  const user = await prisma.user.create({
    data: { email: body.email, name: body.name, passwordHash },
  });

  return NextResponse.json(toUserPublic(user), { status: 201 });
}
