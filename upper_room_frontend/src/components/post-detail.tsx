import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { type Post } from "@/types";
import { useLogger } from "@/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  const prevMedia = () =>
    setCurrentIndex((i) => (i === 0 ? media.length - 1 : i - 1));
  const nextMedia = () =>
    setCurrentIndex((i) => (i === media.length - 1 ? 0 : i + 1));

  return (
    <div className="flex items-center">
      <Dialog open={open} onOpenChange={onClose}>
        <DialogPortal>
          <DialogOverlay className="bg-black/70" />
          <DialogContent className="max-w-[90vw] sm:max-w-[70vw] w-full h-[80vh] flex flex-col md:flex-row overflow-hidden p-0">
            <div className="relative w-full flex flex-col md:flex-row gap-2 overflow-auto md:overflow-visible">
              <div className="relative flex-1 flex items-center justify-center w-full md:max-w-[60%]">
                {media.length > 0 ? (
                  <>
                    <img
                      src={media[currentIndex]}
                      alt="Post media"
                      className="max-h-full max-w-full object-contain"
                    />
                    {media.length > 1 && (
                      <>
                        <button
                          onClick={prevMedia}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextMedia}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
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
              <div className="mt-10 flex flex-col pt-3 space-y-2">
                <h4 className="text-sm font-semibold">Comments</h4>
                {post.stats.comments && post.stats.comments.length > 0 ? (
                  post.stats.comments.map((comment, i) => (
                    <div key={i} className="flex items-start space-x-2 text-sm">
                      <span className="font-semibold">{comment.user}:</span>
                      <span>{comment.text}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No replies yet.</p>
                )}
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
};

export default PostDetail;
