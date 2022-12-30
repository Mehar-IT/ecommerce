import axios from "axios";

let BASE_URL = "";
if (import.meta.env.MODE === "development") {
  BASE_URL = "http://127.0.0.1:3000/api/v1";
} else {
  BASE_URL = "/api/v1";
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
