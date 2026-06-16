import type { PricingPlan } from '@/types/content';
import { Button } from '@/components/atoms/Button';

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  const price = (plan.priceCents / 100).toFixed(0);

  return (
    <article
      className={`flex flex-col rounded-2xl border p-6 ${plan.highlighted ? 'border-lavender-500 bg-lavender-50 dark:bg-lavender-950' : 'border-gray-200 dark:border-gray-700'}`}
    >
      {plan.highlighted && (
        <span className="mb-2 text-xs font-semibold uppercase text-lavender-600">Popular</span>
      )}
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <p className="mt-2 text-3xl font-bold text-lavender-700 dark:text-lavender-300">
        ${price}
        <span className="text-sm font-normal text-gray-500">/{plan.billingPeriod}</span>
      </p>
      <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
        {plan.features.map((feature) => (
          <li key={feature}>✓ {feature}</li>
        ))}
      </ul>
      <Button className="mt-6" fullWidth>
        Choose {plan.name}
      </Button>
    </article>
  );
}
