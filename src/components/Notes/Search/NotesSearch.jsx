import React, { useEffect, useState, useContext } from "react";
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
  Tooltip,
} from "antd";
import bg from "../../../assets/bg/books.png";
import { Context as AuthContext } from "../../../context/AuthContext";

import http from "../../../services/httpService";
import "./notessearch.css";
import {
  SearchOutlined,
  MessageOutlined,
  ShareAltOutlined,
  WhatsAppOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
const { Option } = Select;

function getCategory(id) {
  switch (id) {
    case 1:
      return "Physics";
    case 2:
      return "Chemistry";
    case 3:
      return "Mathematics";
    case 4:
      return "Computer";
    case 5:
      return "Mechanical";

    default:
      break;
  }
}
const NotesSearch = (props) => {
  console.log(props);
  let BASEURL = process.env.REACT_APP_BASE_URL;
  const { state } = useContext(AuthContext);
  const { userData } = state;
  const [notesData, setNotesData] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [form] = Form.useForm();
  const [queryForm] = Form.useForm();
  const onFinish = (val) => {
    http
      .get("upload/searchNotes", {
        params: {
          ...val,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setNotesData(res.notesData);
      })
      .catch((err) => {
        if (err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  const getAllNotes = () => {
    http
      .get("upload/allNotes")
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setNotesData(res.notesData);
      })
      .catch((err) => {
        if (err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  const handleQuery = (val) => {
    console.log(val);
    if (!userData.iduser) {
      return;
    }
    if (!selectedFile) {
      return;
    }
    console.log(selectedFile);
    let formData = {
      senderId: userData.iduser,
      senderName: userData.name,
      receiverId: selectedFile.iduser,
      receiverStatus: 0,
      forid: selectedFile.idnotes,
      title: selectedFile.topic,
      query: val.query,
      for: 2,
      status: 0,
    };
    http
      .post("notification/notifi", formData)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        message.success("Your request was sent successfully");
        setVisibleModal(false);
        queryForm.resetFields();
        selectedFile(null);
      })
      .catch((err) => {
        if (!err.response) return message.error("Network Error", 3);
        if (err.response.status && err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  useEffect(() => {
    if (props.location.state) {
      let data = { topic: props.location.state.string, category: 0 };
      form.setFieldsValue({
        ...data,
      });

      onFinish(data);
    } else {
      getAllNotes();
    }

    return () => {
      setNotesData([]);
    };
  }, []);

  return (
    <div className="notesSearch_wrapper">
      <header>
        <img src={bg} alt="image" />
        <div className="input_wrapper">
          <Form
            form={form}
            layout="vertical"
            initialValues={{ topic: "" }}
            name="basic"
            onFinish={onFinish}
          >
            <Row gutter={16}>
              <Col md={13} sm={24} xs={24}>
                <Form.Item name="topic">
                  <Input
                    placeholder="What are you looking for..."
                    autoComplete="off"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col md={7} sm={12} xs={12}>
                <Form.Item name="category">
                  <Select placeholder="Category" size="large">
                    <Option value={0}>All</Option>
                    <Option value={1}>Physics</Option>
                    <Option value={2}>Chemistry</Option>
                    <Option value={3}>Mathematics</Option>
                    <Option value={4}>Computer</Option>
                    <Option value={5}>Mechanical</Option>
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
      <main className="notesSearch_body">
        <Row gutter={[16, 32]}>
          {notesData.length > 0
            ? notesData.map((item) => {
                return (
                  <Col key={item.idnotes} md={6} xs={12}>
                    <div className="innerWrapper">
                      <a href={BASEURL + item.fileLink} target="_blank">
                        <Card className="itemWrapper">
                          <h3>{item.topic}</h3>
                          <p>{getCategory(item.category)}</p>
                        </Card>
                      </a>
                      <div className="btn_wrapper">
                        <MessageOutlined
                          onClick={() => {
                            setSelectedFile(item);
                            setVisibleModal(true);
                          }}
                        />
                        <Tooltip
                          className="share"
                          trigger={["click"]}
                          color={"#fff"}
                          title={
                            <>
                              <a
                                href={`https://web.whatsapp.com/send?text=${
                                  BASEURL + item.fileLink
                                }`}
                                data-action="share/whatsapp/share"
                                target="_blank"
                              >
                                <WhatsAppOutlined className="shareBtn whatsappBtn" />{" "}
                              </a>
                              <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${
                                  BASEURL + item.fileLink
                                }`}
                                target="_blank"
                              >
                                <FacebookOutlined className="shareBtn fb" />
                              </a>
                            </>
                          }
                          icon={null}
                        >
                          <ShareAltOutlined />
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                );
              })
            : ""}
        </Row>
      </main>
      <Modal
        className="queryModal"
        visible={visibleModal}
        onCancel={() => setVisibleModal(false)}
        closeIcon={<></>}
        footer={null}
        style={{ textAlign: "center", maxWidth: "300px" }}
      >
        <Form
          form={queryForm}
          layout="vertical"
          name="basic"
          onFinish={handleQuery}
        >
          <Form.Item
            name="query"
            label="Ask A Question"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input autoComplete="off" size="large" />
          </Form.Item>
          <div className="btn_wrap">
            <Button className="btn-primary" htmlType="submit">
              Send Request
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default NotesSearch;
