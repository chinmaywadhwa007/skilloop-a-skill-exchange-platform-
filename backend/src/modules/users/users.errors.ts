import { ApiError } from "../../common/utils/ApiError.js";

export const UserErrors = {
  notFound: () => ApiError.notFound("User not found"),
  profileNotApplicable: (role: string) =>
    ApiError.badRequest(`${role} accounts do not have this profile type`),
};
