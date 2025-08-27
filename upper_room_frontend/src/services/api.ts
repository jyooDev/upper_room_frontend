import axios from "axios";

import config from "../config/config";

export const usersApi = axios.create({
  baseURL: config.serverUrl + "/v1/users",
  headers: {
    "Content-Type": "application/json",
  },
});
