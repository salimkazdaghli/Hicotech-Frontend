import jwtDecode from "jwt-decode";
import axios from "../utils/axiosInstance";

function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");

    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}
function loginUserApi(data) {
  return axios.post("/api/login", data);
}
function registerUserApi(data) {
  return axios.post("/api/register", data);
}

export default {
  getCurrentUser,
  loginUserApi,
  registerUserApi,
};
