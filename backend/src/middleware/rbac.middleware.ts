import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Role } from '@prisma/client';
import { ApiError } from "../common/utils/ApiError.js"

/**
 * Restricts a route to one or more roles.
 * Must run AFTER `authenticate` in the preHandler chain.
 *
 * Usage:
 *   preHandler: [authenticate, requireRole('ADMIN')]
 *   preHandler: [authenticate, requireRole('ADMIN', 'CREATOR')]
 */
export function requireRole(...allowedRoles: Role[]) {
  return async (request: FastifyRequest, _reply: FastifyReply): Promise<void> => {
    if (!request.user) {
      throw ApiError.unauthorized('Authentication required');
    }

    if (!allowedRoles.includes(request.user.role)) {
      throw ApiError.forbidden(
        `Access denied. Requires role: ${allowedRoles.join(' or ')}`,
      );
    }
  };
}

/** Shorthand guards */
export const requireAdmin = requireRole('ADMIN');
export const requireCreator = requireRole('ADMIN', 'CREATOR');
export const requireLearner = requireRole('ADMIN', 'LEARNER');

/**
 * Ownership check helper - ensures a Creator can only mutate their OWN
 * resources, unless they are an Admin (Admin bypasses ownership).
 * Pass the resource's owner id (usually fetched in the service layer)
 * and compare against `request.user`.
 */
export function assertOwnerOrAdmin(request: FastifyRequest, resourceOwnerId: string): void {
  if (!request.user) {
    throw ApiError.unauthorized('Authentication required');
  }
  if (request.user.role === 'ADMIN') return;
  if (request.user.id !== resourceOwnerId) {
    throw ApiError.forbidden('You do not have permission to modify this resource');
  }
}
