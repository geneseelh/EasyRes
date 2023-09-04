import React, { useState } from "react";
import axios from "axios";
import ReservationsComponent from "../dashboard/ReservationsComponent";
import ErrorAlert from "../layout/ErrorAlert";
require("dotenv").config();

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function Search() {
  const [formData, setFormData] = useState({});
  const [reservations, setReservations] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    async function search() {
      const abortController = new AbortController();
      const signal = abortController.signal;
      try {
        const response = await axios.get(
          `${API_BASE_URL}/reservations?mobile_number=${formData.mobile_number}`,
          { signal }
        );
        setReservations(response.data.data);
        setSearched(!searched);
      } catch (error) {
        setError(error.response.data.error);
        console.log(error, "error loading tables");
      }
    }
    search();
  }

  return (
    <div className="search">
      <h1>Search</h1>
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control mr-sm-2"
          name="mobile_number"
          type="tel"
          placeholder="Enter a customer's phone number"
          aria-label="Search"
          onChange={handleChange}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Find
        </button>
      </form>
      <div className="reservations">
        {reservations.length
          ? reservations.map((reservation) => (
              <ReservationsComponent
                key={reservation.reservation_id}
                reservation={reservation}
              />
            ))
          : null}
        {searched && !reservations.length ? <p>No reservations found</p> : null}
      </div>
      <ErrorAlert error={error} />
    </div>
  );
}

export default Search;
