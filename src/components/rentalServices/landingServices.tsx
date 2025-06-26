"use client";

import React, { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { GetLandingRentalServices } from '@/lib/directus/rentalServices/landingServices';
import { LandingRentalServicesTranslation } from '@/types/directus/rentalServices/landingServices';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const { Title, Paragraph } = Typography;

export default function LandingServices() {
  const locale = useLocale();
  const [services, setServices] = useState<LandingRentalServicesTranslation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLandingRentalServices() {
      try {
        setIsLoading(true);
        const data = await GetLandingRentalServices(locale);
        setServices(data || null);
      } catch (error) {
        console.error("Failed to fetch landing rental services:", error);
        setServices(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLandingRentalServices();
  }, [locale]);

  if (isLoading || !services) {
    return (
      <div className="relative max-w-7xl mx-auto md:px-6 px-4 mb-10 bg-light-blue-50 md:pt-16 pt-10">
        <div className="grid grid-cols-1 gap-8">
          <div className="grid-item">
            <Title level={2} className="!text-xl md:!text-3xl">
              {locale === "vi" ? (
                <>Dịch Vụ Cho Thuê Làng Du Lịch <span className="text-orange-500">Ông Đề</span></>
              ) : locale === "en" ? (
                <>Rental Services at <span className="text-orange-500">Ong De</span> Tourism Village</>
              ) : locale === "zh" ? (
                <> <span className="text-orange-500">翁德</span>旅游村的租赁服务</>
              ) : locale === "ko" ? (
                <> <span className="text-orange-500">옹 데</span> 관광 마을의 임대 서비스</>
              ) : (
                <>Rental Services at <span className="text-orange-500">Ong De</span> Tourism Village</>
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
          <div className="bg-blue-50 rounded-2xl p-6 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
              <div className="order-1 lg:col-span-4">
                <div className="h-60 bg-gray-200 rounded-lg w-full"></div>
              </div>
              <div className="order-2 lg:col-span-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 text-sm bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 text-sm bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto md:px-6 px-4 mb-10 bg-light-blue-50 md:pt-16 pt-10">
      <div className="grid grid-cols-1 gap-8">
        <div className="grid-item">
          <Title level={2} className="!text-xl md:!text-3xl">
            {locale === "vi" ? (
              <>Dịch Vụ Cho Thuê Làng Du Lịch <span className="text-orange-500">Ông Đề</span></>
            ) : locale === "en" ? (
              <>Rental Services at <span className="text-orange-500">Ong De</span> Tourism Village</>
            ) : locale === "zh" ? (
              <> <span className="text-orange-500">翁德</span>旅游村的租赁服务</>
            ) : locale === "ko" ? (
              <> <span className="text-orange-500">옹 데</span> 관광 마을의 임대 서비스</>
            ) : (
              <>Rental Services at <span className="text-orange-500">Ong De</span> Tourism Village</>
            )}
          </Title>
        </div>

        {services.map((service, index) => (
          <div
            key={service.id}
            className="rounded-2xl p-6"
            style={{ backgroundColor: service.background_color }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
              {service.image_position[0] === "left" ? (
                <>
                  <div className="order-2 lg:order-1 lg:col-span-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${service.images}`}
                      alt={service.title}
                      width={400}
                      height={200}
                      className="rounded-lg w-full h-auto min-h-60 object-cover"
                      quality={90}
                    />
                  </div>
                  <div className="order-1 lg:order-2 lg:col-span-6">
                    <Title level={4} className="!text-lg md:!text-xl font-bold mb-4 text-blue-600">
                      {service.title}
                    </Title>
                    <Paragraph className="text-gray-600 !text-sm leading-relaxed mb-4">
                      {parse(DOMPurify.sanitize(service.content))}
                    </Paragraph>
                  </div>
                </>
              ) : (
                <>
                  <div className="order-1 lg:col-span-6">
                    <Title level={4} className="!text-lg md:!text-xl font-bold mb-4 text-blue-600">
                      {service.title}
                    </Title>
                    <Paragraph className="text-gray-600 !text-sm leading-relaxed mb-4">
                      {parse(DOMPurify.sanitize(service.content))}
                    </Paragraph>
                  </div>
                  <div className="order-2 lg:col-span-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${service.images}`}
                      alt={service.title}
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