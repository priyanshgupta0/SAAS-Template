'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: string;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${active ? 'text-lavender-600 dark:text-lavender-400' : 'text-gray-600 hover:text-lavender-600 dark:text-gray-300 dark:hover:text-lavender-400'}`}
    >
      {children}
    </Link>
  );
}
