import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { isLikedComment, updateCommentLike } from "@/services/comment-service";
import { isLikedPost, updatePostLike } from "@/services/post-service";
interface LikeButtonProps {
  objectId: string;
  userId: string;
  type: "POST" | "COMMENT";
  likeCounts: number;
  showCounts: boolean;
}

const LikeButton = ({
  objectId,
  userId,
  type,
  likeCounts,
  showCounts,
}: LikeButtonProps) => {
  const [likes, setLikes] = useState(likeCounts);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchIsLiked = async () => {
      try {
        let data;

        if (type === "COMMENT") {
          data = await isLikedComment(objectId, userId);
        } else if (type === "POST") {
          data = await isLikedPost(objectId, userId);
        }

        const _liked = data?.isLiked ?? false;
        setLiked(_liked);
      } catch (err) {
        console.error("Error fetching like status:", err);
        setLiked(false);
      }
    };

    fetchIsLiked();
  });
  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    try {
      let data;
      if (type === "COMMENT") {
        data = await updateCommentLike(objectId, userId);
        if (data.comment.likedBy.includes(userId)) {
          setLiked(true);
          setLikes((prev) => prev + 1);
        } else {
          setLiked(false);
          setLikes((prev) => prev - 1);
        }
      } else if (type === "POST") {
        data = await updatePostLike(objectId, userId);
        if (data.post.likedBy && data.post.likedBy.includes(userId)) {
          setLiked(true);
          setLikes((prev) => prev + 1);
        } else {
          setLiked(false);
          setLikes((prev) => prev - 1);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center space-x-1 transition ${
        liked ? "text-gray-600" : "text-gray-500 hover:text-gray-600"
      }`}
    >
      <Heart
        className={`w-3 h-3 ${liked ? "fill-current text-gray-600" : ""}`}
      />
      {showCounts && <span>{likes}</span>}
    </button>
  );
};

export default LikeButton;
