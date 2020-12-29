import React, { useContext, useEffect, useState } from "react";
import { Avatar, Badge, Button, Menu, Modal, Grid } from "antd";
import { NavLink } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import queryString from "query-string";
import SignIn from "../Auth/Signin";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
const { useBreakpoint } = Grid;
const MenuItems = () => {
  const BASEURL = process.env.REACT_APP_BASE_URL;
  const { md } = useBreakpoint();

  const { state, logout } = useContext(AuthContext);
  const { loginFlag, userData } = state;
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      <SubMenu key="/notes" title="Notes">
        <Menu.Item key="/notes/search">
          <NavLink to="/notes/search">Search</NavLink>
        </Menu.Item>
        <Menu.Item key="/notes/upload">
          <NavLink to="/notes/upload">Upload</NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="/books" title="Books">
        <Menu.Item key="/books/buy">
          <NavLink to="/books/buy">Buy</NavLink>
        </Menu.Item>
        <Menu.Item key="/books/sell">
          <NavLink to="/books/sell">Sell</NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="/exampapers" title="Exam Papers">
        <Menu.Item key="/exampapers/search">
          <NavLink to="/exampapers/search">Search</NavLink>
        </Menu.Item>
        <Menu.Item key="/exampapers/upload">
          <NavLink to="/exampapers/upload">Upload</NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="/tuitions" title="Tuitions">
        <Menu.Item key="/tuitions/search">
          <NavLink to="/tuitions/search">Search</NavLink>
        </Menu.Item>
        <Menu.Item key="/tuitions/create">
          <NavLink to="/tuitions/create">Create</NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="/notification">
        <NavLink to="/notification">
          <BellOutlined />
        </NavLink>
      </Menu.Item>

      <Menu.Item key="/messages">
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
