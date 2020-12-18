import React, { useState } from "react";
import { Row, Col, Layout, Menu } from "antd";
import { NavLink, Switch, Route } from "react-router-dom";
import {
  FileTextOutlined,
  UploadOutlined,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import "./profile.css";
import PersonalInfo from "./PersonalInfo";
import MyUpload from "./MyUpload/MyUpload";
import ChangePassword from "./ChangePassword/ChangePassword";

const Profile = () => {
  return (
    <div className="profile">
      <Row gutter={[16, 16]}>
        <Col md={0} sm={24} xs={24}>
          <div className="mobNav">
            <h3>
              <UserOutlined />
            </h3>
            <Menu mode="horizontal">
              <Menu.Item
                key="/myprofile/personalInfo"
                icon={<FileTextOutlined />}
              >
                <NavLink to="/myprofile/personalInfo">
                  <span className="mobNavTitle">My Details</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item key="/myprofile/myuploads" icon={<UploadOutlined />}>
                <NavLink to="/myprofile/myuploads">
                  <span className="mobNavTitle">My uploads</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/myprofile/changepassword" icon={<KeyOutlined />}>
                <NavLink to="/myprofile/changepassword">
                  <span className="mobNavTitle">Change Password</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col md={5} sm={0} xs={0}>
          <div className="deskNav">
            <Menu theme="light" mode="inline">
              <h3>Profile</h3>

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
                <NavLink to="/myprofile/changepassword">
                  Change Password
                </NavLink>
              </Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col md={19} sm={24} xs={24}>
          <div className="content">
            <Switch>
              <Route path="/myprofile/personalInfo" component={PersonalInfo} />
              <Route path="/myprofile/myuploads" component={MyUpload} />
              <Route
                path="/myprofile/changepassword"
                component={ChangePassword}
              />
            </Switch>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
