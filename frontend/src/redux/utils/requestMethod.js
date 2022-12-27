import axios from "axios";
// const BASE_URL = "http://127.0.0.1:4000/api/v1";
const BASE_URL = "/api/v1";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
