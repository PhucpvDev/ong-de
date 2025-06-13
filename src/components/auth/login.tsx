import React from 'react';
import { LeftOutlined, FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import { IMAGES } from '@/constants/theme';
import Image from 'next/image';

export default function Login() {
  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  const handleBack = () => {
    console.log('Going back...');
  };

  return (
    <div className="bg-white">
      <div
        className="px-4 py-2 sm:py-3 w-28 sm:w-32 absolute top-7 md:left-4 sm:ml-10 cursor-pointer"
        onClick={() => window.history.back()}
      >
        <div className="flex items-center text-blue-700 hover:text-blue-900 transition-colors duration-200">
          <button className="flex items-center cursor-pointer">
            <LeftOutlined className="mr-1 sm:mr-2 text-sm sm:text-base" />
            <span className="text-base sm:text-lg font-medium">Quay lại</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-24 md:py-32">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10">
            
            <div className="text-center mb-10">
              <Image
                src={IMAGES.logo}
                alt="Ông Đề Logo"
                width={140}
                height={50}
                className="mx-auto"
              />
            </div>

            <div className="text-center mb-10">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                Đăng nhập
              </h1>
              <p className="text-gray-600 text-base font-medium">
                Chọn phương thức đăng nhập của bạn
              </p>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="w-full flex items-center justify-center gap-4 px-6 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                <GoogleOutlined className="text-2xl" style={{ color: '#4285F4' }} />
                <span className="text-lg font-medium text-gray-700">Đăng nhập với Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                className="w-full flex items-center justify-center gap-4 px-6 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                <span className="text-2xl text-blue-600"><FacebookOutlined /></span>
                <span className="text-lg font-medium text-gray-700">Đăng nhập với Facebook</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 leading-relaxed">
                Bằng cách đăng nhập, bạn đồng ý với{' '}
                <button className="text-blue-600 cursor-pointer hover:text-blue-800 underline hover:no-underline transition-colors duration-200">
                  Điều khoản sử dụng
                </button>{' '}
                và{' '}
                <button className="text-blue-600 cursor-pointer hover:text-blue-800 underline hover:no-underline transition-colors duration-200">
                  Chính sách bảo mật
                </button>{' '}
                của Ông Đề
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};