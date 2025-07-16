"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const PackagesDetail = dynamic(() => import('@/components/packagesDetails/packagesDetail'), { ssr: false });
const HomestayTourList = dynamic(() => import('@/components/packages/homestayTourList'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function PackagesPageDetails() {
    return (
        <>
            <Navbar />
            <PackagesDetail />
            <HomestayTourList />
            <Footer />
        </>
    );
}