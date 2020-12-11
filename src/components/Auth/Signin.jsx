import React from "react";
import { Button, Form, Input } from "antd";
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
      <h2>Welcome Back !</h2>
      <p>
        Don't have an Account? <Link to="/signup">Create Now </Link>
      </p>
      <Form {...layout} layout="vertical" name="basic" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your username!" },
            { type: "email", message: "Please input valid email!" },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <div className="btn">
          <Button htmlType="submit">SIGN IN</Button>
        </div>
      </Form>
    </div>
  );
};

export default Signin;
