import axios from "../utils/axiosInstance";

export function getAllStatisticsApi() {
  return axios.get("/api/all/statistics");
}
