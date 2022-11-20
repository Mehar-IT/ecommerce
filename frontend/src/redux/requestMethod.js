import axios from "axios";
const BASE_URL = "http://127.0.0.1:3000/api/v1";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = () => {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const TOKEN = currentUser?.token;

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      token: TOKEN,
    },
  });
};
