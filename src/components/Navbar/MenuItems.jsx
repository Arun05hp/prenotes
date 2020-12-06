import React from "react";
import { Avatar, Menu, Grid } from "antd";
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const { useBreakpoint } = Grid;
const MenuItems = () => {
  const { md } = useBreakpoint();

  return (
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
