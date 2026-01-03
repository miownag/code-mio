export interface PostMetadata {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export interface Post extends PostMetadata {
  content: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
