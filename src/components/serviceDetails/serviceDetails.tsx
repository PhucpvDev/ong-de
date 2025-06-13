import { useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { IMAGES } from '@/constants/theme';
import locale from 'antd/es/date-picker/locale/vi_VN';
import dayjs from 'dayjs';
import { ShareAltOutlined, UserOutlined, HomeOutlined, EnvironmentOutlined, MinusOutlined, PlusOutlined, CloseOutlined, RightOutlined, StarFilled, DownOutlined, InfoCircleOutlined, FacebookOutlined, TwitterOutlined, CopyOutlined, UpOutlined  } from '@ant-design/icons';
import {Breadcrumb, Row, Col, Button, Tag, Card, Carousel, Modal, Collapse, DatePicker, Popover  } from 'antd';
import { notification } from 'antd';



export default function ServiceDetailsList() {
    const [visible, setVisible] = useState(false);
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSharePopover, setShowSharePopover] = useState(false);
    const [tourInfoExpanded, setTourInfoExpanded] = useState(false);
    const [descriptionExpanded, setDescriptionExpanded] = useState(false);
    const [reviewPhotoVisible, setReviewPhotoVisible] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const serviceData = {
        id: 1,
        title: 'Chương Trình "Đêm Trăng Tây Đô - Nghỉ Dưỡng 2 Ngày 1 Đêm" Tại Ông Đề 2023',
        category: 'Tour trãi nghiệm',
        subcategory: 'Tham quan sinh thái',
        rating: 4.9,
        reviewCount: 729,
        viewCount: '5K+',
        bookingCount: 'Đã đặt',
        price: 956250,
        originalPrice: 1000000,
        discount: 5,
        highlights: [
            'Làng Du Lịch Sinh Thái Ông Đề là điểm du lịch nổi tiếng và hấp dẫn tại huyện Phong Điền Thành Phố Cần Thơ hiện nay.',
            'Có nhiều dịch vụ vui chơi giải trí thú đồng',
            'Bãi vườn tham quan và thân hương đến thăm Ông Đề'
        ],
        services: [
            { title: 'Người lớn', value: 0 },
            { title: 'Trẻ em (4-7 tuổi)', value: 0 }
        ],
        reviews: [
            {
                user: 'Người dùng Klook',
                avatar: IMAGES.logo,
                rating: 5,
                date: '4/3',
                content: 'Phải gọi tại khu này ở Sài Gòn. Nơi này thực sự gây kinh ngạc khi biết về chiến thuật chiến tranh mà quân đội của họ sử dụng. Ngoài ra, đi thuyền trên sông Mekong cũng rất thú vị và thả...',
                photos: []
            },
            {
                user: 'Dorothy **********',
                avatar: IMAGES.logo,
                rating: 5,
                date: '26/2',
                content: 'Đây là một trong những tour du lịch tuyệt vời nhất tại Thành phố Hồ Chí Minh và là trải nghiệm tuyệt vời để biết thêm về những gì đã xảy ra trong Chiến tranh Việt Nam và trải nghiệm như...',
                photos: []
            }
        ],
        facilities: [
            { icon: <UserOutlined />, title: 'Hướng dẫn viên Ông Đề' },
            { icon: <HomeOutlined />, title: 'Khách sạn Cần Thơ' },
            { icon: <EnvironmentOutlined />, title: 'Du lịch sinh thái' }
        ],
        gallery: [
            IMAGES.Sr_dem_trang,
            IMAGES.Sr_tham_quan,
            IMAGES.Sr_am_thuc,
            IMAGES.Sr_tro_choi1
        ]
    };

    const handleAdultIncrease = () => {
        setAdultCount(adultCount + 1);
        setErrorMessage('');
    };

    const handleAdultDecrease = () => {
        if (adultCount > 0) {
            setAdultCount(adultCount - 1);
            setErrorMessage('');
        }
    };

    const handleChildIncrease = () => {
        setChildCount(childCount + 1);
        setErrorMessage('');
    };

    const handleChildDecrease = () => {
        if (childCount > 0) {
            setChildCount(childCount - 1);
            setErrorMessage('');
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setErrorMessage('');
    };

    const handleBookService = () => {
        if (!selectedDate) {
            setErrorMessage('Vui lòng chọn ngày đặt dịch vụ');
            return;
        }

        if (adultCount === 0 && childCount === 0) {
            setErrorMessage('Vui lòng chọn ít nhất 1 người tham gia');
            return;
        }

        notification.success({
            message: 'Đặt dịch vụ thành công',
            description: `Bạn đã đặt dịch vụ cho ${adultCount} người lớn và ${childCount} trẻ em vào ngày ${selectedDate.format('DD/MM/YYYY')}`,
        });

        setAdultCount(0);
        setChildCount(0);
        setSelectedDate(null);
        setErrorMessage('');
    };

    interface SharePlatform {
        (platform: string): void;
    }

    const handleShare: SharePlatform = (platform) => {
        notification.success({
            message: `Đã chia sẻ lên ${platform}`,
            placement: 'bottomRight',
            duration: 2
        });
        setShowSharePopover(false);
    };

    const handleCopyLink = () => {
        notification.success({
            message: 'Đã sao chép liên kết',
            placement: 'bottomRight',
            duration: 2
        });
        setShowSharePopover(false);
    };

    const shareContent = (
        <div className="w-44">
            <div className="flex flex-col gap-2">
                <Button
                    icon={<FacebookOutlined />}
                    className="flex items-center"
                    onClick={() => handleShare('Facebook')}
                >
                    <span className="ml-2">Facebook</span>
                </Button>
                <Button
                    icon={<TwitterOutlined />}
                    className="flex items-center"
                    onClick={() => handleShare('Twitter')}
                >
                    <span className="ml-2">Twitter</span>
                </Button>
                <Button
                    icon={<CopyOutlined />}
                    className="flex items-center"
                    onClick={handleCopyLink}
                >
                    <span className="ml-2">Sao chép liên kết</span>
                </Button>
            </div>
        </div>
    );

    const fullDescription = [
        "Chương trình 'Đêm Trăng Tây Đô' là trải nghiệm nghỉ dưỡng 2 ngày 1 đêm tại khu du lịch Ông Đề, mang đến cho du khách những khoảnh khắc thư giãn và gắn kết. Đây là cơ hội tuyệt vời để thoát khỏi nhịp sống bận rộn và tận hưởng không gian yên bình của miền Tây sông nước.",
        "Chương trình bao gồm các hoạt động như lửa trại dưới ánh trăng, tiệc BBQ trên thuyền, khám phá văn hóa sông nước, và nghỉ đêm tại khu homestay tiện nghi. Đây là lựa chọn lý tưởng cho các gia đình, nhóm bạn hoặc cặp đôi muốn có kỳ nghỉ ngắn ngày đáng nhớ.",
        "Khi đến với Làng Du Lịch Sinh Thái Ông Đề, bạn sẽ được trải nghiệm cuộc sống giản dị của người dân miền Tây Nam Bộ, thưởng thức các món ẩm thực đặc sản và tham gia vào các hoạt động sinh thái đặc trưng của vùng sông nước.",
        "Đặc biệt, buổi tối dưới ánh trăng miền Tây là thời điểm lý tưởng để bạn thưởng thức nghệ thuật Đờn ca tài tử Nam Bộ, một di sản văn hóa phi vật thể được UNESCO công nhận. Tiếng đàn, giọng hát sẽ đưa bạn vào không gian văn hóa độc đáo của miền sông nước.",
    ];

    const fullTourInfo = [
        "Làng Du Lịch Sinh Thái Ông Đề là điểm du lịch nổi tiếng và hấp dẫn tại huyện Phong Điền Thành Phố Cần Thơ hiện nay.",
        "Có nhiều dịch vụ vui chơi giải trí thú đồng như câu cá sấu, bắt cá, chèo thuyền, đạp vịt, tham quan vườn trái cây theo mùa và thưởng thức ẩm thực đặc sản miền Tây.",
        "Bãi vườn tham quan rộng rãi và thoáng mát, có nhiều góc chụp hình đẹp với cảnh quan sông nước hữu tình.",
        "Phù hợp cho chuyến đi gia đình, nhóm bạn hoặc cặp đôi muốn tận hưởng không khí yên bình của miền Tây sông nước.",
        "Tour bao gồm đầy đủ các bữa ăn với thực đơn phong phú và đặc sản địa phương.",
        "Có dịch vụ đưa đón tận nơi cho du khách từ trung tâm thành phố Cần Thơ.",
    ];

    return (
            <div className="mx-auto max-w-7xl md:px-6 px-4 py-18 sm:py-24 pb-20 md:pb-6 font-roboto">
                <Breadcrumb
                    className="font-roboto hidden sm:block"
                    items={[
                        { title: 'Trang chủ' },
                        { title: 'Dịch vụ' },
                        { title: serviceData.title }
                    ]}
                />

                <div className="mb-4 sm:mb-6 mt-5">
                    <h1 className="text-lg sm:text-2xl font-bold mb-2">{serviceData.title}</h1>

                    <div className="flex flex-wrap items-center mb-3">
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 mr-4">
                            <span className="mr-2">{serviceData.category}</span>
                            <span className="mx-2">•</span>
                            <span>{serviceData.subcategory}</span>
                        </div>
                    </div>
                </div>

                <Row gutter={[16, 24]}>
                    <Col xs={24} md={16}>
                        <div className="mb-6">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="col-span-3 sm:col-span-2 row-span-1 sm:row-span-2">
                                    <div className="relative overflow-hidden h-[250px] sm:h-[400px] rounded-t-lg sm:rounded-l-lg sm:rounded-t-none">
                                        <Image
                                            src={serviceData.gallery[0]}
                                            alt={serviceData.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="cursor-pointer"
                                            onClick={() => setVisible(true)}
                                        />
                                    </div>
                                </div>
                                <div className="hidden sm:grid grid-rows-2 gap-2 h-[400px]">
                                    <div className="relative overflow-hidden rounded-tr-lg">
                                        <Image
                                            src={serviceData.gallery[1]}
                                            alt="Gallery"
                                            layout="fill"
                                            objectFit="cover"
                                            className="cursor-pointer"
                                            onClick={() => setVisible(true)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="relative overflow-hidden rounded-br-lg">
                                            <Image
                                                src={serviceData.gallery[3]}
                                                alt="Gallery"
                                                layout="fill"
                                                objectFit="cover"
                                                className="cursor-pointer"
                                                onClick={() => setVisible(true)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 rounded-lg font-roboto border border-gray-200 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <h3 className="text-lg font-semibold text-orange-600">Thông tin tour</h3>
                                </div>
                                <Button
                                    type="text"
                                    icon={tourInfoExpanded ? <UpOutlined /> : <DownOutlined />}
                                    onClick={() => setTourInfoExpanded(!tourInfoExpanded)}
                                    className="text-gray-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 border border-gray-200 p-4 rounded-lg">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Thời gian</span>
                                    <span className="text-sm sm:text-base font-medium">2 ngày 1 đêm</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Khởi hành</span>
                                    <span className="text-sm sm:text-base font-medium">Hàng ngày</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Số người</span>
                                    <span className="text-sm sm:text-base font-medium">1-20 người</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Loại tour</span>
                                    <span className="text-sm sm:text-base font-medium">Tour gia đình</span>
                                </div>
                            </div>

                            <ul className="list-disc pl-5 mb-0 space-y-2">
                                {(tourInfoExpanded ? fullTourInfo : fullTourInfo.slice(0, 3)).map((highlight, index) => (
                                    <li key={index} className="text-gray-700 text-sm sm:text-base">
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                            {!tourInfoExpanded && fullTourInfo.length > 3 && (
                                <div className="mt-4">
                                    <Button
                                        type="link"
                                        className="flex font-roboto items-center p-0 h-auto"
                                        onClick={() => setTourInfoExpanded(true)}
                                    >
                                        <span className='text-orange-400 font-medium -ml-4'>Xem thêm <RightOutlined className="text-xs" /></span> 
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="mb-6 bg-white border border-gray-200 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center">
                                    <h3 className="text-lg font-semibold text-orange-600">Mô tả dịch vụ</h3>
                                </div>
                                <Button
                                    type="text"
                                    icon={descriptionExpanded ? <UpOutlined /> : <DownOutlined />}
                                    onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                                    className="text-gray-500"
                                />
                            </div>

                            <div className="text-gray-700 text-sm sm:text-base">
                                {(descriptionExpanded ? fullDescription : fullDescription.slice(0, 2)).map((paragraph, index) => (
                                    <p key={index} className={index < fullDescription.length - 1 ? "mb-4" : ""}>
                                        {paragraph}
                                    </p>
                                ))}

                                {!descriptionExpanded && fullDescription.length > 2 && (
                                    <div className="mt-4">
                                        <Button
                                            type="link"
                                            className="flex font-roboto items-center text-blue-500 p-0 h-auto"
                                            onClick={() => setDescriptionExpanded(true)}
                                        >
                                           <span className='text-orange-400 font-medium -ml-4'>Xem thêm <RightOutlined className="text-xs" /></span> 
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} md={8}>
                        <Card className="shadow-xs rounded-lg sticky font-roboto" style={{ top: '0rem' }}>
                            <div className="mb-5">
                                <div className="flex items-center mb-2">
                                    <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mr-2 mb-0">
                                        {serviceData.price.toLocaleString('vi-VN')} đ
                                    </h2>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="border-b border-gray-200 flex justify-between mb-4">
                                    <div className="flex items-center">
                                        <h3 className="text-sm sm:text-base font-medium mb-3">Chọn ngày & gói dịch vụ</h3>
                                    </div>
                                    <Button
                                        type="text"
                                        icon={<CloseOutlined className="text-xs" />}
                                        size="small"
                                        className="text-gray-500 bg-slate-100 p-1 flex items-center text-sm font-roboto"
                                        onClick={() => {
                                            setAdultCount(0);
                                            setChildCount(0);
                                            setSelectedDate(null);
                                            setErrorMessage('');
                                        }}
                                    >
                                        Xóa
                                    </Button>
                                </div>

                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm sm:text-base font-medium">Chọn ngày</span>
                                    </div>
                                    <DatePicker
                                        className="w-full h-10"
                                        placeholder="Chọn ngày đặt dịch vụ"
                                        format="DD/MM/YYYY"
                                        locale={locale}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        disabledDate={(current) => {
                                            return current && current.isBefore(dayjs().startOf('day'));
                                        }}
                                    />
                                </div>

                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center">
                                            <span className="text-sm sm:text-base">Người lớn</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Button
                                                icon={<MinusOutlined />}
                                                className="border-gray-300 text-gray-600"
                                                size="small"
                                                onClick={handleAdultDecrease}
                                            />
                                            <span className="mx-4 text-base">{adultCount}</span>
                                            <Button
                                                icon={<PlusOutlined />}
                                                className="border-gray-300 text-gray-600"
                                                size="small"
                                                onClick={handleAdultIncrease}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <span className="text-sm sm:text-base">Trẻ em (4-7 tuổi)</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Button
                                                icon={<MinusOutlined />}
                                                className="border-gray-300 text-gray-600"
                                                size="small"
                                                onClick={handleChildDecrease}
                                            />
                                            <span className="mx-4 text-base">{childCount}</span>
                                            <Button
                                                icon={<PlusOutlined />}
                                                className="border-gray-300 text-gray-600"
                                                size="small"
                                                onClick={handleChildIncrease}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {(adultCount > 0 || childCount > 0) && (
                                    <div className="mb-4 border-t border-gray-200 pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Tổng tiền:</span>
                                            <span className="text-lg font-bold text-orange-600">
                                                {((adultCount + childCount * 0.5) * serviceData.price).toLocaleString('vi-VN')} đ
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Đã bao gồm thuế và phí
                                        </div>
                                    </div>
                                )}

                                {errorMessage && (
                                    <div className="flex items-center text-red-500 mb-4 text-xs">
                                        <InfoCircleOutlined className="mr-1" />
                                        {errorMessage}
                                    </div>
                                )}

                                <div className="mb-4">
                                    <button className="bg-[#FF5B00] text-white cursor-pointer w-full py-2.5 rounded-lg text-[15px] hover:bg-[#E65100] transition-colors" onClick={handleBookService}>
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={['1']}
                                    expandIcon={({ isActive }) => (
                                        <RightOutlined rotate={isActive ? 90 : 0} className="text-gray-500" />
                                    )}
                                    items={[
                                        {
                                            key: '1',
                                            label: <h3 className="text-sm sm:text-base font-medium m-0">Lịch trình</h3>,
                                            children: (
                                                <div className="py-2">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
                                                            •
                                                        </div>
                                                        <div>
                                                            <div className="text-xs sm:text-sm font-medium">16:00h</div>
                                                            <div className="text-xs sm:text-sm">Khởi hành</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center mb-4">
                                                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">
                                                            •
                                                        </div>
                                                        <div>
                                                            <div className="text-xs sm:text-sm font-medium">Đón khách tại Cần Thơ</div>
                                                            <div className="text-xs sm:text-sm">
                                                                <EnvironmentOutlined className="mr-1" />
                                                                <span>Lang du lịch Ông Đề</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-1 sm:gap-2 mt-2">
                                                        <div className="flex-1 relative h-16 sm:h-20">
                                                            <Image src={serviceData.gallery[0]} alt="Tour" layout="fill" objectFit="cover" className="rounded-md" />
                                                        </div>
                                                        <div className="flex-1 relative h-16 sm:h-20">
                                                            <Image src={serviceData.gallery[1]} alt="Tour" layout="fill" objectFit="cover" className="rounded-md" />
                                                        </div>
                                                        <div className="flex-1 relative h-16 sm:h-20">
                                                            <Image src={serviceData.gallery[2]} alt="Tour" layout="fill" objectFit="cover" className="rounded-md" />
                                                        </div>
                                                        <div className="flex-1 relative h-16 sm:h-20">
                                                            <Image src={serviceData.gallery[3]} alt="Tour" layout="fill" objectFit="cover" className="rounded-md" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                            className: 'bg-gray-50 border-0 font-roboto'
                                        }
                                    ]}
                                />
                            </div>

                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="flex justify-between items-center bg-gray-50 p-2 sm:p-3">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="text-xs sm:text-sm font-medium">Khám phá Du Lịch Ông Đề</div>
                                            <div className="text-xs text-gray-500">
                                                Nhận phòng homestay tại khu du lịch, nghỉ ngơi và tham quan. Khám phá các dịch vụ. Tham gia các hoạt động thú vị như đạp vịt và các trò chơi dân gian tại miền tây sông nước
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 sm:p-3 border-t border-gray-200">
                                    <div className="flex gap-1 sm:gap-2 mt-2">
                                        <div className="flex-1 relative h-16 sm:h-20">
                                            <Image src={serviceData.gallery[3]} alt="Tour" layout="fill" objectFit="cover" className="rounded-md" />
                                        </div>
                                        <div className="flex-1 relative h-16 sm:h-20">
                                            <Image src={serviceData.gallery[2]} alt="Tour" layout="fill" objectFit="cover" className="rounded-md" />
                                        </div>
                                        <div className="flex-1 relative h-16 sm:h-20">
                                            <Image src={serviceData.gallery[1]} alt="Tour" layout="fill" objectFit="cover" className="rounded-md" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 flex items-center justify-between md:hidden z-10">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Giá từ</span>
                        <span className="text-lg font-bold text-blue-600">{serviceData.price.toLocaleString('vi-VN')} đ</span>
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        className="h-10 text-blue-600 font-medium border-blue-600 hover:bg-orange-600 hover:border-orange-600"
                        onClick={handleBookService}
                    >
                        Chọn gói dịch vụ
                    </Button>
                </div>

                <Modal
                    open={visible}
                    footer={null}
                    onCancel={() => setVisible(false)}
                    width={600}
                    centered
                >
                    <Carousel autoplay>
                        {serviceData.gallery.map((image, index) => (
                            <div key={index} className="relative h-[400px">
                                <Image
                                    src={image}
                                    alt={`Gallery ${index}`}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        ))}
                    </Carousel>
                </Modal>

                <Modal
                    open={reviewPhotoVisible}
                    footer={null}
                    onCancel={() => setReviewPhotoVisible(false)}
                    width="auto"
                    centered
                >
                    {selectedPhoto && (
                        <div className="relative h-[500px]">
                            <Image
                                src={selectedPhoto}
                                alt="Review photo"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    )}
                </Modal>
            </div>
    );
}