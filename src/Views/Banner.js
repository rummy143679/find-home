import React from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";

export default function Banner() {

  const navigate = useNavigate();

  const onBookNowClick = (e) => {
    e.preventDefault();
    navigate("/login"); 
  }

  return (
    <div className="container-fluid home-container">
    <h1 className="home-heading-text">Find Your Perfect Home</h1>
    <p className="home-text">Experience comfort and convenience with our premium home.</p>
    <button type="button" className="btn btn-primary" onClick={onBookNowClick}>Book Now</button>
    </div>
  );
}