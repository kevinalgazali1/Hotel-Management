import React, { useEffect, useState, useRef } from "react";
// components

import Facilities from "../components/Facilities";
import HeroSlider from "../components/HeroSlider";

const FacilityPages = () => {
  const roomsRef = useRef(null);
  const [facilities, setFacilities] = useState([]);

  const scrollToRooms = () => {
    roomsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetch("http://localhost:5000/facilities")
      .then((response) => response.json())
      .then((data) => setFacilities(data))
      .catch((error) => console.error("Error fetching facilities:", error));
  }, []);

  return (
    <>
      <HeroSlider scrollToRooms={scrollToRooms} />
      <div className="container mx-auto relative">
      </div>
      <div ref={roomsRef}>
        <Facilities facilities={facilities} />
      </div>
    </>
  );
};

export default FacilityPages;
