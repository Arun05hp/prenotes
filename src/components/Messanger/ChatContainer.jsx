import { EllipsisOutlined, SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, message } from "antd";
import React, { useEffect, useCallback } from "react";
import { useSocket } from "../../context/SocketProvider";
import useSessionStorage from "../../helper/useSessionStorage";
import http from "../../services/httpService";
const BASEURL = process.env.REACT_APP_BASE_URL;
const ChatContainer = ({ id, friendDetails }) => {
  const [form] = Form.useForm();
  const [messageList, setMessagesList] = useSessionStorage("messages", []);
  const socket = useSocket();

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const getMessages = (id) => {
    http
      .get("messages/msg/" + id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        console.log(res.messages);
        setMessagesList(res.messages);
      })
      .catch((err) => {
        if (!err.response) return message.error("Network Error", 3);
        if (err.response.status && err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  useEffect(() => {
    if (friendDetails.roomId) getMessages(friendDetails.roomId);
  }, [friendDetails.roomId]);

  const handleSubmit = (val) => {
    let data = {
      sender: id,
      recipient: friendDetails.id,
      text: val.msg,
      roomId: friendDetails.roomId,
    };

    socket.emit("send-message", data);
    setMessagesList((prev) => [...prev, { sender: id, text: val.msg }]);
    form.resetFields();
  };

  const validateMessages = {
    required: "",
  };

  const handleMessages = (msg) => {
    setMessagesList((prev) => [...prev, msg]);
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
            src={
              friendDetails.userDetails.profileImg != null
                ? BASEURL + friendDetails.userDetails.profileImg
                : null
            }
          >
            {friendDetails.userDetails.name
              ? friendDetails.userDetails.name.charAt(0)
              : ""}
          </Avatar>
          <p className="username"> {friendDetails.userDetails.name}</p>
        </div>
        <EllipsisOutlined rotate={90} />
      </header>
      <div className="chat_container">
        <div className="messages">
          {messageList.map((item, i) => {
            const lastMsg = messageList.length - 1 === i;
            return (
              <div
                ref={lastMsg ? setRef : null}
                key={i}
                className={`${item.sender === id ? "me" : "from"}`}
              >
                {item.text}
              </div>
            );
          })}
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
