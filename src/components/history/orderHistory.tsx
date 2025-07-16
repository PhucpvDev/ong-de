import React from 'react';
import { FileText, Search } from 'lucide-react';
import { Tabs, Input, Typography, Button } from 'antd';
import Image from 'next/image';

const { Text, Paragraph } = Typography;

const OrderHistory = () => (
  <div className="!p-0">
    <div className="flex items-center justify-between">
      <Typography.Title level={4} className="!mb-0">Lịch sử đơn hàng</Typography.Title>
      <Input
        placeholder="Tìm kiếm theo mã đơn hàng hoặc tên dịch vụ"
        prefix={<Search size={20} className="!text-gray-700" />}
        size="middle"
        className="!w-md !p-1.5"
      />
    </div>

    <Tabs
      defaultActiveKey="completed"
      className="order-history-tabs"
      items={[
        {
          key: 'completed',
          label: 'Hoàn thành (2)',
          children: (
            <div className="space-y-4">
              <div className="!rounded-lg !p-4 !bg-white">
                <div className="border-dashed border-b border-gray-200 flex justify-between items-center mb-4 pb-3">
                  <div className="flex items-center gap-2">
                    <Text className="!text-gray-800 !text-sm">Làng Du Lịch Ông Đề: <span className="!text-gray-900 !font-semibold">Tổ 26, Ấp Mỹ Ái, Xã Mỹ Khánh, Phong Điền, Cần Thơ</span></Text>
                  </div>
                  <Text className="!text-gray-500 !text-sm">18:34 10/05/2024</Text>
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="!w-16 !h-16 !bg-green-50 !rounded-lg !flex !items-center !justify-center">
                      <div className="!w-12 !h-12 !bg-green-200 !rounded"></div>
                    </div>
                    <div>
                      <Text className="!font-semibold !text-gray-800 !block">Vé tham quan & trò chơi dân gian</Text>
                      <Text className="!text-gray-500 !text-sm">Phân loại: Vé người lớn</Text>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="!text-gray-400 !text-sm !line-through">100.000 đ</div>
                    <div className="!font-semibold !text-gray-900">70.000 đ</div>
                  </div>
                </div>
                <div className="flex justify-between items-center !pt-2 !border-t !border-gray-100">
                  <Text className="!text-gray-700 !text-sm">Cùng 1 dịch vụ khác →</Text>
                  <Text className="!font-semibold !text-gray-800">Thành tiền: <span className="text-base font-semibold">100.000 đ</span></Text>
                </div>
              </div>

              <div className="!rounded-lg !p-4 !bg-white">
                <div className="border-dashed border-b border-gray-200 flex justify-between items-center mb-4 pb-3">
                  <div className="flex items-center gap-2">
                    <Text className="!text-gray-800 !text-sm">Làng Du Lịch Ông Đề: <span className="!text-gray-900 !font-semibold">Tổ 26, Ấp Mỹ Ái, Xã Mỹ Khánh, Phong Điền, Cần Thơ</span></Text>
                  </div>
                  <Text className="!text-gray-500 !text-sm">14:20 05/04/2024</Text>
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="!w-16 !h-16 !bg-green-50 !rounded-lg !flex !items-center !justify-center">
                      <div className="!w-12 !h-12 !bg-green-200 !rounded"></div>
                    </div>
                    <div>
                      <Text className="!font-semibold !text-gray-800 !block">Homestay 1 đêm & bữa ăn miền Tây</Text>
                      <Text className="!text-gray-500 !text-sm">Phân loại: Phòng đôi</Text>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="!text-gray-400 !text-sm !line-through">450.000 đ</div>
                    <div className="!font-semibold !text-gray-900">400.000 đ</div>
                  </div>
                </div>
                <div className="flex justify-between items-center !pt-2 !border-t !border-gray-100">
                  <Text className="!text-gray-700 !text-sm">Cùng 1 dịch vụ khác →</Text>
                  <Text className="!font-semibold !text-gray-800">Thành tiền: <span className="text-base font-semibold">430.000 đ</span></Text>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'processing',
          label: 'Đang xử lý',
          children: (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg">
              <Image
                src="https://png.pngtree.com/png-vector/20230327/ourmid/pngtree-sticky-notes-flat-icon-vector-png-image_6670826.png"
                alt="No orders"
                className="w-24 mb-6"
                width={96}
                height={96}
              />
              <Text className="!text-lg !text-gray-800 font-medium mb-4">Không có đơn hàng nào</Text>
              <Paragraph className="max-w-80 text-center">Hãy thêm sản phẩm vào giỏ hàng và tạo đơn hàng ngay hôm nay!</Paragraph>
              <Button type="primary" className="!text-white">
                Mua ngay
              </Button>
            </div>
          )
        }
      ]}
    />
  </div>
);

export default OrderHistory;