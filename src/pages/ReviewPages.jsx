import React, { useEffect, useState, useRef } from "react";
// components

import Reviews from "../components/Reviews";
import HeroSlider from "../components/HeroSlider";

const ReviewPages = () => {
  const reviewsRef = useRef(null);
  const [reviews, setReviews] = useState([]);

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <>
      <HeroSlider scrollToRooms={scrollToReviews} /> {/* Pass scrollToReviews here */}
      <div className="container mx-auto relative">
      </div>
      <div ref={reviewsRef}>
        <Reviews reviews={reviews} />
      </div>
    </>
  );
};

export default ReviewPages;
