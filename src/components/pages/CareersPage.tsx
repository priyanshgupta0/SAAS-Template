import { CareerCard } from '@/components/molecules/CareerCard';
import { getCareerOpenings } from '@/services/server/contentService';

export async function CareersPage() {
  const openings = await getCareerOpenings();

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold">Careers</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Join us and build the future of SaaS.</p>
      <div className="mt-8 space-y-4">
        {openings.map((opening) => (
          <CareerCard key={opening.id} opening={opening} />
        ))}
      </div>
    </section>
  );
}
