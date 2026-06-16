import type { User } from '@prisma/client';
import type { UserPublic } from '@/types/user';

export function toUserPublic(user: User): UserPublic {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    theme: user.theme,
    createdAt: user.createdAt.toISOString(),
  };
}
