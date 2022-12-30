import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    const data=useSelector(state=>state)
    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('user'))?.data?.user
      console.log('user: ', user, JSON.parse(localStorage.getItem('user')))
      setUsername(user);
    },[data.isLoggedIn]);

    // const username = JSON.parse(localStorage.getItem('user'))?.data?.user

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light separated"
      style={{ background: "#f7f7f7", marginTop:'0px'}}
    >
      <img
        src={require("../assets/logo_CDT.png")}
        height="7%"
        alt=""
        style={{ "max-width": "5%", padding: "0px", margin: "0px", 'min-width':'5%'}}
      />
      <a className="navbar-brand p-1 ps-3 fs-3 fw-bolder" href="/login" style={{'margin-top':'0px', 'color':'#ff6600'}}>Carrier Data Tool</a>
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
            <div type='button' onClick={()=>{navigate('/add-company')}}> Add Company</div>
        </ul>
        {username &&
                <ul className="navbar-nav" style={{backgroundColor:'#f7f7f7'}}> 
                <li className="me-auto" style={{backgroundColor:'#f7f7f7'}}>
                  {/* <a className="nav-link" href="#"> */}
                  <i class='fas fa-user-alt'>
                  <span className="p-1" style={{'text-transform':'capitalize',color:'black'}}>{username}</span>
                  </i>
                  {/* </a> */}
                </li>
              </ul>
        }
      </div>
    </nav>
  );
}
