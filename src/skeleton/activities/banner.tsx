import { Skeleton } from "antd";
import React from "react";

export default function SkeletonBanner() {
  return (
    <div className="relative font-roboto">
      <div className="relative min-h-[600px] md:min-h-[550px] overflow-hidden">
        <div className="absolute inset-0 bg-gray-200/20 animate-pulse" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl px-6 mx-auto flex items-center justify-center md:justify-start min-h-[650px] md:min-h-[500px]">
          <div className="pt-7 md:pt-24 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
            <div className="mb-6 bg-white/10 backdrop-blur-lg md:backdrop-blur-sm rounded-2xl md:rounded-full p-1 md:px-5 flex items-center gap-4 md:gap-3 border border-dashed border-green-400/30">
              <Skeleton.Avatar active size={28} shape="circle" />
              <Skeleton active title={{ width: 150 }} paragraph={false} />
            </div>
            <Skeleton
              active
              title={{ width: "80%", className: "mb-0 !h-16" }}
              paragraph={false}
              className="mb-4"
            />
            <Skeleton
              active
              title={{ width: "60%", className: "mb-0 !h-6" }}
              paragraph={false}
              className="mb-1"
            />
             <Skeleton
              active
              title={{ width: "20%", className: "mb-0 !h-6" }}
              paragraph={false}
              className="mb-8"
            />

            <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start gap-4 md:gap-6">
              <div className="bg-white/10 backdrop-blur-lg md:backdrop-blur-sm rounded-2xl md:rounded-full p-4 md:px-5 md:py-3 flex items-center gap-4 md:gap-3 border border-dashed border-green-400/30">
                <Skeleton.Avatar active size={48} shape="circle" />
                <Skeleton active title={{ width: 150, className: "h-6" }} paragraph={false} />
              </div>
              <div className="bg-white/10 backdrop-blur-lg md:backdrop-blur-sm rounded-2xl md:rounded-full p-4 md:px-5 md:py-3 flex items-center gap-4 md:gap-3 border border-dashed border-green-400/30">
                <Skeleton.Avatar active size={48} shape="circle" />
                <Skeleton active title={{ width: 150, className: "h-6" }} paragraph={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}