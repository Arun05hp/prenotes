import React, { useContext, useEffect, useState } from "react";
import { Button, message } from "antd";
import { Context as AuthContext } from "../../context/AuthContext";
import http from "../../services/httpService";
import "./notification.css";
import { CloseOutlined } from "@ant-design/icons";
const Notification = () => {
  const { state } = useContext(AuthContext);
  const { userData } = state;
  const [notifiList, setNotifiList] = useState([]);

  const getNotifi = (id) => {
    http
      .get("notification/notifi/" + id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setNotifiList(res.notifiData);
      })
      .catch((err) => {
        if (err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  useEffect(() => {
    if (userData.iduser) getNotifi(userData.iduser);
    console.log("userData.iduser", userData.iduser);
    return () => {
      setNotifiList([]);
    };
  }, [userData.iduser]);

  return (
    <div className="notifi_wrapper">
      <header>
        <p className="title">Notifications</p>
      </header>
      <div className="notifi_body">
        {notifiList.length > 0 ? (
          notifiList.map((item, index) => (
            <div className="notifi">
              <div className="title_wrapper">
                <p className="text">
                  {item.senderName} is interested in buying your book "
                  {item.title}"
                </p>
                <CloseOutlined />
              </div>
              <div className="dec_wrapper">
                <Button className="accept"> Accept</Button>
                <Button className="reject"> Decline</Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text">Empty</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
