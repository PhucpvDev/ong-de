"use client";

import React, { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useLocale } from "next-intl";
import { GetLandingActivities } from "@/lib/directus/activities/landingAcitivies";
import { LandingActivitiesTranslation } from "@/types/directus/activities/landingAcitivies";
import SkeletonLandingSection from '@/skeleton/landingSection/landing';
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const { Title, Paragraph } = Typography;

export default function LandingActivities() {
  const locale = useLocale();
  const [activities, setActivities] = useState<LandingActivitiesTranslation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLandingActivities() {
      try {
        setIsLoading(true);
        const data = await GetLandingActivities(locale);
        setActivities(data || null);
      } catch (error) {
        console.error("Failed to fetch landing activities:", error);
        setActivities(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLandingActivities();
  }, [locale]);

  if (isLoading || !activities) {
     return <SkeletonLandingSection />;
  }
  return (
    <div className="relative max-w-7xl mx-auto md:px-4 px-3 mb-20 md:pt-8 pt-14">
      <div className="grid grid-cols-1 gap-8">
        <div className="grid-item text-center">
          <Title level={2} className="!text-xl md:!text-3xl">
            {locale === "vi" ? (
              <>Hoạt động & Trải nghiệm  của <span className="text-green-700">Ông Đề</span></>
            ) : locale === "en" ? (
              <>Activities & Experiences at <span className="text-green-700">Ong De</span> Tourism Village</>
            ) : locale === "zh" ? (
              <> <span className="text-green-700">翁德</span>旅游村的活动与体验</>
            ) : locale === "ko" ? (
              <> <span className="text-green-700">옹 데</span> 관광 마을의 활동 및 체험</>
            ) : (
              <>Activities & Experiences at <span className="text-green-700">Ong De</span> Tourism Village</>
            )}
          </Title>
        </div>

        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="rounded-2xl p-6"
            style={{ backgroundColor: activity.background_color }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
              {activity.image_position[0] === "left" ? (
                <>
                  <div className="order-2 lg:order-1 lg:col-span-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${activity.images}`}
                      alt={activity.title}
                      width={400}
                      height={200}
                      className="rounded-lg w-full h-auto min-h-60 object-cover"
                      quality={90}
                    />
                  </div>
                  <div className="order-1 lg:order-2 lg:col-span-6">
                    <Title level={4} className="!text-lg md:!text-xl font-bold mb-4 text-blue-600">
                      {activity.title}
                    </Title>
                    <Paragraph className="text-gray-600 !text-sm leading-relaxed mb-4">
                      {parse(DOMPurify.sanitize(activity.content))}
                    </Paragraph>
                  </div>
                </>
              ) : (
                <>
                  <div className="order-1 lg:col-span-6">
                    <Title level={4} className="!text-lg md:!text-xl font-bold mb-4 text-blue-600">
                      {activity.title}
                    </Title>
                    <Paragraph className="text-gray-600 !text-sm leading-relaxed mb-4">
                      {parse(DOMPurify.sanitize(activity.content))}
                    </Paragraph>
                  </div>
                  <div className="order-2 lg:col-span-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${activity.images}`}
                      alt={activity.title}
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