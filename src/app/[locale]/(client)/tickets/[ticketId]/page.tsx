"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const TicketsDetails = dynamic(() => import('@/components/ticketsDetails/ticketsDetails'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function TicketsPageDetails() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <TicketsDetails />
            <Footer />
        </>
    );
}