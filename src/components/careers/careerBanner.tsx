"use client";

import React, { useEffect, useState } from "react";
import { Button, Typography, ConfigProvider } from "antd";
import Image from "next/image";
import { useLocale } from "next-intl";
import { CareersBannerTranslation } from "@/types/directus/careers/careerBanner";
import { GetCareersBanner } from "@/lib/directus/careers/careerBanner";

const { Title, Paragraph } = Typography;

export default function CareerBanner() {
  const locale = useLocale();
  const [bannerData, setBannerData] = useState<CareersBannerTranslation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCareersBanner() {
      try {
        setLoading(true);
        const data = await GetCareersBanner(locale);
        if (data) {
          setBannerData(data);
        } else {
          setError("No banner data available.");
        }
      } catch (err) {
        console.error("Failed to fetch banner data:", err);
        setError("Failed to load banner data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchCareersBanner();
  }, [locale]);

  const themeConfig = {
    token: {
      colorPrimary: bannerData?.bg_button || "#00A63E",
      borderRadius: 12,
    },
  };

  if (loading) {
    return (
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        <div className="absolute inset-0 bg-black/50 flex items-center text-center p-4 md:mt-14">
          <div className="w-7xl px-6 mx-auto">
            <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-6 animate-pulse"></div>
            <div className="h-12 bg-gray-300 rounded-full w-40 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !bannerData) {
    return (
      <div className="text-center py-12 text-gray-600">
        {error || "No banner data available."}
      </div>
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${bannerData.image}`}
          alt="Career Banner"
          fill
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 bg-black/50 flex items-center text-center p-4 md:mt-14">
          <div className="w-7xl px-6 mx-auto">
            <Title className="!text-white !text-2xl md:!text-4xl max-w-3xl mx-auto font-semibold mb-4">
              {bannerData.title}
            </Title>
            <Paragraph className="!text-white mx-auto !text-base md:!text-xl mb-6 w-xl">
              {bannerData.description}
            </Paragraph>
            <Button
              type="primary"
              size="large"
              href={bannerData.button_url}
              style={{ backgroundColor: bannerData.bg_button }}
              className="hover:!bg-opacity-80 !border-0 !p-3 !px-12 !h-auto !text-lg !font-semibold !rounded-full !shadow-lg hover:!shadow-xl !transition-all !duration-300"
            >
              {bannerData.button_text}
            </Button>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}