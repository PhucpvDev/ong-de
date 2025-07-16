"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const CareerBanner = dynamic(() => import('@/components/careers/careerBanner'), { ssr: false });
const BenefitsWelfare = dynamic(() => import('@/components/careers/benefitsWelfare'), { ssr: false });
const RecommendedJobs = dynamic(() => import('@/components/careers/recommendedJobs'), { ssr: false });
const CustomerCareers = dynamic(() => import('@/components/careers/customerCareers'), { ssr: false });
const StayInSection = dynamic(() => import('@/components/careers/stayInSection'), { ssr: false });
const ApplicationForm = dynamic(() => import('@/components/careers/applicationForm'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function CareersPage() {
    return (
        <>
            <Navbar />
            <MenuMobile />
            <CareerBanner />
            <BenefitsWelfare />
            <RecommendedJobs />
            <CustomerCareers />
            <StayInSection />
            <ApplicationForm />
            <Footer />
        </>
    );
}