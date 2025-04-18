import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUser, loggin } from "../firebase/firestore.js";
import { useDispatch } from "react-redux";
import { setLoginStatus, setUserType } from "../store/modules/loginStore.js";

export default function Login({login}) {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [formDeatails, setFormDetails] = useState({
    email: "",
    password: "",
    userType: ""
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const user = await loggin(formDeatails);
      if(user.accessToken != null){
        sessionStorage.setItem("isLoggedIn", true)
        sessionStorage.setItem("userType", formDeatails.userType)
        dispatch(setLoginStatus(true))
        dispatch(setUserType(formDeatails.userType))
        const data = await getUser(user.uid)
        if(data.userType === formDeatails.userType){
          data.userType === "Seller" ? navigate("/owner-home") : navigate("/home"); 
        }else{
          alert(`Credentails are not allowed to ${formDeatails.userType}`)
        }
      }
    }catch(error){
      alert("Login details failed")
      console.error(error)
    }
  };

  const onRegisterClick = (e) => {
    e.preventDefault();
     navigate("/registration");
  }

  const onselectUserRole = (val) => setFormDetails({...formDeatails, userType: val })

  return (
    <div className="container d-flex align-items-center justify-content-center login-container">
      <div className="card shadow p-4 login-card">
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
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
              onChange={(e) => setFormDetails({...formDeatails, password: e.target.value })}
              required
            />
          </div>
          <div className="d-inline-flex justify-content-between mb-3 w-100">
            {/* <div className="form-check form-check-inline">
              <input 
              className="form-check-input" 
              type="radio" 
              name="Buyer"
              value={"Buyer"}
              onChange={(e) => setFormDetails({...formDeatails, userType: e.target.value})}
              id="Buyer" />
              <label className="form-check-label" for="Buyer">
                Buyer
              </label>
            </div> */}

            <div className="form-check form-check-inline">
              <input 
              className="form-check-input" 
              type="radio" 
              name="Seller" 
              id="Seller"
              value={"Seller"}
              checked={formDeatails.userType === "Seller"}
              onChange={() => onselectUserRole("Seller")}/>
              <label className="form-check-label" for="Seller">
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
          
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <p className="pt-2 text-center">Don't have an account? <a className="fw-bold btn-primary text-decoration-none" onClick={onRegisterClick} >Register</a></p>
        </form>
      </div>
    </div>
  );
}
