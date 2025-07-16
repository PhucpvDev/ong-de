"use client";

import React, { useState, useEffect } from "react";
import { Card, Button, Typography, Pagination, Divider } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import TicketsListSkeleton from "@/skeleton/tickets/ticketsList";
import { Ticket, BasePrice, Category } from "@/types/tickets/ticketsList";
import axios from "axios";

const { Title, Paragraph, Text } = Typography;

interface TicketsListProps {
  selectedCategory?: string;
  onSearchStateChange?: (state: boolean) => void;
  searchQuery?: string;
}

export default function TicketsList({
  selectedCategory,
  onSearchStateChange,
  searchQuery: searchQueryProp = "",
}: TicketsListProps) {
  const locale = useLocale();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(searchQueryProp);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(6);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tickets`,
          {
            params: {
              locale,
              page: currentPage,
              limit: pageSize,
              ...(selectedCategory && { category: selectedCategory }),
              ...(searchQuery &&
                searchQuery.trim() && { search: searchQuery.trim() }),
            },
          }
        );

        const data = response.data as { data?: { tickets?: Ticket[]; total?: number } };
        const ticketsData: Ticket[] = data.data?.tickets || [];
        setTickets(ticketsData);
        setTotalCount(data.data?.total || ticketsData.length);
        setLoading(false);

        if (onSearchStateChange) {
          onSearchStateChange(true);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
        setTickets([]);
        setLoading(false);
      }
    };

    fetchTickets();
  }, [locale, selectedCategory, onSearchStateChange, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const formatPrice = (price: number): string => {
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  };

  const getStartingPrice = (basePrices?: BasePrice[]): number => {
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

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <TicketsListSkeleton />;
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
              <div className="w-32 bg-green-200/80 flex flex-col items-center justify-center">
                <div className="text-center mb-4">
                  <Link href={`/tickets/${ticket.id}`}>
                    <Text className="!text-green-600 !font-bold !text-lg !block">
                      {formatPrice(getStartingPrice(ticket.base_prices))}
                    </Text>
                  </Link>
                </div>
                <Link href={`/tickets/${ticket.id}`}>
                  <Button
                    type="primary"
                    className="!bg-green-500 !border-green-500 !hover:bg-green-600 !hover:border-green-600 !rounded-lg"
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
                    <Title
                      level={5}
                      className="!text-gray-800 !text-base !font-semibold !mb-3 !leading-tight"
                    >
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
                      {ticket.categories?.map((cat) => cat.name).join(", ") ||
                        "Chưa phân loại"}
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