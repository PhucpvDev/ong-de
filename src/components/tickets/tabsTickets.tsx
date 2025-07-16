"use client";

import React, { useState, useEffect } from "react";
import { ConfigProvider, Tabs, message, Typography } from "antd";
import axios from "axios";
import { useLocale } from "next-intl";
import TicketsList from "@/components/tickets/ticketsList";
import CarRentalSearchSkeleton from "@/skeleton/tickets/tabsTickets";
import { TicketCategory } from "@/types/tickets/tabsTickets";

const { Title } = Typography;

export default function CarRentalSearch () {
  const locale = useLocale();
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/ticket-categories`,
          {
            params: { locale },
          }
        );
        const data = response.data as { data?: { ["ticket-categories"]?: TicketCategory[] } };
        setCategories(data.data?.["ticket-categories"] || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ticket categories:", error);
        message.error("Không thể tải danh mục vé. Vui lòng thử lại sau.");
        setCategories([]);
        setLoading(false);
      }
    };
    fetchCategories();
  }, [locale]);

  const tabItems: { key: string; label: React.ReactNode }[] = [
    {
      key: "all",
      label: (
        <span>
          {locale === "vi" ? "Tất cả" : locale === "en" ? "All" : locale === "zh" ? "全部" : locale === "ko" ? "모두" : "All"}
        </span>
      ),
    },
    ...categories.map((category) => ({
      key: category.id.toString(),
      label: <span>{category.name}</span>,
    })),
  ];

  const handleTabChange = (key: string) => {
    setSelectedCategory(key);
    setHasSearched(true);
  };

  return (
    <ConfigProvider>
      <div className="max-w-7xl mx-auto md:px-6 px-4 py-10 mb-6">
        <Title level={2} className="!text-xl md:!text-3xl pb-6 text-center">
          {locale === "vi" ? (
            <>Danh sách vé của <span className="text-green-700">Ông Đề</span></>
          ) : locale === "en" ? (
            <>List of <span className="text-green-700">Ong De</span> Tickets</>
          ) : locale === "zh" ? (
            <> <span className="text-green-700">翁德</span>门票列表</>
          ) : locale === "ko" ? (
            <> <span className="text-green-700">옹 데</span> 티켓 목록</>
          ) : (
            <>List of <span className="text-green-700">Ong De</span> Tickets</>
          )}
        </Title>
        <div className="bg-green-50 p-4 py-10 rounded-3xl border border-dashed border-green-500/30">
          <div>
            {loading ? (
              <CarRentalSearchSkeleton />
            ) : (
              <Tabs
                activeKey={selectedCategory}
                items={tabItems}
                type="card"
                className="mb-6"
                onChange={handleTabChange}
              />
            )}
          </div>

          <TicketsList
            selectedCategory={selectedCategory === "all" ? undefined : selectedCategory}
            onSearchStateChange={setHasSearched}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};
