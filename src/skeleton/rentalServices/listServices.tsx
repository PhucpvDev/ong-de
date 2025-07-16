import React from 'react';
import { Typography, Card, Pagination, Button, ConfigProvider } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function SkeletonServicesList() {
    return (
        <ConfigProvider>
            <div className="max-w-7xl px-4 sm:px-6 mx-auto md:pt-8 pt-5 animate-pulse">
                <div className="mb-6 sm:mb-8">
                    <Title level={2} className="!text-xl md:!text-3xl">
                        <div className="h-8 w-3/5 bg-gray-200 rounded-lg mx-auto md:mx-0"></div>
                    </Title>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Card
                            key={index}
                            className="!rounded-xl !shadow-sm !mb-1 !overflow-hidden !h-[250px] sm:!h-[330px] !flex !flex-col !bg-white !font-roboto !border-none"
                            bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', flex: 1 }}
                        >
                            <div className="!relative !flex-shrink-0">
                                <div className="!h-[120px] sm:!h-[150px] bg-gray-200 rounded-t-lg"></div>
                            </div>
                            <div className="!p-2 sm:!p-3 !flex-1 !flex !flex-col">
                                <Title level={5} className="!mb-2 !font-bold !text-xs sm:!text-sm md:!text-base">
                                    <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                                </Title>
                                <Text className="!text-xs sm:!text-sm !mb-2 !min-h-[40px] sm:!min-h-[60px]">
                                    <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                                </Text>
                                <div className="!border-t !pt-2 !border-gray-200 !flex-shrink-0">
                                    <div className="!flex !justify-between !items-baseline">
                                        <div>
                                            <div className="!flex !items-baseline !mb-1">
                                                <div className="h-4 w-10 bg-gray-200 rounded mr-1"></div>
                                                <div className="h-5 w-20 bg-gray-200 rounded"></div>
                                            </div>
                                            <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="mt-8 sm:mt-14 flex justify-center">
                    <Pagination
                        current={1}
                        total={4}
                        pageSize={4}
                        disabled
                        itemRender={(page, type, originalElement) => {
                            if (type === 'prev' || type === 'next') {
                                return (
                                    <Button
                                        className="!w-6 sm:!w-8 !h-6 sm:!h-8 !ml-2 sm:!ml-3 !mr-2 sm:!mr-3 !rounded-full !flex !items-center !justify-center !bg-white !border-none !shadow-sm"
                                        icon={type === 'prev' ? <LeftOutlined className="!text-gray-800 !text-xs sm:!text-sm" /> : <RightOutlined className="!text-gray-800 !text-xs sm:!text-sm" />}
                                        disabled
                                    />
                                );
                            }
                            return originalElement;
                        }}
                    />
                </div>
            </div>
        </ConfigProvider>
    );
}