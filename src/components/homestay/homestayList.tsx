"use client";

import React, { useState, useEffect } from "react";
import { Typography, Card, Tag, Pagination, Button, Input, Radio, Drawer, Space } from "antd";
import { HomeOutlined, LeftOutlined, RightOutlined, FilterOutlined, CloseOutlined } from "@ant-design/icons";
import { IMAGES } from "@/constants/theme";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Search } from "lucide-react";

const { Title, Text } = Typography;

type HomestayItemProps = {
  data: {
    id: number;
    title: string;
    category?: string;
    images: string[];
    description: string;
    price: number;
    dateInfo: string;
    brand: string;
  };
};

const HomestayItem = ({ data }: HomestayItemProps) => (
  <Card
    className="!rounded-2xl !shadow-sm !mb-1 !overflow-hidden 
               !h-[280px] xs:!h-[320px] sm:!h-[340px] md:!h-[360px] lg:!h-[410px]
               !flex !flex-col !bg-white !font-roboto !border-none
               hover:!shadow-lg transition-shadow duration-300"
    bodyStyle={{ padding: 0, display: "flex", flexDirection: "column", flex: 1 }}
  >
    <div className="relative cursor-pointer flex-shrink-0">
      <div className="h-[120px] xs:h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] relative">
        <Image
          src={data.images[0]}
          alt={data.title}
          fill
          className="!w-full !h-full !object-cover !rounded-t-2xl"
          priority
        />
      </div>
    </div>

    <div className="p-2 xs:p-3 sm:p-4 flex-1 flex flex-col">
      <Title
        level={5}
        className="!font-bold !cursor-pointer 
                   !text-xs sm:!text-sm md:!text-base !mb-1 !flex-shrink-0 !line-clamp-1 !text-gray-800"
      >
        {data.title}
      </Title>

      <div className="mb-2 cursor-pointer flex-shrink-0">
        <Tag
          icon={<HomeOutlined className="!text-xs !mr-1" />}
          className="!text-xs !px-1.5 sm:!px-2 !py-0.5 !rounded !inline-flex !items-center 
                     !bg-orange-100 !text-orange-800 !border-none"
        >
          {data.category || "Homestay Phòng đôi"}
        </Tag>
      </div>

      <Text
        className="!text-xs sm:!text-sm !line-clamp-2 sm:!line-clamp-3 
                   !leading-tight !flex-1 !min-h-[40px] sm:!min-h-[60px] !mb-2 !text-gray-700"
      >
        {data.description}
      </Text>

      <div className="border-t pt-2 xs:pt-3 border-gray-200 flex-shrink-0">
        <div className="flex justify-between items-baseline">
          <div>
            <div className="flex items-baseline mb-1">
              <Text className="!text-xs !mr-1 !text-gray-500">Từ</Text>
              <Text
                strong
                className="!text-sm sm:!text-base md:!text-lg !text-gray-800"
              >
                ₫ {data.price.toLocaleString()}
              </Text>
            </div>
            <Text className="!text-xs !leading-tight !text-gray-500">
              Giá đã bao gồm thuế
            </Text>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const FilterSection = ({
  priceRange,
  setPriceRange,
  selectedBrand,
  setSelectedBrand,
  brandSearch,
  setBrandSearch,
  resetFilters,
}: {
  priceRange: string;
  setPriceRange: (value: string) => void;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  brandSearch: string;
  setBrandSearch: (value: string) => void;
  resetFilters: () => void;
}) => (
  <div className="space-y-6">
    <div>
      <Title level={5} className="!mb-4 !text-gray-800">Khoảng giá</Title>
      <Radio.Group
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className="!flex !flex-col !space-y-3"
      >
        <Radio value="" className="!text-sm">Tất cả</Radio>
        <Radio value="under-100" className="!text-sm">Dưới 100.000 ₫</Radio>
        <Radio value="100-300" className="!text-sm">100.000 ₫ - 300.000 ₫</Radio>
        <Radio value="300-500" className="!text-sm">300.000 ₫ - 500.000 ₫</Radio>
        <Radio value="over-500" className="!text-sm">Trên 500.000 ₫</Radio>
      </Radio.Group>
    </div>

    <div>
      <Title level={5} className="!mb-4 !text-gray-800">Danh mục</Title>
      <div className="mb-3">
        <Input
          placeholder="Nhập tên danh mục"
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
          className="!rounded-lg"
          size="middle"
        />
      </div>
      <Radio.Group
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        className="!flex !flex-col !space-y-3"
      >
        <Radio value="" className="!text-sm">Tất cả</Radio>
        <Radio value="STELLA" className="!text-sm">STELLA</Radio>
        <Radio value="DHG Pharma" className="!text-sm">DHG Pharma</Radio>
        <Radio value="Davipharm" className="!text-sm">Davipharm</Radio>
      </Radio.Group>
    </div>
  </div>
);

export default function HomestayList() {
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sortOrder, setSortOrder] = useState("");
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  const homestayData = [
    {
      id: 1,
      title: "Phòng Mộc Mạc Sông Hậu",
      category: "Phòng Đơn",
      images: [IMAGES.Sr_homestay],
      description: "Phòng nghỉ mộc mạc với view sông Hậu thơ mộng, mang lại cảm giác yên bình và gần gũi thiên nhiên.",
      price: 500000,
      dateInfo: "Còn trống",
      brand: "STELLA",
    },
    {
      id: 2,
      title: "Phòng Deluxe Miệt Vườn",
      category: "Phòng Đôi",
      images: [IMAGES.Sr_homestay],
      description: "Phòng tiện nghi hiện đại, view vườn trái cây xanh mát, lý tưởng cho cặp đôi yêu thiên nhiên.",
      price: 700000,
      dateInfo: "Còn trống",
      brand: "DHG Pharma",
    },
    {
      id: 3,
      title: "Phòng Garden Xanh Mát",
      category: "Phòng Đôi",
      images: [IMAGES.Sr_homestay],
      description: "Phòng nghỉ gần vườn trái cây sum suê, không gian thoáng đãng, đậm chất miền Tây.",
      price: 250000,
      dateInfo: "Còn trống",
      brand: "Davipharm",
    },
    {
      id: 4,
      title: "Phòng Riverside Thoáng Đãng",
      category: "Phòng Đơn",
      images: [IMAGES.Sr_homestay],
      description: "Phòng view kênh rạch thơ mộng, không gian yên tĩnh, hoàn hảo để thư giãn và tận hưởng.",
      price: 350000,
      dateInfo: "Còn trống",
      brand: "STELLA",
    },
    {
      id: 5,
      title: "Phòng Gia Đình Rộng Rãi",
      category: "Phòng Gia Đình",
      images: [IMAGES.Sr_homestay],
      description: "Phòng lớn với tiện nghi đầy đủ, phù hợp cho gia đình muốn khám phá văn hóa miền Tây.",
      price: 150000,
      dateInfo: "Còn trống",
      brand: "DHG Pharma",
    },
    {
      id: 6,
      title: "Phòng VIP Sang Trọng",
      category: "Phòng VIP",
      images: [IMAGES.Sr_homestay],
      description: "Phòng cao cấp với đầy đủ tiện nghi hiện đại, view panorama tuyệt đẹp.",
      price: 850000,
      dateInfo: "Còn trống",
      brand: "Davipharm",
    },
  ];

  useEffect(() => {
    applyFilters();
  }, [priceRange, selectedBrand, sortOrder]);

  const applyFilters = () => {
    let filtered = [...homestayData];

    if (priceRange) {
      if (priceRange === "under-100") {
        filtered = filtered.filter((item) => item.price < 100000);
      } else if (priceRange === "100-300") {
        filtered = filtered.filter((item) => item.price >= 100000 && item.price <= 300000);
      } else if (priceRange === "300-500") {
        filtered = filtered.filter((item) => item.price >= 300000 && item.price <= 500000);
      } else if (priceRange === "over-500") {
        filtered = filtered.filter((item) => item.price > 500000);
      }
    }

    if (selectedBrand) {
      filtered = filtered.filter((item) => item.brand === selectedBrand);
    }

    if (sortOrder === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const resetFilters = () => {
    setPriceRange("");
    setSelectedBrand("");
    setBrandSearch("");
    setSortOrder("");
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 lg:mb-12 text-center">
          <Title level={2} className="!text-lg sm:!text-xl md:!text-2xl lg:!text-3xl !mb-2">
            {locale === "vi" ? (
              <>HomeStay Làng Du Lịch <span className="text-green-700">Ông Đề</span></>
            ) : locale === "en" ? (
              <>HomeStay at <span className="text-green-700">Ong De</span> Tourism Village</>
            ) : locale === "zh" ? (
              <> <span className="text-green-700">翁德</span>旅游村的民宿</>
            ) : locale === "ko" ? (
              <> <span className="text-green-700">옹 데</span> 관광 maul của 홈스테이</>
            ) : (
              <>HomeStay at <span className="text-green-700">Ong De</span> Tourism Village</>
            )}
          </Title>
        </div>

        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="hidden lg:flex items-center gap-4 flex-wrap">
              <Text strong className="md:!text-xl !text-sm !text-gray-800 mr-10">Bộ lọc</Text>
              <Button
                type="link"
                className="!text-base !text-green-700 !font-medium hover:!text-green-700"
                onClick={resetFilters}
              >
                Thiết lập lại
              </Button>
              <Text className="!text-sm font-medium !text-gray-800">Sắp xếp theo:</Text>
              <Button
                type={sortOrder === "price-asc" ? "primary" : "default"}
                size="middle"
                className="!rounded-lg"
                onClick={() => setSortOrder(sortOrder === "price-asc" ? "" : "price-asc")}
              >
                Giá giảm dần
              </Button>
              <Button
                type={sortOrder === "price-desc" ? "primary" : "default"}
                size="middle"
                className="!rounded-lg"
                onClick={() => setSortOrder(sortOrder === "price-desc" ? "" : "price-desc")}
              >
                Giá tăng dần
              </Button>
            </div>

            <div className="flex lg:hidden items-center justify-between w-full">
              <Button
                type="default"
                icon={<FilterOutlined />}
                onClick={() => setFilterDrawerVisible(true)}
                className="!rounded-lg"
              >
                Bộ lọc
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  type={sortOrder === "price-asc" ? "primary" : "default"}
                  size="small"
                  onClick={() => setSortOrder(sortOrder === "price-asc" ? "" : "price-asc")}
                >
                  Giá ↑
                </Button>
                <Button
                  type={sortOrder === "price-desc" ? "primary" : "default"}
                  size="small"
                  onClick={() => setSortOrder(sortOrder === "price-desc" ? "" : "price-desc")}
                >
                  Giá ↓
                </Button>
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <Input
                placeholder="Tìm kiếm theo tên homestay..."
                prefix={<Search size={16} className="!text-gray-400" />}
                size="middle"
                className="!rounded-lg w-full sm:!w-80"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-4">
              <FilterSection
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                brandSearch={brandSearch}
                setBrandSearch={setBrandSearch}
                resetFilters={resetFilters}
              />
            </div>
          </div>

          <Drawer
            title={
              <div className="flex items-center justify-between">
                <span>Bộ lọc</span>
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => setFilterDrawerVisible(false)}
                />
              </div>
            }
            placement="left"
            onClose={() => setFilterDrawerVisible(false)}
            open={filterDrawerVisible}
            width={320}
            closeIcon={null} 
            className="lg:hidden"
          >
            <FilterSection
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              brandSearch={brandSearch}
              setBrandSearch={setBrandSearch}
              resetFilters={resetFilters}
            />
          </Drawer>

          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {paginatedData.map((item) => (
                <HomestayItem key={item.id} data={item} />
              ))}
            </div>

            {filteredData.length > itemsPerPage && (
              <div className="mt-8 lg:mt-12 flex justify-center">
                <Pagination
                  current={currentPage}
                  onChange={handlePageChange}
                  total={filteredData.length}
                  pageSize={itemsPerPage}
                  showSizeChanger={false}
                  responsive={true}
                  showQuickJumper={false}
                  className="!text-sm"
                  itemRender={(page, type, originalElement) => {
                    if (type === "prev" || type === "next") {
                      return (
                        <Button
                          className="!w-8 !h-8 !rounded-full !flex !items-center !justify-center 
                                     !bg-white !border-gray-300 hover:!border-green-500 hover:!text-green-700"
                          icon={
                            type === "prev" ? (
                              <LeftOutlined className="!text-gray-600 !text-sm" />
                            ) : (
                              <RightOutlined className="!text-gray-600 !text-sm" />
                            )
                          }
                        />
                      );
                    }
                    return originalElement;
                  }}
                />
              </div>
            )}

            {filteredData.length === 0 && (
              <div className="text-center py-12 lg:py-16">
                <div className="text-gray-400 text-6xl mb-4">🏠</div>
                <Title level={4} className="!text-gray-500 !mb-2">
                  Không tìm thấy kết quả phù hợp
                </Title>
                <Text className="!text-gray-400">
                  Thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .ant-pagination-item {
            min-width: 28px !important;
            height: 28px !important;
            line-height: 26px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}