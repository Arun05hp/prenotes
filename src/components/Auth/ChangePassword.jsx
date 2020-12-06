import React from "react";
import { Button, Card, Form, Input } from "antd";
import "./changepassword.css";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

const ChangePassword = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="changePassword">
      <div className="wrapper">
        <h2>Change Password</h2>
        <Card>
          <Form {...layout} layout="vertical" name="basic" onFinish={onFinish}>
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={[
                { required: true, message: "Please input your old password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Change
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ChangePassword;
