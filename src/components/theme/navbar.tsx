import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ShoppingCartOutlined,
  UserOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { IMAGES } from "@/constants/theme";
import { ConfigProvider } from "antd";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import Switcher from "@/components/language/switcher";
import LoginModal from "@/components/auth/login";

type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

const defaultMenuItems: MenuItem[] = [
  { label: "Gói tiết kiệm", href: "/packages" },
  {
    label: "Dịch vụ",
    href: "/services",
    children: [
      { label: "Vé", href: "/tickets" },
      { label: "Homestay", href: "/homestay" },
      { label: "Dịch vụ cho thuê", href: "/rental-services" },
      { label: "Hoạt động & trãi nghiệm", href: "/activities" },
    ],
  },
  { label: "Tin tức", href: "/posts" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Chính sách", href: "/policy" },
  { label: "Liên hệ", href: "/contact" },
];

const aboutMenuItems: MenuItem[] = [
  { label: "Giới thiệu", href: "/about" },
  { label: "Tuyển dụng", href: "/careers" },
  { label: "Bảng giá", href: "/pricing" },
  { label: "Hỗ trợ", href: "/support" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [drawerHeight, setDrawerHeight] = useState("81vh");
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const localeMatch = pathname.match(/^\/(en|vi|zh|ko)(\/|$)/);
  const currentLocale = localeMatch ? localeMatch[1] : "vi";

  // Check if the current path matches any href in aboutMenuItems
  const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";
  const isAboutPage = aboutMenuItems.some(item => 
    pathWithoutLocale === item.href || pathWithoutLocale.startsWith(`${item.href}/`)
  );
  const menuItems = isAboutPage ? aboutMenuItems : defaultMenuItems;

  const themeConfig = {
    token: {
      colorPrimary: "#007F4F",
      borderRadius: 8,
    },
  };

  const updateDrawerHeight = () => {
    if (window.innerWidth <= 900) {
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div>
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
          <div className="hidden max-w-[900px]:hidden lg:block">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between py-2.5">
                <Link href={`/`} className="flex-shrink-0 group">
                  <Image
                    src={IMAGES.logo}
                    alt="Logo"
                    width={100}
                    height={40}
                    className="h-10 w-auto transition-transform duration-300"
                  />
                </Link>

                <ul className="flex items-center gap-4 text-sm font-medium xl:gap-4 xl:text-base">
                  {menuItems.map((item, index) => (
                    <li key={index} className="relative group">
                      {item.children ? (
                        <div className="px-3 py-2 rounded-tr-lg rounded-tl-lg relative transition-all duration-200 text-gray-800 hover:bg-gray-50 xl:px-4">
                          <span className="flex items-center gap-2 cursor-pointer">
                            {item.label}
                            <span className="text-xs text-gray-600 transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:text-green-600 xl:text-sm"><CaretDownOutlined /></span>
                          </span>
                          <div
                            className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-700 transition-all duration-300 transform -translate-x-1/2 ${isActive(item.href) ? "w-full" : "group-hover:w-full"
                              }`}
                          ></div>
                          <ul className="absolute left-0 top-full mt-2 w-56 bg-white shadow-2xl rounded-xl py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out translate-y-2 group-hover:translate-y-0 z-50 border-t-4 border-green-500">
                            {item.children.map((child, childIndex) => (
                              <li key={childIndex}>
                                <Link
                                  href={child.href}
                                  className={`block px-6 py-3 text-gray-800 hover:bg-green-100 hover:text-green-700 transition-all duration-200 font-medium text-xs xl:text-sm ${isActive(child.href) ? "bg-green-100 text-green-700" : ""
                                    }`}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`px-3 py-2 rounded-tr-lg rounded-tl-lg group relative transition-all duration-200 text-gray-800 hover:bg-gray-50 xl:px-4 ${isActive(item.href) ? "bg-gray-50 text-green-600" : ""
                            }`}
                        >
                          <span className="relative z-10">{item.label}</span>
                          <div
                            className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-700 transition-all duration-300 transform -translate-x-1/2 ${isActive(item.href) ? "w-full" : "group-hover:w-full"
                              }`}
                          ></div>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 xl:gap-4">
                  <Switcher />
                  {/* <Link
                    href={"/cart"}
                    className="relative p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  >
                    <ShoppingCartOutlined className="text-xl xl:text-2xl" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </Link> */}

                  <div className="flex items-center gap-2 xl:gap-3">
                    <span
                      onClick={showModal}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs rounded-full px-3 py-2 cursor-pointer font-semibold transition-all duration-200 xl:text-sm xl:px-3.5 xl:py-2.5"
                    >
                      Đăng nhập
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex max-w-[900px]:flex lg:hidden items-center justify-between px-3 py-3">
            <div className="flex items-center gap-4">
              <Link href={`/${currentLocale}`} className="flex-shrink-0">
                <Image
                  src={IMAGES.logo}
                  alt="Logo"
                  width={80}
                  height={32}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <span
                onClick={showModal}
                className="p-2 relative cursor-pointer transition-colors text-gray-600 hover:text-green-600"
              >
                <UserOutlined className="!text-xl" />
              </span>
            </div>
          </div>
        </div>
        <LoginModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </ConfigProvider>
  );
}