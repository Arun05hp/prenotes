import {
  EllipsisOutlined,
  SendOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Form, Input, message, Popover } from "antd";
import React, { useEffect, useCallback, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import useSessionStorage from "../../helper/useSessionStorage";
import http from "../../services/httpService";
const BASEURL = process.env.REACT_APP_BASE_URL;
const ChatContainer = ({ id, friendDetails }) => {
  const [form] = Form.useForm();
  const [messageList, setMessagesList] = useSessionStorage("messages", []);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const socket = useSocket();

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const getMessages = (id) => {
    setIsLoading(true);
    http
      .get("messages/msg/" + id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setMessagesList(res.messages.messages);
        setStatus(res.messages.status);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!err.response) return message.error("Network Error", 3);
        setIsLoading(false);
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
    if (!status) setMessagesList((prev) => [...prev, msg]);
  };

  const handleBlock = () => {
    if (!friendDetails.roomId) return;

    let data = { id: id, roomId: friendDetails.roomId };
    http
      .post("messages/block", data)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        getMessages(friendDetails.roomId);
      })
      .catch((err) => {});
  };

  const handleUnBlock = () => {
    if (!friendDetails.roomId) return;

    let data = { roomId: friendDetails.roomId };
    http
      .post("messages/unblock", data)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        getMessages(friendDetails.roomId);
      })
      .catch((err) => {});
  };

  const handleDelMsg = (id) => {
    const msgs = messageList.filter((msg) => msg.id !== id);
    setMessagesList(msgs);
    if (!friendDetails.roomId) return;

    let data = { id: id, roomId: friendDetails.roomId };
    http
      .post("messages/delmsg", data)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };
  console.log("stat", status, "id", id, status === id);
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
              status
                ? null
                : friendDetails.userDetails.profileImg != null
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
        {status ? (
          status === id ? (
            <Popover
              placement="bottomRight"
              title={null}
              content={
                <Button type="text" onClick={handleUnBlock}>
                  UnBlock
                </Button>
              }
              trigger="click"
            >
              <EllipsisOutlined rotate={90} />
            </Popover>
          ) : null
        ) : (
          <Popover
            placement="bottomRight"
            title={null}
            content={
              <Button type="text" onClick={handleBlock}>
                Block
              </Button>
            }
            trigger="click"
          >
            <EllipsisOutlined rotate={90} />
          </Popover>
        )}
      </header>
      <div className="chat_container">
        <div className="messages">
          {isLoading ? (
            <LoadingOutlined
              style={{ fontSize: 24, alignSelf: "center" }}
              spin
            />
          ) : (
            messageList.map((item, i) => {
              const lastMsg = messageList.length - 1 === i;
              return (
                <Popover
                  placement="bottom"
                  title={null}
                  content={
                    <DeleteOutlined
                      style={{ color: "#d51111" }}
                      onClick={() => handleDelMsg(item.id)}
                    />
                  }
                  trigger="click"
                  key={i}
                >
                  <div
                    ref={lastMsg ? setRef : null}
                    className={`${item.sender === id ? "me" : "from"}`}
                  >
                    {item.text}
                  </div>
                </Popover>
              );
            })
          )}
        </div>
        <Form
          form={form}
          className="form"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          {status ? (
            <div className="blockmsg">
              <p>
                You cannot send message to {friendDetails.userDetails.name}.{" "}
              </p>
            </div>
          ) : (
            <>
              <Form.Item name="msg" rules={[{ required: true }]}>
                <Input.TextArea rows={1} />
              </Form.Item>
              <div className="btn">
                <Button shape="circle" htmlType="submit" disabled={isLoading}>
                  <SendOutlined />
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default ChatContainer;
