import axios from "../utils/axiosInstance";

function addUserApi(data) {
  return axios.post("/api/users", data);
}
function getUserByIdApi(id) {
  return axios.get(`/api/users/${id}`);
}
function GetCoachClientsApi(id) {
  return axios.get(`/api/users/coach/${id}`);
}
function updateUserApi(id, data) {
  return axios.put(`/api/users/${id}`, data);
}
function deleteUserApi(id) {
  return axios.delete(`/api/users/${id}`);
}
export default {
  getUserByIdApi,
  addUserApi,
  updateUserApi,
  deleteUserApi,
  GetCoachClientsApi,
};
