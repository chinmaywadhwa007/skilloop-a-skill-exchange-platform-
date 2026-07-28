import { ROLE_RANK } from "./constants";

export const hasAtLeastRole = (role, minimum) =>
  (ROLE_RANK[role] || 0) >= (ROLE_RANK[minimum] || 0);

export const formatCoins = (value) => `${Number(value || 0).toLocaleString()} coins`;

export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString(undefined, { dateStyle: "medium" }) : "";
