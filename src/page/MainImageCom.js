import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MainImageCom(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 3000,
  };
  return (
    <div>
      <Slider {...settings}>
        <div className="displayMain">
          <img src="/image/mainImg/4.svg" />
        </div>
        <div className="displayMain">
          <img src="/image/mainImg/2.svg" />
        </div>
        <div className="displayMain">
          <img src="/image/mainImg/6.svg" />
        </div>
        <div className="displayMain">
          <img src="/image/mainImg/1.svg" />
        </div>
        <div className="displayMain">
          <img src="/image/mainImg/5.svg" />
        </div>
        <div className="displayMain">
          <img src="/image/mainImg/3.svg" />
        </div>
      </Slider>
    </div>
  );
}

export default MainImageCom;
