import axios from "../utils/axiosInstance";

export function getAllObjectiveApi(data) {
  return axios.get("/api/objectives", { params: data });
}
export function getObjectiveApi(id) {
  return axios.get(`/api/objectives/${id}`);
}
export function getObjectiveByCoachAndPlayerApi(playerData) {
  return axios.get("/api/objectivesByCoach", { params: playerData });
}
export function deleteObjectiveByCoachAndPlayerApi(id, playerData) {
  return axios.put(`/api/deleteObjectiveStat/${id}`, { params: playerData });
}
export function deleteObjectiveSkillByCoachAndPlayerApi(id, playerData) {
  return axios.put(`/api/deleteObjectiveSkill/${id}`, { params: playerData });
}
export function updateObjectiveSkillByCoachAndPlayerApi(
  objectiveId,
  statId,
  data
) {
  return axios.put(`/api/modifyObjectiveSkill/${objectiveId}/${statId}`, data);
}
export function updateObjectiveStatByCoachAndPlayerApi(
  objectiveId,
  statId,
  data
) {
  return axios.put(`/api/modifyObjectiveStat/${objectiveId}/${statId}`, data);
}

export function updateObjectiveApi(id, data) {
  return axios.put(`/api/objectives/${id}`, data);
}

export function addObjectiveApi(data) {
  return axios.post("/api/objectives/", data);
}

export function deleteObjectiveApi(id) {
  return axios.delete(`/api/objectives/${id}`);
}
