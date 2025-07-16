"use client";
import React from 'react';
import { Skeleton, Spin } from 'antd';

export default function PrivacyPolicySkeleton() {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4">

        <div className="w-full md:w-3/4 mt-5 md:mt-0 md:ml-10 p-3 md:p-0">
          <Skeleton
            active
            title={{ width: '100%', className: 'mb-6' }}
            paragraph={false}
          />
          <Skeleton
            active
            title={false}
            paragraph={{ rows: 3, width: ['80%', '70%', '60%'] }}
            className="mb-6"
          />
          <Skeleton
            active
            title={{ width: '100%', className: 'mb-6' }}
            paragraph={false}
          />
            <Skeleton
            active
            title={false}
            paragraph={{ rows: 3, width: ['80%', '70%', '60%'] }}
            className="mb-6"
          />
        </div>
      </div>
    </div>
  );
}