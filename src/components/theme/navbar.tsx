import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IMAGES } from "@/constants/theme";
import { ConfigProvider } from "antd";
import Link from "next/link";
import Image from "next/image";
import Switcher from "@/components/language/switcher";

const menuItems = [
  {
    label: "Hoạt động & Trải nghiệm",
    href: "/services",
  },
  { label: "Vé tham quan", href: "/tickets" },
  { label: "Gói tiết kiệm", href: "/packages" },
  { label: "Tin tức", href: "/posts" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Chính sách", href: "/policy" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [drawerHeight, setDrawerHeight] = useState("81vh");
  const [isClient, setIsClient] = useState(false);

  const localeMatch = pathname.match(/^\/(en|vi|zh|ko)(\/|$)/);
  const currentLocale = localeMatch ? localeMatch[1] : "vi";

  const themeConfig = {
    token: {
      colorPrimary: "#FFC800",
      borderRadius: 8,
    },
  };

  const updateDrawerHeight = () => {
    if (window.innerWidth <= 768) {
      setDrawerHeight("80vh");
    } else {
      setDrawerHeight("91vh");
    }
  };

  useEffect(() => {
    setIsClient(true);
    updateDrawerHeight();
    window.addEventListener("resize", updateDrawerHeight);
    return () => window.removeEventListener("resize", updateDrawerHeight);
  }, []);

  const isActive = (href: string) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";
    return pathWithoutLocale === href || pathWithoutLocale.startsWith(`${href}/`);
  };

  const getLocalizedHref = (href: string) => {
    return `/${currentLocale}${href}`;
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div>
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
          <div className="hidden md:block">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between py-2.5">
                <Link href={`/${currentLocale}`} className="flex-shrink-0 group">
                  <Image
                    src={IMAGES.logo}
                    alt="Logo"
                    width={100}
                    height={40}
                    className="h-10 w-auto transition-transform duration-300"
                  />
                </Link>

                <ul className="flex items-center gap-4 text-base font-medium">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={getLocalizedHref(item.href)} 
                        className={`px-3 py-2 rounded-lg group relative transition-all duration-200 text-gray-700 hover:bg-gray-50 ${isActive(item.href) ? "bg-gray-100 text-orange-400" : ""
                          }`}
                      >
                        <span className="relative z-10">{item.label}</span>
                        <div
                          className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-500 transition-all duration-300 transform -translate-x-1/2 ${isActive(item.href) ? "w-full" : "group-hover:w-full"
                            }`}
                        ></div>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  <Switcher />
                  <Link
                    href={getLocalizedHref("/cart")} 
                    className="relative p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  >
                    <ShoppingCartOutlined className="text-2xl" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </Link>

                  <div className="flex items-center gap-3">
                    <Link href={getLocalizedHref("/login")}>
                      <span className="bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-full px-3.5 py-2.5 cursor-pointer font-semibold transition-all duration-200">
                        Đăng nhập
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex md:hidden items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Link href={`/${currentLocale}`} className="flex-shrink-0">
                <Image
                  src={IMAGES.logo}
                  alt="Logo"
                  width={80}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={getLocalizedHref("/cart")}
                className="p-2 relative transition-colors text-gray-600 hover:text-yellow-500"
              >
                <ShoppingCartOutlined className="text-xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              <Link
                href={getLocalizedHref("/login")}
                className="p-2 relative transition-colors text-gray-600 hover:text-yellow-500"
              >
                <UserOutlined className="text-xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}