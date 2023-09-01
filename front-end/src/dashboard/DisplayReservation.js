import React from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useHistory } from "react-router-dom";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function DisplayReservations({ reservation }) {
  const { reservation_id } = useParams();
  const history = useHistory();

  function handleCancel(reservation_id) {
    async function cancelReservation(reservation_id) {
      const abortController = new AbortController();
      const signal = abortController.signal;
      try {
        const response = await axios.put(
          `${API_BASE_URL}/reservations/${reservation_id}/status`,
          { data: { status: "cancelled" } },
          { signal }
        );
        console.log({ response });
        // this is a hack to force a reload of the dashboard
        history.push({
          pathname: `/dashboard`,
          state: { shouldReload: true },
        });
      } catch (error) {
        console.log(error, "error cancelling reservation");
      }
    }

    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      cancelReservation(reservation_id);
    }
  }

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {reservation.first_name} {reservation.last_name}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Mobile Number: {reservation.mobile_number}
          </h6>
          <p className="card-text">Date: {reservation.reservation_date}</p>
          <p className="card-text">Time: {reservation.reservation_time}</p>
          <p className="card-text">Party Size: {reservation.people}</p>
          <p
            className="card-text"
            data-reservation-id-status={reservation.reservation_id}
          >
            Status: {reservation.status}
          </p>
          <p className="card-text">
            Reservation ID: {reservation.reservation_id}
          </p>
          {reservation_id || reservation.status === "seated" ? null : (
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
              <button className="btn btn-primary">Seat</button>
            </Link>
          )}
          <a href={`/reservations/${reservation.reservation_id}/edit`}>
            <button className="btn btn-primary">Edit</button>
          </a>
          <button
            data-reservation-id-cancel={reservation.reservation_id}
            className="btn btn-danger"
            onClick={() => handleCancel(reservation.reservation_id)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default DisplayReservations;
