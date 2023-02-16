import { authHeader } from "../auth-headers";
import client from "../authentication/axiosApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/base_url";

export const createCompanyService = (data) => {
    return axios.post(`${baseURL}/company/add-company/`,data, {headers: authHeader()});
}

export const getCompanyService = () => {
    console.log('list called')
    return axios.get(`${baseURL}/company/companies/`, {headers: authHeader()})
        .catch((error) => {
            if(error.response.status === 401){
                localStorage.removeItem('user')
                // navigate('/login')
            }
          });
}

