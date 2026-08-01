import type { FastifyReply, FastifyRequest } from "fastify";

import { ApiError } from "../common/utils/ApiError.js";
import { verifyAccessToken } from "../common/utils/jwt.js";
import { prisma } from "../config/database.js";

/**
 * Extracts access token from either:
 *  1. httpOnly cookie "accessToken"
 *  2. Authorization: Bearer <token> header (useful for mobile / Postman)
 */
function extractToken(request: FastifyRequest): string | null {
  const cookieToken = request.cookies?.accessToken;
  if (cookieToken) return cookieToken;

  const authHeader = request.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  return null;
}

/**
 * Verifies the access token and attaches `request.user`.
 * Use as a Fastify `preHandler` on any protected route.
 */
export async function authenticate(
  request: FastifyRequest,
  _reply: FastifyReply,
): Promise<void> {
  const token = extractToken(request);

  if (!token) {
    throw ApiError.unauthorized("Authentication required. Please log in.");
  }

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw ApiError.unauthorized("Invalid or expired access token");
  }

  // Confirm the user still exists & is active (handles deleted/deactivated accounts)
  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, role: true, email: true, isActive: true },
  });

  if (!user || !user.isActive) {
    throw ApiError.unauthorized("Account is inactive or no longer exists");
  }

  request.user = { id: user.id, role: user.role, email: user.email };
}

/**
 * Optional authentication - attaches `request.user` if a valid token is
 * present, but does not throw if absent. Useful for public routes that
 * behave slightly differently for logged-in users (e.g. search).
 */
export async function optionalAuthenticate(
  request: FastifyRequest,
): Promise<void> {
  const token = extractToken(request);
  if (!token) return;

  try {
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true, email: true, isActive: true },
    });
    if (user && user.isActive) {
      request.user = { id: user.id, role: user.role, email: user.email };
    }
  } catch {
    // silently ignore - treat as unauthenticated
  }
}
