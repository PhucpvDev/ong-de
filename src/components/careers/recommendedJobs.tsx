import React from 'react';
import { Table, Typography, Button } from 'antd';

const { Title, Text } = Typography;

export default function RecommendedJobsTable() {
  const columns = [
    {
      title: 'Vị Trí',
      dataIndex: 'title',
      key: 'title',
      width: '45%',
      render: (text) => (
        <Text className="!text-green-600 !font-medium hover:!text-green-700 !cursor-pointer">
          {text}
        </Text>
      ),
    },
    {
      title: 'Địa điểm',
      dataIndex: 'city',
      key: 'city',
      width: '15%',
      render: (text) => (
        <Text className="!text-gray-700 font-medium">
          {text}
        </Text>
      ),
    },
    {
      title: 'Bộ Phận',
      dataIndex: 'department',
      key: 'department',
      width: '20%',
      render: (text) => (
        <Text className="!text-gray-700 font-medium">
          {text}
        </Text>
      ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      width: '30%',
      render: (_, record) => (
        <Button
          type="primary"
          className="!bg-green-600 !rounded-full !border-green-600 hover:!bg-green-700 hover:!border-green-700 !text-white"
          href={`/jobs/${record.jobId}`}
          target="_blank"
        >
          Ứng Tuyển Ngay
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      title: 'Hướng Dẫn Viên Du Lịch Sinh Thái',
      jobId: 'OD-1001',
      city: 'Cần Thơ',
      department: 'Dịch Vụ Du Lịch',
    },
    {
      key: '2',
      title: 'Nhân Viên Chăm Sóc Khách Hàng',
      jobId: 'OD-1002',
      city: 'Cần Thơ',
      department: 'Chăm Sóc Khách Hàng',
    },
    {
      key: '3',
      title: 'Thực Tập Sinh Marketing Du Lịch [Tháng 8/2025]',
      jobId: 'OD-1003',
      city: 'Cần Thơ',
      department: 'Marketing',
    },
    {
      key: '4',
      title: 'Quản Lý Sự Kiện Văn Hóa & Du Lịch',
      jobId: 'OD-1004',
      city: 'Cần Thơ',
      department: 'Tổ Chức Sự Kiện',
    },
    {
      key: '5',
      title: 'Nhân Viên Phát Triển Quan Hệ Đối Tác Du Lịch',
      jobId: 'OD-1005',
      city: 'Cần Thơ',
      department: 'Phát Triển Kinh Doanh',
    },
    {
      key: '6',
      title: 'Quản Lý Hoạt Động Vận Hành Làng Du Lịch',
      jobId: 'OD-1006',
      city: 'Cần Thơ',
      department: 'Vận Hành',
    },
  ];

  return (
    <div className="!max-w-7xl !mx-auto !px-4 !py-8">
      <div className="!mb-8">
        <Title className="!text-3xl !md:text-4xl !font-bold !text-gray-800 !text-center">
          Cơ Hội Việc Làm Tại Làng Du Lịch Sinh Thái Ông Đề
        </Title>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="!border-none !shadow-none"
        size="large"
      />
    </div>
  );
};