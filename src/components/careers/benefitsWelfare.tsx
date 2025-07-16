"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Typography, ConfigProvider } from "antd";
import Image from "next/image";
import { useLocale } from "next-intl";
import { BenefitsWelfareTranslation } from "@/types/directus/careers/benefitsWelfare";
import { GetBenefitsWelfare } from "@/lib/directus/careers/benefitsWelfare";

const { Title, Paragraph } = Typography;


export default function BenefitsWelfare() {
    const locale = useLocale();
    const [benefits, setBenefits] = useState<BenefitsWelfareTranslation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBenefits() {
            try {
                setLoading(true);
                const data = await GetBenefitsWelfare(locale);
                if (data) {
                    setBenefits(data);
                } else {
                    setError("No benefits data available.");
                }
            } catch (err) {
                console.error("Failed to fetch benefits data:", err);
                setError("Failed to load benefits. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchBenefits();
    }, [locale]);

    if (error || benefits.length === 0) {
        return (
            <div className="text-center py-12 text-gray-600">
                {error || "No benefits data available."}
            </div>
        );
    }

    return (
        <ConfigProvider>
            <div className="max-w-7xl mx-auto py-24 md:px-6 px-4 relative">
                <div className="absolute inset-0 -z-10 mt-30 mr-40">
                    <Image
                        alt="Background Image for Ong De Eco-Tourism Village"
                        src="https://res.klook.com/image/upload/v1488362758/aboutus/mission-bg.png"
                        className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                        width={1200}
                        height={500}
                        priority
                    />
                </div>
                <Title level={1} className="!text-center !text-2xl md:!text-3xl !mb-16">
                    {locale === "vi" ? (
                        <>Đãi ngộ & Phúc lợi tại <span className="text-green-600">Ông Đề</span></>
                    ) : locale === "en" ? (
                        <>Benefits & Welfare at <span className="text-green-600">Ong De</span></>
                    ) : locale === "zh" ? (
                        <>在<span className="text-green-600">翁德</span>的福利待遇</>
                    ) : locale === "ko" ? (
                        <><span className="text-green-600">옹 데</span>의 혜택 및 복지</>
                    ) : (
                        <>Benefits & Welfare at <span className="text-green-600">Ong De</span></>
                    )}
                </Title>

                <Row gutter={[24, 24]} className="bg-gradient-to-b from-green-100/20 to-blue-50/40">
                    {benefits.map((benefit) => (
                        <Col xs={24} md={12} lg={8} key={benefit.id}>
                            <div className="!h-full !border-0 !shadow-none !rounded-2xl !transition-shadow !duration-300">
                                <div className="flex flex-col">
                                    <div className="mb-6">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${benefit.image_icon}`}
                                            alt={benefit.title}
                                            width={50}
                                            height={50}
                                            className="!w-16 !h-16 rounded-full !object-contain"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://placehold.co/50x50";
                                            }}
                                        />
                                    </div>
                                    <Title level={3} className="!text-lg !mb-4 !leading-tight">
                                        {benefit.title}
                                    </Title>
                                    <Paragraph className="!text-gray-700 font-medium !max-w-sm !text-sm !mb-0">
                                        {benefit.description}
                                    </Paragraph>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </ConfigProvider>
    );
}