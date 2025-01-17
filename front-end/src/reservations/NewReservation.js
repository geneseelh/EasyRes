import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createRes } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
require("dotenv").config();

function NewReservation() {
  const history = useHistory();
  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);
  const [errorTuesday, setErrorTuesday] = useState(false);
  const [errorPastDate, setErrorPastDate] = useState(false);
  const [errorTime, setErrorTime] = useState(false);

  function handleChange(target) {
    const updatedFormData = {
      ...formData,
      [target.name]: target.value,
    };

    const inputDateParts = updatedFormData.reservation_date.match(
      /^(\d{4})-(\d{2})-(\d{2})$/
    );
    if (inputDateParts) {
      const parsedDate = new Date(
        `${inputDateParts[2]}-${inputDateParts[3]}-${inputDateParts[1]}`
      );
      const currentDate = new Date();

      setErrorTuesday(parsedDate.getDay() === 2);

      if (parsedDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
        setErrorPastDate(true);
      } else {
        setErrorPastDate(false);
      }
    }

    if (target.name === "reservation_time") {
      setErrorTime(false);
      const inputTimeParts = target.value.match(/^(\d{2}):(\d{2})$/);
      if (inputTimeParts) {
        const parsedTime = new Date(
          `01/01/2007 ${inputTimeParts[1]}:${inputTimeParts[2]}:00`
        );
        const openingTime = new Date("01/01/2007 10:30:00");
        const closingTime = new Date("01/01/2007 21:30:00");
        if (parsedTime < openingTime) {
          setErrorTime(true);
        }
        if (parsedTime > closingTime) {
          setErrorTime(true);
        }
      }
    }
    setFormData(updatedFormData);
  }

  const handleCancel = () => {
    history.goBack();
  };

  function handleSubmit(event) {
    const newErrors = [];

    if (errorTuesday) {
      newErrors.push("Closed on Tuesdays, please select a different day.");
    }
    if (errorPastDate) {
      newErrors.push("Please select a future date.");
    }
    if (errorTime) {
      newErrors.push("Please select a time between 10:30 AM and 9:30 PM.");
    }
    if (formData.people < 1) {
      newErrors.push("Please enter a number of people.");
    }
    if (errorTuesday || errorPastDate || errorTime || formData.people < 1) {
      setError({ message: newErrors });
      return;
    } else {
      const abortController = new AbortController();
      formData.people = Number(formData.people);
      setError(null);
      createRes(formData)
        .then(() => {
          history.push(`/dashboard?date=${formData.reservation_date}`);
        })
        .catch((err) => {
          setError(err);
        });
      return () => abortController.abort();
    }
  }

  return (
    <div>
      <h1>New Reservation</h1>
      <ReservationForm
        initialFormData={formData}
        submitHandler={handleSubmit}
        cancelHandler={handleCancel}
        changeHandler={handleChange}
      />
      <ErrorAlert error={error} />
    </div>
  );
}

export default NewReservation;
