import { authHeader } from "../auth-headers";
import client from "../authentication/axiosApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = "http:127.0.0.1:8000/api/"
export const createCompanyService = (data) => {
    return axios.post(`http://127.0.0.1:8000/api/company/add-company/`,data, {headers: authHeader()});
}

export const getCompanyService = () => {
    console.log('list called')
    return axios.get(`http://127.0.0.1:8000/api/company/companies/`, {headers: authHeader()})
        .catch((error) => {
            if(error.response.status === 401){
                localStorage.removeItem('user')
                // navigate('/login')
            }
          });
}

