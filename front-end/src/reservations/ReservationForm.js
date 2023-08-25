import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ReservationForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const [reservation, setReservation] = useState([]);
  const history = useHistory();
  const [error, setError] = useState("");

  // CANCEL BUTTON
  function cancelHandler() {
    history.goBack();
  }

  function handleInputChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  // SUBMIT BUTTON
  function submitHandler(event) {
    event.preventDefault();
    const { reservation_date } = formData;
    console.log("before");
    console.log(formData);
    if (reservation_date) {
      console.log("after");
      // save to db
      history.push(`/dashboard?date=${reservation_date}`);
    } else {
      setError("Error submitting reservation:", error);
    }
  }

  return (
    <div>
      <h2>New Reservation</h2>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div>
            <label htmlFor="first_name">First Name:</label> <br />
            <input
              onChange={handleInputChange}
              id="first_name"
              type="text"
              name="first_name"
              value={formData.first_name}
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label> <br />
            <input
              onChange={handleInputChange}
              id="last_name"
              type="text"
              name="last_name"
              value={formData.last_name}
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            <label htmlFor="mobile_number">Mobile Number:</label> <br />
            <input
              onChange={handleInputChange}
              id="mobile_number"
              type="text"
              name="mobile_number"
              value={formData.mobile_number}
              placeholder="Mobile Number"
              required
            />
          </div>
          <div>
            <label htmlFor="reservation_date">Date of Reservation:</label>{" "}
            <br />
            <input
              onChange={handleInputChange}
              id="reservation_date"
              type="date"
              name="reservation_date"
              value={formData.reservation_date}
              required
            />
          </div>
          <div>
            <label htmlFor="reservation_time">Time of Reservation:</label>{" "}
            <br />
            <input
              onChange={handleInputChange}
              id="reservation_time"
              type="time"
              name="reservation_time"
              value={formData.reservation_time}
              required
            />
          </div>
          <div>
            <label htmlFor="people">Party Size:</label> <br />
            <input
              onChange={handleInputChange}
              id="people"
              type="number"
              name="people"
              value={formData.people}
              placeholder="Party Size"
              min="1"
              required
            />
          </div>
          <div>
            <button type="cancel" onClick={cancelHandler}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default ReservationForm;
