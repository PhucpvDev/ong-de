import React, { useState } from 'react';
import { CheckCircle2Icon, MapPin, Home, Globe } from 'lucide-react';
import { Typography, Button } from 'antd';

const { Title, Text, Paragraph } = Typography;

const PricingTable = () => {
    const [activeTab, setActiveTab] = useState('tourism');

    const tabData = {
        tourism: {
            title: 'Bảng giá dịch vụ ',
            plans: [
                {
                    id: 'basic',
                    name: 'GÓI HỖ TRỢ',
                    originalPrice: '199.000',
                    price: '129.000',
                    period: '1 chi nhánh/tháng',
                    description: 'Dành cho cơ sở lưu trú có ít nhân viên, cho thuê ngắn ngày & vận hành đơn giản.',
                    features: [
                        '3 tài khoản truy cập',
                        'Không giới hạn tính năng cơ bản',
                        'Không phí khởi tạo',
                        'Hỗ trợ qua tổng đài',
                        'Tối đa 20 phòng/chi nhánh'
                    ],
                    isPopular: false,
                },
                {
                    id: 'pro',
                    name: 'GÓI CHUYÊN NGHIỆP',
                    originalPrice: '310.000',
                    price: '220.000',
                    period: 'Quản lý nhiều chi nhánh: 175k/+1 chi nhánh\nTích hợp OTAs: từ 390k/tháng/+1 chi nhánh',
                    description: 'Dành cho cơ sở lưu trú có 3-5 nhân viên/chi nhánh, cho thuê ngắn/dài ngày, chuyên môn hóa về quy trình.',
                    features: [
                        'Không giới hạn tài khoản truy cập',
                        'Không giới hạn tính năng cơ bản',
                        'Không phí khởi tạo',
                        'Hỗ trợ qua tổng đài',
                        'Tối đa 50 phòng/chi nhánh'
                    ],
                    isPopular: true,
                    badge: 'HOT'
                },
                {
                    id: 'premium',
                    name: 'GÓI CAO CẤP',
                    originalPrice: '599.000',
                    price: '490.000',
                    period: 'Quản lý nhiều chi nhánh: 375k/+1 chi nhánh\nTích hợp OTAs: từ 390k/tháng/+1 chi nhánh',
                    description: 'Dành cho cơ sở lưu trú quy mô lớn, đông nhân viên & quy trình vận hành phức tạp.',
                    features: [
                        'Không giới hạn tài khoản truy cập',
                        'Không giới hạn tính năng cơ bản',
                        'Không phí khởi tạo',
                        'Hotline riêng & Hỗ trợ tận nơi trong 24h',
                        'Không giới hạn số lượng phòng/chi nhánh'
                    ],
                    isPopular: false,
                    badge: null
                }
            ]
        },
        restaurant: {
            title: 'Gói phần mềm quản lý nhà hàng & ẩm thực',
            subtitle: 'Giải pháp quản lý nhà hàng và ẩm thực tại Ông Đề Cần Thơ với thực đơn xanh và đặt bàn online.',
            plans: [
                {
                    id: 'basic',
                    name: 'GÓI HỖ TRỢ',
                    originalPrice: '249.000',
                    price: '169.000',
                    period: '1 chi nhánh/tháng',
                    description: 'Dành cho nhà hàng nhỏ với ít nhân viên, vận hành đơn giản.',
                    features: [
                        '3 tài khoản truy cập',
                        'Quản lý bàn & thực đơn',
                        'Gọi món tại chỗ',
                        'Thanh toán nhanh',
                        'Báo cáo doanh thu cơ bản'
                    ],
                    isPopular: false,
                    badge: 'HOT'
                },
                {
                    id: 'standard',
                    name: 'GÓI CHUYÊN NGHIỆP',
                    originalPrice: '449.000',
                    price: '299.000',
                    period: 'Quản lý nhiều chi nhánh: 200k/+1 chi nhánh\nTích hợp delivery: từ 150k/tháng',
                    description: 'Dành cho nhà hàng vừa với 5-10 nhân viên, có đặt bàn online.',
                    features: [
                        'Không giới hạn tài khoản truy cập',
                        'Đặt bàn online',
                        'Thực đơn thân thiện môi trường',
                        'Khuyến mãi món đặc sản',
                        'Tích hợp delivery'
                    ],
                    isPopular: true,
                    badge: 'HOT'
                },
                {
                    id: 'premium',
                    name: 'GÓI CAO CẤP',
                    originalPrice: '699.000',
                    price: '499.000',
                    period: 'Quản lý nhiều chi nhánh: 350k/+1 chi nhánh\nTích hợp POS: từ 200k/tháng',
                    description: 'Dành cho chuỗi nhà hàng lớn, quản lý toàn diện.',
                    features: [
                        'Không giới hạn tài khoản truy cập',
                        'Quản lý chuỗi nhà hàng',
                        'AI phân tích thực đơn',
                        'POS thông minh',
                        'Hỗ trợ chuyên gia ẩm thực'
                    ],
                    isPopular: false,
                    badge: null
                }
            ]
        },
        website: {
            title: 'Gói phần mềm website du lịch',
            subtitle: 'Tạo website du lịch chuyên nghiệp cho Ông Đề Cần Thơ với đặt tour, quảng bá và quản lý khách hàng.',
            plans: [
                {
                    id: 'starter',
                    name: 'GÓI HỖ TRỢ',
                    originalPrice: '179.000',
                    price: '119.000',
                    period: '1 website/tháng',
                    description: 'Dành cho doanh nghiệp du lịch nhỏ, website cơ bản.',
                    features: [
                        'Template du lịch đẹp',
                        'Tối đa 50 tour',
                        'Thanh toán COD',
                        'Hỗ trợ SEO cơ bản',
                        'Quản lý đặt tour'
                    ],
                    isPopular: false,
                    badge: 'HOT'
                },
                {
                    id: 'business',
                    name: 'GÓI CHUYÊN NGHIỆP',
                    originalPrice: '349.000',
                    price: '249.000',
                    period: 'Không giới hạn tour\nTích hợp thanh toán: từ 100k/tháng',
                    description: 'Dành cho công ty du lịch chuyên nghiệp, nhiều tính năng.',
                    features: [
                        'Không giới hạn tour',
                        'Tích hợp thanh toán online',
                        'Multi-language',
                        'Quảng bá tour tự động',
                        'Google Analytics nâng cao'
                    ],
                    isPopular: true,
                    badge: 'HOT'
                },
                {
                    id: 'enterprise',
                    name: 'GÓI CAO CẤP',
                    originalPrice: '649.000',
                    price: '449.000',
                    period: 'Tất cả tính năng Business\nAPI & tùy chỉnh: từ 200k/tháng',
                    description: 'Dành cho tập đoàn du lịch lớn, giải pháp toàn diện.',
                    features: [
                        'API & watermark',
                        'Tùy chỉnh giao diện',
                        'Multi-currency',
                        'Bảo mật nâng cao',
                        'Hỗ trợ chuyên gia du lịch'
                    ],
                    isPopular: false,
                    badge: null
                }
            ]
        }
    };

    const tabs = [
        { key: 'tourism', label: 'Dịch vụ du lịch', icon: MapPin },
        { key: 'restaurant', label: 'Nhà hàng & Ẩm thực', icon: Home },
        { key: 'website', label: 'Website du lịch', icon: Globe }
    ];

    const currentData = tabData[activeTab];

    const formatPrice = (price) => {
        return price.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4 z-10 -top-23 relative">
            <div className="text-center mb-16">
                <div className="flex justify-center mb-12">
                    <div className="flex bg-white rounded-tr-lg rounded-tl-lg">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center cursor-pointer px-10 py-3 rounded-lg transition-all duration-200 ${
                                        activeTab === tab.key
                                            ? 'bg-green-100 text-green-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Title className="!text-lg">{tab.label}</Title>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <Title level={2} className="!mb-3 !text-gray-800">
                    {currentData.title}
                </Title>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentData.plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`bg-white rounded-2xl border-2 p-6 relative ${
                            plan.isPopular
                                ? 'border-green-500 transform scale-105 shadow-xl'
                                : 'border-gray-200 shadow-lg'
                        }`}
                    >
                        {plan.badge && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                {plan.badge}
                            </div>
                        )}

                        <div className="mb-6">
                            <Title level={4} className="!mb-2 !text-gray-800">
                                {plan.name}
                            </Title>
                            <Text className="!text-lg !text-gray-800 font-semibold line-through">
                                {formatPrice(plan.originalPrice)}đ
                            </Text>
                            <div className="mb-10 mt-1">
                                <Title className="!text-gray-800">
                                    {formatPrice(plan.price)}<Text className="!text-lg !text-gray-800">đ</Text>
                                </Title>
                            </div>
                            <Button
                                size="large"
                                className={`!w-full !py-3 !px-4 !rounded-full !font-medium !h-auto ${
                                    plan.isPopular
                                        ? '!bg-green-600 !text-white !border-green-600 hover:!bg-green-700 hover:!border-green-700'
                                        : '!bg-gray-100 !text-gray-700 !border-gray-200 hover:!bg-gray-200'
                                }`}
                            >
                                Chi tiết gói dịch vụ
                            </Button>
                        </div>

                        <div className="mb-4 mt-8">
                            <Paragraph className="!text-sm !text-gray-600 leading-relaxed">
                                {plan.description}
                            </Paragraph>
                        </div>

                        <div className="space-y-3">
                            {plan.features.map((feature, index) => (
                                <div key={index} className="flex items-start">
                                    <CheckCircle2Icon className="w-4 h-4 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                                    <Text className="!text-sm !text-gray-800">{feature}</Text>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingTable;