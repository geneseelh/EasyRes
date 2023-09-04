import React, { useEffect, useState } from "react";
import {
  useParams,
  useHistory,
} from "react-router";
import axios from "axios";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
require("dotenv").config();

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

  // loads reservation on mount and when the reservation_id changes
  // should not be able to modify reservation and change reservation-id without going back to dashboard
  // also checks if reservation is seated or finished
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
        // this reformats form data to match the format of the reservation form including clipping the extra time data from the reservation_time
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
        setReservationsError(error.response.data.error);
        console.log(error, "error loading reservation");
      }
    }
    loadReservation();
    return () => abortController.abort();
  }, [reservation_id]);

  // handles the submit of the edit reservation form
  function handleSubmitEdit(updatedReservation) {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const { reservation_id } = updatedReservation;

    updatedReservation.people = Number(updatedReservation.people);

    async function editReservation(updatedReservation) {
      try {
        await axios.put(
          `${API_BASE_URL}/reservations/${reservation_id}`,
          { data: updatedReservation },
          { signal }
        );
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      } catch (error) {
        setReservationsError(error.response.data.error);
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
