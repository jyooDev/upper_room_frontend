import { commentsApi } from "./apis/backend-apis/v1-apis";
import Logger from "../utils/logger";

const logger = new Logger("/src/services/comment-service.ts");

export const getCommentsByPostId = async (postId: string) => {
  // GET api/v1/comments?postId={postId}
  try {
    const res = await commentsApi.get("", { params: { postId } });
    const data = res.data;
    logger.debug("FETCHED DATA - ", data);
    return data;
  } catch (error) {
    logger.error("ERROR - ", error);
  }
};

export const createComment = async (
  comment: string,
  author: string,
  post: string,
) => {
  try {
    const res = await commentsApi.post("", {
      comment: { comment, author, post },
    });
    const data = res.data;
    logger.debug("CREATED COMMENT", data);
    return data;
  } catch (error) {
    logger.error("ERROR - ", error);
  }
};

export const updateCommentLike = async (commentId: string, userId: string) => {
  try {
    const res = await commentsApi.put("/update-like", {
      params: { commentId, userId },
    });
    const data = res.data;
    return data;
  } catch (error) {
    logger.error("ERROR - ", error);
  }
};

export const isLikedComment = async (commentId: string, userId: string) => {
  try {
    const res = await commentsApi.get("/is-liked", {
      params: { commentId, userId },
    });
    const data = res.data;
    return data;
  } catch (error) {
    logger.error("ERROR - ", error);
  }
};
