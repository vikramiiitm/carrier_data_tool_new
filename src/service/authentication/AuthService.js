import client from "./axiosApi";
import axios from "axios";
import { useDispatch } from "react-redux";
import {loginPending, loginSuccess} from '../../actions/auth'
import { store } from "../../store.js";
const config = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

function LoginService(username, password){
    console.log(username)
    // Here dispatch for login pending action

    return axios.post(`http://127.0.0.1:8000/api/account/token/`,{
        username,
        password,
    })
    .then(response => {
        // here response status is ok
        console.log(JSON.stringify(response.data))
        store.dispatch(loginSuccess(response))
        console.log(312312312)
        if(JSON.stringify(response.data)) {
            localStorage.setItem('user', JSON.stringify(response))
            console.log('service',JSON.parse(localStorage.getItem('user')).data);
            // for (var key in k){
            //     console.log('26>>>',key, k[key])
            // }

        }
        return Promise.resolve();
    })
    .catch((error)=>{
        if (error.response){
            console.log(`error::: ${error.response}`)
        }
        else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the 
            // browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        }
        else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            }
        })
};


export default LoginService;