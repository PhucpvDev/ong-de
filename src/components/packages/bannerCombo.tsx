"use client";

import React, { useState, useEffect } from 'react';
import { HomeOutlined, AppstoreOutlined, CalendarOutlined, CarOutlined, WifiOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { GetPackageBanner } from '@/lib/directus/packages/banner';
import { PackageBannerTranslation } from '@/types/directus/packages/banner';
import SkeletonBannerCombo from '@/skeleton/packages/banner';
import { Typography } from 'antd';

const { Title, Text } = Typography

interface Feature {
  icon: string;
  label: string;
}

export default function BannerCombo() {
  const locale = useLocale();
  const [packageBanner, setPackageBanner] = useState<PackageBannerTranslation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    async function fetchPackageBanner() {
      try {
        setIsLoading(true);
        const data = await GetPackageBanner(locale);
        if (data) {
          setPackageBanner(data);
          const parsedFeatures = JSON.parse(data.features || '[]');
          setFeatures(parsedFeatures);
        } else {
          setPackageBanner(null);
        }
      } catch (error) {
        console.error("Failed to fetch package banner:", error);
        setPackageBanner(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPackageBanner();
  }, [locale]);

  const iconMap: { [key: string]: React.ReactNode } = {
    HomeOutlined: <HomeOutlined className="text-xl" />,
    AppstoreOutlined: <AppstoreOutlined className="text-xl" />,
    CalendarOutlined: <CalendarOutlined className="text-xl" />,
    CarOutlined: <CarOutlined className="text-xl" />,
    WifiOutlined: <WifiOutlined className="text-xl" />,
  };

  return (
    <div className="relative font-roboto">
      <div className="relative h-[550px] md:h-[600px] overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${packageBanner?.images ?? ''}`}
          alt={packageBanner?.title || "Gói tiết kiệm Banner"}
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
          onError={(e) => {
            e.currentTarget.src = "https://r2.nucuoimekong.com/wp-content/uploads/khu-du-lich-ong-de.png";
          }}
        />
        <div className="absolute inset-0 md:bg-black/10 bg-black/50 md:bg-gradient-to-r md:from-black/60 md:to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full border-4 transform -translate-x-1/2 translate-y-1/2 border-yellow-400/50 md:block hidden"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 mt-10 h-full flex items-center justify-center md:justify-start">
          <div className="max-w-xl text-center md:text-left md:mt-0 mt-10">
            {isLoading ? (
              <SkeletonBannerCombo />
            ) : packageBanner ? (
              <>
                <Title className="!text-3xl md:!text-5xl mb-4 !text-white">
                  {packageBanner.title}
                </Title>
                <Text className="!text-lg md:!text-xl !text-gray-100 !font-medium !mx-auto md:!mx-0">
                  {packageBanner.description}
                </Text>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8 mt-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-10 py-2.5 rounded-full bg-white/20"
                    >
                      {iconMap[feature.icon] ? (
                        React.cloneElement(iconMap[feature.icon] as React.ReactElement<any, any>, {
                          style: { color: '#ffffff' },
                        })
                      ) : (
                        <span className="text-xl text-white">?</span>
                      )}
                      <Text className="!text-sm !font-medium !text-white">
                        {feature.label}
                      </Text>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-red-600">
                Failed to load package banner.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}