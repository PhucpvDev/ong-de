"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const Banner = dynamic(() => import('@/components/policy/banner'), { ssr: false });
const PrivacyPolicy = dynamic(() => import('@/components/policy/privacyPolicy'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function CartPage() {
    return (
        <>
            <Navbar />
            <Banner />
            <PrivacyPolicy />
            <Footer />
        </>
    );
}