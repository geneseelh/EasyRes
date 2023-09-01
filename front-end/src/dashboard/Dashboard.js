import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import { today, next, previous } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import DisplayReservations from "./DisplayReservation";
import DisplayTable from "./DisplayTable";
import axios from "axios";
require("dotenv").config();

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function Dashboard() {
  const query = useQuery();
  const thisDate = query.get("date") || today();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  const location = useLocation();

  // loads the reservations on mount and when the date changes
  useEffect(loadDashboard, [thisDate]);

  //loads the reservations
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date: thisDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  // loads the tables
  useEffect(() => {
    async function loadTables() {
      const abortController = new AbortController();
      const signal = abortController.signal;
      try {
        const response = await axios.get(`${API_BASE_URL}/tables`, { signal });
        setTables(response.data.data);
      } catch (error) {
        setReservationsError(error.response.data.error);
        console.log(error, "error loading tables");
      }
    }
    loadTables();
  }, []);

  //this should only run when the location.state.shouldReload is true
  useEffect(() => {
    if (location.state && location.state.shouldReload) {
      async function loadTables() {
        const abortController = new AbortController();
        const signal = abortController.signal;
        try {
          const response = await axios.get(`${API_BASE_URL}/tables`, {
            signal,
          });
          setTables(response.data.data);
        } catch (error) {
          setReservationsError(error.response.data.error);
          console.log(error, "error loading tables");
        }
      }
      loadTables();
      loadDashboard();
      location.state.shouldReload = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  // handles moving to the next day
  function handleNext() {
    const nextDate = next(thisDate);
    history.push(`/dashboard?date=${nextDate}`);
  }

  // handles moving to the previous day
  function handlePrevious() {
    const previousDate = previous(thisDate);
    history.push(`/dashboard?date=${previousDate}`);
  }

  function handleToday() {
    history.push(`/dashboard?date=${today()}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {thisDate} </h4>
      </div>
      <div className="d-md-flex mb-3">
        <button className="btn btn-secondary mr-1" onClick={handlePrevious}>
          Previous
        </button>
        <button className="btn btn-secondary mr-1" onClick={handleNext}>
          Next
        </button>
        <button className="btn btn-secondary mr-1" onClick={handleToday}>
          Today
        </button>
      </div>
      <div className="d-md-flex mb-3">
        {reservations.map((reservation) => (
          <DisplayReservations
            key={reservation.reservation_id}
            reservation={reservation}
          />
        ))}
      </div>
      <br />
      <div className="d-md-flex mb-3">
        {tables.map((table) => (
          <DisplayTable key={table.table_id} table={table} />
        ))}
      </div>
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}
export default Dashboard;
