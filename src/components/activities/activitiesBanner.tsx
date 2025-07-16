"use client";

import React, { useState, useEffect } from 'react';
import { EnvironmentOutlined, CameraOutlined, FlagOutlined } from '@ant-design/icons';
import { ConfigProvider, Typography, Space, Card, Tag } from 'antd';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { GetBannerService } from '@/lib/directus/activities/banner';
import { BannerServiceTranslation } from '@/types/directus/activities/banner';
import SkeletonBanner from '@/skeleton/activities/banner';

const { Title } = Typography

export default function BannerActivities() {
  const locale = useLocale();
  const [isMobile, setIsMobile] = useState(false);
  const [bannerService, setBannerService] = useState<BannerServiceTranslation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      colorText: '#000000',
      colorTextSecondary: '#666666',
      colorBgContainer: 'rgba(255, 255, 255, 0.1)',
    },
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

              <div className="relative z-10 max-w-7xl px-6 mx-auto flex items-center justify-center md:justify-start min-h-[650px] md:min-h-[500px]">
                <div className="pt-7 md:pt-24 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <Tag 
                    icon={<EnvironmentOutlined />}
                    color="green"
                    className="!rounded-full !px-4 !py-2 !border !border-dashed !border-green-400/30 !animate-fade-in"
                    style={{ 
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#05DF72',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'rgba(251, 146, 60, 0.3)'
                    }}
                  >
                    {bannerService.location}
                  </Tag>

                  <Space direction="vertical" size="large" className="mt-6">
                    <Title 
                      level={1} 
                      className="!mb-0 !text-4xl md:!text-6xl !font-bold !tracking-tight"
                      style={{ 
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: '1.1'
                      }}
                    >
                      {bannerService.title}
                      <span className="text-green-500 block md:inline md:ml-2">
                        {bannerService.highlight_title}
                      </span>
                    </Title>

                    <Title level={4} className='!max-w-4xl !text-white'>
                      {bannerService.description}
                    </Title>
                  </Space>

                  <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start mt-8 md:mt-10 gap-4 md:gap-6">
                    <Card
                      className="bg-white/10 backdrop-blur-lg md:backdrop-blur-sm !rounded-2xl md:!rounded-full !border-dashed !border-green-400/30 hover:!scale-[1.02] md:hover:!scale-105 !transition-transform"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(251, 146, 60, 0.3)',
                        borderStyle: 'dashed'
                      }}
                      bodyStyle={{ 
                        padding: isMobile ? '16px' : '12px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: isMobile ? '16px' : '12px'
                      }}
                    >
                      <div className="w-12 h-12 bg-green-600 rounded-xl md:rounded-full flex items-center justify-center">
                        <CameraOutlined className="!text-white !text-xl" />
                      </div>
                      <div className="flex-1 md:flex-none">
                        <Title 
                          level={5} 
                          className="!mb-0 !font-medium"
                          style={{ 
                            color: '#e5e7eb',
                            margin: 0
                          }}
                        >
                          {bannerService.features_1}
                        </Title>
                      </div>
                    </Card>

                    <Card
                      className="bg-white/10 backdrop-blur-lg md:backdrop-blur-sm !rounded-2xl md:!rounded-full !border-dashed !border-green-400/30 hover:!scale-[1.02] md:hover:!scale-105 !transition-transform"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(251, 146, 60, 0.3)',
                        borderStyle: 'dashed'
                      }}
                      bodyStyle={{ 
                        padding: isMobile ? '16px' : '12px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: isMobile ? '16px' : '12px'
                      }}
                    >
                      <div className="w-12 h-12 bg-green-600 rounded-xl md:rounded-full flex items-center justify-center">
                        <FlagOutlined className="!text-white !text-xl" />
                      </div>
                      <div className="flex-1 md:flex-none">
                        <Title 
                          level={5} 
                          className="!mb-0 !font-medium"
                          style={{ 
                            color: '#e5e7eb',
                            margin: 0
                          }}
                        >
                          {bannerService.features_2}
                        </Title>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="relative z-10 max-w-7xl px-6 mx-auto flex items-center justify-center min-h-[650px] md:min-h-[500px] text-center">
              <Title 
                level={3} 
                type="danger" 
                className="!mb-0"
              >
                Failed to load banner service.
              </Title>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}