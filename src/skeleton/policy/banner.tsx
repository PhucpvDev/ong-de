"use client";

import React from "react";
import { ConfigProvider, Skeleton, Typography } from "antd";

const { Title } = Typography;

export default function BannerPolicySkeleton() {
  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="relative w-full h-[80vh] min-h-[500px] max-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Skeleton.Image active className="!w-full !h-full" />
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
                <Skeleton
                  active
                  title={{ width: "80%", className: "mx-auto" }}
                  paragraph={{ rows: 0 }}
                  className="!text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl !text-white font-bold leading-tight drop-shadow-2xl"
                />
              </Title>
              <div className="mt-10 mx-auto">
                <Skeleton
                  active
                  paragraph={{ rows: 2, width: ["100%", "80%"] }}
                  title={false}
                  className="!text-lg sm:!text-xl !text-white/90 bg-black/20 !p-4 rounded-lg border border-white/20 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}