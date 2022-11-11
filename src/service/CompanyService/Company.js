import { authHeader } from "../auth-headers";
import client from "../authentication/axiosApi";


export const getCompanyList = () => {
    return client.get('company/companies/',{headers: authHeader()});
}

