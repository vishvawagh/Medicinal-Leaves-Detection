import React from "react";
import "../css/Navbar.css";
import { FaSignInAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark  fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          BotaniX
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/Home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/About">
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/Contact"
              >
                Contact
              </a>
            </li>
          </ul>
          <a
            className="nav-link active sign-in-link"
            aria-current="page"
            href="/Auth"
          >
            <div className="mx--6">
            <button className="sign-in-button ">
              SignIn
              <FaSignInAlt />
            </button>
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
}
