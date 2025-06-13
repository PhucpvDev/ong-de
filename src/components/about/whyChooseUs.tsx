"use client";

import React, { useState, useEffect } from "react";
import { EnvironmentOutlined, ThunderboltOutlined, SafetyOutlined } from "@ant-design/icons";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocale } from "next-intl";
import { GetWhyChooseUs } from "@/lib/directus/about/whyChooseUs";
import SkeletonWhyChooseUsWithTabs from "@/skeleton/about/whyChooseUs";

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
      <div className="py-16 text-center">
        <p className="text-red-600">{error || "Không tìm thấy dữ liệu phù hợp."}</p>
      </div>
    );
  }

  const activeReason = reasons.find((reason) => reason.id === activeTab) || reasons[0];

  const getLocalizedTitle = () => {
    switch (locale) {
      case "en":
        return "Why Choose Ong De Eco-Tourism Village Ong De";
      case "zh":
        return "为什么选择翁德生态旅游村翁德";
      case "ko":
        return "옹 데 생태 관광 마을 옹 데를 선택하는 이유";
      case "vi":
      default:
        return "Tại sao chọn Ông Đề Làng Du Lịch Sinh Thái Ông Đề";
    }
  };

  const getLocalizedDescription = () => {
    switch (locale) {
      case "en":
        return "Discover the beauty of the Mekong Delta with unique eco-tourism experiences in Can Tho";
      case "zh":
        return "探索湄公河三角洲的美景，体验在岘港的独特生态旅游";
      case "ko":
        return "메콩 델타의 아름다움을 발견하고, 깐터에서 독특한 생태 관광을 경험하세요";
      case "vi":
      default:
        return "Khám phá vẻ đẹp miền Tây sông nước với những trải nghiệm sinh thái độc đáo tại Cần Thơ";
    }
  };

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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-12 xl:px-20 2xl:px-36">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
              {getLocalizedTitle()} <span className="text-green-600">Ong De</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              {getLocalizedDescription()}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 items-start">
            <div className="lg:col-span-2 space-y-3">
              {reasons.map((reason) => {
                const IconComponent = reason.icon;
                const isActive = activeTab === reason.id;

                return (
                  <div
                    key={reason.id}
                    onClick={() => setActiveTab(reason.id)}
                    className={`group relative rounded-xl cursor-pointer transition-all duration-200 border ${
                      isActive ? "bg-white border-gray-200 shadow-lg" : "bg-white hover:bg-gray-50 border-gray-200 hover:shadow-md"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-green-600"></div>
                    )}
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-3 rounded-lg ${isActive ? reason.activeBgColor : "bg-gray-100"}`}>
                          <span className={isActive ? `${reason.activeBgColor} text-white` : "bg-gray-100 text-gray-800"}>
                            <IconComponent />
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-lg font-bold mb-1 ${isActive ? "text-gray-900" : "text-gray-700"}`}>
                            {reason.title}
                          </h3>
                          <p className={`text-sm leading-relaxed mb-3 ${isActive ? "text-gray-600" : "text-gray-500"}`}>
                            {reason.description}
                          </p>
                          {isActive && (
                            <div className="space-y-1">
                              {reason.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-1 h-1 rounded-full bg-green-600"></div>
                                  <span className="text-xs text-gray-500">{feature}</span>
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

            <div className="lg:col-span-3">
              <div className="rounded-2xl p-4 border bg-white border-gray-200 shadow-xs">
                <div className="text-center mb-3">
                  <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg mb-3 shadow-md ${activeReason.bgColor}`}>
                    <span className={activeReason.color}><activeReason.icon /></span>
                    <span className={`font-semibold text-sm ${activeReason.color}`}>
                      {activeReason.illustration.title}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-xl p-4 bg-gray-50">
                    <h4 className="font-semibold mb-3 text-sm text-gray-800">
                      {getLocalizedEvaluationLabel()}
                    </h4>
                    <div className="space-y-2">
                      {activeReason.illustration.stats.map((stat, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-600">{stat.label}</span>
                            <span className={`text-xs font-bold ${activeReason.color}`}>{stat.value}%</span>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden bg-gray-200">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${stat.color}`}
                              style={{ width: `${stat.value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl p-4 bg-gray-50">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center bg-gray-200">
                        <span className={`text-xl font-bold ${activeReason.color}`}>
                          {activeReason.illustration.chartData.percentage}%
                        </span>
                      </div>
                      <div className="text-xs mt-4 text-gray-500">{activeReason.illustration.chartData.label}</div>
                      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg mt-3 shadow-md ${activeReason.bgColor}`}>
                        <div className="text-center">
                          <div className={`text-xl font-bold ${activeReason.color}`}>
                            {activeReason.illustration.mainStat}
                          </div>
                          <div className={`text-xs ${activeReason.color} opacity-80`}>
                            {activeReason.illustration.mainLabel}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center p-4 rounded-xl border bg-gray-50 border-gray-200">
                  <h3 className="text-lg font-bold mb-1 text-gray-900">{activeReason.title}</h3>
                  <p className="text-sm text-gray-600">{activeReason.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
}