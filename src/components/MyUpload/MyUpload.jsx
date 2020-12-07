import React from "react";
import { Avatar, Button, Card, Col, Image, Tabs, Popconfirm, Row } from "antd";
import {
  BookOutlined,
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./myupload.css";
const { TabPane } = Tabs;
const MyUpload = () => {
  function confirm() {
    console.log("Clicked on Yes.");
  }
  return (
    <div className="myuploads">
      <h2>My Uploads</h2>
      <Tabs type="card">
        <TabPane
          tab={
            <span>
              <FileTextOutlined />
              Notes
            </span>
          }
          key="1"
        >
          <Row gutter={[16, 16]}>
            <Col md={12} xs={24}>
              <div className="innerWrapper">
                <Card className="itemWrapper">
                  <Row gutter={8}>
                    <Col md={18} xs={18}>
                      <h3>Material Science</h3>
                      <p>Physics</p>
                    </Col>
                    <Col md={6} xs={6}>
                      <div className="btnWrapper">
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<EditOutlined />}
                        />

                        <Popconfirm
                          placement="topRight"
                          title="
                          Are you sure you want to delete?"
                          onConfirm={confirm}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            danger
                            type="primary"
                            shape="circle"
                            icon={<DeleteOutlined />}
                          />
                        </Popconfirm>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
            <Col md={12} xs={24}>
              <div className="innerWrapper">
                <Card className="itemWrapper">
                  <Row gutter={8}>
                    <Col md={18} xs={18}>
                      <h3>Material Science</h3>
                      <p>Physics</p>
                    </Col>
                    <Col md={6} xs={6}>
                      <div className="btnWrapper">
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<EditOutlined />}
                        />
                        <Popconfirm
                          placement="topRight"
                          title="
                          Are you sure you want to delete?"
                          onConfirm={confirm}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            danger
                            type="primary"
                            shape="circle"
                            icon={<DeleteOutlined />}
                          />
                        </Popconfirm>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <BookOutlined />
              Book
            </span>
          }
          key="2"
        >
          <Row gutter={[16, 16]}>
            <Col md={24} xs={24}>
              <div className="innerWrapper">
                <Card className="itemWrapper">
                  <Row gutter={8}>
                    <Col md={4} xs={6}>
                      <Avatar
                        shape="square"
                        src={
                          <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                      />
                    </Col>
                    <Col md={16} xs={18}>
                      <h3>Material Science</h3>
                      <p>Physics</p>
                      <h3>600</h3>
                    </Col>
                    <Col md={4} xs={24}>
                      <div className="btnWrapper">
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<EditOutlined />}
                        />

                        <Popconfirm
                          placement="topRight"
                          title="
                          Are you sure you want to delete?"
                          onConfirm={confirm}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            danger
                            type="primary"
                            shape="circle"
                            icon={<DeleteOutlined />}
                          />
                        </Popconfirm>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MyUpload;
