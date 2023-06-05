import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Blastoise from "../assets/blastoise.jpg";

function ImgCard() {
  return (
    <div className="card" style={{ margin: "20px" }}>
      <h3>this is card</h3>
      <img src={Blastoise} alt="blastoise" />
    </div>
  );
}

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

function ImageCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
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
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div style={{ padding: "30px", margin: "20px" }}>
      <h2> Single Item</h2>
      <Slider {...settings}>
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
        <ImgCard />
      </Slider>
    </div>
  );
}

export default ImageCarousel;
