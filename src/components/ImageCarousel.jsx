import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Blastoise from "../assets/blastoise.jpg";
import Caterpie from "../assets/caterpie.jpg";
import Wartortle from "../assets/wartortle.jpg";
import Venusaur from "../assets/venusaur.jpg";
import Squirtle from "../assets/squirtle.jpg";
import Charmaleon from "../assets/charmeleon.jpg";

function ImgCard({ image, text, height, width }) {
  return (
    <div className="card" style={{ margin: "20px" }}>
      <h3>{text}</h3>
      <img src={image} alt={text} style={{ height, width }} />
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
// Rest of the code...

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
        <ImgCard
          image={Blastoise}
          text="Blastoise"
          // height="300px"
          // width="300px"
        />
        <ImgCard
          image={Caterpie}
          text="Caterpie"
          // height="200px"
          // width="200px"
        />
        <ImgCard
          image={Squirtle}
          text="Blastoise"
          // height="300px"
          // width="300px"
        />
        <ImgCard
          image={Charmaleon}
          text="Caterpie"
          // height="200px"
          // width="200px"
        />
        <ImgCard
          image={Wartortle}
          text="Blastoise"
          // height="300px"
          // width="300px"
        />
        <ImgCard
          image={Venusaur}
          text="Caterpie"
          // height="200px"
          // width="200px"
        />
        {/* Add more ImgCard components with different images as props */}
      </Slider>
    </div>
  );
}

export default ImageCarousel;
