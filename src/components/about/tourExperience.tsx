"use client";

import { Carousel } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ConfigProvider, Typography, Button } from "antd";
import { useLocale } from "next-intl";
import { GetTourExperiences } from "@/lib/directus/about/tourExperience";
import { TourExperienceTranslation } from "@/types/directus/about/tourExperience";
import SkeletonTourExperience from "@/skeleton/about/tourExperience";

const { Title, Paragraph } = Typography

export default function TourExperience() {
  const locale = useLocale();
  const carouselRef = useRef(null);
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

  const displayedTours = isMobile ? (showMore ? tourTranslations : tourTranslations?.slice(0, 3)) : tourTranslations;

  const TourCard = ({ tour }: { tour: TourExperienceTranslation }) => (
    <div
      className={`rounded-xl overflow-hidden relative ${isMobile ? "h-[200px]" : "h-[280px] md:h-[320px]"} group hover:shadow-xl transition-all duration-200`}
    >
      <Image
        src={tour.images ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${tour.images}` : "/fallback-image.jpg"}
        alt={tour.title}
        fill
        className="w-full h-full object-cover opacity-100 absolute inset-0"
        sizes="(max-width: 768px) 100vw, 25vw"
        priority={tour.id === 1}
        onError={(e) => {
          e.currentTarget.src = "/fallback-image.jpg";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      <div
        className={`absolute inset-0 ${isMobile ? "p-3" : "p-6"} ${isMobile ? "flex flex-col justify-center" : "flex flex-col justify-between"}`}
      >
        <div>
          <Title
            className={`${isMobile ? "!text-lg !text-white -mt-22" : "!text-xl md:!text-2xl !text-white"} font-bold text-white mb-1 drop-shadow-md line-clamp-2`}
          >
            {tour.title}
          </Title>
          {isMobile ? (
            <Paragraph className="text-xs !text-white/90 drop-shadow-md line-clamp-1">{tour.description}</Paragraph>
          ) : (
            <>
              <Paragraph className="text-sm font-medium !text-white/90 drop-shadow-md">{tour.subtitle}</Paragraph>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const SampleNextArrow = ({ className, onClick, currentSlide, slideCount, slidesToShow }: { className?: string; onClick?: () => void; currentSlide?: number; slideCount?: number; slidesToShow?: number }) => {
    const isLastSlide = (currentSlide ?? 0) + (slidesToShow ?? 0) >= (slideCount ?? 0);
    if (isLastSlide) return null;

    return (
      <div
        className={`${className} !hidden md:!flex items-center justify-center w-10 h-10 bg-gray-50/90 hover:bg-gray-100 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg !right-[-23px] cursor-pointer z-10 transition-all duration-200`}
        onClick={onClick}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <span className="text-gray-900 text-base px-3 py-2 rounded-full border border-gray-400"><RightOutlined /></span>
      </div>
    );
  };

  const SamplePrevArrow = ({ className, onClick, currentSlide }: { className?: string; onClick?: () => void; currentSlide?: number }) => {
    if (currentSlide === 0) return null;

    return (
      <div
        className={`${className} !hidden md:!flex items-center justify-center w-10 h-10 bg-gray-50/90 hover:bg-gray-100 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg !left-[-23px] cursor-pointer z-10 transition-all duration-200`}
        onClick={onClick}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <span className="text-gray-900 text-base px-3 py-2 rounded-full border border-gray-400"><LeftOutlined /></span>
      </div>
    );
  };

  if (isLoading || !tourTranslations) {
    return (
      <ConfigProvider theme={themeConfig}>
        <SkeletonTourExperience />
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 bg-white mt-20">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <Title level={2} className="md:!text-3xl !text-xl">
            {locale === "vi"
              ? "Hoạt động và trãi nghiệm"
              : locale === "en"
              ? "Activities and Experiences"
              : locale === "zh"
              ? "活动与体验"
              : locale === "ko"
              ? "활동 및 체험"
              : "Activities and Experiences"}
          </Title>
        </div>

        {isMobile ? (
          <>
            <div className="space-y-3">
              {displayedTours?.map((tour) => (
                <div key={tour.id}>
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
            {!showMore && tourTranslations.length > 3 && (
              <div className="flex justify-center mt-5 pb-6">
                <Button
                  onClick={() => setShowMore(true)}
                  className="w-full !h-12"
                >
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
          </>
        ) : (
          <div className="relative">
            <Carousel
              ref={carouselRef}
              arrows
              nextArrow={<SampleNextArrow />}
              prevArrow={<SamplePrevArrow />}
              slidesToShow={3}
              slidesToScroll={1}
              dots={false}
              infinite={false}
              draggable
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
              className="touch-pan-x -mx-2"
            >
              {tourTranslations.map((tour) => (
                <div key={tour.id} className="px-2">
                  <TourCard tour={tour} />
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </ConfigProvider>
  );
}