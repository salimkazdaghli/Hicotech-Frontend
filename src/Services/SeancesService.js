import axios from "../utils/axiosInstance";

export function getAllSeanceApi(data) {
  return axios.get("/api/seances", { params: data });
}
export function getSeanceApi(id) {
  return axios.get(`/api/seances/${id}`);
}

export function updateSeanceApi(id, data) {
  return axios.put(`/api/seances/${id}`, data);
}

export function addSeanceApi(data) {
  return axios.post("/api/seances/", data);
}

export function deleteSeanceApi(id) {
  return axios.delete(`/api/seances/${id}`);
}
