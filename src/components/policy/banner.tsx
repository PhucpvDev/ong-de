"use client";

import React from 'react';
import { Typography } from 'antd';
import { IMAGES } from '@/constants/theme';
import Image from 'next/image';
import { ConfigProvider } from 'antd';

const { Title, Paragraph } = Typography;

export default function BannerPolicy() {
  const themeConfig = {
    token: {
      colorPrimary: '#FFC800',
      borderRadius: 8,
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="relative w-full h-[80vh] min-h-[500px] max-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            alt="Ảnh nền Làng Du Lịch Sinh Thái Ông Đề"
            src={IMAGES.banner_1}
            fill
            className="object-cover opacity-85"
            priority
            onError={(e) => {
              e.currentTarget.src = '/fallback-image.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 C300,40 600,100 900,40 C1050,20 1150,60 1200,40 L1200,120 L0,120 Z"
              fill="rgba(255, 200, 0, 0.3)"
              className="animate-pulse"
            >
              <animate
                attributeName="d"
                values="M0,80 C300,40 600,100 900,40 C1050,20 1150,60 1200,40 L1200,120 L0,120 Z;
                        M0,60 C300,20 600,80 900,60 C1050,30 1150,80 1200,60 L1200,120 L0,120 Z;
                        M0,80 C300,40 600,100 900,40 C1050,20 1150,60 1200,40 L1200,120 L0,120 Z"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>

        <div className="relative z-10 h-full flex container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="text-center max-w-3xl">
              <Title level={1}>
                <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-2xl">
                  Chính Sách Làng Du Lịch Sinh Thái <span className='text-orange-500'>Ông Đề</span>
                </span>
              </Title>
              <p className="text-lg sm:text-xl text-white/90 mt-10 mx-auto drop-shadow-lg bg-black/20 p-4 rounded-lg border border-white/20 backdrop-blur-sm">
                <span>Tìm hiểu các chính sách và quy định để có trải nghiệm tuyệt vời tại Làng Du Lịch Sinh Thái Ông Đề, Cần Thơ</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}