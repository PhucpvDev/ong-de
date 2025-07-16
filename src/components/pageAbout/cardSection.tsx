"use client";
import { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import { EnvironmentFilled, RestFilled, UsergroupAddOutlined, CheckCircleFilled } from '@ant-design/icons';
import { GetCardSections } from '@/lib/directus/about/card_section';
import { CardSectionTranslation } from '@/types/directus/about/card_section';
import Image from 'next/image';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

const { Title, Text, Paragraph } = Typography;

const iconMap = {
  EnvironmentFilled: <EnvironmentFilled />,
  RestFilled: <RestFilled />,
  UsergroupAddOutlined: <UsergroupAddOutlined />,
};

export default function CardSection() {
  const locale = useLocale();
  const [sections, setSections] = useState<CardSectionTranslation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSections() {
      try {
        const data = await GetCardSections(locale);
        if (data) {
          setSections(data);
        }
      } catch (error) {
        console.error('Failed to fetch card sections:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSections();
  }, [locale]);

  const parseContent = (content: string) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    return parse(sanitizedContent, {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'p') {
          return (
            <Title
              level={3}
              className="!text-sm md:!text-base font-bold text-gray-800 !mb-4 !sm:mb-4 leading-tight"
            >
              {domNode.children[0] && domNode.children[0].type === 'text'
                ? (domNode.children[0] as any).data
                : null}
            </Title>
          );
        }
        if (domNode.type === 'tag' && domNode.name === 'li') {
          return (
            <div className="flex items-start">
              <span className="text-green-500 mr-2 text-xl">
                <CheckCircleFilled />
              </span>
              <Text className="text-gray-700 !text-sm mt-1">
                {domNode.children[0] && domNode.children[0].type === 'text'
                  ? (domNode.children[0] as any).data
                  : null}
              </Text>
            </div>
          );
        }
        return domNode;
      },
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!sections.length) {
    return <div className="text-center py-12">No data available.</div>;
  }

  return (
    <div className="relative py-6 sm:py-8 md:py-14 mt-5">
      <div className="absolute inset-0 -z-10 mt-40">
        <Image
          alt="Ảnh nền Làng Du Lịch Sinh Thái Ông Đề"
          src="https://res.klook.com/image/upload/v1488362758/aboutus/mission-bg.png"
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          width={1200}
          height={500}
          priority
        />
      </div>

      <div className="max-w-7xl text-center md:px-6 px-4 mx-auto md:pb-4">
        <Title level={2} className="!text-xl md:!text-3xl py-5">
          {locale === "vi" ? (
            <>Dịch vụ và hoạt động <span className="text-green-700">Ông Đề</span></>
          ) : locale === "en" ? (
            <>Services and Activities of <span className="text-green-700">Ong De</span></>
          ) : locale === "zh" ? (
            <> <span className="text-green-700">翁德</span>的服务与活动</>
          ) : locale === "ko" ? (
            <> <span className="text-green-700">옹 데</span>의 서비스 및 활동</>
          ) : (
            <>Services and Activities of <span className="text-green-700">Ong De</span></>
          )}
        </Title>
      </div>

      <div className="max-w-7xl md:px-6 px-4 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sections.map((section, index) => {
          const iconColor = index === 0 ? 'bg-green-500' : index === 1 ? 'bg-orange-600' : 'bg-blue-500';
          const titleColor = index === 0 ? 'text-green-700' : index === 1 ? 'text-orange-600' : 'text-blue-600';

          return (
            <Card
              key={section.id}
              className="bg-white !rounded-xl shadow-lg border-0 p-4 sm:p-6 flex flex-col min-h-[300px] sm:min-h-[400px] relative"
            >
              <div className="flex-grow">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className={`px-2 -mt-3 py-1 sm:px-3 sm:py-2 mr-2 rounded-lg ${iconColor}`}>
                    <span className="text-white text-base sm:text-lg">
                      {iconMap[section.icon as keyof typeof iconMap] || <EnvironmentFilled />}
                    </span>
                  </div>
                  <div>
                    <Text
                      className={`!text-base md:!text-lg font-bold ${titleColor}`}
                    >
                      {section.title}
                    </Text>
                    <Paragraph className="!text-sm mt-1 text-gray-500">{section.subtitle}</Paragraph>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {parseContent(section.content)}
                </div>
              </div>
              <Link href={`/packages`}>
                <button
                  style={{
                    backgroundColor: section.bg_button_color,
                    color: section.button_text_color,
                    borderColor: section.button_text_color,
                  }}
                  className="w-[90%] sm:w-[80%] mx-auto h-10 sm:h-12 cursor-pointer border rounded-full font-semibold !text-sm md:!text-base hover:!text-orange-700 hover:!bg-orange-200 !transition-colors !duration-200 !absolute bottom-4 sm:bottom-6"
                >
                  {section.button_text}
                </button>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}