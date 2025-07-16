"use client";

import React, { useState, useEffect } from "react";
import { Typography, Button, ConfigProvider } from "antd";
import { AppstoreOutlined, ShoppingOutlined, ShoppingCartOutlined, TruckOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useLocale } from "next-intl";
import parse from "html-react-parser";
import { GetBusinessTabs } from "@/lib/directus/about/businessTabsSection";
import { BusinessTabsTranslation } from "@/types/directus/about/businessTabsSection";

const { Title, Paragraph } = Typography;


const iconMap: { [key: string]: React.ReactNode } = {
  "<AppstoreOutlined />": <AppstoreOutlined />,
  "<ShoppingOutlined />": <ShoppingOutlined />,
  "<ShoppingCartOutlined />": <ShoppingCartOutlined />,
  "<TruckOutlined />": <TruckOutlined />,
};

export default function BusinessTabsSection() {
  const locale = useLocale();
  const [tabs, setTabs] = useState<BusinessTabsTranslation[]>([]);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBusinessTabs() {
      try {
        setLoading(true);
        const data = await GetBusinessTabs(locale);
        if (data) {
          setTabs(data);
          setActiveTab(data[0]?.business_tabs_id.toString() || "1");
        } else {
          setError("No tabs data available.");
        }
      } catch (err) {
        console.error("Failed to fetch tabs data:", err);
        setError("Failed to load tabs data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchBusinessTabs();
  }, [locale]);

  const themeConfig = {
    token: {
      colorPrimary: "#15BD6D",
      borderRadius: 12,
    },
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 mt-14 mb-12">
        <div className="text-center mb-14">
          <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 items-start md:items-center gap-6 md:gap-0">
          <div className="md:col-span-4 mb-6 md:mb-0">
            <div className="w-full h-[300px] bg-gray-300 rounded-bl-3xl rounded-tr-3xl animate-pulse"></div>
          </div>
          <div className="md:col-span-8">
            <div className="flex justify-center gap-2 flex-wrap mb-9">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-10 bg-gray-300 rounded-full w-32 animate-pulse"></div>
              ))}
            </div>
            <div className="bg-green-50 min-h-83 rounded-tr-3xl rounded-br-3xl p-6 md:p-10">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-6 animate-pulse"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white border rounded-xl p-4">
                    <div className="h-6 bg-gray-300 rounded w-1/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || tabs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        {error || "No tabs data available."}
      </div>
    );
  }

  const current = tabs.find((tab) => tab.business_tabs_id.toString() === activeTab);

  if (!current) {
    return (
      <div className="text-center py-12 text-gray-600">
        No active tab data available.
      </div>
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="max-w-7xl mx-auto px-6 mt-14 mb-12">
        <div className="text-center mb-14">
          <Title className="!text-xl md:!text-3xl leading-tight">
            {locale === "vi" ? (
              <>
                Trải nghiệm trọn vẹn tại <br />
                <span className="text-green-700">Làng du lịch sinh thái Ông Đề</span> – Cần Thơ
              </>
            ) : locale === "en" ? (
              <>
                A Complete Experience at <br />
                <span className="text-green-700">Ong De Ecotourism Village</span> – Can Tho
              </>
            ) : locale === "zh" ? (
              <>
                在 <span className="text-green-700">翁德生态旅游村</span> – 芹苴的完整体验
              </>
            ) : locale === "ko" ? (
              <>
                <span className="text-green-700">옹 데 생태 관광 마을</span> – 캔토에서 완벽한 체험
              </>
            ) : (
              <>
                A Complete Experience at <br />
                <span className="text-green-700">Ong De Ecotourism Village</span> – Can Tho
              </>
            )}
          </Title>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 items-start md:items-center gap-6 md:gap-0">
          <div className="md:col-span-4 mb-6 md:mb-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${current.image}`}
              alt={current.label}
              width={400}
              height={300}
              className="w-full h-auto object-cover md:rounded-bl-3xl md:rounded-tr-3xl shadow-xl shadow-green-400/20"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/400x300";
              }}
            />
          </div>

          <div className="md:col-span-8 text-white">
            <div className="flex justify-center gap-2 flex-wrap mb-9">
              {tabs.map((tab) => (
                <Button
                  key={tab.business_tabs_id}
                  type={activeTab === tab.business_tabs_id.toString() ? "primary" : "default"}
                  shape="round"
                  icon={iconMap[tab.icon] || <AppstoreOutlined />}
                  onClick={() => setActiveTab(tab.business_tabs_id.toString())}
                  className={`!p-5 transition-colors !text-md duration-200 ${
                    activeTab === tab.business_tabs_id.toString()
                      ? "!bg-[#E5FFF2] !border-[#15BD6D] !text-[#15BD6D] hover:!bg-[#D9FBEA] hover:!border-[#15BD6D]"
                      : "hover:!border-[#15BD6D] hover:!text-[#15BD6D]"
                  }`}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            <div className="bg-green-50 min-h-83 max-h-83 rounded-tr-3xl rounded-br-3xl p-6 md:p-10 shadow-xl shadow-green-400/20">
              <Title level={4} className="!text-base md:!text-xl font-semibold mb-6 text-black">
                {current.label}
              </Title>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[current.description_1, current.description_2, current.description_3].map((desc, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-white/20 rounded-xl p-4 leading-relaxed text-sm text-black"
                  >
                    <div className="text-green-700 text-lg mb-2">
                      <CheckCircleOutlined />
                    </div>
                    <Paragraph className="!mb-0">{parse(desc)}</Paragraph>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}