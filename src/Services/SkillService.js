import axios from "../utils/axiosInstance";

export function getAllSkillsApi(page = 0) {
  return axios.get("/api/all/skills", { params: page });
}
export function deleteSkillsApi(skillId) {
  return axios.delete(`/api/skill/${skillId}`);
}
export function updateSkillApi(skillId, data) {
  return axios.put(`/api/skill/${skillId}`, data);
}
export function addSkillApi(data) {
  return axios.post("/api/createSkill", data);
}
