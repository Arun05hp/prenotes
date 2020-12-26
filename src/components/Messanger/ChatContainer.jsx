import {
  AntDesignOutlined,
  EllipsisOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
const ChatContainer = ({ id, friendDetails }) => {
  const [form] = Form.useForm();
  const [messages, setMessages] = useState([]);
  const socket = useSocket();
  const handleSubmit = (val) => {
    let data = {
      sender: id,
      recipient: friendDetails.id,
      text: val.msg,
      roomId: friendDetails.roomId,
    };

    socket.emit("send-message", data);
    form.resetFields();
  };

  const validateMessages = {
    required: "",
  };

  const handleMessages = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", handleMessages);

    return () => socket.off("receive-message");
  }, [socket]);
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
        <div className="messages">
          {messages.map((item) => (
            <div className={`${item.sender === id ? "me" : "from"}`}>hello</div>
          ))}
        </div>
        <Form
          form={form}
          className="form"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item name="msg" rules={[{ required: true }]}>
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
  );
};

export default ChatContainer;
