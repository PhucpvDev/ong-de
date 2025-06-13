"use client";
import React from 'react';
import { Typography, Card } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

export default function OngDeEcotourismSection() {
    const achievements = [
        {
            text: "Điểm đến du lịch sinh thái hàng đầu tại Phong Điền, Cần Thơ, thu hút hàng ngàn du khách mỗi năm.",
        },
        {
            text: "Gìn giữ và lan tỏa văn hóa miền Tây qua các hoạt động dân dã và trải nghiệm sông nước độc đáo.",
        },
        {
            text: "Phát triển du lịch bền vững, kết nối cộng đồng địa phương với thiên nhiên và văn hóa bản địa.",
        },
    ];

    return (
        <div className="max-w-6xl md:px-6 px-1 mx-auto py-8 -mb-[600px] md:py-16">
            <Title
                className="text-gray-800 max-w-7xl md:px-0 px-5 mx-auto pb-8 sm:pb-16 text-lg text-center sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight"
            >
                <span className='text-gray-700'>Làng Du Lịch Sinh Thái</span> <span className='text-orange-500'>Ông Đề</span>
            </Title>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">
                <div className="relative p-2 order-first sm:order-first lg:order-none">
                    <div className="relative rounded-3xl overflow-hidden bg-white">
                        <Image
                            src="https://ongde.vn/wp-content/uploads/2022/03/gioi-thieu-209.jpg"
                            alt="Ông Đề Ecotourism Village in Cần Thơ"
                            className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover"
                            width={600}
                            height={300}
                        />
                    </div>
                </div>

                <div className="max-w-lg space-y-6 sm:space-y-8 rounded-lg z-10 px-4 sm:px-0 order-last sm:order-last lg:order-none">
                    <div>
                        <Paragraph className="text-gray-600 text-sm sm:text-base mb-4 font-medium">
                            Tọa lạc tại xã Mỹ Khánh, huyện Phong Điền, cách trung tâm Cần Thơ chỉ 7km, Làng Du Lịch Sinh Thái Ông Đề là điểm đến lý tưởng để khám phá vẻ đẹp thiên nhiên và văn hóa miền Tây. Với không gian xanh mát trải rộng 2,5 ha, Ông Đề mang đến trải nghiệm gần gũi, đậm chất sông nước.
                        </Paragraph>
                        <Title
                            level={4}
                            className="text-xl sm:text-2xl lg:text-4xl font-bold text-green-600 leading-tight mb-6"
                        >
                            "Ông Đề – Nơi lưu giữ tinh hoa văn hóa và thiên nhiên Cần Thơ."
                        </Title>
                    </div>
                    <div>
                        <Paragraph className="text-gray-700 text-sm sm:text-base mb-6 font-medium">
                            Ông Đề cam kết mang đến những trải nghiệm độc đáo, gắn kết du khách với văn hóa và thiên nhiên:
                        </Paragraph>
                        <div className="space-y-4">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <span className="text-green-500 text-lg sm:text-xl"><CheckCircleOutlined /></span>
                                    </div>
                                    <Paragraph className="text-gray-700 text-sm sm:text-base leading-relaxed mb-0 flex-1">
                                        {achievement.text}
                                    </Paragraph>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative bg-white md:block hidden rounded-lg -top-152 h-[520px] left-125 p-6 pl-20"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center mt-8 sm:mt-0 lg:-mt-[570px]">
                <div className="max-w-lg space-y-6 sm:space-y-0 lg:space-y-8 bg-white rounded-lg z-10 px-                    px-4 sm:px-0 order-last sm:order-first lg:order-none">
                    <div>
                        <Paragraph className="text-gray-600 text-sm sm:text-base mb-4 font-medium">
                            Du khách đến Ông Đề sẽ được hòa mình vào các hoạt động dân dã như tát mương bắt cá, chèo xuồng ba lá trên kênh rạch, hay thưởng thức các món ăn miền Tây đậm đà. Không gian xanh mát với những tiểu cảnh sống động là nơi lý tưởng để lưu giữ những khoảnh khắc đáng nhớ.
                        </Paragraph>
                        <Title
                            level={4}
                            className="text-xl sm:text-2xl lg:text-4xl font-bold text-green-600 leading-tight mb-6"
                        >
                            "Khám phá miền Tây chân thực, trải nghiệm khó quên tại Ông Đề."
                        </Title>
                    </div>
                    <div>
                        <Paragraph className="text-gray-700 text-sm sm:text-base mb-6 font-medium">
                            Ông Đề tự hào mang đến những giá trị cốt lõi:
                        </Paragraph>
                        <div className="space-y-4">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <span className="text-green-500 text-lg sm:text-xl"><CheckCircleOutlined /></span>
                                    </div>
                                    <Paragraph className="text-gray-700 text-sm sm:text-base leading-relaxed mb-0 flex-1">
                                        {achievement.text}
                                    </Paragraph>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative p-2 order-first sm:order-last lg:order-none">
                    <div className="relative rounded-3xl overflow-hidden bg-white">
                        <Image
                            src="https://ongde.vn/wp-content/uploads/2022/03/gioi-thieu-209-4.jpg"
                            alt="Ông Đề Ecotourism Village in Cần Thơ"
                            className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover"
                            width={600}
                            height={300}
                        />
                    </div>
                </div>
                <div className="relative md:block hidden bg-white rounded-lg -top-152 h-[520px] left-25 p-6 pl-20"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center mt-8 sm:mt-0 lg:-mt-[570px]">
                <div className="relative p-2 order-first sm:order-first lg:order-none">
                    <div className="relative rounded-3xl overflow-hidden bg-white">
                        <Image
                            src="https://ongde.vn/wp-content/uploads/2022/03/gioi-thieu-209.jpg"
                            alt="Ông Đề Ecotourism Village in Cần Thơ"
                            className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover"
                            width={600}
                            height={300}
                        />
                    </div>
                </div>

                <div className="max-w-lg space-y-6 sm:space-y-8 rounded-lg z-10 px-4 sm:px-0 order-last sm:order-last lg:order-none">
                    <div>
                        <Paragraph className="text-gray-600 text-sm sm:text-base mb-4 font-medium">
                            Tọa lạc tại xã Mỹ Khánh, huyện Phong Điền, cách trung tâm Cần Thơ chỉ 7km, Làng Du Lịch Sinh Thái Ông Đề là điểm đến lý tưởng để khám phá vẻ đẹp thiên nhiên và văn hóa miền Tây. Với không gian xanh mát trải rộng 2,5 ha, Ông Đề mang đến trải nghiệm gần gũi, đậm chất sông nước.
                        </Paragraph>
                        <Title
                            level={4}
                            className="text-xl sm:text-2xl lg:text-4xl font-bold text-green-600 leading-tight mb-6"
                        >
                            "Ông Đề – Nơi lưu giữ tinh hoa văn hóa và thiên nhiên Cần Thơ."
                        </Title>
                    </div>
                    <div>
                        <Paragraph className="text-gray-700 text-sm sm:text-base mb-6 font-medium">
                            Ông Đề cam kết mang đến những trải nghiệm độc đáo, gắn kết du khách với văn hóa và thiên nhiên:
                        </Paragraph>
                        <div className="space-y-4">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <span className="text-green-500 text-lg sm:text-xl"><CheckCircleOutlined /></span>
                                    </div>
                                    <Paragraph className="text-gray-700 text-sm sm:text-base leading-relaxed mb-0 flex-1">
                                        {achievement.text}
                                    </Paragraph>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative bg-white md:block hidden rounded-lg -top-152 h-[520px] left-125 p-6 pl-20"></div>
            </div>
        </div>
    );
}