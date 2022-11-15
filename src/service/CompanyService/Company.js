import { authHeader } from "../auth-headers";
import client from "../authentication/axiosApi";


export const createCompanyService = (data) => {
    return client.post('company/add-company/', data, {headers: authHeader()});
}

