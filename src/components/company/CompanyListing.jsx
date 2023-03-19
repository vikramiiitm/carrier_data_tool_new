import React, { useEffect, useState } from "react";
import { usePagination, useTable } from "react-table";
import { useMemo } from "react";
import axios from "axios";
import { getCompanyService } from "../../service/CompanyService/Company";
import { authHeader } from "../../service/auth-headers";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import NavbarSide from "../NavbarSide";
import '../../assets/css/companylist.css'

import { styled } from '@mui/material/styles';
import { baseURL } from "../../utils/base_url";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


export default function CompanyListing() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [legalName, setLegalName] = useState("");
  const [name, setName] = useState("");
  const [dot, setDot] = useState("");
  const [city, setCity] = useState("");
  const [localTable, setLocalTable] = useState();
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  const [callNext,setNextCall]=useState(false);
  const [callPrev,setPrevCall]=useState(false);
  const [currentPage, setCUrrentPage] = useState();
  const [lastPage, setLastPage] = useState();

  const [cargoCarried, setCargoCarried] = useState('');
  const [basicThreshold, setBasicThreshold] = useState();

  const [migrantOp, setMigrantOp] = useState(false);
  const [privateOp, setPrivateOp] = useState(false);
  const [exemptOp, setExemptOp] = useState(false);
  const [authorityOp, setAuthorityOp] = useState(false);
  const [otherOp, setOtherOp] = useState(false);
  const [minDriver, setMinDriver] = useState();
  const [maxDriver, setMaxDriver] = useState();

  const [totalInspectionMin, setTotalInspectionMin] = useState();
  const [totalInspectionMax, setTotalInspectionMax] = useState();
  const [driverInspectionMin, setDriverInspectionMin] = useState();
  const [driverInspectionMax, setDriverInspectionMax] = useState();
  const [VehicleInspectionMin, setVehicleInspectionMin] = useState();
  const [VehicleInspectionMax, setVehicleInspectionMax] = useState();
  
  const [totalCrashMax, settotalCrashMax] = useState();
  const [totalCrashMin, settotalCrashMin] = useState();
  const [fatalCrashMin, setfatalCrashMin] = useState();
  const [fatalCrashMax, setfatalCrashMax] = useState();
  const [towawayCrashMin, settowawayCrashMin] = useState();
  const [towawayCrashMax, settowawayCrashMax] = useState();
  const [injuryCrashMin, setinjuryCrashMin] = useState();
  const [injuryCrashMax, setinjuryCrashMax] = useState();

  let navigate = useNavigate();

  // const [basics,]
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      // backgroundColor: 'none',
      color: theme.palette.common.black,
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  // console.log(JSON.stringify(user.access))
  // const isLoggedIn = JSON.stringify(user.data)

  // Table config
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(()=>{
      console.log('inside')
      const user = JSON.parse(localStorage.getItem('user'))
      console.log(user)
      const access = user?.data?.access

      if (access ===undefined||access===null) {

          setIsLoggedIn(false)
          navigate('/login')
      }
      else {
          setIsLoggedIn(true)
      }
  },[])

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      console.log('called first company list 76')
      const result = await getCompanyService();
      
      const user = JSON.parse(localStorage.getItem('user'))
      if (user ===undefined||user===null) {

        setIsLoggedIn(false)
        navigate('/login')
      }

      let temp = flatData(result.data.results);
      console.log(`check login ${result}`)
      setData(temp)
      // assigning next of url in next var
      if (result?.data?.next){
        setNext(result.data.next)
      }
      if (result?.data?.previous){
        setPrevious(result.data.previous)
      }
      if (result?.data?.current){
        setCUrrentPage(result.data.current)
      }
      if (result?.data?.lastPage){
        setLastPage(result.data.lastPage)
      }
    })();
  }, []);

  const flatData = (companies) => {
    console.log('flatData called" ', companies)
    let localCompanyList = [];
    for(let company of companies){
      let tempCompany = {};
      tempCompany.id = company.id;
      tempCompany.legal_name = company.legal_name;
      tempCompany.dot = company.dot;
      tempCompany.is_active = company.is_active;
      tempCompany.dba = company.dba;
      tempCompany.phone = company.phone;

      
      
      for(let address of company.addresses){
        tempCompany.city = address.city;
        tempCompany.state = address.state;
        tempCompany.zip = address.zip;
      }
      localCompanyList.push(tempCompany);
    }
    console.log('localCompanyList: ',localCompanyList)
    return localCompanyList;
  }


  const onChange = (e, field) => {
    const value = e.target.value;
    field(value);
  };

  const filterlist = () => {
      return axios.get(`${baseURL}/company/companies?legal_name=${legalName}&dba=${name}&dot=${dot}&city=${city}&cargo=${cargoCarried}&privateOp=${privateOp}&migrantOp=${migrantOp}
      &exemptOp=${exemptOp}&authorityOp=${authorityOp}&otherOp=${otherOp}&minInsp=${totalInspectionMin}&maxInsp=${totalInspectionMax}&vehInspMin=${VehicleInspectionMin}&vehInspMax=${VehicleInspectionMax}
      &driverInspMin=${driverInspectionMin}&driverInspMax=${driverInspectionMax}&totalCrashMin=${totalCrashMin}&totalCrashMax=${totalCrashMax}&injuryCrashMin=${injuryCrashMin}&injuryCrashMax=${injuryCrashMax}
      &fatalCrashMin=${fatalCrashMin}&fatalCrashMax=${fatalCrashMax}&towawayCrashMin=${towawayCrashMin}&towawayCrashMax=${towawayCrashMax}&minDriver=${minDriver}&maxDriver=${maxDriver}`,  {headers: authHeader()})
  }


