import React from "react";

const ContactUs = () => {
  return (
    <div className="py-5">
      <div className="row align-items-start rounded p-4">
        {/* Left: Contact Info */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="fw-bold mb-3">Contact Us</h3>
            <p>
              Have questions? Get in touch with us and our team will assist you.
            </p>
            <p>
              <strong style={{ color: "#5b51d8" }}>Email:</strong>{" "}
              mattedaramesh27@gmail.com
            </p>
            <p>
              <strong style={{ color: "#5b51d8" }}>Phone:</strong> +91 833 396 9142
            </p>
            <p>
              <strong style={{ color: "#5b51d8" }}>Address:</strong> 123 Rental Street, Hyderabad, India
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="col-md-6">
          <h3 className="fw-bold mb-3">Send Us a Message</h3>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="4"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button className="btn btn-danger px-4 fw-semibold" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
