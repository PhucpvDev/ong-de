"use client";

import React from "react";
import { Card, ConfigProvider, Skeleton } from "antd";

const TourCardSkeleton = ({ isMobile = false }: { isMobile?: boolean }) => {
  return (
    <div
      className={`font-roboto overflow-hidden ${
        isMobile
          ? "flex-none w-[150px] bg-white"
          : "transition-all duration-200 bg-white w-[230px] sm:w-[230px]"
      }`}
    >
      <div className="relative aspect-[4/3]">
        <Skeleton.Image active className="!w-full !h-full" />
      </div>
      <div className={isMobile ? "p-3" : "p-[12px]"}>
        <Skeleton
          active
          title={{ width: "80%" }}
          paragraph={{ rows: 2, width: ["100%", "60%"] }}
          className={isMobile ? "text-sm" : "text-base"}
        />
      </div>
    </div>
  );
};

export default function TourListSkeleton() {
  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="font-roboto bg-[#FFF0E5] sm:mx-auto sm:max-w-[1240px] mb-10 md:mt-0 mt-6 rounded-3xl mx-4 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Skeleton
              active
              title={{ width: "200px" }}
              paragraph={{ rows: 0 }}
              className="!text-xl md:!text-2xl"
            />
          </div>
        </div>
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <Card
              key={index}
              className="overflow-hidden"
              cover={<TourCardSkeleton />}
              styles={{ body: { display: "none" } }}
            />
          ))}
        </div>
        <div className="md:hidden flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
          {[...Array(5)].map((_, index) => (
            <TourCardSkeleton key={index} isMobile />
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
}