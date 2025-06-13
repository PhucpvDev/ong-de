import React, { useState, useEffect } from 'react';
import {  Typography, List, Tag, Button, Pagination, message } from 'antd';
import { CalendarOutlined, RightOutlined, FileTextOutlined, ShareAltOutlined} from '@ant-design/icons';
import { IMAGES } from '@/constants/theme';
import Image from 'next/image';

const { Title, Text, Paragraph } = Typography;

export default function ArticleDetailLayout () {
    const [titleLevel, setTitleLevel] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 2;

    useEffect(() => {
        const handleResize = () => {
            setTitleLevel(window.innerWidth < 640 ? 3 : 2);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const articleData = {
        title: "Làng du lịch Ông Đề - Khám phá văn hóa sông nước độc đáo tại Cần Thơ",
        excerpt: "Làng du lịch Ông Đề tại Cần Thơ mang đến trải nghiệm độc đáo với các hoạt động tham quan rừng ngập mặn, thưởng thức ẩm thực miền Tây, và khám phá văn hóa sông nước. Đây là điểm đến lý tưởng cho du khách yêu thiên nhiên và văn hóa địa phương.",
        date: "06/06/2025 14:01:32",
        author: "Đội ngũ Làng du lịch Ông Đề",
        views: "1,234",
        category: "Tin tức về Làng du lịch Ông Đề",
        tags: ["Rừng ngập mặn", "Văn hóa sông nước", "Ẩm thực miền Tây", "Cần Thơ"],
        image: IMAGES.Sr_tro_choi1,
    };

    const articleContent = `
    <h2>Làng du lịch Ông Đề là gì?</h2>
    <p>Làng du lịch Ông Đề là một điểm đến du lịch sinh thái và văn hóa tại Cần Thơ, nổi bật với các hoạt động trải nghiệm sông nước, tham quan rừng ngập mặn, và thưởng thức các món ăn đặc sản miền Tây.</p>
    
    <p>Các hoạt động nổi bật tại Làng du lịch Ông Đề bao gồm:</p>
    <ul>
      <li>Tham quan rừng ngập mặn bằng thuyền, khám phá hệ sinh thái độc đáo</li>
      <li>Thưởng thức ẩm thực miền Tây với các món như bánh xèo, cá lóc nướng trui</li>
      <li>Trải nghiệm văn hóa địa phương qua các hoạt động dân gian như đờn ca tài tử</li>
      <li>Lưu trú tại các homestay thân thiện với môi trường</li>
    </ul>
  `;

    const relatedArticles = [
        {
            title: "Khám phá rừng ngập mặn tại Làng du lịch Ông Đề - Hành trình gần gũi thiên nhiên",
            date: "05/06/2025 10:30:00",
            image: IMAGES.Sr_le_hoi,
        },
        {
            title: "Ẩm thực sông nước tại Làng du lịch Ông Đề - Hương vị đậm đà miền Tây",
            date: "04/06/2025 09:15:00",
            image: IMAGES.Sr_bat_ca,
        },
        {
            title: "Trải nghiệm chèo thuyền khám phá kênh rạch tại Làng du lịch Ông Đề",
            date: "03/06/2025 14:45:00",
            image: IMAGES.Sr_vuon_trai_cay,
        },
        {
            title: "Lễ hội văn hóa sông nước tại Làng du lịch Ông Đề 2025",
            date: "02/06/2025 11:20:00",
            image: IMAGES.Sr_dem_trang,
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

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = relatedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    const handlePageChange = (page) => {
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

    return (
        <div className="bg-gray-50 min-h-screen mt-16">
            <div className="container mx-auto md:px-6 px-4 py-6 max-w-7xl">
                <div className="flex flex-wrap items-center text-gray-500 text-sm sm:text-base mb-6 gap-1">
                    <span className="cursor-pointer hover:text-blue-600">Trang chủ</span>
                    <RightOutlined className="mx-1 sm:mx-2 text-xs" />
                    <span className="cursor-pointer hover:text-blue-600">Tin Tức</span>
                    <RightOutlined className="mx-1 sm:mx-2 text-xs" />
                    <span className="text-gray-800">Chi tiết bài viết</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <div className="mb-6">
                                <Title level={titleLevel} className="text-gray-800 mb-4 leading-tight">
                                    {articleData.title}
                                </Title>

                                <Paragraph className="text-lg text-gray-600 font-medium">
                                    {articleData.excerpt}
                                </Paragraph>

                                <div className="flex flex-wrap items-center justify-between border-gray-200 py-4">
                                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <CalendarOutlined className="mr-2" />
                                            <span>{articleData.date}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Text className="text-sm text-gray-500 mr-2">Chia sẻ:</Text>
                                        <Button type="text" icon={<ShareAltOutlined />} className="text-gray-600" onClick={handleShare} />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <Image
                                        src={articleData.image}
                                        alt="Main Article Image"
                                        width={600}
                                        height={300}
                                        className="w-full h-60 md:h-90 rounded-2xl object-cover"
                                    />
                                </div>
                            </div>

                            <div className="prose max-w-none mb-8">
                                <div
                                    className="text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: articleContent }}
                                />
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-4 md:pt-6 md:mb-6 flex flex-col md:flex-row gap-2 md:gap-0">
                                <Text className="text-gray-600 font-medium text-sm md:text-base mb-2 md:mb-3 md:mr-3">Tags:</Text>
                                <div className="flex flex-wrap gap-2">
                                    {articleData.tags.map((tag, index) => (
                                        <Tag key={index} className="cursor-pointer hover:border-blue-500 text-xs md:text-sm">
                                            {tag}
                                        </Tag>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center text-2xl text-orange-600 font-medium mb-4">
                                Tin tức mới nhất
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {currentArticles.map((article, index) => (
                                    <div key={index} className="cursor-pointer group">
                                        <div className="mb-3">
                                            <Image
                                                width={300}
                                                src={article.image}
                                                alt={article.title}
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
