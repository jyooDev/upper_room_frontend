import { postsApi } from "./api";
import { type IPost } from "@/types";
import Logger from "../utils/logger";

const logger = new Logger("/src/services/post-service.ts");

export const createPost = async (postPayload: IPost) => {
  // POST api/v1/posts
  try {
    const res = await postsApi.post("", {
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

export const getPostsByOrgId = async (orgId: string) => {
  // GET api/v1/posts?orgId={orgId}
  try {
    const res = await postsApi.get("", { params: { orgId } });
    const data = res.data;
    logger.debug("FETCHED DATA - ", data);
    return data;
  } catch (error) {
    logger.debug("ERROR - ", error);
  }
};

export const isLikedPost = async (postId: string, userId: string) => {
  try {
    const res = await postsApi.get(
      `is-liked?postId=${postId}&userId=${userId}`
    );
    const data = res.data;
    return data;
  } catch (error) {
    logger.debug("ERROR - ", error);
  }
};

export const updatePostLike = async (postId: string, userId: string) => {
  try {
    const res = await postsApi.put("update-like", {
      params: { postId, userId },
    });
    const data = res.data;
    return data;
  } catch (error) {
    logger.debug("ERROR - ", error);
  }
};
