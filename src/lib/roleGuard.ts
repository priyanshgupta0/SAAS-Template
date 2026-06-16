import type { Role } from '@/types/user';

const ROLE_ROUTES: Record<Role, string[]> = {
  ADMIN: ['/admin', '/api/admin'],
  MANAGER: ['/manager', '/api/manager'],
  USER: ['/dashboard', '/api/user'],
};

export function getDefaultRouteForRole(role: Role): string {
  const map: Record<Role, string> = {
    ADMIN: '/admin',
    MANAGER: '/manager',
    USER: '/dashboard',
  };
  return map[role];
}

export function canAccessRoute(role: Role, pathname: string): boolean {
  if (role === 'ADMIN') return true;
  const allowed = ROLE_ROUTES[role];
  return allowed.some((prefix) => pathname.startsWith(prefix));
}

export function isRoleAuthorized(
  userRole: Role,
  requiredRoles: Role[],
): boolean {
  return requiredRoles.includes(userRole);
}
