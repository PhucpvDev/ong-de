import React from 'react';
import { Card, Typography } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function VideoSupportPage () {

  const videos = [
    {
      id: '1',
      title: 'Hướng Dẫn Đường Đến Làng Du Lịch Ông Đề Cần Thơ',
      youtubeId: 'aBcDeFgHiJk',
      description: 'Hướng dẫn chi tiết cách di chuyển đến Làng Du Lịch Ông Đề Cần Thơ từ các địa điểm phổ biến.',
    },
    {
      id: '2',
      title: 'Hướng Dẫn Đường Đến Khu Ăn Trái Cây Làng Du Lịch Ông Đề',
      youtubeId: 'LmNoPqRsTuV',
      description: 'Tìm hiểu cách đến khu ăn trái cây tại Làng Du Lịch Ông Đề để thưởng thức các loại trái cây tươi ngon.',
    },
    {
      id: '3',
      title: 'Hướng Dẫn Cách Đặt Gói Tiết Kiệm Tại Làng Du Lịch Ông Đề',
      youtubeId: 'WxYzAbCdEfG', 
      description: 'Hướng dẫn từng bước cách đặt các gói tiết kiệm để trải nghiệm Làng Du Lịch Ông Đề một cách tiết kiệm nhất.',
    },
    {
      id: '4',
      title: 'Hướng Dẫn Khám Phá Các Hoạt Động Tại Làng Du Lịch Ông Đề Cần Thơ',
      youtubeId: 'HiJkLmNoPqR', 
      description: 'Khám phá các hoạt động thú vị như tham quan, ăn uống và trải nghiệm văn hóa tại Làng Du Lịch Ông Đề.',
    },
  ];

  const handlePlayVideo = (youtubeId: string): void => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <div className="bg-gray-50 py-8 mt-14">
      <div className="max-w-7xl mx-auto md:px-6 px-4">
        <div className="text-center mb-12">
          <Title
            level={3}
            className="text-center !text-lg sm:!text-xl md:!text-3xl !mb-8 whitespace-normal md:whitespace-nowrap"
          >
            Video hướng dẫn của Làng Du Lịch Sinh Thái Ông Đề Cần Thơ
          </Title>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="cursor-pointer !shadow-none !border-none group"
              onClick={() => handlePlayVideo(video.youtubeId)}
              cover={
                <div className="relative !rounded-xl">
                  <video
                    poster={`https://placehold.co/150x150`}
                    className="w-full h-36 object-cover cursor-pointer !rounded-2xl"
                    controls={false}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircleOutlined
                      className="!text-white text-4xl cursor-pointer"
                      onClick={() => handlePlayVideo(video.youtubeId)}
                    />
                  </div>
                </div>
              }
            >
              <Paragraph className="!text-base !-m-5.5 !pt-3 font-meidum leading-relaxed">
                {video.title}
              </Paragraph>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

