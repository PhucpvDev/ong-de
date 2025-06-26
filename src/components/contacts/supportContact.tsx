import React from 'react';
import { Card, Typography } from 'antd';
import {
    MailOutlined,
    PhoneOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import { useLocale } from 'next-intl';

const { Title, Text } = Typography;

export default function SupportContactSection() {
    const locale = useLocale()

    const contactItems = [
        {
            icon: <MailOutlined className="!text-white !text-2xl" />,
            bgColor: 'bg-green-500',
            title: 'hotro@ongde.com',
            subtitle: 'Email',
            iconBg: 'bg-green-600'
        },
        {
            icon: <PhoneOutlined className="!text-white !text-2xl" />,
            bgColor: 'bg-blue-500',
            title: '0931852113',
            subtitle: 'Nhân viên tư vấn',
            iconBg: 'bg-blue-600'
        },
        {
            icon: <GlobalOutlined className="!text-white !text-2xl" />,
            bgColor: 'bg-orange-500',
            title: 'www.hotro.ongde.vn',
            subtitle: 'Website',
            iconBg: 'bg-orange-600'
        }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto py-8">
            <div className="text-center mb-8">
                <Title level={2} className="!text-xl md:!text-3xl py-5">
                    {locale === "vi" ? (
                        <>Tư vấn và hỗ trợ trực tuyến - <span className="text-orange-500">Ông Đề Support</span></>
                    ) : locale === "en" ? (
                        <>Online Consultation and Support - <span className="text-orange-500">Ong De Support</span></>
                    ) : locale === "zh" ? (
                        <>在线咨询与支持 - <span className="text-orange-500">翁德支持</span></>
                    ) : locale === "ko" ? (
                        <>온라인 상담 및 지원 - <span className="text-orange-500">옹 데 지원</span></>
                    ) : (
                        <>Online Consultation and Support - <span className="text-orange-500">Ong De Support</span></>
                    )}
                </Title>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactItems.map((item, index) => (
                    <Card
                        key={index}
                        className="!border-1 !border-gray-100 !shadow-lg !rounded-xl !overflow-hidden !bg-white hover:!shadow-xl !transition-shadow !duration-300"
                        bodyStyle={{ padding: 0 }}
                    >
                        <div className="p-6 text-center">
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${item.bgColor} shadow-md`}>
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.iconBg}`}>
                                    {item.icon}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Text
                                    strong
                                    className="!text-gray-800 !text-base !block !font-semibold"
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    className="!text-gray-600 !font-medium !text-sm !block"
                                >
                                    {item.subtitle}
                                </Text>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
