import { Avatar, Skeleton } from "antd";
import React from "react";
const BASEURL = process.env.REACT_APP_BASE_URL;
const ChatContacts = ({ contactLists, setFriendDetails, conLoading }) => {
  const handleUserSelect = (val) => {
    console.log(val);
    setFriendDetails({
      id: val.uuid,
      roomId: val.roomId,
      userDetails: val.userDetails,
    });
  };

  return (
    <div className="userlist">
      <header>
        <h3>Chats</h3>
      </header>
      <div className="userlist_body">
        {conLoading ? (
          <div className="user">
            <Skeleton avatar paragraph={{ rows: 0 }} />
          </div>
        ) : contactLists.length > 0 ? (
          contactLists.map((item) => (
            <div className="user" onClick={() => handleUserSelect(item)}>
              <Avatar
                size={{ xs: 24, sm: 32, md: 40 }}
                src={
                  item.userDetails.profileImg != null
                    ? BASEURL + item.userDetails.profileImg
                    : null
                }
              >
                {item.userDetails.name ? item.userDetails.name.charAt(0) : ""}
              </Avatar>
              <p className="username">{item.userDetails.name}</p>
            </div>
          ))
        ) : (
          <div className="user">
            <p className="username">No Contacts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContacts;
