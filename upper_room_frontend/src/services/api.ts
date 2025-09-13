import axios from "axios";

import config from "../config/config";
import { getAuth } from "firebase/auth";

export const usersApi = axios.create({
  baseURL: config.serverUrl + "/v1/users",
  headers: {
    "Content-Type": "application/json",
  },
});

usersApi.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
