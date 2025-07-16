import React from 'react';
import { Layout, Row, Col, Typography, Space, Button } from 'antd';
import Image from 'next/image';
import { IMAGES } from '@/constants/theme';
import { Link } from '@/i18n/routing';

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function OngDeFooter() {
  return (
    <div className="mt-10 border-t-7 border-green-600 bg-gray-100 !py-8">
      <div className="w-7xl mx-auto px-6">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="!text-gray-900 !mb-4">
              Về Làng Du Lịch Ông Đề
            </Title>
            <Space direction="vertical" size="small" className="w-full text-[15px]">
              <Link href="/about" className="!text-gray-900 hover:!text-green-600">Giới thiệu</Link>
              <Link href="/policy" className="!text-gray-900 hover:!text-green-600">Chính sách bảo mật</Link>
              <Link href="/policy" className="!text-gray-900 hover:!text-green-600">Điều khoản sử dụng</Link>
              <Link href="/policy" className="!text-gray-900 hover:!text-green-600">Chính sách thanh toán</Link>
              <Link href="/policy" className="!text-gray-900 hover:!text-green-600">Chính sách bảo vệ dữ liệu cá nhân</Link>
              <Link href="/policy" className="!text-gray-900 hover:!text-green-600">Điều khoản sử dụng</Link>
              <Link href="https://ongdecantho.vn/faq" className="!text-gray-900 hover:!text-green-600">Câu hỏi thường gặp</Link>
              <Link href="/contact" className="!text-gray-900 hover:!text-green-600">Liên hệ</Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="!text-gray-900 !mb-4">
              Dịch vụ
            </Title>
            <Space direction="vertical" size="small" className="w-full text-[15px]">
              <Link href="/packages" className="!text-gray-900 hover:!text-green-600">Gói tiết kiệm</Link>
              <Link href="/tickets" className="!text-gray-900 hover:!text-green-600">Vé</Link>
              <Link href="/homestay" className="!text-gray-900 hover:!text-green-600">Homestay</Link>
              <Link href="/rental-services" className="!text-gray-900 hover:!text-green-600">Dịch vụ cho thuê</Link>
              <Link href="/activities" className="!text-gray-900 hover:!text-green-600">Hoạt động trải nghiệm</Link>
              <Link href="/activities" className="!text-gray-900 hover:!text-green-600">Tin tức</Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="!text-gray-900 !mb-4">
              Tổng đài hỗ trợ
            </Title>
            <Space direction="vertical" size="small" className="w-full text-[15px]">
              <Text className="!text-gray-900">Hỗ trợ đặt gói tiết kiệm</Text>
              <Text className="!text-green-900 !font-semibold !text-sm">0909 123 456</Text>
              <Text className="!text-gray-900">Hỗ trợ homestay</Text>
              <Text className="!text-green-900 !font-semibold !text-sm">0909 654 321</Text>
              <Text className="!text-gray-900">Khiếu nại và góp ý</Text>
              <Text className="!text-green-900 !font-semibold !text-sm">0909 654 321</Text>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="!text-gray-900 !mb-4">
              Theo dõi chúng tôi trên
            </Title>
            <Space direction="vertical" size="middle" className="w-full text-[15px]">
              <Button
                type="text"
                className="!flex !items-center !font-medium !justify-start !p-0 !h-auto !text-gray-900 hover:!text-blue-600"
              >
                <Image
                  src={IMAGES.Icon_Facebook}
                  alt="Facebook"
                  width={300}
                  height={200}
                  className="w-6 h-6 object-cover"
                />
                Facebook
              </Button>
              <Button
                type="text"
                className="!flex !items-center !font-medium !justify-start !p-0 !h-auto !text-gray-900 hover:!text-red-600"
              >
                <Image
                  src={IMAGES.Icon_Youtube}
                  alt="Youtube"
                  width={300}
                  height={200}
                  className="w-6 h-5 object-cover rounded-lg"
                />
                Youtube
              </Button>
              <Button
                type="text"
                className="!flex !items-center !font-medium !justify-start !p-0 !h-auto !text-gray-900 hover:!text-red-600"
              >
                <Image
                  src={IMAGES.Icon_Zalo}
                  alt="Zalo"
                  width={300}
                  height={200}
                  className="w-6 h-5 object-cover rounded-lg"
                />
                Zalo
              </Button>
            </Space>

            <div className="mt-6">
              <Title level={5} className="!text-gray-900 !mb-4">
                Hỗ trợ thanh toán
              </Title>
              <div className="flex flex-wrap gap-2">
                <Image
                  src={IMAGES.Icon_Cod}
                  alt="Bank Card"
                  width={300}
                  height={200}
                  className="w-14 h-full object-cover"
                />
                <Image
                  src={IMAGES.Icon_Momo}
                  alt="Momo"
                  width={300}
                  height={200}
                  className="w-14 h-full object-cover"
                />
              </div>
            </div>
          </Col>
        </Row>

        <div className="mt-8 pt-6 border-t border-gray-300">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <div className="text-sm text-gray-900">
                <Text strong className="!text-gray-900">Làng Du Lịch Sinh Thái Ông Đề Cần Thơ</Text>
                <br />
                Địa chỉ: Phường Cái Khế, Quận Ninh Kiều, Thành phố Cần Thơ, Việt Nam
                <br />
                Điện thoại: 0909 123 456 - Email: info@ongdecantho.vn
              </div>
            </Col>
            <Col xs={24} lg={12} className="!text-right">
              <Paragraph className="!text-sm">
                GCNDKDN: 1234567890 do Sở KH & ĐT Thành phố Cần Thơ cấp ngày 15/08/2020.
                <br />
                Website: <Link href="https://ongdecantho.vn">https://ongdecantho.vn</Link>
              </Paragraph>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
