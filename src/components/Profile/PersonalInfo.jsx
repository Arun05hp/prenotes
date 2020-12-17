import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  message,
  Modal,
  Select,
  Upload,
} from "antd";
import { Context as AuthContext } from "../../context/AuthContext";
import http from "../../services/httpService";
import {
  UserOutlined,
  LoadingOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment";
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const PersonalInfo = () => {
  const { state, getUserDetails } = useContext(AuthContext);
  const { userData } = state;
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [visibleEdu, setVisibleEdu] = useState(false);
  const [visiblePic, setVisiblePic] = useState(false);
  const [imageData, setImageData] = useState({
    loading: false,
    imgUrl: null,
  });
  const BASEURL = process.env.REACT_APP_BASE_URL;
  const actionUrl = BASEURL + "user/profile/" + userData.iduser;

  const [infoForm] = Form.useForm();
  const [eduForm] = Form.useForm();
  const [basicForm] = Form.useForm();
  const [edForm] = Form.useForm();

  const handleCancel = () => {
    setVisibleInfo(false);
    setVisibleEdu(false);
  };
  const handleBasicInfo = () => {
    basicForm.setFieldsValue({
      name: userData.name,
      dob: moment(userData.dob),
      mno: userData.mno,
      gender: userData.gender,
      email: userData.email,
    });
    setVisibleInfo(true);
  };
  const handleEdu = () => {
    edForm.setFieldsValue({
      institute: userData.institute,
      branch: userData.branch,
      sem: Number(userData.sem),
      batch: [moment(userData.batchStart), moment(userData.batchEnd)],
      regno: userData.regno,
      hosteler: userData.hosteler,
    });
    setVisibleEdu(true);
  };

  const submitBasicInfo = (values) => {
    console.log("Success:", values);

    http
      .put("user/updateprofile/" + userData.iduser, values)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        getUserDetails(res.userId);
        setVisibleInfo(false);
        message.success("Profile Updated Successfully", 3);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitEdu = (values) => {
    console.log("Success:", values);
    let data = {
      ...values,
      batchStart: values.batch[0],
      batchEnd: values.batch[1],
    };
    delete data.batch;
    http
      .put("user/updateEdu/" + userData.iduser, data)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        getUserDetails(res.userId);
        setVisibleEdu(false);
        message.success("Education Updated Successfully", 3);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (info) => {
    setImageData({ loading: true, imgUrl: null });
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        setImageData({ loading: false, imgUrl: imageUrl })
      );
      getUserDetails(userData.iduser);
      message.success("Profile Image Updated Successfully", 3);
      setVisiblePic(false);
    }
    if (info.file.status === "error") {
      message.error("Failed", 3);
    }
  };

  const uploadButton = (
    <div>
      {imageData.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    console.log(userData);
    if (userData) {
      infoForm.setFieldsValue({
        name: userData.name,
        dob: moment(userData.dob).format(dateFormat),
        mno: Number(userData.mno),
        gender: userData.gender,
        email: userData.email,
      });
      eduForm.setFieldsValue({
        institute: userData.institute,
        branch: userData.branch,
        sem: userData.sem,
        batch: `${moment(userData.batchStart).format("YYYY")} - ${moment(
          userData.batchEnd
        ).format("YYYY")}`,
        regno: userData.regno,
        hosteler: userData.hosteler ? "Yes" : "No",
      });
    }
  }, [userData]);
  console.log(userData);
  return (
    <div>
      <div className="innerWrapper">
        <div className="avatar_wrapper">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 100, xxl: 100 }}
            src={
              userData.profileImg != null ? BASEURL + userData.profileImg : null
            }
            icon={<UserOutlined />}
            key={userData.profileImg}
          />
          <Button className="btn" onClick={() => setVisiblePic(true)}>
            Change Photo
          </Button>
        </div>
        <div className="heading_wrap">
          <h3>Basic Information</h3>
          <div className="circle" onClick={handleBasicInfo}>
            <EditOutlined />
          </div>
        </div>

        <Form form={infoForm} {...layout} layout="vertical">
          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item label="Name" name="name">
                <Input size="large" disabled />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item label="DOB" name="dob">
                <Input size="large" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item label="Mobile Number" name="mno">
                <Input size="large" disabled />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item label="Gender" name="gender">
                <Input size="large" disabled />
              </Form.Item>
            </Col>

            <Col md={12} xs={24}>
              <Form.Item label="Email" name="email">
                <Input size="large" disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className="heading_wrap">
          <h3>Education</h3>
          <div className="circle" onClick={handleEdu}>
            <EditOutlined />
          </div>
        </div>
        <Form form={eduForm} {...layout} layout="vertical">
          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item label="Institution" name="institute">
                <Select size="large" disabled>
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
              <Form.Item label="Branch" name="branch">
                <Select size="large" disabled>
                  <Option value={1}>Mechanical Engineering</Option>
                  <Option value={2}>Computer Science Engineering</Option>
                  <Option value={3}>Electrical Engineering</Option>
                  <Option value={4}>Civil Engineering</Option>
                  <Option value={5}>Instrumentation Engineering</Option>
                  <Option value={6}>Chemical Engineering</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col md={12} xs={24}>
              <Form.Item label="Semester" name="sem">
                <Input size="large" disabled />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item label={"Batch"} name="batch">
                <Input size="large" disabled />
              </Form.Item>
            </Col>

            <Col md={12} xs={24}>
              <Form.Item label="Registration No." name="regno">
                <Input size="large" disabled />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item name="hosteler" label="Hosteler">
                <Input size="large" disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <Modal
        visible={visibleInfo}
        title="Basic Information"
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="submit" type="primary" onClick={basicForm.submit}>
            Update
          </Button>,
        ]}
      >
        <Form
          form={basicForm}
          {...layout}
          layout="vertical"
          initialValues={{ remember: true }}
          name="basic"
          onFinish={submitBasicInfo}
        >
          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
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
                <Input autoComplete="off" size="large" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        visible={visibleEdu}
        title="Education"
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="submit" type="primary" onClick={edForm.submit}>
            Update
          </Button>,
        ]}
      >
        <Form
          form={edForm}
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
                  <Option value={2}>Computer Science Engineering</Option>
                  <Option value={3}>Electrical Engineering</Option>
                  <Option value={4}>Civil Engineering</Option>
                  <Option value={5}>Instrumentation Engineering</Option>
                  <Option value={6}>Chemical Engineering</Option>
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
          </Row>
          <Row gutter={16}>
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
                rules={[{ required: true, message: "Please pick an item!" }]}
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
        </Form>
      </Modal>

      <Modal
        visible={visiblePic}
        title="Change Profile Image"
        onCancel={() => setVisiblePic(false)}
        footer={null}
        style={{ textAlign: "center", maxWidth: "300px" }}
      >
        <Upload
          name="photo"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={actionUrl}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageData.imgUrl ? (
            <img
              src={imageData.imgUrl}
              alt="avatar"
              style={{ width: "100%" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Modal>
    </div>
  );
};

export default PersonalInfo;
