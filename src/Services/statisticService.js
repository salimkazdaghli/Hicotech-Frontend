import axios from "../utils/axiosInstance";

export function getAllStatisticsApi(data) {
  return axios.get("/api/all/statistics", { params: data });
}

export function getStatisticApi(id) {
  return axios.get(`/api/statistic/${id}`);
}
