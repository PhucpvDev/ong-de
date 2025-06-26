"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const ServiceBanner = dynamic(() => import('@/components/rentalServices/bannerServices'), { ssr: false });
const LandingServices = dynamic(() => import('@/components/rentalServices/landingServices'), { ssr: false });
const ListServices = dynamic(() => import('@/components/rentalServices/listServices'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function RentalServicesPage() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <ServiceBanner />
            <LandingServices />
            <ListServices />
            <Footer />
        </>
    );
}