"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const Banner = dynamic(() => import('@/components/packages/bannerCombo'), { ssr: false });
const HomestayTourList = dynamic(() => import('@/components/packages/homestayTourList'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function ComboHotels() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <Banner />
            <HomestayTourList />
            <Footer />
        </>
    );
}