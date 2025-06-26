import { Breadcrumb, Row, Col, Card, Button, Divider, Tag, Space, Typography, Spin, Image } from 'antd';
import { InfoCircleOutlined, ClockCircleOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import axios from 'axios';
import parse from 'html-react-parser';
import { IMAGES } from '@/constants/theme';

const { Title, Paragraph, Text } = Typography;

export default function RentalServiceDetails() {
  const locale = useLocale();
  const params = useParams();
  const slug = params.serviceSlug;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://uat-ongde.thanhlc.top/api/v1/rental-services/${slug}?locale=${locale}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            timeout: 10000,
          }
        );

        if (response.data.status !== 'success') {
          throw new Error('Failed to fetch rental service details');
        }

        setService(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rental service details:', error);
        setError(error.message || (locale === 'vi' ? 'Không thể tải thông tin dịch vụ' : 'Unable to load service information'));
        setLoading(false);
      }
    };

    if (slug) {
      fetchServiceDetails();
    }
  }, [locale, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Title level={2} className="!text-xl !font-semibold !text-red-600 !mb-2">
            {locale === 'vi' ? 'Lỗi tải dữ liệu' : 'Error Loading Data'}
          </Title>
          <Paragraph className="!text-gray-600">{error}</Paragraph>
          <Button type="primary" onClick={() => window.history.back()} className="!mt-4">
            {locale === 'vi' ? 'Quay lại' : 'Go Back'}
          </Button>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Title level={2} className="!text-xl !font-semibold !text-gray-600 !mb-2">
            {locale === 'vi' ? 'Không tìm thấy dịch vụ' : 'Service Not Found'}
          </Title>
          <Button type="primary" onClick={() => window.history.back()} className="!mt-4">
            {locale === 'vi' ? 'Quay lại' : 'Go Back'}
          </Button>
        </div>
      </div>
    );
  }

  const galleryImages = [service.main_image, ...(service.images || [])].filter(Boolean);

  const PriceItem = ({ label, price, description, locale }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-200 w-full">
      <div className="flex flex-col w-full sm:w-auto">
        <Text strong className="!text-sm sm:!text-base !text-gray-800">{label}</Text>
        {description && (
          <Text className="!text-xs !text-gray-700 !mt-1 !line-clamp-2 sm:!line-clamp-none">
            {description}
          </Text>
        )}
      </div>
      <Text strong className="!text-base !text-orange-600 !mt-2 sm:!mt-0 sm:!ml-4 !shrink-0">
        {price === 0 ? (
          <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-green-600 bg-green-100 rounded">
            {locale === 'vi' ? 'Miễn phí' : 'Free'}
          </span>
        ) : (
          `${price.toLocaleString('vi-VN')} đ`
        )}
      </Text>
    </div>
  );

  return (
    <div className="min-h-screen mt-18">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="bg-white mb-8">
          <Breadcrumb
            items={[
              { title: locale === 'vi' ? 'Trang chủ' : 'Home' },
              { title: locale === 'vi' ? 'Dịch vụ cho thuê' : 'Rental Services' },
              { title: service.name },
            ]}
            className="!text-sm"
          />
        </div>

        <Row gutter={[14, 24]}>
          <Col xs={24} lg={16}>
            {galleryImages.length > 0 && (
              <div className="mb-4">
                <Image.PreviewGroup>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-3 sm:col-span-2 row-span-1 sm:row-span-2">
                      <div className="relative overflow-hidden h-[250px] sm:h-[400px] rounded-t-lg sm:rounded-l-lg sm:rounded-t-none">
                        <Image
                          src={galleryImages[0] || IMAGES.defaultImage}
                          alt={service.name}
                          width="100%"
                          height="100%"
                          className="!w-full !h-full !object-cover"
                          preview
                        />
                      </div>
                    </div>
                    {galleryImages.length > 1 && (
                      <div className="hidden sm:grid grid-rows-2 gap-2 h-[400px]">
                        <div className="relative overflow-hidden rounded-tr-lg">
                          <Image
                            src={galleryImages[1] || IMAGES.defaultImage}
                            alt={`${service.name} - Image 2`}
                            width="100%"
                            height="100%"
                            className="!w-full !h-full !object-cover"
                            preview
                          />
                        </div>
                        {galleryImages.length > 2 && (
                          <div className="relative overflow-hidden rounded-br-lg">
                            <Image
                              src={galleryImages[2] || IMAGES.defaultImage}
                              alt={`${service.name} - Image 3`}
                              width="100%"
                              height="100%"
                              className="!w-full !h-full !object-cover"
                              preview
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Image.PreviewGroup>
              </div>
            )}

            <Card className="!border !border-dashed !border-orange-200 !rounded-3xl">
              <div className="mb-8">
                <Title level={3} className="!text-2xl lg:!text-xl !text-gray-800 !mb-4">
                  Dịch vụ: {service.name}
                </Title>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                  <Text strong className="!text-base !text-gray-800">
                    {service.short_description}
                  </Text>
                </div>
                <div className="mb-6 mt-6 border border-dashed border-orange-200 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <ClockCircleOutlined className="!text-orange-500" />
                      </div>
                      <div>
                        <Text strong className="!text-sm !text-gray-800">{locale === 'vi' ? 'Hủy miễn phí' : 'Free cancellation'}</Text>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CalendarOutlined className="!text-green-500" />
                      </div>
                      <div>
                        <Text strong className="!text-sm !text-gray-800">{locale === 'vi' ? 'Xác nhận ngay' : 'Instant confirmation'}</Text>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserOutlined className="!text-blue-500" />
                      </div>
                      <div>
                        <Text strong className="!text-sm !text-gray-800">{locale === 'vi' ? 'Hỗ trợ 24/7' : '24/7 Support'}</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Divider className="!my-6" />

              <div className="mb-8">
                <Title level={3} className="!text-lg !font-semibold !text-gray-800 !mb-4">
                  {locale === 'vi' ? 'Mô tả chi tiết' : 'Detailed Description'}
                </Title>
                <div className="space-y-4">{parse(service.long_description || service.short_description)}</div>
              </div>

              {service.policies && service.policies.length > 0 && (
                <>
                  <Divider className="!my-6" />
                  <div className="mb-0">
                    <Title level={3} className="!text-lg !font-semibold !text-gray-800 !mb-4">
                      {locale === 'vi' ? 'Chính sách dịch vụ' : 'Service Policies'}
                    </Title>
                    <div className="space-y-4">
                      {service.policies.map((policy, index) => (
                        <div key={index} className="border-l-4 border-orange-400 pl-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Tag color="orange" className="!font-medium">{policy.type}</Tag>
                            <Title level={4} className="!font-semibold !text-lg !text-gray-800 !m-0">{policy.name}</Title>
                          </div>
                          <Paragraph className="!text-gray-700 !leading-relaxed">{policy.content}</Paragraph>
                          {policy.description && (
                            <Text className="!text-gray-600 !text-sm !mt-1">{policy.description}</Text>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <div className="sticky top-20">
              <Card className="!border !border-dashed !border-orange-200 !rounded-3xl">
                <div className="text-center mb-6">
                  <Title level={3} className="!text-lg md:!text-xl !font-bold !text-gray-800">
                    {locale === 'vi' ? 'Bảng Giá Dịch Vụ' : 'Service Pricing'}
                  </Title>
                  <Text className="!text-gray-500 !text-sm !font-medium !mt-1">
                    {locale === 'vi' ? 'Thông tin giá chi tiết' : 'Detailed Pricing Information'}
                  </Text>
                </div>

                {service.base_prices && service.base_prices.length > 0 && (
                  <div className="mb-8">
                    <Title level={4} className="!text-base !font-semibold !text-gray-800 !mb-4 !flex !items-center">
                      <div className="w-1 h-5 bg-blue-500 rounded mr-3"></div>
                      {locale === 'vi' ? 'Giá theo thời gian' : 'Price by Time'}
                    </Title>
                    <Space direction="vertical" className="!w-full" size="small">
                      {service.base_prices.map((price, index) => (
                        <PriceItem
                          key={index}
                          label={price.price_type.name}
                          price={price.price}
                          description={price.price_type.description}
                          locale={locale}
                        />
                      ))}
                    </Space>
                  </div>
                )}

                {service.segment_prices && service.segment_prices.length > 0 && (
                  <>
                    <Divider className="!my-6" />
                    <div className="mb-8">
                      <Title level={4} className="!text-base !font-semibold !text-gray-800 !mb-4 !flex !items-center">
                        <div className="w-1 h-5 bg-green-500 rounded mr-3"></div>
                        {locale === 'vi' ? 'Giá theo đối tượng' : 'Price by Customer Segment'}
                      </Title>
                      <Space direction="vertical" className="!w-full" size="small">
                        {service.segment_prices.map((price, index) => (
                          <PriceItem
                            key={index}
                            label={price.customer_segment.name}
                            price={price.price}
                            description={price.customer_segment.description || price.price_type.description}
                            locale={locale}
                        />
                        ))}
                      </Space>
                    </div>
                  </>
                )}

                {service.capacity_prices && service.capacity_prices.length > 0 && (
                  <>
                    <Divider className="!my-6" />
                    <div className="mb-6">
                      <Title level={4} className="!text-base !font-semibold !text-gray-800 !mb-4 !flex !items-center">
                        <div className="w-1 h-5 bg-orange-500 rounded mr-3"></div>
                        {locale === 'vi' ? 'Giá theo đoàn' : 'Price by Group Size'}
                      </Title>
                      <Space direction="vertical" className="!w-full" size="small">
                        {service.capacity_prices.map((price, index) => (
                          <PriceItem
                            key={index}
                            label={`Đoàn ${price.min_person}-${price.max_person} người`}
                            price={price.price}
                            description={`${price.price_type.name} - ${locale === 'vi' ? 'Giá trên mỗi người' : 'Price per person'}`}
                            locale={locale}
                          />
                        ))}
                      </Space>
                    </div>
                  </>
                )}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-600 mb-2">
                    <InfoCircleOutlined />
                    <Text strong className="!text-sm">
                      {locale === 'vi' ? 'Lưu ý quan trọng' : 'Important Note'}
                    </Text>
                  </div>
                  <Text className="!text-xs !text-blue-600 !leading-relaxed">
                    {locale === 'vi'
                      ? 'Giá dịch vụ có thể thay đổi theo từng thời điểm. Vui lòng liên hệ để được tư vấn giá tốt nhất.'
                      : 'Service prices may vary by time. Please contact us for the best pricing.'}
                  </Text>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}