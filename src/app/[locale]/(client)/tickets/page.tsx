"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const TicketsBanner = dynamic(() => import('@/components/tickets/ticketsBanner'), { ssr: false });
const LangdingTicket = dynamic(() => import('@/components/tickets/landingTicket'), { ssr: false });
const TicketsTabs = dynamic(() => import('@/components/tickets/tabsTickets'), { ssr: false });
const TicketsFaq = dynamic(() => import('@/components/tickets/ticketsFaq'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function TicketsPage() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <TicketsBanner />
            <LangdingTicket />
            <TicketsTabs />
            <TicketsFaq />
            <Footer />
        </>
    );
}