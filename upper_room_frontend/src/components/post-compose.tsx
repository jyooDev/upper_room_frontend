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
import { Image, X } from "lucide-react"; // Example icons
import { useAuthContext } from "@/contexts/auth-context";

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

const PostComposer = ({ open, onClose }: PostComposerProps) => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [postType, setPostType] = useState("DAILY");

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setMedia(e.target.files[0]);
  };

  const handleOnPost = () => {
    console.log("POSTED");
  };
  const { user } = useAuthContext();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogTitle>New post</DialogTitle>
        <div className="flex items-center space-x-2 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.photoURL} />
            <AvatarFallback>
              {user?.firstName ? user.firstName[0] : "U"}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold">{user?.username || user?.email}</span>
        </div>
        <Select value={postType} onValueChange={setPostType}>
          <SelectTrigger className="w-full">
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
        <Textarea
          className="resize-none mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's new?"
          rows={4}
        />
        {media && (
          <div className="flex items-center mb-2">
            <span className="text-sm">{media.name}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMedia(null)}
              className="ml-2"
              aria-label="Remove attachment"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
        <div className="flex items-center space-x-2 mb-4">
          <label className="cursor-pointer">
            <Image className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              onChange={handleMediaChange}
              className="hidden"
            />
          </label>
        </div>
        <DialogFooter>
          <Button
            disabled={!content.trim() && !media}
            onClick={() => {
              handleOnPost();
              setContent("");
              setMedia(null);
              onClose();
            }}
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
