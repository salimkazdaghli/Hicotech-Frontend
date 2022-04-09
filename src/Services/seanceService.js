import axios from "../utils/axiosInstance";

export function getAllSeanceApi(data) {
  return axios.get("/api/seance", { params: data });
}
export function getSeanceApi(id) {
  return axios.get(`/api/seance/${id}`);
}

export function updateSeanceApi(id, data) {
  return axios.put(`/api/seance/${id}`, data);
}

export function addSeanceApi(data) {
  return axios.post("/api/seance/", data);
}

export function deleteSeanceApi(id) {
  return axios.delete(`/api/seance/${id}`);
}
