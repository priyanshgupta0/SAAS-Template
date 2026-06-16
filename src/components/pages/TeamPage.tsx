import { TeamCard } from '@/components/molecules/TeamCard';
import { getTeamMembers } from '@/services/server/contentService';

export async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-center text-4xl font-bold">Our Team</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
