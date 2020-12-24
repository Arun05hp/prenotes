import React, { useEffect, useState } from "react";
import {
  Avatar,
  Image,
  Button,
  Card,
  Col,
  Row,
  Form,
  Input,
  message,
  Select,
} from "antd";
import bg from "../../../assets/bg/books.png";

import http from "../../../services/httpService";
import "../../Notes/Search/notessearch.css";
import "./buybook.css";
import { SearchOutlined } from "@ant-design/icons";

const BuyBook = () => {
  let BASEURL = process.env.REACT_APP_BASE_URL;
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
                  <Col md={12} xs={24}>
                    <Card className="itemWrapper">
                      <Row gutter={8}>
                        <Col md={6} xs={6}>
                          <Avatar
                            shape="square"
                            src={<Image src={BASEURL + item.fileLink} />}
                          />
                        </Col>
                        <Col md={18} xs={18}>
                          <h3>{item.bookName}</h3>
                          <p>
                            {item.authorName} by {item.publisherName}
                          </p>
                          <h3>Rs {item.price}</h3>
                        </Col>
                      </Row>
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
