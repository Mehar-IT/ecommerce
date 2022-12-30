import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:3000/api/v1"
    : "/api/v1";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
