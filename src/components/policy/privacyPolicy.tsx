import React, { useState } from 'react';
import { Typography, Divider, List, Row, Col, Grid, Menu, Layout, Button } from 'antd';
import { DownOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;
const { Sider, Content } = Layout;

export default function PolicyPage() {
    const screens = useBreakpoint();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuKey, setSelectedMenuKey] = useState('policy');

    const containerStyle = {
        maxWidth: 1280,
        margin: '0 auto',
        padding: screens.xs ? '24px 16px' : '40px 24px',
        minHeight: '100vh'
    };

    const sidebarStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '16px 0',
        height: 'fit-content',
        boxShadow: 'none',
        transition: 'width 0.2s'
    };

    const contentStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '24px',
        marginLeft: screens.xs ? 0 : '16px',
        marginTop: screens.xs ? '16px' : 0,
        boxShadow: 'none',
        flex: 1
    };

    const titleStyle = {
        fontSize: screens.xs ? 18 : screens.sm ? 20 : 24,
        marginBottom: screens.xs ? 16 : 24,
        color: '#1f2937'
    };

    const paragraphStyle = {
        fontSize: screens.xs ? 14 : 16,
        color: '#4B5563',
        marginBottom: screens.xs ? 16 : 24,
        lineHeight: 1.6,
    };

    const breadcrumbStyle = {
        marginBottom: '24px',
        fontSize: '14px',
        color: '#6b7280'
    };

    const menuItems = [
        {
            key: 'policy',
            label: 'Chính sách bảo vệ dữ liệu',
            children: [
                { key: 'policy-1', label: 'Thu thập thông tin' },
                { key: 'policy-2', label: 'Sử dụng thông tin' },
                { key: 'policy-3', label: 'Bảo mật dữ liệu' },
            ],
        },
        {
            key: 'terms',
            label: 'Điều khoản sử dụng',
            children: [
                { key: 'terms-1', label: <span> Điều kiện chung </span> },
                { key: 'terms-2', label: 'Quyền và nghĩa vụ' },
            ],
        },
        {
            key: 'refund',
            label: 'Chính sách hoàn tiền',
            children: [
                { key: 'refund-1', label: 'Hủy đặt chỗ' },
                { key: 'refund-2', label: 'Thời gian hoàn tiền' },
            ],
        },
        {
            key: 'booking',
            label: 'Chính sách đặt chỗ',
            children: [
                { key: 'booking-1', label: 'Thời gian đặt' },
                { key: 'booking-2', label: 'Xác nhận đặt chỗ' },
            ],
        },
        {
            key: 'privacy',
            label: 'Chính sách quyền riêng tư',
            children: [
                { key: 'privacy-1', label: 'Quyền kiểm soát dữ liệu' },
                { key: 'privacy-2', label: 'Chia sẻ thông tin' },
            ],
        },
    ];

    const renderContent = () => {
        switch (selectedMenuKey) {
            case 'policy':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách bảo vệ dữ liệu
                        </div>
                        <Title level={2} style={{
                            fontSize: screens.xs ? 20 : 24,
                            marginBottom: '24px',
                            color: '#1f2937'
                        }}>
                            Chính sách bảo vệ dữ liệu cá nhân
                        </Title>
                        <Paragraph style={{
                            ...paragraphStyle,
                            backgroundColor: '#f3f4f6',
                            padding: '16px',
                            borderRadius: '8px',
                            marginBottom: '32px'
                        }}>
                            <Text strong>"Dữ liệu cá nhân":</Text> là thông tin dưới dạng ký hiệu, chữ viết, chữ số, hình ảnh, âm thanh hoặc dạng tương tự trên môi trường điện tử gắn liền với một con người cụ thể hoặc giúp xác định một con người cụ thể và được quy định cụ thể tại Mục 2 của Chính sách bảo vệ dữ liệu cá nhân này.
                        </Paragraph>
                        <Paragraph style={{
                            ...paragraphStyle,
                            backgroundColor: '#f3f4f6',
                            padding: '16px',
                            borderRadius: '8px',
                            marginBottom: '32px'
                        }}>
                            <Text strong>"Chủ Thể Dữ Liệu Cá Nhân":</Text> là cá nhân được Dữ Liệu Cá Nhân phản ánh, bao gồm tất cả các khách hàng cá nhân đang sử dụng sản phẩm, dịch vụ của Làng du lịch Ông Đề, người lao động của Làng du lịch Ông Đề, cổ đông và/hoặc các cá nhân khác có phát sinh quan hệ pháp lý với Làng du lịch Ông Đề.
                        </Paragraph>
                        <Title level={3} style={titleStyle} id="section-1">
                            1. Mục đích và phạm vi thu thập thông tin
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            Làng du lịch Ông Đề thu thập thông tin cá nhân của bạn khi bạn sử dụng các dịch vụ du lịch của chúng tôi thông qua website chính thức (https://ongde.vn/), ứng dụng di động, đặt chỗ trực tiếp tại quầy hoặc qua các đối tác được ủy quyền. Thông tin được thu thập bao gồm, nhưng không giới hạn, họ tên, số điện thoại, địa chỉ email, địa chỉ nơi ở, thông tin thanh toán (như số thẻ tín dụng, nếu có), và các sở thích du lịch như loại hình tour (nghỉ dưỡng, khám phá văn hóa, ẩm thực địa phương) hoặc yêu cầu đặc biệt (phòng nghỉ, dịch vụ ăn uống).
                        </Paragraph>
                        <Paragraph style={paragraphStyle}>
                            Mục đích của việc thu thập thông tin là để hỗ trợ bạn đặt tour, lưu trú, tham gia các hoạt động du lịch, và trải nghiệm các dịch vụ tại làng du lịch Ông Đề một cách thuận lợi nhất. Chúng tôi cũng sử dụng thông tin để cá nhân hóa trải nghiệm của bạn, chẳng hạn như đề xuất các hoạt động phù hợp với sở thích hoặc thông báo về các sự kiện văn hóa đặc biệt tại làng. Ông Đề cam kết bảo mật thông tin cá nhân và chỉ sử dụng thông tin khi có sự đồng ý rõ ràng của bạn.
                        </Paragraph>
                    </>
                );

            case 'policy-1':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách bảo vệ dữ liệu {">"} Thu thập thông tin
                        </div>
                        <Title level={2} style={titleStyle}>
                            Thu thập thông tin
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                1.1. Các loại thông tin thu thập
                            </Title>
                            Chúng tôi thu thập các thông tin sau:
                        </Paragraph>
                        <List
                            style={{ marginBottom: '24px' }}
                            dataSource={[
                                'Thông tin cá nhân: Họ tên, ngày sinh, giới tính, số CMND/CCCD',
                                'Thông tin liên hệ: Số điện thoại, địa chỉ email, địa chỉ thường trú',
                                'Thông tin thanh toán: Số thẻ tín dụng, thông tin ngân hàng (nếu có)',
                                'Sở thích du lịch: Loại hình tour ưa thích, yêu cầu đặc biệt',
                                'Thông tin kỹ thuật: Địa chỉ IP, loại trình duyệt, thiết bị sử dụng'
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '8px 0' }}>
                                    <Text style={{ fontSize: screens.xs ? 14 : 16 }}>• {item}</Text>
                                </List.Item>
                            )}
                        />
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                1.2. Phương thức thu thập
                            </Title>
                            Thông tin được thu thập thông qua các kênh chính thức của Làng du lịch Ông Đề bao gồm website, ứng dụng di động, đặt chỗ trực tiếp tại quầy lễ tân, hoặc qua các đối tác được ủy quyền.
                        </Paragraph>
                    </>
                );

            case 'policy-2':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách bảo vệ dữ liệu {">"} Sử dụng thông tin
                        </div>
                        <Title level={2} style={titleStyle}>
                            Sử dụng thông tin
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                2.1. Mục đích sử dụng
                            </Title>
                            Thông tin cá nhân của bạn được sử dụng cho các mục đích sau:
                        </Paragraph>
                        <List
                            style={{ marginBottom: '24px' }}
                            dataSource={[
                                'Xử lý đặt chỗ và cung cấp dịch vụ du lịch',
                                'Liên hệ xác nhận thông tin đặt chỗ và lịch trình',
                                'Cá nhân hóa trải nghiệm du lịch theo sở thích',
                                'Gửi thông báo về các chương trình khuyến mãi',
                                'Cải thiện chất lượng dịch vụ dựa trên phản hồi',
                                'Tuân thủ các quy định pháp luật hiện hành'
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '8px 0' }}>
                                    <Text style={{ fontSize: screens.xs ? 14 : 16 }}>• {item}</Text>
                                </List.Item>
                            )}
                        />
                        <Paragraph style={paragraphStyle}>
                            Chúng tôi cam kết chỉ sử dụng thông tin trong phạm vi cần thiết và có sự đồng ý của bạn.
                        </Paragraph>
                    </>
                );

            case 'policy-3':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách bảo vệ dữ liệu {">"} Bảo mật dữ liệu
                        </div>
                        <Title level={2} style={titleStyle}>
                            Bảo mật dữ liệu
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                3.1. Biện pháp bảo mật
                            </Title>
                            Làng du lịch Ông Đề áp dụng các biện pháp bảo mật nghiêm ngặt:
                        </Paragraph>
                        <List
                            style={{ marginBottom: '24px' }}
                            dataSource={[
                                'Mã hóa SSL cho tất cả giao dịch trực tuyến',
                                'Hệ thống tường lửa và phần mềm chống virus hiện đại',
                                'Kiểm soát truy cập với xác thực đa lớp',
                                'Sao lưu dữ liệu định kỳ và bảo mật',
                                'Đào tạo nhân viên về bảo mật thông tin',
                                'Kiểm tra và cập nhật hệ thống bảo mật thường xuyên'
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '8px 0' }}>
                                    <Text style={{ fontSize: screens.xs ? 14 : 16 }}>• {item}</Text>
                                </List.Item>
                            )}
                        />
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                3.2. Quyền truy cập
                            </Title>
                            Chỉ những nhân viên được ủy quyền mới có thể truy cập vào thông tin cá nhân của bạn và họ đều được ký cam kết bảo mật.
                        </Paragraph>
                    </>
                );

            case 'terms':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Điều khoản sử dụng
                        </div>
                        <Title level={2} style={titleStyle}>
                            Điều khoản sử dụng
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            Điều khoản sử dụng quy định các điều kiện khi bạn sử dụng dịch vụ của Làng du lịch Ông Đề. Vui lòng đọc kỹ trước khi sử dụng.
                        </Paragraph>
                    </>
                );

            case 'terms-1':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Điều khoản sử dụng {">"} Điều kiện chung
                        </div>
                        <Title level={2} style={titleStyle}>
                            Điều kiện chung
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                1. Phạm vi áp dụng
                            </Title>
                            Các điều khoản này áp dụng cho tất cả khách hàng sử dụng dịch vụ của Làng du lịch Ông Đề, bao gồm website, ứng dụng di động và các dịch vụ tại chỗ.
                        </Paragraph>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                2. Điều kiện sử dụng
                            </Title>
                            Bạn phải đủ 18 tuổi hoặc có sự đồng ý của người giám hộ để sử dụng dịch vụ. Thông tin cung cấp phải chính xác và đầy đủ.
                        </Paragraph>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                3. Trách nhiệm của khách hàng
                            </Title>
                            Khách hàng có trách nhiệm bảo mật thông tin tài khoản, tuân thủ các quy định của làng du lịch và tôn trọng văn hóa địa phương.
                        </Paragraph>
                    </>
                );

            case 'terms-2':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Điều khoản sử dụng {">"} Quyền và nghĩa vụ
                        </div>
                        <Title level={2} style={titleStyle}>
                            Quyền và nghĩa vụ
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                1. Quyền của khách hàng
                            </Title>
                        </Paragraph>
                        <List
                            style={{ marginBottom: '24px' }}
                            dataSource={[
                                'Được cung cấp dịch vụ chất lượng theo cam kết',
                                'Được bảo mật thông tin cá nhân',
                                'Được hỗ trợ 24/7 trong quá trình sử dụng dịch vụ',
                                'Được hoàn tiền theo chính sách quy định'
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '8px 0' }}>
                                    <Text style={{ fontSize: screens.xs ? 14 : 16 }}>• {item}</Text>
                                </List.Item>
                            )}
                        />
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                2. Nghĩa vụ của khách hàng
                            </Title>
                        </Paragraph>
                        <List
                            style={{ marginBottom: '24px' }}
                            dataSource={[
                                'Thanh toán đầy đủ chi phí dịch vụ theo thỏa thuận',
                                'Cung cấp thông tin chính xác và cập nhật',
                                'Tuân thủ nội quy và quy định của làng du lịch',
                                'Bảo vệ môi trường và tài sản của làng du lịch'
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '8px 0' }}>
                                    <Text style={{ fontSize: screens.xs ? 14 : 16 }}>• {item}</Text>
                                </List.Item>
                            )}
                        />
                    </>
                );

            case 'refund':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách hoàn tiền
                        </div>
                        <Title level={2} style={titleStyle}>
                            Chính sách hoàn tiền
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            Chính sách hoàn tiền áp dụng cho các trường hợp hủy đặt chỗ hoặc thay đổi lịch trình. Vui lòng liên hệ để biết chi tiết.
                        </Paragraph>
                    </>
                );

            case 'refund-1':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách hoàn tiền {">"} Hủy đặt chỗ
                        </div>
                        <Title level={2} style={titleStyle}>
                            Hủy đặt chỗ
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                1. Điều kiện hủy đặt chỗ
                            </Title>
                        </Paragraph>
                        <List
                            style={{ marginBottom: '24px' }}
                            dataSource={[
                                'Hủy trước 7 ngày: Hoàn 100% phí đã thanh toán',
                                'Hủy trước 3-6 ngày: Hoàn 70% phí đã thanh toán',
                                'Hủy trước 1-2 ngày: Hoàn 50% phí đã thanh toán',
                                'Hủy trong ngày: Không hoàn tiền'
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '8px 0' }}>
                                    <Text style={{ fontSize: screens.xs ? 14 : 16 }}>• {item}</Text>
                                </List.Item>
                            )}
                        />
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                2. Trường hợp đặc biệt
                            </Title>
                            Đối với các trường hợp bất khả kháng như thiên tai, dịch bệnh, chúng tôi sẽ xem xét hoàn tiền 100% hoặc hỗ trợ dời lịch.
                        </Paragraph>
                    </>
                );

            case 'refund-2':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách hoàn tiền {">"} Thời gian hoàn tiền
                        </div>
                        <Title level={2} style={titleStyle}>
                            Thời gian hoàn tiền
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                1. Quy trình hoàn tiền
                            </Title>
                        </Paragraph>
                        <List
                            style={{ marginBottom: '24px' }}
                            dataSource={[
                                'Bước 1: Gửi yêu cầu hủy đặt chỗ qua email hoặc hotline',
                                'Bước 2: Xử lý yêu cầu trong vòng 1-2 ngày làm việc',
                                'Bước 3: Thông báo kết quả và số tiền được hoàn',
                                'Bước 4: Chuyển tiền về tài khoản khách hàng'
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '8px 0' }}>
                                    <Text style={{ fontSize: screens.xs ? 14 : 16 }}>• {item}</Text>
                                </List.Item>
                            )}
                        />
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                2. Thời gian hoàn tiền
                            </Title>
                            Tiền sẽ được hoàn về tài khoản trong vòng 7-10 ngày làm việc kể từ khi yêu cầu được chấp thuận.
                        </Paragraph>
                    </>
                );

            case 'booking':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách đặt chỗ
                        </div>
                        <Title level={2} style={titleStyle}>
                            Chính sách đặt chỗ
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            Chính sách đặt chỗ bao gồm các quy định về thời gian đặt, xác nhận và hủy đặt chỗ tại Làng du lịch Ông Đề.
                        </Paragraph>
                    </>
                );

            case 'booking-1':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách đặt chỗ {">"} Thời gian đặt
                        </div>
                        <Title level={2} style={titleStyle}>
                            Thời gian đặt chỗ
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                1. Thời gian đặt chỗ tối thiểu
                            </Title>
                            Để đảm bảo chất lượng dịch vụ, quý khách vui lòng đặt chỗ trước ít nhất 24 giờ đối với các dịch vụ thường và 48 giờ đối với các tour đặc biệt.
                        </Paragraph>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                2. Thời gian phục vụ
                            </Title>
                        </Paragraph>
                        <List
                            style={{ marginBottom: '24px' }}
                            dataSource={[
                                'Check-in: 14:00 - 22:00',
                                'Check-out: 06:00 - 12:00',
                                'Dịch vụ ăn uống: 06:00 - 22:00',
                                'Hoạt động giải trí: 08:00 - 21:00'
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '8px 0' }}>
                                    <Text style={{ fontSize: screens.xs ? 14 : 16 }}>• {item}</Text>
                                </List.Item>
                            )}
                        />
                    </>
                );

            case 'booking-2':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách đặt chỗ {">"} Xác nhận đặt chỗ
                        </div>
                        <Title level={2} style={titleStyle}>
                            Xác nhận đặt chỗ
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                1. Quy trình xác nhận
                            </Title>
                        </Paragraph>
                        <List
                            style={{ marginBottom: '24px' }}
                            dataSource={[
                                'Điền đầy đủ thông tin đặt chỗ trên website hoặc ứng dụng',
                                'Thanh toán cọc hoặc thanh toán đầy đủ theo yêu cầu',
                                'Nhận email/SMS xác nhận từ hệ thống',
                                'Nhân viên sẽ gọi điện xác nhận lại trong vòng 2 giờ'
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '8px 0' }}>
                                    <Text style={{ fontSize: screens.xs ? 14 : 16 }}>• {item}</Text>
                                </List.Item>
                            )}
                        />
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                2. Thông tin cần thiết
                            </Title>
                            Để xác nhận đặt chỗ, quý khách cần cung cấp đầy đủ thông tin cá nhân, thời gian lưu trú, số lượng khách và các yêu cầu đặc biệt (nếu có).
                        </Paragraph>
                    </>
                );

            case 'privacy':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách quyền riêng tư
                        </div>
                        <Title level={2} style={titleStyle}>
                            Chính sách quyền riêng tư
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            Chính sách quyền riêng tư bảo vệ thông tin cá nhân của bạn khi sử dụng dịch vụ của chúng tôi.
                        </Paragraph>
                    </>
                );

            case 'privacy-1':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách quyền riêng tư {">"} Quyền kiểm soát dữ liệu
                        </div>
                        <Title level={2} style={titleStyle}>
                            Quyền kiểm soát dữ liệu
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                1. Quyền truy cập thông tin
                            </Title>
                            Bạn có quyền yêu cầu xem, sửa đổi hoặc xóa thông tin cá nhân của mình khỏi hệ thống của chúng tôi bất cứ lúc nào.
                        </Paragraph>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                2. Quyền từ chối
                            </Title>
                        </Paragraph>
                        <List
                            style={{ marginBottom: '24px' }}
                            dataSource={[
                                'Từ chối nhận email marketing',
                                'Từ chối chia sẻ thông tin với bên thứ ba',
                                'Từ chối sử dụng cookie không cần thiết',
                                'Yêu cầu xóa tài khoản và dữ liệu cá nhân'
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '8px 0' }}>
                                    <Text style={{ fontSize: screens.xs ? 14 : 16 }}>• {item}</Text>
                                </List.Item>
                            )}
                        />
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                3. Cách thực hiện quyền
                            </Title>
                            Để thực hiện các quyền trên, bạn có thể liên hệ trực tiếp với chúng tôi qua email: privacy@ongde.vn hoặc hotline: 1800-1234.
                        </Paragraph>
                    </>
                );

            case 'privacy-2':
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách quyền riêng tư {">"} Chia sẻ thông tin
                        </div>
                        <Title level={2} style={titleStyle}>
                            Chia sẻ thông tin
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                1. Nguyên tắc chia sẻ
                            </Title>
                            Chúng tôi cam kết không bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn với bất kỳ bên thứ ba nào vì mục đích thương mại.
                        </Paragraph>
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                2. Trường hợp chia sẻ cho phép
                            </Title>
                        </Paragraph>
                        <List
                            style={{ marginBottom: '24px' }}
                            dataSource={[
                                'Có sự đồng ý rõ ràng của bạn',
                                'Tuân thủ yêu cầu của cơ quan pháp luật',
                                'Bảo vệ quyền lợi và an toàn của làng du lịch',
                                'Cung cấp dịch vụ hỗ trợ kỹ thuật (với các đối tác tin cậy)',
                                'Trường hợp khẩn cấp liên quan đến sức khỏe và an toàn'
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '8px 0' }}>
                                    <Text style={{ fontSize: screens.xs ? 14 : 16 }}>• {item}</Text>
                                </List.Item>
                            )}
                        />
                        <Paragraph style={paragraphStyle}>
                            <Title level={4} style={{ color: '#1f2937', marginTop: '24px' }}>
                                3. Bảo mật khi chia sẻ
                            </Title>
                            Trong trường hợp cần thiết phải chia sẻ thông tin, chúng tôi sẽ đảm bảo các đối tác cam kết bảo mật và chỉ sử dụng thông tin cho mục đích đã thỏa thuận.
                        </Paragraph>
                    </>
                );

            default:
                return (
                    <>
                        <div style={breadcrumbStyle}>
                            Trang chủ {">"} Chính sách
                        </div>
                        <Title level={2} style={titleStyle}>
                            Chính sách và điều khoản
                        </Title>
                        <Paragraph style={paragraphStyle}>
                            Chào mừng bạn đến với trang chính sách của Làng du lịch Ông Đề. Vui lòng chọn một mục từ menu bên trái để xem chi tiết.
                        </Paragraph>
                    </>
                );
        }
    };

    return (
      <div style={containerStyle}>
            <Row
                gutter={[16, 16]}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    minHeight: '100%', 
                    alignItems: 'stretch' 
                }}
            >
                <Col xs={24} md={6} style={{ position: 'relative', minWidth: '40px' }} className='md:border-none border border-gray-300 md:shadow-none shadow-xs rounded-lg'>
                    <div
                        className={collapsed ? '' : 'md:border-r md:border-r-gray-300'}
                        style={{ height: '100%' }}
                    >
                        <span className='md:block hidden'>
                            <Button
                                icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    position: 'absolute',
                                    right: collapsed ? '295px' : '-7px',
                                    top: '40px',
                                    zIndex: 10,
                                }}
                            />
                        </span>
                        {!collapsed && (
                            <div className='-ml-6 mr-10'>
                                <Menu
                                    mode="inline"
                                    defaultOpenKeys={['policy']}
                                    selectedKeys={[selectedMenuKey]}
                                    onSelect={({ key }) => setSelectedMenuKey(key)}
                                    style={{ border: 'none', boxShadow: 'none', height: '100%' }}
                                    items={menuItems}
                                />
                            </div>
                        )}
                    </div>
                </Col>
                <Col xs={24} md={collapsed ? 24 : 18}>
                    <div className='mt-5 md:border-none border-gray-200 md:p-0 p-3 rounded-xl md:ml-10'>
                        {renderContent()}
                    </div>
                </Col>
            </Row>
        </div>
    );
}