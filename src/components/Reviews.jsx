import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../assets/css/Reviews.css";

const Reviews = () => {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const reviewData = {
      email: email,
      komentar: comment,
    };

    fetch('http://localhost:5000/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Mengirim token JWT
      },
      body: JSON.stringify(reviewData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Review submitted:', data);
      alert('Your review has been submitted successfully!');
      navigate('/home');
    })
    .catch((error) => {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    });
  };

  return (
    <section className='py-24'>
      <div className="container mx-auto lg:px-0">
        <div className='text-center'>
          <div className='font-tertiary uppercase text-[15px] tracking-[6px]'>Hotel & Spa Adina</div>
          <h2 className='font-primary text-[45px] mb-4'>Leave Your Review</h2>
        </div>
        <div className="reviews-form">
          <form onSubmit={handleSubmit}>
            <div className="reviews-form-item">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="reviews-form-item">
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-secondary btn-sm max-w-[240px] mx-auto">Submit Review</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
