import { Link } from "react-router-dom";
import React from "react";

function ReservationButtons({ status, reservation_id, onCancel }) {
  function cancelHandler({
    target: { dataset: { reservationIdCancel } } = {},
  }) {
    if (
      reservationIdCancel &&
      window.confirm(
        "Do you want to cancel this reservation?\n\nThis cannot be undone."
      )
    ) {
      onCancel(reservationIdCancel);
    }
  }

  //   if (status === "booked") {
  return (
    <>
      <td>
        <Link
          className="btn btn-secondary"
          to={`/reservations/${reservation_id}/seat`}
        >
          Seat
        </Link>
      </td>
      <td>
        <Link
          className="btn btn-secondary"
          to={`/reservations/${reservation_id}/edit`}
        >
          Edit
        </Link>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-secondary mr-2 cancel"
          data-reservation-id-cancel={reservation_id}
          onClick={cancelHandler}
        >
          Cancel
        </button>
      </td>
    </>
  );
  //   }
  //   return (
  //     <>
  //       <td />
  //       <td />
  //       <td />
  //     </>
  //   );
}

export default ReservationButtons;
