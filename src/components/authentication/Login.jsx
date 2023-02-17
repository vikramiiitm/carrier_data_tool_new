import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';
import { NavItem } from "reactstrap";
import axios from "axios";


import LoginService from '../../service/authentication/AuthService'
// import login from '../../actions/auth'

const Login = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    // console.log(JSON.stringify(user.access))
    // const isLoggedIn = JSON.stringify(user.data)


    useEffect(()=>{
        (async () => {
            console.log('inside')
            const user = JSON.parse(localStorage.getItem('user'))
            console.log(user)
            const access = user?.data?.access
    
            // verify token
            // let access_is_valid = await axios.post(`http://127.0.0.1:8000/api/account/token/`,{token:access})
            // console.log(`Token is valid: ${access_is_valid}`)
    
            if (access ===undefined||access===null) {
                console.log('');
                setIsLoggedIn(false)
            }
            else {
                setIsLoggedIn(true)
            }
        })();
    },[])

    console.log('isLoggedIn: ',isLoggedIn)
    
    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
      };
    
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };
    
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('calling login funtion')
        LoginService(username, password)
            .then(()=>{
                console.log(`line 32: ${isLoggedIn}`)
                navigate('/companies')
            })
    };
    
    console.log(`line 36: ${isLoggedIn}`)
    return(
        <div className="container">

                {!isLoggedIn?
                    <div className="row">
                        <div className="col"></div>
                            <div className="align-items-center col-xs-10 col-sm-10 col-md-8">
                                <form onSubmit={e => handleLogin(e)} className='text-center mt-5 align-middle'>
                                    <div className="mb-5 style={{'margin-top':'20px'}}">
                                        <h1>Login to Carrier Data Tool</h1>
                                    </div>
                                    <div className="login">
                                        <div className="logo text-center mb-5">
                                            <img src={require('../../assets/logo.png')} width='18%' height='18%' alt="" />
                                        </div>
                                        <div className="login-form mt-5 ml-5 mr-5">
                                            <div className="input-group mb-3">
                                                <input type="username"
                                                    className="form-control"
                                                    placeholder="Username" 
                                                    value={username}
                                                    aria-label="UserName" 
                                                    aria-describedby="button-addon4" 
                                                    onChange={e => onChangeUsername(e)}
                                                    required/>
                                            </div>
                                            <div className="input-group mb-3">
                                                <input type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={password}
                                                    aria-label="UserName" 
                                                    aria-describedby="button-addon4" 
                                                    onChange={e => onChangePassword(e)}
                                                    required/>
                                            </div>
                                        </div>
                                        <span className="text-center">
                                            <button type="submit" style={{'background':'#ff6600', 'color':'white'}} className="btn btn-lg mt-5">Submit</button>
                                        </span>
                                        <div class="text-center pt-2">
                                            <p>Don't have an account? <a href="/register" style={{color:'#ff6600'}}>Register here</a></p>
            \                            </div>
                                    </div>
                                </form>
                            </div>
                        <div className="col"></div>
                    </div>
                : <Navigate replace to='/companies'/>}
        </div>
    );
};

export default Login