// we created a state called callNext, when we need to change page we change the state of callpage, and give this as a dependency to useEffect
  useEffect(()=>{
    console.log("change the page")
    console.log('test next: ', next)
    const paginationHandler = async () => {
      if (next!==undefined && next !==null){
        let response = await axios.get(next, {Header: authHeader})
        let temp = flatData(response.data.results)
        setData(temp)
        if (response?.data?.next){
          setNext(response.data.next)
        }
        if (response?.data?.previous){
          setPrevious(response.data.previous)
        }
        if (response?.data?.current){
          setCUrrentPage(response.data.current)
        }
        if (response?.data?.lastPage){
          setLastPage(response.data.lastPage)
        }
        console.log('response; ', response)
      }
    }
    paginationHandler()
  },[callNext])

  useEffect(()=>{
    console.log("change the page")
    console.log('test next: ', next)
    const paginationHandler = async () => {
      if (previous!==undefined){
        let response = await axios.get(previous, {Header: authHeader})
        let temp = flatData(response.data.results)
        setData(temp)
        if (response?.data?.next){
          setNext(response.data.next)
        }
        if (response?.data?.previous){
          setPrevious(response.data.previous)
        }
        if (response?.data?.current){
          setCUrrentPage(response.data.current)
        }
        if (response?.data?.lastPage){
          setLastPage(response.data.lastPage)
        }
        console.log('response; ', response)
      }
    }
    paginationHandler()
  },[callPrev])


  
const detailPage = (id) => {
  navigate('/companiesDetail', {state:{'id':id}})
}

