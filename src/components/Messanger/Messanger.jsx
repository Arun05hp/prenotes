import { Col, Row, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { SocketProvider } from "../../context/SocketProvider.js";
import ChatContacts from "./ChatContacts.jsx";
import ChatContainer from "./ChatContainer.jsx";
import http from "../../services/httpService";
import useSessionStorage from "../../helper/useSessionStorage";
import mailImg from "../../assets/images/mail.png";
import "./messanger.css";

const Messanger = () => {
  const { state } = useContext(AuthContext);
  const { userData } = state;
  const [id, setId] = useState(-1);
  const [contactLists, setContactsList] = useSessionStorage("contacts", []);
  const [conLoading, setConLoading] = useState(false);
  const [friendDetails, setFriendDetails] = useState({
    id: null,
    userDetails: { name: null, profileImg: null },
    roomId: null,
  });

  const fetchContacts = (id) => {
    setConLoading(true);
    http
      .get("contacts/contacts/" + id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.contactsData.length > 0) {
          setId(res.contactsData[0].uuid);
          if (res.contactsData[0].contacts) {
            setContactsList(res.contactsData[0].contacts);
          }
        }
        setTimeout(() => {
          setConLoading(false);
        }, 3000);
      })
      .catch((err) => {
        setConLoading(false);
        if (!err.response) return message.error("Network Error", 3);
        if (err.response.status && err.response.status === 400)
          message.error(err.response.data.message, 3);
      });
  };

  useEffect(() => {
    if (userData.iduser) fetchContacts(userData.iduser);
    console.log("m id", userData.iduser);
  }, [userData.iduser]);

  return (
    <SocketProvider id={id}>
      <div className="msg_wrapper">
        <Row gutter={[16, 16]}>
          <Col md={6} xs={24}>
            <ChatContacts
              contactLists={contactLists}
              setFriendDetails={setFriendDetails}
              conLoading={conLoading}
            />
          </Col>
          <Col md={18} xs={24}>
            {friendDetails.id ? (
              <ChatContainer id={id} friendDetails={friendDetails} />
            ) : (
              <div className="nomessages">
                <div className="nomsg_body">
                  <img className="mail" src={mailImg} alt="Mail Png" />
                  <p className="title">No message yet.</p>
                  <p className="subtitle">
                    Once you connect, your messages will be displayed here.
                  </p>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </SocketProvider>
  );
};

export default Messanger;
