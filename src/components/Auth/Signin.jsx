import React, { useContext } from "react";
import { Button, Form, Input, notification } from "antd";
import { Context as AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import http from "../../services/httpService";
import "./signin.css";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const Signin = ({ handleCancel }) => {
  const { login } = useContext(AuthContext);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    http
      .post("/user/signin", values)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        handleCancel();
        form.resetFields();
        console.log(res.token);
        notification.success({
          message: "Login Successful",
          placement: "topRight",
        });
        login(true, res.token);
      })
      .catch((err) => {
        if (err.response.status === 400)
          notification.error({
            message: err.response.data.message,
            placement: "topRight",
          });
      });
  };
  return (
    <div className="signin">
      <h2>Welcome Back !</h2>
      <p>
        Don't have an Account? <Link to="/signup">Create Now </Link>
      </p>
      <Form
        form={form}
        {...layout}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
      >
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