//  console.log("ankit kumar",data)

  async function onsubmit(e){
    console.log('clicked')
    e.preventDefault();
    console.log('InsideCOmpany submit');
    await filterlist(legalName, name, dot, city)
    .then((response)=>{
      let temp = flatData(response.data.results)
      setData(temp)
      if (response?.data?.next){
        setNext(response.data.next)
      }
      if (response?.data?.previous){
        setPrevious(response.data.previous)
      }
      if (response?.data?.current){
        setCUrrentPage(response.data.current)
      }
      if (response?.data?.lastPage){
        setLastPage(response.data.lastPage)
      }
    })
  }

  return (
    <div>
      {console.log({'next:': next})}
      <div className='side-filter' style={{width:'23%', float:'left'}} >
        <div className=' ml-3 mr-4 d-flex align-items-center justify-content-center' style={{background:'#f7f7f7', fontSize:'16px'}}>
          <div className='ml-2 row' style={{overflow:'scroll', minWidth:'25%', height:'88.5vh'}}>
            <div className='col'>Advanced Filters</div>
            <form className='form-group row' onSubmit={e => onsubmit(e)}>
                 <div className="form-label">Cargo Carried
                    <input
                      type="text"
                      className="form-control"
                      id="cargoCarried"
                      name="cargoCarried"
                      value={cargoCarried}
                      placeholder='Cargo Carried'
                      onChange={(e) => onChange(e, setCargoCarried)}
                    />
                </div>
                    <br></br>
                    
                <div>
                    <label for="name">
                        Drivers:
                    </label>
                    <input
                      className="ml-2" 
                      style={{width:'55px'}}
                      type="number" 
                      id="authority"
                      name="minDriver"
                      value={minDriver}
                      placeholder='Min Driver'
                      onChange={(e) => onChange(e, setMinDriver)}/> to
                    <input
                      className="ml-2" 
                      style={{width:'55px'}} 
                      type="number" 
                      id="authority"
                      name="maxDriver"
                      value={maxDriver}
                      placeholder='Max Driver'
                      onChange={(e) => onChange(e, setMaxDriver)}/>
                    <br></br>
                </div>
                <div>
                    <br/>
                    <div className='form-label'>Classification</div>
                    
                    <input 
                      className="mr-1"
                      type="checkbox" 
                      id="authority"
                      name="authorityOp"
                      value={authorityOp}
                      onChange={(e) => onChange(e, setAuthorityOp(!authorityOp))}/>
                      <label>Authorized For Hire</label><br></br>

                    <input 
                      className="mr-1"
                      type="checkbox" 
                      id="Exempt"
                      name="exemptOp"
                      value={exemptOp}
                      onChange={(e) => onChange(e, setExemptOp(!exemptOp))}/>
                    <label>Exempt for Hire</label><br></br>

                    <input 
                      className="mr-1"
                      type="checkbox" 
                      id="Private"
                      name="privateOp"
                      value={privateOp}
                      onChange={(e) => onChange(e, setPrivateOp(!privateOp))}></input>
                    <label>Private (Property)</label><br></br>

                    <input 
                      className="mr-1"
                      type="checkbox" 
                      id="migrant"
                      name="migrantOp"
                      value={migrantOp}
                      onChange={(e) => onChange(e, setMigrantOp(!migrantOp))}></input>
                    <label>Migrant</label><br></br>

                    {/* <input type="checkbox" id="usmail"></input>
                    <label>U.S. Mail</label><br></br>

                    <input type="checkbox" id="Federal"></input>
                    <label>Federal Government</label><br></br>

                    <input type="checkbox" id="state"></input>
                    <label>State Government</label><br></br>

                    <input type="checkbox" id="local"></input>
                    <label>Local Government</label><br></br>

                    <input type="checkbox" id="indian"></input>
                    <label>Indian Nation</label><br></br> */}

                    <input 
                      className="mr-1"
                      type="checkbox" 
                      id="other"
                      name="otherOp"
                      value={otherOp}
                      onChange={(e) => onChange(e, setOtherOp(!otherOp))}></input>
                    <label>Other</label><br></br>
                </div>
                
                <div>
                    <div className='header'>Inspection</div>
                    <div>Total Inspection</div>
                    <input
                      className="ml-2" 
                      style={{width:'55px'}}
                      type="number" 
                      id="authority"
                      name="minDriver"
                      value={totalInspectionMin}
                      placeholder='Min'
                      onChange={(e) => onChange(e, setTotalInspectionMin)}/> to
                    <input
                      className="ml-2" 
                      style={{width:'55px'}} 
                      type="number" 
                      id="totalInspection"
                      name="totalInspectionMax"
                      value={totalInspectionMax}
                      placeholder='Max'
                      onChange={(e) => onChange(e, setTotalInspectionMax)}/>
                    <br></br>
                    <div>Driver Inspection</div>
                    <input
                      className="ml-2" 
                      style={{width:'55px'}}
                      type="number" 
                      id="driverInspectionMin"
                      name="driverInspectionMin"
                      value={driverInspectionMin}
                      placeholder='Min'
                      onChange={(e) => onChange(e, setDriverInspectionMin)}/> to
                    <input
                      className="ml-2" 
                      style={{width:'55px'}} 
                      type="number" 
                      id="driverInspectionMax"
                      name="driverInspectionMax"
                      value={driverInspectionMax}
                      placeholder='Max'
                      onChange={(e) => onChange(e, setDriverInspectionMax)}/>
                    <br></br>
                    <div>Vehicle Inspection</div>
                    <input
                      className="ml-2" 
                      style={{width:'55px'}}
                      type="number" 
                      id="VehicleInspectionMin"
                      name="VehicleInspectionMin"
                      value={VehicleInspectionMin}
                      placeholder='Min'
                      onChange={(e) => onChange(e, setVehicleInspectionMin)}/> to
                    <input
                      className="ml-2" 
                      style={{width:'55px'}} 
                      type="number" 
                      id="VehicleInspectionMax"
                      name="VehicleInspectionMax"
                      value={VehicleInspectionMax}
                      placeholder='Max'
                      onChange={(e) => onChange(e, setVehicleInspectionMax)}/>
                    <br></br>
                </div>
                <div>
                    <div className='header mt-2'>Crashes</div>
                    <div>Total Crash</div>
                    <input
                      className="ml-2" 
                      style={{width:'55px'}}
                      type="number" 
                      id="totalCrashMin"
                      name="totalCrashMin"
                      value={totalCrashMin}
                      placeholder='Min'
                      onChange={(e) => onChange(e, settotalCrashMin)}/> to
                    <input
                      className="ml-2" 
                      style={{width:'55px'}} 
                      type="number" 
                      id="totalCrashMax"
                      name="totalCrashMax"
                      value={totalCrashMax}
                      placeholder='Max'
                      onChange={(e) => onChange(e, settotalCrashMax)}/>
                    <br></br>
                    <div>Injury Crash</div>
                    <input
                      className="ml-2" 
                      style={{width:'55px'}}
                      type="number" 
                      id="injuryCrashMin"
                      name="injuryCrashMin"
                      value={injuryCrashMin}
                      placeholder='Min'
                      onChange={(e) => onChange(e, setinjuryCrashMin)}/> to
                    <input
                      className="ml-2" 
                      style={{width:'55px'}} 
                      type="number" 
                      id="injuryCrashMax"
                      name="injuryCrashMax"
                      value={injuryCrashMax}
                      placeholder='Max'
                      onChange={(e) => onChange(e, setinjuryCrashMax)}/>
                    <br></br>
                    <div>Fatal Crash</div>
                    <input
                      className="ml-2" 
                      style={{width:'55px'}}
                      type="number" 
                      id="fatalCrashMin"
                      name="fatalCrashMin"
                      value={fatalCrashMin}
                      placeholder='Min'
                      onChange={(e) => onChange(e, setfatalCrashMin)}/> to
                    <input
                      className="ml-2" 
                      style={{width:'55px'}} 
                      type="number" 
                      id="fatalCrashMax"
                      name="fatalCrashMax"
                      value={fatalCrashMax}
                      placeholder='Max'
                      onChange={(e) => onChange(e, setfatalCrashMax)}/>
                    <br></br>
                    <div>Towaway Crash</div>
                    <input
                      className="ml-2" 
                      style={{width:'55px'}}
                      type="number" 
                      id="towawayCrashMin"
                      name="towawayCrashMin"
                      value={towawayCrashMin}
                      placeholder='Min'
                      onChange={(e) => onChange(e, settowawayCrashMin)}/> to
                    <input
                      className="ml-2" 
                      style={{width:'55px'}} 
                      type="number" 
                      id="towawayCrashMax"
                      name="towawayCrashMax"
                      value={towawayCrashMax}
                      placeholder='Max'
                      onChange={(e) => onChange(e, settowawayCrashMax)}/>
                    <br></br>
                  </div>
                  <button type="submit" style={{'background':'#ff6600', 'color':'white'}} class="btn">Submit</button>
            </form>
          </div>
        </div>
      </div>


      <div
        className="bg-light m-3 d-flex align-items-center justify-content-center p-2"
        style={{ "background-color": "#f7f7f7", overflow:'hidden', height:'10vh'}}>
        <form className="row d-flex align-items-center justify-content-center p-2 m-1" onSubmit={e => onsubmit(e)} >
          <div className="col-sm-2 d-flex align-items-center justify-content-center"> Filter Companies:</div>
          <div className="col-sm-2 col-md-2">
            {/* <label for="legal_name" className="form-label">
              Legal Name
            </label> */}
            <input
              type="legal_name"
              className="form-control"
              id="legal_name"
              name="legal_name"
              value={legalName}
              placeholder='Legal Name'
              onChange={(e) => onChange(e, setLegalName)}
            />
          </div>
          <div className="col-sm-2">
            {/* <label for="name" className="form-label">
              Name
            </label> */}
            <input
              type="name"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder='Name'
              onChange={(e) => onChange(e, setName)}
            />
          </div>
          <div className="col-sm-2">
            {/* <label for="inputAddress" className="form-label">
              Dot
            </label> */}
            <input
              type="number"
              className="form-control"
              id="dot"
              value={dot}
              placeholder='DOT'
              onChange={(e) => onChange(e, setDot)}
            />
          </div>
          <div className="col-sm-2">
            {/* <label for="inputAddress" className="form-label">
              Dot
            </label> */}
            <input
              type="text"
              className="form-control"
              id="city"
              value={city}
              placeholder='City'
              onChange={(e) => onChange(e, setCity)}
            />
          </div>
          <div className="text-center col-sm-2">
            <button type="submit" style={{'background':'#ff6600', 'color':'white'}} class="btn">Submit</button>
        </div>
        </form>
      </div>



     {/* listing */}
      {isLoggedIn &&
      <div>
          <Paper sx={{ overflow: '', height:'50vh', flexDirection:"column", top:'300px'}} className="bg-light mr-3 mt-2 h-100 d-flex align-items-center justify-content-center">
            <TableContainer sx={{ maxHeight: '71vh'}} >
              <Table stickyHeader aria-label="sticky table" >
              {/* <Table sx={{ minWidth: 700 }} aria-label="customized table"> */}
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Id</StyledTableCell>
                    <StyledTableCell align="left">Legal Name</StyledTableCell>
                    <StyledTableCell align="right">Dot</StyledTableCell>
                    <StyledTableCell align="right">Email</StyledTableCell>
                    <StyledTableCell align="right">Phone</StyledTableCell>
                    <StyledTableCell align="right">City</StyledTableCell>
                    <StyledTableCell align="right">State</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align="left">{row.id}</StyledTableCell>
                      <StyledTableCell className='company_title' type='button' onClick={(e)=>detailPage(row.id)} component="th" scope="row">
                        {row.legal_name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.dot}</StyledTableCell>
                      <StyledTableCell align="right">{row.email}</StyledTableCell>
                      <StyledTableCell align="right">{row.phone}</StyledTableCell>
                      <StyledTableCell align="right">{row.city}</StyledTableCell>
                      <StyledTableCell align="right">{row.state}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              
              </Table>
              
            </TableContainer>
            <div className='pagination mr-4 mt-2'>
             <nav aria-label="Page navigation example" style={{alignItems:'left!important', border:'red'}}>
               <ul class="pagination">
                 <li class="page-item disabled"  className="mr-2">
                   <button style={{border:'1px solid #ff6600', color:'#ff6600'}} onClick={() =>setPrevCall(pre=>!pre)}>Previous</button>
                 </li>
                 <li class="page-item"  className="mr-2">
                   <button style={{border:'1px', color:'#ff6600'}} disabled onClick={() =>setNextCall(pre=>!pre)}>{currentPage}</button></li>
                   <li class="page-item"  className="mr-2"> <span style={{border:'1px', color:'#ff6600'}} className="mr-4">of</span> 
                   <button style={{border:'1px', color:'#ff6600'}} disabled onClick={() =>setNextCall(pre=>!pre)} className='ml-2'>{lastPage}</button></li>
                 <li class="page-item">
                   <button style={{border:'1px solid #ff6600', color:'#ff6600'}} onClick={() =>setNextCall(pre=>!pre)}>Next</button>
                 </li>
               </ul>
             </nav>
         </div>
          </Paper>
      </div>
      }
  </div>
  );
}
