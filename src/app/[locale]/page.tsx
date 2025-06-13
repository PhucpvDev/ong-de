"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/theme/navbar'), { ssr: false });
const Banner = dynamic(() => import('@/components/theme/banner'), { ssr: false });
const MenuMobile = dynamic(() => import('@/components/theme/menuMobile'), { ssr: false });
const WhyChooseUsWith = dynamic(() => import('@/components/about/whyChooseUs'), { ssr: false });
const FeaturedServices = dynamic(() => import('@/components/about/featuredServices'), { ssr: false });
const Features = dynamic(() => import('@/components/about/features'), { ssr: false });
const TourExperience = dynamic(() => import('@/components/about/tourExperience'), { ssr: false });
const Footer = dynamic(() => import('@/components/theme/footer'), { ssr: false });

export default function MainPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Banner />
        <MenuMobile />
        <WhyChooseUsWith />
        <FeaturedServices />
        <Features />
        <TourExperience />
        <Footer />
      </main>
    </div>
  );
}
