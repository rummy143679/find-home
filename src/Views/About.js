import React from "react";
import {useNavigate} from "react-router-dom"

const AboutUs = () => {

  const navigate = useNavigate()

  const onClickContact = () => {
    navigate("/contact")
  }

  return (
    <div className="container my-5">
      <div className="row align-items-center bg-light rounded shadow p-4">
        {/* Text Column */}
        <div className="col-md-6 mb-4 mb-md-0">
          <h2 className="fw-bold mb-3">About Us</h2>
          <p>
            We help people find their perfect rental home with ease. Our
            platform offers a wide range of properties, ensuring you get the
            best deals and a seamless renting experience.
          </p>
          <p>
            With a team of experts and years of experience in real estate, we
            bring you trustworthy listings, verified landlords, and 24/7
            customer support.
          </p>
          <button className="btn btn-danger mt-3 px-4 py-2 fw-semibold" onClick={onClickContact}>
            Contact Us
          </button>
        </div>

        {/* Image Column */}
        <div className="col-md-6 text-center">
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80" // Replace with your own image
            alt="Ocean"
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
