import { Card, Typography } from 'antd';
import { EnvironmentFilled, RestFilled, UsergroupAddOutlined, CheckCircleFilled } from '@ant-design/icons';
import Image from 'next/image';
const { Title, Text } = Typography;

export default function CardSection () {
  return (
    <div className="relative py-6 sm:py-8 md:py-12 mt-16">
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

      <div className="text-center mb-8 sm:mb-10 md:mb-16">
        <Title
          level={1}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        >
          <span className="text-gray-700">Dịch vụ và Hoạt động ở</span>
          <span className="text-orange-500"> Ông Đề </span>
        </Title>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card
          className="bg-white rounded-2xl shadow-lg border-0 p-4 sm:p-6 flex flex-col min-h-[400px] sm:min-h-[450px] relative"
        >
          <div className="flex-grow">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="px-2 py-1 sm:px-3 sm:py-2 mr-2 rounded-lg bg-green-500">
                <span className="text-white text-base sm:text-lg">
                  <EnvironmentFilled />
                </span>
              </div>
              <div>
                <Title
                  level={5}
                  className="text-base sm:text-lg font-bold text-green-600"
                >
                  Văn Hóa Sông Nước
                </Title>
                <div className="text-xs sm:text-sm text-gray-500">Trải Nghiệm Miền Tây</div>
              </div>
            </div>

            <Title
              level={3}
              className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight"
            >
              Đắm mình trong nét đẹp sông nước Ông Đề
            </Title>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-start">
                <span className="text-green-500 mr-2 sm:mr-3 flex-shrink-0 text-lg sm:text-xl">
                  <CheckCircleFilled />
                </span>
                <Text className="text-gray-700 text-sm sm:text-base">
                  Khám phá chợ nổi Cái Răng sôi động
                </Text>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2 sm:mr-3 flex-shrink-0 text-lg sm:text-xl">
                  <CheckCircleFilled />
                </span>
                <Text className="text-gray-700 text-sm sm:text-base">
                  Chèo xuồng ba lá len lỏi kênh rạch
                </Text>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2 sm:mr-3 flex-shrink-0 text-lg sm:text-xl">
                  <CheckCircleFilled />
                </span>
                <Text className="text-gray-700 text-sm sm:text-base">
                  Nếm thử bánh xèo giòn rụm đặc trưng
                </Text>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2 sm:mr-3 flex-shrink-0 text-lg sm:text-xl">
                  <CheckCircleFilled />
                </span>
                <Text className="text-gray-700 text-sm sm:text-base">
                  Tham gia đờn ca tài tử Nam Bộ
                </Text>
              </div>
            </div>
          </div>
          <button
            className="w-[90%] sm:w-[80%] mx-auto h-10 sm:h-12 cursor-pointer bg-orange-100 text-orange-600 border border-orange-200 rounded-full font-semibold hover:bg-orange-200 transition-colors duration-200 absolute bottom-4 sm:bottom-6"
          >
            Khám phá ngay
          </button>
        </Card>

        <Card
          className="bg-white rounded-2xl shadow-lg border-0 p-4 sm:p-6 flex flex-col min-h-[400px] sm:min-h-[450px] relative"
        >
          <div className="flex-grow">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="px-2 py-1 sm:px-3 sm:py-2 mr-2 rounded-lg bg-orange-500">
                <span className="text-white text-base sm:text-lg">
                  <RestFilled />
                </span>
              </div>
              <div>
                <Title
                  level={5}
                  className="text-base sm:text-lg font-bold text-orange-600"
                >
                  Nghỉ Dưỡng Sinh Thái
                </Title>
                <div className="text-xs sm:text-sm text-gray-500">Homestay Miền Tây</div>
              </div>
            </div>

            <Title
              level={3}
              className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight"
            >
              Thư giãn tại homestay đậm chất Ông Đề
            </Title>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-start">
                <span className="text-orange-500 mr-2 sm:mr-3 flex-shrink-0 text-lg sm:text-xl">
                  <CheckCircleFilled />
                </span>
                <Text className="text-gray-700 text-sm sm:text-base">
                  Lưu trú trong nhà sàn giữa vườn trái cây
                </Text>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-2 sm:mr-3 flex-shrink-0 text-lg sm:text-xl">
                  <CheckCircleFilled />
                </span>
                <Text className="text-gray-700 text-sm sm:text-base">
                  Thưởng thức không khí trong lành bên sông
                </Text>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 mr-2 sm:mr-3 flex-shrink-0 text-lg sm:text-xl">
                  <CheckCircleFilled />
                </span>
                <Text className="text-gray-700 text-sm sm:text-base">
                  Giao lưu văn hóa với người dân Cần Thơ
                </Text>
              </div>
            </div>
          </div>
          <button
            className="w-[90%] sm:w-[80%] mx-auto h-10 sm:h-12 cursor-pointer bg-orange-100 text-orange-600 border border-orange-200 rounded-full font-semibold hover:bg-orange-200 transition-colors duration-200 absolute bottom-4 sm:bottom-6"
          >
            Khám phá ngay
          </button>
        </Card>

        <Card
          className="bg-white rounded-2xl shadow-lg border-0 p-4 sm:p-6 flex flex-col min-h-[400px] sm:min-h-[450px] relative"
        >
          <div className="flex-grow">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="px-2 py-1 sm:px-3 sm:py-2 mr-2 rounded-lg bg-blue-500">
                <span className="text-white text-base sm:text-lg">
                  <UsergroupAddOutlined />
                </span>
              </div>
              <div>
                <Title
                  level={5}
                  className="text-base sm:text-lg font-bold text-blue-600"
                >
                  Hoạt Động Cộng Đồng
                </Title>
                <div className="text-xs sm:text-sm text-gray-500">Kết Nối & Vui Chơi</div>
              </div>
            </div>

            <Title
              level={3}
              className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight"
            >
              Vui chơi và gắn kết tại làng Ông Đề
            </Title>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2 sm:mr-3 flex-shrink-0 text-lg sm:text-xl">
                  <CheckCircleFilled />
                </span>
                <Text className="text-gray-700 text-sm sm:text-base">
                  Tham gia làm nông dân: tát mương, bắt cá
                </Text>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2 sm:mr-3 flex-shrink-0 text-lg sm:text-xl">
                  <CheckCircleFilled />
                </span>
                <Text className="text-gray-700 text-sm sm:text-base">
                  Tổ chức đêm lửa trại bên bờ sông
                </Text>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2 sm:mr-3 flex-shrink-0 text-lg sm:text-xl">
                  <CheckCircleFilled />
                </span>
                <Text className="text-gray-700 text-sm sm:text-base">
                  Học làm gốm thủ công truyền thống
                </Text>
              </div>
            </div>
          </div>
          <button
            className="w-[90%] sm:w-[80%] mx-auto h-10 sm:h-12 cursor-pointer bg-orange-100 text-orange-600 border border-orange-200 rounded-full font-semibold hover:bg-orange-200 transition-colors duration-200 absolute bottom-4 sm:bottom-6"
          >
            Khám phá ngay
          </button>
        </Card>
      </div>
    </div>
  );
};
