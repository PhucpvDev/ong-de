"use client";

import React, { useState, useEffect } from 'react';
import { Typography, Card, Tag, Pagination, Button } from 'antd';
import { HomeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { IMAGES } from '@/constants/theme';
import Image from 'next/image';
import { useLocale } from 'next-intl';

const { Title, Text } = Typography;

type HomestayItemProps = {
  data: {
    id: number;
    title: string;
    category?: string;
    images: string[];
    description: string;
    price: number;
    dateInfo: string;
  };
};

const HomestayItem = ({ data }: HomestayItemProps) => (
  <Card
    className="!rounded-2xl !shadow-sm !mb-1 !overflow-hidden !h-[290px] sm:!h-[360px] !flex !flex-col !bg-white !font-roboto !border-none"
    bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', flex: 1 }}
  >
    <div className="relative cursor-pointer flex-shrink-0">
      <div className="h-[120px] sm:h-[150px]">
        <Image
          src={data.images[0]}
          alt={data.title}
          fill
          className="!w-full !h-full !object-cover !rounded-t-lg"
        />
      </div>
    </div>

    <div className="p-2 sm:p-3 flex-1 flex flex-col">
      <Title level={5} className="!font-bold !cursor-pointer !text-xs sm:!text-sm md:!text-base !mb-1 !flex-shrink-0 !line-clamp-1 !text-gray-800">
        {data.title}
      </Title>

      <div className="mb-2 cursor-pointer flex-shrink-0">
        <Tag
          icon={<HomeOutlined className="!text-xs !mr-1" />}
          className="!text-xs !px-1.5 sm:!px-2 !py-0.5 !rounded !inline-flex !items-center !bg-orange-100 !text-orange-800 !border-none"
        >
          {data.category || "Homestay Phòng đôi"}
        </Tag>
      </div>

      <Text className="!text-xs sm:!text-sm !line-clamp-2 sm:!line-clamp-3 !leading-tight !flex-1 !min-h-[40px] sm:!min-h-[60px] !mb-2 !text-gray-700">
        {data.description}
      </Text>

      <div className="border-t pt-2 border-gray-200 flex-shrink-0">
        <div className="flex justify-between items-baseline">
          <div>
            <div className="flex items-baseline mb-1">
              <Text className="!text-xs !mr-1 !text-gray-500">Từ</Text>
              <Text strong className="!text-sm sm:!text-base md:!text-lg !text-gray-800">
                ₫ {data.price.toLocaleString()}
              </Text>
            </div>
            <Text className="!text-xs !leading-tight !text-gray-500">Giá đã bao gồm thuế</Text>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

type HomestayCarouselProps = {
  title: string;
  data: HomestayItemProps['data'][];
};

const HomestayCarousel = ({ title, data }: HomestayCarouselProps) => {
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
      <div className="max-w-7xl px-4 sm:px-6 mx-auto md:pt-10 pt-5">
        <Title level={2} className="!text-xl md:!text-3xl md:pb-1">
          {locale === "vi" ? (
            <>HomeStay Làng Du Lịch <span className="text-orange-500">Ông Đề</span></>
          ) : locale === "en" ? (
            <>HomeStay at <span className="text-orange-500">Ong De</span> Tourism Village</>
          ) : locale === "zh" ? (
            <> <span className="text-orange-500">翁德</span>旅游村的民宿</>
          ) : locale === "ko" ? (
            <> <span className="text-orange-500">옹 데</span> 관광 마을의 홈스테이</>
          ) : (
            <>HomeStay at <span className="text-orange-500">Ong De</span> Tourism Village</>
          )}
        </Title>
        <div className="mb-4 sm:mb-8">
          <Title level={2}>{title}</Title>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {paginatedData.map((item) => (
            <HomestayItem key={item.id} data={item} />
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

export default function HomestayList() {
  const homestayData = [
    {
      id: 1,
      title: "Phòng Mộc Mạc Sông Hậu",
      category: "Phòng Đơn",
      images: [IMAGES.Sr_homestay],
      description: "Phòng nghỉ mộc mạc với view sông Hậu thơ mộng, mang lại cảm giác yên bình và gần gũi thiên nhiên.",
      price: 500000,
      dateInfo: "Còn trống",
    },
    {
      id: 2,
      title: "Phòng Deluxe Miệt Vườn",
      category: "Phòng Đôi",
      images: [IMAGES.Sr_homestay],
      description: "Phòng tiện nghi hiện đại, view vườn trái cây xanh mát, lý tưởng cho cặp đôi yêu thiên nhiên.",
      price: 700000,
      dateInfo: "Còn trống",
    },
    {
      id: 3,
      title: "Phòng Garden Xanh Mát",
      category: "Phòng Đôi",
      images: [IMAGES.Sr_homestay],
      description: "Phòng nghỉ gần vườn trái cây sum suê, không gian thoáng đãng, đậm chất miền Tây.",
      price: 550000,
      dateInfo: "Còn trống",
    },
    {
      id: 4,
      title: "Phòng Riverside Thoáng Đãng",
      category: "Phòng Đơn",
      images: [IMAGES.Sr_homestay],
      description: "Phòng view kênh rạch thơ mộng, không gian yên tĩnh, hoàn hảo để thư giãn và tận hưởng.",
      price: 800000,
      dateInfo: "Còn trống",
    },
    {
      id: 5,
      title: "Phòng Gia Đình Rộng Rãi",
      category: "Phòng Gia Đình",
      images: [IMAGES.Sr_homestay],
      description: "Phòng lớn với tiện nghi đầy đủ, phù hợp cho gia đình muốn khám phá văn hóa miền Tây.",
      price: 1000000,
      dateInfo: "Còn trống",
    },
  ];

  return (
    <>
      <HomestayCarousel data={homestayData} />
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