import axios from "../utils/axiosInstance";

export function getAllUserApi(data) {
  return axios.get("/api/users", { params: data });
}
export function getUserApi(id) {
  return axios.get(`/api/users/${id}`);
}

export function updateUserApi(id, data) {
  return axios.put(`api/users/${id}`, data);
}

export function addUserApi(data) {
  return axios.post("/api/users/", data);
}

export function deleteUserApi(id) {
  return axios.delete(`/api/users/${id}`);
}
