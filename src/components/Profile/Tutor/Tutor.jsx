import {
  EnvironmentOutlined,
  FieldTimeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Col, message, Popconfirm, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../../context/AuthContext";
import http from "../../../services/httpService";
import "./tutor.css";

const Tutor = (props) => {
  console.log(props);
  let BASEURL = process.env.REACT_APP_BASE_URL;
  const { state } = useContext(AuthContext);
  const { userData } = state;
  const [tutionData, setTutionData] = useState([]);

  const getAllTutions = (id) => {
    http
      .get("tutor/tutor/" + id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setTutionData(res.tutorData);
      })
      .catch((err) => {
        console.log(err);
        if (!err.response) return message.error("Network Error", 3);

        if (err.response.status && err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  const handleDelete = (id) => {
    http
      .delete("tutor/deltutor/" + id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        message.success("Deleted Successfully", 3);
        getAllTutions(userData.iduser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (userData.iduser) getAllTutions(userData.iduser);

    return () => {
      setTutionData([]);
    };
  }, [userData.iduser]);

  return (
    <div className="tutorview_wrapper">
      <main className="tutorview_body">
        <h3>Tuitions details</h3>
        <Row gutter={[16, 32]}>
          {tutionData.length > 0
            ? tutionData.map((item) => (
                <Col md={8} sm={12} xs={24}>
                  <Card>
                    <div className="box">
                      <div className="userInfo">
                        <div className="userDetails">
                          <div className="name">
                            <p className="title"> {item.tutorName}</p>
                            <div className="subtitle">{item.subject}</div>
                          </div>
                        </div>

                        <div className="time">
                          <p>
                            <FieldTimeOutlined />
                            {new Date(item.timing).toLocaleTimeString("en-US")}
                          </p>
                          <p className="day">Every {item.day}</p>
                        </div>
                      </div>
                      <div className="price_wrapper">
                        <div className="price">
                          <p className="title">
                            ₹ {item.fees}{" "}
                            <span className="subtitle">/month</span>
                          </p>
                        </div>

                        <div className="loc">
                          <p>
                            <EnvironmentOutlined /> {item.loc}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="btn_wrapper">
                      <Popconfirm
                        placement="topRight"
                        title="
                Are you sure you want to delete?"
                        onConfirm={() => handleDelete(item.id)}
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
                  </Card>
                </Col>
              ))
            : null}
        </Row>
      </main>
    </div>
  );
};

export default Tutor;
