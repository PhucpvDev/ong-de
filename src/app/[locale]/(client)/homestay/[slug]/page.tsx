"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const HomeStayDetails = dynamic(() => import('@/components/homestayDetail/homestayDetail'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function HomeStayDetailsPage() {
    return (
        <>
            <Navbar />
            <HomeStayDetails />
            <Footer />
        </>
    );
}