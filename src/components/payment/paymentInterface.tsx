"use client"

import React, { useState, useEffect } from 'react';
import { Card, Button, Steps, Typography, Space, Tag, Alert, Divider, Collapse } from 'antd';
import { QrcodeOutlined, ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const PaymentInterface = () => {
    const [timeRemaining, setTimeRemaining] = useState(null);

    const paymentData = {
        id: "9f571fbe-843f-49a6-85d4-d29557ef3e9b",
        payment_code: "842277152",
        payment_type: "deposit",
        amount: "12.000 VND",
        amount_raw: 12000,
        description: "TT coc DH#34G91J8TNFBP",
        status: "pending",
        status_label: "Chờ thanh toán",
        payment_url: "https://pay.payos.vn/web/700efca39bf944e1b7565b6347a167fe",
        qr_code: "00020101021238570010A000000727012700069704220113VQRQADFKV07240208QRIBFTTA53037045405120005802VN62250821TT coc DH34G91J8TNFBP630425B7",
        is_expired: false,
        expired_at: "2025-07-08T09:04:55.000000Z",
        expired_at_formatted: "08/07/2025 16:04:55",
        paid_at: null,
        paid_at_formatted: null,
        created_at: "2025-07-08T09:03:55.000000Z",
        created_at_formatted: "08/07/2025 16:03:55",
        updated_at: "2025-07-08T09:03:55.000000Z",
        time_remaining: null,
        order: {
            id: "9f56f6af-687d-4593-8180-4f03f2a82789",
            customer_name: "Nguyễn Quốc Khanh",
            customer_phone: "0123123123",
            customer_email: "customer@gmail.com",
            group_name: "Gia đình chú Khanh",
            total_guest_count: 21,
            adult_count: 1,
            child_count: 0,
            arrival_datetime: "2025-07-18T17:00:00.000000Z",
            arrival_datetime_formatted: "19/07/2025 00:00",
            total_price: "40.000 VND",
            total_price_raw: 40000,
            deposit_amount: "12.000 VND",
            deposit_amount_raw: 12000,
            paid_amount: "12.000 VND",
            paid_amount_raw: 12000,
            remaining_amount: "28.000 VND",
            remaining_amount_raw: 28000,
            payment_status: "deposit_paid",
            overall_payment_status: null,
            note: null
        },
        order_items: [
            {
                item_name: "Chiều Bên Bếp Lửa Hồng",
                quantity: 20,
                item_price: "2.000 VND",
                item_price_raw: 2000,
                total_price: "40.000 VND",
                total_price_raw: 40000,
                unit: "gói"
            }
        ]
    };

    useEffect(() => {
        if (!paymentData.is_expired) {
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const expiredTime = new Date(paymentData.expired_at).getTime();
                const distance = expiredTime - now;

                if (distance > 0) {
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    setTimeRemaining(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                } else {
                    setTimeRemaining("00:00");
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [paymentData.expired_at, paymentData.is_expired]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#f59e0b';
            case 'paid': return '#059669';
            case 'expired': return '#dc2626';
            default: return '#6b7280';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <ClockCircleOutlined />;
            case 'paid': return <CheckCircleOutlined />;
            case 'expired': return <ExclamationCircleOutlined />;
            default: return <ClockCircleOutlined />;
        }
    };

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(paymentData.qr_code)}`;

    return (
        <div className="bg-gray-100 p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {paymentData.is_expired && (
                    <Alert
                        message="Giao dịch đã hết hạn"
                        description="Vui lòng tạo giao dịch mới để tiếp tục thanh toán"
                        type="error"
                        showIcon
                        className="!mb-4"
                    />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="!bg-white p-4 rounded-xl">
                        <div className="text-center">
                            <Title level={4} className="!mb-6 !text-green-700">Quét mã QR để thanh toán</Title>

                            <div className="mb-6">
                                <Steps
                                    current={0}
                                    size="small"
                                    items={[
                                        {
                                            title: 'Mở ứng dụng Ngân hàng trên điện thoại',
                                            status: 'process',
                                        },
                                        {
                                            title: 'Trên App, chọn biểu tượng Quét mã',
                                            status: 'wait',
                                        },
                                        {
                                            title: 'Quét mã QR ở trang này và thanh toán',
                                            status: 'wait',
                                        },
                                    ]}
                                    direction="vertical"
                                    className="!text-left"
                                />
                            </div>

                            <div className="flex justify-center mb-6">
                                <div className="bg-green-100 p-5 rounded-xl">
                                    <div className="bg-green-50 rounded-xl p-5">
                                        <Image
                                            src={qrCodeUrl}
                                            alt="QR Code"
                                            className="w-48 h-48 lg:w-56 lg:h-56"
                                            width={150}
                                            height={150}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 w-75 text-center mx-auto flex justify-between">
                                <Title level={5} className="!mb-0">Tổng tiền:</Title>
                                <Text className="!text-2xl lg:!text-xl !text-green-800 font-bold">
                                    {paymentData.amount}
                                </Text>
                            </div>

                            {!paymentData.is_expired && timeRemaining && (
                                <div className="bg-amber-50 p-4 rounded-lg mb-6 border border-amber-200">
                                    <Text className="!text-amber-700">Giao dịch kết thúc sau</Text>
                                    <div className="flex justify-center items-center space-x-2 mt-2">
                                        <div className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-md">
                                            {timeRemaining.split(':')[0]}
                                        </div>
                                        <Text className="!text-amber-600 font-bold text-lg">:</Text>
                                        <div className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-md">
                                            {timeRemaining.split(':')[1]}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Space className="w-full" direction="vertical">
                                <Button
                                    size="large"
                                    className="!w-full !border-green-400 !text-green-700 hover:!bg-green-50 hover:!border-green-500"
                                >
                                    Hủy thanh toán
                                </Button>
                            </Space>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="!bg-white !mb-7 p-4 rounded-xl">
                            <Title level={4} className="!mb-6 !text-lg">Thông tin thanh toán</Title>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Text className="!text-green-700">Khách hàng:</Text>
                                    <Text className="font-medium text-green-800">{paymentData.order.customer_name}</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text className="!text-green-700">Điện thoại:</Text>
                                    <Text className="font-medium text-green-800">{paymentData.order.customer_phone}</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text className="!text-green-700">Email:</Text>
                                    <Text className="font-medium text-green-800">{paymentData.order.customer_email}</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text className="!text-green-700">Mô tả:</Text>
                                    <Text className="font-medium text-green-800">{paymentData.description}</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text className="!text-green-700">Trạng thái:</Text>
                                    <Tag
                                        color={getStatusColor(paymentData.status)}
                                        icon={getStatusIcon(paymentData.status)}
                                        className="px-3 py-1 text-sm font-medium"
                                    >
                                        {paymentData.status_label}
                                    </Tag>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text className="!text-green-700">Ngày tạo:</Text>
                                    <Text className="font-medium text-green-800">{paymentData.created_at_formatted}</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text className="!text-green-700">Ngày hết hạn:</Text>
                                    <Text className="font-medium text-green-800">{paymentData.expired_at_formatted}</Text>
                                </div>
                            </div>
                        </div>

                        <div className="!bg-white p-4 rounded-xl">
                            <Title level={4} className="!mb-6 !text-lg">Thông tin sản phẩm</Title>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Text className="!text-green-600">Nhóm:</Text>
                                    <Text className="font-medium text-green-800">{paymentData.order.group_name}</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text className="!text-green-600">Số khách:</Text>
                                    <Text className="font-medium text-green-800">{paymentData.order.total_guest_count} người</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Text className="!text-green-600">Thời gian đến:</Text>
                                    <Text className="font-medium text-green-800">{paymentData.order.arrival_datetime_formatted}</Text>
                                </div>
                                <Divider className="!my-3 !border-green-200" />
                                {paymentData.order_items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div className="text-left">
                                            <Text className="font-medium text-green-800">{item.item_name}</Text>
                                            <div className="text-sm text-green-600">
                                                {item.quantity} {item.unit} × {item.item_price}
                                            </div>
                                        </div>
                                        <Text className="font-bold text-green-700">{item.total_price}</Text>
                                    </div>
                                ))}
                                <Divider className="!my-3 !border-green-200" />
                                <div className="flex justify-between items-center">
                                    <Text className="font-medium text-green-700">Tổng cộng:</Text>
                                    <Text className="font-bold text-lg text-green-800">{paymentData.order.total_price}</Text>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                                    <Text className="!text-amber-700 font-medium">Cần thanh toán (cọc):</Text>
                                    <Text className="font-bold text-amber-700 text-lg">{paymentData.order.deposit_amount}</Text>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <Text className="!text-green-700 font-medium">Đã thanh toán:</Text>
                                    <Text className="font-bold text-green-700">{paymentData.order.paid_amount}</Text>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                    <Text className="!text-red-700 font-medium">Còn lại:</Text>
                                    <Text className="font-bold text-red-700">{paymentData.order.remaining_amount}</Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentInterface;