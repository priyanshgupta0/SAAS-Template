import { apiGet, apiPatch } from '@/lib/apiClient';
import type { UpdateRoleRequest, UpdateUserRequest, UserPublic } from '@/types/user';

export async function getCurrentUser(): Promise<UserPublic> {
  return apiGet<UserPublic>('/users/me');
}

export async function updateCurrentUser(body: UpdateUserRequest): Promise<UserPublic> {
  return apiPatch<UserPublic>('/users/me', body);
}

export async function updateUserRole(userId: string, body: UpdateRoleRequest): Promise<UserPublic> {
  return apiPatch<UserPublic>(`/users/${userId}/role`, body);
}
