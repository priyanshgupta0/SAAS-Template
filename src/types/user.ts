export type Role = 'ADMIN' | 'MANAGER' | 'USER';

export interface UserPublic {
  id: string;
  email: string;
  name: string;
  role: Role;
  theme: string;
  createdAt: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserRequest {
  name?: string;
  theme?: 'light' | 'dark' | 'system';
}

export interface UpdateRoleRequest {
  role: Role;
}

export interface SessionResponse {
  authenticated: boolean;
  user?: UserPublic;
}
