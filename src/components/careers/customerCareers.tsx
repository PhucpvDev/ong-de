"use client";

import React, { useState, useEffect, useRef } from "react";
import { Carousel, Card, Typography, Avatar, ConfigProvider } from "antd";
import { useLocale } from "next-intl";
import { CustomerCareersTranslation } from "@/types/directus/careers/customerCareers";
import { GetCustomerCareers } from "@/lib/directus/careers/customerCareers";

const { Title, Text, Paragraph } = Typography;

export default function CustomerCareers() {
  const locale = useLocale();
  const [testimonials, setTestimonials] = useState<CustomerCareersTranslation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    async function fetchCustomerCareers() {
      try {
        setLoading(true);
        const data = await GetCustomerCareers(locale);
        if (data) {
          setTestimonials(data);
        } else {
          setError("No careers data available.");
        }
      } catch (err) {
        console.error("Failed to fetch careers data:", err);
        setError("Failed to load careers data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchCustomerCareers();
  }, [locale]);

  const handleDotClick = (index: number) => {
    carouselRef.current?.goTo(index);
  };

  const handleSlideChange = (current: number) => {
    setCurrentSlide(current);
  };

  const themeConfig = {
    token: {
      colorPrimary: "#22C55E",
      borderRadius: 8,
    },
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 px-4 md:px-8 py-8">
              <div className="flex-shrink-0">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1 max-w-2xl">
                <div className="h-6 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-6 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        {error || "No careers data available."}
      </div>
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Title level={2} className="text-gray-800 mb-4">
              {locale === "vi" ? (
                "Gặp gỡ những người dẫn đầu tại Làng Du lịch Ông Đề"
              ) : locale === "en" ? (
                "Meet the Leaders at Ong De Tourism Village"
              ) : locale === "zh" ? (
                "认识翁德旅游村的领导者"
              ) : locale === "ko" ? (
                "옹 데 관광 마을의 리더들을 만나보세요"
              ) : (
                "Meet the Leaders at Ong De Tourism Village"
              )}
            </Title>
          </div>

          <div className="relative">
            <Carousel
              ref={carouselRef}
              autoplay
              autoplaySpeed={5000}
              dots={false}
              draggable
              afterChange={handleSlideChange}
              className="klookers-carousel"
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id}>
                  <div className="bg-transparent shadow-none">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 px-4 md:px-8 py-8">
                      <div className="flex-shrink-0">
                        <Avatar
                          src={
                            testimonial.image
                              ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${testimonial.image}`
                              : "https://placehold.co/150x150"
                          }
                          alt={testimonial.name}
                          className="!w-64 !h-64 md:!w-80 md:!h-80 !shadow-lg"
                        />
                      </div>

                      <div className="flex-1 max-w-2xl text-center md:text-left">
                        <Title level={3} className="text-gray-800 mb-2">
                          {testimonial.name}
                        </Title>
                        <Text className="text-lg text-gray-600 mb-6 font-medium block">
                          {testimonial.position}
                        </Text>
                        <Paragraph className="text-base md:text-lg text-gray-700 leading-relaxed">
                          {testimonial.testimonial}
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 border-0 cursor-pointer hover:scale-105 ${
                    index === currentSlide ? "bg-green-500 scale-110" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}