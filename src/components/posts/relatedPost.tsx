"use client";

import { useState } from "react";
import { Button, ConfigProvider, Typography } from "antd";
import Image from "next/image";

const { Title, Paragraph, Text } = Typography;

interface Post {
    slug: string;
    title: string;
    description: string;
    content: string;
    image: string;
    categories: number[];
    createdAt?: string;
}

const hardcodedPosts: Post[] = [
    {
        slug: "le-hoi-trai-cay-ong-de-2025",
        title: "Lễ hội trái cây Ông Đề 2025 – Khám phá hương vị miền Tây",
        description: "Lễ hội trái cây Ông Đề 2025 sẽ diễn ra tại Làng du lịch sinh thái Ông Đề, Cần Thơ, mang đến trải nghiệm thưởng thức trái cây tươi ngon và văn hóa sông nước đặc sắc...",
        content: "",
        createdAt: "14/5/2025 17:43:55",
        image: "https://placehold.co/200x200",
        categories: []
    },
    {
        slug: "tour-du-lich-sinh-thai-ong-de",
        title: "Ra mắt tour du lịch sinh thái khám phá Ông Đề 2024",
        description: "Làng du lịch sinh thái Ông Đề giới thiệu tour trải nghiệm chèo xuồng, tham quan vườn trái cây và thưởng thức ẩm thực miền Tây tại Cần Thơ...",
        content: "",
        createdAt: "14/5/2025 17:43:55",
        image: "https://placehold.co/200x200",
        categories: []
    },
    {
        slug: "khuyen-mai-giam-gia-homestay",
        title: "Ưu đãi 30% cho đặt phòng homestay tại Ông Đề",
        description: "Chương trình khuyến mãi giảm giá 30% cho khách đặt phòng homestay tại Làng du lịch sinh thái Ông Đề từ nay đến hết 30/6/2025...",
        content: "",
        createdAt: "14/5/2025 17:43:55",
        image: "https://placehold.co/120x120",
        categories: []
    },
    {
        slug: "hoat-dong-trai-nghiem-van-hoa",
        title: "Trải nghiệm làm bánh dân gian tại Làng du lịch Ông Đề",
        description: "Tham gia workshop làm bánh xèo và bánh lá mơ tại Làng du lịch sinh thái Ông Đề, tìm hiểu văn hóa ẩm thực Nam Bộ...",
        content: "",
        createdAt: "14/5/2025 17:43:55",
        image: "https://placehold.co/120x120",
        categories: []
    },
    {
        slug: "chuong-trinh-trong-cay-xanh",
        title: "Chương trình trồng cây xanh bảo vệ môi trường tại Ông Đề",
        description: "Làng du lịch sinh thái Ông Đề tổ chức hoạt động trồng cây xanh, góp phần bảo vệ môi trường và phát triển du lịch bền vững...",
        content: "",
        createdAt: "14/5/2025 17:43:55",
        image: "https://placehold.co/120x120",
        categories: []
    },
    {
        slug: "le-hoi-tha-den-hoa-dang",
        title: "Lễ hội thả đèn hoa đăng tại kênh Ông Đề",
        description: "Tham gia lễ hội thả đèn hoa đăng lung linh trên kênh Ông Đề, mang đến không khí huyền ảo và cầu chúc may mắn...",
        content: "",
        createdAt: "14/5/2025 17:43:55",
        image: "https://placehold.co/120x120",
        categories: []
    }
];

export default function Posts() {
    const [posts] = useState<Post[]>(hardcodedPosts);

    const handleViewDetails = (slug: string) => {
    };

    const getImageUrl = (post: Post): string => {
        return post.image || "https://placehold.co/50x50";
    };

    return (
        <ConfigProvider>
            <div className="relative overflow-hidden mt-24 mb-10">
                <div className="max-w-7xl mx-auto z-10 relative md:px-6 px-4">
                    <div className="text-center mb-14">
                        <Title level={1} className="!text-xl md:!text-3xl !leading-tight !mb-0">
                            Tin tức và sự kiện mới nhất
                        </Title>
                    </div>

                    {posts.length === 0 ? (
                        <div className="flex justify-center items-center h-64 text-gray-800">
                            <Text className="!text-gray-800">Không có bài viết nào.</Text>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {posts[0] && (
                                <div
                                    className="md:col-span-1 overflow-hidden cursor-pointer"
                                    onClick={() => handleViewDetails(posts[0].slug)}
                                >
                                    <Image
                                        src={getImageUrl(posts[0])}
                                        alt={posts[0]?.title || ""}
                                        width={400}
                                        height={192}
                                        className="w-full object-cover h-48 rounded-xl"
                                    />
                                    <div className="pt-4">
                                        <Title level={3} className="!text-lg !font-medium !text-gray-900 !mb-2">
                                            {posts[0]?.title}
                                        </Title>
                                        <Paragraph className="!text-[15px] !text-gray-800 !mb-2">
                                            {posts[0]?.description?.substring(0, 150)}...
                                        </Paragraph>
                                        <Text className="!text-[15px] !text-gray-600 !mb-2">
                                            {posts[0]?.createdAt}
                                        </Text>
                                    </div>
                                </div>
                            )}

                            {posts[1] && (
                                <div
                                    className="md:col-span-1 overflow-hidden cursor-pointer"
                                    onClick={() => handleViewDetails(posts[1].slug)}
                                >
                                    <Image
                                        src={getImageUrl(posts[1])}
                                        alt={posts[1]?.title || ""}
                                        width={400}
                                        height={192}
                                        className="w-full object-cover h-48 rounded-xl"
                                    />
                                    <div className="pt-4">
                                        <Title level={4} className="!text-lg !font-medium !text-gray-900 !mb-2">
                                            {posts[1]?.title}
                                        </Title>
                                        <Paragraph className="!text-[15px] !text-gray-800 !mb-2">
                                            {posts[1]?.description?.substring(0, 100)}...
                                        </Paragraph>
                                        <Text className="!text-[15px] !text-gray-600 !mb-2">
                                            {posts[0]?.createdAt}
                                        </Text>
                                    </div>
                                </div>
                            )}

                            {posts.length >= 2 && (
                                <div className="md:col-span-1">
                                    {posts.slice(2, 6).map((post, index) => (
                                        <div
                                            key={post.slug || index}
                                            className="overflow-hidden mb-2 flex gap-3 cursor-pointer hover:bg-gray-100 transition-colors rounded-lg"
                                            onClick={() => handleViewDetails(post.slug)}
                                        >
                                            <div className="w-4/6">
                                                <Image
                                                    src={getImageUrl(post)}
                                                    alt={post.title}
                                                    width={400}
                                                    height={192}
                                                    className="w-full h-22 object-cover rounded-xl"
                                                />
                                            </div>
                                            <div className="w-3/5">
                                                <Text className="!text-[15px] !font-medium !text-gray-800 line-clamp-3">
                                                    {post.title}
                                                </Text>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {posts.length > 0 && (
                        <div className="p-1 mt-10 flex justify-center text-center mx-auto rounded-lg text-white">
                            <Button className="!bg-green-600 !text-white !font-medium !py-5 !px-12 !rounded-full hover:!bg-green-700 hover:!border-green-700">
                                Xem thêm tin tức
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </ConfigProvider>
    );
}