import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PostComposer, PostCard } from "@/components";

const Feed = ({ posts }: { posts: any[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full max-w-[600px] mx-auto h-screen">
        <ScrollArea className="h-[calc(100vh-64px)] overflow-hidden border border-gray-200 ">
          <div className="flex border-b border-gray-200 justify-start  items-center w-full p-3 shadow">
            <Button
              variant="outline"
              className="px-3 border-none bg-gray-200 hover:bg-gray-300"
              onClick={() => setOpen(true)}
              aria-label="Compose post"
            >
              POST
            </Button>
          </div>
          <div className="flex flex-col divide-y divide-gray-200"></div>
          <div className="flex flex-col divide-y divide-gray-200g">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </ScrollArea>
      </div>
      <PostComposer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Feed;
