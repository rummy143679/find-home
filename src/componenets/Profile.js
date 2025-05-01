import React, { useEffect } from "react";
import { getUser } from "../firebase/firestore";

function Profile() {

    useEffect(() => {
        const userDetails = getUser().then((user) => {
            return user;
        }).catch((e) => {
            console.error(e)
        })
        console.log("Profile",userDetails)
    },[])

  return (
      <div
        className="card shadow-sm rounded-4 mx-auto mt-1"
        style={{ maxWidth: "500px" }}
      >
        <div className="card-body py-1">
          <h3 className="card-title text-center mb-4 fw-bold">Edit Profile</h3>

          <div className="text-center mb-4">
            <img
              //   src="https://via.placeholder.com/100"
              src="https://picsum.photos/50"
              className="rounded-circle border"
              alt="Profile"
              width="100"
              height="100"
            />
            <div className="mt-2">
              <label
                htmlFor="profilePhoto"
                className="form-label text-primary"
                style={{ cursor: "pointer" }}
              >
                Change Photo
              </label>
              <input
                type="file"
                className="form-control d-none"
                id="profilePhoto"
              />
            </div>
          </div>

          <form>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter first name"
              />
            </div>

            {/* <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter last name"
              />
            </div> */}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary rounded-pill">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Profile;
