'use client';

import { motion } from 'framer-motion';
import { SvgIcon } from '@/components/atoms/SvgIcon';

interface Stat {
  label: string;
  value: string;
  trend: string;
}

interface LiveStatsSectionProps {
  title: string;
  subtitle: string;
  stats: Stat[];
}

export function LiveStatsSection({ title, subtitle, stats }: LiveStatsSectionProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>
        <SvgIcon
          src="/images/vectors/live-stats.svg"
          alt="Live stats chart"
          width={400}
          height={150}
          className="my-8"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="rounded-xl border border-lavender-200 p-6 dark:border-lavender-800"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-lavender-700 dark:text-lavender-300">
                {stat.value}
              </p>
              <p className="text-xs text-green-600">{stat.trend}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
