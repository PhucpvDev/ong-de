"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, Rate, Tooltip, Badge, Carousel } from 'antd';
import { RightOutlined, HomeOutlined, PlusOutlined, FireOutlined, LeftOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IMAGES } from '@/constants/theme';
import Imgae from 'next/image';

type HomestayTourItemProps = {
  data: {
    id: number;
    title: string;
    rating: number;
    category?: string;
    images: string[];
    services: { name: string; discount?: string }[];
    optionsCount: number;
    price: number;
    dateInfo: string;
  };
  categoryTitle?: string;
  mytheme: string;
};

const HomestayTourItem = ({ data, mytheme }: HomestayTourItemProps) => (
  <div
    className={`rounded-lg shadow-sm mb-1 overflow-hidden h-[320px] sm:h-auto flex flex-col ${
      mytheme === 'light' ? 'bg-white' : 'bg-gray-700'
    } font-roboto`}
  >
    <div className="relative cursor-pointer flex-shrink-0">
      <div className="flex h-[90px] sm:h-[100px] md:h-[90px]">
        <div className="w-2/3 pt-2 pr-1 pl-2">
          <Imgae
            src={data.images[0]}
            alt={data.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="w-1/2 pt-2 pr-2">
          <Imgae
            src={data.images[1]}
            alt={data.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="absolute top-1/2 left-[160px] sm:left-[140px] md:left-[160px] transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center ${
              mytheme === 'light' ? 'bg-orange-500 text-white' : 'bg-orange-400 text-white'
            }`}
          >
            <PlusOutlined
              style={{ fontSize: '12px' }}
              className="sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="p-2 sm:p-3 flex-1 flex flex-col">
      <h3
        className={`font-bold cursor-pointer text-sm sm:text-base mb-1 flex-shrink-0 ${
          mytheme === 'light' ? 'text-gray-800' : 'text-gray-100'
        }`}
      >
        {data.title}
      </h3>

      <div className="mb-2 cursor-pointer flex-shrink-0">
        <span
          className={`text-xs px-2 py-0.5 rounded inline-flex items-center ${
            mytheme === 'light' ? 'bg-orange-50 text-orange-800' : 'bg-orange-500/80 text-white'
          }`}
        >
          <HomeOutlined className="mr-1 text-xs" /> {data.category || "Homestay Phòng đôi"}
        </span>
      </div>

      <div className="space-y-1 sm:space-y-1.5 cursor-pointer flex-1 min-h-0">
        {data.services.map((service, index) => (
          <div key={index} className="flex items-start gap-1 sm:gap-2">
            <div className="mt-1 sm:mt-1.5 flex-shrink-0">
              <PlusOutlined
                className={mytheme === 'light' ? 'text-orange-500' : 'text-yellow-300'}
                style={{ fontSize: '12px' }}
              />
            </div>
            <div
              className={`flex flex-wrap items-baseline gap-1 text-xs sm:text-sm ${
                mytheme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}
            >
              <span className="line-clamp-3 sm:line-clamp-2 leading-tight">{service.name}</span>
              {service.discount && (
                <span
                  className={`text-xs flex-shrink-0 ${
                    mytheme === 'light' ? 'text-orange-500' : 'text-yellow-300'
                  }`}
                >
                  (Giảm {service.discount})
                </span>
              )}
            </div>
          </div>
        ))}
        <div
          className={`text-xs mt-1 pl-4 sm:pl-6 ${
            mytheme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          {data.optionsCount} lựa chọn khác trong gói
        </div>
      </div>

      <div className="mt-2 sm:mt-3 border-t pt-2 sm:pt-3 border-gray-200 flex-shrink-0">
        <div className="flex justify-between items-baseline">
          <div>
            <div className="flex items-baseline mb-1">
              <div
                className={`text-xs sm:text-sm mr-1 ${
                  mytheme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                Từ
              </div>
              <div
                className={`font-bold text-base sm:text-lg ${
                  mytheme === 'light' ? 'text-gray-800' : 'text-gray-100'
                }`}
              >
                ₫ {data.price.toLocaleString()}
              </div>
            </div>
            <div
              className={`text-xs leading-tight ${
                mytheme === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              Giá đã bao gồm thuế
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

type ServiceCarouselProps = {
  title: string;
  data: HomestayTourItemProps['data'][];
  secondaryText?: string;
  mytheme: string;
};

const ServiceCarousel = ({ title, data, secondaryText, mytheme }: ServiceCarouselProps) => {
  const carouselRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(typeof window !== 'undefined' && window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const DesktopView = () => (
    <div className="relative">
      <Carousel
        ref={carouselRef}
        dots={false}
        slidesToShow={4}
        slidesToScroll={1}
        responsive={[
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {data.map((item) => (
          <div key={item.id} className="px-2 sm:px-3">
            <HomestayTourItem data={item} categoryTitle={title} mytheme={mytheme} />
          </div>
        ))}
      </Carousel>
      <button
        onClick={() => carouselRef.current && carouselRef.current.prev()}
        className={`absolute left-[-15px] sm:left-[-20px] top-1/2 cursor-pointer transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md flex items-center justify-center z-10 ${
          mytheme === 'light' ? 'bg-white' : 'bg-gray-600 text-white'
        }`}
      >
        <LeftOutlined
          className={`${mytheme === 'light' ? 'text-gray-800' : 'text-yellow-300'} text-sm`}
        />
      </button>
      <button
        onClick={() => carouselRef.current.next()}
        className={`absolute right-[-15px] sm:right-[-20px] top-1/2 cursor-pointer transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md flex items-center justify-center z-10 ${
          mytheme === 'light' ? 'bg-white' : 'bg-gray-600 text-white'
        }`}
      >
        <RightOutlined
          className={`${mytheme === 'light' ? 'text-gray-800' : 'text-yellow-300'} text-sm`}
        />
      </button>
    </div>
  );

  const MobileView = () => (
    <div className="overflow-x-auto flex gap-3 sm:gap-4 pb-4 snap-x snap-mandatory no-scrollbar px-1">
      {data.map((item) => (
        <div key={item.id} className="flex-shrink-0 w-[85%] sm:w-[80%] snap-start">
          <HomestayTourItem data={item} categoryTitle={title} mytheme={mytheme} />
        </div>
      ))}
    </div>
  );

  return (
    <div className={`py-6 sm:py-8 mt-2 sm:mt-3 ${mytheme === 'light' ? 'bg-gray-50' : "bg-primary"}`}>
      <div className="font-roboto max-w-7xl px-3 sm:px-4 mx-auto">
        <div className="mb-4 sm:mb-6 pl-2 sm:pl-3">
          <h2
            className={`text-xl sm:text-2xl font-bold flex items-center gap-2 ${
              mytheme === 'light' ? 'text-gray-800' : 'text-gray-100'
            }`}
          >
            {title}{' '}
            {secondaryText && (
              <>
                <span className="text-orange-500 font-bold">+</span> 
                <span className="text-base sm:text-xl">{secondaryText}</span>
              </>
            )}
          </h2>
        </div>
        {isMobile ? <MobileView /> : <DesktopView />}
      </div>
    </div>
  );
};

export default function HomestayTourList() {
  const { mytheme: reduxTheme } = useSelector((state: RootState) => state.theme);
  const initialTheme =
    typeof window !== 'undefined'
      ? document.documentElement.getAttribute('data-theme') || 'light'
      : 'light';
  const [isClient, setIsClient] = useState(false);
  const mytheme = isClient ? reduxTheme : initialTheme;

  useEffect(() => {
    setIsClient(true);
    if (isClient && document.documentElement.getAttribute('data-theme') !== mytheme) {
      document.documentElement.setAttribute('data-theme', mytheme);
    }
  }, [mytheme, isClient]);

  const homestayTourData = [
    {
      id: 1,
      title: "Homestay Ông Đề",
      rating: 5,
      category: "Homestay Phòng đôi",
      images: [IMAGES.Sr_homestay, IMAGES.Sr_bat_ca],
      services: [{ name: "2x Lễ Hội Tụ Họ Khám Phá Lễ Hội bắt Cá Ông Đề", discount: "30%" }],
      optionsCount: 4,
      price: 1093555,
      dateInfo: "28/Tháng 4",
    },
    {
      id: 2,
      title: "Homestay Ông Đề",
      rating: 5,
      category: "Homestay Phòng đôi",
      images: [IMAGES.Sr_homestay, IMAGES.Sr_tro_choi1],
      services: [{ name: "2x Trò Chơi Dân Gian Teambuilding tại Ông", discount: "30%" }],
      optionsCount: 2,
      price: 1578534,
      dateInfo: "29/Tháng 4",
    },
    {
      id: 3,
      title: "Homestay Ông Đề",
      rating: 5,
      category: "Homestay Phòng đôi",
      images: [IMAGES.Sr_homestay, IMAGES.St_cheo_xuong_trai_cay],
      services: [{ name: "2x Tour Chèo Xuồng Trải Nghiệm Ăn Trái Cây...", discount: "30%" }],
      optionsCount: 2,
      price: 1124206,
      dateInfo: "24/Tháng 4",
    },
    {
      id: 4,
      title: "Homestay Ông Đề",
      rating: 5,
      category: "Homestay Phòng đôi",
      images: [IMAGES.Sr_homestay, IMAGES.St_cheo_xuong],
      services: [{ name: "2x Tour Chèo Xuồng Tham Quan Ông Đề...", discount: "30%" }],
      optionsCount: 2,
      price: 2318179,
      dateInfo: "27/Tháng 3",
    },
    {
      id: 5,
      title: "Homestay Ông Đề",
      rating: 5,
      category: "Homestay Phòng đôi",
      images: [IMAGES.Sr_homestay, IMAGES.St_gio_ong_de],
      services: [{ name: "2x Lễ Giỗ Ông Đề: Trải Nghiệm Văn Hóa Truyền...", discount: "30%" }],
      optionsCount: 2,
      price: 2318179,
      dateInfo: "27/Tháng 3",
    },
  ];

  const homestayTicketData = [
    {
      id: 1,
      title: "Homestay Ông Đề",
      rating: 5,
      category: "Homestay Phòng đôi",
      images: [IMAGES.Sr_homestay, IMAGES.Sr_bat_ca],
      services: [{ name: "2x Ngày Phổ Lãng Du Lịch Ông Đề Đầm Dơi Cà Mau", discount: "30%" }],
      optionsCount: 3,
      price: 3841524,
      dateInfo: "28/Tháng 6",
    },
    {
      id: 2,
      title: "Homestay Ông Đề",
      rating: 5,
      category: "Homestay Phòng đôi",
      images: [IMAGES.Sr_homestay, IMAGES.St_cheo_xuong],
      services: [{ name: "2x Tour Chèo Xuồng Trải Nghiệm Ăn Trái Cây...", discount: "30%" }],
      optionsCount: 3,
      price: 7254348,
      dateInfo: "28/Tháng 6",
    },
    {
      id: 3,
      title: "Homestay Ông Đề",
      rating: 5,
      category: "Homestay Phòng đôi",
      images: [IMAGES.Sr_homestay, IMAGES.Sr_tro_choi1],
      services: [{ name: "2x Tour Tắm Bùn Mê Ly Ông Đề Cà Mau", discount: "30%" }],
      optionsCount: 3,
      price: 4933582,
      dateInfo: "28/Tháng 6",
    },
    {
      id: 4,
      title: "Homestay Ông Đề",
      rating: 5,
      category: "Homestay Phòng đôi",
      images: [IMAGES.Sr_homestay, IMAGES.St_gio_ong_de],
      services: [{ name: "2x Tour Tham Quan Hệ Thống Ông Đề Rừng Đước", discount: "30%" }],
      optionsCount: 3,
      price: 4346744,
      dateInfo: "28/Tháng 6",
    },
  ];

  const hotelFoodData = [
    {
      id: 1,
      title: "Homestay Ông Đề",
      rating: 5,
      category: "Homestay Phòng đôi",
      images: [IMAGES.Sr_homestay, IMAGES.Sr_bat_ca],
      services: [{ name: "2x Ẩm Thực Địa Ẩn Làm Mồng Tại Ông Đề 30+...", discount: "30%" }],
      optionsCount: 3,
      price: 3463341,
      dateInfo: "28/Tháng 6",
    },
    {
      id: 2,
      title: "Homestay Ông Đề",
      rating: 5,
      category: "Homestay Phòng đôi",
      images: [IMAGES.Sr_homestay, IMAGES.St_cheo_xuong],
      services: [{ name: "2x Dịch Vụ Nhà Ăn Lưu Động Tại Ông Đề 30+...", discount: "30%" }],
      optionsCount: 3,
      price: 4956004,
      dateInfo: "28/Tháng 4",
    },
    {
      id: 3,
      title: "Homestay Ông Đề",
      rating: 5,
      category: "Homestay Phòng đôi",
      images: [IMAGES.Sr_homestay, IMAGES.Sr_tro_choi1],
      services: [{ name: "2x Dịch Vụ Nhà Ăn Làm Đồng Tại Ông Đề 30+...", discount: "15%" }],
      optionsCount: 3,
      price: 4567506,
      dateInfo: "28/Tháng 4",
    },
    {
      id: 4,
      title: "Homestay Ông Đề",
      rating: 5,
      category: "Homestay Phòng đôi",
      images: [IMAGES.Sr_homestay, IMAGES.St_gio_ong_de],
      services: [{ name: "2x Dịch Vụ Nhà Ăn Làm Đồng Tại Ông Đề 30+...", discount: "15%" }],
      optionsCount: 3,
      price: 3239936,
      dateInfo: "28/Tháng 6",
    },
  ];

  return (
    <>
      <ServiceCarousel
        title="Homestay"
        secondaryText="Tour & Trải nghiệm"
        data={homestayTourData}
        mytheme={mytheme}
      />
      <ServiceCarousel
        title="Homestay"
        secondaryText="Vé tham quan"
        data={homestayTicketData}
        mytheme={mytheme}
      />
      <ServiceCarousel
        title="Khách sạn"
        secondaryText="Ẩm thực"
        data={hotelFoodData}
        mytheme={mytheme}
      />
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @media (max-width: 640px) {
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
        }
      `}</style>
    </>
  );
}