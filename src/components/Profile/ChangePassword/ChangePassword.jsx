import { Button, Form, Input, message } from "antd";
import React from "react";
import http from "../../../services/httpService";
import "./changepassword.css";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

const ChangePassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let data = {
      iduser: 1,
      ...values,
    };
    http
      .post("/user/changepassword", data)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        form.resetFields();
        message.success("Password Changed Successfully", 3);
      })
      .catch((err) => {
        if (err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };
  return (
    <div className="changePassword">
      <div className="wrapper">
        <h2>Change Password</h2>
        <p>Avoid sharing your password with others.</p>
        <Form
          form={form}
          {...layout}
          layout="vertical"
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              CHANGE PASSWORD
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
