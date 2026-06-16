import { PricingCard } from '@/components/molecules/PricingCard';
import { getPricingPlans } from '@/services/server/contentService';

export async function PricingPage() {
  const plans = await getPricingPlans();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-center text-4xl font-bold">Pricing</h1>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
        Simple, transparent plans for every stage.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}
