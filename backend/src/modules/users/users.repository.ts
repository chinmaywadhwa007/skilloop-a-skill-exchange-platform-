import { prisma } from '../../config/database.js';
import type { Prisma, Role } from '@prisma/client';

const publicUserSelect = {
  id: true,
  name: true,
  username: true,
  email: true,
  phone: true,
  avatar: true,
  bio: true,
  role: true,
  isVerified: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  creatorProfile: true,
  learnerProfile: true,
} satisfies Prisma.UserSelect;

export const UsersRepository = {
  findById(id: string) {
    return prisma.user.findUnique({ where: { id }, select: publicUserSelect });
  },

  findByUsername(username: string) {
    return prisma.user.findUnique({ where: { username }, select: publicUserSelect });
  },

  updateBasicProfile(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data, select: publicUserSelect });
  },

  upsertCreatorProfile(creatorId: string, data: Prisma.CreatorProfileUpdateInput) {
    return prisma.creatorProfile.upsert({
      where: { creatorId },
      update: data,
      create: { creatorId, ...toCreateData(data) },
    });
  },

  upsertLearnerProfile(learnerId: string, data: Prisma.LearnerProfileUpdateInput) {
    return prisma.learnerProfile.upsert({
      where: { learnerId },
      update: data,
      create: { learnerId, ...toCreateData(data) },
    });
  },

  async list(params: {
    skip: number;
    take: number;
    orderBy: Record<string, 'asc' | 'desc'>;
    role?: Role;
    search?: string;
  }) {
    const where: Prisma.UserWhereInput = {
      ...(params.role ? { role: params.role } : {}),
      ...(params.search
        ? {
            OR: [
              { name: { contains: params.search, mode: 'insensitive' } },
              { username: { contains: params.search, mode: 'insensitive' } },
              { email: { contains: params.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: publicUserSelect,
        skip: params.skip,
        take: params.take,
        orderBy: params.orderBy,
      }),
      prisma.user.count({ where }),
    ]);

    return { items, total };
  },

  setActive(id: string, isActive: boolean) {
    return prisma.user.update({ where: { id }, data: { isActive }, select: publicUserSelect });
  },

  delete(id: string) {
    return prisma.user.delete({ where: { id } });
  },
};

// Prisma's update input types (with nested set operators) aren't directly
// assignable as "create" scalars, so we strip them down to plain values.
function toCreateData(data: Record<string, any>) {
  const out: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    out[key] = value && typeof value === 'object' && 'set' in value ? value.set : value;
  }
  return out;
}
