import React, { useContext, useEffect } from "react";
import { Avatar, Button, Card, Col, Image, Tabs, Popconfirm, Row } from "antd";
import { Context as AuthContext } from "../../../../context/AuthContext";
import { Context as BookContext } from "../../../../context/BooksContext";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Books = () => {
  let BASEURL = "http://localhost:5000/";
  const {
    state: { userData },
  } = useContext(AuthContext);

  const {
    state: { booksData },
    getBooks,
  } = useContext(BookContext);
  function confirm() {
    console.log("Clicked on Yes.");
  }
  useEffect(() => {
    if (userData.iduser) getBooks(userData.iduser);
    else return;
  }, [userData.iduser]);

  return (
    <div>
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
                      <Col md={14} xs={18}>
                        <h3>{item.bookName}</h3>
                        <p>
                          {item.authorName} by {item.publisherName}
                        </p>
                        <h3>Rs {item.price}</h3>
                      </Col>
                      <Col md={4} xs={24}>
                        <div className="btnWrapper">
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                          />

                          <Popconfirm
                            placement="topRight"
                            title="
                Are you sure you want to delete?"
                            onConfirm={confirm}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              danger
                              type="primary"
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
          : ""}
      </Row>
    </div>
  );
};

export default Books;
