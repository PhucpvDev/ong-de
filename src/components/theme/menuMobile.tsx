import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeOutlined,
  AppstoreOutlined,
  TagOutlined,
  GiftOutlined,
  ReadOutlined
} from '@ant-design/icons';

export default function MenuMobile() {
  const pathname = usePathname();
  
  const menuItems = [
    {
      key: 'home',
      path: '/',
      icon: <HomeOutlined style={{ fontSize: '22px' }} />,
      label: 'Trang chủ',
    },
    {
      key: 'service',
      path: '/services',
      icon: <AppstoreOutlined style={{ fontSize: '22px' }} />,
      label: 'Dịch vụ',
    },
    {
      key: 'tickets',
      path: '/tickets',
      icon: <TagOutlined style={{ fontSize: '22px' }} />,
      label: 'Vé',
    },
    {
      key: 'packages',
      path: '/packages',
      icon: <GiftOutlined style={{ fontSize: '22px' }} />,
      label: 'Gói',
    },
    {
      key: 'posts',
      path: '/posts',
      icon: <ReadOutlined style={{ fontSize: '22px' }} />,
      label: 'Tin tức',
    },
  ];

  interface MenuItem {
    key: string;
    path: string;
    icon: React.ReactNode;
    label: string;
  }

  const checkActive = (item: MenuItem): boolean => {
    const localeMatch = pathname.match(/^\/(en|vi|zh|ko)(\/|$)/);
    const pathWithoutLocale = localeMatch ? pathname.replace(`/${localeMatch[1]}`, '') : pathname;
    return pathWithoutLocale === item.path || pathWithoutLocale.startsWith(`${item.path}/`);
  };

  return (
    <div className="fixed bottom-0 md:hidden block font-roboto left-0 right-0 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)] z-50 border-t border-gray-100">
      <div className="pb-safe">
        <div className="absolute -top-0.5 left-0 right-0 flex justify-center">
          <div className="w-10 h-0.5 bg-black rounded-full"></div>
        </div>
        
        <nav className="flex justify-between items-center px-2 pt-3 pb-2">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.path}
              className="flex flex-col items-center justify-center py-1.5 px-1 w-1/5"
            >
              <div 
                className={`flex justify-center items-center ${
                  checkActive(item) ? 'bg-[#fff0e8] rounded-full' : ''
                }`}
              >
                <span className={checkActive(item) ? 'text-[#f26a22]' : 'text-gray-500'}>
                  {item.icon}
                </span>
              </div>
              <span 
                className={`text-xs mt-0.5 font-medium ${
                  checkActive(item) ? 'text-[#f26a22]' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}