import React, { useState } from "react";
// import axios from "axios";
import { listReservations } from "../utils/api";
import ReservationsComponent from "../dashboard/ReservationsComponent";
// import ErrorAlert from "../layout/ErrorAlert";
// require("dotenv").config();

// const API_BASE_URL =
//   process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function Search() {
  const [searched, setSearched] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSearched(true)
    const abortController = new AbortController();
    listReservations( formData, abortController.signal )
    .then((response)=>setReservations(response))
    .catch((error)=>console.log(error));
    return () => abortController.abort()
  };

  return (
    <div>
    <form className="mt-2" name="search_for_number"
    onSubmit={handleSubmit}
    >
    <label>
      <h2>Search by Mobile Number</h2>
    </label>
    <div className="row">
      <div className="col-lg-8 col-sm-6 col-xs-8">
      <input onChange={handleChange} 
      type="search" 
      name="mobile_number" 
      className="form-control"
      placeholder="Enter a customer's phone number" 
      required />
      </div>
      <div className="col-lg-4 col-sm-6 col-xs-4 mt-1">
    <button type="submit" className="btn btn-primary">
      Find
    </button>
    </div>
    </div>
    </form>
    <div className="mt-4">
    {reservations.length !== 0 ? <ReservationsComponent reservations={reservations}/> : null}  
    {searched === true && reservations.length === 0 ? `No reservations found with this phone number` : null}
    </div>
    </div>
  )
}

export default Search;
