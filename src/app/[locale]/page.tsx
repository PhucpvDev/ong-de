"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const Banner = dynamic(() => import('@/components/theme/banner'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const BusinessTabsSection = dynamic(() => import('@/components/about/businessTabsSection'), { ssr: false });
const HomestayTourList = dynamic(() => import('@/components/packages/homestayTourList'), { ssr: false });
const Features = dynamic(() => import('@/components/about/features'), { ssr: false });
const LandingSection = dynamic(() => import('@/components/pageAbout/landingSection'), { ssr: false });
const FeaturedPackage = dynamic(() => import('@/components/packages/featuredPackage'), { ssr: false });
const RewardPackets = dynamic(() => import('@/components/packages/rewardPackages'), { ssr: false });
const EcoTravelExperience = dynamic(() => import('@/components/about/ecoTravelExperience'), { ssr: false });
const TourExperience = dynamic(() => import('@/components/about/tourExperience'), { ssr: false });
const CardSection = dynamic(() => import('@/components/pageAbout/cardSection'), { ssr: false });
const CustomerSection = dynamic(() => import('@/components/about/serviceSection'), { ssr: false });
const RelatedPost = dynamic(() => import('@/components/posts/relatedPost'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function MainPage() {
  return (
    <div>
      <Navbar />
      <main>
        <Banner />
        <MenuMobile />
        <CardSection />
        <BusinessTabsSection />
        <FeaturedPackage />
        {/* <HomestayTourList /> */}
        <LandingSection />
        <RelatedPost />
        {/* <Features /> */}
        <EcoTravelExperience />
        <TourExperience />
        <CustomerSection />
        <Footer />
      </main>
    </div>
  );
}
  