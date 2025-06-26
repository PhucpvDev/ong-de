"use client";

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
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
    return (
      <div className="relative mx-auto md:px-6 px-3 md:mt-0 mt-[600px] mb-10">
        <div className="space-y-8 max-w-7xl px-6 mx-auto">
          <Title level={1} className="!text-xl md:!text-3xl py-5">
            <span className="text-gray-800">Giới thiệu đôi nét về</span>{" "}
            <span className="text-orange-500">Ông Đề</span>
          </Title>
          <div className="bg-blue-50 rounded-4xl md:p-8 p-4 animate-pulse">
            <div className="grid md:grid-cols-2 gap-8 items-center md:py-0 py-6">
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="relative h-64 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
          <div className="bg-green-50 rounded-4xl md:p-8 p-4 animate-pulse">
            <div className="grid md:grid-cols-2 gap-8 items-center md:py-0 py-6">
              <div className="relative h-64 bg-gray-200 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto md:px-6 px-4 pt-6 mb-10">
      <div className="absolute inset-0 -z-10 mt-50">
        <Image
          alt="Ảnh nền Làng Du Lịch Ông Đề"
          src="https://res.klook.com/image/upload/v1488362758/aboutus/mission-bg.png"
          className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover"
          width={600}
          height={300}
          quality={90}
        />
      </div>
      <div className="space-y-8 max-w-7xl mx-auto md:px-6">
        <Title level={2} className="!text-xl md:!text-3xl py-5">
          {locale === "vi" ? (
            <>Giới thiệu đôi nét về <span className="text-orange-500">Ông Đề</span></>
          ) : locale === "en" ? (
            <>A Brief Introduction to <span className="text-orange-500">Ong De</span></>
          ) : locale === "zh" ? (
            <>关于<span className="text-orange-500">翁德</span>的简要介绍</>
          ) : locale === "ko" ? (
            <> <span className="text-orange-500">옹 데</span>에 대한 간략한 소개</>
          ) : (
            <>A Brief Introduction to <span className="text-orange-500">Ong De</span></>
          )}
        </Title>
        {sections.map((section) => (
          <div
            key={section.id}
            className={`rounded-4xl md:p-8 p-4`}
            style={{ backgroundColor: section.background_color }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center md:py-0 py-6">
              {section.image_position[0] === "left" ? (
                <>
                  <div className="relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${section.images}`}
                      alt={section.title}
                      className="rounded-2xl w-full min-h-90 max-h-90"
                      width={600}
                      height={300}
                      quality={90}
                      onError={(e) => {
                        e.currentTarget.src = "https://i.pinimg.com/736x/c0/27/e4/c027e4ae29b5c771d46f39ff884815d6.jpg";
                      }}
                    />
                  </div>
                  <div className="space-y-4">
                    <Title
                      level={4}
                      className="!text-lg md:!text-xl font-bold leading-tight mb-6"
                      style={{ color: section.button_color }}
                    >
                      {section.title}
                    </Title>
                    <Paragraph className="text-gray-600 !text-sm mb-4 font-medium">
                      {section.description}
                    </Paragraph>
                    <button
                      className="mt-8 font-medium cursor-pointer rounded-full px-6 py-2 h-auto flex items-center gap-2 text-sm md:text-base"
                      style={{
                        backgroundColor: section.bg_button_color,
                        color: section.button_color,
                        borderColor: section.button_color,
                      }}
                    >
                      {section.button_text}
                      <ArrowRightOutlined style={{ fontSize: '16px' }} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <Title
                      level={4}
                      className="!text-lg md:!text-xl font-bold leading-tight mb-6"
                      style={{ color: section.button_color }}
                    >
                      {section.title}
                    </Title>
                    <Paragraph className="text-gray-600 !text-sm mb-4 font-medium">
                      {section.description}
                    </Paragraph>
                    <button
                      className="mt-8 font-medium cursor-pointer rounded-full px-6 py-2 h-auto flex items-center gap-2 text-sm md:text-base"
                      style={{
                        backgroundColor: section.bg_button_color,
                        color: section.button_color,
                        borderColor: section.button_color,
                      }}
                    >
                      {section.button_text}
                      <ArrowRightOutlined style={{ fontSize: '16px' }} />
                    </button>
                  </div>
                  <div className="relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${section.images}`}
                      alt={section.title}
                      className="rounded-2xl w-full min-h-90 max-h-90"
                      width={600}
                      height={300}
                      quality={90}
                      onError={(e) => {
                        e.currentTarget.src = "https://i.pinimg.com/736x/3b/b1/9f/3bb19ff129376197aafd7dfa331022d1.jpg";
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}