"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const Banner = dynamic(() => import('@/components/homestay/banner'), { ssr: false });
const HomestayList = dynamic(() => import('@/components/homestay/homestayList'), { ssr: false });
const LandingHomeStay = dynamic(() => import('@/components/homestay/landingHomeStay'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function HomeStayPage() {
    return (
        <>
            <Navbar />
            <Banner />
            <LandingHomeStay />
            <HomestayList />
            <Footer />
        </>
    );
}