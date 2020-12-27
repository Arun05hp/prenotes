import React, { useContext, useEffect } from "react";
import { Button, Card, Col, Popconfirm, Row, message } from "antd";
import { Context as AuthContext } from "../../../../context/AuthContext";
import { Context as NotesContext } from "../../../../context/NotesContext";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import http from "../../../../services/httpService";
function getCategory(id) {
  switch (id) {
    case 1:
      return "Physics";
    case 2:
      return "Chemistry";
    case 3:
      return "Mathematics";
    case 4:
      return "Computer";
    case 5:
      return "Mechanical";

    default:
      break;
  }
}

const Notes = () => {
  const {
    state: { userData },
  } = useContext(AuthContext);
  const {
    state: { notesData },
    getNotes,
  } = useContext(NotesContext);

  const deleteNotes = (id) => {
    http
      .delete("upload/delNotes/" + id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        message.success("Deleted Successfully", 3);
        getNotes(userData.iduser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (userData.iduser) getNotes(userData.iduser);
    else return;
  }, [userData.iduser]);
  return (
    <div>
      <Row gutter={[16, 16]}>
        {notesData.length > 0
          ? notesData.map((item) => {
              return (
                <Col key={item.idnotes} md={12} xs={24}>
                  <div className="innerWrapper">
                    <Card className="itemWrapper">
                      <Row gutter={8}>
                        <Col md={18} xs={18}>
                          <h3>{item.topic}</h3>
                          <p>{getCategory(item.category)}</p>
                        </Col>
                        <Col md={6} xs={6}>
                          <div className="btnWrapper">
                            <Button
                              type="link"
                              shape="circle"
                              icon={<EditOutlined />}
                            />

                            <Popconfirm
                              placement="topRight"
                              title="
                        Are you sure you want to delete?"
                              onConfirm={() => deleteNotes(item.idnotes)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                danger
                                type="link"
                                shape="circle"
                                icon={<DeleteOutlined />}
                              />
                            </Popconfirm>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </div>
                </Col>
              );
            })
          : ""}
      </Row>
    </div>
  );
};

export default Notes;
