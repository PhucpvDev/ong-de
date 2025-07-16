"use client";

import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { GetLandingTickets } from '@/lib/directus/tickets/landingTickets';
import { LandingTicketsTranslation } from '@/types/directus/tickets/landingTickets';
import SkeletonLandingSection from '@/skeleton/landingSection/landing';
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
     return <SkeletonLandingSection />;
  }

  return (
    <div className="relative max-w-7xl mx-auto md:px-6 px-4 mb-10 bg-light-blue-50 md:pt-16 pt-10">
      <div className="grid grid-cols-1 gap-8">
        <div className="grid-item -mb-1 text-center">
          <Title level={2} className="!text-xl md:!text-3xl">
            {locale === "vi" ? (
              <>Giới thiệu Vé của <span className="text-green-700">Ông Đề</span></>
            ) : locale === "en" ? (
              <>Introduction to <span className="text-green-700">Ong De</span> Tickets</>
            ) : locale === "zh" ? (
              <>关于<span className="text-green-700">翁德</span>门票的介绍</>
            ) : locale === "ko" ? (
              <> <span className="text-green-700">옹 데</span> 티켓 소개</>
            ) : (
              <>Introduction to <span className="text-green-700">Ong De</span> Tickets</>
            )}
          </Title>
        </div>

        {tickets.map((ticket) => (
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