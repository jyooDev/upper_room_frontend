import { Feed } from "@/components";
import { useState } from "react";
import { mockPosts } from "@/mock/post-mock";

const MyOrganizationPosts = () => {
  const [postType, setPostType] = useState<string>("ALL");
  return (
    <div className="flex flex-col w-full h-full gap-3 overflow-auto">
      <div className="sticky flex flex-col w-full h-full overflow-hidden">
        <div className="flex flex-row">
          <button
            className={
              "flex py-1 px-4 font-semibold " +
              (postType == "ALL"
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700")
            }
            onClick={() => setPostType("ALL")}
          >
            ALL
          </button>
          <button
            className={
              "flex py-1 px-4 font-semibold " +
              (postType == "PRAYER_REQUEST"
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700")
            }
            onClick={() => setPostType("PRAYER_REQUEST")}
          >
            PRAYER
          </button>
          <button
            className={
              "flex py-1 px-4 font-semibold " +
              (postType == "EVENT"
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700")
            }
            onClick={() => setPostType("EVENT")}
          >
            EVENT
          </button>
          <button
            className={
              "flex py-1 px-4 font-semibold " +
              (postType == "MISSION_UPDATE"
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700")
            }
            onClick={() => setPostType("MISSION_UPDATE")}
          >
            MISSION
          </button>

          <button
            className={
              "flex py-1 px-4 font-semibold " +
              (postType == "DAILY"
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700")
            }
            onClick={() => setPostType("DAILY")}
          >
            DAILY
          </button>
          <button
            className={
              "flex py-1 px-4 font-semibold " +
              (postType == "TESTIMONY"
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700")
            }
            onClick={() => setPostType("TESTIMONY")}
          >
            TESTIMONY
          </button>
        </div>
        <span className="flex w-full border-t border-gray-300"></span>
      </div>
      <div className="mt-5">
        <Feed
          posts={
            postType === "ALL"
              ? mockPosts
              : mockPosts.filter((p) => p.postType === postType)
          }
        />
      </div>
    </div>
  );
};

export default MyOrganizationPosts;
