"use client";

import { IMAGES } from "@/constants/theme";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ConfigProvider } from "antd";
import Contact from "@/components/contact/contactForm";

const footerLinks = {
  aboutUs: [
    { title: "aboutTitle", link: "/about-us", label: "Về chúng tôi" },
    { title: "blog", link: "/blog", label: "Ông Đề Blog" },
    { title: "sustainableTourism", link: "/sustainable-tourism", label: "Du lịch bền vững" },
  ],
  partners: [
    { title: "supplierRegistration", link: "/supplier-registration", label: "Đăng ký nhà cung cấp" },
    { title: "partnerLogin", link: "/partner-login", label: "Đối tác đăng nhập" },
    { title: "partnerAffiliate", link: "/partner-affiliate", label: "Đối tác liên kết" },
    { title: "influencerProgram", link: "/influencer-program", label: "Chương trình cho người nổi tiếng" },
    { title: "agentProgram", link: "/agent-program", label: "Chương trình cho đại lý" },
  ],
  terms: [
    { title: "termsOfUse", link: "/terms", label: "Điều khoản sử dụng" },
    { title: "privacyPolicy", link: "/privacy-policy", label: "Chính sách bảo mật thông tin" },
    { title: "rulesAndRegulations", link: "/rules", label: "Chính sách và quy định" },
    { title: "collaborators", link: "/collaborators", label: "Công tác viên" },
  ],
};

const paymentMethods = [
  { icon: IMAGES.logo, name: "JCB" },
  { icon: IMAGES.logo, name: "PayPal" },
  { icon: IMAGES.logo, name: "Visa" },
];

export default function Footer() {
  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
      borderRadius: 8,
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <Contact />
      <footer className="py-16 md:pt-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src={IMAGES.logo}
                    alt="Ông Đề Logo"
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  <h3 className="text-2xl font-bold text-gray-100">
                    Ông Đề
                  </h3>
                </div>
                <p className="text-base text-gray-400 mb-6 leading-relaxed max-w-md">
                  Khám phá khu du lịch sinh thái đầy đủ tất cả đặc trưng của miền sông nước Nam Bộ với vườn trái cây, trò chơi dân gian và ẩm thực miền Tây.
                </p>
                <div className="flex-wrap gap-4">
                  <div className="flex mb-4 items-center gap-2 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">Xã Mỹ Khánh, Phong Điền, Cần Thơ</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-sm">0292 123 456</span>
                  </div>
                </div>
              </div>

              {Object.entries(footerLinks).map(([section, links]) => (
                <div key={section}>
                  <h4 className="text-lg font-semibold text-gray-100 mb-4">
                    {section === "aboutUs" ? "VỀ ÔNG ĐỀ" : section === "partners" ? "ĐỐI TÁC" : "ĐIỀU KHOẢN"}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.link}
                          className="text-base text-gray-400 hover:text-gray-200 transition-all duration-200 hover:underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row justify-between mb-12">
              <div>
                <h4 className="text-lg font-semibold text-gray-100 mb-6">
                  KÊNH THANH TOÁN
                </h4>
                <div className="flex flex-wrap gap-3">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center bg-gray-700/50 border-gray-600 border rounded-lg p-3 hover:shadow-md transition-all duration-200 w-16 h-12"
                    >
                      <Image
                        src={method.icon}
                        alt={method.name}
                        width={32}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-100 mb-6">
                  THEO DÕI CHÚNG TÔI
                </h4>
                <div className="flex gap-4">
                  {["facebook", "instagram", "youtube", "tiktok"].map(
                    (platform) => (
                      <Link
                        key={platform}
                        href={`https://${platform}.com`}
                        className="w-12 h-12 rounded-full bg-gray-700/50 hover:bg-gray-600 flex items-center justify-center transition-all duration-200"
                      >
                        <svg
                          className="w-6 h-6 text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between pt-6 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <p className="text-sm text-gray-400">
                  © 2025 Ông Đề. All Rights Reserved.
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-gray-200 transition-all duration-200"
                >
                  Điều khoản
                </Link>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-gray-200 transition-all duration-200"
                >
                  Bảo mật
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </ConfigProvider>
  );
}