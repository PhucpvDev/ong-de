import { Breadcrumb, Row, Col, Card, Button, Divider, Tag, Space, Typography, Spin, Image, Tooltip } from 'antd';
import { InfoCircleOutlined, ClockCircleOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import axios from 'axios';
import parse from 'html-react-parser';
import Head from 'next/head';
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
      <div className="min-h-screen mx-auto max-w-7xl px-6 py-6">
        <Spin size="large" className="flex items-center justify-center h-full" />
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
          <Space>
            <Button type="primary" onClick={() => window.history.back()} className="!mt-4">
              {locale === 'vi' ? 'Quay lại' : 'Go Back'}
            </Button>
            <Button type="default" onClick={() => fetchServiceDetails()} className="!mt-4">
              {locale === 'vi' ? 'Thử lại' : 'Retry'}
            </Button>
          </Space>
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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200 w-full">
      <div className="flex flex-col w-full sm:w-auto">
        <Title className="!text-sm sm:!text-base !text-gray-800 !mb-1">{label}</Title>
        {description && (
          <Text className="!text-sm !text-gray-600">{description}</Text>
        )}
      </div>
      <Title className="!text-base !text-gray-900 !mt-2 sm:!mt-0 sm:!ml-10 !shrink-0 !font-semibold">
        {price === 0 ? (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-orange-500 rounded-md">
            {locale === 'vi' ? 'Miễn phí' : 'Free'}
          </span>
        ) : (
          `${price.toLocaleString('vi-VN')} đ`
        )}
      </Title>
    </div>
  );

  return (
    <div className="min-h-screen mt-18">
      <Head>
        <meta name="keywords" content={service.keywords || ''} />
        <meta name="description" content={service.meta_description || service.short_description} />
        <title>{service.name}</title>
      </Head>
      <div className="mx-auto max-w-7xl md:px-6 px-4 py-6">
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
            {galleryImages.length > 0 ? (
              <Image.PreviewGroup>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="col-span-3 sm:col-span-2 row-span-1 sm:row-span-2">
                    <div className="relative overflow-hidden h-[250px] sm:h-[400px] rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-none">
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
                      <div className="relative overflow-hidden rounded-tr-2xl">
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
                        <div className="relative overflow-hidden rounded-br-2xl">
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
            ) : (
              <div className="h-[250px] sm:h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                <Text className="!text-gray-500">{locale === 'vi' ? 'Không có hình ảnh' : 'No images available'}</Text>
              </div>
            )}

            <Card className="!border !border-dashed !border-orange-200 !rounded-3xl">
              <div className="mb-8">
                <Space wrap className="mb-4">
                  {service.categories && service.categories.map((category, index) => (
                    <Tooltip title={category.description} key={index}>
                      <Text ellipsis={true}>
                        <Tag color="blue">{category.name}</Tag>
                      </Text>
                    </Tooltip>
                  ))}
                  {service.audiences && service.audiences.map((audience, index) => (
                    <Tooltip title={audience.description} key={index}>
                      <Text ellipsis={true}>
                        <Tag color="orange">{audience.name}</Tag>
                      </Text>
                    </Tooltip>
                  ))}
                </Space>
                <Title level={3} className="!text-2xl lg:!text-xl !text-gray-800 !mb-4">
                  {locale === 'vi' ? 'Dịch vụ: ' : 'Service: '}{service.name}
                </Title>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                  <Text strong className="!text-base !text-gray-800">
                    {service.short_description}
                  </Text>
                </div>
                <div className="mb-6 mt-6 border border-dashed border-orange-200 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-3 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <ClockCircleOutlined className="!text-orange-500" />
                      </div>
                      <div>
                        <Text strong className="!text-sm !text-gray-800">{locale === 'vi' ? 'Hủy miễn phí' : 'Free cancellation'}</Text>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CalendarOutlined className="!text-green-500" />
                      </div>
                      <div>
                        <Text strong className="!text-sm !text-gray-800">{locale === 'vi' ? 'Xác nhận ngay' : 'Instant confirmation'}</Text>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg">
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
                        <div key={index} className="border-l-4 border-orange-400 pl-4 rounded-l-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Title level={4} className="!font-semibold !text-base !text-gray-800 !m-0">{policy.name}</Title>
                            <Tag color="orange" className="!font-medium !ml-2">{policy.type}</Tag>
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
                <div className="text-center mb-8">
                  <Title level={3} className="!text-lg md:!text-xl !text-gray-800">
                    {locale === 'vi' ? 'Bảng giá dịch vụ' : 'Service Pricing'}
                  </Title>
                </div>

                {service.base_prices && service.base_prices.length > 0 && (
                  <div className="mb-8">
                    <div className="border-t-4 border-blue-500 p-2 mb-3 text-center rounded-r-lg rounded-l-lg">
                      <Text strong className="!text-base !text-blue-800">
                        {locale === 'vi' ? 'Giá cơ bản' : 'Base Price'}
                      </Text>
                    </div>
                    <Space direction="vertical" className="!w-full" size="middle">
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
                  <div className="mb-8">
                    <div className="border-t-4 border-green-500 p-2 mb-3 text-center rounded-r-lg rounded-l-lg">
                      <Text strong className="!text-base !text-green-800">
                        {locale === 'vi' ? 'Giá theo đối tượng' : 'Price by Customer Segment'}
                      </Text>
                    </div>
                    <Space direction="vertical" className="!w-full" size="middle">
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
                )}

                {service.capacity_prices && service.capacity_prices.length > 0 && (
                  <div className="mb-8">
                    <div className="border-t-4 border-orange-500 p-2 mb-3 text-center rounded-r-lg rounded-l-lg">
                      <Text strong className="!text-base !text-orange-600">
                        {locale === 'vi' ? 'Giá theo đoàn' : 'Price by Group Size'}
                      </Text>
                    </div>
                    <Space direction="vertical" className="!w-full" size="middle">
                      {service.capacity_prices.map((price, index) => (
                        <PriceItem
                          key={index}
                          label={`Đoàn ${price.min_person}-${price.max_person} ${locale === 'vi' ? 'người' : 'people'}`}
                          price={price.price}
                          description={`${price.price_type.name} - ${locale === 'vi' ? 'Giá trên mỗi người' : 'Price per person'}`}
                          locale={locale}
                        />
                      ))}
                    </Space>
                  </div>
                )}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-600 mb-2">
                    <InfoCircleOutlined />
                    <Text strong className="!text-sm">{locale === 'vi' ? 'Lưu ý quan trọng' : 'Important Note'}</Text>
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