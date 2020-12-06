import React from "react";
import { Button, Card, Form, Input } from "antd";
import { Link } from "react-router-dom";
import "./signin.css";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

const Signin = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="signin">
      <h2>Sign In</h2>
      <Card>
        <Form {...layout} layout="vertical" name="basic" onFinish={onFinish}>
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

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>

        <p>
          Don't have an account? <Link to="/signup">Signup </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signin;
