"use client";

import React, { useEffect, useState } from "react";
import { Card, ConfigProvider } from "antd";
import { IMAGES } from "@/constants/theme";
import Image from "next/image";

import type { StaticImageData } from "next/image";

interface Festival {
  id: number;
  image: string | StaticImageData;
  title: string;
  tag?: string;
  rating: number;
  reviews: string;
  price: number;
}

const TourCard = ({ tour, isMobile = false }: { tour: Festival; isMobile?: boolean }) => {
  return (
    <div
      className={`rounded-2xl font-roboto overflow-hidden cursor-pointer ${
        isMobile
          ? "flex-none w-[150px] bg-white"
          : "transition-all duration-200 bg-white w-[230px] sm:w-[230px]"
      }`}
    >
      <div className="relative aspect-[4/3]">
        <Image
          alt={tour.title}
          src={tour.image}
          width={230}
          height={172.5}
          className="w-full h-full object-cover"
        />
        {tour.tag && (
          <span
            className={`absolute top-3 right-3 bg-primary text-white text-xs rounded-md ${
              isMobile ? "px-1 py-0.5" : "px-2 py-1"
            }`}
          >
            {tour.tag}
          </span>
        )}
      </div>
      <div className={isMobile ? "p-3" : "p-[12px]"}>
        <h3
          className={`font-medium mb-${isMobile ? "1" : "2"} line-clamp-2 ${
            isMobile ? "text-sm" : "text-base"
          } text-gray-900`}
        >
          {tour.title}
        </h3>
        <div className="flex items-baseline mt-4">
          <span className="text-base mr-1 text-gray-700">đ</span>
          <span className={`font-medium ${isMobile ? "" : "text-base"} text-gray-900`}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
              minimumFractionDigits: 0,
            }).format(tour.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

const FestivalExperience = () => {
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

  const festivals: Festival[] = [
    {
      id: 1,
      image: IMAGES.St_gio_ong_de,
      title: "Lễ Giỗ Ông Đề: Trải Nghiệm Văn Hóa Truyền...",
      tag: "",
      rating: 4.5,
      reviews: "(127)",
      price: 112000,
    },
    {
      id: 2,
      image: IMAGES.Sr_dan_ca,
      title: "Tứ Do Khám Phá Lễ Hội Đờn Ca Tài Tử Ông Đề",
      tag: "Dịch vụ mới",
      rating: 4.7,
      reviews: "(170)",
      price: 168000,
    },
    {
      id: 3,
      image: IMAGES.Sr_phim_truong,
      title: "Lễ Hội Tết Miền Tây: Khám Phá Phim Trường Tết...",
      tag: "",
      rating: 4.7,
      reviews: "(170)",
      price: 114000,
    },
    {
      id: 4,
      image: IMAGES.St_am_thuc,
      title: "Lễ Hội Ẩm Thực Đồng Quê Ông Đề: Thưởng...",
      tag: "",
      rating: 4.8,
      reviews: "(98)",
      price: 197000,
    },
    {
      id: 5,
      image: IMAGES.Sr_bat_ca,
      title: "Tứ Do Khám Phá Lễ Hội Bắt Cá Ông Đề",
      tag: "",
      rating: 4.8,
      reviews: "(21)",
      price: 118000,
    },
  ];

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="font-roboto bg-[#FFF5F5] sm:mx-auto sm:max-w-[1230px] mb-10 rounded-3xl mx-4 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl font-bold pt-2 text-orange-600">
              Trải nghiệm các lễ hội
            </h2>
          </div>
          <a href="#" className="text-base text-gray-600 hover:text-orange-600">
            Xem tất cả
          </a>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {festivals.map((festival) => (
            <Card
              key={festival.id}
              className="rounded-2xl font-roboto overflow-hidden hover:bg-gray-100 transition-all duration-200"
              cover={<TourCard tour={festival} />}
              styles={{ body: { display: "none" } }}
            />
          ))}
        </div>

        <div className="md:hidden flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
          {festivals.map((festival) => (
            <TourCard key={festival.id} tour={festival} isMobile />
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default FestivalExperience;