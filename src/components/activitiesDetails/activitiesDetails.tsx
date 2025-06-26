import { Breadcrumb, Row, Col, Card, Button, Divider, Tag, Space, Typography, Spin, Image } from 'antd';
import { InfoCircleOutlined, ClockCircleOutlined, CalendarOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import axios from 'axios';
import parse from 'html-react-parser';

const { Title, Paragraph, Text } = Typography;

export default function ActivitiesDetails() {
  const locale = useLocale();
  const params = useParams();
  const id = params.activitiesId;
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/activities/${id}?locale=${locale}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            timeout: 10000,
          }
        );

        if (response.data.status !== 'success') {
          throw new Error('Failed to fetch activity data');
        }

        const activity = response.data.data;
        setServiceData({
          id: activity.id,
          name: activity.name,
          short_description: activity.short_description,
          long_description: activity.long_description,
          main_image: activity.main_image,
          images: activity.images || [],
          policies: activity.policies || [],
          base_prices: activity.base_prices || [],
          segment_prices: activity.segment_prices || [],
          capacity_prices: activity.capacity_prices || [],
          conditions: activity.conditions,
          location_area: activity.location_area,
          min_participants: activity.min_participants,
          max_participants: activity.max_participants,
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activity details:', err);
        setError(err.message || (locale === 'vi' ? 'Không thể tải thông tin hoạt động' : 'Unable to load activity information'));
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [locale, id]);

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

  if (!serviceData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Title level={2} className="!text-xl !font-semibold !text-gray-600 !mb-2">
            {locale === 'vi' ? 'Không tìm thấy hoạt động' : 'Activity Not Found'}
          </Title>
          <Button type="primary" onClick={() => window.history.back()} className="!mt-4">
            {locale === 'vi' ? 'Quay lại' : 'Go Back'}
          </Button>
        </div>
      </div>
    );
  }

  const galleryImages = [serviceData.main_image, ...(serviceData.images || [])].filter(Boolean);
  const fullTourInfo = [
    serviceData.short_description,
    serviceData.includes,
    locale === 'vi' ? 'Khám phá kênh rạch xanh mát và văn hóa sông nước miền Tây.' : 'Explore lush canals and the river culture of the Mekong Delta.',
    locale === 'vi' ? 'Tận hưởng không khí trong lành cùng hướng dẫn viên địa phương.' : 'Enjoy fresh air with a local guide.',
  ].filter(Boolean);

  const fullDescription = [
    serviceData.long_description,
    locale === 'vi' ? 'Hoạt động phù hợp cho gia đình, nhóm bạn muốn trải nghiệm văn hóa miền Tây Nam Bộ.' : 'Activity suitable for families and groups wanting to experience Mekong Delta culture.',
    locale === 'vi' ? 'Hướng dẫn viên sẽ chia sẻ về lịch sử và đời sống người dân vùng sông nước.' : 'The guide will share insights about the history and life of the river region.',
  ].filter(Boolean);

  const PriceItem = ({ label, price, description, locale }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200 w-full">
      <div className="flex flex-col w-full sm:w-auto">
        <Title className="!text-sm sm:!text-base !text-gray-800 !mb-1">{label}</Title>
        {description && (
          <Text className="!text-sm !text-gray-600">
            {description}
          </Text>
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
      <div className="mx-auto max-w-7xl px-6 py-6" style={{ minHeight: '100vh' }}>
        <div className="bg-white mb-8">
          <Breadcrumb
            items={[
              { title: locale === 'vi' ? 'Trang chủ' : 'Home' },
              { title: locale === 'vi' ? 'Hoạt động' : 'Activities' },
              { title: serviceData.name },
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
                          src={galleryImages[0] || '/default-image.jpg'}
                          alt={serviceData.name}
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
                            src={galleryImages[1] || '/default-image.jpg'}
                            alt={`${serviceData.name} - Image 2`}
                            width="100%"
                            height="100%"
                            className="!w-full !h-full !object-cover"
                            preview
                          />
                        </div>
                        {galleryImages.length > 2 && (
                          <div className="relative overflow-hidden rounded-br-lg">
                            <Image
                              src={galleryImages[2] || '/default-image.jpg'}
                              alt={`${serviceData.name} - Image 3`}
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
                  {locale === 'vi' ? 'Hoạt động: ' : 'Activity: '}{serviceData.name}
                </Title>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                  <Text strong className="!text-base !text-gray-800">
                    {serviceData.short_description}
                  </Text>
                </div>
                <div className="mb-6 mt-6 border border-dashed border-orange-200 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceData.conditions && (
                      <div className="flex items-center space-x-3 p-3 rounded-lg">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <InfoCircleOutlined className="!text-orange-500" />
                        </div>
                        <div>
                          <Text strong className="!text-sm !text-gray-800">{locale === 'vi' ? 'Điều kiện:' : 'Conditions:'}</Text>
                          <Text className="!text-sm"> {serviceData.conditions}</Text>
                        </div>
                      </div>
                    )}
                    {serviceData.location_area && (
                      <div className="flex items-center space-x-3 p-3 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <EnvironmentOutlined className="!text-blue-500" />
                        </div>
                        <div>
                          <Text strong className="!text-sm !text-gray-800">{locale === 'vi' ? 'Khu vực:' : 'Location:'}</Text>
                          <Text className="!text-sm "> {serviceData.location_area}</Text>
                        </div>
                      </div>
                    )}
                    {(serviceData.min_participants || serviceData.max_participants) && (
                      <div className="flex items-center space-x-3 p-3 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <UserOutlined className="!text-green-500" />
                        </div>
                        <div>
                          <Text strong className="!text-sm !text-gray-800">{locale === 'vi' ? 'Số lượng người tham gia:' : 'Participants:'}</Text>
                          <Text className="!text-sm !text-gray-600">
                            {locale === 'vi' ? ` Từ ${serviceData.min_participants} đến ${serviceData.max_participants} người` : ` ${serviceData.min_participants} to ${serviceData.max_participants} participants`}
                          </Text>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Divider className="!my-6" />

              <div className="mb-8">
                <Title level={3} className="!text-lg !font-semibold !text-gray-800 !mb-4">
                  {locale === 'vi' ? 'Mô tả chi tiết' : 'Detailed Description'}
                </Title>
                <div className="space-y-4">
                  {fullDescription.map((paragraph, index) => (
                    <div key={index}>{parse(paragraph)}</div>
                  ))}
                </div>
              </div>

              {serviceData.policies && serviceData.policies.length > 0 && (
                <>
                  <Divider className="!my-6" />
                  <div className="mb-0">
                    <Title level={3} className="!text-lg !font-semibold !text-gray-800 !mb-4">
                      {locale === 'vi' ? 'Chính sách hoạt động' : 'Activity Policies'}
                    </Title>
                    <div className="space-y-4">
                      {serviceData.policies.map((policy, index) => (
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
                    {locale === 'vi' ? 'Bảng giá hoạt động' : 'Activity Pricing'}
                  </Title>
                </div>

                {serviceData.base_prices && serviceData.base_prices.length > 0 && (
                  <div className="mb-8">
                    <div className="border-t-4 border-blue-500 p-2 mb-3 text-center rounded-r-lg rounded-l-lg">
                      <Text strong className="!text-base !text-blue-800">
                        {locale === 'vi' ? 'Giá theo thời gian' : 'Price by Time'}
                      </Text>
                    </div>
                    <Space direction="vertical" className="!w-full" size="middle">
                      {serviceData.base_prices.map((price, index) => (
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

                {serviceData.segment_prices && serviceData.segment_prices.length > 0 && (
                  <>
                    <div className="mb-8">
                      <div className="border-t-4 border-green-500 p-2 mb-3 text-center rounded-r-lg rounded-l-lg">
                        <Text strong className="!text-base !text-green-700">
                          {locale === 'vi' ? 'Giá theo đối tượng' : 'Price by Customer Segment'}
                        </Text>
                      </div>
                      <Space direction="vertical" className="!w-full" size="middle">
                        {serviceData.segment_prices.map((price, index) => (
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

                {serviceData.capacity_prices && serviceData.capacity_prices.length > 0 && (
                  <>
                    <div className="mb-6">
                      <div className="border-t-4 border-orange-500 p-2 mb-3 text-center rounded-r-lg rounded-l-lg">
                        <Text strong className="!text-base !text-orange-600">
                          {locale === 'vi' ? 'Giá theo đoàn' : 'Price by Group Size'}
                        </Text>
                      </div>
                      <Space direction="vertical" className="!w-full" size="middle">
                        {serviceData.capacity_prices.map((price, index) => (
                          <PriceItem
                            key={index}
                            label={`${price.min_person}-${price.max_person} ${locale === 'vi' ? 'người' : 'people'}`}
                            price={price.price}
                            description={`${price.price_type.name} - ${locale === 'vi' ? 'Giá/người' : 'Per person'}`}
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
                      ? 'Giá hoạt động có thể thay đổi theo từng thời điểm. Vui lòng liên hệ để được tư vấn giá tốt nhất.'
                      : 'Activity prices may vary by time. Please contact us for the best pricing.'}
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