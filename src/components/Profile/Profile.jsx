import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { NavLink, Switch, Route } from "react-router-dom";
import {
  FileTextOutlined,
  UploadOutlined,
  UserOutlined,
  KeyOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "./profile.css";
import PersonalInfo from "./PersonalInfo";
import MyUpload from "./MyUpload/MyUpload";
import ChangePassword from "./ChangePassword/ChangePassword";

const { Sider, Content } = Layout;

const Profile = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="profile">
      <Layout>
        <Sider trigger={null} collapsible collapsed={isCollapsed}>
          <Menu theme="light" mode="inline">
            <h3 style={{ textAlign: isCollapsed ? "center" : "" }}>
              {isCollapsed ? <UserOutlined /> : "Profile"}
            </h3>

            <Menu.Item
              key="/myprofile/personalInfo"
              icon={<FileTextOutlined />}
            >
              <NavLink to="/myprofile/personalInfo">My Details</NavLink>
            </Menu.Item>

            <Menu.Item key="/myprofile/myuploads" icon={<UploadOutlined />}>
              <NavLink to="/myprofile/myuploads">My uploads</NavLink>
            </Menu.Item>
            <Menu.Item key="/myprofile/changepassword" icon={<KeyOutlined />}>
              <NavLink to="/myprofile/changepassword">Change Password</NavLink>
            </Menu.Item>

            <h3 style={{ textAlign: "center" }} onClick={toggle}>
              {isCollapsed ? <RightOutlined /> : <LeftOutlined />}
            </h3>
          </Menu>
        </Sider>
        <Layout>
          <Content className="site-layout-background">
            <Switch>
              <Route path="/myprofile/personalInfo" component={PersonalInfo} />
              <Route path="/myprofile/myuploads" component={MyUpload} />
              <Route
                path="/myprofile/changepassword"
                component={ChangePassword}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Profile;
