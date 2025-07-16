"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const BannerPricing = dynamic(() => import('@/components/pricing/bannerPricing'), { ssr: false });
const PricingTabs = dynamic(() => import('@/components/pricing/pricingTabs'), { ssr: false });
const PricingServices = dynamic(() => import('@/components/pricing/pricingServices'), { ssr: false });
const PricingContact = dynamic(() => import('@/components/pricing/pricingContact'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function PricingPage() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <BannerPricing />
            <PricingTabs />
            <PricingServices />
            <PricingContact />
            <Footer />
        </>
    );
}