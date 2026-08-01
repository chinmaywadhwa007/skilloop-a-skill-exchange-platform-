import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.js";
import type { Role } from "@prisma/client";

export interface AccessTokenPayload {
  sub: string; // userId
  role: Role;
  email: string;
}

export interface RefreshTokenPayload {
  sub: string; // userId
  tokenId: string; // maps to RefreshToken.id in DB, enables revocation
}

export const signAccessToken = (payload: AccessTokenPayload): string => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
  } as SignOptions);
};

export const signRefreshToken = (payload: RefreshTokenPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  } as SignOptions);
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
};

/**
 * Converts a duration string like "30d" / "15m" into milliseconds,
 * used for setting cookie maxAge and DB expiresAt.
 */
export const durationToMs = (duration: string): number => {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) return 15 * 60 * 1000; // fallback: 15 minutes

  const value = Number(match[1]);
  const unit = match[2];

  const unitMs: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * unitMs[unit];
};
