"use client";

import React, { useState, useEffect } from "react";
import { Badge, Typography, Alert, Button, Spin } from "antd";
import { EyeOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import { Package, PackageTourItemProps } from "@/types/packages/homestayTourList";
import { Link } from "@/i18n/routing";

const { Title, Paragraph, Text } = Typography;

const FeaturedPackageItem: React.FC<PackageTourItemProps> = ({ data, onSelect }) => {
  const t = useTranslations("packages");

  const getLowestPrice = (): number => {
    const prices = [
      ...data.base_prices.map((bp) => bp.price),
      ...data.capacity_prices.map((cp) => cp.price),
    ];
    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  const handleClick = (): void => {
    if (onSelect) {
      onSelect(data);
    }
  };

  return (
    <div
      className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4 overflow-hidden bg-white font-roboto cursor-pointer group transform hover:-translate-y-1"
      onClick={handleClick}
    >
      <div className="relative mb-1">
        <Link href={`/packages/${data.id}`}>
          <div className="h-48 sm:h-56 md:h-64 relative overflow-hidden">
            <img
              src={data.main_image || "/placeholder-image.jpg"}
              alt={data.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {data.is_featured && (
              <div className="absolute top-3 right-3">
                <Badge.Ribbon text={t("featured")} color="gold">
                  <div></div>
                </Badge.Ribbon>
              </div>
            )}
            <div className="absolute top-3 left-3">
              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                {t("brandName")}
              </span>
            </div>
          </div>
        </Link>
      </div>

      <div className="p-2 sm:p-3">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
              {data.categories[0]?.name || t("uncategorized")}
            </span>
            {data.duration && (
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                {data.duration}
              </span>
            )}
          </div>
          
          <Link href={`/packages/${data.id}`}>
            <Title 
              level={5} 
              className="!text-gray-800 !mb-2 hover:!text-green-700 transition-colors !line-clamp-2"
            >
              {data.title}
            </Title>
          </Link>
        </div>

        <Link href={`/packages/${data.id}`}>
          <Paragraph className="!text-sm !text-gray-600 !line-clamp-3 !leading-relaxed !mb-4">
            {data.summary}
          </Paragraph>
        </Link>

        <div className="border-t pt-4 border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div className="flex items-baseline gap-1 mb-1">
                <Text className="text-sm text-gray-500">
                  Từ
                </Text>
                <Text className="font-bold text-xl text-green-700">
                  {getLowestPrice().toLocaleString("vi-VN")}₫
                </Text>
              </div>
              <Text className="text-xs text-gray-500">
                {data.conditions || `Tối thiểu ${data.min_quantity} người`}
              </Text>
            </div>
            
            <Link href={`/packages/${data.id}`}>
              <Button 
                type="primary" 
                className="!bg-green-600 hover:!bg-green-700 !border-green-600 hover:!border-green-700 !rounded-lg !px-4 !py-1 !h-auto !font-medium"
              >
                Chi tiết
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FeaturedPackagesList() {
  const t = useTranslations("packages");
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeaturedPackages();
  }, []);

  const fetchFeaturedPackages = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data && Array.isArray(data.data.packages)) {
        const featuredPackages = data.data.packages
          .filter((pkg: Package) => pkg.is_featured)
          .slice(0, 4);
        
        setPackages(featuredPackages);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching featured packages:", err);
      setError(err instanceof Error ? err.message : "Không thể tải dữ liệu gói du lịch");
    } finally {
      setLoading(false);
    }
  };

  const handlePackageSelect = (packageData: Package): void => {
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-80 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert 
            message="Lỗi tải gói du lịch" 
            description={error}
            type="error" 
            showIcon
            className="rounded-lg"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Title level={2} className="!text-3xl md:!text-4xl !mb-4 !text-gray-800">
            {t("brandName")} - <span className="text-green-700">{t("headerTitle")}</span>
          </Title>
          <Paragraph className="!text-lg !text-gray-600 !max-w-3xl !mx-auto !leading-relaxed">
            Khám phá những gói tiết kiệm hấp dẫn nhất của chúng tôi
          </Paragraph>
        </div>

        {packages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {packages.map((item) => (
                <FeaturedPackageItem 
                  key={item.id} 
                  data={item} 
                  onSelect={handlePackageSelect} 
                />
              ))}
            </div>

            <div className="text-center">
              <Link href="/packages">
                <Button 
                  type="primary" 
                  size="large"
                  className="!bg-green-600 hover:!bg-green-700 !border-green-600 hover:!border-green-700 !rounded-lg !px-8 !py-3 !h-auto !font-medium !text-lg"
                  icon={<ArrowRightOutlined />}
                >
                  Xem tất cả gói du lịch
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <EyeOutlined className="text-2xl text-gray-400" />
              </div>
              <Title level={4} className="!text-gray-600 !mb-2">
                Chưa có gói nổi bật
              </Title>
              <Paragraph className="!text-gray-500">
                Hiện tại chưa có gói tiết kiệm nổi bật nào
              </Paragraph>
            </div>
            <Link href="/packages">
              <Button 
                type="primary" 
                className="!bg-green-600 hover:!bg-green-700 !border-green-600 hover:!border-green-700 !rounded-lg"
              >
                {t("browseAllPackages")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}