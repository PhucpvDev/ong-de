import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  Card,
  Row,
  Col,
  Space,
  Typography,
  message,
  Checkbox,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function JobApplicationForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const positions = [
    'Hướng dẫn viên du lịch',
    'Nhân viên lễ tân',
    'Nhân viên phục vụ nhà hàng',
    'Thuyền trưởng/Lái thuyền',
    'Nhân viên bảo vệ',
    'Nhân viên vệ sinh',
    'Nhân viên kỹ thuật',
    'Nhân viên marketing',
    'Kế toán',
    'Khác',
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.success('Đơn ứng tuyển đã được gửi thành công!');
      form.resetFields();
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  return (
    <div className="md:px-6 px-4 py-16">
      <div className="!max-w-4xl !mx-auto">
        <div className="text-center !mb-8">
          <Title level={2} className="!text-green-700">
            Thông tin ứng tuyển
          </Title>
        </div>
        <div className="!rounded-2xl !overflow-hidden relative">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="!p-3"
            size="large"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                  <Input
                    prefix={<UserOutlined className="!text-gray-300" />}
                    placeholder="Nguyễn Văn A"
                    className="!rounded-lg hover:!border-green-600 focus:!border-green-600"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined className="!text-gray-300" />}
                    placeholder="0123456789"
                    className="!rounded-lg hover:!border-green-600 focus:!border-green-600"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="!text-gray-300" />}
                    placeholder="example@email.com"
                    className="!rounded-lg hover:!border-green-600 focus:!border-green-600"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Vị trí ứng tuyển"
                  name="position"
                  rules={[{ required: true, message: 'Vui lòng chọn vị trí!' }]}
                >
                  <Select
                    placeholder="Chọn vị trí ứng tuyển"
                    className="!rounded-lg"
                    dropdownClassName="!rounded-lg"
                  >
                    {positions.map((pos) => (
                      <Option key={pos} value={pos}>
                        {pos}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Giới thiệu bản thân và động cơ ứng tuyển"
              name="introduction"
              rules={[{ required: true, message: 'Vui lòng giới thiệu về bản thân!' }]}
            >
              <TextArea
                rows={4}
                placeholder="Hãy chia sẻ về bản thân và lý do bạn muốn làm việc tại Làng Du Lịch Ông Đề..."
                className="!rounded-lg hover:!border-green-600 focus:!border-green-600"
              />
            </Form.Item>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="CV (PDF, DOC, DOCX)"
                  name="cv"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[{ required: true, message: 'Vui lòng tải lên CV!' }]}
                >
                  <Upload accept=".pdf,.doc,.docx" beforeUpload={() => false} className="!w-full">
                    <Button
                      icon={<UploadOutlined />}
                      className="!w-full !h-9 !px-14 !rounded-lg hover:!border-green-600 hover:!text-green-600 !text-gray-700"
                    >
                      Tải lên CV
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[{ required: true, message: 'Vui lòng đồng ý với điều khoản!' }]}
            >
              <Checkbox className="!text-gray-700">
                Tôi đồng ý với{' '}
                <Text className="!text-green-600 !underline">điều khoản và chính sách</Text> của
                Làng Du Lịch Ông Đề Cần Thơ
              </Checkbox>
            </Form.Item>

            <Form.Item className="!mb-0">
              <Space className="!w-full !justify-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  className="!bg-green-600 !rounded-full !px-12 !py-3 !h-auto !text-base !shadow-lg hover:!bg-green-700"
                >
                  Gửi đơn ứng tuyển
                </Button>
              </Space>
            </Form.Item>
          </Form>
          <div className="absolute bg-green-50/70 rounded-full w-xl h-[550px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"></div>
        </div>
      </div>
    </div>
  );
}