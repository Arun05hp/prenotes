import {
  FacebookOutlined,
  MessageOutlined,
  SearchOutlined,
  ShareAltOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Result,
  Row,
  Select,
  Skeleton,
  Tooltip,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import bg from "../../../assets/bg/books.png";
import { Context as AuthContext } from "../../../context/AuthContext";
import http from "../../../services/httpService";
import "./notessearch.css";

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
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [queryForm] = Form.useForm();
  const onFinish = (val) => {
    setIsLoading(true);
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
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  const getAllNotes = () => {
    setIsLoading(true);
    http
      .get("upload/allNotes")
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setNotesData(res.notesData);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      })
      .catch((err) => {
        setIsLoading(false);
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
        <img src={bg} alt="bg" />
        <div className="input_wrapper">
          <div className="title">
            <h3 className="titletext">Search.Study.Share</h3>
            <p className="subtitle">
              Find study related materials inside campus.
            </p>
          </div>
          <Form
            form={form}
            layout="vertical"
            initialValues={{ topic: "" }}
            name="basic"
            onFinish={onFinish}
          >
            <Row gutter={[16, 16]}>
              <Col md={13} sm={24} xs={24}>
                <Form.Item name="topic">
                  <Input
                    placeholder="What are you looking for..."
                    autoComplete="off"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col md={8} sm={12} xs={12}>
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
              <Col md={3} sm={12} xs={12}>
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
          {isLoading ? (
            <>
              <Col md={6} xs={24}>
                <div className="innerWrapper">
                  <Card className="itemWrapper">
                    <Skeleton active />
                  </Card>
                </div>
              </Col>
              <Col md={6} xs={24}>
                <div className="innerWrapper">
                  <Card className="itemWrapper">
                    <Skeleton active />
                  </Card>
                </div>
              </Col>
              <Col md={6} xs={24}>
                <div className="innerWrapper">
                  <Card className="itemWrapper">
                    <Skeleton active />
                  </Card>
                </div>
              </Col>
            </>
          ) : notesData.length > 0 ? (
            notesData.map((item) => {
              let id = item.iduser;
              return (
                <Col key={item.idnotes} md={6} xs={24}>
                  <div className="innerWrapper">
                    <a href={BASEURL + item.fileLink} target="_blank">
                      <Card className="itemWrapper">
                        <h3>{item.topic}</h3>
                        <p>{getCategory(item.category)}</p>
                      </Card>
                    </a>
                    <div className="btn_wrapper">
                      {userData
                        ? userData.iduser &&
                          userData.iduser != id && (
                            <MessageOutlined
                              onClick={() => {
                                setSelectedFile(item);
                                setVisibleModal(true);
                              }}
                            />
                          )
                        : null}
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
          ) : (
            <Col md={24} xs={24}>
              <Result
                status="404"
                title="No Results Found"
                subTitle={null}
                // extra={<Button type="primary">Back Home</Button>}
              />
            </Col>
          )}
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
