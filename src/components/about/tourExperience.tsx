"use client";

import React, { useRef, useState, useEffect } from "react";
import { ConfigProvider, Typography, Button } from "antd";
import Image from "next/image";
import { useLocale } from "next-intl";
import { GetTourExperiences } from "@/lib/directus/about/tourExperience";
import { TourExperienceTranslation } from "@/types/directus/about/tourExperience";
import SkeletonTourExperience from "@/skeleton/about/tourExperience";

const { Title, Paragraph } = Typography;

export default function TourExperience() {
  const locale = useLocale();
  const [isMobile, setIsMobile] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [tourTranslations, setTourTranslations] = useState<TourExperienceTranslation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTourTranslations() {
      try {
        setIsLoading(true);
        const data = await GetTourExperiences(locale);
        setTourTranslations(data || null);
      } catch (error) {
        console.error("Failed to fetch tour translations:", error);
        setTourTranslations(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTourTranslations();
  }, [locale]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
      borderRadius: 8,
    },
  };

  const displayedTours = isMobile
    ? showMore
      ? tourTranslations
      : tourTranslations?.slice(0, 3)
    : tourTranslations;

  const TourCard = ({ tour }: { tour: TourExperienceTranslation }) => (
    <div className="relative rounded-2xl shadow-xl shadow-gray-300 overflow-hidden group shadow-md transition-all duration-300 h-[380px]">
      <Image
        src={tour.images ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${tour.images}` : "/fallback-image.jpg"}
        alt={tour.title}
        fill
        className="object-cover w-full h-full absolute inset-0 z-0"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority={tour.id === 1}
      />
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="absolute bottom-0 p-3 z-20 text-white">
        <Title className="!text-lg !text-white mb-2">{tour.title}</Title>
        <Paragraph className="!text-base !text-white !line-clamp-3">{tour.description}</Paragraph>
      </div>
    </div>
  );

  if (isLoading || !tourTranslations) {
    return (
      <ConfigProvider theme={themeConfig}>
        <SkeletonTourExperience />
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 bg-white mt-10">
        <div className="text-center mb-12">
          <Title level={2} className="md:!text-3xl !text-xl">
            {locale === "vi"
              ? "Hoạt động và trải nghiệm"
              : locale === "en"
              ? "Activities and Experiences"
              : locale === "zh"
              ? "活动与体验"
              : locale === "ko"
              ? "활동 및 체험"
              : "Activities and Experiences"}
          </Title>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {displayedTours?.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {isMobile && !showMore && tourTranslations.length > 3 && (
          <div className="flex justify-center mt-6 pb-6">
            <Button onClick={() => setShowMore(true)} className="w-full !h-12">
              {locale === "vi"
                ? "Xem thêm"
                : locale === "en"
                ? "View More"
                : locale === "zh"
                ? "查看更多"
                : locale === "ko"
                ? "더 보기"
                : "View More"}
            </Button>
          </div>
        )}
      </div>
    </ConfigProvider>
  );
}
