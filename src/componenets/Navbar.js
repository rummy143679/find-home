import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";

export default function Navbar() {

  const login = useSelector((state) => state.login)
  console.log("login", login)
  const ownerServices = [
    {
      option: "Requests",
      path: "/requests"
    }
  ] ;
  const userServices = [
    {
      option: "Requested",
      path: "requested"
    },
    {
      option: "Saved",
      path: "saved"
    }
  ] ;

  const ownerOptions = ownerServices.map((opt, ind) => {
    return <li key={ind}><a className="dropdown-item" href={opt.path}>{opt.option}</a></li>
  })

  const userOptions = userServices.map((opt, ind) => {
    return <li key={ind}><a className="dropdown-item" href={opt.path}>{opt.option}</a></li>
  })

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow px-3 py-2">
      <Link className="navbar-brand" to="/home" alt="logo"><img src="logo.svg" /></Link>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link fw-bolder" to={login.userType === "Seller" ? "/owner-home" : "/home"} end>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fw-bolder" to="/about">About</NavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link fw-bolder"
              href="#"
              id="servicesDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Services
            </a>
            <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
              {/* <li><a className="dropdown-item" href="#">Saved</a></li>
              <li><a className="dropdown-item" href="#">Requested</a></li> */}
              {login.userType === "Seller" ? ownerOptions : userOptions}
            </ul>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fw-bolder" to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
      <a className="profile">
          <img className="profile-img" src="https://picsum.photos/50" alt="profile" aria-hidden="true" />
      </a>
    </nav>
  );
}
