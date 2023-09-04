import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
// import ListTables from "./ListTables";
import { updateTable, listTables } from "../utils/api";
// import axios from "axios";
// import ReservationsComponent from "./ReservationsComponent";
require("dotenv").config();

// const API_BASE_URL =
//   process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function SeatReservation() {
  const history = useHistory();
  const [tables, setTables] = useState([]); 
  const [tableId, setTableId] = useState(0);
  // const [reservation, setReservation] = useState({});
 
  const [error, setError] = useState(null); 

  const { reservation_id } = useParams();

  useEffect(loadTables, []);
  function loadTables() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setError);
    return () => abortController.abort();
  }
  // useEffect(() => {
  //   async function loadTables() {
  //     const abortController = new AbortController();
  //     const signal = abortController.signal;
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/tables`, { signal });
  //       setTables(response.data.data);
  //     } catch (error) {
  //       setError(error.response.data.error);
  //       console.log(error, "error loading tables");
  //     }
  //   }
  //   loadTables();
  // }, []);

  const tablesForm = tables.map((table) => {
    return (
        <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
        </option>
    )
})

const onChange = (event) => {
  const { target } = event;
  const value = target.value;

  setTableId(value)
  console.log("line 38", value, [target.name], )
}

const submitHandler = (event) => {
  event.preventDefault();
  if(tableId){
  updateTable(tableId, reservation_id)
  .then(() => history.push("/")) 
  .catch(setError) ;
  }
};

  // // loads reservation on mount and when the reservation_id changes
  // // should not be able to modify reservation and change reservation-id without going back to dashboard
  // useEffect(() => {
  //   async function loadReservation() {
  //     const abortController = new AbortController();
  //     const signal = abortController.signal;
  //     try {
  //       const response = await axios.get(
  //         `${API_BASE_URL}/reservations/${reservation_id}`,
  //         {
  //           signal,
  //         }
  //       );
  //       setReservation(response.data.data);
  //     } catch (error) {
  //       setError(error.response.data.error);
  //       console.log(error, "error loading reservation");
  //     }
  //   }
  //   loadReservation();
  // }, [reservation_id]);

  // function handleChange({ target }) {
  //   setTableId(target.value);
  // }

  // // will update the table with reservation ID and the reservation status to be seated
  // const handleSubmit = async (event) => {
  //   await updateTable(reservation.reservation_id, tableId);
  //   history.push("/dashboard");
  // };

  // // cancel does not fore re-render of dashboard because no changes can be made to reservation and still be on this page
  // function handleCancel() {
  //   history.goBack();
  // }

  return (
    <div>
    <h2>Select Your Seat According to Party Size</h2>    
    <form name="seat-party" onSubmit={submitHandler}>
    <div className="form-group">
    <label htmlFor="table_id">Table number:</label>
        <select className="ml-2 form-control w-50" required name="table_id" onChange={onChange}>
            <option>Select a Table</option>
            {tablesForm}
        </select>
    </div>
        <button className="btn btn-primary" type="submit">Submit</button>
        <button className="btn btn-secondary ml-1" type="button" onClick={() => history.go(-1)}
        >Cancel</button>
        <ErrorAlert error={error} />
    </form>
    </div>
)
}

export default SeatReservation;
