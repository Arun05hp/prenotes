import React from "react";
import { Card, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import "./signup.css";
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

const Signup = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="signup">
      <h2>Create account</h2>
      <Card>
        <Form {...layout} layout="vertical" name="basic" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mobile Number"
            name="mobno"
            rules={[
              { required: true, message: "Please input your mobile number!" },
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
              Sign up
            </Button>
          </Form.Item>
        </Form>

        <p>
          Already have an account? <Link to="/signin">Sign In </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
