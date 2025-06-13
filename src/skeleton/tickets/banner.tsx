import React from 'react';
import { Skeleton } from 'antd';

export default function SkeletonBanner() {
  return (
    <div className="relative z-10 max-w-7xl px-4 sm:px-6 mx-auto md:mt-0 mt-7">
      <div className="pt-20 sm:pt-40 flex flex-col items-center sm:items-start text-center sm:text-left w-full animate-pulse">
        <Skeleton
          active
          title={false}
          paragraph={{ rows: 1, width: ['120px', '150px'] }}
          className="bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 mb-6 border border-dashed border-orange-400/30 w-[150px] sm:w-[180px]"
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
          className="mb-8 max-w-[300px] sm:max-w-[500px]"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[300px] sm:max-w-4xl">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 border border-dashed border-orange-400/30">
            <Skeleton.Avatar active size={40} shape="square" />
            <Skeleton active title={{ width: '150px' }} paragraph={false} />
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 border border-dashed border-orange-400/30">
            <Skeleton.Avatar active size={40} shape="square" />
            <Skeleton active title={{ width: '150px' }} paragraph={false} />
          </div>
        </div>
      </div>
    </div>
  );
}