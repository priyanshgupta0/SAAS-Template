'use client';

import { motion } from 'framer-motion';
import { SvgIcon } from '@/components/atoms/SvgIcon';

interface Feature {
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section className="bg-lavender-50 py-16 dark:bg-lavender-950/30">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">Why choose us</h2>
          <SvgIcon
            src="/images/vectors/features.svg"
            alt="Features"
            width={300}
            height={120}
            className="mx-auto mt-6"
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-lavender-200 bg-white p-6 dark:border-lavender-800 dark:bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-lavender-700 dark:text-lavender-300">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
