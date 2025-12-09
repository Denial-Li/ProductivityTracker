import axios from "axios";

// Prefer a deploy-friendly base URL from env, fall back to local dev API.
export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
});

export default api;
