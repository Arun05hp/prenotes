import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { NavLink } from "react-router-dom";
import MenuItems from "./MenuItems";
import "./navbar.css";
const Navbar = () => {
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
          <div className="logo">
            <NavLink to="/">Prenotes</NavLink>
          </div>
          <div className="navMenu">
            <div className="rightMenu">
              <MenuItems />
            </div>
            <Button className="hamburger" type="primary" onClick={showDrawer}>
              <span className="barsBtn"></span>
            </Button>
          </div>
        </div>
        <Drawer
          title="PreNotes"
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

export default Navbar;
