import crypto from 'node:crypto';

/**
 * Generates a URL-safe random token (for email verification / password reset)
 * and its SHA-256 hash. Store the hash in DB, send the raw token to the user.
 */
export function generateSecureToken(): { rawToken: string; hashedToken: string } {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  return { rawToken, hashedToken };
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}
