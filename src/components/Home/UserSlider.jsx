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
              <h4>Atul </h4>
              <h5>Computer Engg</h5>
            </div>
            <div className="text">
              "Prenotes helped me to focus more on learning."
            </div>
          </Card>
        </div>
        <div className="card_wrapper">
          <Card>
            <div className="userInfo">
              <div className="img_wrapper">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk3tcCdnb-LIg3BUuEH0OLGJMZPQQDtGUm5w&usqp=CAU"
                  alt="Img"
                />
              </div>
              <h4>Ajay</h4>
              <h5>Computer Engg</h5>
            </div>
            <div className="text">
              "Great experience. It's exactly what I've been looking for."
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
              <h4>Priya </h4>
              <h5>Mechanical Engg</h5>
            </div>
            <div className="text">
              "I found many books at reasonable prices."
            </div>
          </Card>
        </div>
        <div className="card_wrapper">
          <Card>
            <div className="userInfo">
              <div className="img_wrapper">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpcLzYU8SsybUPTpqpI01wbVK1Ysqi5FU98w&usqp=CAU"
                  alt="Img"
                />
              </div>
              <h4>Prince </h4>
              <h5>Computer Engg</h5>
            </div>
            <div className="text">
              "I started giving tuitions of different subjects ."
            </div>
          </Card>
        </div>

        <div className="card_wrapper">
          <Card>
            <div className="userInfo">
              <div className="img_wrapper">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Img"
                />
              </div>
              <h4>Karan </h4>
              <h5>Computer Engg</h5>
            </div>
            <div className="text">
              "I found many books at reasonable prices."
            </div>
          </Card>
        </div>
        <div className="card_wrapper">
          <Card>
            <div className="userInfo">
              <div className="img_wrapper">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk3tcCdnb-LIg3BUuEH0OLGJMZPQQDtGUm5w&usqp=CAU"
                  alt="Img"
                />
              </div>
              <h4>Arun</h4>
              <h5>Computer Engg</h5>
            </div>
            <div className="text">
              "Great experience. It's exactly what I've been looking for."
            </div>
          </Card>
        </div>
      </Slider>
    </div>
  );
};

export default UserSlider;
