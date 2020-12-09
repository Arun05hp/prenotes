import React from "react";
import { Row, Card, Col, Input } from "antd";
import TableImg from "../../assets/images/boytable.svg";
import {
  BookOutlined,
  UploadOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  HeartOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import "./home.css";

const { Search } = Input;
const Home = () => {
  const onSearch = (value) => console.log(value);
  return (
    <div className="home_wrapper">
      <div className="search_container">
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
      <div className="prenotes_wrapper">
        <div className="title_wrapper">
          <span className="title">Why use Prenotes?</span>
          <div className="hr" />
        </div>
        <div className="card_wrapper">
          <Row gutter={[16, 16]}>
            <Col md={6} sm={12} xs={24}>
              <Card>
                <div className="icon_wrapper">
                  <UploadOutlined />
                </div>
                <h2 className="subTitle">Upload/Download Notes</h2>
                <div className="info">
                  Search for the notes you want and download. Upload your notes
                  to share.
                </div>
              </Card>
            </Col>
            <Col md={6} sm={12} xs={24}>
              <Card>
                <div className="icon_wrapper">
                  <BookOutlined />
                </div>
                <h2 className="subTitle">Buy/sell or rent books</h2>
                <div className="info">
                  Students can buy, sell or even give books on rent for free or
                  at an affordable price.
                </div>
              </Card>
            </Col>
            <Col md={6} sm={12} xs={24}>
              <Card>
                <div className="icon_wrapper">
                  <EnvironmentOutlined />
                </div>
                <h2 className="subTitle">Tuitions inside campus</h2>
                <div className="info">
                  Look for the tuitions detail going inside the campus related
                  to your subjects of interest.
                </div>
              </Card>
            </Col>
            <Col md={6} sm={12} xs={24}>
              <Card>
                <div className="icon_wrapper">
                  <FileTextOutlined />
                </div>
                <h2 className="subTitle">Question Bank</h2>
                <div className="info">
                  Upload question papers and solutions that can be helpful to
                  other students.
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <section className="made_wrapper">
        <div className="title_wrapper">
          <h2>
            Made with <HeartOutlined /> and a lots of <CoffeeOutlined />
          </h2>
        </div>
      </section>
    </div>
  );
};

export default Home;
