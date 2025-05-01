import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  applyrequest,
  checkIsApplied,
  checkIsSaved,
  saveRequest,
  withdrawApplication,
} from "../firebase/firestore";

function HouseCardDetails() {
  const location = useLocation();
  const { HouseData } = location.state || {};
  const baseUrl = "https://angular.dev/assets/images/tutorials/common";
  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    ownerId: HouseData.ownerId,
    // isApplied: false,
    // isSaved: false,
    HouseLocationId: HouseData.id,
  });
  const [isApplied, setIsApplied] = useState(false);
  const [withDrawData, setwithDrawData] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkIsApplied();
      data.map((doc) => {
        if (doc.HouseLocationId == HouseData.id) {
          setIsApplied(true);
          setwithDrawData(doc);
        }
      });
    };
    fetchData();
  }, [isApplied]);

  useEffect(() => {
    const fetchSaved = async () => {
      const data = await checkIsSaved(formDetails.HouseLocationId);
      const saved = data.length > 0
      setIsSaved(saved);
    };
    fetchSaved()
  }, [isSaved]);

  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (
      (formDetails.lastName !== "" || formDetails.lastName !== null) &&
      (formDetails.lastName !== "" || formDetails.lastName !== null) &&
      isValidEmail(formDetails.email)
    ) {
      try {
        const res = await applyrequest(formDetails);
        if (res) {
          alert("Successfully applied");
          setFormDetails({
            firstName: "",
            lastName: "",
            email: "",
            ownerId: HouseData.ownerId,
            // isApplied: false,
            // isSaved: false,
            HouseLocationId: HouseData.id,
          });
          setIsApplied(true);
        }
      } catch (e) {
        alert("Error while applaying for this House");
        console.error(e);
      }
    } else {
      alert("Form details not correct");
    }
  };

  const handlewithDraw = async () => {
    try {
      const res = await withdrawApplication(withDrawData);
      if (res) {
        alert("application with draw");
        setIsApplied(false);
        // setIsSaved(false)
      } else {
        alert("application not with draw");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) => {
    setFormDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSaved = async (e) => {
    e.preventDefault();
    try {
      const res = await saveRequest({
        HouseLocationId: HouseData.id,
        ownerId: HouseData.ownerId,
      });
      if(res){
        alert("Successfully saved for later")
        setIsSaved(res)
      }
    } catch (e) {
      alert("Error while saving it");
      console.error(e);
    }
  };

  const applayForm = () => {
    if (isApplied) {
      return (
        <>
          <h5 className="fw-bold">You are applied for this</h5>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={handlewithDraw}
          >
            With draw application
          </button>
        </>
      );
    } else {
      return (
        <>
          <h5 className="fw-bold">Apply now to live here</h5>
          <form className="mt-3">
            <div className="mb-1">
              <label className="form-label text-uppercase fw-bold">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your first name"
                name="firstName"
                value={formDetails.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-1">
              <label className="form-label text-uppercase fw-bold">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your last name"
                name="lastName"
                value={formDetails.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-1">
              <label className="form-label text-uppercase fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={formDetails.email}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-success"
                onClick={handleApply}
              >
                Apply
              </button>
              {!isSaved && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaved}
                >
                  Save for Later
                </button>
              )}
            </div>
          </form>
        </>
      );
    }
  };

  return (
    <>
      <div className="row align-items-start mx-1 mt-2">
        <div className="col-md-6">
          <h1 className="fw-bold">{HouseData?.name || "N/A"}</h1>
          <p className="fs-5">
            <i className="bi bi-geo-alt-fill text-primary me-2"></i>
            {HouseData?.city || "Unknown city"},{" "}
            {HouseData?.state || "Unknown state"}
          </p>

          <h5 className="text-primary fw-bold mt-4">
            About this housing location
          </h5>
          <p className="mb-1">
            Units available: {HouseData?.availableUnits ?? "N/A"}
          </p>
          <p className="mb-1">
            Does this location have wifi: {String(HouseData?.wifi)}
          </p>
          <p className="mb-2">
            Does this location have laundry: {String(HouseData?.laundry)}
          </p>
          {applayForm()}
        </div>

        <div className="col-md-6 text-end">
          <img
            src={`${baseUrl}${HouseData.photo}`}
            alt="Apartment building"
            className="img-fluid rounded object-fit-cover"
            style={{ maxHeight: "85vh", width: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </>
  );
}

export default HouseCardDetails;
