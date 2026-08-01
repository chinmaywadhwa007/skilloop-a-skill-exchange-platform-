import type { CreatorProfile, LearnerProfile, Role } from '@prisma/client';

export interface PublicUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  bio: string | null;
  role: Role;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  creatorProfile: CreatorProfile | null;
  learnerProfile: LearnerProfile | null;
}
