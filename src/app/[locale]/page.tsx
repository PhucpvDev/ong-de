"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const Banner = dynamic(() => import('@/components/theme/banner'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const WhyChooseUsWith = dynamic(() => import('@/components/about/whyChooseUs'), { ssr: false });
const ActivitiesList = dynamic(() => import('@/components/activities/tourList'), { ssr: false });
const Features = dynamic(() => import('@/components/about/features'), { ssr: false });
const LandingSection = dynamic(() => import('@/components/pageAbout/landingSection'), { ssr: false });
const RewardPackets = dynamic(() => import('@/components/packages/rewardPackages'), { ssr: false });
const TourExperience = dynamic(() => import('@/components/about/tourExperience'), { ssr: false });
const FooterCompany = dynamic(() => import('@/components/theme/footerCompany'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function MainPage() {
  return (
    <div>
      <Navbar />
      <main>
        <Banner />
        <MenuMobile />
        <WhyChooseUsWith />
        <ActivitiesList />
        <LandingSection />
        <TourExperience />
        <Features />
        <RewardPackets />
        <Footer />
      </main>
    </div>
  );
}
