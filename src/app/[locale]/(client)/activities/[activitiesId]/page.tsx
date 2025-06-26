"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const ActivitiesDetails = dynamic(() => import('@/components/activitiesDetails/activitiesDetails'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function ActivitiesPageDetails() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <ActivitiesDetails />
            <Footer />
        </>
    );
}