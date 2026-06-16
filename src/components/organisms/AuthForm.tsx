'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { apiPost } from '@/lib/apiClient';
import type { RegisterRequest, UserPublic } from '@/types/user';
import { getDefaultRouteForRole } from '@/lib/roleGuard';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const body: RegisterRequest = { email, password, name };
        await apiPost<UserPublic>('/auth/register', body);
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials');
        return;
      }

      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      const role = session?.user?.role ?? 'USER';
      router.push(getDefaultRouteForRole(role));
    } catch {
      setError(mode === 'signup' ? 'Registration failed' : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {mode === 'signup' && (
        <FormField label="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
      )}
      <FormField label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <FormField label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" fullWidth disabled={loading}>
        {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
      </Button>
    </form>
  );
}
