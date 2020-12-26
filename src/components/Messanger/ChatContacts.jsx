import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

const ChatContacts = ({ contactLists, setFriendDetails }) => {
  const handleUserSelect = (val) => {
    console.log(val);
    setFriendDetails({
      id: val.uuid,
      roomId: val.roomId,
    });
  };

  return (
    <div className="userlist">
      <header>
        <h3>Chats</h3>
      </header>
      <div className="userlist_body">
        {contactLists.length > 0
          ? contactLists.map((item) => (
              <div className="user" onClick={() => handleUserSelect(item)}>
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40 }}
                  icon={<AntDesignOutlined />}
                />
                <p className="username">{item.id}</p>
              </div>
            ))
          : "No User"}
      </div>
    </div>
  );
};

export default ChatContacts;
