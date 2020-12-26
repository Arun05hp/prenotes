import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import React, { useContext, useState } from "react";
import { Context as AuthContext } from "../../../context/AuthContext";
import http from "../../../services/httpService";
import "./notesupload.css";
const { Option } = Select;
const { Dragger } = Upload;
const NotesUpload = () => {
  const { state } = useContext(AuthContext);
  const { userData } = state;
  const [form] = Form.useForm();
  const [fileData, setFileData] = useState({
    fileList: [],
    uploading: false,
  });

  const handleUpload = (val) => {
    const formData = new FormData();
    fileData.fileList.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("topic", val.topic);
    formData.append("iduser", val.iduser);
    formData.append("category", val.category);
    formData.append("description", val.description);

    http
      .post("upload/pdf", formData)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        message.success("Notes Uploaded Successfully", 3);
        form.resetFields();
        setFileData({ fileList: [], uploading: false });
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
      if (file.type === "application/pdf") {
        setFileData({
          fileList: [file],
        });
      } else {
        message.error("Only pdf");
      }
      return false;
    },
    fileList: fileData.fileList,
    multiple: false,
  };

  return (
    <div className="notes_wrapper">
      <Form
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          label="Select File"
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

        <Form.Item
          label="Topic"
          name="topic"
          rules={[
            {
              required: true,
              message: "Please input your Topic!",
            },
          ]}
        >
          <Input autoComplete="off" size="large" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Required!",
            },
          ]}
        >
          <Select size="large">
            <Option value={1}>Physics</Option>
            <Option value={2}>Chemistry</Option>
            <Option value={3}>Mathematics</Option>
            <Option value={4}>Computer</Option>
            <Option value={5}>Mechanical</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input.TextArea maxLength={250} rows={2} />
        </Form.Item>

        <div className="btn_wrapper">
          <Button htmlType="submit">Upload</Button>
        </div>
      </Form>
    </div>
  );
};

export default NotesUpload;
