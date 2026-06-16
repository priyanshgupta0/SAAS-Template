'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/Button';
import { SvgIcon } from '@/components/atoms/SvgIcon';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export function Hero({ title, subtitle, ctaPrimary, ctaSecondary }: HeroProps) {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/signup">
            <Button>{ctaPrimary}</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="secondary">{ctaSecondary}</Button>
          </Link>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <SvgIcon src="/images/vectors/hero.svg" alt="Hero illustration" />
      </motion.div>
    </section>
  );
}
