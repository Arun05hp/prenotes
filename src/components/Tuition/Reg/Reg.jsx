import {
  Button,
  Form,
  Col,
  Input,
  message,
  InputNumber,
  TimePicker,
  Row,
  Select,
} from "antd";
import React, { useContext, useState } from "react";
import { Context as AuthContext } from "../../../context/AuthContext";
import http from "../../../services/httpService";
import "./reg.css";
const { Option } = Select;

const Reg = () => {
  const { state } = useContext(AuthContext);
  const { userData } = state;
  const [form] = Form.useForm();

  const onFinish = (val) => {
    let data = {
      iduser: userData.iduser,
      ...val,
    };
    http
      .post("tutor/regtutor", data)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        message.success("Submit Successfully", 3);
        form.resetFields();
      })
      .catch((err) => {
        if (!err.response) return message.error("Network Error", 3);
        if (err.response.status && err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  return (
    <div className="tutor_wrapper">
      <h3>Enter Details</h3>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        name="basic"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col md={12} sm={24} xs={24}>
            <Form.Item
              label="Tutor Name"
              name="tutorName"
              rules={[
                {
                  required: true,
                  message: "Required!",
                },
              ]}
            >
              <Input autoComplete="off" size="large" />
            </Form.Item>
          </Col>

          <Col md={12} sm={24} xs={24}>
            <Form.Item
              label="Specialized Subject"
              name="subject"
              rules={[
                {
                  required: true,
                  message: "Required!",
                },
              ]}
            >
              <Input autoComplete="off" size="large" />
            </Form.Item>
          </Col>

          <Col md={12} sm={24} xs={24}>
            <Form.Item
              label="Timing"
              name="timing"
              rules={[
                {
                  required: true,
                  message: "Required!",
                },
              ]}
            >
              <TimePicker
                use12Hours
                size="large"
                style={{ width: "100%" }}
                format="h:mm a"
                onChange={(val) => console.log(val)}
              />
            </Form.Item>
          </Col>

          <Col md={12} sm={24} xs={24}>
            <Form.Item
              label="Price"
              name="fees"
              rules={[
                {
                  required: true,
                  message: "Required!",
                },
              ]}
            >
              <InputNumber min={0} size="large" style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col md={12} sm={24} xs={24}>
            <Form.Item
              name="loc"
              label="Location"
              rules={[{ required: true, message: "Required!" }]}
            >
              <Input autoComplete="off" size="large" />
            </Form.Item>
          </Col>

          <Col md={12} sm={24} xs={24}>
            <Form.Item
              label="Contact no. (optional)"
              name="contact"
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

          <Col md={12} sm={24} xs={24}>
            <Form.Item
              label="Day"
              name="day"
              rules={[{ required: true, message: "Required!" }]}
            >
              <Input
                placeholder="Sunday, Monday .."
                autoComplete="off"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <Form.Item
              name="for"
              label="For"
              rules={[{ required: true, message: "Required!" }]}
            >
              <Select size="large">
                <Option value="Male">Boys</Option>
                <Option value="Female">Girls</Option>
                <Option value="All">Both</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col md={24} sm={24} xs={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Required!",
                },
                {
                  type: "email",
                  message: "Please input valid email!",
                },
              ]}
            >
              <Input autoComplete="off" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <div className="btn_wrapper">
          <Button htmlType="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default Reg;
