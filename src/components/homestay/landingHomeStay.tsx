"use client";

import React, { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { GetLandingHomestay } from '@/lib/directus/homestay/landingHomestay';
import { LandingHomestayTranslation } from '@/types/directus/homestay/landingHomestay';
import SkeletonLandingSection from '@/skeleton/landingSection/landing';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const { Title, Paragraph } = Typography;

export default function LandingHomeStay() {
  const locale = useLocale();
  const [homestays, setHomestays] = useState<LandingHomestayTranslation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLandingHomestay() {
      try {
        setIsLoading(true);
        const data = await GetLandingHomestay(locale);
        setHomestays(data || null);
      } catch (error) {
        console.error("Failed to fetch landing homestay:", error);
        setHomestays(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLandingHomestay();
  }, [locale]);

  if (isLoading || !homestays) {
     return <SkeletonLandingSection />;
  }

  return (
    <div className="relative max-w-7xl mx-auto md:px-6 px-4 mb-10 bg-light-blue-50 md:pt-16 pt-10">
      <div className="grid grid-cols-1 gap-8">
        <div className="grid-item text-center">
          <Title level={2} className="!text-xl md:!text-3xl">
            {locale === "vi" ? (
              <>HomeStay Làng Du Lịch <span className="text-green-700">Ông Đề</span></>
            ) : locale === "en" ? (
              <>HomeStay at <span className="text-green-700">Ong De</span> Tourism Village</>
            ) : locale === "zh" ? (
              <> <span className="text-green-700">翁德</span>旅游村的民宿</>
            ) : locale === "ko" ? (
              <> <span className="text-green-700">옹 데</span> 관광 마을의 홈스테이</>
            ) : (
              <>HomeStay at <span className="text-green-700">Ong De</span> Tourism Village</>
            )}
          </Title>
        </div>

        {homestays.map((homestay) => (
          <div
            key={homestay.id}
            className="rounded-2xl p-6"
            style={{ backgroundColor: homestay.background_color }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
              {homestay.image_position[0] === "left" ? (
                <>
                  <div className="order-2 lg:order-1 lg:col-span-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${homestay.images}`}
                      alt={homestay.title}
                      width={400}
                      height={200}
                      className="rounded-lg w-full h-auto min-h-60 object-cover"
                      quality={90}
                    />
                  </div>
                  <div className="order-1 lg:order-2 lg:col-span-6">
                    <Title level={4} className="!text-lg md:!text-xl font-bold mb-4 text-blue-600">
                      {homestay.title}
                    </Title>
                    <Paragraph className="text-gray-600 !text-sm leading-relaxed mb-4">
                      {parse(DOMPurify.sanitize(homestay.content))}
                    </Paragraph>
                  </div>
                </>
              ) : (
                <>
                  <div className="order-1 lg:col-span-6">
                    <Title level={4} className="!text-lg md:!text-xl font-bold mb-4 text-blue-600">
                      {homestay.title}
                    </Title>
                    <Paragraph className="text-gray-600 !text-sm leading-relaxed mb-4">
                      {parse(DOMPurify.sanitize(homestay.content))}
                    </Paragraph>
                  </div>
                  <div className="order-2 lg:col-span-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${homestay.images}`}
                      alt={homestay.title}
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
    </div>
  );
}