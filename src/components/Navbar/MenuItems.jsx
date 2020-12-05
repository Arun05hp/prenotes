import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;

const MenuItems = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/signin">
        <Link to="/signin">Sign in</Link>
      </Menu.Item>
      <Menu.Item key="/signup">
        <Link to="/signup">Sign up</Link>
      </Menu.Item>
      {/* 
      <SubMenu key="sub1" title={<span>Blogs</span>}>
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </SubMenu> */}
      <Menu.Item key="/aboutus">
        <Link to="/aboutus">About Us</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuItems;
