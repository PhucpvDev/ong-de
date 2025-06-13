"use client";

import { Card, Carousel } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { IMAGES } from "@/constants/theme";
import React, { useRef, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { ConfigProvider } from "antd";
import Link from "next/link";

interface Service {
  id: number;
  image: string | StaticImageData;
  rating: number;
  reviews: string;
  views: string;
  originalPrice: number;
  salePrice: number;
  discount?: number;
  category: string;
  title: string;
  status: string;
  tags: string[];
}

interface ServiceCardProps {
  service: Service;
}

interface ArrowProps {
  className?: string;
  onClick?: () => void;
  currentSlide?: number;
  slideCount?: number;
  slidesToShow?: number;
}

const services: Service[] = [
  {
    id: 1,
    image: IMAGES.Sr_dem_trang,
    rating: 4.4,
    reviews: "(964)",
    views: "20K+",
    originalPrice: 850000,
    salePrice: 765000,
    category: "Dịch vụ du lịch • Ông Đề",
    title: "Chương Trình \"Đêm Trăng Tây Đô – Nghỉ Dưỡng 2 Ngày 1 Đêm\"",
    status: "Đã được đặt",
    tags: ["Miễn phí hủy"],
  },
  {
    id: 2,
    image: IMAGES.Sr_tham_quan,
    rating: 4.7,
    reviews: "(1,486)",
    views: "10K+",
    discount: 10,
    originalPrice: 1100000,
    salePrice: 990000,
    category: "Tour • Ông Đề",
    title: "Tour Chương Trình \"Tham Quan Đặc Sắc\" Tại Ông Đề 2025",
    status: "Đã được đặt",
    tags: ["Đón tại khách sạn", "Tour riêng"],
  },
  {
    id: 3,
    image: IMAGES.Sr_am_thuc,
    rating: 4.6,
    reviews: "(1,149)",
    views: "40K+",
    originalPrice: 420000,
    salePrice: 400000,
    category: "Ẩm Thực • Ông Đề",
    title: "Dịch Vụ Nấu Ăn Lưu Động Tại Ông Đề 2025",
    status: "Đã được đặt",
    tags: ["Miễn phí hủy", "Đặt trước cho ngày mai"],
  },
  {
    id: 4,
    image: IMAGES.Sr_tro_choi1,
    rating: 4.8,
    reviews: "(1,998)",
    views: "20K+",
    discount: 5,
    originalPrice: 1260000,
    salePrice: 1195045,
    category: "Tour • Ông Đề",
    title: "Trò Chơi Dân Gian Teambuilding Tại Ông Đề 2025",
    status: "Đã được đặt",
    tags: ["Đón tại homestay", "Tour riêng"],
  },
  {
    id: 5,
    image: IMAGES.Sr_tat_nien,
    rating: 4.4,
    reviews: "(964)",
    views: "20K+",
    originalPrice: 850000,
    salePrice: 765000,
    category: "Dịch vụ du lịch • Ông Đề",
    title: "Chương Trình \"Đêm Trăng Tây Đô – Nghỉ Dưỡng 2 Ngày 1 Đêm\"",
    status: "Đã được đặt",
    tags: ["Miễn phí hủy"],
  },
  {
    id: 6,
    image: IMAGES.Sr_bat_ca,
    rating: 4.7,
    reviews: "(1,486)",
    views: "10K+",
    discount: 10,
    originalPrice: 1100000,
    salePrice: 990000,
    category: "Tour • Ông Đề",
    title: "Tour Chương Trình \"Tham Quan Đặc Sắc\" Tại Ông Đề 2025",
    status: "Đã được đặt",
    tags: ["Đón tại khách sạn", "Tour riêng"],
  },
  {
    id: 7,
    image: IMAGES.St_cheo_xuong,
    rating: 4.6,
    reviews: "(1,149)",
    views: "40K+",
    originalPrice: 420000,
    salePrice: 400000,
    category: "Ẩm Thực • Ông Đề",
    title: "Dịch Vụ Nấu Ăn Lưu Động Tại Ông Đề 2025",
    status: "Đã được đặt",
    tags: ["Miễn phí hủy", "Đặt trước cho ngày mai"],
  },
  {
    id: 8,
    image: IMAGES.St_sinh_thai,
    rating: 4.8,
    reviews: "(1,998)",
    views: "20K+",
    discount: 5,
    originalPrice: 1260000,
    salePrice: 1195045,
    category: "Tour • Ông Đề",
    title: "Trò Chơi Dân Gian Teambuilding Tại Ông Đề 2025",
    status: "Đã được đặt",
    tags: ["Đón tại homestay", "Tour riêng"],
  },
];

export default function FeaturedServices() {
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
      borderRadius: 8,
    },
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const ServiceCard = ({ service }: ServiceCardProps) => (
    <Card
      cover={
        <Image
          alt={service.title}
          src={service.image}
          width={400}
          height={192}
          className="h-32 sm:h-48 lg:h-48 object-cover"
        />
      }
      className="border-gray-200 bg-white border shadow-xs hover:shadow-md font-roboto transition-all duration-200 rounded-2xl cursor-pointer"
      styles={{ body: { padding: "8px 10px", height: isMobile ? "130px" : "170px" } }}
    >
      <div className="flex flex-col h-full">
        <div>
          <div className="text-xs md:text-sm text-gray-600 mb-1">
            {service.category}
          </div>
          <h3 className="font-medium text-sm md:text-base mb-1.5 line-clamp-2 text-gray-900">
            {service.title}
          </h3>

          <div className="mb-1.5 flex-wrap md:block hidden">
            {service.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="text-[12px] text-gray-600 bg-gray-100 px-2 py-[2px] rounded-sm mr-1.5 mb-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="text-[14px] md:text-base font-medium text-gray-900">
              Từ {formatPrice(service.salePrice)}
            </span>
            {service.originalPrice > service.salePrice && (
              <>
                {!service.discount && (
                  <span className="text-xs md:text-sm text-gray-400 line-through">
                    {formatPrice(service.originalPrice)}
                  </span>
                )}
                {service.discount && (
                  <span className="text-[11px] md:text-sm text-[#FF424F] bg-[#FFF2F3] px-1 py-0.5 rounded">
                    {service.discount}%
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  const SampleNextArrow = ({ className, onClick, currentSlide, slideCount, slidesToShow }: ArrowProps) => {
    const isLastSlide = (currentSlide ?? 0) + (slidesToShow ?? 0) >= (slideCount ?? 0);
    if (isLastSlide) return null;

    return (
      <div
        className={`${className} !hidden md:!flex items-center justify-center w-10 h-10 bg-gray-50/90 hover:bg-gray-100 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg !right-[-25px] cursor-pointer z-10 transition-all duration-200`}
        onClick={onClick}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <span className="text-gray-900 text-base px-3 py-2 rounded-full border border-gray-400"><RightOutlined/></span>
      </div>
    );
  };

  const SamplePrevArrow = ({ className, onClick, currentSlide }: ArrowProps) => {
    if (currentSlide === 0) return null;

    return (
      <div
        className={`${className} !hidden md:!flex items-center justify-center w-10 h-10 bg-gray-50/90 hover:bg-gray-100 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg !left-[-22px] cursor-pointer z-10 transition-all duration-200`}
        onClick={onClick}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <span className="text-gray-900 text-base px-3 py-2 rounded-full border border-gray-400"><LeftOutlined/></span>
      </div>
    );
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="container mx-auto px-4 lg:px-12 xl:px-20 2xl:px-36 py-12 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Các dịch vụ nổi bật
          </h2>
        </div>

        {isMobile ? (
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service.id}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative -mx-2">
            <Carousel
              ref={carouselRef}
              arrows
              nextArrow={<SampleNextArrow />}
              prevArrow={<SamplePrevArrow />}
              slidesToShow={4}
              slidesToScroll={4}
              dots={false}
              infinite={false}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  },
                },
              ]}
              className="!static"
            >
              {services.map((service) => (
                <div key={service.id} className="px-2 p-1">
                  <ServiceCard service={service} />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        <div className="flex justify-center mt-6 sm:mt-8">
          <Link href="/services"
            className="md:w-96 w-full sm:px-38 md:py-2 py-1 border cursor-pointer border-gray-300 hover:border-yellow-500 hover:text-yellow-500 text-gray-800 hover:bg-gray-50 rounded-lg text-lg sm:text-base transition-all duration-200 shadow-xs hover:shadow-lg"
          >
            Xem thêm
          </Link>
        </div>
      </div>
    </ConfigProvider>
  );
}