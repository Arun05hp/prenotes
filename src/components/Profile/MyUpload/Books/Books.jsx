import { DeleteOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Image,
  Popconfirm,
  Row,
  message,
  Skeleton,
} from "antd";
import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../../../../context/AuthContext";
import { Context as BookContext } from "../../../../context/BooksContext";
import http from "../../../../services/httpService";
const Books = () => {
  let BASEURL = process.env.REACT_APP_BASE_URL;
  const {
    state: { userData },
  } = useContext(AuthContext);

  const {
    state: { booksData, isLoading },
    getBooks,
  } = useContext(BookContext);

  const deleteBook = (id) => {
    http
      .delete("upload/delbook/" + id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        message.success("Deleted Successfully", 3);
        getBooks(userData.iduser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (userData.iduser) getBooks(userData.iduser);
    else return;
  }, [userData.iduser]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {isLoading ? (
          <Col md={12} xs={24}>
            <Card className="itemWrapper">
              <Row gutter={8}>
                <Col md={6} xs={6}>
                  <Skeleton.Image active />
                </Col>
                <Col md={18} xs={18}>
                  <div style={{ padding: "0 10px" }}>
                    <Skeleton active paragraph={true} />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ) : booksData.length > 0 ? (
          booksData.map((item) => {
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
                    <Col md={14} xs={18}>
                      <h3>{item.bookName}</h3>
                      <p>
                        {item.authorName} by {item.publisherName}
                      </p>
                      <h3>Rs {item.price}</h3>
                    </Col>
                    <Col md={4} xs={24}>
                      <div className="btnWrapper">
                        <Popconfirm
                          placement="topRight"
                          title="
                Are you sure you want to delete?"
                          onConfirm={() => deleteBook(item.idbook)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            danger
                            type="link"
                            shape="circle"
                            icon={<DeleteOutlined />}
                          />
                        </Popconfirm>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col md={12} sm={12}>
            <Card>No Records</Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Books;
