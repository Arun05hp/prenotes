import React, { useContext, useEffect, useState } from "react";

import { Drawer, Button, Grid, Menu, Modal } from "antd";
import { NavLink, withRouter, useHistory } from "react-router-dom";
import PrenotesLogo from "../../assets/images/logo.svg";
import MenuItems from "./MenuItems";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Context as AuthContext } from "../../context/AuthContext";
import SignIn from "../Auth/Signin";
import "./navbar.css";
const { useBreakpoint } = Grid;

const Navbar = ({ location }) => {
  const { md } = useBreakpoint();
  let history = useHistory();
  const { state } = useContext(AuthContext);
  const { loginFlag } = state;
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

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

  const goToSignUp = () => {
    if (onClose) onClose();
    history.push("/signup");
  };

  useEffect(() => {
    if (location.pathname === "/" && location.state) {
      if (location.state.login === true) {
        showModal();
        history.push("/", {});
      }
    }
  }, [location]);

  useEffect(() => {
    if (md) onClose();
  }, [md]);

  return (
    <nav>
      <div className="app_container">
        <div className="navbar">
          <NavLink to="/">
            <div className="logo">
              <img className="logoimg" src={PrenotesLogo} alt="logo" />
            </div>
          </NavLink>
          <div className="navMenu">
            <div className="rightMenu">
              {loginFlag === false && (
                <div className="signbtnWrapper">
                  <Menu mode={"horizontal"} onClick={handleClick}>
                    <Menu.Item key="/" onClick={() => showModal()}>
                      Sign in
                    </Menu.Item>
                  </Menu>
                  <Button className="signupBtn" onClick={goToSignUp}>
                    Sign up
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
              )}
              <MenuItems />
            </div>
            <div className="mob_wrapper">
              <div className="mob_container">
                {loginFlag === false && (
                  <div className="mobSignbtnWrapper">
                    <Menu mode={"horizontal"} onClick={handleClick}>
                      <Menu.Item key="/" onClick={() => showModal()}>
                        Sign in
                      </Menu.Item>
                    </Menu>
                    <Button className="signupBtn" onClick={goToSignUp}>
                      Sign up
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
                )}
                {loginFlag === false ? null : (
                  <>
                    <Menu mode={"horizontal"}>
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
                    </Menu>
                    <Button className="hamburger" onClick={showDrawer}>
                      <span className="barsBtn"></span>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Drawer
          title={
            <img className="drawerlogoimg" src={PrenotesLogo} alt="logo" />
          }
          placement="left"
          onClose={onClose}
          visible={visible}
          className="sidenav"
        >
          <MenuItems />
        </Drawer>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
