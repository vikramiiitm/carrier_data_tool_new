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
        <div>
        {!isLoggedIn?
            <>
                <p>Sign in to your account</p>
                <form onSubmit={e => handleLogin(e)}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="username"
                            placeholder="UserName"
                            name="useranme"
                            value={username}
                            onChange={e => onChangeUsername(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e => onChangePassword(e)}
                            minLength='6'
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">Login</button>
                </form>
            </>
        : 'pass'}

    </div>
    );
};

export default Login