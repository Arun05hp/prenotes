import React, { useState } from "react";
import {
  Button,
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
import http from "../../services/httpService";
import SVG from "../../assets/images/signuplogo.svg";
import "./signup.css";
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const { RangePicker } = DatePicker;
const { Step } = Steps;
const { Option } = Select;
const steps = [
  {
    title: " ",
    content: "First-content",
    icon: <UserOutlined />,
  },
  {
    title: " ",
    content: "Second-content",
    icon: <FileTextOutlined />,
  },
];

const dateFormat = "DD/MM/YYYY";
const initialInfo = {
  name: "",
  gender: "",
  mno: null,
  dob: null,
  email: "",
  password: "",
};
const Signup = () => {
  const [form] = Form.useForm();
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
    let data = {
      ...userInfo,
      ...values,
      batchStart: values.batch[0],
      batchEnd: values.batch[1],
    };
    delete data.batch;
    http
      .post("/user/signup", data)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        message.success("Registered Successfully", 3);
        form.resetFields();
      })
      .catch((err) => {
        if (err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  return (
    <div className="signup">
      <Row>
        <Col md={8} xs={0}>
          <div className="create_svg_wrapper">
            <div className="text_wrapper">
              <div className="info">
                <Link to="/">
                  <h2>Prenotes</h2>
                </Link>
                <p>Search or upload notes from</p>
                <p>device instantly.</p>
              </div>

              <div className="svg_wrapper">
                <img src={SVG} alt="Icon" />
              </div>
            </div>
          </div>
        </Col>
        <Col md={16} xs={24}>
          <div className="signup_wrapper">
            <div className="text_wrapper">
              <h2>Create account</h2>
              <p>
                Already have an Account?{" "}
                <Link to="/?signin=true">Sign In </Link>
              </p>
              <div className="steps_wrapper">
                <Steps current={current} className="stepWrapper">
                  {steps.map((item) => (
                    <Step
                      key={item.title}
                      title={item.title}
                      icon={item.icon}
                    />
                  ))}
                </Steps>
              </div>

              <Form
                form={form}
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
                          label="Name"
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Please input your name!",
                            },
                          ]}
                        >
                          <Input autoComplete="off" size="large" />
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
                            size="large"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col md={12} xs={24}>
                        <Form.Item
                          label="Mobile Number"
                          name="mno"
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
                          <Input type="tel" size="large" />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24}>
                        <Form.Item
                          label="Gender"
                          name="gender"
                          rules={[{ required: true, message: "Required!" }]}
                        >
                          <Radio.Group
                            optionType="button"
                            buttonStyle="solid"
                            size="large"
                          >
                            <Radio.Button value="Male">Male</Radio.Button>
                            <Radio.Button value="Female">Female</Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col md={24} xs={24}>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                            {
                              type: "email",
                              message: "Please input valid email!",
                            },
                          ]}
                        >
                          <Input autoComplete="off" size="large" />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24}>
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
                          <Input.Password size="large" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <div className="btnWrapper">
                      <Row gutter={16}>
                        <Col md={12} xs={12}>
                          <Button type="primary" htmlType="submit">
                            Next
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </>
                )}

                {current === 1 && (
                  <>
                    <Row gutter={16}>
                      <Col md={24} xs={24}>
                        <Form.Item
                          label="Institution"
                          name="institute"
                          rules={[{ required: true, message: "Required!" }]}
                        >
                          <Select
                            showSearch
                            size="large"
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
                              Sant Longowal Institute of Engineering and
                              Technology
                            </Option>
                            <Option value={2}>Panjab University</Option>
                            {/* <Option value={3}>Communicated</Option>
                      <Option value={4}>Identified</Option> */}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24}>
                        <Form.Item
                          label="Branch"
                          name="branch"
                          rules={[{ required: true, message: "Required!" }]}
                        >
                          <Select
                            showSearch
                            size="large"
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
                            <Option value={1}>Mechanical Engineering</Option>
                            <Option value={2}>
                              Computer Science Engineering
                            </Option>
                            <Option value={3}>Electrical Engineering</Option>
                            <Option value={4}>Civil Engineering</Option>
                            <Option value={5}>
                              Instrumentation Engineering
                            </Option>
                            <Option value={6}>Chemical Engineering</Option>
                          </Select>
                        </Form.Item>
                      </Col>

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
                          <Input type="tel" placeholder="1" size="large" />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24}>
                        <Form.Item
                          label={"Batch"}
                          name="batch"
                          rules={[{ required: true, message: "Required!" }]}
                        >
                          <RangePicker
                            style={{ width: "100%" }}
                            picker="year"
                            size="large"
                          />
                        </Form.Item>
                      </Col>

                      <Col md={12} xs={24}>
                        <Form.Item
                          label="Registration No."
                          name="regno"
                          rules={[{ required: true, message: "Required!" }]}
                        >
                          <Input autoComplete="off" size="large" />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24}>
                        <Form.Item
                          name="hosteler"
                          label="Hosteler"
                          rules={[
                            { required: true, message: "Please pick an item!" },
                          ]}
                        >
                          <Radio.Group
                            optionType="button"
                            buttonStyle="solid"
                            size="large"
                          >
                            <Radio.Button value={1}>Yes</Radio.Button>
                            <Radio.Button value={0}>No</Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                    <div className="btnWrapper">
                      <Row gutter={16}>
                        <Col md={12} xs={12}>
                          <Button
                            style={{ marginRight: "8px" }}
                            onClick={() => prev()}
                          >
                            Previous
                          </Button>
                        </Col>

                        <Col md={12} xs={12}>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </>
                )}
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
