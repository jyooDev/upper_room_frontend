import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, X } from "lucide-react";
import { useAuthContext } from "@/contexts/auth-context";
import { useOrgContext } from "@/contexts/org-context";
import { type IPost } from "@/types";
import { createPost } from "@/services/post-service";
import { useLogger } from "@/hooks";
// import imageCompression, { type Options } from "browser-image-compression";

type PostComposerProps = {
  open: boolean;
  onClose: () => void;
};

const POST_TYPES = [
  { value: "PRAYER_REQUEST", label: "Prayer Request" },
  { value: "DAILY", label: "Daily" },
  { value: "MISSION_UPDATE", label: "Mission Update" },
  { value: "TESTIMONY", label: "Testimony" },
  { value: "EVENT", label: "Event" },
];

type PostType = (typeof POST_TYPES)[number]["value"];

const PostComposer = ({ open, onClose }: PostComposerProps) => {
  const { user } = useAuthContext();
  const { orgId } = useOrgContext();
  const logger = useLogger("/src/components/post-compose.tsx");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<string[]>([]); // data URLs
  const [postType, setPostType] = useState<PostType>("DAILY");
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      // const options: Options = {
      //   maxSizeMB: 1,
      //   maxWidthOrHeight: 1920,
      //   useWebWorker: true,
      // };

      const newMedia = await Promise.all(
        Array.from(files).map(async (file) => {
          return URL.createObjectURL(file);
          // Refactor to use cloud storage
          // const compressed = await imageCompression(file, options);
          // return new Promise<string>((resolve, reject) => {
          //   const reader = new FileReader();
          //   reader.onload = () => resolve(reader.result as string);
          //   reader.onerror = reject;
          //   reader.readAsDataURL(compressed);
          // });
        })
      );

      logger.debug(newMedia);
      setMedia((prev) => [...(prev ?? []), ...newMedia]);
    } catch (error) {
      logger.debug("Error uploading media:", error);
      window.alert("Failed to process image(s). Please try again.");
    }
  };

  const handleRemoveFile = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOnPost = async () => {
    if (!user) return;

    const post: IPost = {
      content: {
        title,
        description: content,
        media,
      },
      stats: {
        likes: 0,
        comments: [],
        views: 0,
      },
      author: user.uid || "",
      postType,
      visibility,
      organizationId: orgId,
    };

    logger.debug("POSTED", post);
    const result = await createPost(post);
    logger.debug(result);
    // Reset fields
    setTitle("");
    setContent("");
    setMedia([]);
    setPostType("DAILY");
    setVisibility("PUBLIC");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogTitle>New post</DialogTitle>

        {/* User info */}
        <div className="flex items-center space-x-2 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.photoURL} />
            <AvatarFallback>{user?.firstName?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{user?.username || user?.email}</span>
        </div>

        {/* Post type */}
        <Select value={postType} onValueChange={setPostType}>
          <SelectTrigger className="w-full mb-2">
            <SelectValue placeholder="Select post type" />
          </SelectTrigger>
          <SelectContent>
            {POST_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Visibility */}
        <Select
          value={visibility}
          onValueChange={(value) =>
            setVisibility(value as "PUBLIC" | "PRIVATE")
          }
        >
          <SelectTrigger className="w-full mb-2">
            <SelectValue placeholder="Select visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PUBLIC">Public</SelectItem>
            <SelectItem value="PRIVATE">Private</SelectItem>
          </SelectContent>
        </Select>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded mb-2"
        />

        {/* Description */}
        <Textarea
          className="resize-none mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's new?"
          rows={4}
        />

        {/* Media previews */}
        {media.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {media.map((url, i) => (
              <div
                key={i}
                className="relative w-20 h-20 border rounded overflow-hidden"
              >
                <img
                  src={url}
                  alt={`media-${i}`}
                  className="w-full h-full object-cover"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-0 right-0"
                  onClick={() => handleRemoveFile(i)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* File input */}
        <div className="flex items-center space-x-2 mb-4">
          <label className="cursor-pointer">
            <Image className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleMediaUpload(e)}
              className="hidden"
            />
          </label>
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button
            disabled={!title.trim() && !content.trim() && media.length === 0}
            onClick={handleOnPost}
            className="bg-primary-50 hover:bg-primary-100"
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostComposer;
