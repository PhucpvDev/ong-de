"use client";

import { Carousel } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  AimOutlined,
  CarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { ConfigProvider } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { LocationInfo } from "@/lib/directus/home/locationInfo";
import { GetBanner } from "@/lib/directus/home/banner";
import { Translation } from "@/types/directus/home/locationInfo";
import { BannerTranslation } from "@/types/directus/home/banner";
import SkeletonBanner from '@/skeleton/home/banner';

export default function Banner() {
  const locale = useLocale();
  const carouselRef = React.useRef(null);
  const [locationTranslation, setLocationTranslation] = useState<Translation | null>(null);
  const [bannerTranslations, setBannerTranslations] = useState<BannerTranslation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [locationData, bannerData] = await Promise.all([
          LocationInfo(locale),
          GetBanner(locale),
        ]);
        setLocationTranslation(locationData || null);
        setBannerTranslations(bannerData || null);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLocationTranslation(null);
        setBannerTranslations(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [locale]);

  const nextSlide = () => {
    carouselRef.current?.next();
  };

  const prevSlide = () => {
    carouselRef.current?.prev();
  };

  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
      borderRadius: 8,
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="relative w-full">
        {isLoading ? (
          <SkeletonBanner />
        ) : (
          <Carousel
            ref={carouselRef}
            autoplay
            autoplaySpeed={8000}
            effect="fade"
            className="relative touch-pan-x"
            dots={{ className: "pb-4" }}
            dotPosition="bottom"
            draggable
          >
            {bannerTranslations && bannerTranslations.length > 0 ? (
              bannerTranslations.map((item, index) => (
                <div key={index}>
                  <div className="relative w-full h-[100vh] min-h-[600px] md:pt-14 overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${item.images}`}
                      alt={item.title}
                      fill
                      className="object-cover"
                      priority
                    />

                    <div className="absolute inset-0 pointer-events-none z-[2]">
                      <div className="absolute bottom-0 left-0 w-full h-40 opacity-20">
                        <svg
                          className="w-full h-full"
                          viewBox="0 0 1200 120"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0,60 C300,20 600,100 900,60 C1050,30 1150,90 1200,60 L1200,120 L0,120 Z"
                            fill="rgba(34, 197, 94, 0.4)"
                            className="animate-pulse"
                          >
                            <animate
                              attributeName="d"
                              values="M0,60 C300,20 600,100 900,60 C1050,30 1150,90 1200,60 L1200,120 L0,120 Z;
                                      M0,80 C300,40 600,80 900,40 C1050,10 1150,70 1200,40 L1200,120 L0,120 Z;
                                      M0,60 C300,20 600,100 900,60 C1050,30 1150,90 1200,60 L1200,120 L0,120 Z"
                              dur="5s"
                              repeatCount="indefinite"
                            />
                          </path>
                        </svg>
                      </div>
                    </div>

                    <div className="relative h-full flex items-center z-10">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                        <div className="grid lg:grid-cols-12 gap-6 items-center h-full">
                          <div className="lg:col-span-7 space-y-6">
                            <div className="space-y-3">
                              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                                {item.title}
                              </h1>
                              <p className="text-lg sm:text-2xl lg:text-2xl text-yellow-300 font-semibold drop-shadow-lg hidden md:block">
                                {item.subtitle}
                              </p>
                            </div>

                            <p className="text-base sm:text-lg text-white/95 leading-relaxed max-w-3xl drop-shadow-lg bg-black/20 p-4 rounded-lg border border-white/20 backdrop-blur-sm">
                              {item.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 hidden md:grid">
                              {[item.features_1, item.features_2, item.features_3, item.features_4]
                                .filter(Boolean)
                                .map((feature, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center text-white bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-white/20 transition-all hover:bg-white/15"
                                  >
                                    <span className="font-medium flex-1 ml-2">
                                      {feature}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div className="lg:col-span-5 flex justify-center items-center">
                            <div className="space-y-6 md:w-90 w-full">
                              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
                                <h2 className="font-bold text-lg text-gray-800 mb-4 text-center">
                                  {locale === "vi"
                                    ? "Thông tin nhanh"
                                    : locale === "ko"
                                    ? "빠른 정보"
                                    : locale === "zh"
                                    ? "快速信息"
                                    : "Quick Info"}
                                </h2>
                                <div className="space-y-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                      <span className="text-blue-600 text-sm"><ClockCircleOutlined /></span>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">
                                        {locale === "vi"
                                          ? "Giờ hoạt động"
                                          : locale === "ko"
                                          ? "운영 시간"
                                          : locale === "zh"
                                          ? "营业时间"
                                          : "Operating Hours"}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {locationTranslation?.operating_hours || "8:00 - 22:00 daily"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                      <span className="text-green-600 text-sm"><EnvironmentOutlined /></span>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">
                                        {locale === "vi"
                                          ? "Địa chỉ"
                                          : locale === "ko"
                                          ? "주소"
                                          : locale === "zh"
                                          ? "地址"
                                          : "Address"}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {locationTranslation?.address || "My Khanh Commune, Phong Dien"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                      <span className="text-orange-600 text-sm"><CarOutlined /></span>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">
                                        {locale === "vi"
                                          ? "Khoảng cách"
                                          : locale === "ko"
                                          ? "거리"
                                          : locale === "zh"
                                          ? "距离"
                                          : "Distance"}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {locationTranslation?.distance || "10km from Can Tho city center"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                      <span className="text-purple-600 text-sm"><AimOutlined /></span>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">
                                        {locale === "vi"
                                          ? "Diện tích"
                                          : locale === "ko"
                                          ? "면적"
                                          : locale === "zh"
                                          ? "面积"
                                          : "Area"}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {locationTranslation?.area || "3 hectares with diverse services"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={prevSlide}
                      className="absolute left-4 cursor-pointer top-1/2 hidden md:flex -translate-y-1/2 bg-white/25 hover:bg-white/35 text-white backdrop-blur-md w-12 h-12 rounded-full items-center justify-center transition-all z-20 border border-white/30 shadow-xl"
                    >
                      <LeftOutlined className="text-2xl drop-shadow-lg" />
                    </button>

                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 cursor-pointer hidden md:flex -translate-y-1/2 bg-white/25 hover:bg-white/35 text-white backdrop-blur-md w-12 h-12 rounded-full items-center justify-center transition-all z-20 border border-white/30 shadow-xl"
                    >
                      <RightOutlined className="text-2xl drop-shadow-lg" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="relative w-full h-[100vh] min-h-[600px] flex items-center justify-center text-center text-red-600">
                Failed to load banner.
              </div>
            )}
          </Carousel>
        )}
      </div>
    </ConfigProvider>
  );
}