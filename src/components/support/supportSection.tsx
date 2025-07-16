import React from 'react';
import { Row, Col, Typography } from 'antd';
import Image from 'next/image';

const { Title, Text } = Typography;

export default function SupportSection() {
    const supportItems = [
        {
            id: 1,
            image: 'https://placehold.co/50x50', 
            title: 'Hướng Dẫn Đặt Tour Làng Du Lịch Ông Đề',
        },
        {
            id: 2,
            image: 'https://placehold.co/50x50',
            title: 'Hotline Hỗ Trợ: 090xxxxxxx',
        },
        {
            id: 3,
            image: 'https://placehold.co/50x50',
            title: 'Email: info@langdulichongde.vn',
        },
        {
            id: 4,
            image: 'https://placehold.co/50x50',
            title: 'Thông Tin Hoạt Động Tại Làng Du Lịch',
        },
    ];

    return (
        <div className="bg-green-50 py-8 sm:py-12 md:py-16 px-4 mt-8 sm:mt-10 md:mt-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <div className="flex items-center justify-center mb-4 sm:mb-6">
                        <Image
                            src="https://placehold.co/50x50"
                            width={50}
                            height={50}
                            alt="Làng Du Lịch Ông Đề Icon"
                            className="rounded-full w-12 h-12 object-cover"
                            quality={90}
                        />
                    </div>
                    <Title level={2} className="mb-0 text-xl sm:text-2xl md:text-3xl font-bold">
                        Liên hệ hỗ trợ Làng Du Lịch Sinh Thái Ông Đề Cần Thơ
                    </Title>
                    <Text className="text-base sm:text-lg max-w-3xl sm:max-w-4xl mx-auto leading-relaxed">
                        Bạn cần hỗ trợ về tham quan hoặc đặt tour? Liên hệ qua nút Đặt Tour, gọi hotline 090xxxxxxx, hoặc email info@langdulichongde.vn.
                    </Text>
                </div>

                <Row gutter={[16, 16]} className="justify-center">
                    {supportItems.map((item) => (
                        <Col key={item.id} xs={24} sm={12} md={6} lg={6}>
                            <div className="text-center mx-auto cursor-pointer transition-all duration-300 hover:transform hover:scale-105">
                                <div className="mb-4 sm:mb-6 flex flex-col items-center">
                                    <Image
                                        src={item.image}
                                        width={50}
                                        height={50}
                                        alt={item.title}
                                        className="rounded-full w-12 h-12 object-cover"
                                        quality={90}
                                    />
                                    <Text className="mt-2 text-sm sm:text-base md:text-lg font-medium leading-tight">
                                        {item.title}
                                    </Text>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}