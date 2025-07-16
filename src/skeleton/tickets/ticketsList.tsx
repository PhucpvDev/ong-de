import React from 'react';
import { Skeleton, Card, Divider } from 'antd';
import { TagOutlined } from '@ant-design/icons';

export default function TicketsListSkeleton () {
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Card
            key={index}
            className="shadow-md rounded-xl overflow-hidden border-none"
            bodyStyle={{ padding: 0 }}
          >
            <div className="flex h-36">
              <div className="w-32 bg-orange-50 flex flex-col items-center justify-center p-4">
                <Skeleton.Button active size="large" className="w-full mb-4" />
                <Skeleton.Button active size="default" block className="rounded-lg" />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <Skeleton paragraph={{ rows: 1, width: ['100%', '60%'] }} active />
                </div>
                <div className="mt-auto">
                  <Divider className="!my-2" />
                  <div className="flex items-center gap-1">
                    <Skeleton.Avatar active size="small" shape="circle" />
                    <Skeleton.Input active size="small" style={{ width: 100 }} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
