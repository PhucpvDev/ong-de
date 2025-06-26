export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featured_image: string;
  is_featured: boolean;
  published_at: string;
  categories: Category[];
}

export interface Article {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  isNew: boolean;
  slug: string;
}

export interface NewsContentProps {
  mainArticle: Article | null;
  relatedArticles: Article[];
  sidebarArticles: Article[];
  currentPage: number;
  articlesPerPage: number;
  onPageChange: (page: number) => void;
  titleLevel: number;
  categoryName: string; 
}