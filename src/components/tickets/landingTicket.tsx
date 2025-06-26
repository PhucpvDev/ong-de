"use client";

import React, { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { GetLandingTickets } from '@/lib/directus/tickets/landingTickets';
import { LandingTicketsTranslation } from '@/types/directus/tickets/landingTickets';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const { Title, Paragraph } = Typography;

export default function LandingTickets() {
  const locale = useLocale();
  const [tickets, setTickets] = useState<LandingTicketsTranslation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLandingTickets() {
      try {
        setIsLoading(true);
        const data = await GetLandingTickets(locale);
        setTickets(data || null);
      } catch (error) {
        console.error("Failed to fetch landing tickets:", error);
        setTickets(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLandingTickets();
  }, [locale]);

  if (isLoading || !tickets) {
    return (
      <div className="relative max-w-7xl mx-auto md:px-6 px-4 mb-10 bg-light-blue-50 md:pt-16 pt-10">
        <div className="grid grid-cols-1 gap-8">
          <div className="grid-item">
            <Title level={2} className="!text-xl md:!text-3xl">
              {locale === "vi" ? (
                <>Giới thiệu Vé của <span className="text-orange-500">Ông Đề</span></>
              ) : locale === "en" ? (
                <>Introduction to <span className="text-orange-500">Ong De</span> Tickets</>
              ) : locale === "zh" ? (
                <>关于<span className="text-orange-500">翁德</span>门票的介绍</>
              ) : locale === "ko" ? (
                <> <span className="text-orange-500">옹 데</span> 티켓 소개</>
              ) : (
                <>Introduction to <span className="text-orange-500">Ong De</span> Tickets</>
              )}
            </Title>
          </div>

          <div className="bg-blue-50 rounded-2xl md:p-6 p-4 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
              <div className="order-2 lg:order-1 lg:col-span-4">
                <div className="h-60 bg-gray-200 rounded-lg w-full"></div>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="text-sm h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="text-sm h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-2xl md:p-6 p-4 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
              <div className="order-1 lg:col-span-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 text-sm bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 text-sm bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="order-2 lg:col-span-4">
                <div className="h-60 bg-gray-200 rounded-lg w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto md:px-6 px-4 mb-10 bg-light-blue-50 md:pt-16 pt-10">
      <div className="grid grid-cols-1 gap-8">
        <div className="grid-item">
          <Title level={2} className="!text-xl md:!text-3xl">
            {locale === "vi" ? (
              <>Giới thiệu Vé của <span className="text-orange-500">Ông Đề</span></>
            ) : locale === "en" ? (
              <>Introduction to <span className="text-orange-500">Ong De</span> Tickets</>
            ) : locale === "zh" ? (
              <>关于<span className="text-orange-500">翁德</span>门票的介绍</>
            ) : locale === "ko" ? (
              <> <span className="text-orange-500">옹 데</span> 티켓 소개</>
            ) : (
              <>Introduction to <span className="text-orange-500">Ong De</span> Tickets</>
            )}
          </Title>
        </div>

        {tickets.map((ticket, index) => (
          <div
            key={ticket.id}
            className="rounded-2xl md:p-6 p-4"
            style={{ backgroundColor: ticket.background_color }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center">
              {ticket.image_position[0] === "left" ? (
                <>
                  <div className="order-2 lg:order-1 lg:col-span-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${ticket.images}`}
                      alt={ticket.title}
                      width={400}
                      height={200}
                      className="rounded-lg w-full h-auto min-h-60 object-cover"
                      quality={90}
                      onError={(e) => {
                        e.currentTarget.src = "https://i.pinimg.com/736x/c0/27/e4/c027e4ae29b5c771d46f39ff884815d6.jpg";
                      }}
                    />
                  </div>
                  <div className="order-1 lg:order-2 lg:col-span-6">
                    <Title level={4} className="!text-lg md:!text-xl font-bold mb-4">
                      {ticket.title}
                    </Title>
                    <Paragraph className="!text-sm leading-relaxed mb-4">
                      {parse(DOMPurify.sanitize(ticket.content))}
                    </Paragraph>
                  </div>
                </>
              ) : (
                <>
                  <div className="order-1 lg:col-span-6">
                    <Title level={4} className="!text-lg md:!text-xl font-bold mb-4">
                      {ticket.title}
                    </Title>
                    <Paragraph className="!text-sm leading-relaxed mb-4">
                      {parse(DOMPurify.sanitize(ticket.content))}
                    </Paragraph>
                  </div>
                  <div className="order-2 lg:col-span-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${ticket.images}`}
                      alt={ticket.title}
                      width={400}
                      height={200}
                      className="rounded-lg w-full h-auto min-h-60 object-cover"
                      quality={90}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}