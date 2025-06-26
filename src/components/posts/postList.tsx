import React, { useState, useEffect } from 'react';
import { Card, Typography, List, Pagination, Tabs, Skeleton, message, Empty } from 'antd';
import { CalendarOutlined, RightOutlined, FileTextOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Category, Post, Article, NewsContentProps } from '@/types/posts/listPosts';

const { Title, Text, Paragraph } = Typography;

const ArticleCard: React.FC<{ article: Article; titleLevel?: number }> = ({ article, titleLevel = 4 }) => (
  <div className="overflow-hidden transition-shadow">
    <div className="relative cursor-pointer">
      <Link href={`/posts/${article.slug}`}>
        <Image
          src={article.image || '/placeholder.jpg'}
          alt={article.title}
          width={300}
          height={200}
          className="w-full h-60 object-cover rounded-2xl"
        />
      </Link>
    </div>
    <div className="py-4">
      <Link href={`/posts/${article.slug}`}>
        <Title
          level={4}
          className="text-gray-700 font-medium hover:text-blue-600 cursor-pointer"
        >
          {article.title}
        </Title>
      </Link>
      <div className="flex items-center text-gray-500 text-sm py-2">
        <CalendarOutlined className="mr-1" />
        <span>{article.date}</span>
      </div>
    </div>
  </div>
);

const MainArticle: React.FC<{ article: Article; titleLevel: number }> = ({ article, titleLevel }) => {
  if (!article || !article.slug) {
    return <div>Article not available</div>;
  }

  return (
    <div className="overflow-hidden">
      <div className="relative cursor-pointer">
        <Link href={`/posts/${article.slug}`}>
          <Image
            src={article.image || '/placeholder.jpg'}
            alt={article.title}
            width={600}
            height={300}
            className="w-full h-60 md:h-90 rounded-2xl object-cover"
          />
        </Link>
      </div>
      <div className="py-5">
        <Link href={`/posts/${article.slug}`}>
          <Title
            level={4}
            className="text-gray-800 mb-3 hover:text-blue-600 cursor-pointer"
          >
            {article.title}
          </Title>
        </Link>
        <Paragraph>{article.excerpt}</Paragraph>
        <div className="flex items-center text-gray-500 text-sm">
          <CalendarOutlined className="mr-1" />
          <span>{article.date}</span>
        </div>
      </div>
    </div>
  );
};

const Breadcrumb: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="flex flex-wrap items-center text-gray-500 text-sm py-2 sm:text-base mb-6 gap-1 sm:gap-1">
    {items.map((item, index) => (
      <React.Fragment key={index}>
        <span
          className={`cursor-pointer text-sm ${index === items.length - 1 ? 'text-gray-800' : 'hover:text-orange-600 text-gray-800'}`}
        >
          {item}
        </span>
        {index < items.length - 1 && (
          <RightOutlined className="mx-1 sm:mx-2 text-xs" />
        )}
      </React.Fragment>
    ))}
  </div>
);

