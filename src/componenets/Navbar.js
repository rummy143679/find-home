import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";

export default function Navbar() {
  const login = useSelector((state) => state.login);
  const ownerServices = [
    {
      option: "Requests",
      path: "/requests",
    },
  ];
  const userServices = [
    {
      option: "Requested",
      path: "requested",
    },
    {
      option: "Saved",
      path: "saved",
    },
  ];

  const ownerOptions = ownerServices.map((opt, ind) => {
    return (
      <li key={ind}>
        <a className="dropdown-item" href={opt.path}>
          {opt.option}
        </a>
      </li>
    );
  });

  const userOptions = userServices.map((opt, ind) => {
    return (
      <li key={ind}>
        <a className="dropdown-item" href={opt.path}>
          {opt.option}
        </a>
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
      <div className="profile">
        <img
          className="profile-img"
          src="https://picsum.photos/50"
          alt="profile"
          aria-hidden="true"
        />
      </div>
    </nav>
  );
}
