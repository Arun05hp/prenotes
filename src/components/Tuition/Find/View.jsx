import {
  EnvironmentOutlined,
  FieldTimeOutlined,
  MessageFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { Avatar, Card, Col, Form, message, Row, Popover } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../../context/AuthContext";
import http from "../../../services/httpService";
import "./view.css";

const View = (props) => {
  console.log(props);
  let BASEURL = process.env.REACT_APP_BASE_URL;
  const { state } = useContext(AuthContext);
  const { userData } = state;
  const [tutionData, setTutionData] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const getAllTutions = (id) => {
    http
      .get("tutor/alltutors/" + id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        let filterData = res.tutorData.filter(
          (item) =>
            item.institute === userData.institute &&
            (item.for === userData.gender || item.for === "All")
        );
        setTutionData(filterData);
      })
      .catch((err) => {
        console.log(err);
        if (!err.response) return message.error("Network Error", 3);

        if (err.response.status && err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  const handleQuery = (val) => {
    console.log(val);
    if (!userData.iduser) {
      return;
    }

    let formData = {
      senderId: userData.iduser,
      senderName: userData.name,
      receiverId: val.iduser,
      receiverStatus: 0,
      forid: val.id,
      title: val.subject + "Tution",
      query: "Can we connect",
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
      })
      .catch((err) => {
        if (!err.response) return message.error("Network Error", 3);
        if (err.response.status && err.response.status === 400)
          message.error(err.response.data.message, 3);
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
        <h3>Ongoing Tuitions details</h3>
        <Row gutter={[16, 32]}>
          {tutionData.length > 0
            ? tutionData.map((item) => (
                <Col md={8} sm={12} xs={24}>
                  <Card>
                    <div className="box">
                      <div className="userInfo">
                        <div className="userDetails">
                          <Avatar
                            size={{
                              xs: 40,
                              sm: 50,
                              md: 50,
                              lg: 54,
                              xl: 54,
                              xxl: 54,
                            }}
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf",
                            }}
                            src={
                              item.profileImg != null
                                ? BASEURL + item.profileImg
                                : null
                            }
                          >
                            {item.tutorName ? item.tutorName.charAt(0) : ""}
                          </Avatar>
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
                      <MessageFilled onClick={() => handleQuery(item)} />{" "}
                      <Popover
                        overlayClassName="popinfo"
                        placement="top"
                        title="Contact Details"
                        trigger={["click", "hover"]}
                        content={
                          <>
                            <p className="title">
                              Email:{" "}
                              <span className="subtitle">{item.email}</span>
                            </p>
                            {item.contact ? (
                              <p className="title">
                                Contact No.:{" "}
                                <span className="subtitle">{item.contact}</span>
                              </p>
                            ) : null}
                          </>
                        }
                        trigger="click"
                      >
                        <InfoCircleFilled />
                      </Popover>
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

export default View;
