"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    console.log('CallbackPage useEffect is running at:', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }));
    console.log('All searchParams:', Object.fromEntries(searchParams.entries()));

    const token = searchParams.get('token') || searchParams.get('code');
    const expiresIn = searchParams.get('expires_in');
    const localeFromParams = searchParams.get('locale');
    const defaultLocale = localeFromParams || 'vi';
    const error = searchParams.get('error');

    if (token) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('expiresIn', expiresIn || '7200');
      console.log('Token received and saved:', token);

      const redirectTo = '/profile';
      console.log(`Redirecting to ${redirectTo}`);
      router.push('http://localhost:3000/vi'); // sửa này 
    }else if(error) {
      //hiện lỗi 
      console.error('Error during authentication:', error);
    }
    else {
      console.error('No token received. SearchParams:', Object.fromEntries(searchParams.entries()));
      const redirectTo = `/${defaultLocale}/`;
      console.log(`Redirecting to ${redirectTo}`);
      router.push(redirectTo);
    }
  }, [searchParams, router]);

  // xử lý state loading thì tùy

}