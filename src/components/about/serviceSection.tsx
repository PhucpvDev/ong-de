"use client";

import React, { useEffect, useState } from "react";
import { Button, Typography, ConfigProvider } from "antd";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { GetServiceSection } from "@/lib/directus/about/serviceSection";
import { ServiceSectionTranslation } from "@/types/directus/about/serviceSection";

const { Title, Paragraph } = Typography;

export default function ServiceSection() {
  const locale = useLocale();
  const [services, setServices] = useState<ServiceSectionTranslation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServiceSection() {
      try {
        setLoading(true);
        const data = await GetServiceSection(locale);
        if (data) {
          setServices(data);
        } else {
          setError("No service data available.");
        }
      } catch (err) {
        console.error("Failed to fetch service data:", err);
        setError("Failed to load service data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchServiceSection();
  }, [locale]);

  const themeConfig = {
    token: {
      colorPrimary: "#22C55E",
      borderRadius: 12,
    },
  };

  if (loading) {
    return (
      <div className="relative max-w-7xl md:px-6 px-4 mt-10 mx-auto py-8 bg-white rounded-lg overflow-hidden">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-30 h-[150px] bg-gray-300 rounded-xl animate-pulse"></div>
              <div>
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-1 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center z-10 relative">
          <div className="h-12 bg-gray-300 rounded-full w-40 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || services.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        {error || "No service data available."}
      </div>
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="relative max-w-7xl md:px-6 px-4 mt-10 mx-auto py-8 bg-white rounded-lg overflow-hidden">
        <div className="text-center mb-8">
          <Title level={2} className="!text-xl md:!text-3xl py-5">
            {locale === "vi" ? (
              <>Dịch vụ và hoạt động <span className="text-green-600">Ông Đề</span></>
            ) : locale === "en" ? (
              <>Services and Activities of <span className="text-green-600">Ong De</span></>
            ) : locale === "zh" ? (
              <> <span className="text-green-600">翁德</span>的服务与活动</>
            ) : locale === "ko" ? (
              <> <span className="text-green-600">옹 데</span>의 서비스 및 활동</>
            ) : (
              <>Services and Activities of <span className="text-green-600">Ong De</span></>
            )}
          </Title>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
          {services.map((service) => (
            <div key={service.id} className="flex gap-3">
              <Image
                src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${service.image}`}
                alt={service.name}
                width={150}
                height={150}
                className="!w-30 !rounded-xl !object-cover !flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/150x150";
                }}
              />
              <div>
                <Title className="!text-sm font-medium leading-5">
                  {service.name}
                </Title>
                <Paragraph className="!text-sm mt-1 !leading-5">
                  {service.address}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center z-10 relative">
          <Link href={"/activities"}>
          <Button className="!bg-green-600 !text-white !font-medium !py-5 !px-12 !rounded-full hover:!bg-green-700 hover:!border-green-700">
            {locale === "vi"
              ? "Tất cả hoạt động"
              : locale === "en"
              ? "All Activities"
              : locale === "zh"
              ? "所有活动"
              : locale === "ko"
              ? "모든 활동"
              : "All Activities"}
          </Button>
          </Link>
        </div>
      </div>
    </ConfigProvider>
  );
}