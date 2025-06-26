"use client";
import React from "react";
import { ConfigProvider, Button, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title, Text } = Typography


export default function Contact() {
  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
      borderRadius: 8,
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="w-5xl rounded-4xl px-4 sm:px-6 lg:px-8 mx-auto bg-blue-900 py-8 sm:py-10 lg:py-16 mt-10">
        <div className="mb-6 sm:mb-8 text-center max-w-3xl mx-auto">
          <Title className="!text-white !text-xl md:!text-3xl">
            Ông Đề - Làng du lịch sinh thái tại Cần Thơ
          </Title>
          <Text className="!text-white !text-sm md:!text-xl !font-meidum">
            Liên hệ ngay để nhận thông tin các tour và dịch vụ tại Làng du lịch Ông Đề!
          </Text>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <div className="w-full sm:flex-1 max-w-xl">
            <input
              type="email"
              placeholder="Nhập địa chỉ email của bạn"
              className="w-full h-12 sm:h-14 lg:h-16 px-4 sm:px-6 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base transition-all duration-200"
            />
          </div>

          <Button className="!bg-white !h-16 !px-6 !rounded-full">
            Gửi liên hệ <ArrowRightOutlined className="text-lg sm:text-xl font-bold" />
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
}