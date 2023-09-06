import React, { useEffect, useState } from "react";
import { listReservations, listTables, updateResId } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsComponent from "./ReservationsComponent";
import ListTables from "../tables/ListTables";
import useQuery from "../utils/useQuery";
import { today, next, previous } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import moment from "moment"; // styling for the date
require("dotenv").config();

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard() {
  const query = useQuery();
  const date = query.get("date") || today();
  const [reservations, setReservations] = useState([]);
  const [reservationDate, setReservationDate] = useState(date);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);

  const history = useHistory();

  useEffect(loadDashboard, [reservationDate]);
  function loadDashboard() {
    console.log("LOAD DASHBOARD");
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: reservationDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables().then(setTables);
    return () => abortController.abort();
  }

  // useEffect(loadTables, []);
  // function loadTables() {
  //   const abortController = new AbortController();
  //   listTables(abortController.signal).then(setTables);
  //   console.log("dash tables", tables)
  //   return () => abortController.abort();
  // }

  function onFinish(table_id, reservation_id) {
    const abortController = new AbortController();
    if (
      window.confirm("Is this table ready to seat new guests?") === true
    ) {
      updateResId(table_id, reservation_id).then(() => loadDashboard());
    }
  }

  //  function clickHandler(event) {
  //   let tableId = event.target.value;
  //   tableId = Number(tableId);
  //   if (window.confirm("Is this table ready to seat new guests?") === true) {
  //     updateResId(tableId)
  //       .then(() => loadTables())
  //       .then(() => loadDashboard())
  //       .catch((error) => console.log("error", error));
  //   }
  // }

  return (
    <main>
      <h2>Dashboard</h2>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">
          Reservations for {moment(date).format("ddd MMMM Do, YYYY")}
        </h4>
      </div>
      <button
        className="btn btn-secondary"
        onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
      >
        Previous
      </button>
      <button
        className="btn btn-primary ml-1"
        onClick={() => history.push(`/dashboard?date=${today()}`)}
      >
        Today
      </button>
      <button
        className="btn btn-warning ml-1"
        onClick={() => history.push(`/dashboard?date=${next(date)}`)}
      >
        Next
      </button>
      <div>
        {reservations.length !== 0 ? (
          <ReservationsComponent
            reservations={reservations}
            loadDashboard={loadDashboard}
          />
        ) : (
          `There are no reservations today`
        )}
      </div>
      <h4 className="mt-4">Tables</h4>
      <ListTables
        tables={tables}
        finishHandler={onFinish}
        // loadTables={loadTables}
        // loadDashboard={loadDashboard}
      />
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
