import { usersApi } from "./api";

export const getUser = async (userId: string) => {
  // http://localhost:8888/api/v1/users
  const data = (await usersApi.get(`/${userId}`)).data;
  return data;
};

export const userExists = async (email: string) => {
  const req = await usersApi.get("/exists", {
    data: { email },
  });
  const data = req.data;
  return data;
};

export const createUser = async (userPayload: {}) => {
  const req = await usersApi.post("/", {
    user: {
      ...userPayload,
    },
  });

  const data = req.data;
  return data;
};
