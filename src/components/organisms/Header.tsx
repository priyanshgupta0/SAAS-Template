import Link from 'next/link';
import { Logo } from '@/components/atoms/Logo';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { NavLink } from '@/components/molecules/NavLink';
import { MobileMenu } from '@/components/molecules/MobileMenu';
import { Button } from '@/components/atoms/Button';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/team', label: 'Team' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
  { href: '/live', label: 'Live' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-lavender-200 bg-white/80 backdrop-blur dark:border-lavender-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup" className="hidden sm:block">
            <Button>Sign Up</Button>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
