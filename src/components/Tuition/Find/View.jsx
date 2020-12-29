import React, { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Form,
  Input,
  message,
  Modal,
  Select,
  Tooltip,
} from "antd";

import { Context as AuthContext } from "../../../context/AuthContext";

import http from "../../../services/httpService";
import "./view.css";
import {
  FieldTimeOutlined,
  EnvironmentOutlined,
  MessageFilled,
} from "@ant-design/icons";

const View = (props) => {
  console.log(props);
  let BASEURL = process.env.REACT_APP_BASE_URL;
  const { state } = useContext(AuthContext);
  const { userData } = state;
  const [notesData, setNotesData] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [form] = Form.useForm();
  const [queryForm] = Form.useForm();
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

  const handleQuery = (val) => {
    console.log(val);
    if (!userData.iduser) {
      return;
    }
    if (!selectedFile) {
      return;
    }
    console.log(selectedFile);
    let formData = {
      senderId: userData.iduser,
      senderName: userData.name,
      receiverId: selectedFile.iduser,
      receiverStatus: 0,
      forid: selectedFile.idnotes,
      title: selectedFile.topic,
      query: val.query,
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
        setVisibleModal(false);
        queryForm.resetFields();
        selectedFile(null);
      })
      .catch((err) => {
        if (!err.response) return message.error("Network Error", 3);
        if (err.response.status && err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  useEffect(() => {
    // if (props.location.state) {
    //   let data = { topic: props.location.state.string, category: 0 };
    //   form.setFieldsValue({
    //     ...data,
    //   });

    //   onFinish(data);
    // } else {
    //   getAllNotes();
    // }

    return () => {
      setNotesData([]);
    };
  }, []);

  return (
    <div className="tutorview_wrapper">
      <main className="tutorview_body">
        <Row gutter={[16, 32]}>
          <Col md={8} sm={12} xs={24}>
            <Card>
              <div className="box">
                <div className="userInfo">
                  <div className="userDetails">
                    <Avatar
                      size={{ xs: 40, sm: 50, md: 50, lg: 54, xl: 54, xxl: 54 }}
                      style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                      // src={
                      //   userData.profileImg != null
                      //     ? BASEURL + userData.profileImg
                      //     : null
                      // }
                    >
                      A
                    </Avatar>
                    <div className="name">
                      <p className="title">Arun</p>
                      <div className="subtitle">Computer Graphics</div>
                    </div>
                  </div>

                  <div className="time">
                    <p>
                      <FieldTimeOutlined /> 10:00 am
                    </p>
                    <p className="day">Every Saturday</p>
                  </div>
                </div>
                <div className="price_wrapper">
                  <div className="price">
                    <p className="title">
                      ₹ 250 <span className="subtitle">/month</span>
                    </p>
                  </div>

                  <div className="loc">
                    <p>
                      <EnvironmentOutlined /> LC-2
                    </p>
                  </div>
                </div>
              </div>
              <div className="btn_wrapper">
                <MessageFilled />
              </div>
            </Card>
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default View;
