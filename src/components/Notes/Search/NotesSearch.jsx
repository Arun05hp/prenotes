import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Form, Input, message, Select } from "antd";
import bg from "../../../assets/bg/books.png";

import http from "../../../services/httpService";
import "./notessearch.css";
import { SearchOutlined, FilePdfOutlined } from "@ant-design/icons";
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
const NotesSearch = () => {
  let BASEURL = "http://localhost:5000/";
  const [notesData, setNotesData] = useState([]);
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

  useEffect(() => {
    getAllNotes();
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
        <Row gutter={[16, 16]}>
          {notesData.length > 0
            ? notesData.map((item) => {
                return (
                  <Col key={item.idnotes} md={12} xs={24}>
                    <a href={BASEURL + item.fileLink} target="_blank">
                      <div className="innerWrapper">
                        <Card className="itemWrapper">
                          <Row gutter={8}>
                            <Col md={6} xs={6}>
                              <div className="file-icon">
                                <FilePdfOutlined />
                              </div>
                            </Col>
                            <Col md={18} xs={18}>
                              <h3>{item.topic}</h3>
                              <p>{getCategory(item.category)}</p>
                            </Col>
                          </Row>
                        </Card>
                      </div>
                    </a>
                  </Col>
                );
              })
            : ""}
        </Row>
      </main>
    </div>
  );
};

export default NotesSearch;
