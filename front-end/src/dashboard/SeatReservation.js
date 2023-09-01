import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import DisplayReservations from "./DisplayReservation";
import DisplayTable from "./DisplayTable";
import { updateTable } from "../utils/api";
require("dotenv").config();

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function SeatReservation() {
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState({});
  const [tableId, setTableId] = useState(0);
  const { reservation_id } = useParams();
  const history = useHistory();

  // loads tables on mount
  useEffect(() => {
    async function loadTables() {
      const abortController = new AbortController();
      const signal = abortController.signal;
      try {
        const response = await axios.get(`${API_BASE_URL}/tables`, { signal });
        setTables(response.data.data);
      } catch (error) {
        console.log(error, "error loading tables");
      }
    }
    loadTables();
  }, []);

  // loads reservation on mount and when the reservation_id changes
  // should not be able to modify reservation and change reservation-id without going back to dashboard
  useEffect(() => {
    async function loadReservation() {
      const abortController = new AbortController();
      const signal = abortController.signal;
      try {
        const response = await axios.get(
          `${API_BASE_URL}/reservations/${reservation_id}`,
          {
            signal,
          }
        );
        setReservation(response.data.data);
      } catch (error) {
        console.log(error, "error loading reservation");
      }
    }
    loadReservation();
  }, [reservation_id]);

  function handleChange({ target }) {
    setTableId(target.value);
  }

  // will update the table with reservation ID and the reservation status to be seated
  const handleSubmit = async (event) => {
    await updateTable(reservation.reservation_id, tableId);
    history.push("/dashboard");
  };

  // cancel does not fore re-render of dashboard because no changes can be made to reservation and still be on this page
  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h1>Seat Reservation</h1>
      <DisplayReservations reservation={reservation} />
      <select
        name="table_id"
        id="table_id"
        onChange={handleChange}
        className="form-select"
      >
        <option value="">Select a table</option>
        {tables.map((table) => (
          <option key={table.table_id} value={table.table_id}>
            {table.table_name} - {table.capacity}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="btn btn-primary mr-1 ml-1 mt-1"
        onClick={() => handleSubmit(tableId)}
      >
        Submit
      </button>
      <button
        type="button"
        className="btn btn-secondary mr-1 ml-1 mt-1"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <h2>Tables</h2>
      <div className="d-md-flex mb-3">
        {tables.map((table) => (
          <DisplayTable key={table.table_id} table={table} />
        ))}
      </div>
    </div>
  );
}

export default SeatReservation;
