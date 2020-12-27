import React, { useContext, useEffect, useState } from "react";
import { Button, message } from "antd";
import { Link } from "react-router-dom";
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
        setNotifiList((prev) => res.notifiData);
      })
      .catch((err) => {
        if (err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  const handleClear = (id) => {
    console.log("id", id);
    http
      .delete("notification/clear/" + id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        getNotifi(userData.iduser);
      })
      .catch((err) => {
        if (err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  const handleAccept = (item) => {
    let data = {
      status: 1,
      receiverId: item.senderId,
      receiverStatus: 0,
      senderId: item.receiverId,
      senderName: userData.name,
    };
    http
      .post("notification/accept/" + item.id, data)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        getNotifi(userData.iduser);
      })
      .catch((err) => {
        if (err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  const handleReject = (item) => {
    let data = {
      status: 2,
      receiverId: item.senderId,
      receiverStatus: 0,
      senderId: item.receiverId,
      senderName: "Owner",
    };
    http
      .post("notification/reject/" + item.id, data)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        getNotifi(userData.iduser);
      })
      .catch((err) => {
        if (err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  useEffect(() => {
    if (userData.iduser) getNotifi(userData.iduser);
    console.log("userData.iduser", userData.iduser);
  }, [userData.iduser]);

  const getNotifiBox = (item) => {
    switch (item.status) {
      case 2:
        if (item.for === 1)
          return (
            <div className="notifi">
              <div className="title_wrapper">
                <p className="text">
                  The owner of book "{item.title}" has declined your request.
                </p>
                <CloseOutlined onClick={() => handleClear(item.id)} />
              </div>
            </div>
          );
        else
          return (
            <div className="notifi">
              <div className="title_wrapper">
                <p className="text">
                  Request declined "{item.title}" "{item.query}".
                </p>
                <CloseOutlined onClick={() => handleClear(item.id)} />
              </div>
            </div>
          );

      case 1:
        if (item.for === 1)
          return (
            <div className="notifi">
              <div className="title_wrapper">
                <p className="text">
                  The owner of book "{item.title}" has accepted your request.
                </p>
                <CloseOutlined />
              </div>
              <div className="dec_wrapper">
                <Link to="/messages">
                  <Button size="small" type="link" className="accept">
                    Chat Now
                  </Button>
                </Link>
              </div>
            </div>
          );
        else
          return (
            <div className="notifi">
              <div className="title_wrapper">
                <p className="text">
                  Request accepted "{item.title}" "{item.query}".
                </p>
                <CloseOutlined />
              </div>
              <div className="dec_wrapper">
                <Link to="/messages">
                  <Button size="small" type="link" className="accept">
                    Chat Now
                  </Button>
                </Link>
              </div>
            </div>
          );

      default:
        if (item.for === 1)
          return (
            <div className="notifi">
              <div className="title_wrapper">
                <p className="text">
                  {item.senderName} is interested in buying your book "
                  {item.title}"
                </p>
                <CloseOutlined onClick={() => handleReject(item)} />
              </div>
              <div className="dec_wrapper">
                <Button
                  size="small"
                  type="link"
                  className="accept"
                  onClick={() => handleAccept(item)}
                >
                  Accept
                </Button>
                <Button
                  size="small"
                  type="link"
                  onClick={() => handleReject(item)}
                  className="reject"
                >
                  Decline
                </Button>
              </div>
            </div>
          );
        else
          return (
            <div className="notifi">
              <div className="title_wrapper">
                <p className="text">
                  {item.senderName} has a doubt in "{item.title}-{item.query}"
                </p>
                <CloseOutlined onClick={() => handleReject(item)} />
              </div>
              <div className="dec_wrapper">
                <Button
                  size="small"
                  type="link"
                  className="accept"
                  onClick={() => handleAccept(item)}
                >
                  Accept
                </Button>
                <Button
                  size="small"
                  type="link"
                  onClick={() => handleReject(item)}
                  className="reject"
                >
                  Decline
                </Button>
              </div>
            </div>
          );
    }
  };

  return (
    <div className="notifi_wrapper">
      <header>
        <p className="title">Notifications</p>
      </header>
      <div className="notifi_body">
        {notifiList.length > 0 ? (
          notifiList.map((item, index) => getNotifiBox(item))
        ) : (
          <p className="text">Empty</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
