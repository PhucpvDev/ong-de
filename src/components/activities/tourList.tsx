"use client";

import React, { useEffect, useState } from "react";
import { Card, ConfigProvider, Spin, Alert, Typography } from "antd";
import { IMAGES } from "@/constants/theme";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

const { Title } = Typography;

interface PriceType {
  id: number;
  name: string;
  description: string;
}

interface BasePrice {
  price: number;
  price_type: PriceType;
}

interface Activity {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  main_image: string;
  images: string[];
  conditions: string;
  location_area: string;
  min_participants: number;
  max_participants: number;
  base_prices: BasePrice[];
  capacity_prices: any[];
  segment_prices: any[];
  policies: any[];
}

interface Tour {
  id: string;
  image: string;
  title: string;
  tag?: string;
  price: number;
  slug: string;
}

const TourCard = ({ tour, isMobile = false }: { tour: Tour; isMobile?: boolean }) => {
  return (
    <Link href={`/activities/${tour.slug}`} passHref>
      <div
        className={`font-roboto overflow-hidden cursor-pointer ${isMobile
            ? "flex-none w-[150px] bg-white"
            : "transition-all duration-200 bg-white w-[230px] sm:w-[230px]"
          }`}
      >
        <div className="relative aspect-[4/3]">
          <Image
            alt={tour.title}
            src={IMAGES.St_cheo_xuong}
            width={230}
            height={172.5}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={isMobile ? "p-3" : "p-[12px]"}>
          <h3
            className={`font-medium mb-${isMobile ? "1" : "2"} line-clamp-2 ${isMobile ? "text-sm" : "text-base"
              } text-gray-900`}
          >
            {tour.title}
          </h3>
          <div className="flex items-baseline mt-4">
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
    </Link>
  );
};

export default function ActivitiesList() {
  const locale = useLocale();
  const [isMobile, setIsMobile] = useState(false);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities?locale=${locale}`);

        if (!response.ok) {
          throw new Error("Không thể tải dữ liệu hoạt động");
        }

        const data = await response.json();
        const activities: Activity[] = data.data.activities || [];

        const transformedTours: Tour[] = activities.map((activity) => ({
          id: activity.id.toString(),
          image: activity.main_image,
          title: activity.name,
          tag: activity.base_prices[0]?.price < 100000 ? "Ưu đãi" : undefined,
          price: activity.base_prices.find((bp) => bp.price_type.name === "Ngày thường")?.price || activity.base_prices[0]?.price || 0,
          slug: activity.slug,
        }));

        setTours(transformedTours);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [locale]);

  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
    },
  };

  if (loading) {
    return (
      <ConfigProvider theme={themeConfig}>
        <div className="font-roboto bg-[#FFF0E5] sm:mx-auto sm:max-w-[1230px] mb-10 rounded-3xl mx-4 p-4 sm:p-6">
          <div className="flex items-center justify-center py-20">
            <Spin size="large" />
          </div>
        </div>
      </ConfigProvider>
    );
  }

  if (error) {
    return (
      <ConfigProvider theme={themeConfig}>
        <div className="font-roboto bg-[#FFF0E5] sm:mx-auto sm:max-w-[1230px] mb-10 rounded-3xl mx-4 p-4 sm:p-6">
          <Alert
            message="Lỗi tải dữ liệu"
            description={error}
            type="error"
            showIcon
            className="mb-4"
          />
        </div>
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="font-roboto bg-[#FFF0E5] sm:mx-auto sm:max-w-[1230px] mb-10 md:mt-0 mt-6 rounded-3xl mx-4 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Title level={2} className="!text-xl md:!text-2xl !text-orange-600">
              {locale === "vi" ? (
                <>Hoạt động trong ngày</>
              ) : locale === "en" ? (
                <>Daily Activities</>
              ) : locale === "zh" ? (
                <>每日活动</>
              ) : locale === "ko" ? (
                <>일일 활동</>
              ) : (
                <>Daily Activities</>
              )}
            </Title>
          </div>
        </div>

        {tours.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Không có hoạt động nào để hiển thị
          </div>
        ) : (
          <>
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {tours.map((tour) => (
                <Card
                  key={tour.id}
                  className="overflow-hidden hover:shadow-md transition-all duration-200"
                  cover={<TourCard tour={tour} />}
                  styles={{ body: { display: "none" } }}
                />
              ))}
            </div>
            <div className="md:hidden flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} isMobile />
              ))}
            </div>
          </>
        )}
      </div>
    </ConfigProvider>
  );
}