"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const PostDetails = dynamic(() => import('@/components/posts/postDetails'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function CuisinePage() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <PostDetails />
            <Footer />
        </>
    );
}