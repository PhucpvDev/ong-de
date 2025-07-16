"use client";

import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { GetLandingSections } from '@/lib/directus/about/landingSections';
import { LandingSectionTranslation } from '@/types/directus/about/landingSections';
import { useLocale } from 'next-intl';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

export default function LandingPage() {
  const locale = useLocale();
  const [sections, setSections] = useState<LandingSectionTranslation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLandingSections() {
      try {
        setIsLoading(true);
        const data = await GetLandingSections(locale);
        setSections(data || null);
      } catch (error) {
        console.error("Failed to fetch landing sections:", error);
        setSections(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLandingSections();
  }, [locale]);

  if (isLoading || !sections) {
    return <div className="text-center py-20">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="relative max-w-6xl mx-auto md:px-6 px-4 bg-white md:pt-14 pt-10 space-y-10">
      <div className="text-center mb-14">
        <Title level={2} className="!text-xl md:!text-3xl">
          {locale === "vi" ? (
            <>Giới thiệu đôi nét về <span className="text-green-700">Ông Đề</span></>
          ) : locale === "en" ? (
            <>A Brief Introduction to <span className="text-green-700">Ong De</span></>
          ) : locale === "zh" ? (
            <>关于<span className="text-green-700">翁德</span>的简要介绍</>
          ) : locale === "ko" ? (
            <> <span className="text-green-700">옹 데</span>에 대한 간략한 소개</>
          ) : (
            <>A Brief Introduction to <span className="text-green-700">Ong De</span></>
          )}
        </Title>
      </div>

      {sections.map((section) => (
        <div
          key={section.id}
          className="rounded-2xl p-6"
          style={{ backgroundColor: section.background_color }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
            {section.image_position[0] === "left" ? (
              <>
                <div className="order-2 lg:order-1 lg:col-span-4">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${section.images}`}
                    alt={section.title}
                    width={400}
                    height={200}
                    className="rounded-lg w-full h-auto min-h-60 object-cover"
                    quality={90}
                  />
                </div>
                <div className="order-1 lg:order-2 lg:col-span-6">
                  <Title
                    level={4}
                    className="!text-lg md:!text-xl font-bold mb-4"
                    style={{ color: section.button_color }}
                  >
                    {section.title}
                  </Title>
                  <Paragraph className="text-gray-600 !text-sm leading-relaxed mb-4">
                    {section.description}
                  </Paragraph>
                </div>
              </>
            ) : (
              <>
                <div className="order-1 lg:col-span-6">
                  <Title
                    level={4}
                    className="!text-lg md:!text-xl font-bold mb-4"
                    style={{ color: section.button_color }}
                  >
                    {section.title}
                  </Title>
                  <Paragraph className="text-gray-600 !text-sm leading-relaxed mb-4">
                    {section.description}
                  </Paragraph>
                </div>
                <div className="order-2 lg:col-span-4">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${section.images}`}
                    alt={section.title}
                    width={400}
                    height={200}
                    className="rounded-lg w-full h-auto min-h-60 object-cover"
                    quality={90}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
