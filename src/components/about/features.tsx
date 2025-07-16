"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ConfigProvider, Typography } from "antd";
import { useLocale } from "next-intl";
import { GetFeatures } from "@/lib/directus/about/features";
import { FeatureTranslation } from "@/types/directus/about/features";
import SkeletonFeatures from "@/skeleton/about/features";

const { Title, Paragraph } = Typography

export default function Features() {
  const locale = useLocale();
  const [featureTranslations, setFeatureTranslations] = useState<FeatureTranslation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatureTranslations() {
      try {
        setIsLoading(true);
        const data = await GetFeatures(locale);
        setFeatureTranslations(data || null);
      } catch (error) {
        console.error("Failed to fetch feature translations:", error);
        setFeatureTranslations(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeatureTranslations();
  }, [locale]);

  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
      borderRadius: 12,
    },
  };

  if (isLoading || !featureTranslations) {
    return <SkeletonFeatures />;
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="max-w-7xl mx-auto md:px-6 px-4 mt-20 bg-white">
        <div className="mb-8 sm:mb-10">
          <Title level={2} className="md:!text-3xl !text-xl font-bold text-gray-900 tracking-tight">
            {locale === "vi" ? (
              <>Trãi nghiệm độc đáo tại <span className='text-green-600'>Ông Đề</span></>
            ) : locale === "en" ? (
              <>Discover Unique Experiences at <span className='text-green-600'>Ong De</span></>
            ) : locale === "zh" ? (
              <>探索<span className='text-green-600'>翁德</span>独特体验</>
            ) : locale === "ko" ? (
              <>옹 데에서 독특한 체험을 <span className='text-green-600'>옹 데</span> 발견하세요</>
            ) : (
              <>Discover Unique Experiences at <span className='text-green-600'>Ong De</span></>
            )}
          </Title>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featureTranslations.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-sm"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4">
                <Image
                  src={feature.images ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${feature.images}` : "/fallback-image.jpg"}
                  alt={feature.title}
                  fill
                  className="object-cover rounded-full border-2 border-orange-400/30"
                  quality={90}
                  priority={feature.id === 1}
                  onError={(e) => {
                    e.currentTarget.src = "/fallback-image.jpg";
                  }}
                />
              </div>
              <Title className="md:!text-xl !text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </Title>
              <Paragraph className="md:!text-sm text-sm">
                {feature.description}
              </Paragraph>
            </div>
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
}