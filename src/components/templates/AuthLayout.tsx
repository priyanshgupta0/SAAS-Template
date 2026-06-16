import type { ReactNode } from 'react';
import { Logo } from '@/components/atoms/Logo';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-lavender-50 dark:bg-gray-950">
      <div className="flex items-center justify-between px-4 py-4">
        <Logo />
        <ThemeToggle />
      </div>
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-lavender-200 bg-white p-8 dark:border-lavender-800 dark:bg-gray-900">
          <h1 className="mb-6 text-2xl font-bold">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
