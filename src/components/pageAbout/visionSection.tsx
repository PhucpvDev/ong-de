"use client";
import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { GetEcotourismSections } from '@/lib/directus/about/ecotourismSections';
import { EcotourismSectionTranslation } from '@/types/directus/about/ecotourismSections';
import Image from 'next/image';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { useLocale } from 'next-intl';
const { Title, Paragraph } = Typography;

export default function OngDeEcotourismSection() {
  const locale = useLocale();
  const [sections, setSections] = useState<EcotourismSectionTranslation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSections() {
      try {
        const data = await GetEcotourismSections(locale); 
        if (data) {
          setSections(data);
        }
      } catch (error) {
        console.error('Failed to fetch ecotourism sections:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSections();
  }, []);

  const parseContent = (content: string) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    const parsedContent = parse(sanitizedContent, {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'div' && domNode.attribs.class?.includes('ant-typography')) {
          return (
            <Paragraph className="text-gray-700 text-sm sm:text-base mb-6 font-medium">
              {(() => {
                const child = domNode.children?.[0];
                if (child && 'data' in child) {
                  return (child as any).data;
                }
                if (child && 'children' in child && Array.isArray((child as any).children) && (child as any).children[0] && 'data' in (child as any).children[0]) {
                  return (child as any).children[0].data;
                }
                const getText = (node: any): string =>
                  node.type === 'text'
                    ? node.data
                    : node.children
                    ? node.children.map(getText).join('')
                    : '';
                return getText(domNode);
              })()}
            </Paragraph>
          );
        }
        if (domNode.type === 'tag' && domNode.name === 'li') {
          return (
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <span className="text-green-500 text-lg sm:text-xl">
                  <CheckCircleOutlined />
                </span>
              </div>
              <Paragraph className="text-gray-700 text-sm sm:text-base leading-relaxed mb-0 flex-1">
                {domNode.children[0] && domNode.children[0].type === 'text'
                  ? (domNode.children[0] as any).data
                  : ''}
              </Paragraph>
            </div>
          );
        }
        return domNode;
      },
    });
    return <div className="space-y-4">{parsedContent}</div>;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sections.length) {
    return <div>No data available.</div>;
  }

  const fallbackAchievements = [
    {
      text: "Điểm đến du lịch sinh thái hàng đầu tại Phong Điền, Cần Thơ, thu hút hàng ngàn du khách mỗi năm.",
    },
    {
      text: "Gìn giữ và lan tỏa văn hóa miền Tây qua các hoạt động dân dã và trải nghiệm sông nước độc đáo.",
    },
    {
      text: "Phát triển du lịch bền vững, kết nối cộng đồng địa phương với thiên nhiên và văn hóa bản địa.",
    },
  ];

  return (
    <div className="max-w-7xl md:px-4 px-4 mx-auto py-8 -mb-[600px] md:py-16">
      <Title level={2} className="!text-xl md:!text-3xl py-5 text-center mt-8 pb-10">
        {locale === "vi" ? (
          <>Về làng du lịch <span className="text-green-700">Ông Đề</span></>
        ) : locale === "en" ? (
          <>About <span className="text-green-700">Ong De</span> Tourism Village</>
        ) : locale === "zh" ? (
          <>关于<span className="text-green-700">翁德</span>旅游村</>
        ) : locale === "ko" ? (
          <> <span className="text-green-700">옹 데</span> 관광 마을에 대해</>
        ) : (
          <>About <span className="text-green-700">Ong De</span> Tourism Village</>
        )}
      </Title>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">
        <div className="relative order-first sm:order-first lg:order-none">
          <div className="relative rounded-3xl overflow-hidden bg-white">
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${sections[0]?.images || '01c4e6d7-23e2-4156-ad97-64ac41af0290'}`}
              alt="Ông Đề Ecotourism Village in Cần Thơ"
              className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover"
              width={600}
              height={300}
            />
          </div>
        </div>

        <div className="max-w-lg space-y-6 sm:space-y-8 rounded-lg z-10 px-4 sm:px-0 order-last sm:order-last lg:order-none">
          <div>
            <Paragraph className="text-gray-600 text-sm sm:text-base mb-4 font-medium">
              {sections[0]?.description || 'Tọa lạc tại xã Mỹ Khánh, huyện Phong Điền, cách trung tâm Cần Thơ chỉ 7km, Làng Du Lịch Sinh Thái Ông Đề là điểm đến lý tưởng để khám phá vẻ đẹp thiên nhiên và văn hóa miền Tây. Với không gian xanh mát trải rộng 2,5 ha, Ông Đề mang đến trải nghiệm gần gũi, đậm chất sông nước.'}
            </Paragraph>
            <Title
              level={4}
              className="text-xl sm:text-2xl lg:text-4xl font-bold text-green-700 leading-tight mb-6"
            >
              {sections[0]?.title || '"Ông Đề – Nơi lưu giữ tinh hoa văn hóa và thiên nhiên Cần Thơ."'}
            </Title>
          </div>
          <div>
            {sections[0]?.content ? parseContent(sections[0].content) : (
              <>
                <Paragraph className="text-gray-700 text-sm sm:text-base mb-6 font-medium">
                  Ông Đề cam kết mang đến những trải nghiệm độc đáo, gắn kết du khách với văn hóa và thiên nhiên:
                </Paragraph>
                <div className="space-y-4">
                  {fallbackAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <span className="text-green-500 text-lg sm:text-xl">
                          <CheckCircleOutlined />
                        </span>
                      </div>
                      <Paragraph className="text-gray-700 text-sm sm:text-base leading-relaxed mb-0 flex-1">
                        {achievement.text}
                      </Paragraph>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="relative bg-white md:block hidden rounded-lg -top-152 h-[520px] left-125 p-6 pl-20"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center mt-8 sm:mt-0 lg:-mt-[570px]">
        <div className="max-w-lg space-y-6 sm:space-y-0 lg:space-y-8 bg-white rounded-lg z-10 px-4 sm:px-0 order-last sm:order-first lg:order-none">
          <div>
            <Paragraph className="text-gray-600 text-sm sm:text-base mb-4 font-medium">
              {sections[1]?.description || 'Du khách đến Ông Đề sẽ được hòa mình vào các hoạt động dân dã như tát mương bắt cá, chèo xuồng ba lá trên kênh rạch, hay thưởng thức các món ăn miền Tây đậm đà. Không gian xanh mát với những tiểu cảnh sống động là nơi lý tưởng để lưu giữ những khoảnh khắc đáng nhớ.'}
            </Paragraph>
            <Title
              level={4}
              className="text-xl sm:text-2xl lg:text-4xl font-bold text-green-700 leading-tight mb-6"
            >
              {sections[1]?.title || '"Khám phá miền Tây chân thực, trải nghiệm khó quên tại Ông Đề."'}
            </Title>
          </div>
          <div>
            {sections[1]?.content ? parseContent(sections[1].content) : (
              <>
                <div className="space-y-4">
                  {fallbackAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <span className="text-green-500 text-lg sm:text-xl">
                          <CheckCircleOutlined />
                        </span>
                      </div>
                      <Paragraph className="text-gray-700 text-sm sm:text-base leading-relaxed mb-0 flex-1">
                        {achievement.text}
                      </Paragraph>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="relative p-2 order-first sm:order-last lg:order-none">
          <div className="relative rounded-3xl overflow-hidden bg-white">
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${sections[1]?.images || '014f05b6-909e-42fd-9132-b01b7b3fb1ef'}`}
              alt="Ông Đề Ecotourism Village in Cần Thơ"
              className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover"
              width={600}
              height={300}
            />
          </div>
        </div>
        <div className="relative md:block hidden bg-white rounded-lg -top-152 h-[520px] left-25 p-6 pl-20"></div>
      </div>
    </div>
  );
}