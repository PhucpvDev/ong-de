"use client";

import React, { useState, useEffect } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { IMAGES } from '@/constants/theme';
import Image from 'next/image';
import Link from 'next/link';

const cartData = [
    {
        id: 1,
        image: IMAGES.Sr_dem_trang,
        title: "Chương Trình Kỳ Ức Tuổi Thơ - Trải Nghiệm Làm Bánh Dân Gian",
        subtitle: "Tour trong ngày trải nghiệm tuổi thơ làm bánh dân gian",
        date: "10/4/2025",
        price: "550,000",
        childCount: 1,
        adultCount: 1
    },
    {
        id: 2,
        image: IMAGES.Sr_homestay,
        title: 'Chương trình "đêm trăng tây đô – nghỉ dưỡng 2 ngày 1 đêm" tại ông đề 2025',
        subtitle: 'Tour NGHỈ DƯỠNG 2 NGÀY 1 ĐÊM" TẠI ÔNG ĐỀ 2025',
        date: "10/4/2025",
        price: "550,000",
        childCount: 1,
        adultCount: 1
    },
    {
        id: 3,
        image: IMAGES.Sr_bat_ca,
        title: 'CHƯƠNG TRÌNH "TẬT MƯƠNG BẮT CÁ" TẠI LÀNG DU LỊCH ÔNG ĐỀ 2025',
        subtitle: '"TẬT MƯƠNG BẮT CÁ" TẠI LÀNG DU LỊCH ÔNG ĐỀ 2025',
        date: "10/4/2025",
        price: "550,000",
        childCount: 1,
        adultCount: 1
    }
];

