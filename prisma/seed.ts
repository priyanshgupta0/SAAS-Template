import { Prisma, PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function readJson<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'data', 'site', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}

async function main(): Promise<void> {
  const users = [
    { email: 'admin@example.com', name: 'Admin User', role: Role.ADMIN, password: 'Admin123!' },
    { email: 'manager@example.com', name: 'Manager User', role: Role.MANAGER, password: 'Manager123!' },
    { email: 'user@example.com', name: 'Regular User', role: Role.USER, password: 'User1234!' },
  ];

  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 12);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.name,
        role: user.role,
        passwordHash,
      },
    });
  }

  const pricing = readJson<{ plans: Array<Record<string, unknown>> }>('pricing.json');
  for (const plan of pricing.plans) {
    await prisma.pricingPlan.upsert({
      where: { slug: plan.slug as string },
      update: {},
      create: {
        slug: plan.slug as string,
        name: plan.name as string,
        priceCents: plan.priceCents as number,
        currency: plan.currency as string,
        billingPeriod: plan.billingPeriod as string,
        features: plan.features as string[],
        highlighted: (plan.highlighted as boolean) ?? false,
        sortOrder: (plan.sortOrder as number) ?? 0,
      },
    });
  }

  const team = readJson<{ members: Array<Record<string, unknown>> }>('team.json');
  await prisma.teamMember.deleteMany();
  for (const member of team.members) {
    await prisma.teamMember.create({
      data: {
        name: member.name as string,
        title: member.title as string,
        bio: member.bio as string,
        avatarUrl: member.avatarUrl as string,
        linkedIn: member.linkedIn as string | undefined,
        twitter: member.twitter as string | undefined,
        sortOrder: (member.sortOrder as number) ?? 0,
      },
    });
  }

  const careers = readJson<{ openings: Array<Record<string, unknown>> }>('careers.json');
  await prisma.careerOpening.deleteMany();
  for (const opening of careers.openings) {
    await prisma.careerOpening.create({
      data: {
        title: opening.title as string,
        department: opening.department as string,
        location: opening.location as string,
        description: opening.description as string,
      },
    });
  }

  const sections = ['landing.json', 'about.json', 'live.json'] as const;
  for (const file of sections) {
    const page = file.replace('.json', '');
    const payload = readJson<Record<string, unknown>>(file);
    const jsonPayload = payload as Prisma.InputJsonValue;
    await prisma.siteSection.upsert({
      where: { key: `${page}.content` },
      update: { payload: jsonPayload },
      create: { key: `${page}.content`, page, payload: jsonPayload },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
