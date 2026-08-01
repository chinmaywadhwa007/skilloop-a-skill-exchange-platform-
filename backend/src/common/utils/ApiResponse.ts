import type { FastifyReply } from 'fastify';

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface SendOptions<T> {
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: PaginationMeta;
}

/**
 * Sends a standardized success response:
 * { success: true, message, data, meta? }
 */
export function sendSuccess<T>(reply: FastifyReply, options: SendOptions<T> = {}) {
  const { statusCode = 200, message = 'Success', data = null, meta } = options;
  return reply.status(statusCode).send({
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  });
}

/**
 * Sends a standardized error response:
 * { success: false, message, errors: [] }
 */
export function sendError(
  reply: FastifyReply,
  statusCode: number,
  message: string,
  errors: string[] = [],
) {
  return reply.status(statusCode).send({
    success: false,
    message,
    errors: errors.length ? errors : [message],
  });
}

export function buildPaginationMeta(page: number, limit: number, total: number): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}
