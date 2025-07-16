"use client";

import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Typography, ConfigProvider } from "antd";
import { useLocale } from "next-intl";
import { GetBannerSupport } from "@/lib/directus/support/bannerSupport";
import { BannerSupportTranslation } from "@/types/directus/support/bannerSupport";

const { Title, Paragraph } = Typography;

export default function SupportBanner() {
  const locale = useLocale();
  const [bannerData, setBannerData] = useState<BannerSupportTranslation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBannerSupport() {
      try {
        setLoading(true);
        const data = await GetBannerSupport(locale);
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
    fetchBannerSupport();
  }, [locale]);

  const themeConfig = {
    token: {
      colorPrimary: "#22C55E",
      borderRadius: 12,
    },
  };

  if (loading) {
    return (
      <div
        className="relative w-full h-[300px] md:h-[400px] overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, rgb(12, 73, 26), #0D1B2A)",
        }}
      >
        <div className="absolute inset-0 flex items-center text-center p-4">
          <div className="w-full max-w-7xl px-6 mx-auto pt-14">
            <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto mb-6 animate-pulse"></div>
            <div className="w-full max-w-3xl mx-auto mb-4">
              <div className="h-10 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mt-4 animate-pulse"></div>
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
      <div
        className="relative w-full h-[300px] md:h-[400px] overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, rgb(12, 73, 26), #0D1B2A)",
        }}
      >
        <div className="absolute inset-0 flex items-center text-center p-4">
          <div className="w-full max-w-7xl px-6 mx-auto pt-14">
            <Title className="!text-white !text-2xl md:!text-4xl !font-semibold !mb-6">
              {bannerData.title}
            </Title>
            <Space direction="vertical" className="w-full max-w-3xl mx-auto mb-4">
              <Input
                placeholder={
                  locale === "vi"
                    ? "Tìm hiểu về giá vé, khuyến mãi hoặc đặt tour?"
                    : locale === "en"
                    ? "Learn about ticket prices, promotions, or book a tour?"
                    : locale === "zh"
                    ? "了解票价、促销或预订旅游？"
                    : locale === "ko"
                    ? "티켓 가격, 프로모션 또는 투어 예약에 대해 알아보세요."
                    : "Learn about ticket prices, promotions, or book a tour?"
                }
                prefix={<SearchOutlined className="!text-xl mr-2 !text-gray-400" />}
                className="w-full !rounded-full !p-3 !text-base !text-gray-900 focus:!outline-none"
              />
            </Space>
            <Paragraph className="!text-white !font-medium !text-sm md:!text-lg mt-4">
              {bannerData.description}
            </Paragraph>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}