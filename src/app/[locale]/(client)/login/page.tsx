"use client";

import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@/components/auth/login'), { ssr: false });

export default function CartPage() {
    return (
        <>
            <Login />
        </>
    );
}