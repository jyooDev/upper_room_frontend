// components/Feed.tsx

import { ScrollArea } from "@/components/ui/scroll-area";
import { PostCard } from ".";

const Feed = ({ posts }: { posts: any[] }) => {
  return (
    <div className="w-full max-w-[600px] mx-auto h-screen">
      <ScrollArea className="h-[calc(100vh-64px)]  divide-y divide-gray-200 border border-gray-200">
        <div className="flex flex-col">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Feed;
