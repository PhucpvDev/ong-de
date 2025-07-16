"use client";

import React, { useState, useEffect } from "react";
import { Badge, Pagination, Typography, Alert, Button, Input, Radio, Spin, Drawer, Result } from "antd";
import { HomeOutlined, LeftOutlined, RightOutlined, FilterOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import { Package, PackageTourItemProps } from "@/types/packages/homestayTourList";
import HomestayTourListSkeleton from "@/skeleton/packages/homestayTourList";
import { Link } from "@/i18n/routing";

const { Title, Paragraph, Text } = Typography;

const PackageTourItem: React.FC<PackageTourItemProps> = ({ data, onSelect }) => {
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
      className="rounded-lg shadow-sm mb-1 overflow-hidden h-[280px] xs:h-[320px] sm:h-[340px] md:h-[360px] lg:h-[410px] flex flex-col bg-white font-roboto cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <div className="relative flex-shrink-0">
        <Link href={`/packages/${data.id}`}>
          <div className="h-[120px] xs:h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] relative">
            <img
              src={data.main_image || "/placeholder-image.jpg"}
              alt={data.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
            />
            {data.is_featured && (
              <div className="absolute top-2 right-2">
                <Badge.Ribbon text={t("featured")} color="green">
                  <div></div>
                </Badge.Ribbon>
              </div>
            )}
          </div>
        </Link>
      </div>

      <div className="p-2 xs:p-3 sm:p-4 flex-1 flex flex-col">
        <Link href={`/packages/${data.id}`}>
          <Title level={5} className="!font-bold !cursor-pointer !text-xs sm:!text-sm md:!text-base !mb-1 !flex-shrink-0 !line-clamp-1 !text-gray-800">
            {data.title}
          </Title>
        </Link>
        <div className="mb-2 cursor-pointer flex-shrink-0">
          <Paragraph
            className="!text-xs !px-1.5 sm:!px-2 !py-0.5 !rounded !inline-flex !items-center !bg-green-100/80 !text-green-800"
          >
            {data.categories[0]?.name || t("uncategorized")}
          </Paragraph>
          {data.duration && (
            <Paragraph
              className="ml-1 !text-xs !px-1.5 sm:!px-2 !py-0.5 !rounded !inline-flex !items-center !bg-blue-50 !text-blue-800"
            >
              {data.duration}
            </Paragraph>
          )}
        </div>

        <div className="flex-1 min-h-0 mb-1">
          <Link href={`/packages/${data.id}`}>
            <Paragraph
              className="!text-xs sm:!text-sm !line-clamp-2 sm:!line-clamp-3 !leading-tight !min-h-[40px] sm:!min-h-[60px] !mb-2 !text-gray-700"
            >
              {data.summary}
            </Paragraph>
          </Link>
        </div>

        <div className="border-t pt-2 xs:pt-3 border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-end">
            <div className="flex-1">
              <div className="flex items-baseline gap-1 mb-1">
                <Text className="text-xs text-gray-500">
                  {t("from")}
                </Text>
                <Text className="font-bold !text-sm sm:!text-base md:!text-lg !text-green-600">
                  {getLowestPrice().toLocaleString("vi-VN")}₫
                </Text>
              </div>
              <Paragraph
                className="text-xs !leading-tight !text-gray-500"
              >
                {data.conditions || t("minimumPeople", { count: data.min_quantity })}
              </Paragraph>
            </div>
            <div className="ml-2">
              <Link href={`/packages/${data.id}`}>
                <Button className="!bg-green-600 hover:!bg-green-600 !text-white !px-3 !py-1.5 !rounded-lg !text-sm">
                  {t("details")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PackagesList() {
  const t = useTranslations("packages");
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Package[]>([]);
  const [priceRange, setPriceRange] = useState<string>("");
  const [customPriceRange, setCustomPriceRange] = useState<{ min: string; max: string }>({ min: "", max: "" });
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);

  useEffect(() => {
    fetchPackages();
    fetchCategories();
  }, []);

  const fetchPackages = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data && Array.isArray(data.data.packages)) {
        setPackages(data.data.packages);
        setFilteredData(data.data.packages);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError(err instanceof Error ? err.message : t("fetchPackagesError"));
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async (): Promise<void> => {
    try {
      setCategoriesLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/package-categories`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data && Array.isArray(data.data["package-categories"])) {
        setCategories(data.data["package-categories"]);
      } else {
        throw new Error("Invalid response format for categories");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategoriesError(err instanceof Error ? err.message : t("fetchCategoriesError"));
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [priceRange, customPriceRange, selectedBrand, sortOrder, searchQuery, packages]);

  const applyFilters = (): void => {
    let filtered: Package[] = [...packages];

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priceRange) {
      if (priceRange === "under-100") {
        filtered = filtered.filter((item) => getLowestPrice(item) < 100000);
      } else if (priceRange === "100-300") {
        filtered = filtered.filter((item) => getLowestPrice(item) >= 100000 && getLowestPrice(item) <= 300000);
      } else if (priceRange === "300-500") {
        filtered = filtered.filter((item) => getLowestPrice(item) >= 300000 && getLowestPrice(item) <= 500000);
      } else if (priceRange === "over-500") {
        filtered = filtered.filter((item) => getLowestPrice(item) > 500000);
      }
    } else if (customPriceRange.min || customPriceRange.max) {
      const minPrice: number = customPriceRange.min ? parseInt(customPriceRange.min.replace(/\D/g, "")) : 0;
      const maxPrice: number = customPriceRange.max ? parseInt(customPriceRange.max.replace(/\D/g, "")) : Infinity;
      filtered = filtered.filter((item) => {
        const itemPrice = getLowestPrice(item);
        return itemPrice >= minPrice && itemPrice <= maxPrice;
      });
    }

    if (selectedBrand) {
      filtered = filtered.filter((item) => item.categories[0]?.name === selectedBrand);
    }

    if (sortOrder === "price-asc") {
      filtered.sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
    } else if (sortOrder === "price-desc") {
      filtered.sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const getLowestPrice = (packageData: Package): number => {
    const prices = [
      ...packageData.base_prices.map((bp) => bp.price),
      ...packageData.capacity_prices.map((cp) => cp.price),
    ];
    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  const resetFilters = (): void => {
    setPriceRange("");
    setCustomPriceRange({ min: "", max: "" });
    setSelectedBrand("");
    setBrandSearch("");
    setSortOrder("");
    setSearchQuery("");
  };

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const paginatedData: Package[] = filteredData.slice(startIndex, endIndex);

  const handlePackageSelect = (packageData: Package): void => {
  };

  if (loading) return <HomestayTourListSkeleton />;
  if (error) return <Alert message={error} type="error" className="mx-4 sm:mx-0" />;

  return (
    <div className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 lg:mb-14">
          <Title level={2} className="!text-xl md:!text-3xl !mb-2 !text-center">
            <span className="text-green-600">{t("brandName")}</span> {t("headerTitle")}
          </Title>
        </div>

        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="hidden lg:flex items-center gap-4 flex-wrap">
              <Text strong className="!text-base !text-gray-800 mr-10">
                {t("filters")}
              </Text>
              <Button
                type="link"
                className="!text-base !text-green-600 !font-medium hover:!text-green-700"
                onClick={resetFilters}
              >
                {t("reset")}
              </Button>
              <Text className="!text-sm font-medium !text-gray-800">
                {t("sortBy")}
              </Text>
              <Button
                type={sortOrder === "price-asc" ? "primary" : "default"}
                size="middle"
                className="!rounded-lg"
                onClick={() => setSortOrder(sortOrder === "price-asc" ? "" : "price-asc")}
              >
                {t("priceLowToHigh")}
              </Button>
              <Button
                type={sortOrder === "price-desc" ? "primary" : "default"}
                size="middle"
                className="!rounded-lg"
                onClick={() => setSortOrder(sortOrder === "price-desc" ? "" : "price-desc")}
              >
                {t("priceHighToLow")}
              </Button>
            </div>

            <div className="flex lg:hidden items-center justify-between w-full">
              <Button
                type="default"
                icon={<FilterOutlined />}
                onClick={() => setFilterDrawerVisible(true)}
                className="!rounded-lg"
              >
                {t("filters")}
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  type={sortOrder === "price-asc" ? "primary" : "default"}
                  size="small"
                  onClick={() => setSortOrder(sortOrder === "price-asc" ? "" : "price-asc")}
                >
                  {t("priceUp")}
                </Button>
                <Button
                  type={sortOrder === "price-desc" ? "primary" : "default"}
                  size="small"
                  onClick={() => setSortOrder(sortOrder === "price-desc" ? "" : "price-desc")}
                >
                  {t("priceDown")}
                </Button>
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <Input
                placeholder={t("searchPlaceholder")}
                prefix={<SearchOutlined />}
                size="middle"
                className="!rounded-lg w-full sm:!w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-4">
              <div className="mb-6">
                <Title level={5} className="!mb-4 !text-gray-800">
                  {t("priceRange")}
                </Title>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      placeholder={t("minimum")}
                      value={customPriceRange.min}
                      onChange={(e) => setCustomPriceRange({ ...customPriceRange, min: e.target.value })}
                      className="!w-full"
                      suffix="₫"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder={t("maximum")}
                      value={customPriceRange.max}
                      onChange={(e) => setCustomPriceRange({ ...customPriceRange, max: e.target.value })}
                      className="!w-full"
                      suffix="₫"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Radio.Group
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="!flex !flex-col !space-y-4"
                  >
                    <Radio value="">{t("all")}</Radio>
                    <Radio value="under-100">{t("under100")}</Radio>
                    <Radio value="100-300">{t("range100300")}</Radio>
                    <Radio value="300-500">{t("range300500")}</Radio>
                    <Radio value="over-500">{t("over500")}</Radio>
                  </Radio.Group>
                </div>
              </div>

              <div className="mb-6">
                <Title level={5} className="!mb-4 !text-gray-800">
                  {t("category")}
                </Title>
                <div className="mb-3">
                  <Input
                    placeholder={t("enterCategory")}
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="!rounded-lg font-medium"
                  />
                </div>
                {categoriesLoading ? (
                  <Spin size="small" />
                ) : categoriesError ? (
                  <Alert message={categoriesError} type="error" />
                ) : (
                  <div className="space-y-3">
                    <Radio.Group
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="!flex !flex-col !space-y-4"
                    >
                      <Radio value="">{t("all")}</Radio>
                      {categories
                        .filter((category) =>
                          category.name.toLowerCase().includes(brandSearch.toLowerCase())
                        )
                        .map((category) => (
                          <Radio key={category.id} value={category.name}>
                            {category.name}
                          </Radio>
                        ))}
                    </Radio.Group>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Drawer
            title={
              <div className="flex items-center justify-between">
                <span>{t("filters")}</span>
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
            <div className="mb-6">
              <Title level={5} className="!mb-4 !text-gray-800">
                {t("priceRange")}
              </Title>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Input
                    placeholder={t("minimum")}
                    value={customPriceRange.min}
                    onChange={(e) => setCustomPriceRange({ ...customPriceRange, min: e.target.value })}
                    className="!w-full"
                    suffix="₫"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder={t("maximum")}
                    value={customPriceRange.max}
                    onChange={(e) => setCustomPriceRange({ ...customPriceRange, max: e.target.value })}
                    className="!w-full"
                    suffix="₫"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Radio.Group
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="!flex !flex-col !space-y-4"
                >
                  <Radio value="">{t("all")}</Radio>
                  <Radio value="under-100">{t("under100")}</Radio>
                  <Radio value="100-300">{t("range100300")}</Radio>
                  <Radio value="300-500">{t("range300500")}</Radio>
                  <Radio value="over-500">{t("over500")}</Radio>
                </Radio.Group>
              </div>
            </div>

            <div className="mb-6">
              <Title level={5} className="!mb-4 !text-gray-800">
                {t("category")}
              </Title>
              <div className="mb-3">
                <Input
                  placeholder={t("enterCategory")}
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="!rounded-lg font-medium"
                />
              </div>
              {categoriesLoading ? (
                <Spin size="small" />
              ) : categoriesError ? (
                <Alert message={categoriesError} type="error" />
              ) : (
                <div className="space-y-3">
                  <Radio.Group
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="!flex !flex-col !space-y-4"
                  >
                    <Radio value="">{t("all")}</Radio>
                    {categories
                      .filter((category) =>
                        category.name.toLowerCase().includes(brandSearch.toLowerCase())
                      )
                      .map((category) => (
                        <Radio key={category.id} value={category.name}>
                          {category.name}
                        </Radio>
                      ))}
                  </Radio.Group>
                </div>
              )}
            </div>
          </Drawer>

          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {paginatedData.map((item) => (
                <PackageTourItem key={item.id} data={item} onSelect={handlePackageSelect} />
              ))}
            </div>

            {filteredData.length > itemsPerPage && (
              <div className="mt-8 lg:mt-12 flex justify-center">
                <Pagination
                  current={currentPage}
                  onChange={setCurrentPage}
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
                                     !bg-white !border-gray-300 hover:!border-green-500 hover:!text-green-600"
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
                <Result
                  icon={<HomeOutlined style={{ fontSize: "48px", color: "#bfbfbf" }} />}
                  title={
                    <Title level={4} style={{ color: "#595959", marginBottom: "8px" }}>
                      {t("noResults")}
                    </Title>
                  }
                  subTitle={
                    <Text style={{ color: "#8c8c8c" }}>
                      {t("noResultsSuggestion")}
                    </Text>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ant-pagination-light .ant-pagination-item-active {
          background-color: #007F4F;
          border-color: #007F4F;
        }
        .ant-pagination-light .ant-pagination-item-active a {
          color: #fff;
        }
      `}</style>
    </div>
  );
}