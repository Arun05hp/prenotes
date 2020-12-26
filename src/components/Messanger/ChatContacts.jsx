import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
const ChatContacts = () => {
  return (
    <div className="userlist">
      <header>
        <h3>Chats</h3>
      </header>
      <div className="userlist_body">
        <div className="user">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40 }}
            icon={<AntDesignOutlined />}
          />
          <p className="username">Arun</p>
        </div>
        <div className="user">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40 }}
            icon={<AntDesignOutlined />}
          />
          <p className="username">Arun</p>
        </div>
        <div className="user">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40 }}
            icon={<AntDesignOutlined />}
          />
          <p className="username">Arun</p>
        </div>
        <div className="user">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40 }}
            icon={<AntDesignOutlined />}
          />
          <p className="username">Arun</p>
        </div>
      </div>
    </div>
  );
};

export default ChatContacts;
