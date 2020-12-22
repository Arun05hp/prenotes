import React, { useState, useContext } from "react";
import { Button, Form, Input, InputNumber, message, Upload } from "antd";
import { Context as AuthContext } from "../../../context/AuthContext";
import http from "../../../services/httpService";
import { PlusOutlined } from "@ant-design/icons";
import "./sellbook.css";

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
const SellBook = () => {
  const { state } = useContext(AuthContext);
  const { userData } = state;
  const [form] = Form.useForm();
  const [fileData, setFileData] = useState({
    imageUrl: null,
    loading: false,
  });

  const handleUpload = (val) => {
    const formData = new FormData();
    formData.append("image", val.image.file.originFileObj);
    formData.append("bookName", val.bookName);
    formData.append("iduser", val.iduser);
    formData.append("authorName", val.authorName);
    formData.append("publisherName", val.publisherName);
    formData.append("price", val.price);
    formData.append("description", val.description);
    formData.append("sellerStatus", 0);

    http
      .post("upload/book", formData)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        message.success("Book Uploaded Successfully", 3);
        form.resetFields();
        setFileData({ imageUrl: null, loading: false });
      })
      .catch((err) => {
        if (!err.response) return message.error("Network Error", 3);

        if (err.response.status && err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };
  const onFinish = (val) => {
    console.log(val);

    val.iduser = userData.iduser;

    handleUpload(val);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info) => {
    console.log(info);

    if (info.file.originFileObj) {
      getBase64(info.file.originFileObj, (imageUrl) =>
        setFileData({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  return (
    <div className="sell_wrapper">
      <Form
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          label="Book Image"
          name="image"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {fileData.imageUrl ? (
              <img
                src={fileData.imageUrl}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Book Name"
          name="bookName"
          rules={[
            {
              required: true,
              message: "Required!",
            },
          ]}
        >
          <Input autoComplete="off" size="large" />
        </Form.Item>

        <Form.Item
          label="Author Name"
          name="authorName"
          rules={[
            {
              required: true,
              message: "Required!",
            },
          ]}
        >
          <Input autoComplete="off" size="large" />
        </Form.Item>
        <Form.Item
          label="Publisher Name"
          name="publisherName"
          rules={[
            {
              required: true,
              message: "Required!",
            },
          ]}
        >
          <Input autoComplete="off" size="large" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Required!",
            },
          ]}
        >
          <InputNumber min={0} size="large" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea maxLength={250} rows={2} />
        </Form.Item>

        <div className="btn_wrapper">
          <Button htmlType="submit">Upload</Button>
        </div>
      </Form>
    </div>
  );
};

export default SellBook;
