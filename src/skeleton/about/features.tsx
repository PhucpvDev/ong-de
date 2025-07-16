"use client";

import React from "react";
import { ConfigProvider, Skeleton, Typography } from "antd";

const { Title } = Typography;

export default function SkeletonFeatures() {
  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
      borderRadius: 12,
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="max-w-7xl mx-auto md:px-6 px-4 mt-20 bg-white">
        <div className="mb-8 sm:mb-10">
          <Title level={2} className="md:!text-3xl !text-xl font-bold text-gray-900 tracking-tight">
            <Skeleton
              active
              title={{ width: "40%" }}
              paragraph={false}
              className="w-full md:w-1/2"
            />
          </Title>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 flex flex-col items-center text-center"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4">
                <Skeleton.Avatar
                  active
                  size={80}
                  shape="circle"
                  className="border-2 border-orange-400/30 rounded-full object-cover"
                />
              </div>
                <Skeleton
                  active
                  title={{ width: "100%" }}
                  paragraph={{ rows: 1, width: ["100%", "100%"] }}
                  className="w-full"
                />
            </div>
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
}