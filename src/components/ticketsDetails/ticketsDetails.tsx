import { Breadcrumb, Row, Col, Card, Button, Divider, Tag, Space, Typography, Spin, Image } from 'antd';
import { InfoCircleOutlined, ClockCircleOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import parse from 'html-react-parser';
import { Ticket } from '@/types/tickets/ticketsDetails';

const { Title, Paragraph, Text } = Typography;

export default function TicketDetails() {
  const locale = useLocale();
  const params = useParams();
  const id = typeof params.ticketId === 'string' ? params.ticketId : '';
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${id}?locale=${locale}`);

        if (!response.ok) {
          throw new Error('Failed to fetch ticket details');
        }

        const data: { data: Ticket } = await response.json();
        setTicket(data.data);
        setLoading(false);
      } catch (error: unknown) {
        console.error('Error fetching ticket details:', error);
        setError(
          error instanceof Error
            ? error.message
            : locale === 'vi'
            ? 'Không thể tải thông tin vé'
            : 'Unable to load ticket information'
        );
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

  const galleryImages: string[] = [ticket.main_image, ...(ticket.images || [])].filter((img): img is string => typeof img === 'string' && !!img);

  const formatIncludes = (includes?: string): string => {
    if (!includes) return '';
    const items = includes.split('\n').filter(item => item.trim());
    return `<ul style="padding-left: 20px;">${items.map(item => `<li>${item.replace(/^- /, '')}</li>`).join('')}</ul>`;
  };

  interface PriceItemProps {
    label: string;
    price: number;
    description?: string;
    locale: string;
  }

  const PriceItem: React.FC<PriceItemProps> = ({ label, price, description, locale }) => (
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
    <div className="mt-18">
      <div className="mx-auto max-w-7xl px-6 py-6" style={{ minHeight: '100vh' }}>
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
            {galleryImages.length > 0 && (
              <div className="mb-4">
                <Image.PreviewGroup>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-3 sm:col-span-2 row-span-1 sm:row-span-2">
                      <div className="relative overflow-hidden h-[250px] sm:h-[400px] rounded-t-lg sm:rounded-l-lg sm:rounded-t-none">
                        <Image
                          src={galleryImages[0] || '/default-image.jpg'}
                          alt={ticket.name}
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
                            alt={`${ticket.name} - Image 2`}
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
                              alt={`${ticket.name} - Image 3`}
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
                  {ticket.includes && <div>{parse(formatIncludes(ticket.includes))}</div>}
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
                    {locale === 'vi' ? 'Bảng Giá Vé' : 'Ticket Pricing'}
                  </Title>
                </div>

                {ticket.base_prices && ticket.base_prices.length > 0 && (
                  <div className="mb-8">
                    <div className="border-t-4 border-blue-500 p-2 mb-3 text-center rounded-r-lg rounded-l-lg">
                      <Text strong className="!text-base !text-blue-800">
                        {locale === 'vi' ? 'Giá theo thời gian' : 'Price by Time'}
                      </Text>
                    </div>
                    <Space direction="vertical" className="!w-full" size="middle">
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
                  <div className="mb-8">
                    <div className="border-t-4 border-green-500 p-2 mb-3 text-center rounded-r-lg rounded-l-lg">
                      <Text strong className="!text-base !text-green-700">
                        {locale === 'vi' ? 'Giá theo đối tượng' : 'Price by Customer Segment'}
                      </Text>
                    </div>
                    <Space direction="vertical" className="!w-full" size="middle">
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
                )}

                {ticket.capacity_prices && ticket.capacity_prices.length > 0 && (
                  <div className="mb-6">
                    <div className="border-t-4 border-orange-500 p-2 mb-3 text-center rounded-r-lg rounded-l-lg">
                      <Text strong className="!text-base !text-orange-600">
                        {locale === 'vi' ? 'Giá theo đoàn' : 'Price by Group Size'}
                      </Text>
                    </div>
                    <Space direction="vertical" className="!w-full" size="middle">
                      {ticket.capacity_prices.map((price, index) => (
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