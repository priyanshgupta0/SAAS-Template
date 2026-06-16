import { apiGet, apiPost } from '@/lib/apiClient';
import type { RegisterRequest, SessionResponse, UserPublic } from '@/types/user';

export async function registerUser(body: RegisterRequest): Promise<UserPublic> {
  return apiPost<UserPublic>('/auth/register', body);
}

export async function getSession(): Promise<SessionResponse> {
  return apiGet<SessionResponse>('/auth/session');
}
