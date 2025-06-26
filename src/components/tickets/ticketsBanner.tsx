"use client";

import React, { useState, useEffect } from 'react';
import { EnvironmentOutlined, CameraOutlined, FlagOutlined } from '@ant-design/icons';
import { ConfigProvider, Typography } from 'antd';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { GetTicketBanner } from '@/lib/directus/tickets/banner';
import { TicketBannerTranslation } from '@/types/directus/tickets/banner';
import SkeletonSightseeingBanner from '@/skeleton/tickets/banner';

const { Title, Paragraph, Text } = Typography

export default function SightseeingBanner() {
  const locale = useLocale();
  const [isMobile, setIsMobile] = useState(false);
  const [ticketBanner, setTicketBanner] = useState<TicketBannerTranslation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTicketBanner() {
      try {
        setIsLoading(true);
        const data = await GetTicketBanner(locale);
        setTicketBanner(data || null);
      } catch (error) {
        console.error("Failed to fetch ticket banner:", error);
        setTicketBanner(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTicketBanner();
  }, [locale]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const themeConfig = {
    token: {
      colorPrimary: '#FFC800',
      borderRadius: 8,
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="relative min-h-[600px] overflow-hidden">
        {isLoading ? (
          <SkeletonSightseeingBanner />
        ) : ticketBanner ? (
          <>
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${ticketBanner.images}`}
              alt={ticketBanner.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1280px"
              onError={(e) => {
                e.currentTarget.src = "/fallback-image.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent"></div>

            <div className="relative z-10 max-w-7xl px-4 sm:px-6 mx-auto md:mt-0 mt-28  ">
              <div className="pt-20 sm:pt-40 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 flex items-center gap-2 mb-6 border border-dashed border-orange-400/30 animate-fade-in">
                  <span className="text-orange-400"><EnvironmentOutlined /></span>
                  <Text className="!text-orange-400 !font-medium">{ticketBanner.location}</Text>
                </div>

                <Title className="!text-4xl sm:!text-6xl !text-white">
                  {ticketBanner.title}
                  <span className="text-orange-400 block sm:inline sm:ml-2">{ticketBanner.highlight_title}</span>
                </Title>

                <Paragraph className="!text-base font-medium sm:!text-xl !max-w-xl sm:!max-w-2xl mb-8 leading-relaxed !text-gray-200">
                  {ticketBanner.description}
                </Paragraph>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-5xl">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] border border-dashed border-orange-400/30 animate-fade-in">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg"><CameraOutlined /></span>
                    </div>
                    <div className="flex-1">
                      <Text className="!text-base !text-gray-200">
                        {ticketBanner.features_1}
                      </Text>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] border border-dashed border-orange-400/30 animate-fade-in">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg"><FlagOutlined /></span>
                    </div>
                    <div className="flex-1">
                      <Text className="!text-base !text-gray-200">
                        {ticketBanner.features_2}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="relative z-10 max-w-7xl px-4 sm:px-6 mx-auto md:mt-0 mt-7 text-center text-red-600">
            Failed to load ticket banner.
          </div>
        )}
      </div>
    </ConfigProvider>
  );
}