import React from "react";
import { Row, Col, Input } from "antd";
import TableImg from "../../assets/images/boytable.svg";
import "./home.css";

const { Search } = Input;
const Home = () => {
  const onSearch = (value) => console.log(value);
  return (
    <div className="home_wrapper">
      <Row gutter={16}>
        <Col md={12} xs={24}>
          <div className="search_wrapper">
            <div className="title_wrapper">
              <h2 className="title">Access and Learn from notes </h2>
              <h2 className="title">anywhere anytime. </h2>

              <div className="sub_wrapper">
                <p className="subTitle">
                  Upload and share notes with ease. Prenotes helps you
                </p>
                <p className="subTitle">
                  to find ongoing tuition classes inside campus.
                </p>
              </div>
              <Search
                placeholder="Search your Topic here...."
                onSearch={onSearch}
                enterButton
                size="large"
              />
            </div>
          </div>
        </Col>
        <Col md={12} xs={0}>
          <div className="img_wrapper">
            <img src={TableImg} alt="study Image" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
