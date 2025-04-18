import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function HouseCardDetails() {
  const location = useLocation();
  const { HouseData } = location.state || {};
  const baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  return (
    <>
        <div className="row align-items-start mx-1 mt-2">
        <div className="col-md-6">
          <h1 className="fw-bold">{HouseData?.name || "N/A"}</h1>
          <p className="fs-5">
            <i className="bi bi-geo-alt-fill text-primary me-2"></i>
            {HouseData?.city || "Unknown city"}, {HouseData?.state || "Unknown state"}
          </p>

          <h5 className="text-primary fw-bold mt-4">About this housing location</h5>
          <p className="mb-1">Units available: {HouseData?.availableUnits ?? "N/A"}</p>
          <p className="mb-1">Does this location have wifi: {String(HouseData?.wifi)}</p>
          <p className="mb-2">Does this location have laundry: {String(HouseData?.laundry)}</p>

          <h5 className="fw-bold">Apply now to live here</h5>
          <form className="mt-3">
            <div className="mb-1">
              <label className="form-label text-uppercase fw-bold">First Name</label>
              <input type="text" className="form-control" placeholder="Enter your first name" />
            </div>
            <div className="mb-1">
              <label className="form-label text-uppercase fw-bold">Last Name</label>
              <input type="text" className="form-control" placeholder="Enter your last name" />
            </div>
            <div className="mb-1">
              <label className="form-label text-uppercase fw-bold">Email</label>
              <input type="email" className="form-control" placeholder="Enter your email" />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Apply
            </button>
          </form>
        </div>

        <div className="col-md-6 text-end">
          <img
            src={`${baseUrl}${HouseData.photo}`}
            alt="Apartment building"
            className="img-fluid rounded object-fit-cover"
            style={{ maxHeight: '85vh', width: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </>
  );
}

export default HouseCardDetails;
