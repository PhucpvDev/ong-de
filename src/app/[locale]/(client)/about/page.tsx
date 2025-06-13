"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const Banner = dynamic(() => import('@/components/pageAbout/banner'), { ssr: false });
const VisionSection = dynamic(() => import('@/components/pageAbout/visionSection'), { ssr: false });
const LandingSection = dynamic(() => import('@/components/pageAbout/landingSection'), { ssr: false });
const CardSection = dynamic(() => import('@/components/pageAbout/cardSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function CartPage() {
    return (
        <>
            <Navbar />
            <Banner />
            <CardSection />
            <LandingSection />
            <VisionSection />
            <Footer />
        </>
    );
}