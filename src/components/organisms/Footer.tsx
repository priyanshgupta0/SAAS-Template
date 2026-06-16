import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-lavender-200 bg-lavender-50 py-10 dark:border-lavender-800 dark:bg-gray-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} SaaS Starter. Lavender-powered template.
        </p>
        <div className="flex gap-4 text-sm">
          <Link href="/about" className="text-lavender-600 hover:underline">
            About
          </Link>
          <Link href="/pricing" className="text-lavender-600 hover:underline">
            Pricing
          </Link>
          <Link href="/contact" className="text-lavender-600 hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
