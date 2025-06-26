import React, { useState, useEffect } from 'react';
import { Typography, List, Tag, Button, Pagination, message, Skeleton, Empty } from 'antd';
import { CalendarOutlined, RightOutlined, FileTextOutlined, ShareAltOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { Post, Article } from '@/types/posts/postDetail';

const { Title, Text, Paragraph } = Typography;

export default function ArticleDetailLayout() {
  const locale = useLocale();
  const params = useParams();
  const slug = params.postSlug as string;
  const [titleLevel, setTitleLevel] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [article, setArticle] = useState<Post | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [sidebarArticles, setSidebarArticles] = useState<{ title: string; isNew: boolean; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const articlesPerPage = 2;

  useEffect(() => {
    const handleResize = () => {
      setTitleLevel(window.innerWidth < 640 ? 3 : 2);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}?locale=${locale}`);
        if (!response.ok) throw new Error('Failed to fetch article');
        const data = await response.json();
        if (data.status === 'success') {
          setArticle(data.data);
        } else {
          throw new Error(data.message || 'Error fetching article');
        }

        const relatedResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?locale=${locale}`);
        if (!relatedResponse.ok) throw new Error('Failed to fetch related articles');
        const relatedData = await relatedResponse.json();
        const posts: Post[] = relatedData.data.posts || [];

        let filteredPosts = posts
          .filter(post => post.slug !== slug && post.is_featured)
          .slice(0, 4);

        if (filteredPosts.length < 4) {
          const categoryMatches = posts
            .filter(
              post =>
                post.slug !== slug &&
                !filteredPosts.some(fp => fp.id === post.id) &&
                post.categories.some(cat => data.data.categories.some(C => C.id === cat.id))
            )
            .slice(0, 4 - filteredPosts.length);
          filteredPosts = [...filteredPosts, ...categoryMatches];
        }

        if (filteredPosts.length < 4) {
          const recentPosts = posts
            .filter(
              post => post.slug !== slug && !filteredPosts.some(fp => fp.id === post.id)
            )
            .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
            .slice(0, 4 - filteredPosts.length);
          filteredPosts = [...filteredPosts, ...recentPosts];
        }

        const related = filteredPosts.map(post => ({
          title: post.title,
          date: post.published_at || 'N/A',
          image: post.featured_image || '/placeholder.jpg',
          excerpt: post.summary,
          isNew: post.is_featured,
          slug: post.slug,
        }));
        setRelatedArticles(related);
        console.log('relatedArticles:', related);

        const sidebar = posts
          .filter(post => post.slug !== slug)
          .slice(0, 6)
          .map(post => ({
            title: post.title,
            isNew: post.is_featured,
            slug: post.slug,
          }));
        setSidebarArticles(sidebar);
        setCurrentPage(1);
      } catch (error) {
        message.error('Error fetching data: ' + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (slug && locale) {
      fetchArticle();
    }
  }, [slug, locale]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = relatedArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  console.log('currentArticles:', currentArticles);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        message.success('Đã sao chép liên kết bài viết!');
      })
      .catch(() => {
        message.error('Không thể sao chép liên kết. Vui lòng thử lại.');
      });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen mt-16">
        <div className="container mx-auto md:px-6 px-4 py-6 max-w-7xl">
          <Skeleton active paragraph={{ rows: 10 }} />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-gray-50 min-h-screen mt-16">
        <div className="container mx-auto md:px-6 px-4 py-6 max-w-7xl">
          <Empty description="Không tìm thấy bài viết." />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen mt-16">
      <div className="container mx-auto md:px-6 px-4 py-6 max-w-7xl">
        <div className="flex flex-wrap items-center text-gray-500 text-sm sm:text-sm mb-8 gap-1 py-2">
          <Link href={`/`} className="cursor-pointer hover:text-orange-600">Trang chủ</Link>
          <RightOutlined className="mx-1 sm:mx-2 text-xs" />
          <Link href={`/posts`} className="cursor-pointer hover:text-orange-600">Tin Tức</Link>
          <RightOutlined className="mx-1 sm:mx-2 text-xs" />
          <span className="text-gray-800">Chi tiết bài viết</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div>
                <Title level={4} className="!text-lg md:!text-xl mb-4 leading-tight">
                  {article.title}
                </Title>
                <Paragraph className="text-lg text-gray-600 font-medium">
                  {article.summary}
                </Paragraph>
                <div className="flex flex-wrap items-center justify-between border-gray-200 border-t pt-4 mb-6">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarOutlined className="mr-2" />
                      <span>{article.published_at}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Text className="text-sm text-gray-500 mr-2">Chia sẻ:</Text>
                    <Button type="text" icon={<ShareAltOutlined />} className="text-gray-600" onClick={handleShare} />
                  </div>
                </div>
                <div className="mb-6">
                  <Image
                    src={article.featured_image || '/placeholder.jpg'}
                    alt={article.title}
                    width={600}
                    height={300}
                    className="w-full h-60 md:h-90 rounded-2xl object-cover"
                  />
                </div>
              </div>
              <div className="prose max-w-none mb-8">
                <div className="text-gray-700 leading-relaxed">
                  {parse(DOMPurify.sanitize(article.content))}
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-4 md:pt-6 md:mb-6 flex flex-col md:flex-row gap-2 md:gap-0">
                <Text className="text-gray-600 font-medium text-sm md:text-base mb-2 md:mb-3 md:mr-3">Tags:</Text>
                <div>
                  {article.categories.map((category, index) => (
                    <Tag key={index} className="cursor-pointer hover:!border-orange-500 !px-2">
                      {category.name}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center text-2xl py-6 text-orange-600 font-medium">
                Tin tức nổi bật
              </div>
              {currentArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentArticles.map((article, index) => (
                    <Link key={index} href={`/posts/${article.slug}`} className="cursor-pointer group">
                      <div className="mb-3">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={300}
                          height={240}
                          className="w-full h-60 object-cover rounded-2xl group-hover:opacity-90 transition-opacity"
                        />
                      </div>
                      <Title level={5} className="mb-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </Title>
                      <div className="flex items-center text-gray-500 text-sm">
                        <CalendarOutlined className="mr-1" />
                        <span>{article.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <Empty description="Không có bài viết nổi bật nào." />
              )}
              {relatedArticles.length > 0 && (
                <div className="flex justify-center mt-6">
                  <Pagination
                    current={currentPage}
                    pageSize={articlesPerPage}
                    total={relatedArticles.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    className="text-center"
                  />
                </div>
              )}
            </div>
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
                    style={{ borderBottom: index < sidebarArticles.length - 1 ? '1px solid #f0f0f0' : 'none' }}
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
}