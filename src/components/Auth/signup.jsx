import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Steps,
} from "antd";
import { Link } from "react-router-dom";
import "./signup.css";
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};
const { Step } = Steps;
const steps = [
  {
    title: "Basic Information",
    content: "First-content",
  },
  {
    title: "Education",
    content: "Second-content",
  },
];

const dateFormat = "DD/MM/YYYY";

const Signup = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    next();
  };
  return (
    <div className="signup">
      <h2>Create account</h2>

      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {current === 0 ? (
        <Card>
          <Form {...layout} layout="vertical" name="basic" onFinish={onFinish}>
            <Row gutter={16}>
              <Col md={12} xs={24}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={12} xs={24}>
                <Form.Item
                  label="Mobile Number"
                  name="mobno"
                  rules={[
                    {
                      required: true,
                      message: "Please input your mobile number!",
                    },
                    {
                      minLength: 10,
                      maxLength: 10,
                      pattern: "^[0-9]{10}$",
                      message: "Must be 10 digits",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  label="DOB"
                  name="dob"
                  rules={[{ required: true, message: "Required!" }]}
                >
                  <DatePicker style={{ width: "100%" }} format={dateFormat} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={12} xs={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your username!" },
                    { type: "email", message: "Please input valid email!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ) : null}
      {/* <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}
      <Card className="footer-link">
        <p>
          Already have an account? <Link to="/signin">Sign In </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
