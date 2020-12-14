import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Menu, Modal, Grid } from "antd";
import { NavLink } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import queryString from "query-string";
import SignIn from "../Auth/Signin";
const { SubMenu } = Menu;
const { useBreakpoint } = Grid;
const MenuItems = () => {
  const { md } = useBreakpoint();

  const { state, logout } = useContext(AuthContext);
  const { loginFlag } = state;
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
      <SubMenu
        key="sub1"
        title={
          <>
            <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
              U
            </Avatar>
            <span className="uname">Arun Kumar</span>
          </>
        }
      >
        <Menu.Item key="/profile">
          <NavLink to="/myprofile">My Profile</NavLink>
        </Menu.Item>
        <Menu.Item key="/signout" onClick={() => logout()}>
          <NavLink to=""> Sign Out</NavLink>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default MenuItems;
