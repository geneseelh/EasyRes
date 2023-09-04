import React from "react";

import { updateResStatus } from "../utils/api"


export default function ReservationsComponent({ reservations, loadDashboard }) {

  function handleCancel(e, reservation) {
    e.preventDefault();
    if(window.confirm("Do you want to cancel this reservation? This cannot be undone.")){
      updateResStatus(reservation.reservation_id)
      .then(() => loadDashboard())
    }
  }

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
