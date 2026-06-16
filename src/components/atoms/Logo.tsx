import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-lavender-700 dark:text-lavender-300">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lavender-600 text-white">
        S
      </span>
      <span className="hidden sm:inline">SaaS Starter</span>
    </Link>
  );
}
