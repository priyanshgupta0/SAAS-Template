'use client';

import { useState } from 'react';
import { NavLink } from '@/components/molecules/NavLink';
import { Button } from '@/components/atoms/Button';

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/team', label: 'Team' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
  { href: '/live', label: 'Live' },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button type="button" variant="ghost" aria-label="Menu" onClick={() => setOpen(!open)}>
        Menu
      </Button>
      {open && (
        <nav className="absolute left-0 right-0 top-16 z-50 flex flex-col gap-3 border-b border-lavender-200 bg-white p-4 dark:border-lavender-800 dark:bg-gray-950">
          {LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
