import axios from "../utils/axiosInstance";

export function getAllInvitationApi() {
  return axios.get("/api/invitations");
}
export function getInvitationApi(id) {
  return axios.get(`/api/invitations/${id}`);
}

export function updateInvitationApi(id, data) {
  return axios.put(`/api/invitations/${id}`, data);
}
