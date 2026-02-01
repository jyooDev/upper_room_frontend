import axios from "axios";

import config from "../../../config/config";
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

export const postsApi = axios.create({
  baseURL: config.serverUrl + "/v1/posts",
  headers: {
    "Content-Type": "application/json",
  },
});

postsApi.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const organizationsApi = axios.create({
  baseURL: config.serverUrl + "/v1/organizations",
  headers: {
    "Content-Type": "application/json",
  },
});

organizationsApi.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const commentsApi = axios.create({
  baseURL: config.serverUrl + "/v1/comments",
  headers: {
    "Content-Type": "application/json",
  },
});

commentsApi.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const sermonsApi = axios.create({
  baseURL: config.serverUrl + "/v1/sermons",
  headers: {
    "Content-Type": "application/json",
  },
});

sermonsApi.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
