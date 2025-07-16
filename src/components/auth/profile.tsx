import React, { useState } from 'react';
import {
  User,
  FileText,
  Tag,
  Bell,
  Settings,
  Calendar,
  Upload,
  UserCircle
} from 'lucide-react';
import {
  Layout,
  Tabs,
  Card,
  Input,
  DatePicker,
  Select,
  Button,
  Avatar,
  Upload as AntUpload,
  Typography,
} from 'antd';
import Image from 'next/image';
import OrderHistory from '@/components/history/orderHistory';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

export default function ProfileSettings() {
  const renderPersonalInfo = () => (
    <div>
      <Title level={4} className="!mb-5">Thông tin cá nhân</Title>
      <Card className="p-6">
        <div className="flex min-w-max mb-3">
          <div className="flex flex-col items-center mr-7">
            <Text className="!font-semibold mb-4">Ảnh đại diện</Text>
            <Avatar size={80} icon={<User />} className="mb-4" />
          </div>
          <div className='mt-10'>
            <AntUpload>
              <Button icon={<Upload size={16} />} className="mb-2 !font-medium hover:!border-green-500 hover:!text-green-500">Cập nhật ảnh mới</Button>
            </AntUpload>
            <Text className="!text-sm !text-gray-500 font-medium !max-w-36">
              Dung lượng file tối đa 5 MB.<br />
              Định dạng: .JPEG, .PNG
            </Text>
          </div>
        </div>
        <div className="flex gap-12">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-5">
                <div>
                  <Text className="block !text-base !font-medium mb-2">Họ và tên</Text>
                  <Input placeholder="Khách hàng" size="large" defaultValue="Khách hàng" />
                </div>
                <div>
                  <Text className="block !text-base !font-medium mb-2">Ngày sinh</Text>
                  <DatePicker
                    placeholder="Ngày sinh"
                    size="large"
                    className="w-full"
                    suffixIcon={<Calendar size={16} />}
                  />
                </div>
                <div>
                  <Text className="block !text-base !font-medium mb-2">Giới tính</Text>
                  <Select placeholder="Giới tính" size="large" className="w-full" defaultValue="Giới tính">
                    <Option value="male">Nam</Option>
                    <Option value="female">Nữ</Option>
                    <Option value="other">Khác</Option>
                  </Select>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <Text className="block !text-base !font-medium mb-2 text-gray-700">Số điện thoại</Text>
                  <Input placeholder="**** *** 916" size="large" />
                </div>
                <div>
                  <Text className="block !text-base !font-medium mb-2 text-gray-700">Email</Text>
                  <div className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 h-10">
                    <Text className="text-gray-500">Email chưa được cập nhật</Text>
                    <Button type="link" className="p-0 !text-green-600 !font-medium">
                      Cập nhật →
                    </Button>
                  </div>
                </div>
                <div>
                  <Text className="block !text-base !font-medium mb-2 text-gray-700">Mật khẩu</Text>
                  <div className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 h-10">
                    <Text className="text-gray-500">Tạo mật khẩu</Text>
                    <Button type="link" className="p-0 !text-green-600 !font-medium">
                      Cập nhật →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button type="default" size="large" className="hover:!border-green-500 hover:!text-green-500 px-8 h-10">
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderDiscountCodes = () => (
    <div>
      <Title level={4} className="!mb-5">Mã giảm giá</Title>
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
        <Button type="primary" className="!bg-green-500 hover:!bg-green-600 !text-white">
          Mua ngay
        </Button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div>
      <Title level={4} className="!mb-5">Thông báo của tôi</Title>
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
        <Button type="primary" className="!bg-green-500 hover:!bg-green-600 !text-white">
          Mua ngay
        </Button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div>
      <Title level={4} className="!mb-5">Cài đặt</Title>
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
        <Button type="primary" className="!bg-green-500 hover:!bg-green-600 !text-white">
          Mua ngay
        </Button>
      </div>
    </div>
  );

  const tabItems = [
    {
      key: 'personal-info',
      icon: <UserCircle size={20} />,
      label: 'Thông tin cá nhân',
      children: renderPersonalInfo(),
    },
    {
      key: 'order-history',
      icon: <FileText size={20} />,
      label: 'Lịch sử đơn hàng',
      children: <OrderHistory />,
    },
    {
      key: 'discount-codes',
      icon: <Tag size={20} />,
      label: 'Mã giảm giá',
      children: renderDiscountCodes(),
    },
    {
      key: 'notifications',
      icon: <Bell size={20} />,
      label: 'Thông báo của tôi',
      children: renderNotifications(),
    },
    {
      key: 'settings',
      icon: <Settings size={20} />,
      label: 'Cài đặt',
      children: renderSettings(),
    },
  ];

  const [activeTab, setActiveTab] = useState(tabItems[0].key);

  function handleTabClick(key: string) {
    setActiveTab(key);
  }

  function renderContent() {
    const active = tabItems.find(item => item.key === activeTab);
    return active ? active.children : null;
  }

  return (
    <div className="bg-gray-100">
      <Content className="p-6 max-w-7xl mx-auto pt-22 !pb-10">
        <div className="flex gap-6">
          <div className="w-70">
            <div className="bg-white rounded-md overflow-hidden">
              <div className="px-3 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://www.comsys.rwth-aachen.de/team/johannes-lohmoeller/avatar_list_hu_db59d60679f1ccce.jpg"
                      alt="Phúc rờm"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <Title className="!text-base font-medium text-gray-800">Phúc rờm</Title>
                </div>
              </div>
              {tabItems.map((item) => (
                <div key={item.key}>
                  <div
                    className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-all duration-200 relative ${
                      item.key === activeTab
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleTabClick(item.key)}
                  >
                    <Text
                      className={`flex items-center justify-center rounded-lg ${
                        item.key === activeTab ? '!text-green-800' : '!text-gray-800'
                      }`}
                    >
                      {item.icon}
                    </Text>
                    <Text
                      className={`!text-base mt-0.5 font-medium ${
                        item.key === activeTab ? '!text-green-800' : '!text-gray-800'
                      }`}
                    >
                      {item.label}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="">
              {renderContent()}
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
};