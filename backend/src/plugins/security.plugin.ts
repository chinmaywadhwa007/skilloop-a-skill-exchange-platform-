import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import cookie from '@fastify/cookie';
import { env } from '../config/env.js';

export default fp(async (app: FastifyInstance) => {
  // Security headers
  await app.register(helmet, {
    contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false,
  });

  // CORS - allow the frontend origin with credentials (cookies)
  await app.register(cors, {
    origin: env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // Signed cookies for refresh/access tokens
  await app.register(cookie, {
    secret: env.COOKIE_SECRET,
    hook: 'onRequest',
  });

  // Global rate limiting (per-route overrides possible via config.rateLimit)
  await app.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW,
    errorResponseBuilder: () => ({
      success: false,
      message: 'Too many requests, please try again later.',
      errors: ['Rate limit exceeded'],
    }),
  });
});
