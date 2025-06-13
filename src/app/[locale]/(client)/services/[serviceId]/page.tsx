"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const ServiceDetails = dynamic(() => import('@/components/serviceDetails/serviceDetails'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <ServiceDetails />
            <Footer />
        </>
    );
}