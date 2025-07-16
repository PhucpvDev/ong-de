"use client";

import React from 'react';
import { Modal, Button, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { IMAGES } from '@/constants/theme';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

export default function LoginModal({ isModalOpen, setIsModalOpen }) {
  const locale = useLocale();
  const router = useRouter();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:8000/auth/${locale}/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `http://localhost:8000/auth/${locale}/facebook`;
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      closeIcon={<CloseOutlined className="!text-gray-400 hover:!text-gray-600" />}
      className="!bg-transparent"
      styles={{
        content: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
        },
        mask: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }
      }}
      centered
      width={400}
    >
      <div className="bg-white rounded-2xl p-8 shadow-xl min-h-[500px]">
        <div className="flex mb-10 mx-auto">
          <div className="flex items-center space-x-1 mr-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
          <Image
            src={IMAGES.logo}
            alt="Homestay Overview"
            width={400}
            height={200}
            className="rounded-lg w-36 object-cover"
          />
        </div>

        <Title level={2} className="!text-xl md:!text-[22px] md:pb-7 pb-3">
          {locale === "vi" ? (
            <>Đăng nhập/Đăng ký</>
          ) : locale === "en" ? (
            <>Login/Sign Up</>
          ) : locale === "zh" ? (
            <>登录/注册</>
          ) : locale === "ko" ? (
            <>로그인/회원가입</>
          ) : (
            <>Login/Sign Up</>
          )}
        </Title>

        <div className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            className="!w-full !h-14 !bg-gray-50 !border-gray-200 !text-gray-700 hover:!bg-gray-100 !rounded-xl !flex !items-center !justify-center !font-medium !relative"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="absolute left-4">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <Text>Google</Text>
          </Button>
          <Button
            onClick={handleFacebookLogin}
            className="!w-full !h-14 !bg-blue-600 hover:!bg-blue-700 !border-blue-600 !text-white !rounded-xl !flex !items-center !justify-center !font-medium !relative"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="absolute left-4">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <Text className='!text-white'>Facebook</Text>
          </Button>
        </div>

        <div className="mt-14 text-xs text-center text-gray-500 leading-relaxed">
          <Text>
            {locale === "vi" ? (
              <>
                Bằng cách đăng ký hoặc đăng nhập, bạn đã hiểu và đồng ý với{' '}
                <Link href="/policy" className="!text-green-600 hover:!underline">
                  Điều Khoản Sử Dụng Chung
                </Link>{' '}
                và{' '}
                <Link href="/policy" className="!text-green-600 hover:!underline">
                  Chính Sách Bảo Mật
                </Link>{' '}
                của Ông Đề
              </>
            ) : locale === "en" ? (
              <>
                By signing up or logging in, you understand and agree to Ông Đề's{' '}
                <Link href="/policy" className="!text-green-600 hover:!underline">
                  Terms of Use
                </Link>{' '}
                and{' '}
                <Link href="/policy" className="!text-green-600 hover:!underline">
                  Privacy Policy
                </Link>
              </>
            ) : locale === "zh" ? (
              <>
                通过注册或登录，您表示已了解并同意翁德的{' '}
                <Link href="/policy" className="!text-green-600 hover:!underline">
                  使用条款
                </Link>{' '}
                和{' '}
                <Link href="/policy" className="!text-green-600 hover:!underline">
                  隐私政策
                </Link>
              </>
            ) : locale === "ko" ? (
              <>
                가입하거나 로그인함으로써 귀하는 옹 데의{' '}
                <Link href="/policy" className="!text-green-600 hover:!underline">
                  이용 약관
                </Link>{' '}
                및{' '}
                <Link href="/policy" className="!text-green-600 hover:!underline">
                  개인정보 보호정책
                </Link>
                에 동의합니다
              </>
            ) : (
              <>
                By signing up or logging in, you understand and agree to Ông Đề's{' '}
                <Link href="/policy" className="!text-green-600 hover:!underline">
                  Terms of Use
                </Link>{' '}
                and{' '}
                <Link href="/policy" className="!text-green-600 hover:!underline">
                  Privacy Policy
                </Link>
              </>
            )}
          </Text>
        </div>
      </div>
    </Modal>
  );
}