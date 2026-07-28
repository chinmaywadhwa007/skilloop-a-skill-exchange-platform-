import api from "./api";

export const listSkills = async (params = {}) => {
  const { data } = await api.get("/skills", { params });
  return { items: data.data, meta: data.meta };
};

export const listCategories = async () => (await api.get("/skills/categories")).data.data;

export const getSkill = async (id) => (await api.get(`/skills/${id}`)).data.data;

export const getMySkills = async () => (await api.get("/skills/mine")).data.data;

export const createSkill = async (payload) => (await api.post("/skills", payload)).data.data;

export const updateSkill = async (id, payload) =>
  (await api.patch(`/skills/${id}`, payload)).data.data;

export const deleteSkill = async (id) => (await api.delete(`/skills/${id}`)).data;

export const enrollInSkill = async (id) => (await api.post(`/skills/${id}/enroll`)).data.data;

export const rateSkill = async (id, rating) =>
  (await api.post(`/skills/${id}/rate`, { rating })).data.data;
