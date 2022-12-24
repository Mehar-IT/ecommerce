import axios from "axios";
const BASE_URL = "http://127.0.0.1:3000/api/v1";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const userRequest = () => {
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });
};
