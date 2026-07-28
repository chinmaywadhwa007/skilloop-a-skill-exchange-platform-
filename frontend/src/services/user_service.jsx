import api from "./api";

export const getProfile = async (id) => (await api.get(`/users/${id}`)).data.data;

export const updateProfile = async (payload) =>
  (await api.patch("/users/me", payload)).data.data;

export const getDashboard = async () =>
  (await api.get("/users/me/dashboard")).data.data;

export const getTransactions = async () =>
  (await api.get("/users/me/transactions")).data.data;

export const getLeaderboard = async (limit = 20) =>
  (await api.get("/users/leaderboard", { params: { limit } })).data.data;
