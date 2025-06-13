import React from 'react';
import { Skeleton } from 'antd';

export default function SkeletonBanner() {
  return (
    <div className="relative w-full h-[100vh] min-h-[600px] md:pt-14 overflow-hidden animate-pulse">
      <div className="absolute inset-0 bg-gray-300/20"></div>

      <div className="relative h-full flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-6 items-center h-full">
            <div className="lg:col-span-7 space-y-6">
              <Skeleton
                active
                title={{ width: '80%' }}
                paragraph={false}
                className="mb-2"
              />
              <Skeleton
                active
                title={{ width: '60%' }}
                paragraph={false}
                className="mb-4 hidden md:block"
              />
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 3, width: ['90%', '80%', '70%'] }}
                className="max-w-2xl"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 hidden md:grid">
                {Array(4).fill(0).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20"
                  >
                    <Skeleton active title={{ width: '80%' }} paragraph={false} />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="space-y-6 w-full max-w-sm">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Skeleton active title={{ width: '50%' }} paragraph={false} className="mb-4 text-center" />
                  <div className="space-y-4">
                    {Array(4).fill(0).map((_, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Skeleton.Avatar active size={32} shape="circle" />
                        <div className="flex-1">
                          <Skeleton active title={{ width: '60%' }} paragraph={{ rows: 1, width: '80%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}