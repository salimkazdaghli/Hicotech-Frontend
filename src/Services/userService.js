import axios from "../utils/axiosInstance";

 function getAllUserApi(data) {
  return axios.get("/api/users", { params: data });
}
function addUserApi(data) {
  return axios.post("/api/users", data);
}
function getUserByIdApi(id) {
  return axios.get(`/api/users/${id}`);
}
function updateUserApi(id, data) {
  return axios.put(`/api/users/${id}`, data);
}
function deleteUserApi(id) {
  return axios.delete(`/api/users/${id}`);
}
export default {
  getAllUserApi,
  getUserByIdApi,
  addUserApi,
  updateUserApi,
  deleteUserApi,
};
