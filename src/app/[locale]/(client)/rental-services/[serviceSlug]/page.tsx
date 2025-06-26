"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const DetailService = dynamic(() => import('@/components/rentalServicesDetail/detailService'), { ssr: false });
const ListServices = dynamic(() => import('@/components/rentalServices/listServices'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function RentalServicesPage() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <DetailService />
            <ListServices />
            <Footer />
        </>
    );
}