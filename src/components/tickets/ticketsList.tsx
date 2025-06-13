import React, { useState, useEffect } from 'react';
import { Card, Button, Collapse, Typography } from 'antd';
import Link from 'next/link';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:8000/tickets');
        const data = await response.json();
        setTickets(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const getStartingPrice = (basePrices) => {
    const normalDayPrice = basePrices.find(
      (bp) => bp.price_type.name === 'Ngày thường'
    );
    return normalDayPrice ? normalDayPrice.price : basePrices[0]?.price || 0;
  };

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
    <div className="p-4 md:p-8 min-h-screen max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <Title level={2} className="!text-gray-800 !font-bold">
          Vé Tham Quan Làng Du Lịch Sinh Thái Ông Đề
        </Title>
      </div>

      {loading ? (
        <Paragraph>Loading tickets...</Paragraph>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="shadow-md hover:shadow-lg transition-shadow duration-300 border-none rounded-xl overflow-hidden"
              bodyStyle={{ padding: 0 }}
            >
              <div className="flex">
                <div className="w-32 bg-orange-100 flex flex-col items-center justify-center p-3">
                  <Paragraph className="!text-orange-600 !font-bold !text-lg !mb-4 text-center">
                    {formatPrice(getStartingPrice(ticket.base_prices))}
                  </Paragraph>
                  <Link href={`/tickets/${ticket.id}`}>
                    <Button
                      type="primary"
                      className="bg-orange-500 !p-3 border-orange-500 hover:bg-orange-600"
                      size="middle"
                    >
                      Chi tiết
                    </Button>
                  </Link>
                </div>
                <div className="flex-1 p-4">
                  <Title level={5} className="!text-gray-700 !text-lg !font-semibold !mb-2">
                    {ticket.name}
                  </Title>
                  <Paragraph className="!text-gray-600 !text-sm !mb-3 !text-lg">
                    {ticket.description}
                  </Paragraph>
                  <Paragraph className="!text-gray-500 !text-xs !italic !-mb-2">
                    Danh mục: {ticket.categories.map((cat) => cat.name).join(', ')}
                  </Paragraph>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="py-12">
        <Title level={2} className="!text-gray-800 !font-bold !mb-8 text-center">
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
    </div>
  );
}