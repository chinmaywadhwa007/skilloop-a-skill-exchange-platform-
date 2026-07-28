import api, { TOKEN_KEY } from "./api";

export const registerUser = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  localStorage.setItem(TOKEN_KEY, data.data.token);
  return data.data;
};

export const loginUser = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  localStorage.setItem(TOKEN_KEY, data.data.token);
  return data.data;
};

export const fetchCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data.data;
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("currentUser");
};
