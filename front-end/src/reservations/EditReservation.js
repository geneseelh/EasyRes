import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function EditReservation() {
  const { reservation_id } = useParams();
  return (
    <div>
      <h1>Edit Reservation</h1>
      <h2>Reservation ID: {reservation_id}</h2>
    </div>
  );
}

export default EditReservation;
