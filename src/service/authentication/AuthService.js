import client from "./axiosApi";
import axios from "axios";
const config = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

export const login = (username, password) => {
    return axios.post(`http://127.0.0.1:8000/api/account/token/`,{
        username,
        password,
    })
    .then(response => {
        if(response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data;
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


// export default login;