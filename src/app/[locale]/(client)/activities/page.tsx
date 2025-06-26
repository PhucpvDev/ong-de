"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const ServiceBanner = dynamic(() => import('@/components/activities/activitiesBanner'), { ssr: false });
const TourList = dynamic(() => import('@/components/activities/tourList'), { ssr: false });
const LandingActivities = dynamic(() => import('@/components/activities/landingActivities'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function ActivitiesPage() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <ServiceBanner />
            <LandingActivities />
            <TourList />
            <Footer />
        </>
    );
}