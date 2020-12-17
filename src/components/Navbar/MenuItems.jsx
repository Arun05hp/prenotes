import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Menu, Modal, Grid } from "antd";
import { NavLink } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import queryString from "query-string";
import SignIn from "../Auth/Signin";
import { MessageOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
const { useBreakpoint } = Grid;
const MenuItems = () => {
  const BASEURL = process.env.REACT_APP_BASE_URL;
  const { md } = useBreakpoint();

  const { state, logout } = useContext(AuthContext);
  const { loginFlag, userData } = state;
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(userData);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClick = ({ key }) => {
    console.log(key);
  };

  useEffect(() => {
    const params = queryString.parse(window.location.search);

    if (params.signin && params.signin === "true") {
      showModal();
    }
  }, []);

  return loginFlag === false ? (
    <div className="nav_wrapper">
      <Menu mode={md ? "horizontal" : "inline"} onClick={handleClick}>
        <Menu.Item key="/?signin=true" onClick={() => showModal()}>
          Sign in
        </Menu.Item>
      </Menu>
      <Button className="signupBtn">
        <NavLink to="/signup">Sign up </NavLink>
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={400}
        className="sign_modal"
      >
        <SignIn handleCancel={handleCancel} />
      </Modal>
    </div>
  ) : (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="/messages" onClick={() => logout()}>
        <NavLink to="/messages">
          <MessageOutlined />
        </NavLink>
      </Menu.Item>

      <SubMenu
        key="sub1"
        title={
          <>
            <Avatar
              style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              src={
                userData.profileImg != null
                  ? BASEURL + userData.profileImg
                  : null
              }
            >
              {userData.name ? userData.name.charAt(0) : ""}
            </Avatar>
            <span className="uname">{userData.name}</span>
          </>
        }
      >
        <Menu.Item key="/myprofile/personalInfo">
          <NavLink to="/myprofile/personalInfo">My Profile</NavLink>
        </Menu.Item>
        <Menu.Item key="/signout" onClick={() => logout()}>
          <NavLink to=""> Sign Out</NavLink>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default MenuItems;
