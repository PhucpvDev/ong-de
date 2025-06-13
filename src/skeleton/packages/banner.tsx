"use client";

import React from 'react';
import { Skeleton } from 'antd';

export default function SkeletonBannerCombo() {
  return (
    <div className="relative z-10 max-w-7xl px-6 mx-auto flex items-center justify-center md:justify-start min-h-[650px] md:min-h-[500px]">
      <div className="pt-7 md:pt-24 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
        <Skeleton
          active
          title={false}
          paragraph={{ rows: 1, width: 150 }}
          className="bg-white/10 backdrop-blur-lg md:mt-0 mt-10 rounded-full px-4 py-2 mb-6 border border-dashed border-orange-400/30"
        />

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
          className="mb-8"
        />

        <Skeleton
          active
          title={false}
          paragraph={{ rows: 3, width: ['90%', '80%', '70%'] }}
          className="mb-8 max-w-[600px]"
        />

        <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start gap-4 md:gap-6">
          <div className="bg-white/10 backdrop-blur-lg md:backdrop-blur-sm rounded-2xl md:rounded-full p-4 md:px-5 md:py-3 flex items-center gap-4 md:gap-3 border border-dashed border-orange-400/30">
            <Skeleton.Avatar active size={48} shape="circle" />
            <Skeleton active title={{ width: 150 }} paragraph={false} />
          </div>
          <div className="bg-white/10 backdrop-blur-lg md:backdrop-blur-sm rounded-2xl md:rounded-full p-4 md:px-5 md:py-3 flex items-center gap-4 md:gap-3 border border-dashed border-orange-400/30">
            <Skeleton.Avatar active size={48} shape="circle" />
            <Skeleton active title={{ width: 150 }} paragraph={false} />
          </div>
        </div>
      </div>
    </div>
  );
}