import Link from 'next/link';
import { Button } from '@/components/atoms/Button';

export function CtaSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl rounded-2xl bg-lavender-600 px-6 py-12 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to launch your SaaS?</h2>
        <p className="mt-3 text-lavender-100">Start with our template and ship in days, not months.</p>
        <Link href="/signup" className="mt-6 inline-block">
          <Button variant="secondary">Get Started Free</Button>
        </Link>
      </div>
    </section>
  );
}