export default function TourCart() {
    const [cartItems, setCartItems] = useState(cartData);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const updateQuantity = (id, type, isIncrement) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                const countKey = type === 'child' ? 'childCount' : 'adultCount';
                const newCount = isIncrement ? item[countKey] + 1 : Math.max(0, item[countKey] - 1);
                return { ...item, [countKey]: newCount };
            }
            return item;
        }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            if (selectedItems.includes(item.id)) {
                return total + (parseInt(item.price.replace(/,/g, '')) * (item.childCount + item.adultCount));
            }
            return total;
        }, 0);
    };

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        if (isChecked) {
            setSelectedItems(cartItems.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    useEffect(() => {
        setSelectAll(selectedItems.length === cartItems.length && cartItems.length > 0);
    }, [selectedItems, cartItems]);

    const handleDeleteSelected = () => {
        if (selectedItems.length === 0) return;
        setCartItems(prevItems => prevItems.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]);
    };

    const handleDeleteItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        setSelectedItems(prevItems => prevItems.filter(itemId => itemId !== id));
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingItem(null);
    };

    const handleUpdateItem = () => {
        if (!editingItem) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === editingItem.id ? editingItem : item
            )
        );
        handleCloseEditModal();
    };

    const handleOpenDatePicker = () => {
        setIsDatePickerOpen(true);
    };

    const handleCloseDatePicker = () => {
        setIsDatePickerOpen(false);
    };

    return (
        <div className="bg-white">
            <div className="sm:max-w-7xl mx-auto px-6 py-18">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <Image src={IMAGES.Shopping_Cart} alt="Giỏ hàng trống" className="w-48 mb-4" />
                        <h2 className="text-xl font-medium text-gray-900 mb-2">Giỏ hàng đang trống</h2>
                        <p className="text-gray-600 mb-6 text-center">Và giờ đã trở thành ổ của mèo. Khám phá Ông Đề để thêm vào giỏ hàng của bạn.</p>
                        <Link href="/" className="bg-[#FF5B00] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#E65100] transition-colors">
                            Về trang chủ
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="sticky mb-3 rounded-md top-0 z-10 bg-white border-b border-gray-200 md:hidden">
                            <div className="px-4 flex justify-between items-center h-[52px]">
                                <span className="font-medium">Giỏ hàng</span>
                                {selectedItems.length > 0 ? (
                                    <button
                                        className="text-gray-600 cursor-pointer text-sm hover:text-[#FF5B00]"
                                        onClick={() => setSelectedItems([])}
                                    >
                                        Bỏ chọn tất cả
                                    </button>
                                ) : (
                                    <button
                                        className="text-gray-600 cursor-pointer text-sm hover:text-[#FF5B00]"
                                        onClick={() => setSelectedItems(cartItems.map(item => item.id))}
                                    >
                                        Chọn tất cả sản phẩm
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-6 mt-5">
                            <div className="flex-1">
                                <div className="hidden md:block bg-white rounded-xl shadow-xs px-4 py-3 mb-3 border border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                                className="w-4 h-4 rounded cursor-pointer border-gray-300 text-[#FF5B00] focus:ring-[#FF5B00]"
                                            />
                                            <span className="font-medium">Tất cả</span>
                                        </div>
                                        <button
                                            onClick={handleDeleteSelected}
                                            disabled={selectedItems.length === 0}
                                            className={`text-gray-600 text-sm border cursor-pointer border-gray-300 rounded-lg px-4 py-1.5 ${selectedItems.length > 0
                                                ? 'hover:text-gray-800 hover:bg-gray-50'
                                                : 'opacity-50 cursor-not-allowed'
                                                }`}
                                        >
                                            Xóa dịch vụ đã chọn
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className={`bg-white p-4 rounded-xl shadow-xs border border-gray-200 ${selectedItems.includes(item.id) ? 'bg-orange-50' : ''}`}>
                                            <div className="flex gap-3">
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.includes(item.id)}
                                                        onChange={() => handleSelectItem(item.id)}
                                                        className="mt-1 md:mt-2 w-4 h-4  cursor-pointer rounded border-gray-300 text-[#FF5B00] focus:ring-[#FF5B00]"
                                                    />
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-[72px] h-[72px] md:w-24 md:h-24 rounded-lg object-cover"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex flex-col md:flex-row md:justify-between">
                                                        <div className="flex-1 md:max-w-[60%]">
                                                            <h3 className="font-medium text-[15px] md:text-base leading-5 mb-1">{item.title}</h3>
                                                            <p className="text-xs md:text-sm text-gray-600 mb-0.5">{item.subtitle}</p>
                                                            <p className="text-xs md:text-sm text-gray-500">{item.date}</p>

                                                            <div className="md:hidden mt-2">
                                                                <p className="text-[13px] text-gray-600">{item.adultCount} x Người lớn, {item.childCount} x Trẻ em</p>
                                                                <div className="flex items-center justify-between">
                                                                    <p className="font-medium text-[15px]">đ {item.price}</p>
                                                                    <div className="flex items-center -mt-4">
                                                                        <button
                                                                            className="text-gray-400 cursor-pointer hover:text-red-500 mr-2"
                                                                            onClick={() => handleDeleteItem(item.id)}
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                            </svg>
                                                                        </button>
                                                                        <button
                                                                            className="text-gray-400 cursor-pointer hover:text-blue-500"
                                                                            onClick={() => handleEditItem(item)}
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="hidden md:flex flex-col items-end gap-2">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-sm text-gray-600">Trẻ em (90-110cm)</span>
                                                                <div className="flex items-center">
                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, 'child', false)}
                                                                        className="w-6 h-6 flex items-center cursor-pointer justify-center border border-gray-300 rounded hover:bg-gray-100"
                                                                    >
                                                                        <MinusOutlined className="text-xs text-gray-500" />
                                                                    </button>
                                                                    <span className="w-8 text-center mx-2">{item.childCount}</span>
                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, 'child', true)}
                                                                        className="w-6 h-6 flex items-center cursor-pointer justify-center border border-gray-300 rounded hover:bg-gray-100"
                                                                    >
                                                                        <PlusOutlined className="text-xs text-gray-500" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-sm text-gray-600">Người lớn</span>
                                                                <div className="flex items-center">
                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, 'adult', false)}
                                                                        className="w-6 h-6 flex cursor-pointer items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                                                                    >
                                                                        <MinusOutlined className="text-xs text-gray-500" />
                                                                    </button>
                                                                    <span className="w-8 text-center mx-2">{item.adultCount}</span>
                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, 'adult', true)}
                                                                        className="w-6 h-6 flex cursor-pointer items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                                                                    >
                                                                        <PlusOutlined className="text-xs text-gray-500" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="hidden md:flex justify-end pt-2 border-t border-gray-200">
                                                        <span className="font-medium">đ {item.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="hidden lg:block w-full lg:w-[360px]">
                                <div className="bg-white rounded-xl shadow-xs border border-gray-200 sticky top-18">
                                    <div className="p-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="text-gray-600">Tổng cộng ({selectedItems.length} đơn vị)</p>
                                        </div>
                                        <p className="text-xl font-bold text-slate-800 mb-7">đ {calculateTotal().toLocaleString()}</p>
                                        <Link href="/checkout">
                                            <button className="bg-[#FF5B00] cursor-pointer text-white py-3 rounded-lg font-medium w-full hover:bg-[#E65100] transition-colors">
                                                Thanh Toán
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="fixed bottom-0 left-0 z-20 right-0 bg-white border-t border-gray-200 md:hidden">
                            <div className="px-4 py-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[13px] text-gray-600">Tổng cộng ({selectedItems.length} Đơn vị)</span>
                                        </div>
                                        <p className="text-[17px] font-bold text-slate-800">đ {calculateTotal().toLocaleString()}</p>
                                    </div>
                                    <Link href="/checkout">
                                        <button className="bg-[#FF5B00] cursor-pointer text-white px-6 py-2.5 rounded-lg text-[15px] hover:bg-[#E65100] transition-colors">
                                            Thanh toán
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Drawer
                title={
                    <div className="flex justify-between items-center">
                        <span className="text-base font-medium">Chỉnh sửa đơn hàng</span>
                        <button onClick={handleCloseEditModal} className="text-gray-800 border border-gray-300 rounded-full p-1 hover:bg-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                }
                placement="bottom"
                onClose={handleCloseEditModal}
                open={isEditModalOpen}
                height="83vh"
                closable={false}
                className="rounded-t-3xl"
            >
                {editingItem && (
                    <>
                        <div className="mb-5 font-roboto">
                            <h3 className="text-base font-medium mb-4">{editingItem.title}</h3>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 bg-orange-50 px-2 py-1 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm text-gray-500">Huỷ miễn phí 24 giờ</span>
                                </div>
                                <div className="flex items-center gap-2 bg-orange-50 px-2 py-1 rounded-lg">
                                    <span className="text-sm text-gray-500">Xác nhận ngay</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 font-roboto border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm text-gray-600 mb-2">Xin chọn ngày đi tour</p>
                                <div className="flex items-center">
                                    <button
                                        onClick={handleOpenDatePicker}
                                        className="flex items-center hover:opacity-80"
                                    >
                                        <span className="text-sm text-[#FF5B00]">1/4 - 31/12</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#FF5B00] ml-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] whitespace-nowrap pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                <div className="inline-flex gap-2">
                                    <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-[#FF5B00] hover:text-[#FF5B00] whitespace-nowrap">5/4</button>
                                    <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-[#FF5B00] hover:text-[#FF5B00] whitespace-nowrap">6/4</button>
                                    <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-[#FF5B00] hover:text-[#FF5B00] whitespace-nowrap">7/4</button>
                                    <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-[#FF5B00] hover:text-[#FF5B00] whitespace-nowrap">8/4</button>
                                    <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-[#FF5B00] hover:text-[#FF5B00] whitespace-nowrap">9/4</button>
                                    <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-[#FF5B00] hover:text-[#FF5B00] whitespace-nowrap">10/4</button>
                                    <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-[#FF5B00] hover:text-[#FF5B00] whitespace-nowrap">11/4</button>
                                    <button className="px-4 py-2 rounded-full border border-[#FF5B00] text-[#FF5B00] bg-orange-50 whitespace-nowrap">12/4</button>
                                    <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-[#FF5B00] hover:text-[#FF5B00] whitespace-nowrap">13/4</button>
                                    <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-[#FF5B00] hover:text-[#FF5B00] whitespace-nowrap">14/4</button>
                                    <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:border-[#FF5B00] hover:text-[#FF5B00] whitespace-nowrap">15/4</button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 font-roboto border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium mb-1">Người lớn</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[#FF5B00] font-medium">đ 881,803</p>
                                        <p className="text-sm text-gray-500 line-through">Giá cũ 990,000đ</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setEditingItem({ ...editingItem, adultCount: Math.max(0, editingItem.adultCount - 1) })}
                                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:border-[#FF5B00] hover:text-[#FF5B00]"
                                    >
                                        <MinusOutlined />
                                    </button>
                                    <span className="w-3 text-center text-base">{editingItem.adultCount}</span>
                                    <button
                                        onClick={() => setEditingItem({ ...editingItem, adultCount: editingItem.adultCount + 1 })}
                                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:border-[#FF5B00] hover:text-[#FF5B00]"
                                    >
                                        <PlusOutlined />
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium mb-1">Trẻ em(1-12)</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[#FF5B00] font-medium">đ 748,197</p>
                                        <p className="text-sm text-gray-500 line-through">Giá cũ 840,000đ</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setEditingItem({ ...editingItem, childCount: Math.max(0, editingItem.childCount - 1) })}
                                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:border-[#FF5B00] hover:text-[#FF5B00]"
                                    >
                                        <MinusOutlined />
                                    </button>
                                    <span className="w-3 text-center text-base">{editingItem.childCount}</span>
                                    <button
                                        onClick={() => setEditingItem({ ...editingItem, childCount: editingItem.childCount + 1 })}
                                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:border-[#FF5B00] hover:text-[#FF5B00]"
                                    >
                                        <PlusOutlined />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="fixed bottom-0 left-0 right-0 bg-white pt-2 pl-4 pr-4 pb-4 border-t border-gray-200">
                            <div className="flex justify-between items-center -mb-3">
                                <p className="text-[20px] text-slate-800 font-bold">đ {calculateTotal().toLocaleString()}</p>
                            </div>
                            <button
                                onClick={handleUpdateItem}
                                className="w-full bg-[#FF5B00] text-white py-3 cursor-pointer rounded-lg font-medium hover:bg-[#E65100]"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </>
                )}
            </Drawer>

            <Drawer
                title={
                    <div className="flex justify-between items-center">
                        <span className="text-base font-medium">Vui lòng chọn ngày</span>
                        <button onClick={handleCloseDatePicker} className="text-gray-800 border border-gray-300 rounded-full p-1 hover:bg-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                }
                placement="bottom"
                onClose={handleCloseDatePicker}
                open={isDatePickerOpen}
                height="83vh"
                closable={false}
                className="rounded-t-3xl"
            >
                <div>
                    <div className="grid grid-cols-7 gap-4 mb-4">
                        <div className="text-center text-sm">
                            <div className="text-gray-500">CN</div>
                        </div>
                        <div className="text-center text-sm">
                            <div className="text-gray-500">T2</div>
                        </div>
                        <div className="text-center text-sm">
                            <div className="text-gray-500">T3</div>
                        </div>
                        <div className="text-center text-sm">
                            <div className="text-gray-500">T4</div>
                        </div>
                        <div className="text-center text-sm">
                            <div className="text-gray-500">T5</div>
                        </div>
                        <div className="text-center text-sm">
                            <div className="text-gray-500">T6</div>
                        </div>
                        <div className="text-center text-sm">
                            <div className="text-gray-500">T7</div>
                        </div>
                    </div>

                    <div className="text-sm font-medium mb-4">Th4 2025</div>

                    <div className="grid grid-cols-7 gap-2">
                        {[...Array(30)].map((_, index) => (
                            <div key={index} className="text-center">
                                <button
                                    className={`w-10 h-14 rounded-lg flex flex-col items-center justify-center hover:bg-orange-50 
                                    ${index === 10 ? 'bg-[#FF5B00] text-white' : 'border border-gray-200'}`}
                                >
                                    <span className={`text-sm ${index === 10 ? 'text-white' : ''}`}>{index + 1}</span>
                                    <span className={`text-xs ${index === 10 ? 'text-white' : 'text-gray-500'}`}>990k</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </Drawer>
        </div>
    );
}