import { UsersRepository } from './users.repository.js';
import { UserErrors } from './users.errors.js';
import { buildPaginationMeta } from "../../common/utils/ApiResponse.js";
import type {
  UpdateProfileInput,
  UpdateCreatorProfileInput,
  UpdateLearnerProfileInput,
} from './users.schema.js';
import type { Role } from '@prisma/client';
import type { ParsedPagination } from "../../common/utils/pagination.js";

export const UsersService = {
  async getById(id: string) {
    const user = await UsersRepository.findById(id);
    if (!user) throw UserErrors.notFound();
    return user;
  },

  async getByUsername(username: string) {
    const user = await UsersRepository.findByUsername(username);
    if (!user) throw UserErrors.notFound();
    return user;
  },

  async updateProfile(userId: string, input: UpdateProfileInput) {
    return UsersRepository.updateBasicProfile(userId, input);
  },

  async updateCreatorProfile(userId: string, userRole: Role, input: UpdateCreatorProfileInput) {
    if (userRole !== 'CREATOR' && userRole !== 'ADMIN') {
      throw UserErrors.profileNotApplicable(userRole);
    }
    return UsersRepository.upsertCreatorProfile(userId, input);
  },

  async updateLearnerProfile(userId: string, userRole: Role, input: UpdateLearnerProfileInput) {
    if (userRole !== 'LEARNER' && userRole !== 'ADMIN') {
      throw UserErrors.profileNotApplicable(userRole);
    }
    return UsersRepository.upsertLearnerProfile(userId, input);
  },

  async list(pagination: ParsedPagination, filters: { role?: Role; search?: string }) {
    const { items, total } = await UsersRepository.list({
      skip: pagination.skip,
      take: pagination.take,
      orderBy: pagination.orderBy,
      ...filters,
    });

    return {
      items,
      meta: buildPaginationMeta(pagination.page, pagination.limit, total),
    };
  },

  async deactivate(id: string) {
    return UsersRepository.setActive(id, false);
  },

  async activate(id: string) {
    return UsersRepository.setActive(id, true);
  },

  async remove(id: string) {
    await UsersRepository.delete(id);
  },
};
