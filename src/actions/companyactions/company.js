export const LOAD_COMPANIES = 'LOAD_COMPANIES'
export const LOAD_COMPANIES_SUCCESS = 'LOAD_COMPANIES_SUCCESS'

import { getCompanyList } from "../../service/CompanyService/Company"

const getCompanyAction = () => {
    return getCompanyList()
    .then(
        (response) =>{
            console.log(response)
        }
    )
}