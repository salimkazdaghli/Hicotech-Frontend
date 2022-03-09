import axios from "../utils/axiosInstance";

export function getAllStatisticsApi(page = 0) {
  return axios.get("/api/all/statistics", { params: page });
}
export function deleteStatisticsApi(statisticId) {
  return axios.delete(`/api/statistic/${statisticId}`);
}
