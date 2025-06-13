"use client";

import React, { useState } from 'react';
import { Form, Input, Button, Drawer, Select } from 'antd';
import Image from 'next/image';
import { IMAGES } from '@/constants/theme';

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
        <div className="bg-white">
            <div className="container font-roboto sm:max-w-7xl md:px-6 px-3 py-16 mx-auto">
                <div className="md:hidden block mt-6">
                    <div className="bg-white md:rounded-2xl shadow-xs border border-gray-200 p-3 rounded-xl">
                        <div className="mb-4 border-b border-gray-300 pb-3">
                            <h3 className="font-medium text-xl mb-1">
                                Chương Trình Kỳ Ức Tuổi Thơ - Trải Nghiệm Làm Bánh Dân Gian
                            </h3>
                            <p className="text-gray-600">Tour trong ngày trải nghiệm tuổi thơ làm bánh dân gian</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Ngày</span>
                                <span className="text-slate-700">10/4/2025</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Đơn vị</span>
                                <div className="text-right">
                                    <div className="text-slate-700">Trẻ em (90-110cm) x 1</div>
                                    <div className="text-slate-700">Người lớn x 1</div>
                                </div>
                            </div>
                            <div className="flex justify-between border-t border-gray-300 pt-4">
                                <span className="text-gray-600">Tổng cộng</span>
                                <span>đ 1,565,000</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 mt-6 mb-6">
                        <div className="bg-white md:rounded-2xl rounded-2xl shadow-xs border border-gray-200">
                            <h1 className="font-medium p-3 text-xl border-b text-[#FF5B00]">Điền thông tin</h1>
                            <div className="md:block hidden">
                                <h1 className="font-medium text-xl text-slate-800 px-3 py-3">Thông tin đơn hàng</h1>
                                <div className="flex items-center gap-3 m-2 p-4 rounded-lg border border-gray-200">
                                    <Image
                                        src={IMAGES.Sr_am_thuc}
                                        alt="Chương Trình Kỳ Ức Tuổi Thơ"
                                        width={80}
                                        height={80}
                                        className="rounded-lg object-cover"
                                    />
                                    <div>
                                        <h3 className="font-medium">Chương Trình Kỳ Ức Tuổi Thơ - Trải Nghiệm Làm Bánh Dân Gian</h3>
                                        <p className="text-gray-600">Tour trong ngày trải nghiệm tuổi thơ làm bánh dân gian</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Form form={form} layout="vertical" className="font-roboto" onFinish={onFinish}>
                                    <div className="mb-6 px-3 py-3">
                                        <h1 className="font-medium text-xl text-slate-800">Thông tin người tham gia</h1>
                                        <div className="mt-2">
                                            <p className="font-medium text-base pl-0.5">Trẻ em (90-110cm) <span className="text-[#FF5B00]">(0/1)</span></p>

                                            <div className="rounded-lg flex items-center gap-3 mb-4 mt-4">
                                                <span className="text-gray-700 rounded-md py-2 px-5 bg-gray-100">Phuc rom</span>
                                                <Button
                                                    type="text"
                                                    className="text-[#FF5B00] rounded-md py-[18.5px] px-5 font-roboto border-[#FF5B00]"
                                                    onClick={showDrawer}
                                                >
                                                    + Thêm
                                                </Button>
                                            </div>

                                            <div className="space-y-4 border border-gray-300 rounded-lg p-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700 w-1/3">Họ</span>
                                                    <span className="text-gray-500 w-2/3">Vui lòng nhập</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700 w-1/3">Tên</span>
                                                    <span className="text-gray-500 w-2/3">Vui lòng nhập</span>
                                                </div>
                                                <div className="flex md:justify-between flex-col md:flex-row items-start md:items-center">
                                                    <span className="text-gray-700 md:w-1/3 mb-1 md:mb-0">Loại giấy tờ tùy thân</span>
                                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-2/3 w-full">
                                                        <span className="text-gray-500 mb-2 md:mb-0">Vui lòng nhập</span>
                                                        <span className="text-[#FF5B00] hover:cursor-pointer" onClick={showDrawer}>Chỉnh sửa</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <p className="font-medium text-base mb-2 pl-0.5">Người lớn <span className="text-[#FF5B00]">(0/1)</span></p>

                                            <div className="rounded-lg flex items-center gap-3 mb-4 mt-4">
                                                <span className="text-gray-700 rounded-md py-2 px-5 bg-gray-100">Phuc rom</span>
                                                <Button
                                                    type="text"
                                                    className="text-[#FF5B00] rounded-md py-[18.5px] px-5 font-roboto border-[#FF5B00]"
                                                    onClick={showDrawer}
                                                >
                                                    + Thêm
                                                </Button>
                                            </div>

                                            <div className="space-y-4 border border-gray-300 rounded-lg p-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700 w-1/3">Họ</span>
                                                    <span className="text-gray-500 w-2/3">Vui lòng nhập</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700 w-1/3">Tên</span>
                                                    <span className="text-gray-500 w-2/3">Vui lòng nhập</span>
                                                </div>
                                                <div className="flex md:justify-between flex-col md:flex-row items-start md:items-center">
                                                    <span className="text-gray-700 md:w-1/3 mb-1 md:mb-0">Loại giấy tờ tùy thân</span>
                                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-2/3 w-full">
                                                        <span className="text-gray-500 mb-2 md:mb-0">Vui lòng nhập</span>
                                                        <span className="text-[#FF5B00] hover:cursor-pointer" onClick={showDrawer}>Chỉnh sửa</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pb-6 px-3">
                                        <h3 className="font-medium text-xl text-slate-800 mb-3">Thông tin khởi hành</h3>
                                        <h3 className="font-medium text-base text-gray-500 mb-4 pl-0.5">Địa điểm khởi hành</h3>
                                        <div className="">
                                            <p className="md:w-full w-[330px] max-w-md p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                                                Lăng du lịch Ông Đề - Cần Thơ
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pb-6 px-3">
                                        <h3 className="font-medium text-xl text-slate-800 mb-3">Thông tin khác</h3>
                                        <h3 className="font-medium text-base text-gray-500 mb-4 pl-0.5">Số điện thoại liên lạc</h3>
                                        <div className="">
                                            <input
                                                type="tel"
                                                placeholder="Xin nhập số điện thoại"
                                                className="md:w-full w-[330px] max-w-md p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#FF5B00]"
                                            />
                                        </div>
                                    </div>

                                    <h1 className="font-medium text-xl text-slate-800 px-3">Thông tin liên lạc</h1>
                                    <div className="px-3 pb-5">
                                        <p className="font-medium text-base mb-2 pl-0.5 text-slate-700">Chúng tôi sẽ thông báo mọi thay đổi về đơn hàng cho bạn</p>

                                        <div className="rounded-lg flex items-center gap-3 mb-4 mt-4">
                                            <span className="text-gray-700 rounded-md py-2 px-5 bg-gray-100">Phuc rom</span>
                                            <Button
                                                type="text"
                                                onClick={showDrawer}
                                                className="text-[#FF5B00] rounded-md py-[18.5px] px-5 font-roboto border-[#FF5B00]"
                                            >
                                                + Thêm
                                            </Button>
                                        </div>

                                        <div className="space-y-4 border border-gray-300 rounded-lg p-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-800 w-2/3">Họ</span>
                                                <span className="text-gray-800 w-2/3">Phuc</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-800 w-2/3">Tên</span>
                                                <span className="text-gray-800 w-2/3">Rom</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-800 w-2/3">Số điện thoại</span>
                                                <span className="text-gray-800 w-2/3">84-0348121917</span>
                                            </div>
                                            <div className="flex md:justify-between flex-col md:flex-row items-start md:items-center">
                                                <span className="text-gray-800 md:w-2/3 mb-1 md:mb-0">Email (để cập nhật thông tin đơn hàng của bạn)</span>
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-2/3 w-full">
                                                    <span className="text-gray-800 break-all mb-2 md:mb-0">pvphuc140404@gmail.com</span>
                                                    <span className="text-[#FF5B00] hover:cursor-pointer" onClick={showDrawer}>Chỉnh sửa</span>
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
                            <div className="bg-white rounded-2xl shadow-xs p-3 border border-gray-200">
                                <div className="mb-4 border-b border-gray-300 pb-2">
                                    <h3 className="text-gray-700 text-lg font-medium mb-2">
                                        Chương Trình Kỳ Ức Tuổi Thơ - Trải Nghiệm Làm Bánh Dân Gian
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Ngày</span>
                                        <span className="text-slate-700">10/4/2025</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Đơn vị</span>
                                        <div className="text-right">
                                            <div className="text-slate-700">Trẻ em (90-110cm) x 1</div>
                                            <div className="text-slate-700">Người lớn x 1</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-300 pt-4">
                                        <span className="text-gray-600">Tổng cộng</span>
                                        <span>đ 1,565,000</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-3 bg-white rounded-2xl shadow-xs p-3 border border-gray-200">
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-600">Tổng cộng</span>
                                    <span>đ 1,565,000</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-900 font-medium">Số tiền thanh toán</span>
                                    <span className="text-[#FF5B00] font-bold">đ 1,565,000</span>
                                </div>
                                <div className="flex justify-between mt-5 items-center w-full md:block hidden">
                                    <button className="bg-[#FF5B00] text-white cursor-pointer py-3 rounded-lg font-medium w-full hover:bg-[#E65100] transition-colors">
                                        Thanh Toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 font-roboto z-20 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-1">
                                <span className="text-[13px] text-gray-600">Tổng cộng (2 Đơn vị)</span>
                            </div>
                            <p className="text-[17px] font-bold text-slate-800">đ 1,565,000</p>
                        </div>
                        <button className="bg-[#FF5B00] cursor-pointer text-white px-6 py-2.5 rounded-lg text-[15px] hover:bg-[#E65100] transition-colors">
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>

            <Drawer
                title={<span className="font-roboto font-medium text-lg">Thêm thông tin liên lạc</span>}
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
                                label={<span className="font-roboto text-base">Họ <span className="text-[#FF5B00]">*</span></span>}
                                className="mb-6"
                                rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                            >
                                <Input placeholder="Vd: Phan" className="font-roboto h-10" />
                            </Form.Item>
                            <Form.Item
                                name="firstName"
                                label={<span className="font-roboto text-base">Tên <span className="text-[#FF5B00]">*</span></span>}
                                className="mb-6"
                                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                            >
                                <Input placeholder="Vd: Phuc" className="font-roboto h-10" />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label={<span className="font-roboto text-base">Số điện thoại <span className="text-[#FF5B00]">*</span></span>}
                            className="mb-6"
                        >
                            <div className="flex gap-2">
                                <Form.Item
                                    name="phoneCountry"
                                    noStyle
                                    initialValue="84"
                                >
                                    <Select
                                        className="w-[180px] font-roboto"
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
                                    <Input placeholder="Nhập số điện thoại" className="font-roboto h-10" />
                                </Form.Item>
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label={
                                <div className="font-roboto text-base">
                                    Email (để cập nhật thông tin đơn hàng của bạn) <span className="text-[#FF5B00]">*</span>
                                </div>
                            }
                            className="mb-8"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email' },
                                { type: 'email', message: 'Email không hợp lệ' }
                            ]}
                        >
                            <Input placeholder="Vui lòng nhập" className="font-roboto h-10" />
                        </Form.Item>

                        <div className="text-gray-500 text-sm mb-8 font-roboto leading-6">
                            Tôi hiểu rằng bất kỳ thông tin ID nào được cung cấp sẽ chỉ được sử dụng để đặt các dịch vụ du lịch và nghỉ dưỡng
                            cần sử dụng tên để đăng ký. Ông Đề chỉ cho phép sử dụng thông tin đó với
                            các bên thứ ba có liên quan cho các giao dịch cụ thể.
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="font-roboto cursor-pointer rounded-lg border border-gray-500 hover:bg-gray-100 h-10 px-8 text-base"
                            >
                                Huỷ bỏ
                            </button>
                            <button
                                type="submit"
                                className="font-roboto cursor-pointer rounded-lg h-10 px-8 text-base bg-[#FF5B00] text-white hover:bg-orange-600"
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