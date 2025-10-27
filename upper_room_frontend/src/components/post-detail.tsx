import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { type Post, type Comment } from "@/types";
import { useLogger } from "@/hooks";
import { LikeButton, Loader } from "@/components";
import { getCommentsByPostId } from "@/services/comment-service";
import { getUser } from "@/services/user-service";
import { useAuthContext } from "@/contexts/auth-context";
// import imageCompression, { type Options } from "browser-image-compression";

type PostDetailProps = {
  open: boolean;
  onClose: () => void;
  post: Post;
};

const PostDetail = ({ open, onClose, post }: PostDetailProps) => {
  const logger = useLogger("/src/components/post-compose.tsx");
  const media = post.content.media ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const { user } = useAuthContext();
  useEffect(() => {
    if (!open) return;
    const fetchComments = async () => {
      setLoadingComments(true);
      const data = await getCommentsByPostId(post._id);
      if (data.comments) {
        const commentsWithAuthors: Comment[] = await Promise.all(
          data.comments.map(async (comment: any) => {
            const author = await getUser(comment.author);
            logger.debug(author);
            const commentWithAuthor: Comment = {
              ...comment,
              authorUsername:
                author?.user?.username ??
                `${author.user?.name?.firstName} ${author?.user?.name?.lastname}`,
              authorAvatar: author?.user?.avatar,
            };
            return commentWithAuthor;
          })
        );
        setComments(commentsWithAuthors);
      } else {
        setComments([]);
      }
      setLoadingComments(false);
    };

    fetchComments();
  }, [open]);

  const prevMedia = () =>
    setCurrentIndex((i) => (i === 0 ? media.length - 1 : i - 1));
  const nextMedia = () =>
    setCurrentIndex((i) => (i === media.length - 1 ? 0 : i + 1));

  return (
    <div className="flex items-center">
      <Dialog open={open} onOpenChange={onClose}>
        <DialogPortal>
          <DialogOverlay className="bg-black/40" />
          <DialogContent className="max-w-[90vw] sm:max-w-[75vw] w-full h-[90vh] flex flex-col md:flex-row p-0 m-0 border-0 overflow-auto sm:overflow-hidden rounded-sm">
            <DialogTitle className="sr-only"></DialogTitle>
            <DialogDescription className="sr-only">
              {post.content.description ?? "Post content"}
            </DialogDescription>
            <div className="w-full flex flex-col md:flex-row">
              <div className="relative flex justify-center items-center w-full h-full md:max-w-[60%] overflow-hidden bg-black">
                {media.length > 0 ? (
                  <>
                    <img
                      src={media[currentIndex]}
                      alt="Post media"
                      className="flex-1 w-full object-cover z-10"
                    />
                    {media.length > 1 && (
                      <>
                        <button
                          onClick={prevMedia}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-20"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextMedia}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-20"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-white">No media available</div>
                )}
              </div>
              <div className="flex flex-col w-full md:max-w-[40%]">
                <div className="relative flex w-full h-full max-h-[8%] border-b border-gray-100 p-2">
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
                </div>
                {/* Content / Comments  */}
                <div className="relative flex-col w-full h-full max-h-[94%] overflow-y-auto p-2.5 text-sm text-gray-800">
                  <div>{post.content.description}</div>
                  <div className="relative overflow-y-auto w-full">
                    {loadingComments ? (
                      <Loader
                        isLoadingDialogOpen={false}
                        loaderMessage={"Loading Good News!"}
                      />
                    ) : comments && comments.length > 0 ? (
                      comments.map((comment, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between w-full space-x-2 text-sm my-3"
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={comment.authorAvatar}
                              className="object-cover"
                            />
                            <AvatarFallback>
                              {(comment.authorUsername &&
                                comment.authorUsername[0].toUpperCase()) ||
                                "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="block w-full items-start">
                            <span className="font-semibold">
                              {comment.authorUsername}:
                            </span>
                            <span> {comment.comment}</span>
                          </div>
                          <div>
                            <LikeButton
                              objectId={comment._id}
                              userId={user?.uid || ""}
                              type="COMMENT"
                              likeCounts={comment.stats.likes}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No replies yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
};

export default PostDetail;
