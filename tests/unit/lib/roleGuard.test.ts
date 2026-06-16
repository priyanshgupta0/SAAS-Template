import { canAccessRoute, getDefaultRouteForRole, isRoleAuthorized } from '@/lib/roleGuard';

describe('roleGuard', () => {
  it('returns default routes per role', () => {
    expect(getDefaultRouteForRole('ADMIN')).toBe('/admin');
    expect(getDefaultRouteForRole('MANAGER')).toBe('/manager');
    expect(getDefaultRouteForRole('USER')).toBe('/dashboard');
  });

  it('allows admin all routes', () => {
    expect(canAccessRoute('ADMIN', '/admin/settings')).toBe(true);
  });

  it('blocks user from admin', () => {
    expect(canAccessRoute('USER', '/admin')).toBe(false);
  });

  it('checks role authorization', () => {
    expect(isRoleAuthorized('ADMIN', ['ADMIN', 'MANAGER'])).toBe(true);
    expect(isRoleAuthorized('USER', ['ADMIN'])).toBe(false);
  });
});
