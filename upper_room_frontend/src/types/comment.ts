export interface Comment {
  _id: string;
  post: string;
  comment: string;
  author: string;
  authorUsername?: string;
  authorAvatar?: string;
  stats: {
    likes: number;
  };
  likedBy?: string[];
}

export interface IComment {
  post: string;
  comment: string;
  author: string;
  stats: {
    likes: number;
  };
  likedBy?: string[];
}
