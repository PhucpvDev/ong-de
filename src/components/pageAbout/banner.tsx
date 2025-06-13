"use client";
import React from 'react';
import { Typography } from 'antd';
import { IMAGES } from '@/constants/theme';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

export default function SapoLandingPage() {
  return (
    <>
      <div className="h-[600px] relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            alt="Ảnh nền Làng Du Lịch Ông Đề"
            src={IMAGES.banner_1}
            layout="fill"
            objectFit="cover"
            className="opacity-80"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
      </div>

      <div className="relative shadow-xl z-20 -mt-16 sm:-mt-20 md:-mt-40 lg:-mt-80 shadow-sm w-6xl mx-auto overflow-hidden rounded-tl-[30px] sm:rounded-tl-[50px] md:rounded-tl-[75px] lg:rounded-tl-[60px] rounded-br-[30px] sm:rounded-br-[50px] md:rounded-br-[75px] lg:rounded-br-[60px] mx-4 sm:mx-auto">
        <div className="bg-white overflow-hidden border-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 order-2 lg:order-1">
              <Title level={2}>
                Làng Du Lịch Sinh Thái Ông Đề Cần Thơ
              </Title>
              <Paragraph >
                Làng du lịch sinh thái Ông Đề nằm tại xã Mỹ Khánh, huyện Phong Điền, thành phố Cần Thơ, là điểm đến lý tưởng để khám phá vẻ đẹp thiên nhiên và văn hóa miền Tây sông nước. Với không gian xanh mát, sông nước hữu tình, khu du lịch mang đến trải nghiệm độc đáo, gần gũi với thiên nhiên, kết hợp cùng các hoạt động văn hóa dân gian đặc sắc.
              </Paragraph>

              <Paragraph>
                Đến với Làng du lịch Ông Đề, du khách sẽ được tham gia vào những hoạt động thú vị như chèo xuồng ba lá len lỏi qua những con rạch nhỏ, tham quan các vườn cây ăn trái với những loại trái cây đặc sản như chôm chôm, sầu riêng, măng cụt và xoài. Bên cạnh đó, bạn còn có cơ hội thưởng thức các món ăn dân dã miền Tây như bánh xèo, cá lóc nướng trui, lẩu mắm.
              </Paragraph>
            </div>

            <div className="relative flex items-center justify-center order-1 lg:order-2 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-auto">
              <div className="absolute w-full h-full">
                <Image
                  alt="Ảnh giới thiệu Làng Du Lịch Ông Đề"
                  src="https://r2.nucuoimekong.com/wp-content/uploads/khu-du-lich-ong-de.png"
                  width={400}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
