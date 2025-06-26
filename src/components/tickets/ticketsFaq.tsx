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
  ];

  return (
    <div className="md:px-6 px-3 max-w-7xl mx-auto py-12 mt-8">
      <Title level={2} className="!text-gray-800 !font-bold !mb-8">
        Câu Hỏi Thường Gặp
      </Title>
      <Collapse
        accordion
        className="bg-white rounded-xl shadow-md border-none"
        expandIconPosition="end"
      >
        {faqs.map((faq) => (
          <Panel
            header={<span className="text-gray-700 font-medium">{faq.question}</span>}
            key={faq.key}
            className="border-b last:border-b-0"
          >
            <Paragraph className="!text-gray-600 !text-sm">{faq.answer}</Paragraph>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

