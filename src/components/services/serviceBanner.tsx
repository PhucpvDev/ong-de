"use client";

import React, { useState, useEffect } from 'react';
import { EnvironmentOutlined, CameraOutlined, FlagOutlined } from '@ant-design/icons';
import { ConfigProvider, theme as antdTheme } from 'antd';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useLocale } from 'next-intl';
import { GetBannerService } from '@/lib/directus/services/banner';
import { BannerServiceTranslation } from '@/types/directus/services/banner';
import SkeletonBanner from '@/skeleton/services/banner';

export default function BannerService() {
  const locale = useLocale();
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [bannerService, setBannerService] = useState<BannerServiceTranslation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initialTheme = typeof window !== 'undefined' ? document.documentElement.getAttribute('data-theme') || 'light' : 'light';
  const theme = isClient ? mytheme : initialTheme;

  useEffect(() => {
    async function fetchBannerService() {
      try {
        setIsLoading(true);
        const data = await GetBannerService(locale);
        setBannerService(data || null);
      } catch (error) {
        console.error("Failed to fetch banner service:", error);
        setBannerService(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBannerService();
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
      <div className="relative font-roboto">
        <div className="relative min-h-[600px] md:min-h-[550px] overflow-hidden mb-0 md:mb-10">
          {isLoading ? (
            <SkeletonBanner />
          ) : bannerService ? (
            <>
              <Image
                src={bannerService.images ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${bannerService.images}` : "/fallback-image.jpg"}
                alt={bannerService.title}
                fill
                className="object-cover object-center"
                quality={100}
                priority
                sizes="(max-width: 768px) 100vw, 1280px"
                onError={(e) => {
                  e.currentTarget.src = "/fallback-image.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

              <div className="absolute left-[-10%] top-[-10%] w-48 h-48 bg-orange-500/20 rounded-full blur-3xl md:hidden"></div>
              <div className="absolute right-[-20%] top-[20%] w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl md:hidden"></div>
              <div className="absolute left-[-20%] bottom-[10%] w-64 h-64 bg-teal-500/20 rounded-full blur-3xl md:hidden"></div>
              <div className="absolute right-[-10%] bottom-[-10%] w-48 h-48 bg-purple-500/20 rounded-full blur-3xl md:hidden"></div>
              <div className="absolute left-0 bottom-0 w-40 h-40 rounded-full border-4 border-yellow-400/30 transform -translate-x-1/2 translate-y-1/2 z-[1] blur-sm hidden md:block"></div>
              <div className="absolute right-20 top-20 w-32 h-32 rounded-full border-4 border-orange-400/20 blur-sm hidden md:block"></div>

              <div className="relative z-10 max-w-7xl px-6 mx-auto flex items-center justify-center md:justify-start min-h-[650px] md:min-h-[500px]">
                <div className="pt-7 md:pt-24 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="bg-white/10 backdrop-blur-lg md:mt-0 mt-10 rounded-full px-4 py-2 flex items-center gap-2 mb-6 border border-dashed border-orange-400/30 animate-fade-in">
                    <span className="text-orange-400"><EnvironmentOutlined /></span>
                    <span className="text-orange-400 text-sm font-medium">{bannerService.location}</span>
                  </div>

                  <h1 className={`text-4xl md:text-6xl font-bold mb-4 tracking-tight ${theme === 'light' ? 'text-white' : 'text-gray-100'}`}>
                    {bannerService.title}
                    <span className="text-orange-400 block md:inline md:ml-2">{bannerService.highlight_title}</span>
                  </h1>

                  <p className={`text-lg md:text-xl max-w-[300px] md:max-w-[600px] mx-auto md:mx-0 mt-4 leading-relaxed ${theme === 'light' ? 'text-gray-300' : 'text-gray-200'}`}>
                    {bannerService.description}
                  </p>

                  <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start mt-8 md:mt-10 gap-4 md:gap-6">
                    <div className="bg-white/10 backdrop-blur-lg md:backdrop-blur-sm rounded-2xl md:rounded-full p-4 md:px-5 md:py-3 flex items-center gap-4 md:gap-3 transition-transform hover:scale-[1.02] md:hover:scale-105 border border-dashed border-orange-400/30">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-xl md:rounded-full flex items-center justify-center">
                        <span className="text-orange-400 text-xl md:text-2xl"><CameraOutlined /></span>
                      </div>
                      <div className="flex-1 md:flex-none">
                        <h3 className={`font-medium ${theme === 'light' ? 'text-gray-200' : 'text-gray-100'}`}>
                          {bannerService.features_1}
                        </h3>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg md:backdrop-blur-sm rounded-2xl md:rounded-full p-4 md:px-5 md:py-3 flex items-center gap-4 md:gap-3 transition-transform hover:scale-[1.02] md:hover:scale-105 border border-dashed border-orange-400/30">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-xl md:rounded-full flex items-center justify-center">
                        <span className="text-orange-400 text-xl md:text-2xl"><FlagOutlined /></span>
                      </div>
                      <div className="flex-1 md:flex-none">
                        <h3 className={`font-medium ${theme === 'light' ? 'text-gray-200' : 'text-gray-100'}`}>
                          {bannerService.features_2}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="relative z-10 max-w-7xl px-6 mx-auto flex items-center justify-center min-h-[650px] md:min-h-[500px] text-center text-red-600">
              Failed to load banner service.
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}