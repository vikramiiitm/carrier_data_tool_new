import React, { useEffect, useState } from "react";
import { usePagination, useTable } from "react-table";
import { useMemo } from "react";
import axios from "axios";
import { getCompanyService } from "../../service/CompanyService/Company";
import { authHeader } from "../../service/auth-headers";
import { useLocation } from "react-router-dom";

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
      Header: "Legal Name",
      accessor: "legal_name",
    },
    {
      Header: "Name",
      accessor: "dba",
    },
    {
      Header: "DOT",
      accessor: "dot",
    },
    {
      Header: "City",
      accessor: "city",
    },
    {
      Header: "State",
      accessor: "state",
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
      <div className="bg-light m-4 h-100 d-flex align-items-center justify-content-center">
        <br />
        <table {...getTableProps()} className="table m-3">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} style={{ color: "#ff6600" }}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} >{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
              <div style={{alignItems:'left!important'}} className='pagination m-1'>
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
        </table>
      </div>
      }
    </>
  );
}
