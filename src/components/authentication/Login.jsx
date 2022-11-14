import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';


import LoginService from '../../service/authentication/AuthService'
// import login from '../../actions/auth'

const Login = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const user = localStorage.getItem('user')
    // console.log(JSON.stringify(user.access))
    // const isLoggedIn = JSON.stringify(user.data)
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    
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
            // .then(()=>{
            //     console.log(`line 32: ${isLoggedIn}`)
            //     navigate('/home')
            // })
    };
    
    console.log(`line 36: ${isLoggedIn}`)
    return(
        <div className="container-sm">
            {!isLoggedIn?
                <div className="align-items-center">
                    <form onSubmit={e => handleLogin(e)} className='text-center mt-5 align-middle'>
                        <div className="mb-5 style={{'margin-top':'20px'}}">
                            <h1>Login to Carrier Data Tool</h1>
                        </div>
                        <div className="login">
                            <div className="logo text-center mb-5">
                                <img src={require('../../assets/logo.png')} width='18%' height='18%' alt="" />
                            </div>
                            <div className="login-form mt-5 ml-5 mr-5">
                                <div class="input-group mb-3">
                                    <input type="username"
                                        class="form-control"
                                        placeholder="Username" 
                                        value={username}
                                        aria-label="UserName" 
                                        aria-describedby="button-addon4" 
                                        onChange={e => onChangeUsername(e)}
                                        required/>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="password"
                                        class="form-control"
                                        placeholder="Password"
                                        value={password}
                                        aria-label="UserName" 
                                        aria-describedby="button-addon4" 
                                        onChange={e => onChangePassword(e)}
                                        required/>
                                </div>
                            </div>
                            <span className="text-center">
                                <button type="submit" style={{'background':'#ff6600', 'color':'white'}} class="btn btn-lg mt-5">Submit</button>
                            </span>
                        </div>
                    </form>
                </div>
            : 'pass'}

    </div>
    );
};

export default Login