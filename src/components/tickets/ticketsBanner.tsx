"use client";

import React, { useState, useEffect } from 'react';
import { EnvironmentOutlined, CameraOutlined, FlagOutlined } from '@ant-design/icons';
import { ConfigProvider, theme as antdTheme } from 'antd';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useLocale } from 'next-intl';
import { GetTicketBanner } from '@/lib/directus/tickets/banner';
import { TicketBannerTranslation } from '@/types/directus/tickets/banner';
import SkeletonSightseeingBanner from '@/skeleton/tickets/banner';

export default function SightseeingBanner() {
  const locale = useLocale();
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [ticketBanner, setTicketBanner] = useState<TicketBannerTranslation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initialTheme = typeof window !== 'undefined' ? document.documentElement.getAttribute('data-theme') || 'light' : 'light';
  const theme = isClient ? mytheme : initialTheme;

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
    setIsClient(true);
    if (isClient && document.documentElement.getAttribute('data-theme') !== theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, isClient]);

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
    algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
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

            <div className="relative z-10 max-w-7xl px-4 sm:px-6 mx-auto md:mt-0 mt-7">
              <div className="pt-20 sm:pt-40 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 flex items-center gap-2 mb-6 border border-dashed border-orange-400/30 animate-fade-in">
                  <span className="text-orange-400"><EnvironmentOutlined /></span>
                  <span className="text-orange-400 text-sm font-medium">{ticketBanner.location}</span>
                </div>

                <h1 className={`text-4xl sm:text-6xl font-bold mb-4 tracking-tight ${theme === 'light' ? 'text-white' : 'text-gray-100'}`}>
                  {ticketBanner.title}
                  <span className="text-orange-400 block sm:inline sm:ml-2">{ticketBanner.highlight_title}</span>
                </h1>

                <p className={`text-base sm:text-xl max-w-[300px] sm:max-w-[500px] font-medium mb-8 leading-relaxed ${theme === 'light' ? 'text-gray-300' : 'text-gray-200'}`}>
                  {ticketBanner.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] border border-dashed border-orange-400/30 animate-fade-in">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg"><CameraOutlined /></span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium text-base ${theme === 'light' ? 'text-gray-200' : 'text-gray-100'}`}>
                        {ticketBanner.features_1}
                      </h3>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] border border-dashed border-orange-400/30 animate-fade-in">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg"><FlagOutlined /></span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium text-base ${theme === 'light' ? 'text-gray-200' : 'text-gray-100'}`}>
                        {ticketBanner.features_2}
                      </h3>
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