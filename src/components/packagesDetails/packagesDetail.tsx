import { Breadcrumb, Row, Col, Card, Button, Divider, Tag, Space, Typography, Tooltip, Image, DatePicker, notification, Skeleton } from 'antd';
import { InfoCircleOutlined, ClockCircleOutlined, UserOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import axios from 'axios';
import locale from 'antd/es/date-picker/locale/vi_VN';
import dayjs, { Dayjs } from 'dayjs';
import parse from 'html-react-parser';
import Head from 'next/head';
import { PackageData } from '@/types/packages/packageDetail';

const { Title, Paragraph, Text } = Typography;

export default function ServiceDetailsList() {
  const locale = useLocale();
  const params = useParams();
  const id = params.packagesId;
  const [serviceData, setServiceData] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [adultCount, setAdultCount] = useState<number>(0);
  const [childMediumCount, setChildMediumCount] = useState<number>(0); // Trẻ em 1m2 - 1m4
  const [childSmallCount, setChildSmallCount] = useState<number>(0); // Trẻ em dưới 1m2
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchService = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://uat-ongde.thanhlc.top/api/v1/packages/${id}?locale=${locale}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      const packageData = response.data.data; // Access the 'data' field from the API response
      if (!packageData) {
        throw new Error('No package data found');
      }

      setServiceData({
        id: packageData.id || '',
        name: packageData.title || 'Unknown Package',
        short_description: packageData.summary || '',
        long_description: packageData.content || '',
        main_image: packageData.main_image || '/default-image.jpg', // Fallback image
        images: packageData.images || [], // Additional images
        policies: packageData.policies || [],
        base_prices: packageData.base_prices || [], // Map base_prices
        capacity_prices: packageData.capacity_prices || [],
        segment_prices: packageData.segment_prices || [], // Map segment_prices
        conditions: packageData.conditions || '',
        min_participants: packageData.min_quantity || 1,
        max_participants: null, // Update if API provides max_quantity
        duration: packageData.duration || '',
        services: packageData.services || [],
        menus: packageData.menus || [],
        categories: packageData.categories || [],
        audiences: packageData.audiences || [],
        available_start: packageData.available_start || dayjs().format('YYYY-MM-DD'),
        available_end: packageData.available_end || dayjs().add(1, 'year').format('YYYY-MM-DD'),
        keywords: packageData.keywords || '',
        meta_description: packageData.meta_description || '',
      });
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching package details:', err);
      setError(
        err.message ||
          (locale === 'vi' ? 'Không thể tải thông tin gói dịch vụ' : 'Unable to load package information')
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, [locale, id]);

  const calculateTotalPrice = (): string => {
    if (!serviceData) return '0';

    // Try to get prices from segment_prices first
    let adultPrice = serviceData.segment_prices.find(
      (price) => price.customer_segment.name === 'Người lớn'
    )?.price || 0;
    let childMediumPrice = serviceData.segment_prices.find(
      (price) => price.customer_segment.name === 'Trẻ em (1m2 - 1m4)'
    )?.price || 0;
    let childSmallPrice = serviceData.segment_prices.find(
      (price) => price.customer_segment.name === 'Trẻ em dưới 1m2'
    )?.price || 0;

    // Fallback to capacity_prices if segment_prices are empty
    if (!adultPrice && !childMediumPrice && !childSmallPrice) {
      const defaultPrice = serviceData.capacity_prices.find(
        (price) => price.customer_segment.name === 'Trẻ em dưới 14 tuổi'
      )?.price || 0;
      adultPrice = defaultPrice;
      childMediumPrice = defaultPrice;
      childSmallPrice = 0; // Assume children under 1m2 are free unless specified
    }

    const total = adultCount * adultPrice + childMediumCount * childMediumPrice + childSmallCount * childSmallPrice;
    return total.toLocaleString('vi-VN');
  };

  const handleBookService = async () => {
    if (!selectedDate) {
      setErrorMessage(locale === 'vi' ? 'Vui lòng chọn ngày đặt dịch vụ' : 'Please select a booking date');
      return;
    }

    const totalParticipants = adultCount + childMediumCount + childSmallCount;
    if (totalParticipants === 0) {
      setErrorMessage(locale === 'vi' ? 'Vui lòng chọn ít nhất 1 người tham gia' : 'Please select at least 1 participant');
      return;
    }

    if (serviceData?.min_participants && totalParticipants < serviceData.min_participants) {
      setErrorMessage(
        locale === 'vi'
          ? `Vui lòng chọn ít nhất ${serviceData.min_participants} người tham gia`
          : `Please select at least ${serviceData.min_participants} participants`
      );
      return;
    }

    try {
      const response = await axios.post(
        `https://uat-ongde.thanhlc.top/api/v1/bookings`, // Updated to match API domain
        {
          package_id: serviceData?.id,
          adult_count: adultCount,
          child_medium_count: childMediumCount,
          child_small_count: childSmallCount,
          booking_date: selectedDate.format('YYYY-MM-DD'),
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      notification.success({
        message: locale === 'vi' ? 'Đặt dịch vụ thành công' : 'Booking Successful',
        description: locale === 'vi'
          ? `Bạn đã đặt dịch vụ cho ${adultCount} người lớn, ${childMediumCount} trẻ em (1m2 - 1m4), ${childSmallCount} trẻ em dưới 1m2 vào ngày ${selectedDate.format('DD/MM/YYYY')}`
          : `You have booked the service for ${adultCount} adults, ${childMediumCount} children (1m2 - 1m4), ${childSmallCount} children under 1m2 on ${selectedDate.format('DD/MM/YYYY')}`,
      });

      setAdultCount(0);
      setChildMediumCount(0);
      setChildSmallCount(0);
      setSelectedDate(null);
      setErrorMessage('');
    } catch (err: any) {
      setErrorMessage(locale === 'vi' ? 'Đặt dịch vụ thất bại, vui lòng thử lại' : 'Booking failed, please try again');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen mx-auto max-w-7xl px-6 py-6">
        <Skeleton active paragraph={{ rows: 2 }} className="mb-8" />
        <Row gutter={[14, 24]}>
          <Col xs={24} lg={16}>
            <Skeleton.Image className="!w-full !h-[400px] mb-4" />
            <Skeleton active paragraph={{ rows: 6 }} />
          </Col>
          <Col xs={24} lg={8}>
            <Skeleton active paragraph={{ rows: 4 }} />
          </Col>
        </Row>
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
            <Button type="default" onClick={fetchService} className="!mt-4">
              {locale === 'vi' ? 'Thử lại' : 'Retry'}
            </Button>
          </Space>
        </div>
      </div>
    );
  }

  if (!serviceData) {
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

  const galleryImages = [serviceData.main_image, ...(serviceData.images || [])].filter(Boolean);

  const fullDescription = [
    serviceData.long_description
  ].filter(Boolean);

  const PriceItem: React.FC<{ label: string; price: number; description?: string; locale: string }> = ({ label, price, description, locale }) => (
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
        <meta name="keywords" content={serviceData.keywords} />
        <meta name="description" content={serviceData.meta_description} />
        <title>{serviceData.name}</title>
      </Head>
      <div className="mx-auto max-w-7xl px-6 py-6" style={{ minHeight: '100vh' }}>
        <div className="bg-white mb-8">
          <Breadcrumb
            items={[
              { title: locale === 'vi' ? 'Trang chủ' : 'Home' },
              { title: locale === 'vi' ? 'Gói dịch vụ' : 'Packages' },
              { title: serviceData.name },
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
                        src={galleryImages[0]}
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
                      <div className="relative overflow-hidden rounded-tr-2xl">
                        <Image
                          src={galleryImages[1]}
                          alt={`${serviceData.name} - Image 2`}
                          width="100%"
                          height="100%"
                          className="!w-full !h-full !object-cover"
                          preview
                        />
                      </div>
                      {galleryImages.length > 2 && (
                        <div className="relative overflow-hidden rounded-br-2xl">
                          <Image
                            src={galleryImages[2]}
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
            ) : (
              <div className="h-[250px] sm:h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                <Text className="!text-gray-500">{locale === 'vi' ? 'Không có hình ảnh' : 'No images available'}</Text>
              </div>
            )}

            <Card className="!border !border-dashed !border-orange-200 !rounded-3xl">
              <div className="mb-8">
                <Space wrap className="mb-4">
                  {serviceData.categories.map((category, index) => (
                    <Tooltip title={category.description} key={index}>
                      <Text ellipsis={true}>
                        <Tag color="blue">{category.name}</Tag>
                      </Text>
                    </Tooltip>
                  ))}
                  {serviceData.audiences.map((audience, index) => (
                    <Tooltip title={audience.description} key={index}>
                      <Text ellipsis={true}>
                        <Tag color="orange">{audience.name}</Tag>
                      </Text>
                    </Tooltip>
                  ))}
                </Space>
                <Title level={3} className="!text-2xl lg:! Influences!text-xl !text-gray-800 !mb-4">
                  {locale === 'vi' ? 'Gói dịch vụ: ' : 'Package: '}{serviceData.name}
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
                    {serviceData.min_participants && (
                      <div className="flex items-center space-x-3 p-3 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <UserOutlined className="!text-green-500" />
                        </div>
                        <div>
                          <Text strong className="!text-sm !text-gray-800">{locale === 'vi' ? 'Số lượng người tham gia:' : 'Participants:'}</Text>
                          <Text className="!text-sm !text-gray-800">
                            {locale === 'vi' ? ` Tối thiểu ${serviceData.min_participants} người` : `Minimum ${serviceData.min_participants} participants`}
                          </Text>
                        </div>
                      </div>
                    )}
                    {serviceData.duration && (
                      <div className="flex items-center space-x-3 p-3 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <ClockCircleOutlined className="!text-blue-500" />
                        </div>
                        <div>
                          <Text strong className="!text-sm !text-gray-800">{locale === 'vi' ? 'Thời gian:' : 'Duration:'}</Text>
                          <Text className="!text-sm"> {serviceData.duration}</Text>
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

              {serviceData.services && serviceData.services.length > 0 && (
                <>
                  <Divider className="!my-6" />
                  <div className="mb-8">
                    <Title level={3} className="!text-lg !font-semibold !text-gray-800 !mb-4">
                      {locale === 'vi' ? 'Dịch vụ bao gồm' : 'Included Services'}
                    </Title>
                    <ul className="list-disc pl-5 space-y-2">
                      {serviceData.services.map((service, index) => (
                        <li key={index} className="!text-gray-700">
                          <Text strong>{service.name}</Text>: {service.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {serviceData.menus && serviceData.menus.length > 0 && (
                <>
                  <Divider className="!my-6" />
                  <div className="mb-8">
                    <Title level={3} className="!text-lg !font-semibold !text-gray-800 !mb-4">
                      {locale === 'vi' ? 'Thực đơn' : 'Menu'}
                    </Title>
                    {serviceData.menus.map((menu, index) => (
                      <div key={index} className="mb-4">
                        <Text strong className="!text-base !text-gray-800">{menu.name} ({menu.type})</Text>
                        {menu.fixed_items && menu.fixed_items.length > 0 && (
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {menu.fixed_items.map((item, itemIndex) => (
                              <li key={itemIndex} className="!text-gray-700">
                                {item.name} ({item.quantity} {item.unit})
                              </li>
                            ))}
                          </ul>
                        )}
                        <Text className="!text-sm !text-gray-600 !mt-2">{menu.description}</Text>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {serviceData.policies && serviceData.policies.length > 0 && (
                <>
                  <Divider className="!my-6" />
                  <div className="mb-0">
                    <Title level={3} className="!text-lg !font-semibold !text-gray-800 !mb-4">
                      {locale === 'vi' ? 'Chính sách dịch vụ' : 'Service Policies'}
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
                    {locale === 'vi' ? 'Bảng giá gói tiết kiệm' : 'Price list for savings packages'}
                  </Title>
                </div>

                {serviceData.base_prices && serviceData.base_prices.length > 0 && (
                  <div className="mb-8">
                    <div className="border-t-4 border-blue-500 p-2 mb-3 text-center rounded-r-lg rounded-l-lg">
                      <Text strong className="!text-base !text-blue-800">
                        {locale === 'vi' ? 'Giá cơ bản' : 'Base Price'}
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

                {serviceData.capacity_prices && serviceData.capacity_prices.length > 0 && (
                  <div className="mb-8">
                    <div className="border-t-4 border-orange-500 p-2 mb-3 text-center rounded-r-lg rounded-l-lg">
                      <Text strong className="!text-base !text-orange-600">
                        {locale === 'vi' ? 'Giá theo đoàn' : 'Price by Group Size'}
                      </Text>
                    </div>
                    <Space direction="vertical" className="!w-full" size="middle">
                      {serviceData.capacity_prices.map((price, index) => (
                        <PriceItem
                          key={index}
                          label={`${price.min_person}+ ${locale === 'vi' ? 'người' : 'people'}`}
                          price={price.price}
                          description={`${price.price_type.name} - ${price.customer_segment.name}`}
                          locale={locale}
                        />
                      ))}
                    </Space>
                  </div>
                )}

                {serviceData.segment_prices && serviceData.segment_prices.length > 0 && (
                  <div className="mb-8">
                    <div className="border-t-4 border-green-500 p-2 mb-3 text-center rounded-r-lg rounded-l-lg">
                      <Text strong className="!text-base !text-green-800">
                        {locale === 'vi' ? 'Giá theo phân khúc' : 'Price by Segment'}
                      </Text>
                    </div>
                    <Space direction="vertical" className="!w-full" size="middle">
                      {serviceData.segment_prices.map((price, index) => (
                        <PriceItem
                          key={index}
                          label={price.customer_segment.name}
                          price={price.price}
                          description={price.customer_segment.description}
                          locale={locale}
                        />
                      ))}
                    </Space>
                  </div>
                )}

                <Divider className="!my-6" />

                <div className="mb-8">
                  <div className="border-b border-gray-200 flex justify-between mb-4">
                    <Title level={5} className="!text-sm sm:!text-base !mb-3">
                      {locale === 'vi' ? 'Chọn ngày & số lượng' : 'Select Date & Quantity'}
                    </Title>
                    <Button
                      type="text"
                      size="small"
                      className="!bg-slate-100 p-1 flex items-center text-sm"
                      onClick={() => {
                        setAdultCount(0);
                        setChildMediumCount(0);
                        setChildSmallCount(0);
                        setSelectedDate(null);
                        setErrorMessage('');
                      }}
                    >
                      {locale === 'vi' ? 'Xóa' : 'Clear'}
                    </Button>
                  </div>

                  <div className="mb-6">
                    <Text className="text-sm sm:text-base font-medium">{locale === 'vi' ? 'Chọn ngày' : 'Select Date'}</Text>
                    <DatePicker
                      className="w-full h-10 !mt-2"
                      placeholder={locale === 'vi' ? 'Chọn ngày đặt dịch vụ' : 'Select booking date'}
                      format="DD/MM/YYYY"
                      value={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      disabledDate={(current) =>
                        current &&
                        (current.isBefore(dayjs(serviceData.available_start).startOf('day')) ||
                          current.isAfter(dayjs(serviceData.available_end).endOf('day')))
                      }
                      locale={locale === 'vi' ? locale : undefined}
                    />
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <Text className="text-sm sm:text-base">{locale === 'vi' ? 'Người lớn' : 'Adults'}</Text>
                      <div className="flex items-center">
                        <Button
                          icon={<MinusOutlined />}
                          className="border-gray-300 text-gray-600"
                          size="small"
                          onClick={() => adultCount > 0 && setAdultCount(adultCount - 1)}
                          aria-label={locale === 'vi' ? 'Giảm số người lớn' : 'Decrease adult count'}
                        />
                        <Text className="mx-4 text-base">{adultCount}</Text>
                        <Button
                          icon={<PlusOutlined />}
                          className="border-gray-300 text-gray-600"
                          size="small"
                          onClick={() => setAdultCount(adultCount + 1)}
                          aria-label={locale === 'vi' ? 'Tăng số người lớn' : 'Increase adult count'}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <Text className="text-sm sm:text-base">{locale === 'vi' ? 'Trẻ em (1m2 - 1m4)' : 'Children (1m2 - 1m4)'}</Text>
                      <div className="flex items-center">
                        <Button
                          icon={<MinusOutlined />}
                          className="border-gray-300 text-gray-600"
                          size="small"
                          onClick={() => childMediumCount > 0 && setChildMediumCount(childMediumCount - 1)}
                          aria-label={locale === 'vi' ? 'Giảm số trẻ em (1m2 - 1m4)' : 'Decrease children (1m2 - 1m4) count'}
                        />
                        <Text className="mx-4 text-base">{childMediumCount}</Text>
                        <Button
                          icon={<PlusOutlined />}
                          className="border-gray-300 text-gray-600"
                          size="small"
                          onClick={() => setChildMediumCount(childMediumCount + 1)}
                          aria-label={locale === 'vi' ? 'Tăng số trẻ em (1m2 - 1m4)' : 'Increase children (1m2 - 1m4) count'}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text className="text-sm sm:text-base">{locale === 'vi' ? 'Trẻ em dưới 1m2' : 'Children under 1m2'}</Text>
                      <div className="flex items-center">
                        <Button
                          icon={<MinusOutlined />}
                          className="border-gray-300 text-gray-600"
                          size="small"
                          onClick={() => childSmallCount > 0 && setChildSmallCount(childSmallCount - 1)}
                          aria-label={locale === 'vi' ? 'Giảm số trẻ em dưới 1m2' : 'Decrease children under 1m2 count'}
                        />
                        <Text className="mx-4 text-base">{childSmallCount}</Text>
                        <Button
                          icon={<PlusOutlined />}
                          className="border-gray-300 text-gray-600"
                          size="small"
                          onClick={() => setChildSmallCount(childSmallCount + 1)}
                          aria-label={locale === 'vi' ? 'Tăng số trẻ em dưới 1m2' : 'Increase children under 1m2 count'}
                        />
                      </div>
                    </div>
                  </div>

                  {(adultCount > 0 || childMediumCount > 0 || childSmallCount > 0) && (
                    <div className="mb-4 border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <Text className="text-sm font-medium">{locale === 'vi' ? 'Tổng tiền:' : 'Total:'}</Text>
                        <Text className="text-lg font-bold text-orange-600">{calculateTotalPrice()} đ</Text>
                      </div>
                      <Text className="text-xs text-gray-500 mt-1">{locale === 'vi' ? 'Đã bao gồm thuế và phí' : 'Includes taxes and fees'}</Text>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="flex items-center text-red-500 mb-4 text-sm">
                      <InfoCircleOutlined className="mr-1" />
                      <Text className="text-red-500">{errorMessage}</Text>
                    </div>
                  )}

                  <Button
                    type="primary"
                    size="large"
                    className="w-full h-10 !bg-orange-500 hover:!bg-orange-600"
                    onClick={handleBookService}
                    aria-label={locale === 'vi' ? 'Thêm vào giỏ hàng' : 'Add to cart'}
                  >
                    {locale === 'vi' ? 'Thêm vào giỏ hàng' : 'Add to Cart'}
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-600 mb-2">
                    <InfoCircleOutlined />
                    <Text strong className="!text-sm">{locale === 'vi' ? 'Lưu ý quan trọng' : 'Important Note'}</Text>
                  </div>
                  <Text className="!text-xs !text-blue-600 !leading-relaxed">
                    {locale === 'vi'
                      ? 'Giá dịch vụ có thể thay đổi theo thời điểm. Vui lòng liên hệ để được tư vấn giá tốt nhất.'
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