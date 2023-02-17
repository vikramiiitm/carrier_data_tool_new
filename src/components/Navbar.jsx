import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { authHeader } from "../service/auth-headers";
import axios from 'axios'

export default function Navbar() {

  const [username, setUsername] = useState(null)
  const navigate = useNavigate()
  const data = useSelector(state => state)
  const user = JSON.parse(localStorage.getItem('user'))?.data?.user
  console.log('user: ', user, JSON.parse(localStorage.getItem('user')))
  useEffect(() => {
    setUsername(user);
  }, [data.isLoggedIn, user]);

  const stripePromise = loadStripe('pk_test_51KE6cuSBJuQTVpmlxpX5x8q498VlvurtSAVhzV6rYXxhiyvFfKKfYEyJzz4lQrTycoJYrADTpLarIF7v4zuFWHCe00xXlshLwx');
  async function handlePayment(sessionId) {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId });
  }
  // const username = JSON.parse(localStorage.getItem('user'))?.data?.user
  const handlePaymentserver = async () => {
    navigate('/subscription')
  }
  const logout = () =>{
    localStorage.removeItem('user')
    setUsername(null)
    navigate('/login')
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light separated"
      style={{ background: "#f7f7f7", marginTop: '0px' }}
    >
      <img
        src={require("../assets/logo_CDT.png")}
        height="7%"
        alt=""
        style={{ "max-width": "5%", padding: "0px", margin: "0px", 'min-width': '5%' }}
      />
      <a className="navbar-brand p-1 ps-3 fs-3 fw-bolder" href="/login" style={{ 'margin-top': '0px', 'color': '#ff6600' }}>Carrier Data Tool</a>
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
        {username &&        
          <ul className="navbar-nav mr-auto">
            <div type='button' onClick={() => handlePaymentserver()}> Subscribe</div>
          </ul>
        }
        {username &&
          <ul className="navbar-nav" style={{ backgroundColor: '#f7f7f7' }}>
            <li className="me-auto" style={{ backgroundColor: '#f7f7f7' }}>
              {/* <a className="nav-link" href="#"> */}

              <ul class="nav navbar-nav ms-auto" style={{ backgroundColor: '#f7f7f7' }}>
                <li class="nav-item dropdown">

                  {username && <a href="#" style={{ 'text-transform': 'capitalize', color: 'black' }} class="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i class='fas fa-user-alt' />{username}</a>}
                  <div class="dropdown-menu dropdown-menu-end">
                    {/* <a href="#" class="dropdown-item">Reports</a>
                            <a href="#" class="dropdown-item">Settings</a>
                            <div class="dropdown-divider"></div> */}
                    <a href="#" class="dropdown-item" onClick={()=>logout()}>Logout</a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        }
      </div>
    </nav>
  );
}
