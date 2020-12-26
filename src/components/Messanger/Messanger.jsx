import { Col, Row } from "antd";
import React from "react";
import { SocketProvider } from "../../context/SocketProvider.js";
import ChatContacts from "./ChatContacts.jsx";
import ChatContainer from "./ChatContainer.jsx";
import "./messanger.css";

const Messanger = () => {
  return (
    <SocketProvider id={2}>
      <div className="msg_wrapper">
        <Row gutter={[16, 16]}>
          <Col md={6} xs={24}>
            <ChatContacts />
          </Col>
          <Col md={18} xs={24}>
            <ChatContainer />
          </Col>
        </Row>
      </div>
    </SocketProvider>
  );
};

export default Messanger;
