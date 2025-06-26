import React from 'react';
import { Card, Typography } from 'antd';
import {
    CreditCardOutlined,
    MobileOutlined,
    CalendarOutlined,
    GiftOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface RewardItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
    bgColor: string;
}

export default function RewardPackets() {
    const rewardItems: RewardItem[] = [
        {
            id: '1',
            icon: <CreditCardOutlined className="text-2xl" />,
            title: 'Tiền mặt',
            description: '+500k bằng tiền mặt hoặc chuyển khoản',
            color: 'text-blue-500',
            bgColor: 'bg-blue-50'
        },
        {
            id: '2',
            icon: <MobileOutlined className="text-2xl" />,
            title: 'Thẻ điện thoại',
            description: 'Trả thưởng hàng tuần bằng thẻ điện thoại',
            color: 'text-orange-500',
            bgColor: 'bg-orange-50'
        },
        {
            id: '3',
            icon: <CalendarOutlined className="text-2xl" />,
            title: '+ 3 ngày',
            description: 'Cộng thêm 03 ngày lưu trú tại homestay Ông Đề',
            color: 'text-green-500',
            bgColor: 'bg-green-50'
        },
        {
            id: '4',
            icon: <GiftOutlined className="text-2xl" />,
            title: '+ 500.000đ',
            description: 'Cộng thêm vào tài khoản sử dụng dịch vụ tour tại Làng Du Lịch Ông Đề',
            color: 'text-red-500',
            bgColor: 'bg-red-50'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto md:px-6 px-4 py-10 mt-10">
            <div className="bg-orange-100/80 rounded-2xl md:p-8 p-4 py-6">
                <div className="mb-10">
                    <div className="text-center">
                        <Paragraph className="text-gray-700 !text-sm md:!text-base leading-relaxed mb-4">
                            Chương trình dành riêng cho người giới thiệu "Gói Tiết Kiệm" của Làng Du Lịch Sinh Thái Ông Đề, Cần Thơ – giải pháp khám phá văn hóa miền Tây tiết kiệm và trọn vẹn. 
                            Mỗi khách hàng khi giới thiệu gói này, bao gồm 1 đêm lưu trú tại homestay nhà sàn truyền thống, trải nghiệm ẩm thực dân dã (bánh xèo, cá lóc nướng trui), 
                            và tour khám phá (chèo xuồng ba lá, tham quan vườn trái cây theo mùa), sẽ nhận ngay phần thưởng lên tới 
                            <span className="font-semibold text-blue-600"> 500.000 VNĐ/khách </span> 
                            (nhận thưởng sau khi khách mới đăng ký). Ngoài ra, Làng Du Lịch Ông Đề còn cung cấp nhiều hình thức thưởng hấp dẫn khác theo yêu cầu.
                        </Paragraph>
                    </div>
                </div>

                <Title level={3} className="md:!text-2xl !text-xl text-gray-800 text-center !mb-8">
                    Các hình thức trả thưởng theo yêu cầu
                </Title>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rewardItems.map((item) => (
                        <Card
                            key={item.id}
                            className="text-center hover:shadow-lg transition-shadow duration-300 border-0 !rounded-2xl !shadow-lg !shadow-orange-100"
                        >
                            <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                <div className={item.color}>
                                    {item.icon}
                                </div>
                            </div>

                            <Title level={4} className="!text-lg">
                                {item.title}
                            </Title>

                            <Paragraph className="text-gray-600 text-sm leading-relaxed">
                                {item.description}
                            </Paragraph>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};