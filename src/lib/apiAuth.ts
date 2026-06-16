import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { Role } from '@/types/user';

export async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  return session;
}

export async function requireRole(roles: Role[]) {
  const session = await requireSession();
  if (!session) return null;
  if (!roles.includes(session.user.role)) return null;
  return session;
}
