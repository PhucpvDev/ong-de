"use client";
import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { GetBannerAbout } from '@/lib/directus/about/banner_about';
import { BannerAboutTranslation } from '@/types/directus/about/banner_about';
import Image from 'next/image';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { useLocale } from 'next-intl';

const { Title, Paragraph } = Typography;

export default function SapoLandingPage() {
  const locale = useLocale();
  const [banner, setBanner] = useState<BannerAboutTranslation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanner() {
      try {
        const data = await GetBannerAbout(locale);
        if (data) {
          setBanner(data);
        }
      } catch (error) {
        console.error('Failed to fetch banner data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBanner();
  }, [locale]);

  const parseContent = (content: string) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    return parse(sanitizedContent, {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'p') {
          return (
            <Paragraph className="text-gray-700 text-sm sm:text-base mb-4">
              {domNode.children[0]?.data}
            </Paragraph>
          );
        }
        return domNode;
      },
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!banner) {
    return <div className="text-center py-12">No data available.</div>;
  }

  return (
    <>
      <div className="h-[600px] relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            alt="Ảnh nền Làng Du Lịch Ông Đề"
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${banner.images}`}
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
      </div>

      <div className="relative shadow-xl z-20 -mt-16 sm:-mt-20 md:-mt-40 lg:-mt-80 shadow-sm w-6xl mx-auto overflow-hidden rounded-tl-[30px] sm:rounded-tl-[50px] md:rounded-tl-[75px] lg:rounded-tl-[60px] rounded-br-[30px] sm:rounded-br-[50px] md:rounded-br-[75px] lg:rounded-br-[60px] mx-4 sm:mx-auto">
        <div className="bg-white overflow-hidden border-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 order-2 lg:order-1">
              <Title level={2} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {banner.title}
              </Title>
              {parseContent(banner.content)}
            </div>

            <div className="relative flex items-center justify-center order-1 lg:order-2 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-auto">
              <div className="absolute w-full h-full">
                <Image
                  alt="Ảnh giới thiệu Làng Du Lịch Ông Đề"
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${banner.intro_image}`}
                  width={400}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}