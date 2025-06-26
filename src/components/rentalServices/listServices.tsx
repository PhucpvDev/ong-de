"use client";

import React, { useState, useEffect } from 'react';
import { Typography, Card, Pagination, Button, ConfigProvider, Spin, Alert } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { IMAGES } from '@/constants/theme';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

const { Title, Text } = Typography;

type RentalItemProps = {
  data: {
    id: number;
    title: string;
    slug: string; // Added slug field
    images: string[];
    description: string;
    price: number;
    availability: string;
  };
};

const RentalItem = ({ data }: RentalItemProps) => (
  <Card
    className="!rounded-2xl !shadow-sm !mb-1 !overflow-hidden !h-[250px] sm:!h-[330px] !flex !flex-col !bg-white !font-roboto !border-none"
    bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', flex: 1 }}
  >
    <div className="!relative !cursor-pointer !flex-shrink-0">
      <div className="!h-[120px] sm:!h-[150px]">
        <Link href={`/rental-services/${data.slug}`}>
          <Image
            src={data.images[0] || IMAGES.St_cheo_xuong} 
            alt={data.title}
            fill
            className="!w-full !h-full !object-cover !rounded-t-lg"
          />
        </Link>
      </div>
    </div>

    <div className="!p-2 sm:!p-3 !flex-1 !flex !flex-col">
      <Link href={`/rental-services/${data.slug}`}>
        <Title level={5} className="!font-bold !cursor-pointer !text-xs sm:!text-sm md:!text-base !mb-2 !flex-shrink-0 !line-clamp-1 !text-gray-800">
          {data.title}
        </Title>

        <Text className="!text-xs sm:!text-sm !line-clamp-2 sm:!line-clamp-3 !leading-tight !flex-1 !min-h-[40px] sm:!min-h-[60px] !mb-2 !text-gray-700">
          {data.description}
        </Text>
      </Link>

      <div className="!border-t !pt-2 !border-gray-200 !flex-shrink-0">
        <div className="!flex !justify-between !items-baseline">
          <div>
            <div className="!flex !items-baseline !mb-1">
              <Text className="!text-xs !mr-1 !text-gray-700">Từ</Text>
              <Text strong className="!text-sm sm:!text-base md:!text-lg !text-orange-600">
                ₫ {data.price.toLocaleString()}
              </Text>
            </div>
            <Text className="!text-xs !leading-tight !text-gray-600">Giá đã bao gồm thuế</Text>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

type RentalCarouselProps = {
  title: string;
  data: RentalItemProps['data'][];
};

const RentalCarousel = ({ title, data }: RentalCarouselProps) => {
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="">
      <div className="max-w-7xl px-4 sm:px-6 mx-auto md:pt-8 pt-5">
        <div className="mb-6 sm:mb-8">
          <Title level={2} className="!text-xl md:!text-3xl">
            {locale === "vi" ? (
              <>Khám phá Dịch Vụ Cho Thuê</>
            ) : locale === "en" ? (
              <>Explore Rental Services</>
            ) : locale === "zh" ? (
              <>探索租赁服务</>
            ) : locale === "ko" ? (
              <>임대 서비스 탐험</>
            ) : (
              <>Explore Rental Services</>
            )}
          </Title>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {paginatedData.map((item) => (
            <RentalItem key={item.id} data={item} />
          ))}
        </div>
        {data.length > itemsPerPage && (
          <div className="mt-8 sm:mt-14 flex justify-center">
            <Pagination
              current={currentPage}
              onChange={handlePageChange}
              total={data.length}
              pageSize={itemsPerPage}
              itemRender={(page, type, originalElement) => {
                if (type === 'prev' || type === 'next') {
                  return (
                    <Button
                      className="!w-6 sm:!w-8 !h-6 sm:!h-8 !ml-2 sm:!ml-3 !mr-2 sm:!mr-3 !rounded-full !flex !items-center !justify-center !bg-white !border-none !shadow-sm"
                      icon={type === 'prev' ? <LeftOutlined className="!text-gray-800 !text-xs sm:!text-sm" /> : <RightOutlined className="!text-gray-800 !text-xs sm:!text-sm" />}
                    />
                  );
                }
                return originalElement;
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default function ServicesList() {
  const locale = useLocale();
  const [rentalData, setRentalData] = useState<RentalItemProps['data'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentalServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rental-services?locale=${locale}`);

        if (!response.ok) {
          throw new Error("Không thể tải dữ liệu dịch vụ cho thuê");
        }

        const result = await response.json();
        const services = result.data['rental-services'] || [];

        const transformedData: RentalItemProps['data'][] = services.map((service: any) => ({
          id: service.id,
          title: service.name,
          slug: service.slug, 
          images: [service.main_image, ...service.images].filter(Boolean), 
          description: service.short_description,
          price: service.base_prices.find((bp: any) => bp.price_type.name === "Giá ngày thường")?.price || service.base_prices[0]?.price || 0,
          availability: "Còn trống",
        }));

        setRentalData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
      } finally {
        setLoading(false);
      }
    };

    fetchRentalServices();
  }, [locale]);

  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
    },
  };

  if (loading) {
    return (
      <ConfigProvider theme={themeConfig}>
        <div className="font-roboto max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center justify-center py-20">
            <Spin size="large" />
          </div>
        </div>
      </ConfigProvider>
    );
  }

  return (
    <>
      <ConfigProvider theme={themeConfig}>
        <RentalCarousel title="Khám phá Dịch Vụ Cho Thuê" data={rentalData} />
      </ConfigProvider>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}