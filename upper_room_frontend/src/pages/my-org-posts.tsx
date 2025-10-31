import { Feed, Loader } from "@/components";
import { useState, useEffect, useMemo } from "react";
import { useOrgContext } from "@/contexts";
import { getPostsByOrgId } from "@/services/post-service";
import { type Post } from "@/types";

const MyOrganizationPosts = () => {
  const { orgId } = useOrgContext();
  const [postType, setPostType] = useState<string>("ALL");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!orgId) return;

      setLoading(true);
      const data = await getPostsByOrgId(orgId);
      if (data.posts) setPosts(data.posts);
      setLoading(false);
    };

    fetchPosts();
  }, [orgId]);

  const filteredPosts = useMemo(
    () =>
      postType === "ALL" ? posts : posts.filter((p) => p.postType === postType),
    [posts, postType]
  );

  return (
    <div className="flex flex-col w-full h-full gap-3 overflow-auto">
      <div className="sticky flex flex-col w-full h-full overflow-hidden">
        <div className="flex flex-row">
          <div className="flex flex-row">
            {[
              "ALL",
              "PRAYER_REQUEST",
              "EVENT",
              "MISSION_UPDATE",
              "DAILY",
              "TESTIMONY",
            ].map((type) => (
              <button
                key={type}
                className={
                  "flex py-1 px-4 font-semibold " +
                  (postType === type
                    ? "bg-gray-600 hover:bg-gray-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700")
                }
                onClick={() => setPostType(type)}
              >
                {type === "PRAYER_REQUEST"
                  ? "PRAYER"
                  : type === "MISSION_UPDATE"
                  ? "MISSION"
                  : type}
              </button>
            ))}
          </div>
          <span className="flex w-full border-t border-gray-300"></span>
        </div>

        {/* Feeds */}
        <div className="mt-5 flex flex-col">
          {loading ? (
            <Loader
              isLoadingDialogOpen={false}
              loaderMessage={"Loading Good News!"}
            />
          ) : (
            <Feed posts={filteredPosts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrganizationPosts;
