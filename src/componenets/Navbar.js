import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../store/modules/loginStore.js";

export default function Navbar() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const ownerServices = [
    {
      option: "Requests",
      path: "/requests",
    },
  ];
  const userServices = [
    {
      option: "Applied",
      path: "/applied",
    },
    {
      option: "Saved",
      path: "/saved",
    },
  ];

  const handleLogOut = () => {
    console.log("click logout");
    sessionStorage.setItem("isLoggedIn", false);
    dispatch(setLoginStatus(false));
  };

  const ownerOptions = ownerServices.map((opt, ind) => {
    return (
      <li key={ind}>
        <NavLink className="dropdown-item" to={opt.path}>
          {opt.option}
        </NavLink>
      </li>
    );
  });

  const userOptions = userServices.map((opt, ind) => {
    return (
      <li key={ind}>
        <NavLink className="dropdown-item" to={opt.path}>
          {opt.option}
        </NavLink>
      </li>
    );
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow px-3 py-2">
      <Link className="navbar-brand" to="/home" alt="logo">
        <img src="logo.svg" alt="logo" />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              className="nav-link fw-bolder"
              to={login.userType === "Seller" ? "/owner-home" : "/home"}
              end
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fw-bolder" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <span
              className="nav-link fw-bolder"
              id="servicesDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Services
            </span>
            <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
              {login.userType === "Seller" ? ownerOptions : userOptions}
            </ul>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fw-bolder" to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="profile dropdown">
        <img
          className="profile-img dropdown-toggle"
          src="https://picsum.photos/50"
          alt="profile"
          id="profileDropDown"
          role="button"
          data-bs-toggle="dropdown"
          // aria-label={"false"}
        />
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="profileDropDown"
        >
          <li>
            <NavLink className="dropdown-item" to="/profile">
              Profile
            </NavLink>
          </li>
          <li onClick={handleLogOut}>
            <span className="dropdown-item" onClick={handleLogOut}>
              Logout
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
