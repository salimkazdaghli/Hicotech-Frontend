import axios from "../utils/axiosInstance";

export function loginUserApi(data) {
  return axios.post("/api/login", data);
}
export function registerUserApi(data) {
  return axios.post("/api/register", data);
}
