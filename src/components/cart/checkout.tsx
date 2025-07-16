"use client";

import React, { useState } from 'react';
import { Form, Input, Button, Drawer, Select, Typography } from 'antd';
import Image from 'next/image';
import { IMAGES } from '@/constants/theme';

const { Title, Text, Paragraph } = Typography;

export default function Checkout() {
    const [form] = Form.useForm();
    const [drawerForm] = Form.useForm();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        drawerForm.resetFields();
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onDrawerFinish = (values) => {
        console.log('Drawer form values:', values);
        onClose();
    };

    return (
        <div className="bg-gray-100">
            <div className="container font-roboto sm:max-w-7xl md:px-6 px-3 py-16 mt-3 mx-auto">
                <div className="md:hidden block mt-6">
                    <div className="bg-white md:rounded-2xl p-3 rounded-xl">
                        <div className="mb-4 border-b border-gray-300 pb-3">
                            <Title level={3} className="font-medium !text-lg mb-1" style={{ margin: 0, marginBottom: '4px' }}>
                                Chương Trình Kỳ Ức Tuổi Thơ - Trải Nghiệm Làm Bánh Dân Gian
                            </Title>
                            <Text className="!text-sm text-gray-600">Tour trong ngày trải nghiệm tuổi thơ làm bánh dân gian</Text>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Text className="!text-sm text-gray-600">Ngày</Text>
                                <Text className="!text-sm text-slate-700">10/4/2025</Text>
                            </div>
                            <div className="flex justify-between">
                                <Text className="!text-sm text-gray-600">Đơn vị</Text>
                                <div className="text-right">
                                    <div className="text-slate-700">
                                        <Text className="!text-sm text-slate-700">Trẻ em (90-110cm) x 1</Text>
                                    </div>
                                    <div className="text-slate-700">
                                        <Text className="!text-sm text-slate-700">Người lớn x 1</Text>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between border-t border-gray-300 pt-4">
                                <Text className="!text-sm text-gray-600">Tổng cộng</Text>
                                <Text className="!text-sm">đ 1,565,000</Text>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 mt-6 mb-6">
                        <div className="bg-white md:rounded-2xl rounded-2xl">
                            <Title level={1} className="font-medium p-3 !text-lg border-b border-gray-200 !text-green-800" >
                                Điền thông tin
                            </Title>
                            <div className="md:block hidden py-1 mb-2">
                                <div className="flex items-center gap-3 m-2 p-4 rounded-lg border border-gray-200">
                                    <Image
                                        src={IMAGES.Sr_am_thuc}
                                        alt="Chương Trình Kỳ Ức Tuổi Thơ"
                                        width={80}
                                        height={80}
                                        className="rounded-lg object-cover"
                                    />
                                    <div>
                                        <Title level={3} className="font-medium !text-base" >
                                            Chương Trình Kỳ Ức Tuổi Thơ - Trải Nghiệm Làm Bánh Dân Gian
                                        </Title>
                                        <Text className="!text-sm text-gray-600">Tour trong ngày trải nghiệm tuổi thơ làm bánh dân gian</Text>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Form form={form} layout="vertical" className="font-roboto" onFinish={onFinish}>

                                    <div className="pb-6 px-3">
                                        <Title level={3} className="font-medium !text-lg text-slate-800 mb-3">
                                            Thông tin khởi hành
                                        </Title>
                                        <Title level={3} className="font-medium !text-sm text-gray-500 mb-4 pl-0.5">
                                            Địa điểm khởi hành
                                        </Title>
                                        <div className="">
                                            <Text className="md:w-full w-[330px] max-w-md p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white block !text-sm">
                                                Làng du lịch Ông Đề - Cần Thơ
                                            </Text>
                                        </div>
                                    </div>
                                    <div className="pb-6 px-3">
                                        <Title level={3} className="font-medium !text-lg text-slate-800 mb-3">
                                            Thông tin khác
                                        </Title>
                                        <Title level={3} className="font-medium !text-sm text-gray-500 mb-4 pl-0.5">
                                            Số điện thoại liên lạc
                                        </Title>
                                        <div className="">
                                            <input
                                                type="tel"
                                                placeholder="Xin nhập số điện thoại"
                                                className="md:w-full w-[330px] max-w-md p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#FF5B00] text-sm"
                                            />
                                        </div>
                                    </div>

                                    <Title level={1} className="font-medium !text-lg text-slate-800 px-3" >
                                        Thông tin liên lạc
                                    </Title>
                                    <div className="px-3 pb-5">
                                        <Text className="font-medium !text-sm mb-2 pl-0.5 text-slate-700 block">
                                            Chúng tôi sẽ thông báo mọi thay đổi về đơn hàng cho bạn
                                        </Text>

                                        <div className="rounded-lg flex items-center gap-3 mb-4 mt-4">
                                            <Text className="!text-sm text-gray-700 rounded-md py-2 px-5 bg-gray-100">Phuc rom</Text>
                                            <Button
                                                type="text"
                                                onClick={showDrawer}
                                                className="!text-sm text-[#FF5B00] rounded-md py-[18.5px] px-5 font-roboto border-[#FF5B00]"
                                            >
                                                + Thêm
                                            </Button>
                                        </div>

                                        <div className="space-y-4 border border-gray-300 rounded-lg p-4">
                                            <div className="flex justify-between items-center">
                                                <Text className="!text-sm text-gray-800 w-2/3">Họ</Text>
                                                <Text className="!text-sm text-gray-800 w-2/3">Phuc</Text>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <Text className="!text-sm text-gray-800 w-2/3">Tên</Text>
                                                <Text className="!text-sm text-gray-800 w-2/3">Rom</Text>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <Text className="!text-sm text-gray-800 w-2/3">Số điện thoại</Text>
                                                <Text className="!text-sm text-gray-800 w-2/3">84-0348121917</Text>
                                            </div>
                                            <div className="flex md:justify-between flex-col md:flex-row items-start md:items-center">
                                                <Text className="!text-sm text-gray-800 md:w-2/3 mb-1 md:mb-0">
                                                    Email (để cập nhật thông tin đơn hàng của bạn)
                                                </Text>
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-2/3 w-full">
                                                    <Text className="!text-sm text-gray-800 break-all mb-2 md:mb-0">pvphuc140404@gmail.com</Text>
                                                    <Text className="!text-sm text-[#FF5B00] hover:cursor-pointer" onClick={showDrawer}>
                                                        Chỉnh sửa
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[400px] mt-6 mb-20 md:mb-6 md:block hidden">
                        <div>
                            <div className="bg-white rounded-2xl p-3">
                                <div className="mb-4 border-b border-gray-200 pb-1">
                                    <Title level={3} className="!text-gray-800 !text-base mb-2">
                                        Chương Trình Kỳ Ức Tuổi Thơ - Trải Nghiệm Làm Bánh Dân Gian
                                    </Title>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <Text className="!text-sm !text-gray-800 font-medium">Ngày</Text>
                                        <Text className="!text-sm text-slate-700">10/4/2025</Text>
                                    </div>
                                    <div className="flex justify-between">
                                        <Text className="!text-sm !text-gray-800 font-medium">Đơn vị</Text>
                                        <div className="text-right">
                                            <div className="text-slate-700">
                                                <Text className="!text-sm text-slate-700">Trẻ em (90-110cm) x 1</Text>
                                            </div>
                                            <div className="text-slate-700">
                                                <Text className="!text-sm text-slate-700">Người lớn x 1</Text>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-300 pt-4">
                                        <Text className="!text-sm !text-gray-800 font-medium">Tổng cộng</Text>
                                        <Text className="!text-sm font-medium">đ 1,565,000</Text>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-3 bg-white rounded-2xl p-3">
                                <div className="flex justify-between">
                                    <Text className="!text-sm text-gray-900 font-medium">Số tiền thanh toán</Text>
                                    <Text className="!text-base !text-green-800 font-bold">đ 1,565,000</Text>
                                </div>
                                <div className="flex justify-between mt-5 items-center w-full md:block hidden">
                                    <button className="bg-green-600 text-white cursor-pointer py-3 rounded-lg font-medium w-full hover:bg-green-700 transition-colors text-sm">
                                        Thanh Toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 z-20 left-0 right-0 bg-white md:hidden">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-1">
                                <Text className="!text-xs text-gray-600">Tổng cộng (2 Đơn vị)</Text>
                            </div>
                            <Text className="!text-base font-bold text-slate-800">đ 1,565,000</Text>
                        </div>
                        <button className="bg-[#FF5B00] cursor-pointer text-white px-6 py-2.5 rounded-lg text-sm hover:bg-[#E65100] transition-colors">
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>

            <Drawer
                title={<Text className="font-roboto font-medium !text-base">Thêm thông tin liên lạc</Text>}
                onClose={onClose}
                open={open}
                width={600}
                className="font-roboto"
                closeIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                }
            >
                <div className="px-2">
                    <Form
                        form={drawerForm}
                        layout="vertical"
                        onFinish={onDrawerFinish}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                                name="lastName"
                                label={<Text className="font-roboto !text-sm">Họ <Text className="text-[#FF5B00]">*</Text></Text>}
                                className="mb-6"
                                rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                            >
                                <Input placeholder="Vd: Phan" className="font-roboto h-10 !text-sm" />
                            </Form.Item>
                            <Form.Item
                                name="firstName"
                                label={<Text className="font-roboto !text-sm">Tên <Text className="text-[#FF5B00]">*</Text></Text>}
                                className="mb-6"
                                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                            >
                                <Input placeholder="Vd: Phuc" className="font-roboto h-10 !text-sm" />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label={<Text className="font-roboto !text-sm">Số điện thoại <Text className="text-[#FF5B00]">*</Text></Text>}
                            className="mb-6"
                        >
                            <div className="flex gap-2">
                                <Form.Item
                                    name="phoneCountry"
                                    noStyle
                                    initialValue="84"
                                >
                                    <Select
                                        className="w-[180px] font-roboto [&_.ant-select-selector]:!text-sm"
                                        size="large"
                                    >
                                        <Select.Option value="84">Việt Nam (+84)</Select.Option>
                                        <Select.Option value="1">Mỹ (+1)</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="phoneNumber"
                                    noStyle
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập số điện thoại' },
                                        { pattern: /^[0-9]{9,10}$/, message: 'Số điện thoại không hợp lệ' }
                                    ]}
                                >
                                    <Input placeholder="Nhập số điện thoại" className="font-roboto h-10 !text-sm" />
                                </Form.Item>
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label={
                                <div className="font-roboto !text-sm">
                                    <Text>Email (để cập nhật thông tin đơn hàng của bạn) <Text className="text-[#FF5B00]">*</Text></Text>
                                </div>
                            }
                            className="mb-8"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email' },
                                { type: 'email', message: 'Email không hợp lệ' }
                            ]}
                        >
                            <Input placeholder="Vui lòng nhập" className="font-roboto h-10 !text-sm" />
                        </Form.Item>

                        <Paragraph className="text-gray-500 !text-xs mb-8 font-roboto leading-6">
                            Tôi hiểu rằng bất kỳ thông tin ID nào được cung cấp sẽ chỉ được sử dụng để đặt các dịch vụ du lịch và nghỉ dưỡng
                            cần sử dụng tên để đăng ký. Ông Đề chỉ cho phép sử dụng thông tin đó với
                            các bên thứ ba có liên quan cho các giao dịch cụ thể.
                        </Paragraph>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="font-roboto cursor-pointer rounded-lg border border-gray-500 hover:bg-gray-100 h-10 px-8 text-sm"
                            >
                                Huỷ bỏ
                            </button>
                            <button
                                type="submit"
                                className="font-roboto cursor-pointer rounded-lg h-10 px-8 text-sm bg-[#FF5B00] text-white hover:bg-orange-600"
                            >
                                Lưu
                            </button>
                        </div>
                    </Form>
                </div>
            </Drawer>
        </div>
    );
}