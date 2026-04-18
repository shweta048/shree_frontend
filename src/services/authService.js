import api from "./api";

export const adminLogin = (credentials) => api.post("/auth/login", credentials);
