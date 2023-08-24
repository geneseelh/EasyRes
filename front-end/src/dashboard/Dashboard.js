import React, { useEffect, useState } from "react";
import { listReservations, cancelReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";
import { next, previous, today } from "../utils/date-time";
import ReservationsList from "./ReservationList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    // console.log(date);
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function onCancel(reservation_id) {
    const abortController = new AbortController();
    cancelReservation(reservation_id, abortController.signal)
      .then(loadDashboard)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {/* {info} */}

      <div className="btn-group" role="group" aria-label="navigation buttons">
        <Link
          className="btn btn-secondary mr-1"
          to={`/dashboard?date=${previous(date)}`}
        >
          <span className="oi oi-chevron-left" />
          &nbsp;Previous
        </Link>
        <Link
          className="btn btn-secondary mr-1"
          to={`/dashboard?date=${today()}`}
        >
          Today
        </Link>
        <Link
          className="btn btn-secondary"
          to={`/dashboard?date=${next(date)}`}
        >
          Next&nbsp;
          <span className="oi oi-chevron-right" />
        </Link>
      </div>
      {/* {JSON.stringify(reservations)} */}
      <ReservationsList onCancel={onCancel} reservations={reservations} />
    </main>
  );
}

export default Dashboard;
