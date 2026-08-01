import type { Role } from '@prisma/client';

export interface SafeUser {
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
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult {
  user: SafeUser;
  accessToken: string;
  refreshToken: string;
}
