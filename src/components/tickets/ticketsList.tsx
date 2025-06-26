import React, { useState, useEffect } from "react";
import { Card, Button, Typography, Spin, Empty, Alert, Result, Divider, Pagination } from "antd";
import {
  TagOutlined
} from "@ant-design/icons";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";

const { Title, Paragraph, Text } = Typography;

export default function TicketsList({
  selectedCategory,
  onSearchStateChange,
  searchQuery: searchQueryProp = ""
}) {
  const locale = useLocale();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(searchQueryProp);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6); // 6 vé mỗi trang

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/tickets?locale=${locale}`;

        url += `&page=${currentPage}&limit=${pageSize}`;

        if (selectedCategory) {
          url += `&category=${selectedCategory}`;
        }

        if (searchQuery && searchQuery.trim()) {
          url += `&search=${encodeURIComponent(searchQuery.trim())}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const ticketsData = data.data?.tickets || [];

        setTickets(ticketsData);
        setTotalCount(data.data?.total || ticketsData.length);
        setLoading(false);

        if (onSearchStateChange) {
          onSearchStateChange(true);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError(error.message);
        setTickets([]);
        setLoading(false);
      }
    };

    fetchTickets();
  }, [locale, selectedCategory, onSearchStateChange, currentPage, pageSize]);

  // Reset về trang 1 khi thay đổi category hoặc search query
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  };

  const getStartingPrice = (basePrices) => {
    if (!basePrices || basePrices.length === 0) return 0;

    const normalDayPrice = basePrices.find(
      (bp) => bp.price_type?.name === "Ngày thường"
    );
    return normalDayPrice ? normalDayPrice.price : basePrices[0]?.price || 0;
  };

  const handleRetry = () => {
    if (onSearchStateChange) {
      onSearchStateChange(false);
      setTimeout(() => onSearchStateChange(true), 100);
    }
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    // Scroll to top khi chuyển trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex flex-col items-center justify-center py-12">
          <Spin size="large" tip="Đang tải vé cho bạn..." />
          <Paragraph className="mt-4 text-gray-600">
            Vui lòng đợi trong giây lát...
          </Paragraph>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto mt-10">
        <Alert
          message="Có lỗi xảy ra"
          description={`Không thể tải danh sách vé: ${error}`}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={handleRetry}>
              Thử lại
            </Button>
          }
        />
      </div>
    );
  }

  if (tickets.length === 0) {
    const isFiltered = selectedCategory;

    return (
      <div className="max-w-7xl mx-auto mt-10">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{ height: 60 }}
          description={
            isFiltered
              ? "Không tìm thấy vé phù hợp với danh mục đã chọn"
              : "Chưa có vé nào"
          }
        >
        </Empty>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-7">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            className="shadow-md hover:shadow-lg transition-all duration-300 border-none rounded-xl overflow-hidden"
            bodyStyle={{ padding: 0 }}
          >
            <div className="flex h-full">
              <div className="w-32 bg-gradient-to-b from-orange-100 to-orange-50 flex flex-col items-center justify-center p-4">
                <div className="text-center mb-4">
                  <Link href={`/tickets/${ticket.id}`}>
                    <Text className="!text-orange-600 !font-bold !text-lg !block">
                      {formatPrice(getStartingPrice(ticket.base_prices))}
                    </Text>
                  </Link>
                </div>
                <Link href={`/tickets/${ticket.id}`}>
                  <Button
                    type="primary"
                    className="!bg-orange-500 !border-orange-500 !hover:bg-orange-600 !hover:border-orange-600 !rounded-lg"
                    size="middle"
                    block
                  >
                    Chi tiết
                  </Button>
                </Link>
              </div>

              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <Link href={`/tickets/${ticket.id}`}>
                    <Title level={5} className="!text-gray-800 !text-base !font-semibold !mb-3 !leading-tight">
                      {ticket.name}
                    </Title>
                    <Paragraph
                      className="!text-gray-700 !text-sm !mb-1"
                      ellipsis={{ rows: 2, tooltip: ticket.description }}
                    >
                      {ticket.description}
                    </Paragraph>
                  </Link>
                </div>

                <div className="mt-auto">
                  <Divider className="!my-2" />
                  <div className="flex items-center gap-1">
                    <TagOutlined className="!text-gray-600 !text-xs" />
                    <Text className="!text-gray-700 !text-xs italic">
                      {ticket.categories?.map((cat) => cat.name).join(", ") || "Chưa phân loại"}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalCount > pageSize && (
        <div className="flex justify-center">
          <Pagination
            current={currentPage}
            total={totalCount}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper={totalCount > 50}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} của ${total} vé`
            }
            className="mb-8"
          />
        </div>
      )}
    </div>
  );
}