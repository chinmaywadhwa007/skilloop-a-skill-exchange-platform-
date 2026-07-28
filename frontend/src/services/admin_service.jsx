import api from "./api";

export const getStats = async () => (await api.get("/admin/stats")).data.data;

export const listUsers = async (params = {}) => {
  const { data } = await api.get("/admin/users", { params });
  return { items: data.data, meta: data.meta };
};

export const updateUserRole = async (id, role) =>
  (await api.patch(`/admin/users/${id}/role`, { role })).data.data;

export const setUserActive = async (id, isActive) =>
  (await api.patch(`/admin/users/${id}/active`, { isActive })).data.data;

export const adjustUserCoins = async (id, amount, note) =>
  (await api.patch(`/admin/users/${id}/coins`, { amount, note })).data.data;

export const setSkillStatus = async (id, status) =>
  (await api.patch(`/admin/skills/${id}/status`, { status })).data.data;
