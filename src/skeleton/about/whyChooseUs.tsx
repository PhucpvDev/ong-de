"use client";

import React from "react";
import { Skeleton } from "antd";

export default function SkeletonWhyChooseUsWithTabs() {
  return (
    <section className="py-16 bg-white animate-pulse">
      <div className="container mx-auto px-4 lg:px-12 xl:px-20 2xl:px-36">
        <div className="text-center mb-12">
          <Skeleton
            active
            title={{ width: "40%", style: { margin: "0 auto", height: "2.5rem" } }}
            paragraph={false}
            className="mb-4"
          />
          <Skeleton
            active
            title={false}
            paragraph={{ rows: 2, width: ["60%", "50%"], style: { margin: "0 auto" } }}
            className="max-w-2xl"
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-2 space-y-3">
            {Array(3).fill(0).map((_, index) => (
              <div
                key={index}
                className={`group relative rounded-xl border bg-white border-gray-200 p-4 transition-all duration-200 ${
                  index === 0 ? "shadow-lg" : "hover:shadow-md"
                }`}
              >
                {index === 0 && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-green-600"></div>
                )}
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-lg ${index === 0 ? "bg-green-500" : "bg-gray-100"}`}>
                    <Skeleton.Avatar
                      active
                      size={24}
                      shape="square"
                      style={{ backgroundColor: index === 0 ? "#fff" : "#d1d5db" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Skeleton
                      active
                      title={{ width: "60%", style: { height: "1.25rem" } }}
                      paragraph={{ rows: 1, width: "80%" }}
                      className="mb-3"
                    />
                    {index === 0 && (
                      <div className="space-y-1">
                        {Array(3).fill(0).map((_, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-green-600"></div>
                            <Skeleton
                              active
                              title={{ width: "70%" }}
                              paragraph={false}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl p-4 border bg-white border-gray-200 shadow-xs">
              <div className="text-center mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg mb-3 shadow-md bg-green-50">
                  <Skeleton.Avatar active size={16} shape="square" />
                  <Skeleton
                    active
                    title={{ width: "80px" }}
                    paragraph={false}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl p-4 bg-gray-50">
                  <Skeleton
                    active
                    title={{ width: "50%", style: { height: "1rem" } }}
                    paragraph={false}
                    className="mb-3"
                  />
                  <div className="space-y-2">
                    {Array(3).fill(0).map((_, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <Skeleton
                            active
                            title={{ width: "40%" }}
                            paragraph={false}
                          />
                          <Skeleton
                            active
                            title={{ width: "20%" }}
                            paragraph={false}
                          />
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden bg-gray-200">
                          <div
                            className="h-full rounded-full bg-gray-300"
                            style={{ width: `${Math.random() * 50 + 30}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl p-4 bg-gray-50 text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                    <Skeleton
                      active
                      title={{ width: "40%" }}
                      paragraph={false}
                    />
                  </div>
                  <Skeleton
                    active
                    title={{ width: "60%", style: { margin: "16px auto 0" } }}
                    paragraph={false}
                  />
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg mt-3 shadow-md bg-green-50">
                    <Skeleton
                      active
                      title={{ width: "80px" }}
                      paragraph={false}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center p-4 rounded-xl border bg-gray-50 border-gray-200">
                <Skeleton
                  active
                  title={{ width: "50%", style: { margin: "0 auto", height: "1.25rem" } }}
                  paragraph={{ rows: 1, width: "80%", style: { margin: "8px auto 0" } }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}