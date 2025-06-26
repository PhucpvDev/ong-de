import { Breadcrumb, Row, Col, Card, Button, Divider, Tag, Space, Typography, Spin } from 'antd';
import { InfoCircleOutlined, ClockCircleOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';

const { Title, Paragraph, Text } = Typography;

export default function TicketDetails() {
  const locale = useLocale();
  const params = useParams();
  const id = params.ticketId;
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${id}?locale=${locale}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch ticket details');
        }
        
        const data = await response.json();
        setTicket(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ticket details:', error);
        setError(error.message || (locale === 'vi' ? 'Không thể tải thông tin vé' : 'Unable to load ticket information'));
        setLoading(false);
      }
    };

    if (id) {
      fetchTicketDetails();
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

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Title level={2} className="!text-xl !font-semibold !text-gray-600 !mb-2">
            {locale === 'vi' ? 'Không tìm thấy vé' : 'Ticket Not Found'}
          </Title>
          <Button type="primary" onClick={() => window.history.back()} className="!mt-4">
            {locale === 'vi' ? 'Quay lại' : 'Go Back'}
          </Button>
        </div>
      </div>
    );
  }

  const fullDescription = [
    ticket.description,
    locale === 'vi' 
      ? "Tham gia các hoạt động văn hóa đặc sắc và trải nghiệm đời sống miền Tây Nam Bộ."
      : "Join unique cultural activities and experience the life of the Mekong Delta.",
    locale === 'vi'
      ? "Đây là lựa chọn lý tưởng cho gia đình, nhóm bạn muốn tìm hiểu về văn hóa địa phương."
      : "This is an ideal choice for families and groups wanting to explore local culture."
  ];

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
              { title: locale === 'vi' ? 'Vé tham quan' : 'Tickets' },
              { title: ticket.name },
            ]}
            className="!text-sm"
          />
        </div>

        <Row gutter={[14, 24]}>
          <Col xs={24} lg={16}>
            <Card className="!border !border-dashed !border-orange-200 !rounded-3xl">
              <div className="mb-8">
                <Title level={3} className="!text-2xl lg:!text-xl !text-gray-800 !mb-4">
                  {locale === 'vi' ? 'Vé: ' : 'Ticket: '}{ticket.name}
                </Title>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                  <Text strong className="!text-base !text-gray-800">
                    {ticket.description}
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
                <div className="space-y-4">
                  {fullDescription.map((paragraph, index) => (
                    <Paragraph key={index} className="!text-gray-700 !leading-relaxed">{paragraph}</Paragraph>
                  ))}
                </div>
              </div>

              {ticket.policies && ticket.policies.length > 0 && (
                <>
                  <Divider className="!my-6" />
                  <div className="mb-0">
                    <Title level={3} className="!text-lg !font-semibold !text-gray-800 !mb-4">
                      {locale === 'vi' ? 'Chính sách vé' : 'Ticket Policies'}
                    </Title>
                    <div className="space-y-4">
                      {ticket.policies.map((policy, index) => (
                        <div key={index} className="border-l-4 border-orange-400 pl-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Tag color="orange" className="!font-medium">{policy.type}</Tag>
                            <Title level={4} className="!font-semibold !text-lg !text-gray-800 !m-0">{policy.name}</Title>
                          </div>
                          <Paragraph className="!text-gray-700 !leading-relaxed">{policy.content}</Paragraph>
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
                    {locale === 'vi' ? 'Bảng Giá Vé' : 'Ticket Pricing'}
                  </Title>
                  <Text className="!text-gray-500 !text-sm !font-medium !mt-1">
                    {locale === 'vi' ? 'Thông tin giá chi tiết' : 'Detailed Pricing Information'}
                  </Text>
                </div>

                {ticket.base_prices && ticket.base_prices.length > 0 && (
                  <div className="mb-8">
                    <Title level={4} className="!text-base !font-semibold !text-gray-800 !mb-4 !flex !items-center">
                      <div className="w-1 h-5 bg-blue-500 rounded mr-3"></div>
                      {locale === 'vi' ? 'Giá theo thời gian' : 'Price by Time'}
                    </Title>
                    <Space direction="vertical" className="!w-full" size="small">
                      {ticket.base_prices.map((price, index) => (
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

                {ticket.segment_prices && ticket.segment_prices.length > 0 && (
                  <>
                    <Divider className="!my-6" />
                    <div className="mb-8">
                      <Title level={4} className="!text-base !font-semibold !text-gray-800 !mb-4 !flex !items-center">
                        <div className="w-1 h-5 bg-green-500 rounded mr-3"></div>
                        {locale === 'vi' ? 'Giá theo đối tượng' : 'Price by Customer Segment'}
                      </Title>
                      <Space direction="vertical" className="!w-full" size="small">
                        {ticket.segment_prices.map((price, index) => (
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

                {ticket.capacity_prices && ticket.capacity_prices.length > 0 && (
                  <>
                    <Divider className="!my-6" />
                    <div className="mb-6">
                      <Title level={4} className="!text-base !font-semibold !text-gray-800 !mb-4 !flex !items-center">
                        <div className="w-1 h-5 bg-orange-500 rounded mr-3"></div>
                        {locale === 'vi' ? 'Giá theo đoàn' : 'Price by Group Size'}
                      </Title>
                      <Space direction="vertical" className="!w-full" size="small">
                        {ticket.capacity_prices.map((price, index) => (
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
                      ? 'Giá vé có thể thay đổi theo từng thời điểm. Vui lòng liên hệ để được tư vấn giá tốt nhất.'
                      : 'Ticket prices may vary by time. Please contact us for the best pricing.'}
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