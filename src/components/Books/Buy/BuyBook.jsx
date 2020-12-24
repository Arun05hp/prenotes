import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Col, Row, Form, Input, message } from "antd";

import { Context as AuthContext } from "../../../context/AuthContext";
import http from "../../../services/httpService";
import bg from "../../../assets/bg/books.png";

import "../../Notes/Search/notessearch.css";
import "./buybook.css";
import { SearchOutlined } from "@ant-design/icons";

const BuyBook = () => {
  let BASEURL = process.env.REACT_APP_BASE_URL;
  const { state } = useContext(AuthContext);
  const { userData } = state;
  const [booksData, setBooksData] = useState([]);
  const [form] = Form.useForm();
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
        setBooksData(res.booksData);
      })
      .catch((err) => {
        if (err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  const getAllBooks = () => {
    http
      .get("upload/allBooks")
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setBooksData(res.booksData);
      })
      .catch((err) => {
        if (!err.response) return message.error("Network Error", 3);
        if (err.response.status && err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  const handleReq = (data) => {
    if (!userData.iduser) {
      return;
    }
    let formData = {
      senderId: userData.iduser,
      senderName: userData.name,
      receiverId: data.iduser,
      receiverStatus: 0,
      forid: data.idbook,
      title: data.bookName,
      query: null,
      for: 1,
      status: 0,
    };
    http
      .post("notification/notifi", formData)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        message.success("Your request was sent successfully");
      })
      .catch((err) => {
        if (!err.response) return message.error("Network Error", 3);
        if (err.response.status && err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  useEffect(() => {
    getAllBooks();
    return () => {
      setBooksData([]);
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
              <Col md={20} sm={24} xs={24}>
                <Form.Item name="topic">
                  <Input
                    placeholder="Enter Title, Author"
                    autoComplete="off"
                    size="large"
                  />
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
      <main className="booksSearch_body">
        <Row gutter={[16, 16]}>
          {booksData.length > 0
            ? booksData.map((item) => {
                return (
                  <Col md={8} xs={24}>
                    <Card className="itemWrapper">
                      <div className="book_wrapper">
                        <img className="img" src={BASEURL + item.fileLink} />

                        <div className="book_body">
                          <div className="dec">
                            <p className="title">{item.bookName}</p>
                            <p className="subtitle">{item.authorName}</p>
                            <p className="subtitle"> {item.publisherName} </p>
                          </div>

                          <p className="price">₹ {item.price}</p>
                        </div>
                      </div>
                      <div className="btn-wrapper">
                        <Button onClick={() => handleReq(item)}>
                          Send Request
                        </Button>
                      </div>
                    </Card>
                  </Col>
                );
              })
            : ""}
        </Row>
      </main>
    </div>
  );
};

export default BuyBook;
