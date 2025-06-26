export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Author {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featured_image: string;
  is_featured: boolean;
  view_count: number;
  published_at: string;
  categories: Category[];
  author: Author;
}

export interface Article {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  isNew: boolean;
  slug: string;
}
