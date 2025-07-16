"use client";

import React, { useEffect, useState } from "react";
import { Card, Rate, Avatar, Typography, ConfigProvider } from "antd";
import Image from "next/image";
import { useLocale } from "next-intl";
import { GetEcoTravelExperience } from "@/lib/directus/about/ecoTravelExperience";
import { EcoTravelExperienceTranslation } from "@/types/directus/about/ecoTravelExperience";

const { Title, Paragraph } = Typography;

export default function EcoTravelExperience() {
  const locale = useLocale();
  const [experiences, setExperiences] = useState<EcoTravelExperienceTranslation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEcoTravelExperience() {
      try {
        setLoading(true);
        const data = await GetEcoTravelExperience(locale);
        if (data) {
          setExperiences(data);
        } else {
          setError("No experience data available.");
        }
      } catch (err) {
        console.error("Failed to fetch experience data:", err);
        setError("Failed to load experience data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchEcoTravelExperience();
  }, [locale]);

  const themeConfig = {
    token: {
      colorPrimary: "#22C55E",
      borderRadius: 12,
    },
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto md:px-6 px-4 py-16 relative">
        <div className="absolute inset-0 -z-10 mt-20 mr-20">
          <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-gray-300 animate-pulse"></div>
        </div>
        <div className="text-center mb-6">
          <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>
        <div className="grid max-w-5xl mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-300 mb-2 rounded-xl animate-pulse"></div>
              <div className="h-5 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-4 animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || experiences.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        {error || "No experience data available."}
      </div>
    );
  }

  const reviews = experiences.filter((exp) => exp.review && exp.name_review && exp.rating && exp.avatar);

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="max-w-7xl mx-auto md:px-6 px-4 py-16 relative">
        <div className="absolute inset-0 -z-10 mt-20 mr-20">
          <Image
            alt="Background Image for Ong De Eco-Tourism Village"
            src="https://res.klook.com/image/upload/v1488362758/aboutus/mission-bg.png"
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            width={1200}
            height={500}
            priority
          />
        </div>
        <div className="text-center mb-6">
          <Title level={2} className="!text-xl md:!text-3xl py-5">
            {locale === "vi" ? (
              <>Dịch vụ và hoạt động <span className="text-green-700">Ông Đề</span></>
            ) : locale === "en" ? (
              <>Services and Activities of <span className="text-green-700">Ong De</span></>
            ) : locale === "zh" ? (
              <> <span className="text-green-700">翁德</span>的服务与活动</>
            ) : locale === "ko" ? (
              <> <span className="text-green-700">옹 데</span>의 서비스 및 활동</>
            ) : (
              <>Services and Activities of <span className="text-green-700">Ong De</span></>
            )}
          </Title>
        </div>

        <div className="grid max-w-5xl mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          {experiences.map((activity) => (
            <div key={activity.id} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white mb-2 rounded-xl flex items-center justify-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${activity.image_category}`}
                  alt={activity.name_category}
                  width={70}
                  height={70}
                  className="rounded-xl"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/70x70";
                  }}
                />
              </div>
              <Title level={4} className="!text-sm !font-medium text-gray-800 text-center mb-2">
                {activity.name_category}
              </Title>
              <Paragraph className="text-center !text-[13px] !text-gray-800">
                {activity.description}
              </Paragraph>
            </div>
          ))}
        </div>

        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="!bg-gray-100/70 !border-none !rounded-xl">
                <div className="!flex !items-start !space-x-4">
                  <Avatar
                    src={
                      <Image
                        src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${review.avatar}`}
                        alt={review.name_review!}
                        width={50}
                        height={50}
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/50x50";
                        }}
                      />
                    }
                    size={50}
                    className="flex-shrink-0"
                  />
                  <div className="flex-1">
                    <Title level={5} className="!text-sm !font-semibold !text-gray-800">
                      {review.name_review}
                    </Title>
                    <Paragraph className="!text-xs !mb-0.5 !text-gray-700 font-medium !leading-relaxed">
                      {review.review}
                    </Paragraph>
                    <Rate
                      disabled
                      defaultValue={parseFloat(review.rating!)}
                      allowHalf
                      className="!text-xs !text-yellow-500"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ConfigProvider>
  );
}