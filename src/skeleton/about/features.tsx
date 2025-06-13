"use client";

import React from "react";
import { Skeleton } from "antd";

export default function SkeletonFeatures() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 bg-white animate-pulse">
      <div className="mb-8 sm:mb-10">
        <Skeleton
          active
          title={{ width: "40%", style: { margin: "0 auto", height: "2rem" } }}
          paragraph={false}
          className="text-center sm:text-left"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array(3).fill(0).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 flex flex-col items-center text-center"
          >
            <Skeleton.Avatar
              active
              size={96}
              shape="circle"
              style={{ marginBottom: "1rem" }}
            />
            <Skeleton
              active
              title={{ width: "60%", style: { height: "1.25rem" } }}
              paragraph={{ rows: 2, width: ["80%", "70%"] }}
              className="max-w-xs"
            />
          </div>
        ))}
      </div>
    </div>
  );
}