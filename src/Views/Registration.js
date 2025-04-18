import React, { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import { createUser, addUser, getUser} from "../firebase/firestore.js"

export default function Registration() {

  const navigate = useNavigate();

  const [formDeatails, setFormDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    userType: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const user = await createUser(formDeatails);
      await addUser({...formDeatails, uid: user.uid})
      const data = await getUser(user.uid);
      if(data){
        navigate("/login");
      }else{
        alert("error while getting data")
      }
    }catch(error){
      console.error("error : ",error)
    }
  };

  const onLoginClick = (e) => {
    e.preventDefault();
     navigate("/login");
  }

  const onselectUserRole = (val) => {setFormDetails({...formDeatails, userType: val})}

  return (
    <div className="container d-flex align-items-center justify-content-center registration-container">
      <div className="card shadow p-4 registration-card">
        <h3 className="text-center mb-4">Registration</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              value={formDeatails.fullName}
              onChange={(e) => setFormDetails({ ...formDeatails, fullName: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formDeatails.email}
              onChange={(e) => setFormDetails({ ...formDeatails, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formDeatails.password}
              onChange={(e) => setFormDetails({ ...formDeatails, password: e.target.value })}
              required
            />
          </div>
          <div className="d-inline-flex justify-content-between mb-3 w-100">
            {/* <div className="form-check form-check-inline">
              <input 
              className="form-check-input" 
              type="radio" 
              name="buyer" 
              value={"buyer"}
              onChange={(e) => setFormDetails({...formDeatails, userType: e.target.value})}
              id="buyer" />
              <label className="form-check-label" for="buyer">
                Buyer
              </label>
            </div> */}

            <div className="form-check form-check-inline">
              <input 
              className="form-check-input" 
              type="radio" 
              name="seller" 
              id="seller"
              value={"Seller"}
              checked={formDeatails.userType === "Seller"}
              onChange={() => onselectUserRole("Seller")}/>
              <label className="form-check-label" for="seller">
                Seller
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input 
              className="form-check-input" 
              type="radio" 
              name="rent" 
              id="rent" 
              value={"Rent"}
              checked={formDeatails.userType === "Rent"}
              onChange={() => onselectUserRole("Rent")}/>
              <label className="form-check-label" for="rent">
                Lookin for rent
              </label>
            </div>

          </div>
          
          <button type="submit" className="btn btn-primary w-100">Registration</button>
          <p className="pt-2 text-center">Already have an account? <span className="fw-bold" onClick={onLoginClick}>Login</span></p>
        </form>
      </div>
    </div>
  );
}
