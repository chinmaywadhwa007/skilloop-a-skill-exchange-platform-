import { PrismaClient, CategoryName } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const passwordHash = await bcrypt.hash('Password123', 12);

  // --- Admin ---
  const admin = await prisma.user.upsert({
    where: { email: 'admin@skilloop.dev' },
    update: {},
    create: {
      name: 'SkillLoop Admin',
      username: 'admin',
      email: 'admin@skilloop.dev',
      password: passwordHash,
      role: 'ADMIN',
      isVerified: true,
    },
  });

  // --- Sample Creator ---
  const creator = await prisma.user.upsert({
    where: { email: 'creator@skilloop.dev' },
    update: {},
    create: {
      name: 'Chinmay Wadhwa',
      username: 'chinmay_dev',
      email: 'creator@skilloop.dev',
      password: passwordHash,
      role: 'CREATOR',
      isVerified: true,
      creatorProfile: {
        create: {
          headline: 'Full Stack Developer | MERN & Next.js',
          experience: '1+ years building production web apps',
          skills: ['React', 'Node.js', 'MongoDB', 'PostgreSQL'],
        },
      },
    },
  });

  // --- Sample Learner ---
  const learner = await prisma.user.upsert({
    where: { email: 'learner@skilloop.dev' },
    update: {},
    create: {
      name: 'Sample Learner',
      username: 'sample_learner',
      email: 'learner@skilloop.dev',
      password: passwordHash,
      role: 'LEARNER',
      isVerified: true,
      learnerProfile: {
        create: {
          interests: ['Web Development', 'AI'],
          learningGoals: ['Land a full stack developer role'],
        },
      },
    },
  });

  // --- Categories ---
  const categories: { name: CategoryName; slug: string }[] = [
    { name: 'PROGRAMMING', slug: 'programming' },
    { name: 'DESIGN', slug: 'design' },
    { name: 'MARKETING', slug: 'marketing' },
    { name: 'FINANCE', slug: 'finance' },
    { name: 'LANGUAGE', slug: 'language' },
    { name: 'MUSIC', slug: 'music' },
    { name: 'PHOTOGRAPHY', slug: 'photography' },
    { name: 'BUSINESS', slug: 'business' },
    { name: 'OTHERS', slug: 'others' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log('✅ Seed complete:', { admin: admin.email, creator: creator.email, learner: learner.email });
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
