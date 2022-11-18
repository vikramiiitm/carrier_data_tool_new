import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createCompanyService } from "../../service/CompanyService/Company";


export default function Company() {
  const [legalName, setLegalName] = useState("");
  const [name, setName] = useState("");
  const [dot, setDot] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZip_Code] = useState("");
  const [country, setCountry] = useState("");

  const onChange = (e, field) => {
    const value = e.target.value;
    field(value);
  };
  const onsubmit = (e) => {
    e.preventDefault();
    console.log('InsideCOmpany submit');
    const data = {
      'legal_name':legalName,
      'name':name,
      'dot':dot,
      'address':{
        'city':city,
        'state':state,
        'zip_code':zip_code,
        'country':country
      }
    };
    setCity('')
    setCountry('')
    setDot('')
    setLegalName('')
    setState('')
    setZip_Code('')
    setName('')
    createCompanyService(data)
  }
  return (
    <div
      className="container mt-4 p-4"
      style={{ "background-color": "#f7f7f7" }}
    >
      <form className="row" onSubmit={e => onsubmit(e)} >
        <div className="col-sm-12">
          <label for="legal_name" className="form-label">
            Legal Name
          </label>
          <input
            type="legal_name"
            className="form-control"
            id="legal_name"
            name="legal_name"
            value={legalName}
            onChange={(e) => onChange(e, setLegalName)}
          />
        </div>
        <div className="col-sm-12">
          <label for="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={(e) => onChange(e, setName)}
          />
        </div>
        <div className="col-sm-12">
          <label for="inputAddress" className="form-label">
            Dot
          </label>
          <input
            type="number"
            className="form-control"
            id="dot"
            placeholder="ex. 12345"
            value={dot}
            onChange={(e) => onChange(e, setDot)}
          />
        </div>
        <div className="col-sm-12">
          <label for="inputAddress2" className="form-label">
            city
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="Apartment, studio, or floor"
            value={city}
            onChange={(e) => onChange(e, setCity)}
          />
        </div>
        <div className="col-sm-12">
          <label for="inputCity" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            value={state}
            onChange={(e) => onChange(e, setState)}
          />
        </div>
        <div className="col-sm-12">
          <label for="inputCity" className="form-label">
            Zip Code
          </label>
          <input
            type="text"
            className="form-control"
            id="zipcode"
            value={zip_code}
            onChange={(e) => onChange(e, setZip_Code)}
          />
        </div>
        <div className="col-sm-12">
          <label for="inputCity" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            value={country}
            onChange={(e) => onChange(e, setCountry)}
          />
        </div>
        <span className="text-center">
          <button type="submit" style={{'background':'#ff6600', 'color':'white'}} class="btn mt-4">Submit</button>
      </span>
      </form>
    </div>
  );
}
