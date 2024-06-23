import React, { useRef } from "react";
// components
import Rooms from "../components/Rooms";
import HeroSlider from "../components/HeroSlider";

const Home = () => {
  const roomsRef = useRef(null);

  const scrollToRooms = () => {
    roomsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <HeroSlider scrollToRooms={scrollToRooms} />
      <div className="container mx-auto relative">
      </div>
      <div ref={roomsRef}>
        <Rooms />
      </div>
    </>
  );
};

export default Home;
