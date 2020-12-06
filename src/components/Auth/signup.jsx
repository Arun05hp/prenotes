import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
  Steps,
  Select,
} from "antd";
import { UserOutlined, FileTextOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./signup.css";
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};
const { RangePicker } = DatePicker;
const { Step } = Steps;
const { Option } = Select;
const steps = [
  {
    title: "Basic Information",
    content: "First-content",
    icon: <UserOutlined />,
  },
  {
    title: "Education",
    content: "Second-content",
    icon: <FileTextOutlined />,
  },
];

const dateFormat = "DD/MM/YYYY";
const initialInfo = {
  firstName: "",
  lastName: "",
  mobno: null,
  dob: null,
  email: "",
  password: "",
};
const Signup = () => {
  const [current, setCurrent] = useState(0);
  const [userInfo, setUserInfo] = useState(initialInfo);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values) => {
    if (current === 0) {
      setUserInfo(values);
      next();
      return;
    }
    console.log("Success:", { ...userInfo, values });
    message.success("Registered", 3);
  };

  return (
    <div className="signup">
      <h2>Create account</h2>

      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>
      <Card>
        <Form
          {...layout}
          layout="vertical"
          initialValues={{ remember: true }}
          name="basic"
          onFinish={onFinish}
        >
          {current === 0 && (
            <>
              <Row gutter={16}>
                <Col md={12} xs={24}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input autoComplete="off" />
                  </Form.Item>
                </Col>
                <Col md={12} xs={24}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
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
                <Col md={12} xs={24}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
              <div className="btnWrapper">
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              </div>
            </>
          )}

          {current === 1 && (
            <>
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
                    rules={[
                      { required: true, message: "Please pick an item!" },
                    ]}
                  >
                    <Radio.Group>
                      <Radio.Button value={1}>Yes</Radio.Button>
                      <Radio.Button value={0}>No</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <div className="btnWrapper">
                <Button style={{ marginRight: "8px" }} onClick={() => prev()}>
                  Previous
                </Button>

                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </>
          )}
        </Form>
      </Card>
      {/* <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}
      <Card className="footer-link">
        <p>
          Already have an account? <Link to="/signin">Sign In </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
