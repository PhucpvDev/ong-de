"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const PostList = dynamic(() => import('@/components/posts/postList'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function PostsPage() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <PostList />
            <Footer />
        </>
    );
}