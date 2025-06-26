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
    const localeFromParams = searchParams.get('locale');
    const defaultLocale = localeFromParams || 'vi';

    if (token) {
      localStorage.setItem('authToken', token);
      console.log('Token received and saved:', token);

      const redirectTo = '/profile';
      console.log(`Redirecting to ${redirectTo}`);
      router.push(redirectTo);
    } else {
      console.error('No token received. SearchParams:', Object.fromEntries(searchParams.entries()));
      const redirectTo = `/${defaultLocale}/`;
      console.log(`Redirecting to ${redirectTo}`);
      router.push(redirectTo);
    }
  }, [searchParams, router]);

  return (
    <div>
      <h1>Đang xử lý đăng nhập...</h1>
      <p>Query Parameters: {searchParams.toString()}</p>
      <p>Token: {searchParams.get('token') || 'Not found'}</p>
      <p>Time: {new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</p>
    </div>
  ); 
}