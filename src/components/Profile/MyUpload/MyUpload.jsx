import { Tabs } from "antd";
import React from "react";
import Books from "./Books/Books";
import "./myupload.css";
import Notes from "./Notes/Notes";
const { TabPane } = Tabs;
const MyUpload = () => {
  return (
    <div className="myuploads">
      <h2>My Uploads</h2>
      <Tabs>
        <TabPane tab="Notes" key="1">
          <Notes />
        </TabPane>
        <TabPane tab="Books" key="2">
          <Books />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MyUpload;
