"use client";
import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { GetBannerPolicy } from '@/lib/directus/policy/banner_policy';
import { BannerPolicyTranslation } from '@/types/directus/policy/banner_policy';
import { ConfigProvider } from 'antd';
import { useLocale } from 'next-intl';
import BannerPolicySkeleton from '@/skeleton/policy/banner';
import Image from 'next/image';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const { Title } = Typography;

export default function BannerPolicy() {
  const locale = useLocale();
  const [banner, setBanner] = useState<BannerPolicyTranslation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanner() {
      try {
                                await new Promise((resolve) => setTimeout(resolve, 3000));

        const data = await GetBannerPolicy(locale);
        if (data) {
          setBanner(data);
        }
      } catch (error) {
        console.error('Failed to fetch banner policy data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBanner();
  }, [locale]);

  const parseSubtitle = (subtitle: string) => {
    const sanitizedSubtitle = DOMPurify.sanitize(subtitle);
    return parse(sanitizedSubtitle);
  };

  if (loading) {
    return <BannerPolicySkeleton />;
  }

  if (!banner) {
    return <div className="text-center py-12 text-white">No data available.</div>;
  }

  return (
    <ConfigProvider>
      <div className="relative w-full h-[80vh] min-h-[500px] max-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            alt="Ảnh nền Làng Du Lịch Sinh Thái Ông Đề"
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${banner.images}`}
            fill
            className="object-cover opacity-85"
            priority
            onError={(e) => {
              e.currentTarget.src = '/fallback-image.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 C300,40 600,100 900,40 C1050,20 1150,60 1200,40 L1200,120 L0,120 Z"
              fill="rgba(255, 200, 0, 0.3)"
              className="animate-pulse"
            >
              <animate
                attributeName="d"
                values="M0,80 C300,40 600,100 900,40 C1050,20 1150,60 1200,40 L1200,120 L0,120 Z;
                        M0,60 C300,20 600,80 900,60 C1050,30 1150,80 1200,60 L1200,120 L0,120 Z;
                        M0,80 C300,40 600,100 900,40 C1050,20 1150,60 1200,40 L1200,120 L0,120 Z"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>

        <div className="relative z-10 h-full flex container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="text-center max-w-3xl">
              <Title level={1}>
                <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-2xl">
                  {banner.title.replace(banner.highlighted_title, '')}
                  <span className="text-green-500">{banner.highlighted_title}</span>
                </span>
              </Title>
              <p className="text-lg sm:text-xl text-white/90 mt-10 mx-auto drop-shadow-lg bg-black/20 p-4 rounded-lg border border-white/20 backdrop-blur-sm">
                {parseSubtitle(banner.subtitle)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}