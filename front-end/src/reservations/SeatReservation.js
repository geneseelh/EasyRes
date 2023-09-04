import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { updateTable, listTables } from "../utils/api";
require("dotenv").config();

function SeatReservation() {
  const history = useHistory();
  const [tables, setTables] = useState([]); 
  const [tableId, setTableId] = useState(0);
 
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
