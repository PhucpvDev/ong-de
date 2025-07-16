"use client";

import { Carousel } from "antd";
import {
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { GetBannerHomestay } from "@/lib/directus/homestay/banner";
import { BannerHomestayTranslation } from "@/types/directus/homestay/banner";
import { useLocale } from "next-intl";
import SkeletonBanner from '@/skeleton/homestay/banner';

export default function BannerHomestay() {
  const carouselRef = React.useRef<any>(null);
  const locale = useLocale();
  const [banners, setBanners] = useState<BannerHomestayTranslation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBanners() {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const data = await GetBannerHomestay(locale);
        if (data) {
          setBanners(data);
        } else {
          setError("No banner data available.");
        }
      } catch (err) {
        console.error("Failed to fetch banner data:", err);
        setError("Failed to load banners. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchBanners();
  }, [locale]);

  const nextSlide = () => {
    carouselRef.current?.next();
  };

  const prevSlide = () => {
    carouselRef.current?.prev();
  };

  const themeConfig = {
    token: {
      colorPrimary: "#22C55E",
      borderRadius: 8,
    },
  };

  if (loading) {
    return <SkeletonBanner />;
  }

  if (error || banners.length === 0) {
    return <div className="text-center py-12 text-white">{error || "No banner data available."}</div>;
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="relative w-full">
        <Carousel
          ref={carouselRef}
          autoplay
          autoplaySpeed={6000}
          effect="fade"
          className="relative touch-pan-x"
          dots={{ className: "pb-6" }}
          dotPosition="bottom"
          draggable
        >
          {banners.map((item, index) => (
            <div key={index}>
              <div className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${item.image}`}
                  alt={item.title}
                  fill
                  className="object-cover brightness-75"
                  priority
                  onError={(e) => {
                    e.currentTarget.src = "/fallback-image.jpg";
                  }}
                />

                <div className="absolute inset-0 pointer-events-none z-[2]">
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-900/50 to-transparent" />
                </div>

                <div className="relative h-full flex items-center justify-center z-10">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                    <div className="grid lg:grid-cols-12 gap-8 items-center h-full">
                      <div className="lg:col-span-12 space-y-4 px-6 text-center lg:text-left">
                        <span className="inline-block bg-green-500/40 text-white text-sm font-semibold px-8 py-3 rounded-full">
                          {item.tag}
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-xl">
                          {item.title}
                        </h1>
                        <p className="text-base sm:text-lg text-white/90 max-w-7xl mx-auto lg:mx-0 leading-relaxed bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                          {item.description}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
                          {[item.feature_1, item.feature_2, item.feature_3, item.feature_4]
                            .filter(Boolean)
                            .map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-center text-white bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-white/20 transition-all hover:bg-white/15"
                              >
                                <span className="text-sm font-medium">{feature}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={prevSlide}
                  className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center transition-all z-20 border border-white/20 shadow-lg pointer-events-auto"
                >
                  <LeftOutlined className="text-xl drop-shadow-md" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center transition-all z-20 border border-white/20 shadow-lg pointer-events-auto"
                >
                  <RightOutlined className="text-xl drop-shadow-md" />
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </ConfigProvider>
  );
}