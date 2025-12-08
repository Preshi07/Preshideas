export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown supported
  coverImage?: string;
  author: string;
  createdAt: string;
  tags: string[];
}

export interface GeneratedPostContent {
  title: string;
  summary: string;
  content: string;
  tags: string[];
}
