import React from "react";
import { Avatar, Button, Col, Row, Form, Input } from "antd";
import {
  AntDesignOutlined,
  EllipsisOutlined,
  SendOutlined,
} from "@ant-design/icons";
import "./messanger.css";

const Messanger = () => {
  return (
    <div className="msg_wrapper">
      <Row gutter={[16, 16]}>
        <Col md={6} xs={24}>
          <div className="userlist">
            <header>
              <h3>Chats</h3>
            </header>
            <div className="userlist_body">
              <div className="user">
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40 }}
                  icon={<AntDesignOutlined />}
                />
                <p className="username">Arun</p>
              </div>
              <div className="user">
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40 }}
                  icon={<AntDesignOutlined />}
                />
                <p className="username">Arun</p>
              </div>
              <div className="user">
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40 }}
                  icon={<AntDesignOutlined />}
                />
                <p className="username">Arun</p>
              </div>
              <div className="user">
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40 }}
                  icon={<AntDesignOutlined />}
                />
                <p className="username">Arun</p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={18} xs={24}>
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
                <Form className="form">
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
        </Col>
      </Row>
    </div>
  );
};

export default Messanger;
