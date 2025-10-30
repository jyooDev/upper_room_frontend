// components/PostCard.tsx
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

import { LuMessageCircle } from "react-icons/lu";
import { GrView } from "react-icons/gr";

import { type Post } from "@/types";
import PostDetail from "./post-detail";
import LikeButton from "./like-button";
import { useAuthContext } from "@/contexts";

const PostCard = ({ post }: { post: Post }) => {
  const [openDetailPopup, setOpenDetailPopup] = useState(false);
  const { user } = useAuthContext();

  return (
    <>
      <div>
        <Card className="p-4 border-none rounded-none">
          {/* Author & Timestamp */}
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>
                {post.author.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-semibold">{post.author.name}</div>
              <div className="text-xs text-muted-foreground">
                {post.postType} ·{" "}
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </div>
            </div>
          </div>

          <div onClick={() => setOpenDetailPopup(true)}>
            {/* Title */}
            <div className="mt-4 text-base font-medium">
              {post.content.title}
            </div>

            {/* Description */}
            {post.content.description && (
              <div className="mt-2 text-sm text-muted-foreground">
                {post.content.description.length > 120
                  ? post.content.description.slice(0, 120) + "..."
                  : post.content.description}
              </div>
            )}

            {/* Media */}
            {post.content.media && post.content.media.length > 0 && (
              <div className="mt-4">
                <img
                  src={post.content.media[0]}
                  alt="media"
                  className="rounded-lg max-h-60 object-cover w-full"
                />
              </div>
            )}
          </div>

          {/* Reactions */}
          <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
            <span className="flex jusitfy-center items-center gap-1">
              <LikeButton
                objectId={post._id}
                userId={user?.uid || ""}
                type="POST"
                likeCounts={post.stats.likes}
                showCounts={true}
              />
            </span>
            <span className="flex jusitfy-center items-center gap-1">
              <LuMessageCircle />
              {post.stats.comments.length}
            </span>
            <span className="flex jusitfy-center items-center gap-1">
              <GrView />
              {post.stats.views}
            </span>
          </div>
        </Card>
      </div>
      <PostDetail
        open={openDetailPopup}
        onClose={() => setOpenDetailPopup(false)}
        post={post}
      />
    </>
  );
};

export default PostCard;
