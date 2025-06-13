"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const TourCart = dynamic(() => import('@/components/cart/tourCart'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function CartPage() {
    return (
        <>
            <Navbar />
            <TourCart />
            <Footer />
        </>
    );
}