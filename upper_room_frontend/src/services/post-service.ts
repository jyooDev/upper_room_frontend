import { postsApi } from "./api";
import { type IPost } from "@/types";
import Logger from "../utils/logger";

const logger = new Logger("/src/services/post-service.ts");

export const createPost = async (postPayload: IPost) => {
  // http://localhost:8888/api/v1/posts
  try {
    const res = await postsApi.post("/", {
      post: {
        ...postPayload,
      },
    });

    const data = res.data;
    logger.debug("FETCHED DATA - ", data);
    return data;
  } catch (error) {
    logger.debug("ERROR - ", error);
  }
};
