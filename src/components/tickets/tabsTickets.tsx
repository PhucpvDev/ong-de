"use client";

import React, { useState } from "react";
import { DatePicker, ConfigProvider, Tabs, Button } from "antd";
import { EnvironmentOutlined, CrownOutlined, UsergroupAddOutlined, SmileOutlined } from "@ant-design/icons";
import viVN from "antd/lib/locale/vi_VN";

const { RangePicker } = DatePicker;

const CarRentalSearch = () => {
  const [location, setLocation] = useState("");
  const [returnDifferentLocation, setReturnDifferentLocation] = useState(false);
  const [driverAge, setDriverAge] = useState("30-65");

  const onDateChange = (dates, dateStrings) => {
    console.log("Selected Dates:", dateStrings);
  };

  const tabItems = [
    { key: "1", label: <span><EnvironmentOutlined /> Du Lịch Sinh Thái</span>, children: null },
    { key: "2", label: <span><CrownOutlined /> Chèo Xuồng</span>, children: null },
    { key: "3", label: <span><UsergroupAddOutlined /> Trò Chơi Dân Gian</span>, children: null },
    { key: "4", label: <span><SmileOutlined /> Trải Nghiệm Nông Nghiệp</span>, children: null },
    { key: "5", label: <span><CrownOutlined /> Đàn Ca Tài Tử</span>, children: null },
    { key: "6", label: <span><SmileOutlined /> Buffet Miền Tây</span>, children: null },
    { key: "7", label: <span><UsergroupAddOutlined /> Đan Lát Thủ Công</span>, children: null },
  ];

  return (
    <ConfigProvider locale={viVN}>
      <div className="max-w-7xl mx-auto px-6 py-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <Tabs
            defaultActiveKey="1"
            items={tabItems}
            type="card"
            className="mb-4"
            onChange={(key) => console.log("Tab changed to:", key)}
          />
          <div className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Điểm nhận vé/tour..."
                className="w-3/5 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
              <button
                className="bg-orange-500 w-2/5 p-2 rounded-lg cursor-pointer text-white hover:bg-orange-600"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default CarRentalSearch;