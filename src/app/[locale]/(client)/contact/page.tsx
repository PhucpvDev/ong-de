"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const Banner = dynamic(() => import('@/components/contacts/bannerContact'), { ssr: false });
const SupportContactSection = dynamic(() => import('@/components/contacts/supportContact'), { ssr: false });
const ContactForm = dynamic(() => import('@/components/contacts/contactForm'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <Banner />
            <SupportContactSection/>
            <ContactForm />
            <Footer />
        </>
    );
}