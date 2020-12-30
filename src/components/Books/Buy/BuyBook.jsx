import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Form,
  Input,
  message,
  Result,
  Skeleton,
} from "antd";

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
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (val) => {
    setIsLoading(true);
    let data = {
      id: userData.iduser,
      ...val,
    };
    http
      .post("upload/searchBooks", data)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        let filterData = res.booksData.filter(
          (item) => item.institute === userData.institute
        );
        setBooksData(filterData);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  const getAllBooks = (id) => {
    setIsLoading(true);
    http
      .get("upload/allBooks/" + id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        let filterData = res.booksData.filter(
          (item) => item.institute === userData.institute
        );
        setBooksData(filterData);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
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
    if (userData.iduser) getAllBooks(userData.iduser);
  }, [userData.iduser]);

  return (
    <div className="notesSearch_wrapper">
      <header>
        <img src={bg} alt="image" />
        <div className="input_wrapper">
          <div className="title">
            <h3 className="titletext">Search.Study.Share</h3>
            <p className="subtitle">
              Find Books of your interest within the campus.
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
              <Col md={21} sm={18} xs={18}>
                <Form.Item name="text">
                  <Input
                    placeholder="Enter Title, Author"
                    autoComplete="off"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col md={3} sm={6} xs={6}>
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
          {isLoading ? (
            <>
              <Col md={8} xs={24}>
                <Card className="itemWrapper">
                  <div className="book_wrapper">
                    <Skeleton.Image active />

                    <div className="book_body" style={{ flex: 1 }}>
                      <Skeleton active paragraph={true} />
                    </div>
                  </div>
                  <div className="btn-wrapper">
                    <Skeleton.Input
                      style={{ width: "100% !important" }}
                      active
                      size="large"
                    />
                  </div>
                </Card>
              </Col>
              <Col md={8} xs={24}>
                <Card className="itemWrapper">
                  <div className="book_wrapper">
                    <Skeleton.Image active />

                    <div className="book_body" style={{ flex: 1 }}>
                      <Skeleton active paragraph={true} />
                    </div>
                  </div>
                  <div className="btn-wrapper">
                    <Skeleton.Input
                      style={{ width: "100% !important" }}
                      active
                      size="large"
                    />
                  </div>
                </Card>
              </Col>
            </>
          ) : booksData.length > 0 ? (
            booksData.map((item) => {
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
    </div>
  );
};

export default BuyBook;
