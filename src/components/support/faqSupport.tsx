import React from 'react';
import { Collapse, Typography } from 'antd';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

export default function TicketsFaq () {
const faqs = [
  {
    key: '1',
    question: 'Vé tham quan Làng Du lịch Sinh thái Ông Đề bao gồm những gì?',
    answer:
      'Vé tham quan bao gồm quyền truy cập vào Làng Du lịch Sinh thái Ông Đề, trải nghiệm văn hóa miền Tây, chụp ảnh tại các điểm check-in, và tham gia các hoạt động theo mô tả vé.',
  },
  {
    key: '2',
    question: 'Vé có thể hoàn tiền hoặc đổi ngày không?',
    answer:
      'Vé có thể đổi trước 24 giờ nếu chưa sử dụng và hoàn tiền 100% nếu hủy trước 48 giờ. Vui lòng liên hệ bộ phận hỗ trợ khách hàng để được hướng dẫn chi tiết.',
  },
  {
    key: '3',
    question: 'Làng du lịch Ông Đề có phù hợp cho trẻ em không?',
    answer:
      'Có, làng du lịch Ông Đề là điểm đến thân thiện với gia đình, với nhiều hoạt động phù hợp cho trẻ em như trải nghiệm văn hóa và tham quan.',
  },
  {
    key: '4',
    question: 'Có những trò chơi dân gian nào tại Làng Du lịch Sinh thái Ông Đề?',
    answer:
      'Làng du lịch cung cấp nhiều trò chơi dân gian thú vị như tát mương bắt cá, đi xe đạp qua cầu ván, bơi xuồng chèo, bịt mắt bắt vịt, đi cầu bập bênh trên mương, và đua xe đạp nước trên sông, mang đến trải nghiệm đậm chất miền Tây.',
  },
  {
    key: '5',
    question: 'Ẩm thực tại Làng Du lịch Sinh thái Ông Đề có gì đặc biệt?',
    answer:
      'Du khách có thể thưởng thức các món ăn dân dã miền Tây như cá lóc nướng trui, ốc luộc, lẩu mắm Ông Đề, lẩu cua đồng, và các loại bánh dân gian Nam Bộ như bánh tét lá cẩm, bánh bò, bánh da lợn. Các món ăn được chế biến từ nguyên liệu tươi ngon, đậm chất vùng sông nước.',
  },
  {
    key: '6',
    question: 'Làng Du lịch Ông Đề có dịch vụ lưu trú không?',
    answer:
      'Có, làng du lịch có khu homestay với các phòng nghỉ được bố trí thoáng đãng, view nhìn ra sông và cầu khỉ, giúp du khách hòa mình vào không gian thiên nhiên miền Tây. Đây là lựa chọn lý tưởng cho gia đình hoặc nhóm muốn nghỉ qua đêm.',
  },
  {
    key: '7',
    question: 'Làm thế nào để di chuyển đến Làng Du lịch Sinh thái Ông Đề?',
    answer:
      'Làng du lịch nằm tại tổ 26, ấp Mỹ Ái, xã Mỹ Khánh, huyện Phong Điền, cách trung tâm Cần Thơ khoảng 7-10km. Từ trung tâm, đi theo đường Nguyễn Văn Cừ nối dài, đến ngã tư Rạch Ông Đề, rẽ phải khoảng 300m là đến. Du khách có thể di chuyển bằng xe máy, ô tô hoặc taxi, mất khoảng 20-30 phút.',
  },
  {
    key: '8',
    question: 'Làng Du lịch Ông Đề có tổ chức sự kiện hoặc lễ hội nào không?',
    answer:
      'Có, làng du lịch tổ chức Lễ giỗ Ông Đề vào ngày 20/02 âm lịch hàng năm, với các nghi thức dâng hương và biểu diễn nghệ thuật truyền thống như cải lương, hát bội. Ngoài ra, các lễ hội bánh dân gian Nam Bộ cũng thường được tổ chức, trưng bày và cho phép du khách thưởng thức các loại bánh đặc trưng.',
  },
  {
    key: '9',
    question: 'Có thể thuê trang phục tại Làng Du lịch Ông Đề không?',
    answer:
      'Có, làng du lịch cung cấp dịch vụ cho thuê áo bà ba và nón lá, giúp du khách trải nghiệm phong cách miền Tây sông nước và chụp ảnh lưu niệm. Vui lòng liên hệ nhân viên tại khu du lịch để biết thêm chi tiết về giá thuê.',
  },
  {
    key: '10',
    question: 'Giá vé vào Làng Du lịch Sinh thái Ông Đề là bao nhiêu?',
    answer:
      'Giá vé vào cổng, bao gồm tham quan và các trò chơi, khoảng 70.000 VNĐ/người. Giá có thể thay đổi tùy thời điểm, vui lòng kiểm tra trực tiếp qua hotline 0901 276 222 hoặc website http://ongde.vn/ để cập nhật thông tin mới nhất.',
  },
];


  return (
    <div className="md:px-6 px-3 max-w-7xl mx-auto py-12 mt-8">
      <Title level={3} className="text-center !text-xl md:!text-3xl !mb-8">
        Câu Hỏi Thường Gặp
      </Title>
      <Collapse
        accordion
        className="bg-white !rounded-xl !shadow-sm !border-gray-200"
        expandIconPosition="end"
      >
        {faqs.map((faq) => (
          <Panel
            header={<span className="!text-gray-700 !font-medium">{faq.question}</span>}
            key={faq.key}
          >
            <Paragraph className="!text-gray-700 !text-sm">{faq.answer}</Paragraph>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

