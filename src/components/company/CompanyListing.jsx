import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
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
      setData(result.data);
    })();
  }, []);



  const COLUMNS = [
    {
      Header: "Legal Name",
      accessor: "legal_name",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "DOT",
      accessor: "dot",
    },
    {
      Header: "MC Number",
      accessor: "motor_carrier_number",
    },
    {
      Header: "Incorporation date",
      accessor: "incorporation_date",
    },
    {
      Header: "Active",
      accessor: "is_active",
    },
    {
      Header: "City",
      accessor: "address.city",
    },
  ];
  // THis code is very important if removed table will disappear
  const columns = useMemo(() => COLUMNS, []);
  const Data = useMemo(() => data, [data]);

  console.log(data);
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  });


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
      setData(response.data)
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
            placeholder="ex. 12345"
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
            placeholder="ex. 12345"
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
      {isLoggedIn?
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
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    :'asdf'}
    </>
  );
}
