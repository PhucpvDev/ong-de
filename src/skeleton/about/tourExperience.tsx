"use client";

import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";

export default function SkeletonTourExperience() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 bg-white animate-pulse">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <Skeleton
          active
          title={{ width: "40%", style: { height: "2rem" } }}
          paragraph={false}
        />
      </div>

      {isMobile ? (
        <div className="space-y-3">
          {Array(3).fill(0).map((_, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden relative h-[200px]"
            >
              <Skeleton.Image
                active
                style={{ width: "100%", height: "100%", borderRadius: "12px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
              <div className="absolute inset-0 p-3 flex flex-col justify-center">
                <Skeleton
                  active
                  title={{ width: "60%", style: { height: "1rem" } }}
                  paragraph={{ rows: 1, width: "80%" }}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-4 pb-6">
            <Skeleton.Button
              active
              size="large"
              shape="round"
              style={{ width: "100%", maxWidth: "384px" }}
            />
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Carousel Arrows */}
          <div className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-50/90 rounded-full shadow-md absolute top-1/2 left-[-23px] transform -translate-y-1/2">
            <Skeleton.Avatar active size={24} shape="circle" />
          </div>
          <div className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-50/90 rounded-full shadow-md absolute top-1/2 right-[-23px] transform -translate-y-1/2">
            <Skeleton.Avatar active size={24} shape="circle" />
          </div>
          <div className="grid grid-cols-3 gap-4 -mx-2">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="px-2">
                <div className="rounded-xl overflow-hidden relative h-[320px]">
                  <Skeleton.Image
                    active
                    style={{ width: "100%", height: "100%", borderRadius: "12px" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <Skeleton
                      active
                      title={{ width: "60%", style: { height: "1.5rem" } }}
                      paragraph={{ rows: 2, width: ["80%", "70%"] }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}