const NewsContent: React.FC<NewsContentProps> = ({
  mainArticle,
  relatedArticles,
  sidebarArticles,
  currentPage,
  articlesPerPage,
  onPageChange,
  titleLevel,
  categoryName, 
}) => {
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = relatedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="mt-3">
      <div className="">
        <Breadcrumb
          items={['Trang chủ', 'Tin Tức', categoryName]} 
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {mainArticle ? (
              <MainArticle article={mainArticle} titleLevel={titleLevel} />
            ) : (
              <div>Không có bài viết nào để hiển thị</div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentArticles.length > 0 ? (
                currentArticles.map((article, index) => (
                  <ArticleCard key={index} article={article} />
                ))
              ) : (
                <div>Không có bài viết liên quan</div>
              )}
            </div>
            {relatedArticles.length > 0 && (
              <div className="flex justify-center mt-6">
                <Pagination
                  current={currentPage}
                  pageSize={articlesPerPage}
                  total={relatedArticles.length}
                  onChange={onPageChange}
                  showSizeChanger={false}
                  className="text-center"
                />
              </div>
            )}
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center text-orange-600 font-medium mb-2 text-lg">
                <FileTextOutlined className="mr-2" />
                Tin tức Liên Quan
              </div>
              <List
                dataSource={sidebarArticles}
                renderItem={(item, index) => (
                  <List.Item
                    className="border-none px-0 py-3 cursor-pointer hover:bg-blue-50 transition-colors rounded"
                    style={{
                      borderBottom: index < sidebarArticles.length - 1 ? '1px solid #f0f0f0' : 'none',
                    }}
                  >
                    <Link href={`/posts/${item.slug}`}>
                      <Text className="text-gray-700 hover:text-blue-600 leading-relaxed text-sm">
                        {item.title}
                      </Text>
                    </Link>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticleLayout: React.FC = () => {
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [titleLevel, setTitleLevel] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<string>('1');
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const articlesPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?locale=${locale}`);
        if (!postsResponse.ok) throw new Error('Failed to fetch posts');
        const postsData = await postsResponse.json();
        setPosts(postsData.data.posts);

        const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post-categories?locale=${locale}`);
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.data['post-categories']);
      } catch (error) {
        message.error('Error fetching data: ' + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  useEffect(() => {
    const handleResize = () => {
      setTitleLevel(window.innerWidth < 640 ? 4 : 3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') 
      .replace(/(^-|-$)/g, ''); 
  };

  const tabItems = categories.map((category, index) => {
    const categoryPosts = posts.filter(post =>
      post.categories.some(cat => cat.id === category.id)
    );

    if (categoryPosts.length === 0) {
      return {
        key: (index + 1).toString(),
        label: category.name,
        children: (
          <div className="bg-gray-50 min-h-screen mt-3">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Không có bài viết nào trong danh mục này"
              className="text-center text-gray-600 py-10"
            />
          </div>
        ),
      };
    }

    const mainArticle: Article | null = categoryPosts.length > 0 ? {
      title: categoryPosts[0].title,
      excerpt: categoryPosts[0].summary,
      date: categoryPosts[0].published_at || 'N/A',
      image: categoryPosts[0].featured_image,
      isNew: categoryPosts[0].is_featured,
      slug: categoryPosts[0].slug || generateSlug(categoryPosts[0].title),
    } : null;

    const relatedArticles: Article[] = categoryPosts.length > 1 ? categoryPosts.slice(1).map(post => ({
      title: post.title,
      isNew: post.is_featured,
      image: post.featured_image,
      date: post.published_at || 'N/A',
      excerpt: post.summary,
      slug: post.slug || generateSlug(post.title),
    })) : [];

    const sidebarArticles = categoryPosts.length > 1 ? categoryPosts.slice(1, 6).map(post => ({
      title: post.title,
      isNew: post.is_featured,
      slug: post.slug || generateSlug(post.title),
      excerpt: post.summary || '',
      date: post.published_at || 'N/A',
      image: post.featured_image || '',
    })) : [];

    function handlePageChange(page: number): void {
      setCurrentPage(page);
    }

    return {
      key: (index + 1).toString(),
      label: category.name,
      children: (
        <NewsContent
          mainArticle={mainArticle}
          relatedArticles={relatedArticles}
          sidebarArticles={sidebarArticles}
          currentPage={currentPage}
          articlesPerPage={articlesPerPage}
          onPageChange={handlePageChange}
          titleLevel={titleLevel}
          categoryName={category.name} 
        />
      ),
    };
  });

  return (
    <div className="mt-20 max-w-7xl mx-auto px-6">
      {loading ? <Skeleton active paragraph={{ rows: 10 }} /> : (
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="article-tabs"
        />
      )}
    </div>
  );
};

export default ArticleLayout;