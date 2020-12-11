import React, { useState } from "react";
import { Avatar, Button, Menu, Modal, Grid } from "antd";
import { Link } from "react-router-dom";
import SignIn from "../Auth/Signin";
const SubMenu = Menu.SubMenu;
const { useBreakpoint } = Grid;
const MenuItems = () => {
  const { md } = useBreakpoint();

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

  return true ? (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/signin" onClick={showModal}>
        <Link>Sign in</Link>
      </Menu.Item>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={400}
        className="sign_modal"
      >
        <SignIn />
      </Modal>
      <Button className="signupBtn">
        <Link to="/signup">Sign up </Link>
      </Button>
    </Menu>
  ) : (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/signin">
        <Link to="/signin">Sign in</Link>
      </Menu.Item>
      <Menu.Item key="/signup">
        <Link to="/signup">Sign up</Link>
      </Menu.Item>

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
          <Link to="/myprofile">My Profile</Link>
        </Menu.Item>
        <Menu.Item key="/myuploads">
          <Link to="/myuploads">My Uploads</Link>
        </Menu.Item>
        <Menu.Item key="/tutor">
          <Link to="/tutor">Tutor</Link>
        </Menu.Item>
        <Menu.Item key="/changepassword">
          <Link to="/changepassword">Change Password</Link>
        </Menu.Item>
        <Menu.Item key="/signout">
          <Link>Sign Out</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="/aboutus">
        <Link to="/aboutus">About Us</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuItems;
