import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import useLocalStorage from "../Hooks/useLocalStorage";
import axios from "../utils/axiosInstance";

function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");

    return jwtDecode(token);
    // eslint-disable-next-line no-empty
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
