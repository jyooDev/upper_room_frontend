import axios from "axios";

import config from "@/config/config";
import { getAuth } from "firebase/auth";

export const roomApis = axios.create({
  baseURL: config.voiceServerUrl + "/v1/rooms",
  headers: {
    "Content-Type": "application/json",
  },
});

roomApis.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
