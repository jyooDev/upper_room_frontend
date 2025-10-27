import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { isLikedComment } from "@/services/comment-service";

interface LikeButtonProps {
  objectId: string;
  userId: string;
  type: "POST" | "COMMENT";
  likeCounts: number;
}

const LikeButton = ({
  objectId,
  userId,
  type,
  likeCounts,
}: LikeButtonProps) => {
  const [likes, setLikes] = useState(likeCounts);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIsLiked = async () => {
      let data;
      if (type === "COMMENT") {
        data = await isLikedComment(objectId, userId);
      } else if (type === "POST") {
        // FETCH POST IS LIKED
      }
      setLiked(data.isLiked);
    };

    fetchIsLiked();
  });
  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // optimistic update
      setLiked(!liked);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error(err);
      // revert if failed
      setLiked((prev) => !prev);
      setLikes((prev) => (liked ? prev + 1 : prev - 1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center space-x-1 transition ${
        liked ? "text-gray-700" : "text-gray-300 hover:text-gray-500"
      }`}
    >
      <Heart
        className={`w-5 h-5 ${liked ? "fill-current text-gray-700" : ""}`}
      />
      <span className="text-sm">{likes}</span>
    </button>
  );
};

export default LikeButton;
