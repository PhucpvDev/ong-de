"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const Checkout = dynamic(() => import('@/components/cart/checkout'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function CheckoutPage() {
    return (
        <>
            <Navbar />
            <Checkout />
            <Footer />
        </>
    );
}