"use client";

import React, { useEffect, useState } from "react";
import { Card, Typography, ConfigProvider } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useLocale } from "next-intl";
import { GetSupportContact } from "@/lib/directus/contact/supportContact"
import { SupportContactTranslation } from "@/types/directus/contact/supportContact";

const { Title, Text } = Typography;


export default function SupportContactSection() {
  const locale = useLocale();
  const [contacts, setContacts] = useState<SupportContactTranslation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        setLoading(true);
        const data = await GetSupportContact(locale);
        if (data) {
          setContacts(data);
        } else {
          setError("No contact data available.");
        }
      } catch (err) {
        console.error("Failed to fetch contact data:", err);
        setError("Failed to load contacts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, [locale]);

  const themeConfig = {
    token: {
      colorPrimary: "#22C55E",
      borderRadius: 12,
    },
  };

  const getIconComponent = (iconString: string) => {
    if (iconString.includes("MailOutlined")) {
      return <MailOutlined className="!text-white !text-2xl" />;
    } else if (iconString.includes("PhoneOutlined")) {
      return <PhoneOutlined className="!text-white !text-2xl" />;
    } else if (iconString.includes("GlobalOutlined")) {
      return <GlobalOutlined className="!text-white !text-2xl" />;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8 md:px-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, index) => (
            <Card key={index} loading className="!rounded-xl !shadow-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error || contacts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        {error || "No contact data available."}
      </div>
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="w-full max-w-7xl mx-auto py-8 md:px-6 px-4">
        <div className="mb-16">
          <div className="text-center mb-8">
            <Title level={2} className="!text-xl md:!text-3xl py-5">
              {locale === "vi" ? (
                <>
                  Tư vấn và hỗ trợ trực tuyến -{" "}
                  <span className="text-green-600">
                    Làng Du Lịch Sinh Thái Ông Đề
                  </span>
                </>
              ) : locale === "en" ? (
                <>
                  Online Consultation and Support -{" "}
                  <span className="text-green-600">
                    Ong De Eco-Tourism Village
                  </span>
                </>
              ) : locale === "zh" ? (
                <>
                  在线咨询与支持 -{" "}
                  <span className="text-green-600">翁德生态旅游村</span>
                </>
              ) : locale === "ko" ? (
                <>
                  온라인 상담 및 지원 -{" "}
                  <span className="text-green-600">옹 데 생태 관광 마을</span>
                </>
              ) : (
                <>
                  Online Consultation and Support -{" "}
                  <span className="text-green-600">
                    Ong De Eco-Tourism Village
                  </span>
                </>
              )}
            </Title>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contacts.map((item, index) => (
              <Card
                key={index}
                className="!border-1 !border-gray-100 !shadow-lg !rounded-xl !overflow-hidden !bg-white hover:!shadow-xl !transition-shadow !duration-300"
                bodyStyle={{ padding: 0 }}
              >
                <div className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center`}
                    style={{ backgroundColor: item.bg_color }}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center`}
                      style={{ backgroundColor: item.icon_bg_color }}
                    >
                      {getIconComponent(item.icon)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text
                      strong
                      className="!text-gray-800 !text-base !block !font-semibold"
                    >
                      {item.title}
                    </Text>
                    <Text
                      className="!text-gray-600 !font-medium !text-sm !block"
                    >
                      {item.description}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}