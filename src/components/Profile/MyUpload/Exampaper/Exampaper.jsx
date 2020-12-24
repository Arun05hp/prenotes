import React, { useContext, useEffect, useState } from "react";
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
import { Context as AuthContext } from "../../../../context/AuthContext";
import { Context as NotesContext } from "../../../../context/NotesContext";
import { FileTextOutlined, UploadOutlined } from "@ant-design/icons";
import http from "../../../../services/httpService";

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

const { Dragger } = Upload;

const Exampaper = () => {
  let BASEURL = process.env.REACT_APP_BASE_URL;
  const {
    state: { userData },
  } = useContext(AuthContext);

  const {
    state: { examData },
    getExampaper,
  } = useContext(NotesContext);

  const [form] = Form.useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  const [examId, setExamId] = useState(-1);
  const [fileList, setFileList] = useState([]);

  function confirm() {
    console.log("Clicked on Yes.");
  }

  useEffect(() => {
    if (userData.iduser) getExampaper(userData.iduser);
    else return;
  }, [userData.iduser]);

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
        getExampaper(userData.iduser);
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
    <div>
      <Row gutter={[16, 16]}>
        {examData.length > 0
          ? examData.map((item) => {
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
                              <Button onClick={() => handleUpload(item.idexam)}>
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

export default Exampaper;
