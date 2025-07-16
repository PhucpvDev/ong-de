"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, message, Typography, ConfigProvider } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useLocale } from "next-intl";

const { Title, Text } = Typography;
const { TextArea } = Input;

export interface ContactFormTranslation {
  id: number;
  contact_form_id: number;
  languages_code: string;
  title: string;
  description: string;
  button_color: string;
  button_text: string;
  link_iframe: string;
}

export interface ContactForm {
  id: number;
  translations: ContactFormTranslation[];
}

export interface ContactFormResponse {
  data: ContactForm;
}

export async function GetContactForm(locale: string): Promise<ContactFormTranslation | undefined> {
  const lang = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/contact_form?lang=${lang}&fields=*,translations.*`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: ContactFormResponse = await response.json();

    if (!data) {
      throw new Error("No contact form data found");
    }

    const translation = data.translations.find((t) => t.languages_code === lang);

    if (!translation) {
      throw new Error(`No translation found for language: ${lang}`);
    }

    return translation;
  } catch (error) {
    console.error("Error fetching contact form data:", error);
    return undefined;
  }
}

const formContent = {
  vi: {
    fullNamePlaceholder: "Họ và Tên",
    phonePlaceholder: "Số Điện Thoại",
    emailPlaceholder: "Email",
    subjectPlaceholder: "Chủ Đề",
    messagePlaceholder: "Viết Tin Nhắn",
    sendButton: "Gửi Tin Nhắn",
    fullNameRequired: "Vui lòng nhập họ và tên!",
    phoneRequired: "Vui lòng nhập số điện thoại!",
    emailRequired: "Vui lòng nhập email!",
    emailInvalid: "Email không hợp lệ!",
    subjectRequired: "Vui lòng nhập chủ đề!",
    messageRequired: "Vui lòng nhập tin nhắn!",
  },
  en: {
    fullNamePlaceholder: "Full Name",
    phonePlaceholder: "Phone Number",
    emailPlaceholder: "Email",
    subjectPlaceholder: "Subject",
    messagePlaceholder: "Write Message",
    sendButton: "Send Message",
    fullNameRequired: "Please enter your full name!",
    phoneRequired: "Please enter your phone number!",
    emailRequired: "Please enter your email!",
    emailInvalid: "Invalid email address!",
    subjectRequired: "Please enter the subject!",
    messageRequired: "Please enter your message!",
  },
  zh: {
    fullNamePlaceholder: "姓名",
    phonePlaceholder: "电话号码",
    emailPlaceholder: "电子邮件",
    subjectPlaceholder: "主题",
    messagePlaceholder: "写消息",
    sendButton: "发送消息",
    fullNameRequired: "请输入您的姓名！",
    phoneRequired: "请输入您的电话号码！",
    emailRequired: "请输入您的电子邮件！",
    emailInvalid: "电子邮件地址无效！",
    subjectRequired: "请输入主题！",
    messageRequired: "请输入您的消息！",
  },
  ko: {
    fullNamePlaceholder: "성명",
    phonePlaceholder: "전화번호",
    emailPlaceholder: "이메일",
    subjectPlaceholder: "제목",
    messagePlaceholder: "메시지 작성",
    sendButton: "메시지 보내기",
    fullNameRequired: "성명을 입력해 주세요!",
    phoneRequired: "전화번호를 입력해 주세요!",
    emailRequired: "이메일을 입력해 주세요!",
    emailInvalid: "유효하지 않은 이메일 주소입니다!",
    subjectRequired: "제목을 입력해 주세요!",
    messageRequired: "메시지를 입력해 주세요!",
  },
};

export default function ContactForm() {
  const locale = useLocale();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [contactFormData, setContactFormData] = useState<ContactFormTranslation | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContactForm() {
      try {
        setLoading(true);
        const data = await GetContactForm(locale);
        if (data) {
          setContactFormData(data);
        } else {
          setFetchError("No contact form data available.");
        }
      } catch (err) {
        console.error("Failed to fetch contact form data:", err);
        setFetchError("Failed to load contact form. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchContactForm();
  }, [locale]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form values:", values);
      message.success(
        locale === "vi"
          ? "Tin nhắn của bạn đã được gửi thành công!"
          : locale === "en"
          ? "Your message has been sent successfully!"
          : locale === "zh"
          ? "您的消息已成功发送！"
          : locale === "ko"
          ? "귀하의 메시지가 성공적으로 전송되었습니다!"
          : "Your message has been sent successfully!"
      );
      form.resetFields();
    } catch (error) {
      message.error(
        locale === "vi"
          ? "Có lỗi xảy ra, vui lòng thử lại!"
          : locale === "en"
          ? "An error occurred, please try again!"
          : locale === "zh"
          ? "发生错误，请重试！"
          : locale === "ko"
          ? "오류가 발생했습니다. 다시 시도해 주세요!"
          : "An error occurred, please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  const themeConfig = {
    token: {
      colorPrimary: contactFormData?.button_color || "#00A63E",
      borderRadius: 8,
    },
  };

  if (loading) {
    return (
      <div className="w-7xl mx-auto md:px-6 px-4 pb-10">
        <Row gutter={[32, 32]} className="items-stretch">
          <Col xs={24} lg={12}>
            <div className="bg-gray-100 p-8 rounded-2xl animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-8"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-20 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="h-full rounded-2xl bg-gray-300 animate-pulse"></div>
          </Col>
        </Row>
      </div>
    );
  }

  if (fetchError || !contactFormData) {
    return (
      <div className="text-center py-12 text-gray-600">
        {fetchError || "No contact form data available."}
      </div>
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="w-7xl mx-auto md:px-6 px-4 pb-10">
        <Row gutter={[32, 32]} className="items-stretch">
          <Col xs={24} lg={12}>
            <div className="bg-gray-100 p-8 rounded-2xl">
              <div className="mb-8">
                <Title level={2} className="!text-2xl !text-green-700">
                  {contactFormData.title}
                </Title>
                <Text className="!text-gray-700 font-semibold !text-lg">
                  {contactFormData.description}
                </Text>
              </div>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-6"
              >
                <Form.Item
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message:
                        formContent[locale]?.fullNameRequired ||
                        formContent.en.fullNameRequired,
                    },
                  ]}
                >
                  <Input
                    placeholder={
                      formContent[locale]?.fullNamePlaceholder ||
                      formContent.en.fullNamePlaceholder
                    }
                    size="large"
                    className="!rounded-lg !border-gray-300 !py-3"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message:
                        formContent[locale]?.phoneRequired ||
                        formContent.en.phoneRequired,
                    },
                  ]}
                >
                  <Input
                    placeholder={
                      formContent[locale]?.phonePlaceholder ||
                      formContent.en.phonePlaceholder
                    }
                    size="large"
                    className="!rounded-lg !border-gray-300 !py-3"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message:
                        formContent[locale]?.emailRequired ||
                        formContent.en.emailRequired,
                    },
                    {
                      type: "email",
                      message:
                        formContent[locale]?.emailInvalid ||
                        formContent.en.emailInvalid,
                    },
                  ]}
                >
                  <Input
                    placeholder={
                      formContent[locale]?.emailPlaceholder ||
                      formContent.en.emailPlaceholder
                    }
                    size="large"
                    className="!rounded-lg !border-gray-300 !py-3"
                  />
                </Form.Item>

                <Form.Item
                  name="subject"
                  rules={[
                    {
                      required: true,
                      message:
                        formContent[locale]?.subjectRequired ||
                        formContent.en.subjectRequired,
                    },
                  ]}
                >
                  <Input
                    placeholder={
                      formContent[locale]?.subjectPlaceholder ||
                      formContent.en.subjectPlaceholder
                    }
                    size="large"
                    className="!rounded-lg !border-gray-300 !py-3"
                  />
                </Form.Item>

                <Form.Item
                  name="message"
                  rules={[
                    {
                      required: true,
                      message:
                        formContent[locale]?.messageRequired ||
                        formContent.en.messageRequired,
                    },
                  ]}
                >
                  <TextArea
                    placeholder={
                      formContent[locale]?.messagePlaceholder ||
                      formContent.en.messagePlaceholder
                    }
                    rows={5}
                    className="!rounded-lg !border-gray-300 !resize-none"
                  />
                </Form.Item>

                <Form.Item className="!mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    style={{ backgroundColor: contactFormData.button_color }}
                    className="hover:!bg-opacity-80 !rounded-lg !font-semibold !py-3 w-full !h-auto"
                    icon={<SendOutlined />}
                  >
                    {contactFormData.button_text}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="h-full rounded-2xl">
              <iframe
                src={contactFormData.link_iframe}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px", borderRadius: "20px" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}