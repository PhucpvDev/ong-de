import React from 'react';
import { Typography, Space, Image } from 'antd';
import { 
  FacebookOutlined, 
  YoutubeOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const CompanyFooter = () => {
  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <Title 
              level={2} 
              className="!text-gray-800 !font-bold !mb-6 !text-2xl"
            >
              Làng Du Lịch Sinh Thái Ông Đề
            </Title>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <EnvironmentOutlined className="!text-gray-800 !text-lg !mt-1" />
                <div>
                  <Text strong className="!text-gray-800 !mr-2">Địa chỉ:</Text>
                  <Text className="!text-gray-800">Tổ 26, Ấp Mỹ Ái, Xã Mỹ Khánh, Huyện Phong Điền, TP Cần Thơ</Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <PhoneOutlined className="!text-gray-800 !text-lg" />
                <div>
                  <Text strong className="!text-gray-800 !mr-2">Hotline:</Text>
                  <Text className="!text-gray-800 !font-medium">0901 276 222 (Ms. Mai) / 0931 852 113 (Ms. Nhung)</Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MailOutlined className="!text-gray-800 !text-lg" />
                <div>
                  <Text strong className="!text-gray-800 !mr-2">Email:</Text>
                  <Text className="!text-gray-800 !font-medium">dulichongde@gmail.com</Text>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ClockCircleOutlined className="!text-gray-800 !text-lg !mt-1" />
                <div>
                  <Text strong className="!text-gray-800 !block">Thời gian hoạt động:</Text>
                  <Text className="!text-gray-800">Hàng ngày, từ 7:00 sáng đến 18:00 tối</Text>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Text strong className="!text-gray-800 !block !mb-3">
                Theo dõi chúng tôi qua:
              </Text>
              <Space size="large">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <FacebookOutlined className="!text-white !text-lg" />
                </div>
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                  <YoutubeOutlined className="!text-white !text-lg" />
                </div>
              </Space>
            </div>
          </div>

          <div className="w-full h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://ongde.vn/wp-content/uploads/2021/04/104845027_267915557906999_1491511274180939392_n.jpg"
              alt="Hình ảnh Làng Du Lịch Sinh Thái Ông Đề"
              className="!w-full !h-full !object-cover"
              preview={false}
            />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text className="!text-gray-600">
              © 2025 Làng Du Lịch Sinh Thái Ông Đề. All Rights Reserved
            </Text>
            
            <div className="flex items-center gap-4">
              <Text>Ngôn ngữ:</Text>
              <Space size="small">
                <div className="w-8 h-6 bg-white border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <span className="text-gray-600 text-xs font-bold">VI</span>
                </div>
                <div className="w-8 h-6 bg-white border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <span className="text-gray-600 text-xs font-bold">EN</span>
                </div>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyFooter;