import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Radio,
  Row,
  Menu,
  Modal,
  Select,
} from "antd";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

const PersonalInfo = () => {
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [visibleEdu, setVisibleEdu] = useState(false);
  const handleCancel = () => {
    setVisibleInfo(false);
    setVisibleEdu(false);
  };
  const handleBasicInfo = () => {
    setVisibleInfo(true);
  };
  const handleEdu = () => {
    setVisibleEdu(true);
  };

  const submitBasicInfo = (values) => {
    console.log("Success:", values);
  };
  const submitEdu = (values) => {
    console.log("Success:", values);
  };
  return (
    <div>
      {/* <div className="innerWrapper">
    <div className="avatarWrapper">
      <Avatar size={64} icon={<UserOutlined />} />
      <h3>Atul Kumar</h3>
    </div>
    <Card
      size="small"
      title="Basic Information"
      extra={
        <Button
          onClick={handleBasicInfo}
          shape="round"
          icon={<EditOutlined />}
          size="middle"
        />
      }
      className="infoCard"
    >
      <Row gutter={16}>
        <Col md={12} xs={24}>
          <p>
            <b>First Name : </b> Arun
          </p>
          <p>
            <b>Email : </b> kumar05.96@gmail.com
          </p>
          <p>
            <b>Mobile Number : </b>8894989573
          </p>
        </Col>
        <Col md={12} xs={24}>
          <p>
            <b>Last Name : </b> Kumar
          </p>
          <p>
            <b>DOB : </b>05/02/1994
          </p>
        </Col>
      </Row>
    </Card>
    <Card
      size="small"
      title="Education"
      extra={
        <Button
          onClick={handleEdu}
          shape="round"
          icon={<EditOutlined />}
          size="middle"
        />
      }
      className="infoCard"
    >
      <Row gutter={16}>
        <Col md={12} xs={24}>
          <p>
            <b>Institution : </b> Sant Longowal Institute of Engineering and
            Technology
          </p>
          <p>
            <b>Semester : </b> 2
          </p>
          <p>
            <b>Reg. No. : </b> 1830058
          </p>
          <p>
            <b>Hostal Address : </b> BH-3,Room No : 206
          </p>
        </Col>
        <Col md={12} xs={24}>
          <p>
            <b>Branch : </b> Computer Science Engineering
          </p>
          <p>
            <b>Duration : </b> kumar05.96@gmail.com
          </p>
          <p>
            <b>Hostaler : </b> Yes
          </p>
        </Col>
      </Row>
    </Card>
  </div> */}

      <Modal
        visible={visibleInfo}
        title="Basic Information"
        // onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            Update
          </Button>,
        ]}
      >
        <Form
          {...layout}
          layout="vertical"
          initialValues={{ remember: true }}
          name="basic"
          onFinish={submitBasicInfo}
        >
          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item
                label="Mobile Number"
                name="mobno"
                rules={[
                  {
                    required: true,
                    message: "Please input your mobile number!",
                  },
                  {
                    minLength: 10,
                    maxLength: 10,
                    pattern: "^[0-9]{10}$",
                    message: "Must be 10 digits",
                  },
                ]}
              >
                <Input type="tel" />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                label="DOB"
                name="dob"
                rules={[{ required: true, message: "Required!" }]}
              >
                <DatePicker
                  allowClear={false}
                  style={{ width: "100%" }}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                  { type: "email", message: "Please input valid email!" },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        visible={visibleEdu}
        title="Education"
        // onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            Update
          </Button>,
        ]}
      >
        <Form
          {...layout}
          layout="vertical"
          initialValues={{ remember: true }}
          name="basic"
          onFinish={submitEdu}
        >
          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item
                label="Institution"
                name="institution"
                rules={[{ required: true, message: "Required!" }]}
              >
                <Select
                  showSearch
                  placeholder="Select College"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  <Option value={1}>
                    Sant Longowal Institute of Engineering and Technology
                  </Option>
                  <Option value={2}>Panjab University</Option>
                  {/* <Option value={3}>Communicated</Option>
                  <Option value={4}>Identified</Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                label="Branch"
                name="branch"
                rules={[{ required: true, message: "Required!" }]}
              >
                <Select
                  showSearch
                  placeholder="Select Branch"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  <Option value="1">Mechanical Engineering</Option>
                  <Option value="2">Computer Science Engineering</Option>
                  <Option value="3">Electrical Engineering</Option>
                  <Option value="4">Civil Engineering</Option>
                  <Option value="5">Instrumentation Engineering</Option>
                  <Option value="6">Chemical Engineering</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item
                label="Semester"
                name="sem"
                rules={[
                  {
                    required: true,
                    message: "Required!",
                  },
                  {
                    minLength: 1,
                    maxLength: 1,
                    pattern: "^[0-8]{1}$",
                    message: "Number Only 1-8",
                  },
                ]}
              >
                <Input type="tel" placeholder="1" />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                label={"Start & End Year "}
                name="duration"
                rules={[{ required: true, message: "Required!" }]}
              >
                <RangePicker style={{ width: "100%" }} picker="year" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item
                label="Roll No / Reg No"
                name="regNo"
                rules={[{ required: true, message: "Required!" }]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                name="hostaler"
                label="Hostaler"
                rules={[{ required: true, message: "Please pick an item!" }]}
              >
                <Radio.Group>
                  <Radio.Button value={1}>Yes</Radio.Button>
                  <Radio.Button value={0}>No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default PersonalInfo;
