import axios from "axios";
import { useDispatch } from "react-redux";

import { store } from "../store";
import { singupSuccess } from "../actions/auth";

const config = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

function SignupService(username, password, email){
    console.log(username)
    // Here dispatch for login pending action

    return axios.post(`http://127.0.0.1:8000/api/account/register/`,{
        username,
        password,
        email
    })
    .then(response => {
        // here response status is ok
        console.log(JSON.stringify(response.data))
        store.dispatch(singupSuccess(response))
        console.log(312312312)
        if(JSON.stringify(response.data)) {
            localStorage.setItem('user', JSON.stringify(response))
            console.log(JSON.parse(localStorage.getItem('user')).data.access);
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


export default SignupService;