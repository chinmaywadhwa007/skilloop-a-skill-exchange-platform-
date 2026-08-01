import type { FastifyReply, FastifyRequest } from "fastify";
import type { ZodSchema } from "zod";

import { sendError } from "../common/utils/ApiResponse.js";
interface ValidationSchemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

/**
 * Validates request.body / query / params against Zod schemas.
 * On success, replaces request.body/query/params with the PARSED
 * (and type-coerced/defaulted) data.
 *
 * Usage:
 *   preHandler: [validate({ body: createSkillSchema })]
 */
export function validate(schemas: ValidationSchemas) {
  return async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    if (schemas.body) {
      const result = schemas.body.safeParse(request.body);
      if (!result.success) {
        const messages = result.error.errors.map(
          (e) => `${e.path.join(".")}: ${e.message}`,
        );
        return sendError(
          reply,
          422,
          "Validation failed",
          messages,
        ) as unknown as void;
      }
      request.body = result.data;
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(request.query);
      if (!result.success) {
        const messages = result.error.errors.map(
          (e) => `${e.path.join(".")}: ${e.message}`,
        );
        return sendError(
          reply,
          422,
          "Validation failed",
          messages,
        ) as unknown as void;
      }
      request.query = result.data as typeof request.query;
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(request.params);
      if (!result.success) {
        const messages = result.error.errors.map(
          (e) => `${e.path.join(".")}: ${e.message}`,
        );
        return sendError(
          reply,
          422,
          "Validation failed",
          messages,
        ) as unknown as void;
      }
      request.params = result.data as typeof request.params;
    }
  };
}
