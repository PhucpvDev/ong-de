import React from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import {
  HomeOutlined,
  EnvironmentOutlined,
  StarOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import Image from 'next/image';

const { Title, Text, Paragraph } = Typography;

export default function PricingServices() {
  const experienceFeatures = [
    'Trải nghiệm làng quê đích thực',
    'Tham quan vườn trái cây',
    'Chèo thúng chai sông nước',
    'Ẩm thực đặc sản miền Tây'
  ];

  return (
    <div className="bg-white p-6">
      <div className="max-w-7xl md:px-6 px-4 mx-auto">
        <div className="text-center mb-12">
          <Title level={1} className="!text-3xl !mt-2">
            Làng du lịch sinh thái Ông Đề - Cần Thơ
          </Title>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card
              className="!h-full !border-orange-200 !bg-orange-50"
              bodyStyle={{ padding: '32px' }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src="https://placehold.co/50x50"
                    width={50}
                    height={50}
                    alt="Làng Du Lịch Ông Đề Icon"
                    className="rounded-full w-12 h-12 object-cover"
                    quality={90}
                  />
                </div>
                <div className="flex-1">
                  <Title level={3} className="!text-xl !mb-3">
                    Gói Homestay Cao Cấp
                  </Title>
                  <Paragraph className="!text-base font-medium !leading-relaxed block !mb-4">
                    Trải nghiệm nghỉ dưỡng độc đáo trong không gian làng quê yên bình,
                    tận hưởng cuộc sống miền Tây đích thực với các hoạt động văn hóa truyền thống
                  </Paragraph>
                  <Text className="!text-gray-800 !font-semibold !text-sm block !mb-6">
                    Giá linh hoạt theo nhu cầu
                  </Text>
                  <Button
                    type="primary"
                    size="large"
                    className="!bg-orange-500 !border-orange-500 hover:!bg-orange-600 hover:!border-orange-600 !rounded-full !px-8"
                  >
                    Xem chi tiết →
                  </Button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-orange-200">
                <Text className="!text-gray-800 !font-semibold !text-base block !mb-4">
                  Trải nghiệm đặc biệt:
                </Text>
                <Row gutter={[16, 12]}>
                  {experienceFeatures.map((feature, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <div className="flex items-center gap-2">
                        <CheckCircleOutlined className="!text-orange-600 !text-base" />
                        <Text className="!text-gray-700 font-medium !text-sm">{feature}</Text>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Row gutter={[0, 24]} className="h-full">
              <Col xs={24}>
                <Card
                  className="!border-green-200 !bg-green-50"
                  bodyStyle={{ padding: '24px' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="https://placehold.co/50x50"
                        width={50}
                        height={50}
                        alt="Làng Du Lịch Ông Đề Icon"
                        className="rounded-full w-12 h-12 object-cover"
                        quality={90}
                      />
                    </div>
                    <div className="flex-1">
                      <Title level={3} className="!text-xl !mb-3">
                        Tham Quan Trong Ngày
                      </Title>
                      <Paragraph className="font-medium !text-base !leading-relaxed block !mb-4">
                        Khám phá làng quê miền Tây với hành trình đầy thú vị: chèo thúng chai,
                        tham quan vườn trái cây, thưởng thức ẩm thực đặc sản
                      </Paragraph>
                      <Text className="!text-gray-800 !font-semibold !text-sm block !mb-4">
                        Chỉ từ <span className="!text-green-600">299,000đ</span> cho 1 người
                      </Text>
                      <Button
                        type="primary"
                        size="large"
                        className="!bg-green-500 !border-green-500 hover:!bg-green-600 hover:!border-green-600 !rounded-full !px-8"
                      >
                        Đặt tour →
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={24}>
                <Card
                  className="!border-blue-200 !bg-blue-50"
                  bodyStyle={{ padding: '24px' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="https://placehold.co/50x50"
                        width={50}
                        height={50}
                        alt="Làng Du Lịch Ông Đề Icon"
                        className="rounded-full w-12 h-12 object-cover"
                        quality={90}
                      />
                    </div>
                    <div className="flex-1">
                      <Title level={3} className="!text-xl !text-gray-900 !mb-3">
                        Gói VIP Cao Cấp
                      </Title>
                      <Paragraph className="font-medium !text-base !leading-relaxed block !mb-4">
                        Trải nghiệm du lịch sinh thái đẳng cấp với dịch vụ cá nhân hóa,
                        hướng dẫn viên riêng và các hoạt động độc quyền
                      </Paragraph>
                      <Text className="!text-gray-800 !font-semibold !text-sm block !mb-4">
                        Giá từ <span className="!text-blue-600">1,200,000đ</span> cho 2 người
                      </Text>
                      <Button
                        type="primary"
                        size="large"
                        className="!bg-blue-500 !border-blue-500 hover:!bg-blue-600 hover:!border-blue-600 !rounded-full !px-8"
                      >
                        Liên hệ →
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};
