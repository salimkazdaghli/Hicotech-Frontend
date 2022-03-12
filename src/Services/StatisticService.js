import axios from "../utils/axiosInstance";

export function getAllStatisticsApi(page = 0) {
  return axios.get("/api/all/statistics", { params: page });
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
