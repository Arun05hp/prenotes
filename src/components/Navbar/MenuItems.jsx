import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Avatar, Grid, Menu } from "antd";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";

const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const MenuItems = () => {
  const BASEURL = process.env.REACT_APP_BASE_URL;
  const { md } = useBreakpoint();

  const { state, logout } = useContext(AuthContext);
  const { loginFlag, userData } = state;

  return loginFlag === false ? null : (
    <Menu mode={md ? "horizontal" : "inline"} triggerSubMenuAction="click">
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
          <NavLink to="/books/buy">Looking for books</NavLink>
        </Menu.Item>
        <Menu.Item key="/books/sell">
          <NavLink to="/books/sell">Want to sell</NavLink>
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
          <NavLink to="/tuitions/search">Find </NavLink>
        </Menu.Item>
        <Menu.Item key="/tuitions/create">
          <NavLink to="/tuitions/create">Create one</NavLink>
        </Menu.Item>
      </SubMenu>

      {md ? (
        <Menu.Item key="/notification">
          <NavLink to="/notification">
            <BellOutlined />
          </NavLink>
        </Menu.Item>
      ) : null}

      {md ? (
        <Menu.Item key="/messages">
          <NavLink to="/messages">
            <MessageOutlined />
          </NavLink>
        </Menu.Item>
      ) : null}

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
