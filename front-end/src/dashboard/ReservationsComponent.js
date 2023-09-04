import React from "react";
// import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import ErrorAlert from "../layout/ErrorAlert";
// require("dotenv").config();

import { updateResStatus } from "../utils/api"

// const API_BASE_URL =
//   process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

export default function ReservationsComponent({ reservations, loadDashboard }) {
  // const { reservation_id } = useParams();
  // const history = useHistory();
  // const [error, setError] = React.useState(null);

  function handleCancel(e, reservation) {
    e.preventDefault();
    if(window.confirm("Do you want to cancel this reservation? This cannot be undone.")){
      updateResStatus(reservation.reservation_id)
      .then(() => loadDashboard())
    }
  }

  // callback function for each cancel button on each reservation
  // takes in the reservation_id pulled from the reservation object
  // function handleCancel(reservation_id) {
  //   async function cancelReservation(reservation_id) {
  //     const abortController = new AbortController();
  //     const signal = abortController.signal;
  //     try {
  //       // originally assigned to a variable named response
  //       await axios.put(
  //         `${API_BASE_URL}/reservations/${reservation_id}/status`,
  //         { data: { status: "cancelled" } },
  //         { signal }
  //       );
  //       // this is a hack to force a reload of the dashboard
  //       history.push({
  //         pathname: `/dashboard`,
  //         state: { shouldReload: true },
  //       });
  //     } catch (error) {
  //       setError(error.response.data.error);
  //       console.log(error, "error cancelling reservation");
  //     }
  //   }

  //   if (
  //     window.confirm(
  //       "Do you want to cancel this reservation? This cannot be undone."
  //     )
  //   ) {
  //     cancelReservation(reservation_id);
  //   }
  // }

  let reservationsList = reservations.map((reservation) => {
    return (
        <div className="card mt-1" key={reservation.reservation_id}>
          <div className="card-body">
          <h5 className="card-title">
           Name: {reservation.first_name} {reservation.last_name}
          </h5> 
           <p className="card-text">Mobile number: {reservation.mobile_number}</p>
           <p className="card-text">Date of reservation: {reservation.reservation_date}</p>
           <p className="card-text">Time of reservation: {reservation.reservation_time}</p>
           <p className="card-text">Party Size: {reservation.people} </p>
           <p className="card-text">Reservation ID: {reservation.reservation_id}</p>
           <p className="card-text" data-reservation-id-status={reservation.reservation_id}>Reservation Status: {reservation.status}</p>
           
           { reservation.status!=='seated' ? 
           <a href={`/reservations/${reservation.reservation_id}/seat`}>
           <button className="btn btn-primary w-25 mb-1 ml-1" type="button">Seat</button></a> : null }

           <a href={`/reservations/${reservation.reservation_id}/edit`}>
          <button className="btn btn-secondary w-25 mb-1 ml-1" type="button">Edit</button>
          </a>

         {reservation.status !== "cancelled" &&  <button type="button" className="btn btn-danger w-25 mb-1 ml-1" data-reservation-id-cancel={reservation.reservation_id} 
          onClick={(e)=>handleCancel(e, reservation)}>Cancel</button> }
          </div>
        </div>
    )
})

return <div>{reservationsList}</div>
}
// export default ReservationsComponent;
