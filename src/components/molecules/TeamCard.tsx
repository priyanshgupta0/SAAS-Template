import Image from 'next/image';
import type { TeamMember } from '@/types/content';

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="rounded-2xl border border-lavender-200 p-6 text-center dark:border-lavender-800">
      {member.avatarUrl && (
        <Image
          src={member.avatarUrl}
          alt={member.name}
          width={80}
          height={80}
          className="mx-auto rounded-full"
        />
      )}
      <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
      <p className="text-sm text-lavender-600 dark:text-lavender-400">{member.title}</p>
      {member.bio && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>}
    </article>
  );
}
