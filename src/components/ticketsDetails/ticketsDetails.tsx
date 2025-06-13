import Head from 'next/head';
import { Breadcrumb, Row, Col, Tag, Card, Collapse, Button } from 'antd';
import { UpOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { useState } from 'react';

const apiData = [
  {
    id: 1,
    name: "Vé Người Lớn",
    description: "Vé vào cổng tham quan Làng Du lịch Sinh thái Ông Đề, Cần Thơ",
    includes: "Tham quan khu du lịch, trải nghiệm văn hóa miền Tây, chụp ảnh tại các điểm check-in",
    categories: [
      {
        id: 6,
        name: "Vé Tham Quan",
        slug: "ve-tham-quan",
        description: "Vé dùng để vào cổng Làng Du lịch Sinh thái Ông Đề"
      }
    ],
    base_prices: [
      { price: 100000, price_type: { id: 2, name: "Ngày thường", description: "Giá áp dụng từ thứ Hai đến thứ Sáu" } },
      { price: 120000, price_type: { id: 3, name: "Ngày lễ", description: "Giá áp dụng cho các ngày lễ, Tết" } },
      { price: 110000, price_type: { id: 4, name: "Cuối tuần", description: "Giá áp dụng cho thứ Bảy và Chủ Nhật" } }
    ],
    capacity_prices: [
      {
        price: 90000,
        min_person: 10,
        max_person: 20,
        price_type: { id: 2, name: "Ngày thường", description: "Giá áp dụng từ thứ Hai đến thứ Sáu" },
        customer_segment: { id: 1, name: "Người lớn", description: "Khách từ 12 tuổi trở lên" }
      }
    ],
    segment_prices: [
      {
        price: 100000,
        price_type: { id: 1, name: "Default", description: "Giá áp dụng cho mọi thời điểm" },
        customer_segment: { id: 1, name: "Người lớn", description: "Khách từ 12 tuổi trở lên" }
      },
      {
        price: 50000,
        price_type: { id: 1, name: "Default", description: "Giá áp dụng cho mọi thời điểm" },
        customer_segment: { id: 2, name: "Trẻ em (1m2 - 1m4)", description: "Trẻ em cao từ 1m2 đến dưới 1m4" }
      },
      {
        price: 0,
        price_type: { id: 1, name: "Default", description: "Giá áp dụng cho mọi thời điểm" },
        customer_segment: { id: 3, name: "Trẻ em dưới 1m2", description: "Trẻ em cao dưới 1m2 được miễn phí vé" }
      }
    ],
    policies: [
      {
        id: 1,
        name: "Chính sách đổi vé",
        content: "Vé có thể đổi trước 24 giờ với điều kiện vé chưa sử dụng",
        description: "Chính sách đổi vé linh hoạt cho khách hàng",
        type: "Đổi trả"
      },
      {
        id: 2,
        name: "Chính sách hoàn tiền",
        content: "Hoàn tiền 100% nếu hủy vé trước 48 giờ",
        description: "Hoàn tiền cho vé chưa sử dụng",
        type: "Hoàn tiền"
      }
    ]
  }
];

export default function TicketsDetails() {
  const [tourInfoExpanded, setTourInfoExpanded] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [policiesExpanded, setPoliciesExpanded] = useState(false);

  const ticket = apiData[0];

  const fullTourInfo = [
    ticket.description,
    ticket.includes,
    "Tham quan chợ nổi tái hiện, làng nghề đan lát, và vườn trái cây theo mùa.",
    "Thưởng thức nghệ thuật đờn ca tài tử, di sản văn hóa phi vật thể được UNESCO công nhận."
  ];

  const fullDescription = [
    ticket.description,
    "Tham gia các hoạt động văn hóa đặc sắc như nghe đờn ca tài tử, học làm bánh dân gian, hoặc dạo quanh vườn trái cây theo mùa.",
    "Đây là lựa chọn lý tưởng cho gia đình, nhóm bạn muốn tìm hiểu về đời sống miền Tây."
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:py-24 font-roboto">
      <Head>
        <title>{ticket.name}</title>
      </Head>

      <Breadcrumb
        className="font-roboto hidden sm:block"
        items={[
          { title: 'Trang chủ' },
          { title: ticket.categories[0].name },
          { title: ticket.name },
        ]}
      />

      <div className="mb-6 md:mt-7 mt-10">
        <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900 mb-2">{ticket.name}</h1>
        <p className="text-gray-600">{ticket.categories[0].description}</p>
      </div>

      <Row gutter={[16, 24]}>
        <Col xs={24} md={16}>
          <div className="mb-6 bg-white border border-gray-200 p-6 rounded-xl shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-orange-600">Thông tin vé</h3>
              <Button
                type="text"
                icon={tourInfoExpanded ? <UpOutlined /> : <DownOutlined />}
                onClick={() => setTourInfoExpanded(!tourInfoExpanded)}
                className="text-gray-500"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base">
              {(tourInfoExpanded ? fullTourInfo : fullTourInfo.slice(0, 2)).map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
            {!tourInfoExpanded && fullTourInfo.length > 2 && (
              <Button
                type="link"
                className="text-orange-500 font-medium mt-4 p-0"
                onClick={() => setTourInfoExpanded(true)}
              >
                Xem thêm <RightOutlined className="text-xs" />
              </Button>
            )}
          </div>

          <div className="mb-6 bg-white border border-gray-200 p-6 rounded-xl shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-orange-600">Mô tả vé</h3>
              <Button
                type="text"
                icon={descriptionExpanded ? <UpOutlined /> : <DownOutlined />}
                onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                className="text-gray-500"
              />
            </div>
            <div className="text-gray-700 text-base">
              {(descriptionExpanded ? fullDescription : fullDescription.slice(0, 1)).map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
              {!descriptionExpanded && fullDescription.length > 1 && (
                <Button
                  type="link"
                  className="text-orange-500 font-medium p-0"
                  onClick={() => setDescriptionExpanded(true)}
                >
                  Xem thêm <RightOutlined className="text-xs" />
                </Button>
              )}
            </div>
          </div>

          <div className="mb-6 bg-white border border-gray-200 p-6 rounded-xl shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-orange-600">Chính sách vé</h3>
              <Button
                type="text"
                icon={policiesExpanded ? <UpOutlined /> : <DownOutlined />}
                onClick={() => setPoliciesExpanded(!policiesExpanded)}
                className="text-gray-500"
              />
            </div>
            <div className="text-gray-700 text-base">
              {(policiesExpanded ? ticket.policies : ticket.policies.slice(0, 1)).map((policy, index) => (
                <div key={index} className="mb-4">
                  <p className="font-medium">{policy.name}</p>
                  <p>{policy.content}</p>
                </div>
              ))}
              {!policiesExpanded && ticket.policies.length > 1 && (
                <Button
                  type="link"
                  className="text-orange-500 font-medium p-0"
                  onClick={() => setPoliciesExpanded(true)}
                >
                  Xem thêm <RightOutlined className="text-xs" />
                </Button>
              )}
            </div>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <Card className="shadow-md rounded-xl sticky p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4">Giá vé</h2>

            <div className="mb-6">
              <h3 className="text-base font-medium mb-2">Giá vé cơ bản</h3>
              {ticket.base_prices.map((price, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">{price.price_type.name}</span>
                  <span className="text-orange-600 font-medium">{price.price.toLocaleString('vi-VN')} đ</span>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-base font-medium mb-2">Giá vé theo đối tượng</h3>
              {ticket.segment_prices.map((price, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">{price.customer_segment.name}</span>
                  <span className="text-orange-600 font-medium">
                    {price.price === 0 ? 'Miễn phí' : `${price.price.toLocaleString('vi-VN')} đ`}
                  </span>
                </div>
              ))}
            </div>

            {ticket.capacity_prices.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-medium mb-2">Giá vé theo đoàn</h3>
                {ticket.capacity_prices.map((price, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">{`Đoàn ${price.min_person}-${price.max_person} người (${price.price_type.name})`}</span>
                    <span className="text-orange-600 font-medium">{price.price.toLocaleString('vi-VN')} đ/người</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}