"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const ServiceBanner = dynamic(() => import('@/components/services/serviceBanner'), { ssr: false });
const TourList = dynamic(() => import('@/components/services/tourList'), { ssr: false });
const GardenHopOnHopOff = dynamic(() => import('@/components/services/gardenHopOnHopOff'), { ssr: false });
const FestivalExperience = dynamic(() => import('@/components/services/festivalExperience'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <ServiceBanner />
            <TourList />
            <GardenHopOnHopOff />
            <FestivalExperience />
            <Footer />
        </>
    );
}