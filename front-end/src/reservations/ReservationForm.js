import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import ErrorAlert from "../layout/ErrorAlert";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function ReservationForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const history = useHistory();
  const [error, setError] = useState(null);

  // CHANGE HANDLER
  function handleInputChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  // CANCEL BUTTON HANDLER
  function cancelHandler() {
    history.goBack();
  }

  // SUBMIT BUTTON HANDLER
  function submitHandler(event) {
    event.preventDefault();
    if (formData.people < 1) {
      alert("Please enter at least 1 person.");
    } else {
      const abortController = new AbortController();
      try {
        axios.post(`${API_BASE_URL}/reservations`, {
          data: formData,
        });
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      }
      return () => abortController.abort();
    }
  }

  return (
    <div>
      <h2>New Reservation</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            onChange={handleInputChange}
            id="first_name"
            type="text"
            name="first_name"
            className="form-control"
            value={formData.first_name}
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            onChange={handleInputChange}
            id="last_name"
            type="text"
            name="last_name"
            className="form-control"
            value={formData.last_name}
            placeholder="Last Name"
            required
          />
        </div>
        <div>
          <label htmlFor="mobile_number">Mobile Number:</label>
          <input
            onChange={handleInputChange}
            id="mobile_number"
            type="tel"
            name="mobile_number"
            className="form-control"
            value={formData.mobile_number}
            placeholder="Mobile Number"
            required
          />
        </div>
        <div>
          <label htmlFor="reservation_date">Date of Reservation:</label>
          <input
            onChange={handleInputChange}
            id="reservation_date"
            type="date"
            name="reservation_date"
            className="form-control"
            value={formData.reservation_date}
            required
          />
        </div>
        <div>
          <label htmlFor="reservation_time" className="form-label">
            Time of Reservation:
          </label>
          <input
            onChange={handleInputChange}
            id="reservation_time"
            type="time"
            name="reservation_time"
            className="form-control"
            value={formData.reservation_time}
            required
          />
        </div>
        <div>
          <label htmlFor="people" className="form-label">
            Party Size:
          </label>
          <input
            onChange={handleInputChange}
            id="people"
            type="number"
            name="people"
            className="form-control"
            value={formData.people}
            placeholder="Party Size"
            min="1"
            required
          />
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <ErrorAlert error={error} />
    </div>
  );
}

export default ReservationForm;
