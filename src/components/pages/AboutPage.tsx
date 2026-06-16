import { loadSiteJson } from '@/lib/contentLoader';

interface AboutData {
  title: string;
  mission: string;
  values: Array<{ title: string; description: string }>;
}

export function AboutPage() {
  const data = loadSiteJson<AboutData>('about.json');

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{data.mission}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {data.values.map((value) => (
          <article key={value.title} className="rounded-xl border border-lavender-200 p-5 dark:border-lavender-800">
            <h2 className="font-semibold text-lavender-700 dark:text-lavender-300">{value.title}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
