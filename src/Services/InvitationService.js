import axios from "../utils/axiosInstance";

export function getAllInvitation() {
  return axios.get("/api/invitations");
}
export function getInvitation(id) {
  return axios.get("/api/invitations/" + id);
}

export function updateInvitation(id, data) {
  return axios.put("/api/invitations/" + id, data);
}
