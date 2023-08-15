import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ReservationForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    reservationDateTime: "",
    partySize: "",
  });

  function handleInputChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { reservationDate } = formData;
    history.push(`/dashboard?date=${reservationDate}`);
  }

  function handleCancel() {
    history.push("/");
  }

  return (
    <div>
      <h2>New Reservation</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <label htmlFor="form-first-name">First Name</label>
            <input
              onChange={handleInputChange}
              id="form-first-name"
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <label htmlFor="form-last-name">Last Name</label>
            <input
              onChange={handleInputChange}
              id="form-last-name"
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            <label htmlFor="form-mobile-number">Mobile Number</label>
            <input
              onChange={handleInputChange}
              id="form-mobile-number"
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              placeholder="Mobile Number"
              required
            />
          </div>
          <div>
            <label htmlFor="form-date-time">Date and Time of Reservation</label>
            <input
              onChange={handleInputChange}
              id="form-date-time"
              type="datetime-local"
              name="reservationDateTime"
              value={formData.reservationDateTime}
              placeholder="Date and Time of Reservation"
              required
            />
          </div>
          <div>
            <label htmlFor="form-party-size">Party Size</label>
            <input
              onChange={handleInputChange}
              id="form-party-size"
              type="number"
              name="partySize"
              value={formData.partySize}
              placeholder="Party Size"
              min="1"
              required
            />
          </div>
          <div>
            <button type="cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit">Submit</button> FIX SUBMIT BUTTON!!!!!!!!!
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default ReservationForm;
