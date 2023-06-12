import React from "react";
import ImageCarousel from "../components/ImageCarousel";
import Cannon1 from "../assets/cannon1.jpg"
import Cannon2 from "../assets/cannon2.jpg"
import Class1 from "../assets/class1.jpg"
import Class2 from "../assets/class2.jpg"
import Exam1  from "../assets/exam1.jpg"
import Exam2  from "../assets/exam2.jpg"
import Out1  from "../assets/out1.jpg"
import Out2  from "../assets/out2.jpg"

function Home() {
  const cardData = [
    { image: Cannon1, text: "Cannon event" },
    { image: Cannon2, text: "Cannon event" },
    { image: Class1, text: "Class" },
    { image: Class2, text: "Class" },
    { image: Exam1, text: "Exam" },
    { image: Exam2, text: "Exam" },
  ];

  return (
    <>
      <h1>Gallery 1</h1>
      <ImageCarousel cardData={cardData} carouselText="Gallery 1" />
      <h1>Gallery 2</h1>
      <ImageCarousel cardData={cardData} carouselText="Gallery 2" />
    </>
  );
}

export default Home;
