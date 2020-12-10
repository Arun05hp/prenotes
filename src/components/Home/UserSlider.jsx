import React from "react";
import Slider from "react-slick";
import { Card } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./userslider.css";
const UserSlider = () => {
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="userSlider_wrapper">
      <Slider {...settings}>
        <div className="card_wrapper">
          <Card>
            <div className="userInfo">
              <div className="img_wrapper">
                <img
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  alt="Img"
                />
              </div>
              <h4>Joe Smith</h4>
              <h5>Computer Engg</h5>
            </div>
            <div className="text">
              "It's is both attractive and highly adaptable. It's exactly what
              I've been looking for. Definitely worth the investment."
            </div>
          </Card>
        </div>
        <div className="card_wrapper">
          <Card>
            <div className="userInfo">
              <div className="img_wrapper">
                <img
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  alt="Img"
                />
              </div>
              <h4>Joe Smith</h4>
              <h5>Computer Engg</h5>
            </div>
            <div className="text">
              "It's is both attractive and highly adaptable. It's exactly what
              I've been looking for. Definitely worth the investment."
            </div>
          </Card>
        </div>
        <div className="card_wrapper">
          <Card>
            <div className="userInfo">
              <div className="img_wrapper">
                <img
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  alt="Img"
                />
              </div>
              <h4>Joe Smith</h4>
              <h5>Computer Engg</h5>
            </div>
            <div className="text">
              "It's is both attractive and highly adaptable. It's exactly what
              I've been looking for. Definitely worth the investment."
            </div>
          </Card>
        </div>
        <div className="card_wrapper">
          <Card>
            <div className="userInfo">
              <div className="img_wrapper">
                <img
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  alt="Img"
                />
              </div>
              <h4>Joe Smith</h4>
              <h5>Computer Engg</h5>
            </div>
            <div className="text">
              "It's is both attractive and highly adaptable. It's exactly what
              I've been looking for. Definitely worth the investment."
            </div>
          </Card>
        </div>
        <div className="card_wrapper">
          <Card>
            <div className="userInfo">
              <div className="img_wrapper">
                <img
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  alt="Img"
                />
              </div>
              <h4>Joe Smith</h4>
              <h5>Computer Engg</h5>
            </div>
            <div className="text">
              "It's is both attractive and highly adaptable. It's exactly what
              I've been looking for. Definitely worth the investment."
            </div>
          </Card>
        </div>
        <div className="card_wrapper">
          <Card>
            <div className="userInfo">
              <div className="img_wrapper">
                <img
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  alt="Img"
                />
              </div>
              <h4>Joe Smith</h4>
              <h5>Computer Engg</h5>
            </div>
            <div className="text">
              "It's is both attractive and highly adaptable. It's exactly what
              I've been looking for. Definitely worth the investment."
            </div>
          </Card>
        </div>
        <div className="card_wrapper">
          <Card>
            <div className="userInfo">
              <div className="img_wrapper">
                <img
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  alt="Img"
                />
              </div>
              <h4>Joe Smith</h4>
              <h5>Computer Engg</h5>
            </div>
            <div className="text">
              "It's is both attractive and highly adaptable. It's exactly what
              I've been looking for. Definitely worth the investment."
            </div>
          </Card>
        </div>
        <div className="card_wrapper">
          <Card>
            <div className="userInfo">
              <div className="img_wrapper">
                <img
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  alt="Img"
                />
              </div>
              <h4>Joe Smith</h4>
              <h5>Computer Engg</h5>
            </div>
            <div className="text">
              "It's is both attractive and highly adaptable. It's exactly what
              I've been looking for. Definitely worth the investment."
            </div>
          </Card>
        </div>
      </Slider>
    </div>
  );
};

export default UserSlider;
