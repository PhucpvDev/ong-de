"use client";
import React from "react";
import { ConfigProvider } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function Contact() {
  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
      borderRadius: 8,
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="w-full -mt-10 bg-white">
        <div className="relative z-10 max-w-[1230px] mx-auto top-16 sm:top-20 md:top-28 overflow-hidden rounded-tl-[50px] sm:rounded-tl-[75px] md:rounded-tl-[100px] rounded-br-[50px] sm:rounded-br-[75px] md:rounded-br-[100px] py-6 sm:py-8 md:py-10 bg-blue-900 mx-4 sm:mx-6 md:mx-auto">
          <div className="relative z-10 text-center px-4 sm:px-6 md:px-8">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                Ông Đề - Làng du lịch sinh thái tại Cần Thơ
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-medium px-2 sm:px-4 leading-relaxed">
                Liên hệ ngay để nhận thông tin các tour và dịch vụ tại Làng du lịch Ông Đề!
              </p>
            </div>
            
            <div className="sm:flex flex-row gap-3 justify-center items-center max-w-5xl mx-auto">
              <div className="flex-1 max-w-xl rounded-full">
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email của bạn"
                  className="w-full h-14 md:h-16 px-6 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base transition-all duration-200"
                />
              </div>
              
              <button className="h-14 md:h-16 px-8 md:px-10 rounded-full cursor-pointer bg-white border-0 shadow-lg font-bold text-base min-w-full md:mt-0 mt-5 md:min-w-[220px] flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-xl hover:bg-gray-50 text-blue-900">
                Gửi liên hệ <ArrowRightOutlined className="text-xl font-bold" />
              </button>
            </div>
           
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}