"use client";

import React, { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { GetLandingPackages } from '@/lib/directus/packages/landingPackages';
import { LandingPackagesTranslation } from '@/types/directus/packages/landingPackages';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const { Title, Paragraph } = Typography;

export default function LandingHomeStay() {
  const locale = useLocale();
  const [packages, setPackages] = useState<LandingPackagesTranslation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLandingPackages() {
      try {
        setIsLoading(true);
        const data = await GetLandingPackages(locale);
        setPackages(data || null);
      } catch (error) {
        console.error("Failed to fetch landing packages:", error);
        setPackages(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLandingPackages();
  }, [locale]);

  if (isLoading || !packages) {
    return (
      <div className="relative max-w-7xl mx-auto md:px-6 px-4 bg-light-blue-50 md:pt-14 pt-10">
        <div className="grid grid-cols-1 gap-8">
          <div className="grid-item">
            <Title level={2} className="!text-xl md:!text-3xl">
              {locale === "vi" ? (
                <>Giới thiệu Gói tiết kiệm <span className="text-orange-500">Ông Đề</span></>
              ) : locale === "en" ? (
                <>Introduction to the <span className="text-orange-500">Ong De</span> Economy Package</>
              ) : locale === "zh" ? (
                <> <span className="text-orange-500">翁德</span>经济套餐介绍</>
              ) : locale === "ko" ? (
                <> <span className="text-orange-500">옹 데</span> 경제 패키지 소개</>
              ) : (
                <>Introduction to the <span className="text-orange-500">Ong De</span> Economy Package</>
              )}
            </Title>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
              <div className="order-2 lg:order-1 lg:col-span-4">
                <div className="h-60 bg-gray-200 rounded-lg w-full"></div>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 text-sm bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 text-sm bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-2xl p-6 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
              <div className="order-1 lg:col-span-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 text-sm bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 text-sm bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="order-2 lg:col-span-4">
                <div className="h-60 bg-gray-200 rounded-lg w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto md:px-6 px-4 bg-light-blue-50 md:pt-14 pt-10">
      <div className="grid grid-cols-1 gap-8">
        <div className="grid-item">
          <Title level={2} className="!text-xl md:!text-3xl">
            {locale === "vi" ? (
              <>Giới thiệu Gói tiết kiệm <span className="text-orange-500">Ông Đề</span></>
            ) : locale === "en" ? (
              <>Introduction to the <span className="text-orange-500">Ong De</span> Economy Package</>
            ) : locale === "zh" ? (
              <> <span className="text-orange-500">翁德</span>经济套餐介绍</>
            ) : locale === "ko" ? (
              <> <span className="text-orange-500">옹 데</span> 경제 패키지 소개</>
            ) : (
              <>Introduction to the <span className="text-orange-500">Ong De</span> Economy Package</>
            )}
          </Title>
        </div>

        {packages.map((pkg, index) => (
          <div
            key={pkg.id}
            className="rounded-2xl p-6"
            style={{ backgroundColor: pkg.background_color }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
              {pkg.image_position[0] === "left" ? (
                <>
                  <div className="order-2 lg:order-1 lg:col-span-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${pkg.images}`}
                      alt={pkg.title}
                      width={400}
                      height={200}
                      className="rounded-lg w-full h-auto min-h-60 object-cover"
                      quality={90}
                    />
                  </div>
                  <div className="order-1 lg:order-2 lg:col-span-6">
                    <Title level={4} className="!text-lg md:!text-xl font-bold mb-4 text-blue-600">
                      {pkg.title}
                    </Title>
                    <Paragraph className="text-gray-600 !text-sm leading-relaxed mb-4">
                      {parse(DOMPurify.sanitize(pkg.content))}
                    </Paragraph>
                  </div>
                </>
              ) : (
                <>
                  <div className="order-1 lg:col-span-6">
                    <Title level={4} className="!text-lg md:!text-xl font-bold mb-4 text-blue-600">
                      {pkg.title}
                    </Title>
                    <Paragraph className="text-gray-600 !text-sm leading-relaxed mb-4">
                      {parse(DOMPurify.sanitize(pkg.content))}
                    </Paragraph>
                  </div>
                  <div className="order-2 lg:col-span-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${pkg.images}`}
                      alt={pkg.title}
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