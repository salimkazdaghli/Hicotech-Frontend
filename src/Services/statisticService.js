import axios from "../utils/axiosInstance";

export function getAllStatisticsApi(data) {
  return axios.get("/api/all/statistics", { params: data });
}

export function getStatisticApi(id) {
  return axios.get(`/api/statistic/${id}`);
}

export function deleteStatisticsApi(statisticId) {
  return axios.delete(`/api/statistic/${statisticId}`);
}
export function updateStatisticsApi(statisticId, data) {
  return axios.put(`/api/statistic/${statisticId}`, data);
}
export function addStatisticApi(data) {
  return axios.post("/api/createStatistic", data);
}
