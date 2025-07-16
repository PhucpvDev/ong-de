"use client";

import React, { useEffect, useState } from "react";
import { Typography, Row, Col, ConfigProvider } from "antd";
import Image from "next/image";
import { useLocale } from "next-intl";
import { PricingContactTranslation } from "@/types/directus/pricing/pricingContact";
import { GetPricingContact } from "@/lib/directus/pricing/pricingContact";
import parse from "html-react-parser";

const { Title, Text } = Typography;

export default function PricingContact() {
  const locale = useLocale();
  const [contactMethods, setContactMethods] = useState<PricingContactTranslation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPricingContact() {
      try {
        setLoading(true);
        const data = await GetPricingContact(locale);
        if (data) {
          setContactMethods(data);
        } else {
          setError("No contact data available.");
        }
      } catch (err) {
        console.error("Failed to fetch contact data:", err);
        setError("Failed to load contact data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchPricingContact();
  }, [locale]);

  const themeConfig = {
    token: {
      colorPrimary: "#22C55E",
      borderRadius: 12,
    },
  };

  if (loading) {
    return (
      <div className="bg-gray-100/80 mt-14 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
          <Row gutter={[24, 24]} className="justify-center">
            {[...Array(4)].map((_, index) => (
              <Col key={index} xs={24} sm={12} md={12} lg={6} className="flex justify-center">
                <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-between min-h-[250px] w-full animate-pulse">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }

  if (error || contactMethods.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        {error || "No contact data available."}
      </div>
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="bg-gray-100/80 mt-14 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-center mb-12">
            <Title level={1} className="!text-3xl !mt-2">
              {locale === "vi"
                ? "Liên hệ để được hỗ trợ về giá vé và khuyến mãi"
                : locale === "en"
                ? "Contact for support on ticket prices and promotions"
                : locale === "zh"
                ? "联系我们以获取票价和促销信息支持"
                : locale === "ko"
                ? "티켓 가격 및 프로모션 지원을 위해 연락하세요"
                : "Contact for support on ticket prices and promotions"}
            </Title>
          </div>

          <Row gutter={[24, 24]} className="justify-center">
            {contactMethods.map((method) => (
              <Col
                key={method.id}
                xs={24}
                sm={12}
                md={12}
                lg={6}
                className="flex justify-center"
              >
                <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-between min-h-[250px] w-full">
                  <div className="text-center mb-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${method.image_icon}`}
                      width={50}
                      height={50}
                      alt={`${method.title} Icon`}
                      className="rounded-full w-12 h-12 object-cover mx-auto"
                      quality={90}
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/50x50";
                      }}
                    />
                  </div>

                  <Title level={4} className="!text-green-800 !text-center !mb-1 !text-lg">
                    {method.title}
                  </Title>

                  <Text className="!text-gray-700 !text-sm !leading-relaxed text-center flex-grow">
                    {parse(method.description)}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </ConfigProvider>
  );
}