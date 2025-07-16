"use client";

import React from "react";
import { Skeleton, Typography, Card } from "antd";

const { Title, Text } = Typography;

const PackageTourItemSkeleton: React.FC = () => (
  <Card className="rounded-lg shadow-sm mb-1 h-[320px] sm:h-auto flex flex-col bg-white">
    <div className="flex h-[90px] sm:h-[100px] md:h-[90px]">
      <div className="w-2/3 pt-2 pr-1 pl-2">
        <Skeleton.Image active className="!w-full !h-full !rounded-xl" />
      </div>
      <div className="w-1/2 pt-2 pr-2">
        <Skeleton.Image active className="!w-full !h-full !rounded-xl" />
      </div>
    </div>
    <div className="p-2 sm:p-3 flex-1 flex flex-col">
      <Skeleton active paragraph={{ rows: 4 }} className="mt-1" />
      <div className="border-t pt-3 border-gray-100 flex justify-between items-end">
        <div className="flex-1">
          <Skeleton active paragraph={{ rows: 1 }} />
        </div>
        <Skeleton.Button active size="small" className="!rounded-lg" />
      </div>
    </div>
  </Card>
);

export default function HomestayTourListSkeleton () {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 mt-12">
        <div className="mb-6">
          <Title level={2} className="!text-3xl !mb-2">
            <Skeleton active title={{ width: "50%" }} paragraph={false} />
          </Title>
        </div>

        <div className="py-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Text strong className="!text-lg !text-gray-800 mr-10">
                <Skeleton active title={{ width: "100px" }} paragraph={false} />
              </Text>
              <Skeleton.Button active size="default" />
              <Text className="!text-sm font-medium !text-gray-800">
                <Skeleton active title={{ width: "100px" }} paragraph={false} />
              </Text>
              <Skeleton.Button active size="default" className="!rounded-lg" />
              <Skeleton.Button active size="default" className="!rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton.Input active size="default" className="!w-[400px]" />
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-50 flex-shrink-0 -mt-2">
            <div className="sticky top-4">
              <div className="mb-6">
                <Title level={5} className="!mb-4 !text-gray-800">
                  <Skeleton active title={{ width: "150px" }} paragraph={false} />
                </Title>
                <div className="mb-4">
                  <Skeleton.Input active size="default" className="!w-full" />
                  <Skeleton.Input active size="default" className="!w-full mt-2" />
                </div>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton active key={index} title={{ width: "100px" }} paragraph={false} />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <Title level={5} className="!mb-4 !text-gray-800">
                  <Skeleton active title={{ width: "150px" }} paragraph={false} />
                </Title>
                <Skeleton.Input active size="default" className="!w-full mb-3" />
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton active key={index} title={{ width: "100px" }} paragraph={false} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 -mt-16">
            <div className="py-6 sm:py-8 mt-2 sm:mt-5">
              <div className="font-roboto max-w-7xl px-4 sm:px-4 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="px-2 sm:px-3">
                      <PackageTourItemSkeleton />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
