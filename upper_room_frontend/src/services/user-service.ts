import { usersApi } from "./api";
import Logger from "../utils/logger";

const logger = new Logger("/src/services/user-service.ts");

export const getUser = async (userId: string) => {
  // http://localhost:8888/api/v1/users
  const data = (await usersApi.get(`/${userId}`)).data;
  return data;
};

export const userExists = async (email: string) => {
  const req = await usersApi.get("/exists", {
    params: {
      email: email,
    },
  });
  const data = req.data;
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
