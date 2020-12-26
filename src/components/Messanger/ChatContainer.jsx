import {
  AntDesignOutlined,
  EllipsisOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Form, Input } from "antd";
import React from "react";
import { useSocket } from "../../context/SocketProvider";
const ChatContainer = () => {
  // const socket = useSocket();
  const handleSubmit = (val) => {
    console.log(val.msg);
    // socket.emit("send-message", val.msg);
  };

  return (
    <div className="msg_box">
      <header>
        <div className="user">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40 }}
            icon={<AntDesignOutlined />}
          />
          <p className="username">Arun</p>
        </div>
        <EllipsisOutlined rotate={90} />
      </header>
      <div className="chat_container">
        <div className="messages"></div>
        <div className="input">
          <Form className="form" onFinish={handleSubmit}>
            <Form.Item name="msg">
              <Input.TextArea rows={1} />
            </Form.Item>
            <div className="btn">
              <Button shape="circle" htmlType="submit">
                <SendOutlined />
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
