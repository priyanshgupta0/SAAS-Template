import type { CareerOpening } from '@/types/content';

interface CareerCardProps {
  opening: CareerOpening;
}

export function CareerCard({ opening }: CareerCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
      <h3 className="text-lg font-semibold">{opening.title}</h3>
      <p className="mt-1 text-sm text-lavender-600 dark:text-lavender-400">
        {opening.department} · {opening.location}
      </p>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{opening.description}</p>
    </article>
  );
}
