"use client";

import React, { useState, useEffect } from "react";
import { EnvironmentOutlined, ThunderboltOutlined, SafetyOutlined } from "@ant-design/icons";
import { ConfigProvider, theme as antdTheme, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocale } from "next-intl";
import { GetWhyChooseUs } from "@/lib/directus/about/whyChooseUs";
import SkeletonWhyChooseUsWithTabs from "@/skeleton/about/whyChooseUs";

const { Title, Paragraph, Text } = Typography;

interface ReasonStats {
  label: string;
  value: number;
  color: string;
}

interface ReasonIllustration {
  title: string;
  stats: ReasonStats[];
  mainStat: string;
  mainLabel: string;
  chartData: {
    percentage: number;
    label: string;
  };
}

interface Reason {
  id: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  activeBgColor: string;
  title: string;
  description: string;
  features: string[];
  illustration: ReasonIllustration;
}

export default function WhyChooseUsWithTabs() {
  const locale = useLocale();
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState("nature");
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialTheme = typeof window !== "undefined" ? document.documentElement.getAttribute("data-theme") || "light" : "light";
  const theme = isClient ? mytheme : initialTheme;

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const translations = await GetWhyChooseUs(locale);
        if (!translations) {
          setError("Không tìm thấy dữ liệu.");
          return;
        }

        const mappedReasons: Reason[] = translations.map((translation) => {
          const config = getReasonConfig(translation.whyChooseUs_id);
          return {
            id: config.id,
            icon: config.icon,
            color: config.color,
            bgColor: config.bgColor,
            activeBgColor: config.activeBgColor,
            title: translation.title,
            description: translation.description,
            features: translation.features,
            illustration: {
              ...translation.illustration,
              stats: translation.illustration.stats.length > 0
                ? translation.illustration.stats.map((stat) => ({
                  ...stat,
                  color: config.statColor,
                }))
                : [{ label: "Dữ liệu không khả dụng", value: 0, color: config.statColor }],
            },
          };
        });

        setReasons(mappedReasons);
        setActiveTab(mappedReasons[0]?.id || "nature");
      } catch (err) {
        setError("Lỗi khi tải dữ liệu: " + (err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [locale]);

  useEffect(() => {
    setIsClient(true);
    if (isClient && document.documentElement.getAttribute("data-theme") !== theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, isClient]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getReasonConfig = (whyChooseUs_id: number) => {
    switch (whyChooseUs_id) {
      case 1:
        return {
          id: "nature",
          icon: EnvironmentOutlined,
          color: "text-green-600",
          bgColor: "bg-green-50",
          activeBgColor: "bg-green-500",
          statColor: "bg-green-400",
        };
      case 2:
        return {
          id: "activities",
          icon: ThunderboltOutlined,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          activeBgColor: "bg-blue-500",
          statColor: "bg-blue-400",
        };
      case 3:
        return {
          id: "culture",
          icon: SafetyOutlined,
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          activeBgColor: "bg-amber-500",
          statColor: "bg-amber-400",
        };
      default:
        return {
          id: `reason-${whyChooseUs_id}`,
          icon: EnvironmentOutlined,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          activeBgColor: "bg-gray-500",
          statColor: "bg-gray-400",
        };
    }
  };

  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
      borderRadius: 8,
    },
    algorithm: theme === "list" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };

  if (isLoading) {
    return <SkeletonWhyChooseUsWithTabs />;
  }

  if (error || !reasons.length) {
    return (
      <div className="py-6 px-4 text-center">
        <p className="text-red-600 text-sm">{error || "Không tìm thấy dữ liệu phù hợp."}</p>
      </div>
    );
  }

  const activeReason = reasons.find((reason) => reason.id === activeTab) || reasons[0];

  const getLocalizedEvaluationLabel = () => {
    switch (locale) {
      case "en":
        return "Evaluation Metrics";
      case "zh":
        return "评估指标";
      case "ko":
        return "평가 지표";
      case "vi":
      default:
        return "Chỉ số đánh giá";
    }
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <section className="py-12 bg-white mb-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <Title level={2} className="!text-xl md:!text-3xl">
              {locale === "vi" ? (
                <>Những gì <span className="text-orange-500">Ông Đề</span> mang lại</>
              ) : locale === "en" ? (
                <>What <span className="text-orange-500">Ong De</span> Brings</>
              ) : locale === "zh" ? (
                <> <span className="text-orange-500">翁德</span>带来的</>
              ) : locale === "ko" ? (
                <> <span className="text-orange-500">옹 데</span>가 가져오는 것</>
              ) : (
                <>What <span className="text-orange-500">Ong De</span> Brings</>
              )}
            </Title>
          </div>

          <div className="grid lg:grid-cols-5 gap-4 items-stretch">
            <div className="lg:col-span-2 space-y-2 flex flex-col h-full reasons-container">
              {reasons.map((reason) => {
                const IconComponent = reason.icon;
                const isActive = activeTab === reason.id;

                return (
                  <div
                    key={reason.id}
                    onClick={() => setActiveTab(reason.id)}
                    className={`group relative rounded-lg cursor-pointer transition-all duration-200 border shadow-lg shadow-gray-150 ${isActive ? "bg-white border-gray-200 shadow-lg" : "bg-white hover:bg-gray-50 border-gray-200 hover:shadow-md"} min-h-[120px]`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${reason.id}`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-green-600"></div>
                    )}
                    <div className="p-2.5">
                      <div className="flex items-start gap-3">
                        <div className={`py-3 px-3 rounded-lg ${isActive ? reason.activeBgColor : "bg-gray-100"}`}>
                          <span className={isActive ? `${reason.activeBgColor} text-white` : "bg-gray-100 text-gray-800"}>
                            <IconComponent style={{ fontSize: isMobile ? "1.5rem" : "1.25rem" }} />
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <Title className="!text-base">{reason.title}</Title>
                          <Paragraph className="text-sm leading-relaxed mb-2 text-gray-600">
                            {reason.description}
                          </Paragraph>
                          {isActive && (
                            <div className="space-y-1">
                              {reason.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-1 h-1 rounded-full bg-green-600"></div>
                                  <Text className="text-sm text-gray-500">{feature}</Text>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-3 h-full" role="tabpanel" id={`panel-${activeReason.id}`} aria-labelledby={activeReason.id}>
              <div className="rounded-xl p-4 pt-6 border bg-white border-gray-200 shadow-lg shadow-gray-150 flex flex-col h-full">
                <div className="text-center mb-3">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-2 shadow-md ${activeReason.bgColor}`}>
                    <span className={activeReason.color}><activeReason.icon style={{ fontSize: isMobile ? "1.25rem" : "1rem" }} /></span>
                    <Text className={`!text-sm font-semibold ${activeReason.color}`}>
                      {activeReason.illustration.title}
                    </Text>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="rounded-lg p-4 bg-gray-50">
                    <Title className="font-semibold !mb-3 !text-sm text-gray-800">
                      {getLocalizedEvaluationLabel()}
                    </Title>
                    <div className="space-y-2">
                      {activeReason.illustration.stats.map((stat, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <Text className="!text-sm text-gray-600">{stat.label}</Text>
                            <span className={`text-sm font-bold ${activeReason.color}`}>{stat.value}%</span>
                          </div>
                          <div className="h-2 rounded-full overflow-hidden bg-gray-200">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${stat.color}`}
                              style={{ width: `${stat.value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg p-4 bg-gray-50">
                    <div className="text-center">
                      <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center bg-gray-200`}>
                        <span className={`text-base md:text-lg font-bold ${activeReason.color}`}>
                          {activeReason.illustration.chartData.percentage}%
                        </span>
                      </div>
                      <Title className="!text-sm mt-3 !text-gray-600">{activeReason.illustration.chartData.label}</Title>
                      <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-lg mt-2 shadow-md ${activeReason.bgColor}`}>
                        <div className="text-center">
                          <div className={`text-base md:text-lg font-bold ${activeReason.color}`}>
                            {activeReason.illustration.mainStat}
                          </div>
                          <div className={`text-xs md:text-sm ${activeReason.color} opacity-80`}>
                            {activeReason.illustration.mainLabel}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center p-4 rounded-lg border bg-gray-50 border-gray-200">
                  <Title className="!text-base">{activeReason.title}</Title>
                  <Paragraph className="text-sm">{activeReason.description}</Paragraph>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
}