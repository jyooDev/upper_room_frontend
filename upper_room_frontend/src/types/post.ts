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
  postType: string;
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: string;
}
