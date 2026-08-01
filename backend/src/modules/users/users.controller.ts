import type { FastifyReply, FastifyRequest } from "fastify";
import { UsersService } from "./users.service.js";
import { sendSuccess } from "../../common/utils/ApiResponse.js";
import { parsePagination } from "../../common/utils/pagination.js";
import type {
  UpdateProfileInput,
  UpdateCreatorProfileInput,
  UpdateLearnerProfileInput,
  ListUsersQuery,
} from "./users.schema.js";

export const UsersController = {
  async getMe(request: FastifyRequest, reply: FastifyReply) {
    const user = await UsersService.getById(request.user!.id);
    return sendSuccess(reply, { message: "Profile fetched", data: user });
  },

  async getByUsername(
    request: FastifyRequest<{ Params: { username: string } }>,
    reply: FastifyReply,
  ) {
    const user = await UsersService.getByUsername(request.params.username);
    return sendSuccess(reply, { message: "User fetched", data: user });
  },

  async updateProfile(
    request: FastifyRequest<{ Body: UpdateProfileInput }>,
    reply: FastifyReply,
  ) {
    const user = await UsersService.updateProfile(
      request.user!.id,
      request.body,
    );
    return sendSuccess(reply, { message: "Profile updated", data: user });
  },

  async updateCreatorProfile(
    request: FastifyRequest<{ Body: UpdateCreatorProfileInput }>,
    reply: FastifyReply,
  ) {
    const profile = await UsersService.updateCreatorProfile(
      request.user!.id,
      request.user!.role,
      request.body,
    );
    return sendSuccess(reply, {
      message: "Creator profile updated",
      data: profile,
    });
  },

  async updateLearnerProfile(
    request: FastifyRequest<{ Body: UpdateLearnerProfileInput }>,
    reply: FastifyReply,
  ) {
    const profile = await UsersService.updateLearnerProfile(
      request.user!.id,
      request.user!.role,
      request.body,
    );
    return sendSuccess(reply, {
      message: "Learner profile updated",
      data: profile,
    });
  },

  // --- Admin-only ---

  async list(
    request: FastifyRequest<{ Querystring: ListUsersQuery }>,
    reply: FastifyReply,
  ) {
    const pagination = parsePagination(request.query);
    const { items, meta } = await UsersService.list(pagination, {
      role: request.query.role,
      search: request.query.search,
    });
    return sendSuccess(reply, { message: "Users fetched", data: items, meta });
  },

  async deactivate(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const user = await UsersService.deactivate(request.params.id);
    return sendSuccess(reply, { message: "User deactivated", data: user });
  },

  async activate(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const user = await UsersService.activate(request.params.id);
    return sendSuccess(reply, { message: "User activated", data: user });
  },

  async remove(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    await UsersService.remove(request.params.id);
    return sendSuccess(reply, { message: "User deleted" });
  },
};
