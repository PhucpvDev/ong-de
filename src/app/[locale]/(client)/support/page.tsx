"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const SupportBanner = dynamic(() => import('@/components/support/bannerSupport'), { ssr: false });
const VideoSupportSection = dynamic(() => import('@/components/support/videoSupportSection'), { ssr: false });
const FaqSupport = dynamic(() => import('@/components/support/faqSupport'), { ssr: false });
const SupportSection = dynamic(() => import('@/components/support/supportSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function SupportPage() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <SupportBanner />
            <VideoSupportSection />
            <SupportSection />
            <FaqSupport />
            <Footer />
        </>
    );
}