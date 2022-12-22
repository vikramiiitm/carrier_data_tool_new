import React, { useEffect, useState } from "react";
import { usePagination, useTable } from "react-table";
import { useMemo } from "react";
import axios from "axios";
import { getCompanyService } from "../../service/CompanyService/Company";
import { authHeader } from "../../service/auth-headers";
import { useLocation } from "react-router-dom";

import NavbarSide from "../NavbarSide";


import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
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
      }
      else {
          setIsLoggedIn(true)
      }
  },[])

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await getCompanyService();
      let temp = flatData(result.data.results);
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

  const COLUMNS = [
    {
      label: "Legal Name",
      id: "legal_name",
    },
    {
      label: "Name",
      id: "dba",
    },
    {
      label: "DOT",
      id: "dot",
    },
    {
      label: "City",
      id: "city",
    },
    {
      label: "State",
      id: "state",
    },
  
    // {
    //   Header: "MC Number",
    //   accessor: "motor_carrier_number",
    // },
    // {
    //   Header: "Incorporation date",
    //   accessor: "incorporation_date",
    // },
    // {
    //   Header: "Active",
    //   accessor: "is_active",
    // },

  ];
  // THis code is very important if removed table will disappear
  const columns = useMemo(() => COLUMNS, []);
  // console.log(data);


  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      rows,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
      }
    )
  

  const onChange = (e, field) => {
    const value = e.target.value;
    field(value);
  };

  const filterlist = () => {
      return axios.get(`http://127.0.0.1:8000/api/company/companies?legal_name=${legalName}&dba=${name}&dot=${dot}&city=${city}`,  {headers: authHeader()})
  }


// we created a state called callNext, when we need to change page we change the state of callpage, and give this as a dependency to useEffect
  useEffect(()=>{
    console.log("change the page")
    console.log('test next: ', next)
    const paginationHandler = async () => {
      if (next!==undefined){
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
        console.log('response; ', response)
      }
    }
    paginationHandler()
  },[callPrev])


  


//  console.log("ankit kumar",data)

  async function onsubmit(e){
    e.preventDefault();
    console.log('InsideCOmpany submit');
    await filterlist(legalName, name, dot)
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
    })
  }

  return (
    <div>
      <div style={{width:'20%', float:'left', height:'100vh'}} >
        <NavbarSide/>
      </div>
      <div
        className="bg-light m-4 d-flex align-items-center justify-content-center p-2"
        style={{ "background-color": "#f7f7f7", overflow:'hidden'}}
      >
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
          <Paper sx={{ overflow: 'scroll', height:'50vh', flexDirection:"column", top:'300px'}} className="bg-light m-4 h-100 d-flex align-items-center justify-content-center">
            <TableContainer sx={{ maxHeight: '70vh'}} >
              <Table stickyHeader aria-label="sticky table" >
                  <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                  </TableHead>
                <TableBody>
                  {data
                    .slice()
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
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
