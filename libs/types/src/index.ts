export interface User {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  commentCount: number;
  categoryId: string; // from Category id
  authorId: string; // from User id
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  likeCount: number;
  dislikeCount: number;
  userId: string; // from User id
  articleId: string; // from Article id
}
