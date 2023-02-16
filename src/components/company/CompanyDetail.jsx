import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authHeader } from '../../service/auth-headers';
import detailCss from '../../assets/css/detailCSS.css'
import { baseURL } from '../../utils/base_url';
export default function CompanyDetail() {


    const [data, setData] = useState();
    // const 
    const location = useLocation();
    let id=location?.state?.id
    console.log('id: ',id)

    useEffect(()=>{
        (async () => {
            console.log('Detail Page6')
            let companyData = await axios.get(`${baseURL}/company/companies/${id}`, {headers:authHeader})
            setData(companyData.data)
          })();
    },[])
    
    for(let comp in data){
        console.log(comp,' : ',data[comp])
        if(comp === 'legal_name'){
            // setLegalName(data[comp])
        }
    }

    const displayElement = ([v1,v2]) => {
        console.log(v1,v2)
        document.getElementById('detail').style.cssText = 'display:none'
        document.getElementById('cargo').style.cssText = 'display:none'
        // document.getElementById('operations').style.cssText = 'display:none'
        document.getElementById('inspection').style.cssText = 'display:none'
        document.getElementById('basics').style.cssText = 'display:none'
        document.getElementById('insurance').style.cssText = 'display:none'
        
        document.getElementById('detail_nav').classList.remove('active')
        document.getElementById('cargo_nav').classList.remove('active')
        // document.getElementById('operations_nav').classList.remove('active')
        document.getElementById('inspection_nav').classList.remove('active')
        document.getElementById('basics_nav').classList.remove('active')
        document.getElementById('insurance_nav').classList.remove('active')
     
        document.getElementById(v1).style.cssText = 'display:flex'
        document.getElementById(v2).classList.add('active')
    }
    const checkNull = (val) => {
        if (val === null){
            return '-'
        }
        else{
            return val
        }
    }
    console.log('cargo: ',data?.cargo)
  return (
    <div className='m-1'>
    <div className="navbar">
        <div className="nav pt-3 m-2">
            <nav>
                <ul>
                    <li className='active' type='button' id='detail_nav' onClick={()=>(displayElement(['detail', 'detail_nav']))}>
                        <div>Details</div>
                    </li>
                    <li type='button' id='cargo_nav' onClick={()=>(displayElement(['cargo', 'cargo_nav']))}>
                        <div>Cargo Carried</div>
                    </li>
                    <li type='button' id='inspection_nav' onClick={()=>(displayElement(['inspection', 'inspection_nav']))}>
                        <div>Inspections</div>
                    </li>
                    <li type='button' id='basics_nav' onClick={()=>(displayElement(['basics', 'basics_nav']))}>
                        <div>Basics</div>
                    </li>
                    <li type='button' id='insurance_nav' onClick={()=>(displayElement(['insurance', 'insurance_nav']))}>
                        <div>Insurance</div>
                    </li>

                    {/* <li type='button' id='insurance_nav' onClick={()=>(displayElement(['insurance', 'insurance_nav']))}>
                        <div>Insurance</div>
                    </li> */}
                </ul>
            </nav>
        </div>
    </div>

    <div className="row heading cargo-carried p-4 m-4 mt-2" id='detail' style={{display:'flex',overflow:'hidden'}}>
     
          <div className="col-md-6 col-lg-3 entities">
            <ul>
                <li>Entity Type</li>
                <li>Operating Status</li>
                <li>Out of Service</li>
                <li>Legal name</li>
                <li>OBA Name</li>
                <li>Physical Address</li>
                <li>Mailing Address</li>
                <li>Phone</li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 entityDetails">
            <ul>
                <li>CARRIER</li>
                <li>{data?.is_active? 'Active':'Not Active'}</li>
                <li>NONE</li>
                <li>{data?.legal_name}</li>
                <li>Na</li>
                <li>{checkNull(data?.addresses[0]?.street)+' '+checkNull(data?.addresses[0]?.city)+' '+ checkNull(data?.addresses[0]?.state) + ', ' + checkNull(data?.addresses[0]?.country) + ', '+ checkNull(data?.addresses[0]?.zip_code)}</li>
                <li>{checkNull(data?.addresses[0]?.street)+' '+checkNull(data?.addresses[0]?.city)+' '+ checkNull(data?.addresses[0]?.state) + ', ' + checkNull(data?.addresses[0]?.country) + ', '+ checkNull(data?.addresses[0]?.zip_code)}</li>
                <li>{checkNull(data?.phone)}</li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-3 entities">
            <ul>
                <li>USDT NUMBER</li>
                <li>State Carrier ID Number</li>
                <li>MC/MX/FF Number:</li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 entityDetails">
            <ul>
                <li>{data?.dot}</li>
                <li>{data?.docket_number}</li>
            </ul>
          </div>
    </div>

    <div className="row heading cargo-carried p-4 m-4 mt-2" id='cargo' style={{display:'none',overflow:'hidden'}}>
        <div className="col-md-3 entityDetails">
            <ul>
                {data?.cargo.map(item=><li>{item.description}</li>)}
            </ul>
        </div>
    </div>

    <div className="heading cargo-carried p-4 m-4 mt-2" id='operations' style={{display:'none',overflow:'hidden'}}>
    
        <div className="entities">
        <ul>
            <li>Physical Address</li>
            <li>Mailing Address</li>
            <li>Phone</li>
        </ul>
        </div>
        <div className="entityDetails">
        <ul>
            <li>435 MAPLE ST  </li><li>WINNSBORO, SC 29180-1821</li>
            <li>435 MAPLE ST </li><li> WINNSBORO, SC 29180-1821</li>
        </ul>
        </div>
        <div className="entities">
        <ul>
            <li>USDT NUMBER</li>
            <li>State Carrier ID Number</li>
            <li>MC/MX/FF Number:</li>
        </ul>
        </div>
        <div className="entityDetails">
        <ul>
            <li>3790182</li>
        </ul>
        </div>
        <div className="entities">
        <ul>
            <li>Power Unites</li>
            <li>Drivers</li>
            <li>MC S-150 From date</li>
            <li>MC S-150 Mileage(Year)</li>
        </ul>
        </div>
        <div className="entityDetails">
        <ul>
            <li>1</li>
            <li>2</li>
            <li>12/30/2021</li>
        </ul>
        </div>
    </div>

    <div className="row heading cargo-carried p-4 m-4 mt-2" id='inspection' style={{display:'none',overflow:'hidden'}}>
        
        <div className="col-md-3 col-sm-6 entities">
            <ul>
                <li>Inspection Total</li>
                <li>Driver Inspection Total</li>
                <li>Driver OOS Inspection Total</li>
                <li>Vehicle Inspection Total</li>
                <li>Vehicle OOS Inspection Total</li>
                <li>Unsafe Driver Inspection Total</li>
                <li>Unsafe Driver Measure</li>
            </ul>
        </div>
        <div className="col-md-3 col-sm-6 entityDetails">
            <ul>
                <li>{data?.inspection_safety[0]?.inspection_total}</li>
                <li>{data?.inspection_safety[0]?.driver_inspection_total}</li>
                <li>{data?.inspection_safety[0]?.driver_oos_inspection_total}</li>
                <li>{data?.inspection_safety[0]?.vehicle_inspection_total}</li>
                <li>{data?.inspection_safety[0]?.vehicle_oos_inspection_total}</li>
                <li>{data?.inspection_safety[0]?.unsafe_driver_inspection_violation}</li>
                <li>{data?.inspection_safety[0]?.unsafe_driver_measure}</li>
                <li>{data?.inspection_safety[0]?.hos_driver_inspection_violation}</li>
            </ul>
        </div>
        <div className="col-md-3 col-sm-6 entities">
            <ul>
                <li>HOS Driver Measure</li>
                <li>Driver Fit Inspection Violation</li>
                <li>Driver Fit Measure</li>
                <li>Contr. Subst.  Inspection Violation</li>
                <li>Contr. Subst Measure</li>
                <li>Vehicle Maintenance Violation</li>
                <li>Vehicle Maintenance Measure</li>
            </ul>
        </div>
        <div className="col-md-3 col-sm-6 entityDetails">
            <ul>
                <li>{data?.inspection_safety[0]?.hos_driver_measure}</li>
                <li>{data?.inspection_safety[0]?.driver_fit_inspection_violation}</li>
                <li>{data?.inspection_safety[0]?.driver_fit_measure}</li>
                <li>{data?.inspection_safety[0]?.contr_subst_inspection_violation}</li>
                <li>{data?.inspection_safety[0]?.contr_subst_measure}</li>
                <li>{data?.inspection_safety[0]?.vehicle_maintenance_violation}</li>
                <li>{data?.inspection_safety[0]?.vehicle_maintenance_measure}</li>
            </ul>
        </div>
    </div>
    <div className="row heading cargo-carried p-4 m-4 mt-2" id='basics' style={{display:'none',overflow:'hidden'}}>
        {data?.basics.map(item=>
            <>
                <div className="col-sm-6 col-lg-3 entities">
                    <ul>
                        <li>Basics Id</li>
                        <li>Exceeded FMCSA Intervention Threshold</li>
                        <li>Measure Value</li>
                        <li>OnRoad  Performance Threshold Violation Indicator</li>
                        <li>Percentile</li>
                    </ul>
                </div>
                <div className="col-sm-6 col-lg-3 entityDetails">
                    <ul>
                        <li>{item?.id}</li>
                        <li>{item?.exceeded_fmcsa_intervention_threshold}</li>
                        <li>{item?.measure_value}</li>
                        <li>{item?.on_road_performance_threshold_violation_indicator}</li>
                        <li>{item?.percentile}</li>
                    </ul>
                </div>
                <div className="col-sm-6 col-lg-3 entities">
                    <ul>
                        <li>Run Date</li>
                        <li>Serious Violation Investigation Past 12 Month Indicator</li>
                        <li>Total Inspection With Violation</li>
                        <li>Total Violation</li>
                        <li>Violation Threshold</li>
                    </ul>
                </div>
                <div className="col-sm-6 col-lg-3 entityDetails">
                    <ul>
                        <li>{(item?.run_date).slice(0,10)}</li>
                        <li>{item?.serious_violation_investigation_past_12month_Indicator}</li>
                        <li>{item?.total_inspection_with_violation}</li>
                        <li>{item?.total_violation}</li>
                        <li>{item?.violation_threshold}</li>
                    </ul>
                </div>
                <hr style={{width:'97.5%', overflow:'hidden'}} className='mr-4'/>
            </>
        )}
    </div>
    
    <div className="row heading cargo-carried p-4 m-4 mt-2" id='insurance' style={{display:'none',overflow:'hidden'}}>
     
     <div className="col-md-3 col-lg-3 entities">
       <ul>
           <li>Form</li>
           <li>Type</li>
           <li>Insurance Carrier</li>
           <li>Policy/Surety</li>
           <li>Coverage from</li>
           <li>Coverage to</li>
           <li>Effective Date from</li>
           <li>Effective Date to</li>
           <li>Status</li>
       </ul>
     </div>
     <div className="col-md-3 col-lg-3 entityDetails">
        {data?.insurance_history.map(item=>
                <ul>
                 <li>{item?.form}</li>
                 <li>{item?.form}</li>
                 <li>{item?.insurance_carrier}</li>
                 <li>{item?.policy_surety}</li>
                 <li>{item?.coverage_from}</li>
                 <li>{item?.coverage_to}</li>
                 <li>{item?.effective_date_from}</li>
                 <li>{item?.effective_date_to}</li>               
                 <li>{item?.status ? item?.status:'Na'}</li>
             </ul>  
        )}
        </div >
        <div className='col-6'>

         </div>
    </div>
</div>
  )
}
