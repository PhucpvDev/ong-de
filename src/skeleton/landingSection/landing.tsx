import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function SkeletonLandingSection() {
  return (
    <div className="relative max-w-7xl mx-auto md:px-6 px-4 bg-light-blue-50 md:pt-14 pt-10 animate-pulse">
      <div className="grid grid-cols-1 gap-8">
        <div className="grid-item text-center md:text-left">
          <Title level={2} className="!text-xl md:!text-3xl">
            <div className="h-8 w-3/5 bg-gray-200 rounded-lg mx-auto md:mx-0"></div>
          </Title>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
            <div className="order-2 lg:order-1 lg:col-span-4">
              <div className="h-60 bg-gray-200 rounded-lg w-full min-h-60"></div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-6">
              <Title level={4} className="!text-lg md:!text-xl mb-4">
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
              </Title>
              <Paragraph className="!text-sm mb-4">
                <div className="h-8 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-8 w-5/6 bg-gray-200 rounded"></div>
              </Paragraph>
              <Paragraph className="!text-sm mb-4">
                <div className="h-8 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-8 w-5/6 bg-gray-200 rounded"></div>
              </Paragraph>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
            <div className="order-1 lg:col-span-6">
              <Title level={4} className="!text-lg md:!text-xl mb-4">
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
              </Title>
              <Paragraph className="!text-sm mb-4">
                <div className="h-8 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-8 w-5/6 bg-gray-200 rounded"></div>
              </Paragraph>
              <Paragraph className="!text-sm mb-4">
                <div className="h-8 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-8 w-5/6 bg-gray-200 rounded"></div>
              </Paragraph>
            </div>
            <div className="order-2 lg:col-span-4">
              <div className="h-60 bg-gray-200 rounded-lg w-full min-h-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}