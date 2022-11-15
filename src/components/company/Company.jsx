import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Company() {
  const [legalName, setLegalName] = useState("");
  const [name, setName] = useState("");
  const [dot, setDot] = useState("");
  const [address, setAddress] = useState("");

  const onChange = (e, field) => {
    const value = e.target.value;
    field(value);
  };

  return (
    <div
      className="container mt-5 p-4"
      style={{ "background-color": "#f7f7f7" }}
    >
      <form className="row g-1">
        <div className="col-md-6">
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
        <div className="col-md-6">
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
        <div className="col-12">
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
        <div className="col-12">
          <label for="inputAddress2" className="form-label">
            Address 2
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div className="col-md-6">
          <label for="inputCity" className="form-label">
            City
          </label>
          <input type="text" className="form-control" id="inputCity" />
        </div>
        <div className="col-md-4">
          <label for="inputState" className="form-label">
            State
          </label>
          <select id="inputState" className="form-select">
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-md-2">
          <label for="inputZip" className="form-label">
            Zip
          </label>
          <input type="text" className="form-control" id="inputZip" />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" for="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <div className="col-12 text-center">
          <button
            type="submit"
            className="btn"
            style={{ background: "#ff6600", color: "white" }}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
