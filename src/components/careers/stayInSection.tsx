"use client";

import React, { useEffect, useState } from "react";
import { Typography, Button, ConfigProvider } from "antd";
import Image from "next/image";
import { useLocale } from "next-intl";
import { StayInSectionTranslation } from "@/types/directus/careers/stayInSection";
import { GetStayInSection } from "@/lib/directus/careers/stayInSection";

const { Title } = Typography;

export default function StayInSection() {
  const locale = useLocale();
  const [sectionData, setSectionData] = useState<StayInSectionTranslation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStayInSection() {
      try {
        setLoading(true);
        const data = await GetStayInSection(locale);
        if (data) {
          setSectionData(data);
        } else {
          setError("No section data available.");
        }
      } catch (err) {
        console.error("Failed to fetch section data:", err);
        setError("Failed to load section data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchStayInSection();
  }, [locale]);

  const themeConfig = {
    token: {
      colorPrimary: sectionData?.bg_button || "#00A63E",
      borderRadius: 12,
    },
  };

  if (loading) {
    return (
      <div className="mx-auto bg-gray-50 py-16 relative">
        <div className="absolute inset-0 z-10">
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
        </div>
        <div className="relative z-20 max-w-7xl mx-auto text-center px-6">
          <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-8 animate-pulse"></div>
          <div className="h-12 bg-gray-300 rounded-full w-64 mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !sectionData) {
    return (
      <div className="text-center py-12 text-gray-600">
        {error || "No section data available."}
      </div>
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="mx-auto bg-gray-50 py-16 relative">
        <div className="absolute inset-0 z-10">
          <Image
            alt="Background Image for Ong De Eco-Tourism Village"
            src="https://d8yy0r0qfxgnb.cloudfront.net/public/uploads/d4ae62991bd5c324a108f969d3587953/images/files/a8d8afed8251bf8306f864167b909c47/large/Stay_in_the_loop.jpg?1646069260"
            className="w-full h-full object-cover"
            width={1200}
            height={500}
            priority
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto text-center px-6">
          <Title className="!text-xl md:!text-2xl lg:!text-3xl !font-bold !text-gray-800 !mb-8 !leading-tight">
            {sectionData.title}
          </Title>

          <Button
            type="primary"
            size="large"
            href={sectionData.button_url}
            style={{ backgroundColor: sectionData.bg_button }}
            className="hover:!bg-opacity-80 !border-0 !px-8 !py-4 !h-auto !text-lg !font-semibold !rounded-full !shadow-lg hover:!shadow-xl !transition-all !duration-300"
          >
            {sectionData.button_text}
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
}