'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isConfigured = useRef(false);

  useEffect(() => {
    if (!isConfigured.current) {
      NProgress.configure({
        showSpinner: false,
        minimum: 0.1,
        speed: 300,
        trickleSpeed: 100
      });
      isConfigured.current = true;
    }
  }, []);

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleComplete = () => NProgress.done();

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        if (link.href !== window.location.href) {
          NProgress.start();
        }
      }
    });

    window.addEventListener('beforeunload', handleComplete);
    
    return () => {
      window.removeEventListener('beforeunload', handleComplete);
      NProgress.done();
    };
  }, []);

  return <>{children}</>;
}