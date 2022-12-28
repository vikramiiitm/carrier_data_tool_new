import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authHeader } from '../../service/auth-headers';


export default function CompanyDetail() {

    const [legalName, setLegalName] = useState("");
    const [name, setName] = useState("");
    const [dot, setDot] = useState("");
    const [city, setCity] = useState("");
    const [cargoCarried, setCargoCarried] = useState('');
    const [basicThreshold, setBasicThreshold] = useState();
  
    const [migrantOp, setMigrantOp] = useState(false);
    const [privateOp, setPrivateOp] = useState(false);
    const [exemptOp, setExemptOp] = useState(false);
    const [authorityOp, setAuthorityOp] = useState(false);
    const [otherOp, setOtherOp] = useState(false);
    const [minDriver, setMinDriver] = useState();
    const [maxDriver, setMaxDriver] = useState();

    const [data, setData] = useState();
    const [companyId, setCompanyId] = useState();
    // const 
    const location = useLocation();
    let id=location?.state?.id
    console.log('id: ',id)

    useEffect(()=>{
        (async () => {
            console.log('Detail Page6')
            let companyData = await axios.get(`http://127.0.0.1:8000/api/company/companies/${id}`, {headers:authHeader})
            setData(companyData.data)
          })();
    },[])
    
    for(let comp in data){
        console.log(`company Data ${id}: ${data[comp]}`)

    }

  return (
    <div>
      
    </div>
  )
}
