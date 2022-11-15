import React from "react";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light separated"
      style={{ background: "#f7f7f7" }}
    >
      <img
        src={require("../assets/logo_CDT.png")}
        height="7%"
        alt=""
        style={{ "max-width": "5%", padding: "0px", margin: "0px", 'min-width':'5%'}}
      />
      <a className="navbar-brand p-1" href="/login" style={{'margin-top':'0px'}}>Carrier Data Tool</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          {/* <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li> */}
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item me-auto">
            <a className="nav-link" href="#">
            <i class='fas fa-user-alt'>
             <span className="p-1">Vikram</span>
            </i>
            </a>
          </li>
        </ul>
        {/* <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
      </div>
    </nav>
  );
}
