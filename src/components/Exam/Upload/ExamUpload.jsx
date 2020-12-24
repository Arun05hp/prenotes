import React, { useState, useContext } from "react";
import { Button, Col, Form, Input, message, Row, Select, Upload } from "antd";
import { Context as AuthContext } from "../../../context/AuthContext";
import http from "../../../services/httpService";
import { FilePdfOutlined } from "@ant-design/icons";
import "./examupload.css";
const { Option } = Select;
const { Dragger } = Upload;
const ExamUpload = () => {
  const { state } = useContext(AuthContext);
  const { userData } = state;
  const [form] = Form.useForm();
  const [fileData, setFileData] = useState({
    fileList: [],
  });
  const [fileData2, setFileData2] = useState({
    fileList: [],
  });

  const handleUpload = (val) => {
    const formData = new FormData();
    console.log(val);

    fileData.fileList.forEach((file) => {
      formData.append("file", file);
    });
    if (fileData2.fileList.length > 0) {
      fileData2.fileList.forEach((file) => {
        formData.append("file", file);
      });
    }
    formData.append("branch", val.branch);
    formData.append("subject", val.subject);
    formData.append("iduser", val.iduser);
    formData.append("sem", val.sem);
    formData.append("description", val.description);

    http
      .post("exam/exampaper", formData)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        message.success("Notes Uploaded Successfully", 3);
        form.resetFields();
        setFileData({ fileList: [] });
        setFileData2({ fileList: [] });
      })
      .catch((err) => {
        if (!err.response) return message.error("Network Error", 3);

        if (err.response.status && err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };
  const onFinish = (val) => {
    val.iduser = userData.iduser;
    delete val.file;
    handleUpload(val);
  };

  const props = {
    name: "file",
    onRemove: (file) => {
      setFileData((prev) => {
        const index = fileData.fileList.indexOf(file);
        const newFileList = fileData.fileList.slice();
        newFileList.splice(index, 1);
        return {
          ...prev,
          fileList: newFileList,
        };
      });
    },
    beforeUpload: (file) => {
      if (
        file.type === "application/pdf" ||
        file.type === "image/jpeg" ||
        file.type === "image/png"
      ) {
        setFileData({
          fileList: [file],
        });
      } else {
        message.error("Only pdf, jpeg, png");
      }
      return false;
    },
    fileList: fileData.fileList,
    multiple: false,
  };

  const props2 = {
    name: "file",
    onRemove: (file) => {
      setFileData2((prev) => {
        const index = fileData2.fileList.indexOf(file);
        const newFileList = fileData2.fileList.slice();
        newFileList.splice(index, 1);
        return {
          ...prev,
          fileList: newFileList,
        };
      });
    },
    beforeUpload: (file) => {
      if (
        file.type === "application/pdf" ||
        file.type === "image/jpeg" ||
        file.type === "image/png"
      ) {
        setFileData2({
          fileList: [file],
        });
      } else {
        message.error("Only pdf, jpeg, png");
      }
      return false;
    },
    fileList: fileData2.fileList,
    multiple: false,
  };
  return (
    <div className="exam_wrapper">
      <Form
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        name="basic"
        onFinish={onFinish}
      >
        <Row gutter={[16, 16]}>
          <Col md={12} sm={12} xs={23}>
            <Form.Item
              label="Select Exam Paper"
              name="file"
              rules={[
                {
                  required: true,
                  message: "Select File",
                },
              ]}
            >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <FilePdfOutlined />
                </p>
                <p className="ant-upload-text">Click or Drag file here</p>
              </Dragger>
            </Form.Item>
          </Col>
          <Col md={12} sm={12} xs={23}>
            <Form.Item label="Solution (optional)" name="file">
              <Dragger {...props2}>
                <p className="ant-upload-drag-icon">
                  <FilePdfOutlined />
                </p>
                <p className="ant-upload-text">Click or Drag file here</p>
              </Dragger>
            </Form.Item>
          </Col>
          <Col md={12} sm={12} xs={23}>
            <Form.Item
              label="Subject Name"
              name="subject"
              rules={[
                {
                  required: true,
                  message: "Required!",
                },
              ]}
            >
              <Input autoComplete="off" size="large" />
            </Form.Item>
          </Col>
          <Col md={12} sm={12} xs={23}>
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
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
          <Col md={12} sm={12} xs={23}>
            <Form.Item
              label="Semester"
              name="sem"
              rules={[
                {
                  required: true,
                  message: "Required!",
                },
              ]}
            >
              <Select size="large">
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
                <Option value={5}>5</Option>
                <Option value={6}>6</Option>
                <Option value={7}>7</Option>
                <Option value={8}>8</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} sm={12} xs={23}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Required!" }]}
            >
              <Input.TextArea
                maxLength={50}
                rows={1}
                size="large"
                autoSize={{ minRows: 1, maxRows: 1 }}
                placeholder="Exam paper year other info.."
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="btn_wrapper">
          <Button htmlType="submit">Upload</Button>
        </div>
      </Form>
    </div>
  );
};

export default ExamUpload;
