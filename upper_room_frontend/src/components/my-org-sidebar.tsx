import { Cross, Inbox } from "lucide-react";

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
  return (
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
      </nav>
    </aside>
  );
}
