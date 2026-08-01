import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z.string().optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
});

export const updateCreatorProfileSchema = z.object({
  headline: z.string().max(150).optional(),
  experience: z.string().optional(),
  skills: z.array(z.string()).optional(),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  portfolio: z.string().url().optional().or(z.literal('')),
});

export const updateLearnerProfileSchema = z.object({
  interests: z.array(z.string()).optional(),
  learningGoals: z.array(z.string()).optional(),
  currentLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
});

export const userIdParamSchema = z.object({
  id: z.string().uuid('Invalid user id'),
});

export const listUsersQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  role: z.enum(['ADMIN', 'CREATOR', 'LEARNER']).optional(),
  search: z.string().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateCreatorProfileInput = z.infer<typeof updateCreatorProfileSchema>;
export type UpdateLearnerProfileInput = z.infer<typeof updateLearnerProfileSchema>;
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;
