import { usersApi } from "./api";
import Logger from "../utils/logger";

const logger = new Logger("/src/services/user-service.ts");

export const getUser = async (userId: string) => {
  // http://localhost:8888/api/v1/users
  const data = (await usersApi.get(`/${userId}`)).data;
  return data;
};

export const userExists = async (email: string) => {
  // http://localhost:8888/api/v1/users/exists
  const res = await usersApi.get("/exists", {
    params: {
      email: email,
    },
  });
  const data = res.data;
  return data;
};

export const updateLastLogin = async (userId: string) => {
  // http://localhost:8888/api/v1/users/last-login
  const res = await usersApi.put(`/last-login/${userId}`);
  const data = res.data;
  3;
  return data;
};

export const createUser = async (userPayload: {}) => {
  try {
    const res = await usersApi.post("/", {
      user: {
        ...userPayload,
      },
    });

    const data = res.data;
    logger.debug("FETCHED DATA - ", data);
    return data;
  } catch (error) {
    logger.debug("ERROR - ", error);
  }
};

export const updateUserProfile = async (uid: string, userPayload: {}) => {
  try {
    logger.bigLog(userPayload);

    const res = await usersApi.put(`/set-profile/${uid}`, {
      userProfile: {
        ...userPayload,
      },
    });
    const data = res.data;
    logger.bigLog(data);
    return data;
  } catch (error) {
    logger.error(error);
  }
};
