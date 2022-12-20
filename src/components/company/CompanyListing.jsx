import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { useMemo } from "react";
import axios from "axios";
import { getCompanyService } from "../../service/CompanyService/Company";
import { authHeader } from "../../service/auth-headers";
import { useLocation } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createNextState } from "@reduxjs/toolkit";
import { tab } from "@testing-library/user-event/dist/tab";


export default function CompanyListing() {
  const [table, setTable] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [legalName, setLegalName] = useState("");
  const [name, setName] = useState("");
  const [dot, setDot] = useState("");
  const [city, setCity] = useState("");
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  // console.log(JSON.stringify(user.access))
  // const isLoggedIn = JSON.stringify(user.data)

  const base_url = 'http://127.0.0.1:8000/api/company/'

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
      const res = await getCompanyService();
      let temp = flatData(res.data.results)
      setTable(temp);
      if(res?.data?.next){
        setNext(res.data.next)
      }
      if(res?.data?.previous){
        setPrevious(res.data.previous)
      }
      console.log('first next: ', next, 'f',res.data.next)
    })();
  }, []);
  console.log('firsttt page: ', next)


  const handleChangePage = async () => {
    console.log('going to the page: ', next)
    const res = await axios.get(next, {headers: authHeader});
    console.log('res.data: ',res.data)
    if(res?.data?.next){
      setNext(res.data.next)
    }
    if(res?.data?.previous){
      setNext(res.data.previous)
    }
    let temp = flatData(res.data.results)
    setTable(temp);
  }
  console.log('next page out: ', next)
  

  // destructing company data for the table
  const flatData = (companies) => {
    let localCompanyList = [];
    // let count = 1;
    for(let company of companies){
      let tempCompany = {};
      // console.log(`first company ${company.legal_name}`)
      
      tempCompany.id = company.id;
      tempCompany.legal_name = company.legal_name;
      tempCompany.dot = company.dot;
      
      for(let address of company.addresses){
        // console.log('address: ',address)
        tempCompany.city = address.city;
        tempCompany.state = address.state;
        tempCompany.zip = address.zip;
      }
      localCompanyList.push(tempCompany);
      // break;
    }
    // console.log('localCompanyList: ', localCompanyList)
    return localCompanyList;
  }

  const onChange = (e, field) => {
    const value = e.target.value;
    field(value);
  };

  const filterlist = () => {
      return axios.get(`http://127.0.0.1:8000/api/company/companies?legal_name=${legalName}&name=${name}&dot=${dot}&city=${city}`,  {headers: authHeader()})
  }

  async function onsubmit(e){
    e.preventDefault();
    console.log('InsideCOmpany submit');
    await filterlist(legalName, name, dot).
    then((response)=>{
      setTable(response.data)
    })
  }
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'legal_name', headerName: 'Legal Name', width: 400 },
    { field: 'dot', headerName: 'DOT', width: 100 },
    { field: 'city', headerName: 'CITY', width: 100 },
    { field: 'state', headerName: 'STATE', width: 100 },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  return (
    <>


    <div
      className="bg-light m-4 h-100 d-flex align-items-center justify-content-center p-2"
      style={{ "background-color": "#f7f7f7" }}
    >
      <form className="row d-flex align-items-center justify-content-center p-2" onSubmit={e => onsubmit(e)} >
        <div className="col-sm-2 h-100 d-flex align-items-center justify-content-center"> Filter Companies:</div>
        <div className="col-sm-2">
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
            placeholder="ex. 12345"
            value={dot}
            // placeholder='DOT'
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
            placeholder="ex. 12345"
            value={city}
            // placeholder='City'
            onChange={(e) => onChange(e, setCity)}
          />
        </div>
        <div className="text-center col-sm-2">
          <button type="submit" style={{'background':'#ff6600', 'color':'white'}} class="btn">Submit</button>
      </div>
      </form>
    </div>

          {isLoggedIn && 

            // <div style={{display: 'flex'}}>
            //   <div style={{ height: '80vh', background: '#f7f7f7', flexGrow:1}} className='m-4 mt-1'>
            //     <DataGrid
            //       rows={localTable}
            //       columns={columns}
            //     />
            //   </div>
            // </div>

            <div className='m-4'>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className='font-weight-bold'>DOT</TableCell>
                      <TableCell className='font-weight-bold'>Legal Name</TableCell>
                      <TableCell className='font-weight-bold'>City</TableCell>
                      <TableCell className='font-weight-bold'>State</TableCell>

                      {/* <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {table.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >

                        <TableCell>{row.dot}</TableCell>
                        <TableCell>{row.legal_name}</TableCell>
                        <TableCell>{row.city}</TableCell>
                        <TableCell>{row.state}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

          }
      
    </>
  );
}
