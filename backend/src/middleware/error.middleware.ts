import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { ApiError } from "../common/utils/ApiError.js";
import { sendError } from "../common/utils/ApiResponse.js";

export function errorHandler(
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  request.log.error({ err: error }, "Request error");

  // Zod validation errors
  if (error instanceof ZodError) {
    const messages = error.errors.map(
      (e) => `${e.path.join(".")}: ${e.message}`,
    );
    return sendError(reply, 422, "Validation failed", messages);
  }

  // Custom ApiError
  if (error instanceof ApiError) {
    return sendError(reply, error.statusCode, error.message, error.errors);
  }

  // Prisma known errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const target = (error.meta?.target as string[])?.join(", ") || "field";
      return sendError(
        reply,
        409,
        `A record with this ${target} already exists`,
      );
    }
    if (error.code === "P2025") {
      return sendError(reply, 404, "Record not found");
    }
    if (error.code === "P2003") {
      return sendError(reply, 409, "Related record constraint violation");
    }
  }

  // Fastify built-in errors (e.g. schema validation, rate limit)
  const statusCode = (error as FastifyError).statusCode ?? 500;
  const message = statusCode === 500 ? "Internal server error" : error.message;

  return sendError(reply, statusCode, message);
}
