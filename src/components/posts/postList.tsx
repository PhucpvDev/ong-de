import React, { useState, useEffect } from 'react';
import { Card, Typography, List, Pagination } from 'antd';
import { CalendarOutlined, RightOutlined, FileTextOutlined } from '@ant-design/icons';
import { IMAGES } from '@/constants/theme';
import Image from 'next/image';

const { Title, Text, Paragraph } = Typography;

const ArticleLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [titleLevel, setTitleLevel] = useState(3); 
  const articlesPerPage = 2;

  useEffect(() => {
    const handleResize = () => {
      setTitleLevel(window.innerWidth < 640 ? 4 : 3);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mainArticle = {
    title: "Làng du lịch Ông Đề - Trải nghiệm văn hóa sông nước độc đáo tại Cần Thơ",
    excerpt: "Làng du lịch Ông Đề mang đến trải nghiệm độc đáo với các hoạt động tham quan rừng ngập mặn, thưởng thức ẩm thực miền Tây, và tìm hiểu văn hóa địa phương. Đây là điểm đến lý tưởng cho du khách muốn khám phá vẻ đẹp Cần Thơ...",
    date: "06/06/2025 10:30:00",
    image: IMAGES.Sr_tro_choi1,
    isNew: true
  };

  const relatedArticles = [
    {
      title: "Khám phá rừng ngập mặn tại Làng du lịch Ông Đề - Hành trình gần gũi thiên nhiên",
      isNew: true,
      image: IMAGES.Sr_le_hoi,
      date: "06/06/2025 10:30:00",
    },
    {
      title: "Ẩm thực sông nước tại Làng du lịch Ông Đề - Hương vị đậm đà miền Tây",
      isNew: false,
      image: IMAGES.Sr_bat_ca,
      date: "06/06/2025 10:30:00",
    },
    {
      title: "Trải nghiệm chèo thuyền khám phá kênh rạch tại Làng du lịch Ông Đề",
      isNew: false,
      image: IMAGES.Sr_vuon_trai_cay,
      date: "06/06/2025 10:30:00",
    },
    {
      title: "Lễ hội văn hóa Chăm tại Làng du lịch Ông Đề 2025",
      isNew: true,
      image: IMAGES.Sr_dem_trang,
      date: "06/06/2025 10:30:00",
    }
  ];

  const sidebarArticles = [
    {
      title: "Làng du lịch Ông Đề ra mắt tour trải nghiệm văn hóa Chăm độc đáo",
      isNew: false
    },
    {
      title: "Tham quan Đất Mũi Cà Mau cùng Làng du lịch Ông Đề",
      isNew: false
    },
    {
      title: "Làng du lịch Ông Đề - Điểm đến lý tưởng cho kỳ nghỉ gia đình",
      isNew: false
    },
    {
      title: "Khám phá văn hóa sông nước tại Làng du lịch Ông Đề",
      isNew: false
    },
    {
      title: "Làng du lịch Ông Đề cung cấp dịch vụ lưu trú thân thiện với môi trường",
      isNew: false
    },
    {
      title: "Ưu đãi đặc biệt: Giảm 20% khi đặt tour tại Làng du lịch Ông Đề",
      isNew: false
    },
    {
      title: "Làng du lịch Ông Đề tổ chức lễ hội ẩm thực miền Tây 2025",
      isNew: false
    }
  ];

  const moreArticles = [
    {
      title: "Cập nhật thông tin du lịch tại Làng du lịch Ông Đề",
      isNew: false
    },
    {
      title: "Làng du lịch Ông Đề ra mắt dịch vụ chèo thuyền khám phá kênh rạch",
      isNew: false
    },
    {
      title: "Ưu đãi combo lưu trú và ẩm thực tại Làng du lịch Ông Đề",
      isNew: false
    },
    {
      title: "Hướng dẫn tham quan Làng du lịch Ông Đề cho khách đoàn",
      isNew: false
    }
  ];

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = relatedArticles.slice(indexOfFirstArticle, indexOfLastArticle);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-50 min-h-screen mt-16">
      <div className="container mx-auto md:px-6 px-4 py-6 max-w-7xl">
        <div className="flex flex-wrap items-center text-gray-500 text-sm sm:text-base mb-6 gap-1 sm:gap-1">
          <span className="cursor-pointer hover:text-orange-600">Trang chủ</span>
          <RightOutlined className="mx-1 sm:mx-2 text-xs" />
          <span className="cursor-pointer hover:text-orange-600">Tin Tức</span>
          <RightOutlined className="mx-1 sm:mx-2 text-xs" />
          <span className="text-gray-800">Tin tức về Làng du lịch Ông Đề</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="overflow-hidden">
              <div className="relative cursor-pointer">
                <Image
                  src={mainArticle.image}
                  alt="Main Article Image"
                  width={600}
                  height={300}
                  className="w-full h-60 md:h-90 rounded-2xl object-cover"
                />
              </div>

              <div className="py-5">
                <Title level={titleLevel as 1 | 2 | 3 | 4 | 5 | undefined} className="text-gray-800 mb-3 hover:text-blue-600 cursor-pointer">
                  {mainArticle.title}
                </Title>

                <Paragraph className="text-gray-600 mb-4 cursor-pointer">
                  {mainArticle.excerpt}
                </Paragraph>

                <div className="flex items-center text-gray-500 text-sm">
                  <CalendarOutlined className="mr-1" />
                  <span>{mainArticle.date}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentArticles.map((article, index) => (
                <div key={index} className="overflow-hidden transition-shadow">
                  <div className="relative cursor-pointer">
                    <Image
                      src={article.image}
                      alt={`Related Article ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-60 object-cover rounded-2xl"
                    />
                  </div>
                  <div className="py-4">
                    <Text className="text-gray-700 font-medium hover:text-blue-600 block cursor-pointer">
                      {article.title}
                    </Text>
                    <div className="flex items-center text-gray-500 text-sm py-2">
                      <CalendarOutlined className="mr-1" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center text-orange-600 font-medium mb-2">
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
                    <Text className="text-gray-700 hover:text-blue-600 leading-relaxed text-sm">
                      {item.title}
                    </Text>
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

export default ArticleLayout;