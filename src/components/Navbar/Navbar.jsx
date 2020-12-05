import React, { useState } from "react";
import { Drawer, Button } from "antd";
import MenuItems from "./MenuItems";
import DrawerMenuItems from "./DrawerMenuItems";
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
            <a href="">logo</a>
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
          <DrawerMenuItems />
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
