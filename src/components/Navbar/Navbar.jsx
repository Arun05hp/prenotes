import React, { useContext, useState } from "react";
import { Drawer, Button, Menu } from "antd";
import { NavLink } from "react-router-dom";
import PrenotesLogo from "../../assets/images/logo.svg";
import MenuItems from "./MenuItems";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Context as AuthContext } from "../../context/AuthContext";
import "./navbar.css";
const Navbar = () => {
  const { state } = useContext(AuthContext);
  const { loginFlag } = state;
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

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
              <MenuItems />
            </div>
            <div className="mob_wrapper">
              <div className="mob_container">
                {loginFlag === false ? null : (
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
                )}

                <Button className="hamburger" onClick={showDrawer}>
                  <span className="barsBtn"></span>
                </Button>
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
          <MenuItems onClose={onClose} />
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
