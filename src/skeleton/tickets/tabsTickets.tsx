import React from 'react';
import { Skeleton, ConfigProvider } from 'antd';

export default function CarRentalSearchSkeleton () {
  return (
    <ConfigProvider>
      <div className="max-w-7xl mx-auto">
        <div className="bg-orange-50 rounded-3xl">
          <div>
            <div className="flex gap-4 mb-6">
              <Skeleton.Button active size="large" style={{ width: 100 }} />
              <Skeleton.Button active size="large" style={{ width: 120 }} />
              <Skeleton.Button active size="large" style={{ width: 100 }} />
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

