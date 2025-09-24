import { useState } from "react";

import { Cross, Inbox, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostComposer from "./post-compose";

// Menu items.
const items = [
  {
    title: "Sermons",
    url: "sermons",
    icon: Cross,
  },
  {
    title: "Posts",
    url: "posts",
    icon: Inbox,
  },
];

interface MyOrgSideBarProps {
  orgName: string;
}

export default function MyOrgSideBar({ orgName }: MyOrgSideBarProps) {
  const baseUrl = "/my-organization";
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="relative w-48 min-h-full bg-white border-r shadow-sm p-4 space-y-2">
        <nav className="flex flex-col gap-2">
          {items.map(({ title, url, icon: Icon }) => (
            <a
              key={title}
              href={`${baseUrl}/${orgName}/${url}`}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              <Icon className="w-5 h-5 text-gray-500" />
              <span>{title}</span>
            </a>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="mb-3 w-9 h-9 flex justify-center items-center border-none rounded-full bg-gray-100 hover:bg-gray-200 mx-auto"
            onClick={() => setOpen(true)}
            aria-label="Compose post"
          >
            <Plus className="w-6 h-6 text-gray-700 font-semibold " />
          </Button>
        </nav>
      </aside>
      {/* Compose dialog */}
      <PostComposer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
