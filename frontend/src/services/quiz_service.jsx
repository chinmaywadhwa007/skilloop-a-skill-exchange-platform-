import api from "./api";

export const listQuizzes = async (skill) =>
  (await api.get("/quizzes", { params: skill ? { skill } : {} })).data.data;

export const getQuiz = async (id) => (await api.get(`/quizzes/${id}`)).data.data;

export const submitQuiz = async (id, answers) =>
  (await api.post(`/quizzes/${id}/submit`, { answers })).data.data;

export const getMyAttempts = async () => (await api.get("/quizzes/me/attempts")).data.data;

export const createQuiz = async (payload) => (await api.post("/quizzes", payload)).data.data;
