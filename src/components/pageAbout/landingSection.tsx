import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Typography, Card } from 'antd';
import { IMAGES } from '@/constants/theme';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

export default function LandingPage() {
    return (
        <div className="relative mx-auto md:px-6 px-3 md:mt-0 mt-[600px] mb-10">
            <div className="absolute inset-0 -z-10 mt-50">
                <Image
                    alt="Ảnh nền Làng Du Lịch Ông Đề"
                    src="https://res.klook.com/image/upload/v1488362758/aboutus/mission-bg.png"
                    className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover"
                    width={600}
                    height={300}
                />
            </div>
            <Title
                className="text-gray-800 pb-8 py-16 sm:pb-16 text-lg text-center sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight"
            >
                <span className='text-gray-700'>Giới thiệu đôi nét về</span> <span className='text-orange-500'>Ông Đề</span>
            </Title>
            <div className="space-y-8 max-w-6xl mx-auto">
                <div className="bg-blue-50 rounded-4xl md:p-8 p-4">
                    <div className="grid md:grid-cols-2 gap-8 items-center md:py-0 py-6">
                        <div className="space-y-4">
                            <Title
                                level={4}
                                className="text-xl sm:text-2xl lg:text-4xl font-bold text-green-600 leading-tight mb-6"
                            >
                                Khám Phá Làng Du Lịch Sinh Thái Ông Đề
                            </Title>
                            <Paragraph className="text-gray-600 text-sm sm:text-base mb-4 font-medium">
                                Nằm tại xã Mỹ Khánh, huyện Phong Điền, chỉ cách trung tâm TP. Cần Thơ 7km, Làng Du Lịch Sinh Thái Ông Đề là điểm đến lý tưởng để trải nghiệm văn hóa miền Tây sông nước. Với không gian xanh mát trên diện tích 2,5 ha, du khách sẽ được hòa mình vào thiên nhiên, tham gia các hoạt động dân dã như chèo xuồng, bắt cá, và thưởng thức ẩm thực đặc sản.
                            </Paragraph>
                            <button
                                className="bg-blue-200 mt-8 hover:bg-blue-300 text-blue-900 font-medium cursor-pointer border-blue-500 rounded-full px-6 py-2 h-auto flex items-center gap-2"
                            >
                                Khám phá ngay
                                <ArrowRightOutlined style={{ fontSize: '16px' }} />
                            </button>
                        </div>
                        <div className="relative">
                            <Image
                                src="https://i.pinimg.com/736x/3b/b1/9f/3bb19ff129376197aafd7dfa331022d1.jpg"
                                alt="Sông nước tại Làng Du Lịch Ông Đề"
                                className="rounded-2xl w-full min-h-90 max-h-90"
                                width={600}
                                height={300}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 rounded-4xl md:p-8 p-4">
                    <div className="grid md:grid-cols-2 gap-8 items-center md:py-0 py-6">
                        <div className="relative">
                            <Image
                                src="https://i.pinimg.com/736x/c0/27/e4/c027e4ae29b5c771d46f39ff884815d6.jpg"
                                alt="Không gian làng quê Ông Đề"
                                className="rounded-2xl w-full min-h-90 max-h-90"
                                width={600}
                                height={300}
                            />
                        </div>
                        <div className="space-y-4">
                            <Title
                                level={4}
                                className="text-xl sm:text-2xl lg:text-4xl font-bold text-green-600 leading-tight mb-6"
                            >
                                "Ông Đề – Gìn giữ tinh hoa miền Tây sông nước."
                            </Title>
                            <Paragraph className="text-gray-600 text-sm sm:text-base mb-4 font-medium">
                                Làng Du Lịch Sinh Thái Ông Đề mang đến cho bạn cơ hội khám phá những nét đẹp truyền thống của Cần Thơ qua các hoạt động như tham quan vườn trái cây, nghe đờn ca tài tử, và thưởng thức các món ăn dân dã như bánh xèo, cá lóc nướng trui. Đây là nơi lý tưởng để thư giãn và cảm nhận sự bình yên của vùng đất Chín Rồng.
                            </Paragraph>
                            <button
                                className="bg-green-200 mt-8 hover:bg-green-300 text-green-900 font-medium cursor-pointer border-green-500 rounded-full px-6 py-2 h-auto flex items-center gap-2"
                            >
                                Tìm hiểu thêm
                                <ArrowRightOutlined style={{ fontSize: '16px' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};