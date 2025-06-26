"use client";

import React, { useState, useEffect } from 'react';
import { Card, Rate, Tooltip, Badge, Pagination, Typography, Spin, Alert, Button } from 'antd';
import { RightOutlined, HomeOutlined, PlusOutlined, FireOutlined, LeftOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Package, PackageTourItemProps, ServiceCarouselProps } from '@/types/packages/homestayTourList';
import { Link } from '@/i18n/routing';

const { Title, Paragraph, Text } = Typography;

const PackageTourItem = ({ data, onSelect }: PackageTourItemProps) => {
  const getLowestPrice = () => {
    const prices = [
      ...data.base_prices.map(bp => bp.price),
      ...data.capacity_prices.map(cp => cp.price)
    ];
    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(data);
    }
  };

  return (
    <div
      className="rounded-lg shadow-sm mb-1 overflow-hidden h-[320px] sm:h-auto flex flex-col bg-white font-roboto cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <div className="relative flex-shrink-0">
        <Link href={`/packages/${data.id}`}>
          <div className="flex h-[90px] sm:h-[100px] md:h-[90px]">
            <div className="w-2/3 pt-2 pr-1 pl-2">
              {data.main_image ? (
                <Image
                  src={data.main_image}
                  alt={data.title}
                  className="w-full h-full object-cover rounded-xl"
                  width={400}
                  height={200}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
                  <HomeOutlined className="text-gray-400 text-2xl" />
                </div>
              )}
            </div>
            <div className="w-1/2 pt-2 pr-2">
              {data.images && data.images[1] ? (
                <Image
                  src={data.images[1]}
                  alt={data.title}
                  className="w-full h-full object-cover rounded-xl"
                  width={400}
                  height={200}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
                  <HomeOutlined className="text-gray-400 text-xl" />
                </div>
              )}
            </div>
            <div className="absolute top-1/2 left-[162px] sm:left-[140px] md:left-[162px] transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-6 h-6 sm:w-6 sm:h-6 rounded-full flex items-center justify-center bg-orange-500 text-white">
                <PlusOutlined style={{ fontSize: '12px' }} className="sm:text-sm" />
              </div>
            </div>
            {data.is_featured && (
              <div className="absolute top-2 right-2">
                <Badge.Ribbon text="Nổi bật" color="orange">
                  <div></div>
                </Badge.Ribbon>
              </div>
            )}
          </div>
        </Link>
      </div>

      <div className="p-2 sm:p-3 flex-1 flex flex-col">
        <Link href={`/packages/${data.id}`}>
          <Title level={5} className="mt-1 !cursor-pointer !text-sm sm:!text-base !mb-1 !flex-shrink-0 !line-clamp-2 !text-gray-800">
            {data.title}
          </Title>
        </Link>
        <div className="mt-2 cursor-pointer flex-shrink-0">
          <Paragraph
            className="!text-[13px] px-2 py-0.5 rounded inline-flex items-center !bg-orange-100/80 !text-orange-800"
          >
            {data.categories[0]?.name || 'Chưa phân loại'}
          </Paragraph>
          {data.duration && (
            <Paragraph
              className="ml-1 !text-[13px] px-2 py-0.5 rounded inline-flex items-center !bg-blue-50 !text-blue-800"
            >
              {data.duration}
            </Paragraph>
          )}
        </div>

        <div className="flex-1 min-h-0 mb-1">
          <Link href={`/packages/${data.id}`}>
            <Paragraph
              className="text-xs text-gray-500 line-clamp-1"
              ellipsis={{ rows: 3, tooltip: data.summary }}
            >
              {data.summary}
            </Paragraph>
          </Link>
        </div>

        <div className="border-t pt-3 border-gray-100 flex-shrink-0">
          <div className="flex justify-between items-end">
            <div className="flex-1">
              <div className="flex items-baseline gap-1 mb-1">
                <Text className="text-xs text-gray-500">Chỉ từ</Text>
                <Text className="font-bold text-lg text-orange-600">
                  {getLowestPrice().toLocaleString('vi-VN')}₫
                </Text>
              </div>
              <Paragraph
                className="text-xs text-gray-500 line-clamp-1 !mb-0"
                ellipsis={{ rows: 0.5, tooltip: data.conditions || `Tối thiểu ${data.min_quantity} người` }}
              >
                {data.conditions || `Tối thiểu ${data.min_quantity} người`}
              </Paragraph>
            </div>
            <div className="ml-2">
              <Link href={`/packages/${data.id}`}>
                <Button className="!bg-orange-500 hover:!bg-orange-600 !text-white !px-3 !py-1.5 !rounded-lg !text-sm">
                  Chi tiết
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCarousel = ({ data, onPackageSelect }: ServiceCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getItemsPerPage = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
  };

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const locale = useLocale()

  const DesktopView = () => (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {paginatedData.map((item) => (
          <div key={item.id} className="px-2 sm:px-3">
            <PackageTourItem data={item} onSelect={onPackageSelect} />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            current={currentPage}
            total={data.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            className="ant-pagination-light"
          />
        </div>
      )}
    </div>
  );

  const MobileView = () => (
    <div className="overflow-x-auto flex gap-3 sm:gap-4 pb-4 snap-x snap-mandatory no-scrollbar px-1">
      {data.map((item) => (
        <div key={item.id} className="flex-shrink-0 w-[75%] sm:w-[80%] snap-start">
          <PackageTourItem data={item} onSelect={onPackageSelect} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-6 sm:py-8 mt-2 sm:mt-5">
      <div className="font-roboto max-w-7xl px-4 sm:px-4 mx-auto">
        <div className="px-2 -mb-2">
          <Title level={2} className="!text-xl md:!text-3xl !pb-4">
            {locale === "vi" ? (
              <>Gói Du Lịch <span className="text-orange-500">Ông Đề</span></>
            ) : locale === "en" ? (
              <> <span className="text-orange-500">Ong De</span> Travel Package</>
            ) : locale === "zh" ? (
              <> <span className="text-orange-500">翁德</span>旅游套餐</>
            ) : locale === "ko" ? (
              <> <span className="text-orange-500">옹 데</span> 여행 패키지</>
            ) : (
              <> <span className="text-orange-500">Ong De</span> Travel Package</>
            )}
          </Title>
        </div>
        {isMobile ? <MobileView /> : <DesktopView />}
      </div>
    </div>
  );
};

export default function PackagesList() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    fetchPackages();
  }, [locale]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages?locale=${locale}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data && Array.isArray(data.data.packages)) {
        setPackages(data.data.packages);
      } else {
        throw new Error('Invalid response format');
      }

    } catch (err) {
      console.error('Error fetching packages:', err);
      setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu gói du lịch');
    } finally {
      setLoading(false);
    }
  };

  const handlePackageSelect = (packageData: Package) => {
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
        <span className="ml-3">Đang tải gói du lịch...</span>
      </div>
    );
  }

  return (
    <>
      <ServiceCarousel
        data={packages}
        onPackageSelect={handlePackageSelect}
      />
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
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

        .ant-pagination-light .ant-pagination-item-active {
          background-color: #f97316;
          border-color: #f97316;
        }
        .ant-pagination-light .ant-pagination-item-active a {
          color: #fff;
        }
      `}</style>
    </>
  );
}