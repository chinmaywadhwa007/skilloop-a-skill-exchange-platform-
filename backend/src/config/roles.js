export const ROLES = {
  USER: "user",
  MENTOR: "mentor",
  ADMIN: "admin",
};

export const ROLE_VALUES = Object.values(ROLES);

// Higher number == more privileges. Used for hierarchical checks.
export const ROLE_RANK = {
  [ROLES.USER]: 1,
  [ROLES.MENTOR]: 2,
  [ROLES.ADMIN]: 3,
};

export const hasAtLeastRole = (role, minimum) =>
  (ROLE_RANK[role] || 0) >= (ROLE_RANK[minimum] || 0);
