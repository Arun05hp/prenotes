import React, { useState } from "react";
import { Button, Col, Form, Input, notification, Row } from "antd";
import http from "../../services/httpService";
const Feedback = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const submitForm = (val) => {
    console.log(val);
    setIsLoading(true);
    http
      .post("prenotes/feedback", val)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setIsLoading(false);
        notification.success({
          message: "Thanks for your valuable feedback.",
          placement: "topRight",
        });

        form.resetFields();
      })
      .catch((err) => {
        if (err.response.status === 400)
          notification.error({
            message: err.response.data.message,
            placement: "topRight",
          });
      });
    setIsLoading(false);
  };

  return (
    <Form form={form} onFinish={submitForm} layout="vertical">
      <Row gutter={[32, 16]}>
        <Col md={12} xs={24}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please Input your Name!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email Required!" },
              { type: "email", message: "Email is not valid Email" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Contact No."
            name="mno"
            rules={[
              {
                minLength: 10,
                maxLength: 10,
                pattern: "^[0-9]{10}$",
                message: "Must be 10 digits",
              },
            ]}
          >
            <Input type="tel" size="large" />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <div className="textarea_wrapper">
            <Form.Item
              label="Your Message"
              name="message"
              rules={[
                { required: true, message: "Please Input your Message!" },
              ]}
            >
              <Input.TextArea size="large" />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <div className="feedBtn">
        <Button htmlType="submit" loading={isLoading}>
          Send Message
        </Button>
      </div>
    </Form>
  );
};

export default Feedback;
