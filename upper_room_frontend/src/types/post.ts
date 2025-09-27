export interface Post {
  _id: string;
  content: {
    title: string;
    description?: string | null;
    media?: string[]; // array of URLs
  };
  stats: {
    likes: number;
    views: number;
    comments: any[]; // you can replace `any` with a proper Comment type later
  };
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  postType:
    | "PRAYER_REQUEST"
    | "EVENT"
    | "MISSION_UPDATE"
    | "DAILY"
    | "TESTIMONY";
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: string;
  organizationId?: string | null;
}

export interface IPost {
  content: {
    title: string;
    description?: string;
    media?: string[];
  };
  stats: {
    likes: number;
    comments: string[];
    views: number;
  };
  author: string;
  postType:
    | "PRAYER_REQUEST"
    | "EVENT"
    | "MISSION_UPDATE"
    | "DAILY"
    | "TESTIMONY";
  visibility: "PUBLIC" | "PRIVATE";
  organizationId?: string | null;
}
