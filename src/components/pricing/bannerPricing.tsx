"use client";

import React, { useEffect, useState } from "react";
import { Typography, ConfigProvider } from "antd";
import { useLocale } from "next-intl";
import { BannerPricingTranslation } from "@/types/directus/pricing/bannerPricing";
import { GetBannerPricing } from "@/lib/directus/pricing/bannerPricing";

const { Title, Paragraph } = Typography;

export default function BannerPricing() {
  const locale = useLocale();
  const [bannerData, setBannerData] = useState<BannerPricingTranslation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBannerPricing() {
      try {
        setLoading(true);
        const data = await GetBannerPricing(locale);
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
    fetchBannerPricing();
  }, [locale]);

  if (loading) {
    return (
      <div
        className="relative w-full h-[300px] md:h-[400px] overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, rgb(7, 83, 25), #0D1B2A)",
        }}
      >
        <div className="absolute inset-0 flex items-center text-center p-4">
          <div className="w-7xl px-6 mx-auto mt-6">
            <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-6 animate-pulse"></div>
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
    <ConfigProvider>
      <div
        className="relative w-full h-[300px] md:h-[400px] overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, rgb(7, 83, 25), #0D1B2A)",
        }}
      >
        <div className="absolute inset-0 flex items-center text-center p-4">
          <div className="w-7xl px-6 mx-auto mt-6">
            <Title className="!text-white !text-2xl md:!text-5xl font-semibold mb-4">
              {bannerData.title}
            </Title>
            <Paragraph className="!text-white !text-base md:!text-xl mb-6 mx-auto">
              {bannerData.description}
            </Paragraph>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}