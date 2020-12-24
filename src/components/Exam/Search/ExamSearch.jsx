import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Form,
  Input,
  message,
  Modal,
  Select,
  Upload,
} from "antd";

import bg from "../../../assets/bg/books.png";

import http from "../../../services/httpService";
import "./examsearch.css";
import {
  SearchOutlined,
  FileTextOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const { Option } = Select;
const { Dragger } = Upload;
function getBranch(id) {
  switch (id) {
    case 1:
      return "Mechanical Engg.";
    case 2:
      return "Computer Sci. Engg.";
    case 3:
      return "Electrical Engg.";
    case 4:
      return "Civil Engg.";
    case 5:
      return "Instrumentation Engg.";
    case 6:
      return "Chemical Engg.";

    default:
      break;
  }
}
const ExamSearch = () => {
  const BASEURL = process.env.REACT_APP_BASE_URL;

  const [examPaperData, setExamPaperData] = useState([]);
  const [form] = Form.useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  const [examId, setExamId] = useState(-1);
  const [fileList, setFileList] = useState([]);

  const onFinish = (val) => {
    http
      .get("exam/searchexampaper", {
        params: {
          ...val,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setExamPaperData(res.examPaperData);
      })
      .catch((err) => {
        if (err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  const getAllExamPaper = () => {
    http
      .get("exam/allexampaper")
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setExamPaperData(res.examPaperData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllExamPaper();
    return () => {
      setExamPaperData([]);
    };
  }, []);

  const handleUpload = (id) => {
    setExamId(id);
    setVisibleModal(true);
  };

  const uploadSol = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file);
    });
    http
      .post("exam/uploadsolution/" + examId, formData)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setFileList([]);
        setVisibleModal(false);
        message.success(" Uploaded Successfully", 3);
        getAllExamPaper();
      })
      .catch((err) => {
        if (!err.response) return message.error("Network Error", 3);
        if (err.response.status && err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  function beforeUpload(file) {
    if (
      file.type === "application/pdf" ||
      file.type === "image/jpeg" ||
      file.type === "image/png"
    ) {
      setFileList([file]);
    } else {
      message.error("Only pdf, jpeg, png");
    }
    return false;
  }

  function onRemove(file) {
    setFileList([]);
  }
  return (
    <div className="ExamSearch_wrapper">
      <header>
        <img src={bg} alt="image" />
        <div className="input_wrapper">
          <Form
            form={form}
            layout="vertical"
            initialValues={{ string: "" }}
            name="basic"
            onFinish={onFinish}
          >
            <Row gutter={16}>
              <Col md={13} sm={24} xs={24}>
                <Form.Item name="string">
                  <Input
                    placeholder="What are you looking for..."
                    autoComplete="off"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col md={7} sm={12} xs={12}>
                <Form.Item name="branch">
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
              <Col md={4} sm={12} xs={12}>
                <Form.Item>
                  <div className="btn_wrapper">
                    <Button htmlType="submit" size="large">
                      <SearchOutlined />
                    </Button>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </header>
      <main className="ExamSearch_body">
        <Row gutter={[16, 16]}>
          {examPaperData.length > 0
            ? examPaperData.map((item) => {
                return (
                  <Col key={item.idnotes} md={12} xs={24}>
                    <div className="innerWrapper">
                      <Card className="itemWrapper">
                        <Row gutter={8}>
                          <Col md={6} xs={6}>
                            <div className="file-icon">
                              <FileTextOutlined />
                            </div>
                          </Col>
                          <Col md={18} xs={18}>
                            <h3>{item.subject}</h3>
                            <p>{getBranch(item.branch)}</p>
                          </Col>
                          <Col md={12} sm={12} xs={24}>
                            <div className="btn_wrapper">
                              <a
                                href={BASEURL + item.quefileLink}
                                target="_blank"
                              >
                                <Button> View Exam Paper</Button>
                              </a>
                            </div>
                          </Col>
                          <Col md={12} sm={12} xs={24}>
                            <div className="btn_wrapper">
                              {item.solfileLink != null &&
                              item.solfileLink != "" ? (
                                <a
                                  href={BASEURL + item.solfileLink}
                                  target="_blank"
                                >
                                  <Button> View Soultion</Button>
                                </a>
                              ) : (
                                <Button
                                  onClick={() => handleUpload(item.idexam)}
                                >
                                  Upload Soultion
                                </Button>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                  </Col>
                );
              })
            : ""}
        </Row>
      </main>
      <Modal
        visible={visibleModal}
        title="Upload Solution"
        onCancel={() => setVisibleModal(false)}
        footer={[
          <Button className="btn-primary" onClick={uploadSol}>
            Upload
          </Button>,
        ]}
        style={{ textAlign: "center", maxWidth: "300px" }}
      >
        <Dragger
          name="file"
          multiple={false}
          fileList={fileList}
          beforeUpload={beforeUpload}
          onRemove={onRemove}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Click or Drag file here</p>
        </Dragger>
      </Modal>
    </div>
  );
};

export default ExamSearch;
