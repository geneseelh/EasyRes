import React, { useEffect, useState } from "react";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import ErrorAlert from "../layout/ErrorAlert";
// import DisplayReservations from "../dashboard/DisplayReservation";
import ReservationForm from "./ReservationForm";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function EditReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);
  const [reservation, setReservation] = useState({});
  const [initialFormData, setInitialFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function loadReservation() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/reservations/${reservation_id}`,
          { signal }
        );
        if (response.data.data.status === "seated") {
          setReservationsError({
            message: "Cannot edit a reservation that is seated.",
          });
          return;
        }
        if (response.data.data.status === "finished") {
          setReservationsError({
            message: "Cannot edit a reservation that is finished.",
          });
          return;
        }

        setReservation(response.data.data);
        setInitialFormData({
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          mobile_number: response.data.data.mobile_number,
          reservation_date: response.data.data.reservation_date.substring(
            0,
            10
          ),
          reservation_time: response.data.data.reservation_time,
          people: response.data.data.people,
        });
        setIsLoaded(true);
      } catch (error) {
        console.log(error, "error loading reservation");
      }
    }
    loadReservation();
    return () => abortController.abort();
  }, [reservation_id]);

  function handleSubmitEdit(updatedReservation) {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const { reservation_id } = updatedReservation;

    updatedReservation.people = Number(updatedReservation.people);

    // console.log(updatedReservation);
    async function editReservation(updatedReservation) {
      try {
        await axios.put(
          `${API_BASE_URL}/reservations/${reservation_id}`,
          { data: updatedReservation },
          { signal }
        );
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      } catch (error) {
        console.log(error, "error editing reservation");
      }
    }
    editReservation(updatedReservation);
    return () => abortController.abort();
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h1>Edit Reservation</h1>
      <h2>Reservation ID: {reservation_id}</h2>
      {/* <DisplayReservations reservation={reservation} /> */}
      {isLoaded ? (
        <ReservationForm
          initialFormData={initialFormData}
          submitHandler={handleSubmitEdit}
          cancelHandler={handleCancel}
        />
      ) : (
        <h1>Loading...</h1>
      )}
      <ErrorAlert error={reservationsError} />
    </div>
  );
}

export default EditReservation;
