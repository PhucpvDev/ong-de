"use client";

import React, { useState, useEffect } from "react";
import { ConfigProvider, Tabs, Button, Spin, message, Typography } from "antd";
import { useLocale } from "next-intl";
import TicketsList from "@/components/tickets/ticketsList";

const { Title, Text } = Typography

const CarRentalSearch = () => {
  const locale = useLocale()
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ticket-categories?locale=${locale}`);
        const data = await response.json();
        setCategories(data.data["ticket-categories"] || []);
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

  const tabItems = [
    {
      key: "all",
      label: (
        <span>
          Tất cả
        </span>
      ),
    },
    ...categories.map((category) => ({
      key: category.id.toString(),
      label: (
        <span>
          {category.name}
        </span>
      ),
    })),
  ];

  const handleTabChange = (key) => {
    setSelectedCategory(key);
    setHasSearched(true);
  };

  return (
    <ConfigProvider>
      <div className="max-w-7xl mx-auto md:px-6 px-4 py-10 mb-6">
        <Title level={2} className="!text-xl md:!text-3xl pb-4">
          {locale === "vi" ? (
            <>Danh sách vé của <span className="text-orange-500">Ông Đề</span></>
          ) : locale === "en" ? (
            <>List of <span className="text-orange-500">Ong De</span> Tickets</>
          ) : locale === "zh" ? (
            <> <span className="text-orange-500">翁德</span>门票列表</>
          ) : locale === "ko" ? (
            <> <span className="text-orange-500">옹 데</span> 티켓 목록</>
          ) : (
            <>List of <span className="text-orange-500">Ong De</span> Tickets</>
          )}
        </Title>
        <div className="bg-orange-50 p-4 py-10 rounded-3xl border border-dashed border-orange-400/30">
          <div>
            {loading ? (
              <div className="flex justify-center py-8">
                <Spin size="large" tip="Đang tải danh mục..." />
              </div>
            ) : (
              <>
                <Tabs
                  activeKey={selectedCategory}
                  items={tabItems}
                  type="card"
                  className="mb-6"
                  onChange={handleTabChange}
                />
              </>
            )}
          </div>

          <TicketsList
            selectedCategory={selectedCategory === "all" ? null : selectedCategory}
            hasSearched={hasSearched}
            onSearchStateChange={setHasSearched}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default CarRentalSearch;